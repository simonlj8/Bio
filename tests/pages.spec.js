import request from 'supertest';
import app from '../static/src/app.js';

test('home page show list of movies', async () =>{
const response = await request(app)
    .get('/')
    .expect(200);
});

test('See if Batman shows right', async () =>{
    const response = await request(app)
        .get('/movies/4')
        .expect(200);    
        expect(response.text.includes('Dark Knight')).toBeTruthy();
    });

test('See if Godfather shows right', async () =>{
        const response = await request(app)
            .get('/movies/2')
            .expect(200);    
            expect(response.text.includes('Godfather')).toBeTruthy();
        });