<script setup>
useHead({
  htmlAttrs: { lang: 'en', class: 'bg-green-soft' },
  meta: [
    { name: 'theme-color', content: '#a0dc7c' },
    { name: 'apple-mobile-web-app-title', content: 'Greens-Pro' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
    { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'manifest', href: '/favicons/site.webmanifest' }
  ],
  script: [
    { src: 'https://cloud.umami.is/script.js', 'data-website-id': '8aaaa370-b52e-45e1-b16e-a17be7b1ea42', defer: true }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <!--<SiteNav />-->
    <slot />
    <!--<SiteFooter />-->
  </div>
</template>
