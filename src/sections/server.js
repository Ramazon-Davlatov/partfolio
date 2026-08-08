import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const text = `
📩 Yangi Portfolio Xabari

👤 Ism: ${name}

📧 Email: ${email}

📝 Mavzu: ${subject}

💬 Xabar:
${message}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      return res.status(500).json(data);
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server: http://localhost:3000");
}); 