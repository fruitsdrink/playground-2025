import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  console.log(context);
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return new Response(
    JSON.stringify(
      data.map((item: any) => ({ ...item, updateTime: Date.now() }))
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
