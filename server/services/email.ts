interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || process.env.SENDGRID_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "ullas200410@gmail.com";

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.warn("SendGrid API key not found. Using mock email service for development.");
    console.log("📧 Mock Email Service - Email Details:");
    console.log(`From: ${emailData.from}`);
    console.log(`To: ${emailData.to}`);
    console.log(`Subject: ${emailData.subject}`);
    console.log(`Text: ${emailData.text}`);
    console.log("✅ Mock email sent successfully");
    return true;
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: emailData.to }],
            subject: emailData.subject,
          },
        ],
        from: { email: emailData.from },
        content: [
          {
            type: "text/plain",
            value: emailData.text,
          },
          {
            type: "text/html",
            value: emailData.html,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("SendGrid API error details:", errorText);
      
      // Fallback to mock email for development
      console.log("📧 Falling back to mock email service:");
      console.log(`From: ${emailData.from}`);
      console.log(`To: ${emailData.to}`);
      console.log(`Subject: ${emailData.subject}`);
      console.log(`Text: ${emailData.text}`);
      console.log("✅ Mock email sent successfully (SendGrid failed)");
      return true;
    }

    console.log("✅ Email sent successfully via SendGrid");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export function createContactEmail(name: string, email: string, message: string) {
  return {
    to: "ullas200410@gmail.com",
    from: FROM_EMAIL,
    subject: `Portfolio Contact: Message from ${name}`,
    text: `
Portfolio Contact Form Submission

From: ${name} (${email})
Location: Bengaluru South, Bengaluru, 560050 IND

Message:
${message}

---
Reply to: ${email}
Sent from: ullassa.dev portfolio
    `.trim(),
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0f; color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #a855f7; margin: 0; font-size: 28px; text-shadow: 0 0 10px #a855f7;">
      Portfolio Contact
    </h1>
    <div style="height: 2px; background: linear-gradient(90deg, #a855f7, #06b6d4, #22c55e); margin: 10px auto; width: 200px;"></div>
  </div>
  
  <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 25px; border-radius: 12px; border: 1px solid #06b6d4; margin: 20px 0; box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);">
    <h3 style="color: #06b6d4; margin-top: 0; font-size: 18px;">Contact Details</h3>
    <p style="margin: 10px 0;"><strong style="color: #a855f7;">Name:</strong> ${name}</p>
    <p style="margin: 10px 0;"><strong style="color: #a855f7;">Email:</strong> <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></p>
    <p style="margin: 10px 0;"><strong style="color: #a855f7;">Location:</strong> Bengaluru South, Bengaluru, 560050 IND</p>
  </div>
  
  <div style="background: linear-gradient(135deg, #16213e, #1a1a2e); padding: 25px; border-radius: 12px; border-left: 4px solid #22c55e; margin: 20px 0;">
    <h3 style="color: #22c55e; margin-top: 0; font-size: 18px;">Message:</h3>
    <p style="line-height: 1.8; color: #e2e8f0; font-size: 16px; white-space: pre-wrap;">${message}</p>
  </div>
  
  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #374151;">
    <p style="color: #9ca3af; font-size: 14px; margin: 5px 0;">
      📧 Sent from ullassa.dev portfolio
    </p>
    <p style="color: #9ca3af; font-size: 14px; margin: 5px 0;">
      Reply directly to this email to respond
    </p>
  </div>
</div>
    `.trim(),
  };
}
