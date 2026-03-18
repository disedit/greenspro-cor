import WPAPI from "wpapi";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const wp = new WPAPI({
    endpoint: config.public.wpApiEndpoint,
  });

  wp.page = wp.registerRoute("greens-cor", "page");
  wp.news = wp.registerRoute("greens-cor", "news");
  wp.post = wp.registerRoute("greens-cor", "post");
  wp.parties = wp.registerRoute("greens-cor", "member-parties");
  wp.profiles = wp.registerRoute("greens-cor", "profiles");
  wp.settings = wp.registerRoute("greens-cor", "settings");

  return {
    provide: {
      wp,
    },
  };
});
