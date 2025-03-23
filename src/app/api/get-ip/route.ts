import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";

interface LocationResponse {
  ip: string;
  city: string;
  region: string;
  country: string;
  timezone: string;
}

interface ErrorResponse {
  error: string;
}

// 🔹 Helper function to get the client IP
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] || // Get first IP if multiple exist
    request.headers.get("x-real-ip") || // Alternative header
    (request as any).ip || // Next.js default (may be undefined in local dev)
    "Unknown"
  );
}

// 🔹 Helper function to fetch full IP data from ipapi
async function fetchLocationData(ip: string): Promise<{ filteredData: LocationResponse; fullResponse: any }> {
  console.log("Fetching data from ipapi for IP:", ip);

  const response = await fetch(
    `https://api.ipapi.com/${ip}?access_key=${process.env.NEXT_PUBLIC_IPAPI_KEY}&format=1`
  );

  const data = await response.json();
  console.log("Full API Response:", data);

  if (data.error) {
    throw new Error(data.reason || "Failed to fetch location data");
  }

  const filteredData: LocationResponse = {
    ip: data.ip,
    city: data.city,
    region: data.region,
    country: data.country_name,
    timezone: data.timezone,
  };

  return { filteredData, fullResponse: data };
}

// 🔹 Handle `GET` request (check database first, then fetch if needed)
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("Checking for IP data...");
    const ip = getClientIp(request);
    console.log("Extracted IP:", ip);

    if (!ip || ip === "Unknown") {
      return NextResponse.json({ error: "Could not determine IP address" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const locationCollection = db.collection("locations");
    const ipapiCollection = db.collection("ipapi_responses");

    // ✅ Check if IP exists in `locations`
    const existingLocation = await locationCollection.findOne({ ip });
    if (existingLocation) {
      console.log("IP found in DB, returning cached location data.");
      return NextResponse.json(existingLocation, { status: 200 });
    }

    // ✅ Check if full API response exists in `ipapi_responses`
    const cachedApiResponse = await ipapiCollection.findOne({ ip });

    let filteredData: LocationResponse;
    let fullResponse: any;

    if (cachedApiResponse) {
      console.log("Using cached IPAPI response from database.");
      fullResponse = cachedApiResponse.fullResponse;
      filteredData = {
        ip: fullResponse.ip,
        city: fullResponse.city,
        region: fullResponse.region,
        country: fullResponse.country_name,
        timezone: fullResponse.timezone,
      };
    } else {
      console.log("Fetching fresh data from ipapi.");
      ({ filteredData, fullResponse } = await fetchLocationData(ip));

      // Save full API response in `ipapi_responses`
      await ipapiCollection.insertOne({ ip, fullResponse, timestamp: new Date() });
    }

    // Save location data in `locations`
    await locationCollection.insertOne(filteredData);

    return NextResponse.json(filteredData, { status: 200 });
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to retrieve IP data" }, { status: 500 });
  }
}

// 🔹 Handle `POST` request (fetch location data and save)
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("Handling POST request...");
    const ip = getClientIp(request);
    console.log("Extracted IP:", ip);

    if (!ip || ip === "Unknown") {
      return NextResponse.json({ error: "Could not determine IP address" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const locationCollection = db.collection("locations");
    const ipapiCollection = db.collection("ipapi_responses");

    // Check if the IP is already in `locations`
    const existingLocation = await locationCollection.findOne({ ip });
    if (existingLocation) {
      return NextResponse.json(existingLocation, { status: 200 });
    }

    // Check if the IP is already in `ipapi_responses`
    const cachedApiResponse = await ipapiCollection.findOne({ ip });

    let filteredData: LocationResponse;
    let fullResponse: any;

    if (cachedApiResponse) {
      console.log("Using cached IPAPI response.");
      fullResponse = cachedApiResponse.fullResponse;
      filteredData = {
        ip: fullResponse.ip,
        city: fullResponse.city,
        region: fullResponse.region,
        country: fullResponse.country_name,
        timezone: fullResponse.timezone,
      };
    } else {
      console.log("Fetching fresh data from ipapi.");
      ({ filteredData, fullResponse } = await fetchLocationData(ip));

      // Save full API response in `ipapi_responses`
      await ipapiCollection.insertOne({ ip, fullResponse, timestamp: new Date() });
    }

    // Save filtered location data in `locations`
    await locationCollection.insertOne(filteredData);

    return NextResponse.json(filteredData, { status: 200 });
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch location data" }, { status: 500 });
  }
}
