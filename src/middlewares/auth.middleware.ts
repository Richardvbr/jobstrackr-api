import jwt, { JwtPayload } from 'jsonwebtoken';
import type { Request } from 'express';
import { supabase } from '@/config/supabase';
import { JWT_ISSUER, JWT_SECRET } from '@/config/env';
import type { User } from '@/models/user.model';

export type CustomRequest = Request & { user: User; token: string };

async function requireAuth(req: CustomRequest, res: any, next: any) {
  try {
    let token = '';

    // Handle token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: 'Unauthorized: no token provided' });

    try {
      jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256'],
        issuer: JWT_ISSUER,
      }) as JwtPayload;
    } catch (error) {
      console.error('Token verification failed:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unauthorized: invalid token';
      return res.status(401).json({ message: errorMessage });
    }

    // Check for user
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser(token);

    const { id } = user ?? {};

    if (getUserError || !id) {
      return res.status(401).json({ message: 'Unauthorized: error getting user' });
    }

    const { data } = await supabase.from('users').select('*').eq('id', id).single();

    // Attach user and token to request
    req.user = data;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export default requireAuth;
