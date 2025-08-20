import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/lib/models';
import { hashPassword, generateToken } from '@/lib/auth';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password, name, role = 'fan' } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email, password, and name are required',
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'User with this email already exists',
      }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role === 'artist' ? 'fan' : role, // Prevent self-assignment of artist role
      profile: {
        name: name.trim(),
      },
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        user: userResponse,
        token,
      },
      message: 'Registration successful',
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}
