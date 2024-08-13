import request from 'supertest';
import express from 'express';
import serverFunction from '../server/server';

describe('Server', () => {
  let app: express.Application;

  beforeAll(() => {
    app = serverFunction();
  });

  it('should respond to GET / with 404', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
  });

  it('should handle POST /send_sms_tele', async () => {
    const mockBot = {
      answerWebAppQuery: jest.fn().mockResolvedValue({}),
    };

    const testApp = serverFunction(mockBot);

    const response = await request(testApp)
      .post('/send_sms_tele')
      .send({
        queryId: '123',
        cartItems: [{ title: 'Test Item', price: 10, quantity: 1 }],
        totalPrice: 10,
        optionDelivery: 'Pickup',
        paymentMethod: 'Cash',
        user_name: 'Test User',
      });

    expect(response.status).toBe(200);
    expect(mockBot.answerWebAppQuery).toHaveBeenCalled();
  });
});