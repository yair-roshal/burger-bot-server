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

  function generateDateId() {// 2021-05-31T12:00:00.000Z 
    const now = new Date()
    const year = String(now.getFullYear()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")
    

    return `${year}${month}${day}${hours}${minutes}${seconds}`  
  }
  function generateDateTime() {// 2021-05-31T12:00:00.000Z 
    const now = new Date()
    const year = String(now.getFullYear()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")
    

    return `${hours}${minutes}${seconds}--${day}/${month}/${year}`  
  }
  

module.exports = {
  getCurrentTimeID,
  generateId,
  generateDateId,
  generateDateTime
}
