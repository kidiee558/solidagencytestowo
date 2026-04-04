import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  const resend = new Resend(process.env.RESEND_API_KEY);

  // API routes
  app.post("/api/send-email", async (req, res) => {
    const { name, email, phone, service, detail, budget, message } = req.body;

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.YOUR_EMAIL || "kidiee558@gmail.com",
        subject: "Nowe zgłoszenie projektu",
        html: `
          <h1>Nowe zgłoszenie projektu</h1>
          ${name ? `<p><strong>Imię:</strong> ${name}</p>` : ''}
          ${email ? `<p><strong>E-mail:</strong> ${email}</p>` : ''}
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          ${service ? `<p><strong>Usługa:</strong> ${service}</p>` : ''}
          ${detail ? `<p><strong>Szczegóły:</strong> ${detail}</p>` : ''}
          ${budget ? `<p><strong>Budżet:</strong> ${budget}</p>` : ''}
          ${message ? `<p><strong>Wiadomość:</strong> ${message}</p>` : ''}
        `,
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
