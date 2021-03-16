const express = require("express")
const app = express();
const PORT = 5000

require('dotenv/config')
const api = process.env.API_URL


app.get("/", (req, res) => {
  res.send("Hello API!")
})

app.listen(PORT, () => {
  console.log(api);
  console.log(`Server is running on http://localhost:${PORT}`)
})