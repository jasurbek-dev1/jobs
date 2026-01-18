# Step-by-Step Setup Guide

This guide will walk you through setting up your Telegram bot and deploying the application. No technical knowledge required!

## Part 1: Create Your Telegram Bot

### Step 1: Open BotFather

1. Open Telegram on your phone or computer
2. In the search bar, type: `@BotFather`
3. Click on the official BotFather (it has a blue checkmark)
4. Click **START** or send `/start`

### Step 2: Create a New Bot

1. Send this message to BotFather: `/newbot`
2. BotFather will ask for a name. Type any name you want (example: "My Application Bot")
3. BotFather will ask for a username. This must be unique and end with "bot"
   - Example: `my_application_bot` or `company_hiring_bot`
4. If successful, BotFather will send you a message with your **BOT TOKEN**
5. **IMPORTANT:** Copy this token and save it somewhere safe. It looks like this:
   ```
   123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
   ```

### Step 3: Create a Group for Applications

1. In Telegram, create a new group
   - Click the "New Message" button
   - Select "New Group"
   - Name it something like "Job Applications"
2. Add your bot to this group:
   - Click on the group name at the top
   - Click "Add Members"
   - Search for your bot username (the one you created)
   - Add the bot
3. **IMPORTANT:** Make your bot an admin:
   - Click on the group name
   - Click "Administrators"
   - Click "Add Administrator"
   - Select your bot
   - Give it permission to "Send Messages"

### Step 4: Get Your Chat ID

1. Send any message in the group (example: "test")
2. Open your web browser and go to this URL (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
   Example:
   ```
   https://api.telegram.org/bot123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ/getUpdates
   ```
3. You'll see some text. Look for this part:
   ```json
   "chat":{"id":-1001234567890
   ```
4. The number after `"id":` is your **CHAT_ID**
5. **IMPORTANT:** Copy this number (including the minus sign if it has one)

## Part 2: Configure Your Application

### Method A: Using the Code Directly (Recommended for Beginners)

1. Open the file: `src/utils/telegram.ts`
2. Find these lines at the top:
   ```typescript
   const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
   const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE';
   ```
3. Replace `YOUR_BOT_TOKEN_HERE` with your bot token
4. Replace `YOUR_CHAT_ID_HERE` with your chat ID
5. Example:
   ```typescript
   const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ';
   const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '-1001234567890';
   ```
6. Save the file

### Method B: Using Environment Variables (Recommended for Production)

1. Copy the `.env.example` file and rename it to `.env`
2. Open the `.env` file
3. Replace the values:
   ```
   VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
   VITE_TELEGRAM_CHAT_ID=-1001234567890
   ```
4. Save the file
5. **IMPORTANT:** Never share this `.env` file or commit it to GitHub!

## Part 3: Test Locally

### Step 1: Install Dependencies

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to your project folder
3. Run this command:
   ```bash
   npm install
   ```
4. Wait for it to finish (might take a few minutes)

### Step 2: Start the Development Server

1. Run this command:
   ```bash
   npm run dev
   ```
2. You'll see a message like: `Local: http://localhost:5173`
3. Open your web browser and go to: `http://localhost:5173`

### Step 3: Test the Form

1. Fill in all the form fields
2. Click "Yuborish" (Submit)
3. Check your Telegram group - you should receive a message!
4. If you see the message in Telegram, congratulations! Everything is working!

## Part 4: Deploy to the Internet

### Option A: Deploy to Netlify (Easiest)

#### Without CLI (Drag and Drop)

1. Build your project:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Sign up for a free account
4. Click "Add new site" → "Deploy manually"
5. Drag the `dist` folder from your project to the upload area
6. Wait for deployment to complete
7. You'll get a URL like: `https://your-app.netlify.app`
8. Share this URL on Instagram!

#### With CLI (More Control)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build your project:
   ```bash
   npm run build
   ```
3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```
4. Follow the prompts to link your site
5. You'll get your deployment URL

### Option B: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Vite and configure everything
6. Click "Deploy"
7. Wait a few minutes
8. You'll get a URL like: `https://your-app.vercel.app`

### Option C: Deploy to GitHub Pages

1. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add these scripts to your `package.json`:
   ```json
   "homepage": "https://your-username.github.io/your-repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
4. Your site will be live at: `https://your-username.github.io/your-repo-name`

## Part 5: Share Your Application

1. Copy your deployment URL
2. Create a post on Instagram
3. Add the link to your bio or in your story
4. Users can now submit applications!

## Troubleshooting

### "Messages not appearing in Telegram"

- Check if your bot token is correct
- Make sure the chat ID is correct (don't forget the minus sign)
- Verify the bot is added to the group
- Make sure the bot is an admin in the group

### "Form not submitting"

- Check your browser console for errors (F12 → Console)
- Make sure all fields are filled
- Check your internet connection

### "Build failed"

- Delete `node_modules` folder
- Delete `package-lock.json` file
- Run `npm install` again
- Try building again with `npm run build`

### "Can't deploy to Netlify/Vercel"

- Make sure you've built the project first (`npm run build`)
- Check if the `dist` folder exists
- Try clearing your browser cache

## Need Help?

If you're stuck:

1. Check the error message carefully
2. Search for the error on Google
3. Ask in developer communities (Reddit, Stack Overflow)
4. Review the main README.md file

## Security Reminders

- Never share your bot token publicly
- Don't commit the `.env` file to GitHub
- If your token is exposed, use BotFather to generate a new one with `/revoke`
- The bot can only send messages, it cannot read messages or access user data

## Customization Ideas

After deployment, you might want to:

- Change the color scheme (edit Tailwind classes)
- Add more form fields (edit ApplicationForm.tsx)
- Change the message format (edit telegram.ts)
- Add your company logo
- Customize animations

Good luck with your application form!
