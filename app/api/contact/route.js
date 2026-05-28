import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('SMTP configuration error: EMAIL_USER or EMAIL_PASS is missing in environment.');
      return Response.json(
        { 
          success: false, 
          error: 'Email service is not configured. Please ensure EMAIL_USER and EMAIL_PASS are set in .env.local and restart your dev server.' 
        },
        { status: 500 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to you (portfolio owner)
    await transporter.sendMail({
      from: `"${name} (Portfolio Contact)" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `💌 New message from ${name} via Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0808; color: #fdf2f2; border-radius: 12px; border: 1px solid rgba(255, 100, 80, 0.1);">
          <h2 style="color: #e02020; margin-bottom: 24px;">New Portfolio Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; background: rgba(224,32,32,0.1); border-radius: 8px 8px 0 0; font-weight: bold; color: #b08888;">From</td>
              <td style="padding: 12px; background: rgba(224,32,32,0.05); border-radius: 8px 8px 0 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #b08888;">Email</td>
              <td style="padding: 12px;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; background: rgba(224,32,32,0.1); font-weight: bold; color: #b08888; vertical-align: top;">Message</td>
              <td style="padding: 12px; background: rgba(224,32,32,0.05);">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="color: #6b4545; font-size: 12px; margin-top: 20px;">Sent from your portfolio website</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Dharmik Thakur" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 🚀`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0808; color: #fdf2f2; border-radius: 12px; border: 1px solid rgba(255, 100, 80, 0.1);">
          <h2 style="color: #e02020;">Hey ${name}, got your message! 👋</h2>
          <p style="color: #b08888; line-height: 1.8;">Thanks for reaching out through my portfolio. I've received your message and will get back to you as soon as possible — usually within 24–48 hours.</p>
          <div style="background: rgba(224,32,32,0.1); border-left: 3px solid #e02020; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #b08888; font-size: 14px; margin: 0;"><strong>Your message:</strong><br>${message}</p>
          </div>
          <p style="color: #b08888;">Talk soon, <br><strong style="color: #fdf2f2;">Dharmik Thakur</strong></p>
        </div>
      `,
    });

    return Response.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
