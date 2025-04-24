// seed.js
const dotenv = require('dotenv');
const Theater = require('./models/Theater');
const connectDB = require('./config/db');
dotenv.config();
const theaters = [
  {
    name: "PVR Cinemas",
    location: "Phoenix Mall, Viman Nagar",
    city: "Bengaluru",
    screens: 8
  },
  {
    name: "INOX Leisure",
    location: "Garuda Mall, MG Road",
    city: "Bengaluru",
    screens: 6
  },
  {
    name: "Cinepolis",
    location: "Saket District Centre",
    city: "Bengaluru",
    screens: 10
  },
  {
    name: "SPI Cinemas",
    location: "Express Avenue Mall",
    city: "Bengaluru",
    screens: 5
  },
  {
    name: "Carnival Cinemas",
    location: "Banjara Hills",
    city: "Bengaluru",
    screens: 7
  },
  {
    name: "INOX Multiplex",
    location: "Salt Lake City",
    city: "Bengaluru",
    screens: 6
  },
  {
    name: "PVR Icon",
    location: "Pavillion Mall, SB Road",
    city: "Bengaluru",
    screens: 9
  },
  {
    name: "Cinepolis VIP",
    location: "Lower Parel",
    city: "Bengaluru",
    screens: 4
  },
  {
    name: "Movietime Cinemas",
    location: "Andheri West",
    city: "Bengaluru",
    screens: 5
  },
  {
    name: "PVR Select Citywalk",
    location: "Saket",
    city: "Bengaluru",
    screens: 7
  }
];

async function seed() {
  try {
    connectDB();
    await Theater.deleteMany({});
    await Theater.insertMany(theaters);
    console.log('Database seeded successfully!');
  } catch (err) {
    console.error(err);
  }
}

seed();
