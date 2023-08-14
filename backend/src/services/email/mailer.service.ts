import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { appConfig } from '../../../config/appConfig';
import { userSignupTemplate } from './templates/user.signup.template.html';
import { userInviteTemplate } from './templates/user.invite.template.html';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const defaults: SMTPTransport.Options = { from: 'no-reply@festu.se' };

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport(appConfig.mailUrl, defaults);
  }

  async sendSelfSignup(to: string, link: string) {
    const subject = `Create your account for StreckU`;

    let html = userSignupTemplate;
    html = html.replace(/\{\{Link}}/g, link);

    await this.transporter.sendMail({ to: to, subject: subject, html: html });
  }

  async sendStoreInvite(to: string, link: string, storeName: string) {
    const subject = `You have been invited to join ${storeName} on StreckU`;

    let html = userInviteTemplate;
    html = html.replace(/\{\{Link}}/g, link);
    html = html.replace(/\{\{Store}}/g, storeName);

    await this.transporter.sendMail({ to: to, subject: subject, html: html });
  }
}
