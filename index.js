const { Telegraf } = require('telegraf');
const passports = require('./passports.json');
const {
  formatAllPassports,
  normalizePassports,
  normalizeInputPassport
} = require('./utils');

const allPassports = normalizePassports(passports);
const bot = new Telegraf(process.env.BOT_KEY);

bot.start(async (ctx) => {
  await ctx.reply(`Оновлена редакція станом на 28.02.2022
ВЗЯТИ ДО УВАГИ
ДМС визнано недійсними (анульовані)
бланки паспортів громадянина України,
посвідок на постійне проживання, посвідок на тимчасове проживання`);

  await ctx.reply(
    `БЛАНКИ ПАСПОРТІВ ГРОМАДЯНИНА УКРАЇНИ:\n\n${formatAllPassports(passports)}`
  );

  await ctx.reply(
    '\n Введіть серію та номер паспорту, який потрібно перевірити'
  );
});

bot.on('text', async (ctx) => {
  try {
    const requestedPassport = normalizeInputPassport(ctx.message.text);

    if (allPassports[requestedPassport]) {
      ctx.reply('❌ Цей паспорт ДМС визнано недійсними (анульованим)');
    } else {
      ctx.reply('✅ Данні щодо цього паспорту відсутні');
    }
  } catch (e) {
    ctx.reply('Опаньки, шось пішло не так');
  }
});

bot.launch();
