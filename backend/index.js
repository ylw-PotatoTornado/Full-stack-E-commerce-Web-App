import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import Redis from 'ioredis';
import { RedisStore } from 'connect-redis';

import { connectDB} from "./configs/db.js";


dotenv.config();

const api = express()
const redisClient = new Redis();
const port = process.env.PORT || 8000;


{/** Cross-origin Requests (CORS) */}
const devOrigin = [/http:\/\/localhost:.*/];
const prodOrigin = process.env.FRONT_END_BASE_URL;
const origin = process.env.NODE_ENV === "production" ? prodOrigin : devOrigin;

api.use(cors({
    origin: origin,
    credentials: true,
}))


{/** Session Config */}
const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
});

api.use(session({
    secret: process.env.NODE_ENV === "production" ? process.env.SESSION_SECRET : process.env.SESSION_SECRET_DEV,
    store: redisStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }
}))






api.get('/', (req, res) => {
        res.status(200).send('Welcome!.')
});



console.log(`Node Environment: ${process.env.NODE_ENV}`);

(async () => {
    try {
        console.log('Connecting to DB...');
        await connectDB();
        api.server = api.listen(port, () => {
            console.log(`Server started at port: ${port}, current environment: ${process.env.NODE_ENV}`);
        });

    } catch (error) {
        console.error('Server failed to start', error);
        process.exit(1);
    }
})();

export default api;