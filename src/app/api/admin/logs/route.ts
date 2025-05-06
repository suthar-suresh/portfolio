import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get("key");
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
    const start = request.nextUrl.searchParams.get("start");
    const end = request.nextUrl.searchParams.get("end");

    if (key !== process.env.ADMIN_QUERY_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const ipapiCollection = db.collection("ipapi_responses");

    const query: any = {};
    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }

    // Get the total number of logs matching the query
    const total = await ipapiCollection.countDocuments(query);
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    // Debug: Check the calculated totalPages and other pagination values
    console.log("Total logs:", total);
    console.log("Total pages:", totalPages);
    console.log("Requested page:", page);

    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skip = (currentPage - 1) * limit;

    // Debug: Log skip value and pagination values
    console.log("Skip:", skip);
    console.log("Limit:", limit);

    const logs = await ipapiCollection
      .find(query, {
        projection: {
          timestamp: 1,
          "fullResponse.ip": 1,
          "fullResponse.continent_name": 1,
          "fullResponse.country_name": 1,
          "fullResponse.region_name": 1,
          "fullResponse.city": 1,
          "fullResponse.latitude": 1,
          "fullResponse.longitude": 1,
          "fullResponse.languages.name": 1,
        },
      })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const formattedLogs = logs.map((doc) => {
      const timestamp = doc.timestamp ? new Date(doc.timestamp) : null;
      const date = timestamp ? timestamp.toISOString().split("T")[0] : "-";
      const time = timestamp ? timestamp.toTimeString().split(" ")[0] : "-";

      return {
        ip: doc.fullResponse?.ip || "-",
        continent_name: doc.fullResponse?.continent_name || "-",
        country_name: doc.fullResponse?.country_name || "-",
        region_name: doc.fullResponse?.region_name || "-",
        city: doc.fullResponse?.city || "-",
        latitude: doc.fullResponse?.latitude || "-",
        longitude: doc.fullResponse?.longitude || "-",
        languages: doc.fullResponse?.languages || [],
        date,
        time,
      };
    });

    return NextResponse.json({
      logs: formattedLogs,
      page: currentPage,
      totalPages,
      totalLogs: total,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
