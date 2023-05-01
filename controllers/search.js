const axios = require("axios");
const mongoose = require('mongoose');
const Favorites = mongoose.model('Favorites');
const User = mongoose.model('User');
let db = require('mongodb').MongoClient;

module.exports = {
    
    search: (req, res) => {
    res.render('search');
},

    processInformation: async (req, res) => {
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
        let wantedUser = req.session.user.username;
      //   console.log(wantedUser)
              let favorites = allFavorites.filter((p) => {
                if(wantedUser === p.username){
                  return {
                    id: p.id,
                    name: p.name,
                    url: p.url,
                    image: p.image,
                    favorited: p.favorited
                  };
              }
          });

        const showInfo = axios.get(`https://api.tvmaze.com/search/shows?q=${req.body.search}`)
        .then(response => {
            const shows = [];
            for(let i = 0; i < 10; i++){
            
            shows[i] = response.data.at(i);

            if(i == 9){
                // console.log(shows);
            const filteredShows = shows.map((p) => {
                return {
                    id: p.show.id,
                    name: p.show.name,
                    url: p.show.url,
                    image: p.show.image,
                    favorited: false
                }
            });
                // console.log(favorites)
            for(let i = 0; i < filteredShows.length; i++){
                for(let o = 0; o < favorites.length; o++){
                    if(filteredShows.at(o).id == favorites.at(o).id){
                        filteredShows.at(o).favorited = true;
                    }
                }
            }

                // console.log(filteredShows); //Use this if you want the console version of the array

                res.render('search', {
                    shows: filteredShows,
                });
            
            };
        }
        });
            

       },

    addToFavorites: async (req, res) => {
        console.log(req.params.id);
        console.log(req.params.name);
        console.log(req.params.url);
        console.log(req.params.image);
        console.log(req.params)
        console.log(req.session.user.username)
        
        // const input1Value = document.getElementById("id").value;
        // const input2Value = document.getElementById("name").value;
        // const input3Value = document.getElementById("url").value;
        // const input4Value = document.getElementById("image").value;

        await Favorites.create({
            username: req.session.user.username,
            id: req.body.id,
            name: req.body.name,
            url: req.body.url,
            image: req.body.image,
            favorited: true
      }).catch((err) => {
        req.session.flash = {
            type: 'fail',
            intro: "Favorite failed",
            message: "Could not favorite item",
        };
        res.redirect('search');
        return [];
      });
      res.redirect('search');

    },

    removeFromFavorites: async (req, res) => {
        if (req.params.id) {
            try {
              // Remove the disaster
              await Favorites.deleteOne({id: req.params.id});
              // Send the message back as a flash
              req.session.flash = {
                type: "success",
                intro: "Report Deleted",
                message: "The report has been deleted.",
              };
            } catch (err) {
              console.error(err);
              req.session.flash = messages.serverError;
            }
            res.redirect('search');
          } else {
            res.redirect('search');
          }
    }
    }

