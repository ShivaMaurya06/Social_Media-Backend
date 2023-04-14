import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: 'myysession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'strict',
    maxAge: 2 * 60 * 60 * 1000
  }
}))

app.get('/', ( req, res ) => {
    res.send('API is Running...')
})

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.use(notFound)
app.use(errorHandler)
 
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening on ", port);
});