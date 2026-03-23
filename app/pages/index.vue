<script setup>
/* SEO Metatags */
const siteName = 'Greens and Progressives in the European Committee of the Regions'
const title = 'Greens and Progressives in the European Committee of the Regions'
const ogTitle = title
const description = 'We are currently working on a new website. In the meantime, you can find us on our social media channels.'
const keywords = 'greens, progressives, committe of the regions, europe, political group, eu, cor'
useServerSeoMeta({
  title,
  ogTitle,
  description,
  ogDescription: description,
  keywords,
  ogSiteName: siteName,
})
useHead({ title })
</script>

<template>
  <div class="bg-green-soft p-base sm:p-10 2xl:p-inner h-svh flex flex-col gap-4">
    <div class="bg-white h-full p-base sm:p-10 2xl:p-inner flex flex-col rounded-tr-[4rem] rounded-bl-[4rem] md:rounded-tr-[7rem] md:rounded-bl-[7rem] 2xl:rounded-tr-[10rem] 2xl:rounded-bl-[10rem]">
      <header>
        <SiteLogo class="h-20 md:h-30" />
      </header>
      <main class="my-auto space-y-4 md:space-y-8 text-green">
        <h1 class="font-bold text-3xl tracking-tight leading-tighter">Pardon our interruption</h1>
        <p class="text-md tracking-tight">We are currently working on a new website.</p>
        <p class="text-md tracking-tight">In the meantime, you can find us on our social media channels:</p>
        <SiteSocials />
      </main>
      <footer class="text-right">
        <p class="text-sm text-green-dark tracking-tight flex flex-col md:flex-row gap-1 md:gap-4 justify-end">
          <a href="mailto:greens.pro@cor.europa.eu" class="hover:underline">greens.pro@cor.europa.eu</a>
        </p>
      </footer>
    </div>
  </div>
</template>
