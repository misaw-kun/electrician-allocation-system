import { getData } from "@/app/utils";

export async function GET() {
  const data = await getData(
    `https://api.jsonbin.io/v3/b/${process.env.SITE_DATA_BIN}`
  );
  return Response.json(data);
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
          "X-Master-Key": `${process.env.API_MASTER_KEY}`,
          "X-Access-Key": `${process.env.API_ACCESS_KEY}`,
        },
        body: JSON.stringify(data),
      }
    );
    return Response.json({ statusCode: res.status, message: res.statusText });
  } catch (error) {
    console.log(error);
  }
}
