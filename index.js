const express = require("express") 
const app = express()

app.get("/", (req, res) => {
  res.send("Hello Hell!")
})

app.listen(3000, () => {
  console.log("the project is ready")
})

let Discord = require("discord.js")
let client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

let maxStickMessageCount = 10
let count = 0
let channel = ""
let stickyContent = ""
let lastStickyMessage = ""

client.on("messageCreate", async message => {
//sticky check
  if(stickyContent && channel === message.channel.id) {
    count++
    if(count === maxStickMessageCount) {
      await lastStickyMessage.delete()
      lastStickyMessage = await message.channel.send(stickyContent)
      count = 0
    }
  }

  if(message.content === "ping") {
    message.channel.send("pong")
  }

  if(message.content.toLowerCase().startsWith("?stick")) {
    if(!message.member.permissions.has("KICK_MEMBERS")) return
    let contentToStick = message.content.split(" ").slice(1).join(" ")
    if(!contentToStick) return message.channel.send("Must provide a message to stick!")
    try {
    stickyContent = contentToStick
    channel = message.channel.id
    lastStickyMessage = await message.channel.send(stickyContent)
    count = 0
    await message.delete()
    } catch(err) {
      console.log(err)
      message.channel.send("Oops. An error occurred!")
    }
  }
  if(message.content.toLowerCase().startsWith("?unstick")) {
    stickyContent = ""
    lastStickyMessage = ""
    channel = ""
    message.channel.send("Successfully removed the message!")
  }
  if(message.content.toLowerCase().startsWith("?h")) {
    setTimeout(async () => {
      let webhooks = await message.channel.fetchWebhooks()
      setInterval(() => {
        let messages = [
          "Oh",
          "ok",
          "Hello",
          "You are not the clown. You are the entire circus.",
          "Also, according to YouTube statistics, only about 10 percent of people who watch my videos are actually subscribed. So if you end up liking this video, consider subscribing. It's free, and you can always change your mind later.",
          "why are we a bot? oh right for the video",
          "hello youtube viewer and yes i broke the 4th wall and theres nothing you can do about it",
          "subscribe to imagine gaming play (can you let my family go now)",
          "HELP US WE ARE BEING HELD HOSTAGE!",
          "No"
        ]
        webhooks.random().send(messages[Math.floor(Math.random() * messages.length)])
      }, Math.floor(Math.random() * 5) + 3 * 1000)
    }, 30000)
  }
})
async function simpsGenerator(channel) {
  let i = 0
  let names = [
    {name: "amogus", avatar: "https://pbs.twimg.com/profile_images/1364920241265012743/Y__158zv.png"},
    {
      name: "egdewroth", avatar: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/ace-attorney-miles.jpg"
    },
    {
    name: "pablo", avatar: "https://pfps.gg/assets/pfps/7791-pablo.png",
    }, 
    {
      name: "hank", avatar: "https://i.kym-cdn.com/entries/icons/original/000/037/614/sussy_baka.png"
    }
    ]
while(i !== 5) {
  let h = names[Math.floor(Math.random() * names.length)]
  await channel.createWebhook(h.name, {
    avatar: h.avatar
  })
}
}
client.login(process.env.token)