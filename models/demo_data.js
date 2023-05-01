const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  addUsers: async () => {
    await User.create({
      username: 'pmatthews',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
    });

    await User.create({
      username: 'japple',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
    });

    await User.create({
      username: 'creynolds',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
    });

    await User.create({
      username: 'yspiegelman',
      password: '$2a$10$0Wz99HToBXUkMjSCIviZMOHF5BIFHstEPaljYKB/nUtJRJjE1WE8y',
    });
  }
};