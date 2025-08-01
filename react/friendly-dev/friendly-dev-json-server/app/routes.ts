import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/home.tsx", [index("routes/home/index.tsx")]),
  layout("./layouts/main.tsx", [
    route("about", "./routes/about/index.tsx"),
    route("contact", "./routes/contact/index.tsx"),
    route("projects", "./routes/projects/index.tsx"),
    route("projects/:id", "./routes/projects/details.tsx"),
    route("blog", "./routes/blog/index.tsx"),
    route("blog/:slug", "./routes/blog/details.tsx"),
    route("*", "./routes/errors/not-found.tsx"),
  ]),
] satisfies RouteConfig;
