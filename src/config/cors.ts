import { CORS_WHITELIST } from './env';

const whitelist = CORS_WHITELIST.split(',');

export const corsOptions = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: function (origin: any, callback: any) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log('origin:', origin, 'not allowed');
      callback(new Error('Not allowed by CORS'));
    }
  },
};
