import request from 'supertest';
import app from './server';

const mockListen = jest.fn();
app.listen = mockListen;

afterEach(() => {
    mockListen.mockReset();
})

test('Does the server works?', async () => {
    require('./server');
    expect(mockListen.mock.calls.length).toBe(1);
    expect(mockListen.mock.calls[0][0]).toBe(process.env.PORT || 3000);
})