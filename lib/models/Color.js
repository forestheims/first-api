const pool = require('../utils/pool');

module.exports = class Color {
  hex;
  rgb;
  hsl;
  name;

  constructor(row) {
    this.hex = row.hex;
    this.rgb = row.rgb;
    this.hsl = row.hsl;
    this.name = row.name;
  }

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

  static async findByHex(hex) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            colors
        WHERE
            hex=$1;
        `,
      [hex]
    );
    return new Color(rows[0]);
  }

  static async update(hexKey, newAttributes) {
    const existingColor = await Color.findByHex(hexKey);
    const updatedColor = { ...existingColor, ...newAttributes };
    const { hex, rgb, hsl, name } = updatedColor;
    const { rows } = await pool.query(
      `
        UPDATE
          colors
        SET
          hex=$1,
          rgb=$2,
          hsl=$3,
          name=$4
        WHERE
          hex=$1
        RETURNING
          *;
      `,
      [hex, rgb, hsl, name]
    );
    return new Color(rows[0]);
  }

  static async deleteByHex(hex) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          colors
        WHERE
          hex=$1
        RETURNING
          *;
      `,
      [hex]
    );
    return new Color(rows[0]);
  }
};
