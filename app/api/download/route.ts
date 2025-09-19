export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Missing paymentId" },
        { status: 400 }
      );
    }

    // Verify with Dodo API
    const res = await fetch(
      `${process.env.DODO_API_BASE_URL}/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not verified or not successful" },
        { status: 403 }
      );
    }

    // ✅ Payment succeeded → send file
    const filePath = process.cwd() + "/assets/boilerplate.zip";
    const file = await import("fs/promises").then((fs) =>
      fs.readFile(filePath)
    );

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="boilerplate.zip"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Download error", message: err.message },
      { status: 500 }
    );
  }
}
