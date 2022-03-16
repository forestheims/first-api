const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  // CREATE /api/v1/colors
  .post('/', async (req, res) => {
    const color = await Color.insert(req.body);
    res.json(color);
  })
  // READ ALL /api/v1/colors
  .get('/', async (req, res) => {
    const colors = await Color.getAll();
    res.json(colors);
  })
  // READ SINGLE /api/v1/colors/:hex
  .get('/:hex', async (req, res, next) => {
    try {
      const color = await Color.findByHex(req.params.hex);
      res.json(color);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  // UPDATE /api/v1/colors/:hex
  .patch('/:hex', async (req, res) => {
    const color = await Color.update(req.params.hex, req.body);
    res.json(color);
  })
  // DELETE /api/v1/colors/:hex
  .delete('/:hex', async (req, res) => {
    const color = await Color.deleteByHex(req.params.hex);
    res.json(color);
  });
