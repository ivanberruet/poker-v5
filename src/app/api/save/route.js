import { google } from "googleapis";
import {JWT} from 'google-auth-library'

export async function POST(req, res) {

  const data = await req.json();
  
  try {
    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      auth,
      version: "v4"
    });

    console.log("sheets", sheets);
    

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Historial!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: data.values
      }
    }) 

    return new Response(JSON.stringify(response.data), { status: 200 })
  } catch (error) {
    console.log("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 })
  }

}
