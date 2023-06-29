const Campground = require("../models/campground")
const cities = require("./cities")
const mongoose = require('mongoose');
const { places, descriptors } = require("./seedHelpers")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    });
    console.log("DATABASE CONNECTED!")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6473bb1582f60ae91e32e193",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque animi numquam vero aliquid fuga, enim ad veritatis laudantium quaerat consectetur odit magnam labore quisquam dolor? Eos rerum officia unde doloribus.",
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfzn5oyu0/image/upload/v1685922397/YelpCamp/pdadedi109ozpq72ksfc.png',
                    filename: 'YelpCamp/pdadedi109ozpq72ksfc',
                },
                {
                    url: 'https://res.cloudinary.com/dfzn5oyu0/image/upload/v1685922397/YelpCamp/ps63wpnlimzzzlqrixqe.png',
                    filename: 'YelpCamp/ps63wpnlimzzzlqrixqe',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})