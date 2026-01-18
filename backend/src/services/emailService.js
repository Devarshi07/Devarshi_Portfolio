import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️  Email not configured - emails will not be sent');
      return;
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    this.initialized = true;
    console.log('✅ Email service initialized');
  }

  async sendToVisitor(name, email) {
    if (!this.transporter) return;

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thanks for reaching out! - Devarshi Mahajan",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
            <div style="background: white; padding: 30px; border-radius: 8px;">
              <h2 style="color: #667eea; margin-bottom: 20px;">Hi ${name}! 👋</h2>
              
              <p style="color: #333; line-height: 1.6;">
                Thank you for reaching out! I've received your message and will get back to you as soon as possible.
              </p>
              
              <p style="color: #333; line-height: 1.6;">
                In the meantime, feel free to:
              </p>
              
              <ul style="color: #555; line-height: 1.8;">
                <li>Check out my <a href="https://github.com/devarshiai" style="color: #667eea;">GitHub</a> for my latest projects</li>
                <li>Connect with me on <a href="https://linkedin.com/in/devarshi-mahajan" style="color: #667eea;">LinkedIn</a></li>
                <li>Schedule a call on <a href="https://calendly.com/devarshi" style="color: #667eea;">Calendly</a></li>
              </ul>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #888; font-size: 14px; margin: 0;">
                  Best regards,<br/>
                  <strong style="color: #667eea;">Devarshi Mahajan</strong><br/>
                  ML Engineer | AI Systems Researcher
                </p>
              </div>
            </div>
            
            <p style="text-align: center; color: white; font-size: 12px; margin-top: 15px; opacity: 0.8;">
              This is an automated response. You'll hear from me soon! 🚀
            </p>
          </div>
        `
      });
      console.log(`✅ Confirmation email sent to ${email}`);
    } catch (error) {
      console.error('❌ Error sending visitor email:', error);
    }
  }

  async sendToOwner(name, email, message, metadata) {
    if (!this.transporter) return;

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `🔔 New Contact Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
            <div style="background: linear-gradient(135deg, #00f3ff 0%, #bd00ff 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h2 style="color: white; margin: 0;">New Contact Request 📬</h2>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; background: #f9f9f9; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 10px; background: #f9f9f9;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Email:</td>
                  <td style="padding: 10px;"><a href="mailto:${email}" style="color: #00f3ff;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">Timestamp:</td>
                  <td style="padding: 10px; background: #f9f9f9;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              
              <h3 style="color: #333; margin-top: 30px;">Message</h3>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #00f3ff;">
                <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              
              ${metadata ? `
                <h3 style="color: #333; margin-top: 30px;">Additional Info</h3>
                <table style="width: 100%; font-size: 12px; color: #666;">
                  <tr>
                    <td style="padding: 5px;">IP Address:</td>
                    <td style="padding: 5px;">${metadata.ip || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px;">User Agent:</td>
                    <td style="padding: 5px;">${metadata.userAgent || 'N/A'}</td>
                  </tr>
                </table>
              ` : ''}
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}?subject=Re: Your message to Devarshi" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #00f3ff 0%, #bd00ff 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Reply to ${name}
                </a>
              </div>
            </div>
          </div>
        `
      });
      console.log('✅ Notification email sent to owner');
    } catch (error) {
      console.error('❌ Error sending owner email:', error);
    }
  }
}

export default new EmailService();