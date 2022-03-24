// This folder will hold all your app's service files. Services are where our business/domain logic exists — meaning that all the behaviors and features that make our app unique will exist within a service.

// Services are not responsible for talking to the database, and they are not responsible for handling incoming input. They are responsible for solving real problems

// Some examples of services:

// * Hash a user password before saving it to the database via a `User` model
// * Send an email using Amazon SES
// * Send a text message to someone when a new order is made
// * Upload files to an S3 bucket
// * Fetch info from a web API to fill in data
// * Use the tensorflow toxicity model to reject toxic text

// const fetch = require('cross-fetch');

const Color = require('../models/Color');

module.exports = class ColorService {
  static async create({ hex, rgb, hsl, name }) {
    const color = await Color.insert({ hex, rgb, hsl, name });
    return color;
  }

  static async getAll() {
    const colors = await Color.getAll();
    return colors;
  }

  static async getOne(hex) {
    const color = await Color.findByHex(hex);
    return color;
  }

  static async update(hex, newAttributes) {
    const color = await Color.update(hex, newAttributes);
    return color;
  }

  static async delete(hex) {
    const color = await Color.deleteByHex(hex);
    return color;
  }
};
