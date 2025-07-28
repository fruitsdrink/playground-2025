import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);

  const name = url.searchParams.get("name");

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = await res.json();
    if (name) {
      data = data.filter((item: any) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    return new Response(
      JSON.stringify(
        data.map((item: any) => ({
          ...item,
          updateTime: Date.now(),
        }))
      ),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};
