// This folder will hold all your app's models. Models are what are used for interacting with the database. Any interaction with a database should go through a model. A general convention with models is that their filenames are capitalized and singular (e.g. `User.js`).
// Models manage our data. They are responsible for the shape of our data and retrieving that data from a data store.
// The model will then expose an interface to the rest of the application. Any other file doesn't need to concern itself with how the data is managed.
const pool = require('../utils/pool');

module.exports = class Color {
  hex;
  rgb;
  hsl;
  name;

  constructor(row) {
    // this Color instance = database row data
    this.hex = row.hex;
    this.rgb = row.rgb;
    this.hsl = row.hsl;
    this.name = row.name;
  }

  // Create
  static async insert({ hex, rgb, hsl, name }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          colors (hex, rgb, hsl, name)
        VALUES
          ($1, $2, $3, $4)
        RETURNING
          *;
        `,
      [hex, rgb, hsl, name]
    );
    return new Color(rows[0]);
  }

  // Read
  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          colors;
        `
    );

    return rows.map((row) => new Color(row));
  }
  // Update
  // Delete
};
