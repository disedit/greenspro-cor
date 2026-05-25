export const useNewsFilter = (filters) => {
  const route = useRoute();

  const presetValues = (type) => {
    const items = filters?.[type];
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .map((item) => item?.id)
      .filter((id) => id !== undefined && id !== null)
      .map(String);
  };

  const queryValues = (type) => {
    const raw = route.query[type];

    if (raw === undefined || raw === null) {
      return presetValues(type);
    }

    const value = Array.isArray(raw) ? raw.join(",") : raw;
    return typeof value === "string" ? value.split(",").filter((v) => v) : [];
  };

  const queryWithPresets = () => {
    const query = { ...route.query };

    if (!filters || typeof filters !== "object") {
      return query;
    }

    Object.keys(filters).forEach((type) => {
      const hasRouteValue = query[type] !== undefined && query[type] !== null;
      if (hasRouteValue) {
        return;
      }

      const presets = presetValues(type);
      if (presets.length) {
        query[type] = presets.join(",");
      }
    });

    return query;
  };

  const toggleFilter = (type, id) => {
    const values = queryValues(type);
    const query = queryWithPresets();
    const idValue = String(id);

    if (values.includes(idValue)) {
      const nextValues = values.filter((v) => v !== idValue);
      if (nextValues.length) {
        query[type] = nextValues.join(",");
      } else {
        delete query[type];
      }
    } else {
      values.push(idValue);
      query[type] = values.join(",");
    }

    return {
      path: "/news/page/1",
      query,
    };
  };

  const selected = (type, id) => queryWithPresets()[type]?.includes(String(id));

  const initialSearch = Array.isArray(route.query.search)
    ? route.query.search[0]
    : route.query.search;
  const searchTerm = ref(
    typeof initialSearch === "string" ? initialSearch : "",
  );

  const search = async () => {
    const query = queryWithPresets();
    const value = searchTerm.value.trim();

    if (value) {
      query.search = value;
    } else {
      delete query.search;
    }

    await navigateTo({
      path: "/news/page/1",
      query,
    });
  };

  return {
    toggleFilter,
    selected,
    search,
    searchTerm,
  };
};
