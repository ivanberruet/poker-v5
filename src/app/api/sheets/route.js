import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range");

  if (!range) {
    return NextResponse.json(
      { message: "Missing range parameter" },
      { status: 400 }
    );
  }

  try {
    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const values = response.data.values || [];
    return NextResponse.json(values, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
