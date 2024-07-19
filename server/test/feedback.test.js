const request = require('supertest');
const app = require('../server'); // Make sure to export the app from server.js
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Feedback API', () => {
  it('should create a new feedback', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .set('x-auth-token', 'YOUR_TEST_TOKEN') // You'll need to create a test token
      .send({
        receiverId: 'RECEIVER_USER_ID',
        content: 'Great job!',
        ratings: { overall: 5, personality: 4, athleticism: 5, creativity: 4, integrity: 5 },
        isAnonymous: false
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  // Add more tests for other routes
});