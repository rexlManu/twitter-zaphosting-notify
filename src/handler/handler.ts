import { Telegraf, Extra } from "telegraf";

export class TelegramHandler {
  private bot: any;
  private stream: any;

  constructor(bot: any, stream: any) {
    this.bot = bot;
    this.stream = stream;
  }

  update() {
    this.bot.start(this.onStart);

    this.stream.filter({ follow: "212256634" });

    this.stream.on("tweet", (t: any) => {
      var url = `https://twitter.com/${t.user.screen_name}/status/${t.id_str}`;
      if(t.user.screen_name.toLowerCase() == 'zaphosting') {
        this.bot.telegram
        .sendMessage(
          "@zaphostingnews",
          `Neuer Tweet von ZapHosting:\n${url}`,
          Extra.webPreview(true)
        )
        .then((result: any) => {});
      }
      
    });
  }

  onStart(ctx: any) {
    ctx.reply(
      "Hallo, ich bin der ZapHostingBot. Leider kann ich dir keinerlei Funktionalität bieten."
    );
  }
}
