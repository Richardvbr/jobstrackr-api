import express, { Request, Response, type Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';

import { corsOptions } from '@/config/cors';
import errorMiddleware from '@/middlewares/error.middleware';
import requireAuth from '@/middlewares/auth.middleware';
import userRouter from '@/routes/user.route';
import applicationsRouter from '@/routes/application.route';

const app: Application = express();
const PORT = process.env.PORT ?? 4000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

// Routes
app.use('/api/v1/users', requireAuth, userRouter);
app.use('/api/v1/applications', requireAuth, applicationsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('JobsTrackr API');
});

app.listen(PORT, () => {
  console.log(`JobsTrackr API is running on http://localhost:${PORT}`);
});

export default app;
