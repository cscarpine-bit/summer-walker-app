import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('Please define JWT_SECRET in your environment variables');
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT token functions
export interface JWTPayload {
  userId: string;
  email: string;
  role: User['role'];
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
    issuer: 'summer-walker-app',
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'summer-walker-app',
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// Role-based access control
export const ROLE_HIERARCHY = {
  fan: 0,
  moderator: 1,
  admin: 2,
  artist: 3,
} as const;

export function hasPermission(userRole: User['role'], requiredRole: User['role']): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function canAccessTier(userTier: User['tier'], requiredTier: User['tier']): boolean {
  const tierLevels = {
    free: 0,
    premium: 1,
    vip: 2,
  };
  
  return tierLevels[userTier || 'free'] >= tierLevels[requiredTier];
}

// Permission checks for specific actions
export const PERMISSIONS = {
  // Content management
  CREATE_HERO_SLIDE: ['artist', 'admin'],
  EDIT_HERO_SLIDE: ['artist', 'admin'],
  DELETE_HERO_SLIDE: ['artist', 'admin'],
  
  CREATE_EVENT: ['artist', 'admin'],
  EDIT_EVENT: ['artist', 'admin'],
  DELETE_EVENT: ['artist', 'admin'],
  
  CREATE_MUSIC: ['artist', 'admin'],
  EDIT_MUSIC: ['artist', 'admin'],
  DELETE_MUSIC: ['artist', 'admin'],
  
  CREATE_PRODUCT: ['artist', 'admin'],
  EDIT_PRODUCT: ['artist', 'admin'],
  DELETE_PRODUCT: ['artist', 'admin'],
  
  // Live streaming
  CREATE_LIVESTREAM: ['artist', 'admin'],
  START_LIVESTREAM: ['artist', 'admin'],
  END_LIVESTREAM: ['artist', 'admin'],
  
  // User management
  BAN_USER: ['artist', 'admin', 'moderator'],
  DELETE_USER: ['artist', 'admin'],
  ASSIGN_ROLE: ['artist'],
  
  // Chat moderation
  DELETE_MESSAGE: ['artist', 'admin', 'moderator'],
  TIMEOUT_USER: ['artist', 'admin', 'moderator'],
  
  // Analytics
  VIEW_ANALYTICS: ['artist', 'admin'],
} as const;

export function hasSpecificPermission(
  userRole: User['role'],
  permission: keyof typeof PERMISSIONS
): boolean {
  return PERMISSIONS[permission].includes(userRole);
}

// Utility function to extract user from token
export function getUserFromToken(token: string): JWTPayload | null {
  if (!token) return null;
  
  // Remove 'Bearer ' prefix if present
  const cleanToken = token.replace(/^Bearer\s+/, '');
  return verifyToken(cleanToken);
}
