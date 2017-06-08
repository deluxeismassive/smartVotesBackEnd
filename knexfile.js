module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/smartvotes'
  },


  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
