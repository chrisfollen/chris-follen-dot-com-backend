module.exports = {

  // development: {
  //   client: 'pg',
  //   connection: {
  //     filename: 'postgres:///journal20'
  //   }
  // },

    production: {
      client: 'pg',
      connection: {
        database: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    }

}