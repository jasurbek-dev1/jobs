const BOT_TOKEN = '8413994298:AAEAw1SUonYUVj5yGJ9yz3LOb6y0U2Uol_M';
const CHAT_ID = '-1003446970604';

export interface FormData {
  fullName: string;
  age: number;
  phone: string;
  telegram: string;
  region: string;
  district: string;
  address: string;
  skills: string;
  goal: string;
}

export async function sendToTelegram(data: FormData): Promise<boolean> {
  const message = `
🎯 <b>Yangi Ariza</b>

👤 <b>Ism va Familiya:</b> ${data.fullName}
🎂 <b>Yosh:</b> ${data.age}
📞 <b>Telefon:</b> ${data.phone}
💬 <b>Telegram:</b> ${data.telegram}

📍 <b>Manzil:</b>
   • Viloyat: ${data.region}
   • Tuman/Shahar: ${data.district}
   • Ko'cha va uy: ${data.address}

🛠 <b>Skillari:</b>
${data.skills}

🎯 <b>Maqsadi:</b>
${data.goal}

⏰ <i>${new Date().toLocaleString('uz-UZ')}</i>
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Telegram API error:', error);
    return false;
  }
}
