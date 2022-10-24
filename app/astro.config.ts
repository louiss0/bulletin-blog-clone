import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";



// https://astro.build/config
export default defineConfig({
  site: "https://beamish-biscochitos-390e42.netlify.app",
  integrations: [tailwind(), vue({
    
    jsx: {
      enableObjectSlots: true,
    },
  })],
  server: {
    host: true,
  },
  vite: {  
    ssr: {
      external: ["svgo"],
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
