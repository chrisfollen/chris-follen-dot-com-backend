module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres:///journal20'
    }
  },

    production: {
    client: 'pg',
    connection: process.env.DATABASE_URL

}