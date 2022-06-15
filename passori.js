const bcrypt = require("bcryptjs")

const passwordEnteredByUser = "123"
const hash = "$2a$10$rFruldxUyIv.mROTg72M/.xPxpP0gPTh.ibIWAnBfYpBqBNu3jsT2"

bcrypt.compare(passwordEnteredByUser, hash, function(error, isMatch) {
  if (error) {
    throw error
  } else if (!isMatch) {
    console.log("Password doesn't match!")
  } else {
    console.log("Password matches!")
  }
})