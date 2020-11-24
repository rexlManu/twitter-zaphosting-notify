import * as dotenv from "dotenv";
import Telegraf from "telegraf";
import { TelegramHandler } from "./handler/handler";
var tweets = require('tweets');

export class App {
  private env: dotenv.DotenvConfigOutput;
  private token: string;
  private bot: any;
  private handler: TelegramHandler;

  constructor() {
    this.env = dotenv.config();
    this.token = this.env.parsed ? this.env.parsed["TELEGRAM_TOKEN"] : "";
    this.bot = new Telegraf(this.token);
    
    this.handler = new TelegramHandler(
      this.bot,
      new tweets({
        consumer_key: this.env.parsed
          ? this.env.parsed["TWITTER_CONSUMER_KEY"]
          : "",
        consumer_secret: this.env.parsed
          ? this.env.parsed["TWITTER_CONSUMER_SECRET"]
          : "",
        access_token: this.env.parsed
          ? this.env.parsed["TWITTER_ACCESS_TOKEN_KEY"]
          : "",
        access_token_secret: this.env.parsed
          ? this.env.parsed["TWITTER_ACCESS_TOKEN_SECRET"]
          : "",
      })
    );
  }

  init() {
    this.handler.update();
    this.bot.launch();
  }
}
