import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";



// https://astro.build/config
export default defineConfig({
  
  integrations: [tailwind(), vue({jsx:true,})],
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
