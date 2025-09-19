// api/download/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });
    }

    // ✅ Call your verify-payment API internally
    const verifyRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-payment?paymentId=${paymentId}`
    );
    const paymentStatus = await verifyRes.json();

    if (!verifyRes.ok || paymentStatus.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not successful', details: paymentStatus },
        { status: 403 }
      );
    }

    // Payment succeeded → serve file
    const filePath = path.join(process.cwd(), 'assets', 'boilerplate.zip');
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="boilerplate.zip"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (err: any) {
    console.error('Download API error:', err);
    return NextResponse.json(
      { error: 'Download error', message: err.message },
      { status: 500 }
    );
  }
}
