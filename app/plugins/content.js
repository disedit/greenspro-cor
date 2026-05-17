import WPAPI from "wpapi";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const wp = new WPAPI({
    endpoint: config.public.wpApiEndpoint,
  });

  wp.page = wp.registerRoute("greenspro-cor", "page");
  wp.news = wp.registerRoute("greenspro-cor", "news");
  wp.post = wp.registerRoute("greenspro-cor", "post");
  wp.profiles = wp.registerRoute("greenspro-cor", "profiles");
  wp.events = wp.registerRoute("greenspro-cor", "events");
  wp.settings = wp.registerRoute("greenspro-cor", "settings");

  return {
    provide: {
      wp,
    },
  };
});
