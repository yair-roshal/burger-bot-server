import request from 'supertest';
import express from 'express';
import serverFunction from '../server/server';
import { generateDateId } from '../server/helpers/utils';

jest.mock('../server/helpers/utils', () => ({
  generateDateId: jest.fn().mockReturnValue('20240101000000'),
}));

describe('Server', () => {
  let app: express.Application;
  let mockBot: any;

  beforeEach(() => {
    mockBot = {
      answerWebAppQuery: jest.fn().mockResolvedValue({}),
    };
    app = serverFunction(mockBot);
  });

  describe('GET /', () => {
    it('should respond with 404 Not Found', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
    });
  });

  describe('POST /send_sms_tele', () => {
    const validPayload = {
      queryId: '123',
      cartItems: [{ title: 'Test Item', price: 10, quantity: 1 }],
      totalPrice: 10,
      optionDelivery: 'Pickup',
      paymentMethod: 'Cash',
      user_name: 'Test User',
    };

    it('should handle valid payload and return 200', async () => {
      const response = await request(app)
        .post('/send_sms_tele')
        .send(validPayload);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ titleStatus: 'send_sms_tele__success-200' });
      expect(mockBot.answerWebAppQuery).toHaveBeenCalled();
    });

    it('should handle payload with extras and toppings', async () => {
      const payloadWithExtrasAndToppings = {
        ...validPayload,
        cartItems: [
          {
            title: 'Test Item',
            price: 10,
            quantity: 2,
            selectedExtrasNames: { 'Extra Cheese': '2₪' },
            toppings: [{ title: 'Bacon', price: 3, count: 1 }],
          },
        ],
      };

      const response = await request(app)
        .post('/send_sms_tele')
        .send(payloadWithExtrasAndToppings);

      expect(response.status).toBe(200);
      expect(mockBot.answerWebAppQuery).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          input_message_content: expect.objectContaining({
            message_text: expect.stringContaining('Extra Cheese - 2₪'),
          }),
        })
      );
      expect(mockBot.answerWebAppQuery).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          input_message_content: expect.objectContaining({
            message_text: expect.stringContaining('Bacon = 3₪ * 2 = 6.00₪'),
          }),
        })
      );
    });

    it('should handle payload with comment', async () => {
      const payloadWithComment = {
        ...validPayload,
        comment: 'Please deliver quickly',
      };

      const response = await request(app)
        .post('/send_sms_tele')
        .send(payloadWithComment);

      expect(response.status).toBe(200);
      expect(mockBot.answerWebAppQuery).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          input_message_content: expect.objectContaining({
            message_text: expect.stringContaining('Please deliver quickly'),
          }),
        })
      );
    });

    it('should handle missing bot', async () => {
      const appWithoutBot = serverFunction();
      const response = await request(appWithoutBot)
        .post('/send_sms_tele')
        .send(validPayload);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ titleStatus: 'send_sms_tele__success-200' });
    });

    it('should handle bot error and return 500', async () => {
      const errorBot = {
        answerWebAppQuery: jest.fn().mockRejectedValue(new Error('Bot error')),
      };
      const appWithErrorBot = serverFunction(errorBot);

      const response = await request(appWithErrorBot)
        .post('/send_sms_tele')
        .send(validPayload);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        titleStatus: 'error on server - 500 _answerWebAppQuery',
        details: 'Bot error',
      });
    });

    it('should handle missing required fields', async () => {
      const invalidPayload = {
        queryId: '123',
        // Missing other required fields
      };

      const response = await request(app)
        .post('/send_sms_tele')
        .send(invalidPayload);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('titleStatus', 'error on server - 500 _answerWebAppQuery');
    });
  });

  describe('CORS', () => {
    it('should have CORS enabled', async () => {
      const response = await request(app).options('/');
      expect(response.headers['access-control-allow-origin']).toBeTruthy();
    });
  });

  describe('generateDateId', () => {
    it('should use generateDateId for order number', async () => {
      const response = await request(app)
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
      expect(mockBot.answerWebAppQuery).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          input_message_content: expect.objectContaining({
            message_text: expect.stringContaining('Your order № 20240101000000'),
          }),
        })
      );
    });
  });
});