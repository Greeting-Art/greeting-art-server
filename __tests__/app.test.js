const request = require('supertest');
const app = require('../lib/app.js');
// const cors = require('cors');

describe( 'Routes for GreetingArt app', () => {


  it( 'gets a list of objects from the s3 bucket', async()=> {
    const response = await request(app)
    .get('/gallery')
    expect(response.body).toHaveProperty('Contents')
  })

  it('Allows users to post a file and returns a response from the s3 bucket', async () => {
    const response = await request(app)
    .post('/upload')
    .attach('image','/Users/eionnelson/Alchemy/greeting-art-server/data/assset/1b5bb16e-ea99-49e6-b5a4-1b981454abb1.jpg' )
    expect(response.body).toHaveProperty('ETag')
    expect(response.body).toHaveProperty('Bucket', 'greetingart')
    expect(response.body).toHaveProperty('Location')
  })

})
