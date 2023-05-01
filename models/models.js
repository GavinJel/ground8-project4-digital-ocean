const mongoose = require('mongoose');

    /* User Schema */
    const userSchema = mongoose.Schema({
      username: String,
      password: String
    });
    mongoose.model('User', userSchema);

    /* Favorites Schema*/
    const userFavorites = mongoose.Schema({
      username: String,
      id: String,
      name: String,
      url: String,
      image: String,
      favorited: Boolean
    });
    mongoose.model('Favorites', userFavorites);