const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const AWS = require('aws-sdk-mock');

AWS.mock()
describe('greeting-art-server routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Posts an image to the s3 bucket', async() => {
    const res = await request(app)
    .post('/upload')
    .attach('image', '1b5bb16e-ea99-49e6-b5a4-1b981454abb1.jpg')
  })
});
