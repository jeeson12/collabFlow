import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BrevoClient } from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  private readonly brevo: BrevoClient;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      throw new Error('Brevo API key not provided');
    }

    this.brevo = new BrevoClient({
      apiKey,
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    console.log('EMAIL DEBUG:', {
      to,
      type: typeof to,
      subject,
    });
    try {
      const response = await this.brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'CollabFlow',
          email: process.env.BREVO_SENDER_EMAIL!,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,
        htmlContent: html,
      });

      console.log('Brevo email sent:', response.messageId);

      return response;
    } catch (error) {
      console.error('Brevo email error:', error);

      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
