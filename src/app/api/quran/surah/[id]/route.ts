import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `https://quran-api.santrikoding.com/api/surah/${params.id}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[SURAH_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
