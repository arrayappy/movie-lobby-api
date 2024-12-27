import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import { Movie } from '../src/models/Movie';

describe('Movie API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-lobby-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Movie.deleteMany({});
  });

  describe('GET /api/movies', () => {
    it('should return all movies', async () => {
      await Movie.create({
        title: 'Test Movie',
        genre: 'Action',
        rating: 8.5,
        streamingLink: 'http://example.com/movie'
      });

      const res = await request(app).get('/api/movies');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe('POST /api/movies', () => {
    it('should create a new movie when admin role is provided', async () => {
      const res = await request(app)
        .post('/api/movies')
        .set('x-user-role', 'admin')
        .send({
          title: 'New Movie',
          genre: 'Drama',
          rating: 9.0,
          streamingLink: 'http://example.com/newmovie'
        });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('New Movie');
    });

    it('should throw error when admin role is not provided', async () => {
      const res = await request(app)
        .post('/api/movies')
        .send({
          title: 'New Movie',
          genre: 'Drama',
          rating: 9.0,
          streamingLink: 'http://example.com/newmovie'
        });

      expect(res.status).toBe(403);
    });
  });
});