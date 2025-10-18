import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongodb";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get("key");
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
    const start = request.nextUrl.searchParams.get("start");
    const end = request.nextUrl.searchParams.get("end");

    const country = request.nextUrl.searchParams.get("country");
    const region = request.nextUrl.searchParams.get("region");
    const city = request.nextUrl.searchParams.get("city");

    const db = await connectToDatabase();
    const ipapiCollection = db.collection("ipapi_responses");

    const country_name = await ipapiCollection.distinct("fullResponse.country_name");
    const regions_name = await ipapiCollection.distinct("fullResponse.region_name");
    const cities_name = await ipapiCollection.distinct("fullResponse.city");

    const query: any = {};
    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }

    if (country) query["fullResponse.country_name"] = country;
    if (region) query["fullResponse.region_name"] = region;
    if (city) query["fullResponse.city"] = city;

    const total = await ipapiCollection.countDocuments(query);
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skip = (currentPage - 1) * limit;

    const logs = await ipapiCollection
      .find(query, {
        projection: {
          timestamp: 1,
          "fullResponse.ip": 1,
          "fullResponse.zip": 1,
          "fullResponse.continent_name": 1,
          "fullResponse.country_name": 1,
          "fullResponse.region_name": 1,
          "fullResponse.city": 1,
          "fullResponse.latitude": 1,
          "fullResponse.longitude": 1,
          "fullResponse.location.languages": 1,
          "fullResponse.location.country_flag": 1,
        },
      })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      logs,
      page: currentPage,
      totalPages,
      totalLogs: total,
      country_name,
      regions_name,
      cities_name,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
