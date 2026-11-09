// Vercel serverless function: forwards the contact form to Telegram.
// Set BOT_TOKEN and CHAT_ID in Vercel → Project → Settings → Environment Variables.
// Never put the token in frontend code.

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }

  const { BOT_TOKEN, CHAT_ID } = process.env
  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ ok: false, error: 'Server is not configured' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid JSON' })
  }
  const name = clean(body.name, 100)
  const email = clean(body.email, 200)
  const subject = clean(body.subject, 200)
  const message = clean(body.message, 3000)

  if (!name || !email || !subject || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid fields' })
  }

  const text = `📩 Yangi portfolio xabari\n\n👤 Ism: ${name}\n📧 Email: ${email}\n📝 Mavzu: ${subject}\n\n💬 Xabar:\n${message}`

  try {
    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    })
    const data = await tg.json()
    if (!data.ok) {
      // e.g. "Unauthorized" (wrong BOT_TOKEN) or "Bad Request: chat not found" (wrong CHAT_ID,
      // or you never pressed /start in your bot). Contains no secrets.
      console.error('contact: Telegram rejected the message:', data.description)
      return res.status(502).json({ ok: false, error: `Telegram: ${data.description}` })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: could not reach Telegram:', err?.message)
    return res.status(502).json({ ok: false, error: 'Telegram unreachable' })
  }
}
