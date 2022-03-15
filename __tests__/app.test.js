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
});
