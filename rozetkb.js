const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const moment = require("moment");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let pc = message.guild.members.cache

    .filter(m => !m.user.bot && m.user.presence.status !== "offline")

    .filter(m => Object.keys(m.user.presence.clientStatus).includes("desktop"))

    .size;

  let web = message.guild.members.cache

    .filter(m => !m.user.bot && m.user.presence.status !== "offline")

    .filter(m => Object.keys(m.user.presence.clientStatus).includes("web"))

    .size;

  let mobil = message.guild.members.cache

    .filter(m => !m.user.bot && m.user.presence.status !== "offline")

    .filter(m => Object.keys(m.user.presence.clientStatus).includes("mobile"))

    .size;
  var prefix = db.get(`prefix_${message.guild.id}`) || ayarlar.prefix;
  let karaliste = db.fetch(`karaliste_${message.author.id}`);
  if (karaliste)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(`DBE637`)
        .setDescription(`Komudu Kullanazsın Çünkü **Kara Listedesin!**`)
        .setFooter(client.user.username, client.user.avatarURL())
    );
  let user = message.mentions.users.first() || message.author;
  let userinfo = {};

  userinfo.rozetler = user.flags.toArray().join("\n")
    ? user.flags
        .toArray()
        .join("\n")
        .replace("HOUSE_BRAVERY", "Bravery<:bravery:767333393380671508> ")
        .replace("HOUSE_BRILLIANCE", "Brillianca<:brilliance:767335547173339166> ")
        .replace("HOUSE_BALANCE", "Balance<:balance:767333492613709834> ")
        .replace("VERIFIED_DEVELOPER", "Doğrulanmış Discord Bot Geliştiricisi<:deleopersss:761185167788212235> ")
        .replace("VERIFIED_BOT", "Onaylı Bot<:verifiedbot:767333886136811540> ")
        .replace("DISCORD_EMPLOYEE", "Discord Çalışanı<:yetkili:767334107977220126> ")
        .replace("DISCORD_PARTNER", "Partner<:partner:767335417828737055> ")
        .replace("HYPESQUAD_EVENTS", "Events Rozeti<:hypesquad_events:767333717496037406> ")
        .replace("BUGHUNTER_LEVEL_1", "Bug Avcısı Level 1<:bughunter:767335643353186306> ")
        .replace("EARLY_SUPPORTER", "Erken Dönem Destekcisi<:early:767333600882327562> ")
        .replace("TEAM_USER", "Takım Üyesi")
        .replace("SYSTEM", "Sistem")
        .replace("BUGHUNTER_LEVEL_2", "Bug Avcısı Level 2<:bughunter2:767335718862454804> ")
    : `Hiçbir Rozeti Yok`;

  userinfo.status = user.presence.status
    .toString()
    .replace("dnd", `Rahatsız Etmeyin`)
    .replace("online", `Çevrimiçi`)
    .replace("idle", `Boşta`)
    .replace("offline", `Çevrimdışı`);

  userinfo.bot = user.bot
    .toString()
    .replace("false", `Hayır`)
    .replace("true", `Evet`);
  userinfo.dctarih = moment
    .utc(message.guild.members.cache.get(user.id).user.createdAt)
    .format("**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)")
    .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)
    .replace("January", `**Ocak**`)
    .replace("February", `**Şubat**`)
    .replace("March", `**Mart**`)
    .replace("April", `**Nisan**`)
    .replace("May", `**Mayıs**`)
    .replace("June", `**Haziran**`)
    .replace("July", `**Temmuz**`)
    .replace("August", `**Ağustos**`)
    .replace("September", `**Eylül**`)
    .replace("October", `**Ekim**`)
    .replace("November", `**Kasım**`)
    .replace("December", `**Aralık**`);
    userinfo.dctarihkatilma = moment

    .utc(message.guild.members.cache.get(user.id).joinedAt)

    .format("**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)")

    .replace("Monday", `**Pazartesi**`)

    .replace("Tuesday", `**Salı**`)

    .replace("Wednesday", `**Çarşamba**`)

    .replace("Thursday", `**Perşembe**`)

    .replace("Friday", `**Cuma**`)

    .replace("Saturday", `**Cumartesi**`)

    .replace("Sunday", `**Pazar**`)

    .replace("January", `**Ocak**`)

    .replace("February", `**Şubat**`)

    .replace("March", `**Mart**`)

    .replace("April", `**Nisan**`)

    .replace("May", `**Mayıs**`)

    .replace("June", `**Haziran**`)

    .replace("July", `**Temmuz**`)

    .replace("August", `**Ağustos**`)

    .replace("September", `**Eylül**`)

    .replace("October", `**Ekim**`)

    .replace("November", `**Kasım**`)

    .replace("December", `**Aralık**`);
  const DarkCode = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )
    .addField(`Tag`, `${user.tag}`, true)
    .addField(`ID`, `${user.id}`, true)
    .addField(`Durum`, userinfo.status, true)
    .addField(`Bot Mu?`, userinfo.bot, true)
    .addField(`Katılım Tarihi (Discord)`, userinfo.dctarih, false)
      .addField(`Katılım Tarihi (Sunucu)`, userinfo.dctarihkatilma, false)
      .addField(

      `Güvenilirlik?`,

      `${

        new Date().getTime() - user.createdAt.getTime() <

        15 * 24 * 60 * 60 * 1000

          ? "**__Tehlikeli__**"

          : "**__Güvenli__**"

      }

`,

      true

    )
    .addField(`Rozetleri`, userinfo.rozetler, false)
  /*.setAuthor(
//DarkCode
        `${message.guild.name}`,
//DarkCode
        message.guild.iconURL({
//DarkCode
          dynamic: true,
//DarkCode
          format: "gif",
//DarkCode
          format: "png",
//DarkCode
          format: "jpg",
//DarkCode
          size: 2048
//DarkCode
        })
//DarkCode
      )*/
//DarkCode
      .addField(

        `Üyelerin Bağlandığı Cihazlar:`,

        `**${pc}** Kişi **__Bilgisayardan__**\n**${web}** Kişi **__Webden__**\n**${mobil}** Kişi İse **__Mobilden__** Bağlanıyor!`,

        true

      )
//DarkCode
/*
      .setFooter(

        `${message.author.tag} Tarafından İstendi!`,

        message.author.avatarURL({

          dynamic: true,

          format: "gif",

          format: "png",

          format: "jpg",

          size: 2048*/
    .setFooter(client.user.username, client.user.avatarURL())
          

message.channel.send(DarkCode);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "kullanıcıbilgi",
  description: "Kullanıcının Bilgilerini Gösterir.",
  usage: "kullanicibilgi"
};
