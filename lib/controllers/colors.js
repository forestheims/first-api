const { Router } = require('express');
const Color = require('../models/Color');
const ColorService = require('../services/ColorService');

module.exports = Router()
  // CREATE /api/v1/colors
  .post('/', async (req, res) => {
    // const color = await Color.insert(req.body);
    const color = await ColorService.create(req.body);
    res.json(color);
  })
  // READ ALL /api/v1/colors
  .get('/', async (req, res) => {
    // const colors = await Color.getAll();
    const colors = await ColorService.getAll();
    res.json(colors);
  })
  // READ SINGLE /api/v1/colors/:hex
  .get('/:hex', async (req, res, next) => {
    try {
      // const color = await Color.findByHex(req.params.hex);
      const color = await ColorService.getOne(req.params.hex);
      res.json(color);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  // UPDATE /api/v1/colors/:hex
  .patch('/:hex', async (req, res) => {
    // const color = await Color.update(req.params.hex, req.body);
    const color = await ColorService.update(req.params.hex, req.body);
    res.json(color);
  })
  // DELETE /api/v1/colors/:hex
  .delete('/:hex', async (req, res) => {
    const color = await ColorService.delete(req.params.hex);
    res.json(color);
  });
