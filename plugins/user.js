const { command, parsedJid } = require('../lib')
const { WarnDB } = require('../lib/database')
const { WARN_COUNT } = require('../config')
const { saveWarn, resetWarn } = WarnDB

command(
 {
  pattern: 'warn',
  fromMe: true,
  desc: 'Warn a user',
  type: 'user',
 },
 async (message, match) => {
  const userId = message.mention[0] || message.reply_message.jid
  if (!userId) return message.reply('_Mention or reply to someone_')
  let reason = message?.reply_message.text || match
  reason = reason.replace(/@(\d+)/, '')
  reason = reason ? reason.length <= 1 : 'Reason not Provided'

  const warnInfo = await saveWarn(userId, reason)
  let userWarnCount = warnInfo ? warnInfo.warnCount : 0
  userWarnCount++
  await message.reply(`_User @${userId.split('@')[0]} warned._ \n_Warn Count: ${userWarnCount}._ \n_Reason: ${reason}_`, { mentions: [userId] })
  if (userWarnCount > WARN_COUNT) {
   const jid = parsedJid(userId)
   await message.sendMessage(message.jid, 'Warn limit exceeded kicking user')
   return await message.client.groupParticipantsUpdate(message.jid, jid, 'remove')
  }
  return
 }
)

command(
 {
  pattern: 'rwarn',
  fromMe: true,
  desc: 'Reset warnings for a user',
  type: 'user',
 },
 async message => {
  const userId = message.mention[0] || message.reply_message.jid
  if (!userId) return message.reply('_Mention or reply to someone_')
  await resetWarn(userId)
  return await message.reply(`_Warnings for @${userId.split('@')[0]} reset_`, {
   mentions: [userId],
  })
 }
)
