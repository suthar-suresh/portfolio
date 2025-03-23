// app/api/get-ip/route.ts
import { NextRequest } from 'next/server';

interface IpResponse {
  ip: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    console.log('Fetching IP address...');

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'Unknown';

    console.log('IP address fetched:', ip);

    return Response.json({ ip } satisfies IpResponse, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching IP:', error);
    return Response.json(
      { error: 'Failed to get IP' } satisfies ErrorResponse,
      { status: 500 }
    );
  }
}