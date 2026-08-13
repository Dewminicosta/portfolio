import nodemailer from 'nodemailer';

export const sendNotificationEmail = async (messageData) => {
  const { name, email, subject, message } = messageData;

  // Check if SMTP details are provided in environment
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('--------------------------------------------');
    console.log('SMTP configuration missing. Logging email notification:');
    console.log(`To: ${NOTIFICATION_EMAIL || 'Admin'}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: [Portfolio Contact] ${subject}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------------------');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name} (Portfolio)" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL || SMTP_USER,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `You received a new message from your portfolio website:
      
Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email notification sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Failed to send email notification: ${error.message}`);
  }
};
