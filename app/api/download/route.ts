import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { connectToDB } from '@/lib/mongo';
import { Payment } from '@/app/models/Payment';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });
    }

    // ✅ Check MongoDB first
    const paymentRecord = await Payment.findOne({ paymentId });

    if (!paymentRecord || paymentRecord.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not verified or not successful' },
        { status: 403 }
      );
    }

    // Payment succeeded → serve file
    const filePath = path.join(process.cwd(), 'assets', 'boilerplate.zip');

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="boilerplate.zip"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Download error', message: err.message },
      { status: 500 }
    );
  }
}
