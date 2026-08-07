import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/i18n"],

  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",

    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "km",
        name: "ខ្មែរ",
        file: "km.json",
      },
    ],

    lazy: true,
    langDir: "locales/",
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