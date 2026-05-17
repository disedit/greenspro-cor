export const useEvent = async (slug) => {
  const { $wp } = useNuxtApp();

  const { data: event } = await useAsyncData(`event-${slug}`, () =>
    $wp.event().param("slug", slug),
  );

  if (!event.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Event Not Found",
    });
  }

  return event.value;
};
