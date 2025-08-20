import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken, hasSpecificPermission, PERMISSIONS } from '@/lib/auth';
import { User } from '@/types';
import { ApiResponse } from '@/types';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: User['role'];
  };
}

// Middleware to verify JWT token
export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Authorization header required',
      }, { status: 401 });
    }

    const tokenData = getUserFromToken(authHeader);

    if (!tokenData) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid or expired token',
      }, { status: 401 });
    }

    // Add user data to request
    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.user = tokenData;

    return handler(authenticatedRequest);
  };
}

// Middleware to check specific permissions
export function withPermission(
  permission: keyof typeof PERMISSIONS,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return withAuth(async (request: AuthenticatedRequest): Promise<NextResponse> => {
    if (!request.user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Authentication required',
      }, { status: 401 });
    }

    if (!hasSpecificPermission(request.user.role, permission)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Insufficient permissions',
      }, { status: 403 });
    }

    return handler(request);
  });
}

// Middleware to check role-based access
export function withRole(
  requiredRole: User['role'],
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return withAuth(async (request: AuthenticatedRequest): Promise<NextResponse> => {
    if (!request.user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Authentication required',
      }, { status: 401 });
    }

    const roleHierarchy = {
      fan: 0,
      moderator: 1,
      admin: 2,
      artist: 3,
    };

    if (roleHierarchy[request.user.role] < roleHierarchy[requiredRole]) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Insufficient permissions',
      }, { status: 403 });
    }

    return handler(request);
  });
}
