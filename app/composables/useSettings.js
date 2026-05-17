export const useSettings = async () => {
  const nuxtApp = useNuxtApp();

  const { data: settings } = await useAsyncData(
    "settings",
    () => nuxtApp.$wp.settings(),
    {
      dedupe: "defer",
      getCachedData(key) {
        return nuxtApp.isHydrating
          ? nuxtApp.payload.data[key]
          : nuxtApp.static.data[key];
      },
    },
  );

  if (!settings.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Settings Not Found",
    });
  }

  return settings.value;
};
