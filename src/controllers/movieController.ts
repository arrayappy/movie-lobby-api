import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;
    const movies = await Movie.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { genre: new RegExp(query, 'i') }
      ]
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: 'Invalid movie data' });
  }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: 'Invalid movie data' });
  }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};