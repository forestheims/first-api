-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS colors;

CREATE TABLE colors (
    hex TEXT PRIMARY KEY NOT NULL,
    rgb TEXT NOT NULL,
    hsl TEXT NOT NULL,
    name TEXT
);

INSERT INTO
  colors (hex, rgb, hsl, name)
VALUES
  ('02bfde', '2,191,222', '188,98,44', NULL),
  ('ff69b4', '255,105,180', '330,100,71', 'HotPink'),
  ('bbf099', '187,240,153', '97,74,77', NULL);