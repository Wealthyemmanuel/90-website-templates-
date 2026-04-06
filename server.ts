import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import path from "path";
import crypto from "crypto";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Meta CAPI Helper
  const hashData = (data: string | undefined) => {
    if (!data) return undefined;
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
  };

  const sendMetaEvent = async (req: express.Request, eventName: string, userData: any = {}, customData: any = {}) => {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    
    if (!pixelId || !accessToken) return;

    const event = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        client_ip_address: req.ip,
        client_user_agent: req.headers['user-agent'],
        em: userData.email ? [hashData(userData.email)] : undefined,
        ph: userData.whatsapp ? [hashData(userData.whatsapp)] : undefined,
        fn: userData.name ? [hashData(userData.name.split(' ')[0])] : undefined,
      },
      custom_data: customData
    };

    const body: any = { data: [event] };
    if (process.env.META_TEST_EVENT_CODE) {
      body.test_event_code = process.env.META_TEST_EVENT_CODE;
    }

    try {
      await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.error('Meta CAPI Error:', err);
    }
  };

  // Google Sheets Setup
  const getSheet = async () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let key = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!email || !key || !sheetId) {
      console.warn('Google Sheets credentials missing. Skipping sheet update.');
      return null;
    }

    // Handle potential formatting issues with the private key from env vars
    let formattedKey = key;
    // Remove surrounding quotes if present (single or double)
    formattedKey = formattedKey.replace(/^['"]|['"]$/g, '');
    // Replace literal \n with actual newlines
    formattedKey = formattedKey.replace(/\\n/g, '\n');
    
    // Ensure the key has the correct PEM headers if they were somehow stripped
    if (!formattedKey.includes('-----BEGIN PRIVATE KEY-----')) {
      formattedKey = `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----\n`;
    }

    try {
      const serviceAccountAuth = new JWT({
        email,
        key: formattedKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
      await doc.loadInfo();
      return doc;
    } catch (error) {
      console.error('Failed to initialize Google Sheet:', error);
      return null;
    }
  };

  // API Routes
  app.post('/api/track', async (req, res) => {
    try {
      const { eventName, userData, customData } = req.body;
      await sendMetaEvent(req, eventName, userData, customData);
      res.json({ success: true });
    } catch (error) {
      console.error('Tracking error:', error);
      res.status(500).json({ error: 'Failed to track event' });
    }
  });

  app.post('/api/optin', async (req, res) => {
    try {
      const { name, email, whatsapp } = req.body;
      
      // Fire CAPI Lead Event
      await sendMetaEvent(req, 'Lead', { name, email, whatsapp });

      const doc = await getSheet();
      if (doc) {
        const sheet = doc.sheetsByIndex[0]; // Uses the first sheet
        await sheet.addRow({
          Date: new Date().toISOString(),
          Name: name,
          Email: email,
          WhatsApp: whatsapp,
          Status: 'Opted In',
          Reference: ''
        });
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Optin error:', error);
      res.status(500).json({ error: 'Failed to save optin' });
    }
  });

  app.post('/api/purchase', async (req, res) => {
    try {
      const { name, email, whatsapp, reference } = req.body;
      
      // Fire CAPI Purchase Event
      await sendMetaEvent(req, 'Purchase', { name, email, whatsapp }, { currency: 'NGN', value: 5000 });

      res.json({ success: true });
    } catch (error) {
      console.error('Purchase error:', error);
      res.status(500).json({ error: 'Failed to save purchase' });
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
    const distPath = path.join(process.cwd(), 'dist');
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
