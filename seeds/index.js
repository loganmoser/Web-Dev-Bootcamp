const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6286575bf2d0c808392c6aec',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
              type: 'Point', 
              coordinates: [cities[random1000].longitude, 
              cities[random1000].latitude] },
            images : [
                {
                  url: 'https://res.cloudinary.com/drs3bjvkv/image/upload/v1654012299/YelpCamp/lbe2yzd6opnlce8cnphz.jpg',
                  filename: 'YelpCamp/lbe2yzd6opnlce8cnphz'
                },
                {
                  url: 'https://res.cloudinary.com/drs3bjvkv/image/upload/v1654012300/YelpCamp/kgt0erodsqyzensgcjib.jpg',
                  filename: 'YelpCamp/kgt0erodsqyzensgcjib'
                },
                {
                  url: 'https://res.cloudinary.com/drs3bjvkv/image/upload/v1654012301/YelpCamp/aqw9fczuq4zrlpt1omjm.jpg',
                  filename: 'YelpCamp/aqw9fczuq4zrlpt1omjm'
                }
              ]
              ,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})