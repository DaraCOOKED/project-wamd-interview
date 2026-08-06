import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;500;600;700;800&display=swap",
        },
          {
          rel: "icon",
          type: "image/png",
          sizes: "50x50",
          href: "",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "",
        },

      ],
    },
  },
});
