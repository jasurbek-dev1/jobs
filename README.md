# Ariza Topshirish - Application Form with Telegram Integration

A modern, animated React application for collecting job/internship applications and sending them directly to Telegram via Bot API. No backend required!

## Features

- Beautiful animated UI with particles and gradient effects
- Fully responsive design (mobile and desktop)
- Form validation
- Direct Telegram integration using Bot API
- Success messages
- No backend or database needed
- Ready for static hosting (Netlify, Vercel, etc.)

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Telegram Bot API
- Lucide React (icons)

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. You'll receive a **BOT_TOKEN** (looks like: `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`)
5. Save this token - you'll need it in step 3

### 2. Get Your Chat ID

**Option A: For a Group**
1. Create a new Telegram group
2. Add your bot to the group (as admin)
3. Send any message in the group
4. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
5. Look for `"chat":{"id":-1234567890}` - this is your CHAT_ID

**Option B: For Personal Chat**
1. Search for [@userinfobot](https://t.me/userinfobot) on Telegram
2. Start the bot and it will show your user ID
3. Use this as your CHAT_ID

### 3. Configure the Application

Open `src/utils/telegram.ts` and replace the placeholders:

```typescript
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';  // Replace with your bot token from step 1
const CHAT_ID = 'YOUR_CHAT_ID_HERE';       // Replace with your chat ID from step 2
```

Example:
```typescript
const BOT_TOKEN = '6789012345:ABCdefGhIJKlmNoPQRsTUVwxyZ123456789';
const CHAT_ID = '-1001234567890';  // For groups, starts with -100
// OR
const CHAT_ID = '123456789';        // For personal chat
```

### 4. Test Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 and test the form. You should receive messages in your Telegram group/chat.

### 5. Build for Production

```bash
npm run build
```

The `dist` folder will contain your production-ready files.

## Deployment

### Deploy to Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy --prod --dir=dist`
3. Follow the prompts

Or use Netlify's drag-and-drop interface:
1. Go to [netlify.com](https://netlify.com)
2. Drag the `dist` folder
3. Done!

### Deploy to Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

Or use Vercel's GitHub integration:
1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Deploy!

## Message Format

When a user submits the form, they'll receive a formatted message in Telegram like this:

```
🎯 Yangi Ariza

👤 Ism va Familiya: Alisher Navoiy
🎂 Yosh: 25
📞 Telefon: +998 90 123 45 67
💬 Telegram: @alisher_dev

📍 Manzil:
   • Viloyat: Toshkent
   • Tuman/Shahar: Yunusobod
   • Ko'cha va uy: Amir Temur 123

🛠 Skillari:
React, JavaScript, TypeScript, Python, Figma

🎯 Maqsadi:
Men web dasturlashni o'rganishni va real loyihalarda ishlashni xohlayman...

⏰ 07/01/2026, 15:30:45
```

## Form Fields

All fields are required:

- **Ism va Familiya** - Full name
- **Yosh** - Age (14-100)
- **Telefon raqam** - Phone number (+998 format)
- **Telegram username** - Telegram username (starts with @)
- **Viloyat** - Region (dropdown)
- **Tuman / Shahar** - District/City
- **Ko'cha va uy raqami** - Street and house number
- **Skillari** - Technologies and skills (textarea)
- **Maqsadi** - Goals and motivation (textarea)

## Customization

### Change Colors

Edit the Tailwind classes in the components. Current color scheme:
- Primary: Cyan (`cyan-400`, `cyan-500`)
- Secondary: Purple (`purple-400`, `purple-500`)
- Background: Slate (`slate-900`, `slate-950`)

### Add More Regions

Edit the `regions` array in `src/components/ApplicationForm.tsx`:

```typescript
const regions = [
  'Toshkent',
  'Andijon',
  // Add more...
];
```

### Modify Message Format

Edit the `sendToTelegram` function in `src/utils/telegram.ts` to change the message format sent to Telegram.

## Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx  # Animated background with particles
│   └── ApplicationForm.tsx     # Main application form
├── utils/
│   └── telegram.ts            # Telegram Bot API integration
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Tailwind imports
```

## Security Notes

- Bot token is exposed in the frontend (this is acceptable for public bots)
- If security is a concern, consider using a serverless function as a proxy
- The bot can only send messages, not read or access other data
- Rate limiting is handled by Telegram's API

## Troubleshooting

**Messages not sending?**
- Check your BOT_TOKEN is correct
- Verify CHAT_ID is correct
- Make sure the bot is added to the group (if using group chat)
- Check browser console for errors

**Animations not working?**
- Clear browser cache
- Check if JavaScript is enabled
- Try a different browser

**Build errors?**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Check Node.js version (requires 16+)

## License

MIT License - Feel free to use this project for any purpose!

## Support

For issues or questions, open an issue on GitHub or contact via Telegram.
