export const usePage = async (slugs) => {
  const { $wp } = useNuxtApp();
  const slug = Array.isArray(slugs) ? slugs.join("/") : slugs;
  const { data: page } = await useAsyncData(`page-${slug}`, () =>
    $wp.page().param("path", slug || "home"),
  );

  if (!page.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  return page.value;
};
