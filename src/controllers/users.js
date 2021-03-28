const axios = require('axios')

module.exports = {
  async index(req, res) {
    try {
      const { data } = await axios.get('https://api.github.com/orgs/grupotesseract/public_members')
      return res.render("allUsers", {users:data})
    } catch(err) {
      console.log(err)
    }
  },
}