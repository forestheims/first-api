// This folder will hold all your app's route handlers (aka `controllers`). Use controllers to define the app routes you want to use for a given resource. Controllers are responsible for taking a request and routing it to the appropriate place, whether that be a model, service, or some other utility. Controllers are also responsible for sending responses back to the client once we're done with their request.  A general convention with controllers is that their filenames are lowercase and plural (e.g `users.js`).
const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  // HELLO
  // CREATE /api/v1/colors
  .post('/', async (req, res) => {
    const color = await Color.insert(req.body);
    res.json(color);
  });
// READ
// UPDATE
// DELETE
