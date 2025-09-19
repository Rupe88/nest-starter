import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongo';
import DownloadToken from '@/app/models/DownloadToken';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token)
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });

    const tokenDoc = await DownloadToken.findOne({ token });
    if (!tokenDoc || tokenDoc.expiresAt < new Date())
      return NextResponse.json(
        { error: 'Token expired or invalid' },
        { status: 403 }
      );

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
    return NextResponse.json(
      { error: 'Download error', message: err.message },
      { status: 500 }
    );
  }
}
