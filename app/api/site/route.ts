import { getData, AuthHeaders } from "@/app/utils";

export async function GET() {
  const data = await getData(process.env.SITE_DATA_BIN as string);
  Response.json(data);
}

export async function PUT(request: Request) {
  const data = await request.json();
  try {
    const res = await fetch(
      `https://api.jsonbin.io/v3/b/${process.env.SITE_DATA_BIN}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...AuthHeaders,
        },
        body: JSON.stringify(data),
      }
    );
    return Response.json({ statusCode: res.status, message: res.statusText });
  } catch (error) {
    console.log(error);
  }
}
