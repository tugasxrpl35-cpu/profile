export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();

  return new Response(text, { status: response.status });
}
