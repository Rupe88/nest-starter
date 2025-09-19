import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongo';
import { Payment } from '@/app/models/Payment';
import crypto from 'crypto';
import DownloadToken from '@/app/models/DownloadToken';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId)
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });

    const DODO_API_BASE_URL = process.env.DODO_API_BASE_URL!;
    const DODO_API_KEY = process.env.DODO_PAYMENTS_API_KEY!;

    const urls = [
      `${DODO_API_BASE_URL}/v1/payments/${paymentId}`,
      `${DODO_API_BASE_URL}/payments/${paymentId}`,
      `${DODO_API_BASE_URL}/v2/payments/${paymentId}`,
    ];

    if (DODO_API_BASE_URL.includes('test')) {
      const prodUrl = DODO_API_BASE_URL.replace('test.', '');
      urls.push(
        `${prodUrl}/v1/payments/${paymentId}`,
        `${prodUrl}/payments/${paymentId}`,
        `${prodUrl}/v2/payments/${paymentId}`
      );
    }

    let paymentData: any = null;

    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${DODO_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) continue;
        paymentData = await res.json();
        if (paymentData.status) break;
      } catch {
        continue;
      }
    }

    if (!paymentData)
      return NextResponse.json(
        { error: 'Payment not found', paymentId },
        { status: 404 }
      );

    // Save to MongoDB
    await Payment.findOneAndUpdate(
      { paymentId },
      {
        paymentId,
        email: paymentData.customer?.email || '',
        productId: paymentData.product_cart?.[0]?.product_id || '',
        status: paymentData.status,
        raw: paymentData,
      },
      { upsert: true, new: true }
    );

    // Generate short-lived download token (10 minutes)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await DownloadToken.create({ token, paymentId, expiresAt });

    return NextResponse.json({ status: paymentData.status, token });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: err.message },
      { status: 500 }
    );
  }
}
