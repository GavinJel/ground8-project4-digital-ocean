module.exports = {
  cookieSecret: 'cookie',
  mongo: {
    development: {
      connectionString: 'mongodb+srv://gwj:password12345@cluster0.wwvsmut.mongodb.net/?retryWrites=true&w=majority' // Defaults to localhost, change if using Mongodb Atlas
    },
    production: {
      connectionString: 'mongodb+srv://gwj:password12345@cluster0.wwvsmut.mongodb.net/?retryWrites=true&w=majority'
    },
  }
};
