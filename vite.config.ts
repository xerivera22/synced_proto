import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Synced Proto",
        short_name: "SyncedProto",
        description: "A synchronized prototyping application",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: command === "build" ? "/synced_proto/" : "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Increase file size limit to handle large assets like hero images
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        // Exclude very large assets from precaching (optional optimization)
        globIgnores: ["**/re_herobg.{png,svg}"],
        runtimeCaching: [
          {
            // Cache large images on-demand instead of precaching
            urlPattern: /\/assets\/re_herobg\.(png|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "large-images-cache",
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  // Use root in dev, subfolder in production builds
  base: command === "build" ? "/synced_proto/" : "/",
  resolve: {
    alias: {
      "@": "/src",
      // Core direct aliases for common version-suffixed imports
      "lucide-react@0.487.0": "lucide-react",
      "class-variance-authority@0.7.1": "class-variance-authority",
      "@radix-ui/react-slot@1.1.2": "@radix-ui/react-slot",
      // Non-Radix packages with version-suffixed imports
      "cmdk@1.1.1": "cmdk",
      "input-otp@1.4.2": "input-otp",
      "react-hook-form@7.55.0": "react-hook-form",
      "react-resizable-panels@2.1.7": "react-resizable-panels",
      "next-themes@0.4.6": "next-themes",
      "sonner@2.0.3": "sonner",
      "vaul@1.1.2": "vaul",
      "recharts@2.15.2": "recharts",
      "embla-carousel-react@8.6.0": "embla-carousel-react",
      "react-day-picker@8.10.1": "react-day-picker",
      // Radix component aliases (explicit for clarity)
      "@radix-ui/react-avatar@1.1.3": "@radix-ui/react-avatar",
      "@radix-ui/react-progress@1.1.2": "@radix-ui/react-progress",
      "@radix-ui/react-switch@1.1.3": "@radix-ui/react-switch",
      "@radix-ui/react-dialog@1.1.6": "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu@2.1.6": "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-accordion@1.2.3": "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog@1.1.6": "@radix-ui/react-alert-dialog",
      "@radix-ui/react-aspect-ratio@1.1.2": "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-checkbox@1.1.4": "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible@1.1.3": "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu@2.2.6": "@radix-ui/react-context-menu",
      "@radix-ui/react-hover-card@1.1.6": "@radix-ui/react-hover-card",
      "@radix-ui/react-label@2.1.2": "@radix-ui/react-label",
      "@radix-ui/react-menubar@1.1.6": "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu@1.2.5": "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover@1.1.6": "@radix-ui/react-popover",
      "@radix-ui/react-radio-group@1.2.3": "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area@1.2.3": "@radix-ui/react-scroll-area",
      "@radix-ui/react-select@2.1.6": "@radix-ui/react-select",
      "@radix-ui/react-separator@1.1.2": "@radix-ui/react-separator",
      "@radix-ui/react-slider@1.2.3": "@radix-ui/react-slider",
      "@radix-ui/react-tabs@1.1.3": "@radix-ui/react-tabs",
      "@radix-ui/react-toggle@1.1.2": "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group@1.1.2": "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip@1.1.8": "@radix-ui/react-tooltip",
    },
  },
}));
