import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/lib/models';
import { getUserFromToken } from '@/lib/auth';
import { ApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
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

    // Find user and update last active
    const user = await User.findById(tokenData.userId);
    
    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'User not found',
      }, { status: 404 });
    }

    user.lastActive = new Date();
    await user.save();

    // Remove sensitive data
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { user: userResponse },
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}
