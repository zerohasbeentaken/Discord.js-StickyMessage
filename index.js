const express = require("express") 
const app = express()

app.get("/", (req, res) => {
  res.send("Hello World")
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
  
client.login(process.env.token)
