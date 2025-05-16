import { NextRequest } from "next/server";

import { API_ENDPOINT_KEYS, apiMap } from "@/lib/apiMap";

import { axiosInstance } from "../../../lib/axios";

export async function POST(req: NextRequest) {
  // debugger;
  const { endpointKey, body } = await req.json();

  if (!endpointKey) {
    return new Response("Invalid endpoint", { status: 400 });
  }

  const { url, method } = apiMap[endpointKey as API_ENDPOINT_KEYS];

  try {
    const res = await axiosInstance.request({ url, method, data: body });

    const responseBody = typeof res.data === "string" ? res.data : JSON.stringify(res.data);

    return new Response(responseBody, {
      status: res.status,
      headers: { ...(res.headers as Record<string, string>) },
    });
  } catch (err: any) {
    console.log({ err });
    return new Response(err.message || "Unexpected error", { status: 500 });
  }
}
