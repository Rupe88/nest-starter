import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongo';
import { Payment } from '@/app/models/Payment';

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });
    }

    const DODO_API_BASE_URL = process.env.DODO_API_BASE_URL;
    const DODO_API_KEY = process.env.DODO_PAYMENTS_API_KEY;

    if (!DODO_API_BASE_URL || !DODO_API_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: missing environment variables' },
        { status: 500 }
      );
    }

    // Possible endpoints
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

    // Try each endpoint until successful
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${DODO_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        const text = await res.text();
        let data: any;

        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }

        if (res.ok && data.status) {
          paymentData = data;
          break;
        }
      } catch {
        continue;
      }
    }

    if (!paymentData) {
      return NextResponse.json(
        { error: 'Payment not found', paymentId },
        { status: 404 }
      );
    }

    // Save payment to MongoDB (upsert)
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

    return NextResponse.json({
      status: paymentData.status,
      raw: paymentData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: err.message },
      { status: 500 }
    );
  }
}
