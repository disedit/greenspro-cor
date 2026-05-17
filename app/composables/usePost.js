export const usePost = async (slug) => {
  const { $wp } = useNuxtApp();

  const { data: post } = await useAsyncData(`post-${slug}`, () =>
    $wp.post().param("slug", slug),
  );

  if (!post.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post Not Found",
    });
  }

  return post.value;
};
