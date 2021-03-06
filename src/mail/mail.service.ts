import got from "got";
import * as FormData  from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';


@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
      this.sendEmail('testing', 'test');
  }

  private async sendEmail(subject: string, content: string){

    const form = new FormData();
    form.append("from", `Nep eats <mailgun@${this.options.domain}>`);
    form.append("to", `ribeshbasnet19.rb@gmail.com`);
    form.append("subject", subject)
    form.append("text", content);
    form.append("template", "initial")
    form.append("v:code", "1212121")
    form.append("v:username", "Ribesh")



   const response =  await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        headers: {
            "Authorization":  `Basic ${Buffer.from(
                `api:${this.options.apiKey}`,
            ).toString('base64')}`
        },
     method: 'POST',
     body: form,

    });
    console.log(response.body);
  }
}
