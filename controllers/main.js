const mongoose = require('mongoose');
const User = mongoose.model('User');
const Favorites = mongoose.model('Favorites');

const main = {
    root: async (req, res) => {
            // console.log(req.session.user)
            if(req.session.user){
      const allFavorites = await Favorites.find()
      .lean()
      .catch((err) => {
        console.error(err);
        return [];
      });
      const allUser = await User.find()
      .lean()
      .catch((err) => {
        console.error(err);
        return [];
      });


    //   console.log(allFavorites);
    //   console.log(wantedUser)
            let favorites = allFavorites.filter((p) => {
              if(req.session.user.username === p.username){
                return {
                  id: p.id,
                  name: p.name,
                  url: p.url,
                  image: p.image
                };
            }
        });
        if(req.session.user){
            // console.log(favorites)
            res.render('home', {
                favorites: favorites
            });
            return [];
        }
    }
        res.render('home');
    },

    }


module.exports = main;