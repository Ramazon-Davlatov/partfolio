import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const { BOT_TOKEN, CHAT_ID, PORT = 5174 } = process.env

if (!BOT_TOKEN || !CHAT_ID) {
  console.warn('[warn] BOT_TOKEN or CHAT_ID missing — set them in backend/.env before going live.')
}

const escapeHtml = (str = '') =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: 'All fields are required.' })
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' })
  }

  const text =
    `<b>New Portfolio Message</b>\n\n` +
    `<b>Name:</b> ${escapeHtml(name)}\n` +
    `<b>Email:</b> ${escapeHtml(email)}\n` +
    `<b>Subject:</b> ${escapeHtml(subject)}\n` +
    `<b>Message:</b> ${escapeHtml(message)}\n\n` +
    `<b>Time:</b> ${new Date().toLocaleString()}\n` +
    `<b>Browser:</b> ${escapeHtml(req.headers['user-agent'] || 'unknown')}`

  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      throw new Error('Bot not configured')
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    })

    if (!tgRes.ok) {
      const errBody = await tgRes.text()
      console.error('Telegram API error:', errBody)
      throw new Error('Telegram API rejected the request')
    }

    res.json({ ok: true })
  } catch (err) {
    console.error('Failed to send message:', err.message)
    res.status(502).json({ ok: false, error: 'Could not deliver the message right now.' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Contact backend running on http://localhost:${PORT}`)
})
