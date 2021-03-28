const axios = require('axios')

function formattedDate(date) {
  const githubSubscriptionDate = new Date(date)
  const day = githubSubscriptionDate.getDate()
  const month = githubSubscriptionDate.getMonth() + 1
  const year = githubSubscriptionDate.getFullYear()

  return `${day}/${month}/${year}`
}

module.exports = {
  async index(req, res) {
    try {
      const { data } = await axios.get('https://api.github.com/orgs/grupotesseract/public_members')
      return res.render("allUsers", {users:data})
    } catch(err) {
      console.log(err)
    }
  },

  async search(req, res) {
    try {
      const { filter } = req.query

      const { data } = await axios.get('https://api.github.com/orgs/grupotesseract/public_members')

      let filteredUsers = []

      data.map( user => {
        if (user.login.toLowerCase().includes(filter.toLowerCase())) {
          filteredUsers.push(user)
        }
      })

      return res.render("allUsers", { users: filteredUsers })
    } catch(err) {
      console.log(err)
    }
  },

  async user(req, res) {
    try {
      const { login } = req.params
      const { data: user } = await axios.get(`https://api.github.com/users/${login}`)

      if (user.login == login) {
        user.created_at = formattedDate(user.created_at)
        return res.render("user", { user })
      } else {
        return res.send("This user was not found.")
      }
    } catch (err) {
      console.log(err)
    }
  }
}