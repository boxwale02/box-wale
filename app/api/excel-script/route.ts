import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const googleResponse = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await googleResponse.text();

    if (!googleResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save to Google Sheet",
          details: responseText,
        },
        { status: googleResponse.status }
      );
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Excel Script Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}