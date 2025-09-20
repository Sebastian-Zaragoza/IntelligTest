import { CorsOptions } from "cors";
/*
export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (origin === process.env.FRONTEND_URL) {
            return callback(null, true);
        }

        callback(new Error(`CORS no found: ${origin}`));
    },
    credentials: true,
};*/

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        console.log("Request Origin:", origin);
        callback(null, true);
    },
    credentials: true,
};

