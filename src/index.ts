import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './services/db';
import movieRoutes from './routes/movieRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', movieRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;