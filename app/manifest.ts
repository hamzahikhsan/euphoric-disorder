import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "euphoric.disorder — Creativity of Fashion",
    short_name: "euphoric.disorder",
    description:
      "Brand streetwear independen bertema kriminologi: Comedy, Criminologist, Creativity & custom apparel.",
    start_url: "/",
    display: "standalone",
    background_color: "#2C3221",
    theme_color: "#FCFCFA",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
