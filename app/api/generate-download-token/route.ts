import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongo';
import { Payment } from '@/app/models/Payment';
import crypto from 'crypto';
import DownloadToken from '@/app/models/DownloadToken';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });
    }

    // Verify payment exists and succeeded
    const payment = await Payment.findOne({ paymentId });
    if (!payment || payment.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not found or not succeeded' },
        { status: 403 }
      );
    }

    // Generate a random short-lived token
    const token = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    await DownloadToken.create({ token, paymentId, expiresAt });

    return NextResponse.json({ token, expiresAt });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: err.message },
      { status: 500 }
    );
  }
}
