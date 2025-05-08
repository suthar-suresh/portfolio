"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Language {
  name: string;
}

interface location {
  languages: Language[];
  country_flag: string;
}

interface fullResponse {
  ip: string;
  continent_name: string;
  country_name: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
  location: location;
  zip: string;
}

interface IPLog {
  fullResponse: fullResponse;
  timestamp: string;
}
export default function AdminLogsPage() {
  const [logs, setLogs] = useState<IPLog[]>([]);
  const [country_names, setCountry_names] = useState<[String]>(['']);
  const [queryKey, setQueryKey] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [Region, setRegion] = useState<[String]>(['']);
  const [City, setCity] = useState<[String]>(['']);

  const fetchLogs = async (event: React.FormEvent, pageNum = 1) => {
    event.preventDefault();
    const params = new URLSearchParams({
      page: pageNum.toString(),
      limit: "10",
    });
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);

    const res = await fetch(`/api/admin/logs?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setLogs(data.logs);
      console.log(data);
      setTotalPages(data.totalPages);
      setTotalLogs(data.totalLogs);
      setPage(data.page);
      setAccessGranted(true);
      setCountry_names(data.country_name);
      setRegion(data.regions_name);
      setCity(data.cities_name);
    } else {
      alert("Access denied");
    }
  };
console.log(selectedCity, selectedRegion, selectedCountry);
  return (
    <div className="p-6 pt-20 max-w-screen-xl mx-auto text-white">
      {!accessGranted ? (
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Enter Admin Key</h2>
          <form action="">
            <input
              type="password"
              className="border p-2 w-full rounded mb-2 bg-gray-800 text-white"
              value={queryKey}
              onChange={(e) => setQueryKey(e.target.value)}
              placeholder="Admin key"
            />
            <button
              type="submit"
              onClick={(e) => fetchLogs(e as React.FormEvent)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-4 items-center">
  <h2 className="text-2xl font-bold">IP Logs</h2>
  
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="border p-2 rounded bg-gray-800 text-white"
  />
  
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="border p-2 rounded bg-gray-800 text-white"
  />

  <select
    value={selectedCountry}
    onChange={(e) => setSelectedCountry(e.target.value)}
    className="border p-2 rounded bg-gray-800 text-white"
    >
    <option value="">Select Country</option>
    {country_names.map((country_names)=>(<>
    <option value="USA">{country_names}</option></>
  ))}
  </select>

  <select
    value={selectedRegion}
    onChange={(e) => setSelectedRegion(e.target.value)}
    className="border p-2 rounded bg-gray-800 text-white"
    >
    <option value="">Select Region</option>
    {Region.map((region)=>(<>
    <option value="USA">{region}</option></>
  ))}
  </select>

  <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    className="border p-2 rounded bg-gray-800 text-white"
    >
    <option value="">Select City</option>
    {City.map((city)=>(<>
    <option value="USA">{city}</option></>
  ))}
  </select>

  <button
    onClick={(e) => fetchLogs(e, 1)}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Filter
  </button>
</div>


          <div className="mb-2 text-sm text-gray-300">
            Showing <strong>{logs.length}</strong> of <strong>{totalLogs}</strong> logs
          </div>

          <div className="overflow-x-auto rounded-lg shadow bg-gray-900">
            <table className="min-w-full border border-gray-700 text-sm text-left text-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border px-3 py-2">IP</th>
                  <th className="border px-3 py-2">Continent</th>
                  <th className="border px-3 py-2">Country</th>
                  <th className="border px-3 py-2">Region</th>
                  <th className="border px-3 py-2">City</th>
                  <th className="border px-3 py-2">Lat</th>
                  <th className="border px-3 py-2">Long</th>
                  <th className="border px-3 py-2">Languages</th>
                  <th className="border px-3 py-2">Date</th>
                  <th className="border px-3 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => {
                  const fullResponse = log.fullResponse || {};
                  const date = new Date(log.timestamp);
                  const formattedDate = date.toLocaleDateString(); // e.g., "5/8/2025"
                  const formattedTime = date.toLocaleTimeString();
                  return (
                    <tr key={i} className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600">
                      <td className="border px-3 py-2">{fullResponse.ip}</td>
                      <td className="border px-3 py-2">{fullResponse.continent_name}</td>
                      <td className="border px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={fullResponse.location.country_flag || ""}
                            width={20}
                            height={20}
                            alt={fullResponse.continent_name}
                          />
                          <span>{fullResponse.country_name}</span>
                        </div>
                      </td>

                      <td className="border px-3 py-2">{fullResponse.region_name}</td>
                      <td className="border px-3 py-2">{fullResponse.city}</td>
                      <td className="border px-3 py-2">{fullResponse.latitude}</td>
                      <td className="border px-3 py-2">{fullResponse.longitude}</td>
                      <td className="border px-3 py-2">
                        {fullResponse.location.languages[0].name || "-"}
                      </td>
                      <td className="border px-3 py-2">{formattedDate}</td>
                      <td className="border px-3 py-2">{formattedTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={(e) => fetchLogs(e as React.FormEvent, page - 1)}
              disabled={page <= 1}
              className={`px-4 py-2 rounded ${page <= 1 ? "bg-gray-500 text-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-300">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              onClick={(e) => fetchLogs(e as React.FormEvent, page + 1)}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded ${page >= totalPages
                ? "bg-gray-500 text-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
