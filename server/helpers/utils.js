const { v4: uuidv4 } = require("uuid")

function getCurrentTimeID() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  return `${hours}${minutes}${seconds}-${uuidv4()}`
}

function generateId() {
  let id = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < 16; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return id
}

module.exports = {
  getCurrentTimeID,
  generateId,
}
