const Theater = require('../models/Theater');

const getTheaters = async (req, res) => {
  try {
    const city = req.query.city;
    const query = city ? { city } : {};
    const theaters = await Theater.find(query);
    res.json(theaters);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching theaters' });
  }
};

module.exports = {getTheaters};
