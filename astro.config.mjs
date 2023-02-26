import { defineConfig } from 'astro/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://bayukurnia.com',
  output: 'server',
  adapter: cloudflare({ mode: 'advanced' }),
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [vanillaExtractPlugin()],
    define: {
      'process.env.SPOTIFY_CLIENT_ID': JSON.stringify(
        process.env.SPOTIFY_CLIENT_ID
      ),
      'process.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(
        process.env.SPOTIFY_CLIENT_SECRET
      ),
      'process.env.SPOTIFY_REFRESH_TOKEN': JSON.stringify(
        process.env.SPOTIFY_REFRESH_TOKEN
      )
    }
  }
})
