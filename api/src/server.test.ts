import request from 'supertest';
import app from './app';

const mockListen = jest.fn();
app.listen = mockListen;

afterEach(() => {
    mockListen.mockReset();
})

beforeAll(() => {
    require('./server');
})

test('Does the server works?', async () => {
    expect(mockListen.mock.calls.length).toBe(1);
    expect(mockListen.mock.calls[0][0]).toBe(process.env.PORT || 3000);
})

test('Is connection with external API server works?', async () => {
    const response = await request( app.callback() ).get('/osuApi');
    expect(response.status).toBe(200);
})

test('Is creating tournament working?', async () => {
    const response = await request( app.callback() )
        .post('/tournament/new')
        .send({
            'id': 1,
            'title': "TST: (X) vs (Y)",
            'titleFlattened': 'X vs Y',
            'teams': {
                'X': [1, 2, 3, 4],
                'Y': [1, 2, 3, 4]
            },
            'judge': "MrBoom",
            'timeCreated': Date.now(),
            'roomURL': 'https://osu.ppy.sh/rooms/1',
            'twitchURL': 'https://twitch.tv/osupoli',
            'mapsIdPlayed': [11111, 222222, 333333, 444444]
        });

    expect(response.status).toBe(200);
})

test('Is getting tournament info working?', async () => {
    const response = await request( app.callback() ).get('/tournament/1');

    expect(response.data).toBe({
        'id': 1,
        'title': "TST: (X) vs (Y)",
        'titleFlattened': 'X vs Y',
        'teams': {
            'X': [1, 2, 3, 4],
            'Y': [1, 2, 3, 4]
        },
        'judge': "MrBoom",
        'timeCreated': Date.now(),
        'roomURL': 'https://osu.ppy.sh/rooms/1',
        'twitchURL': 'https://twitch.tv/osupoli',
        'mapsIdPlayed': [11111, 222222, 333333, 444444]
    });
})