export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  console.log({ name });
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = await res.json();
    if (name) {
      data = data.filter(
        (item) => item.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    return new Response(
      JSON.stringify(
        data.map((item) => ({
          ...item,
          updateTime: Date.now()
        }))
      ),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
