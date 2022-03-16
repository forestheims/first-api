const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Color = require('../lib/models/Color');

describe('first-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a row in the colors table', async () => {
    const expected = {
      hex: 'ab500c',
      rgb: '171,80,12',
      hsl: '26,87,36',
      name: '',
    };
    const res = await request(app).post('/api/v1/colors').send(expected);
    expect(res.body).toEqual({ ...expected });
  });

  it('gets all rows from the colors table', async () => {
    const expected = await Color.getAll();
    const res = await request(app).get('/api/v1/colors');
    expect(res.body).toEqual(expected);
  });

  it('gets a unique row from the colors table by hex', async () => {
    const expected = await Color.findByHex('02bfde');
    const res = await request(app).get(`/api/v1/colors/${expected.hex}`);
    expect(res.body).toEqual(expected);
  });

  it('updates a row in the colors table by hex', async () => {
    const initial = {
      hex: 'ab500c',
      rgb: '171,80,12',
      hsl: '26,87,36',
      name: '',
    };
    await request(app).post('/api/v1/colors').send(initial);
    const expected = {
      hex: 'ab500c',
      rgb: '171,80,12',
      hsl: '26,87,36',
      name: 'orangeish',
    };
    const res = await request(app).patch('/api/v1/colors/ab500c').send({
      name: 'orangeish',
    });
    expect(res.body).toEqual(expected);
  });

  it('deletes a row from the colors table by hex', async () => {
    const expected = await Color.findByHex('02bfde');
    const res = await request(app).delete(`/api/v1/colors/${expected.hex}`);
    expect(res.body).toEqual(expected);
  });

  it('returns 404 for color not found', async () => {
    const res = await request(app).get('/api/v1/colors/0x0x0x');
    expect(res.status).toEqual(404);
  });
});
