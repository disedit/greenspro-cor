export const useCommissions = (commissionList) => {
  const commissions = computed(() => {
    return commissionList
      ? commissionList.map((commission) => {
          const rawName =
            typeof commission === "string"
              ? commission
              : commission?.name || "";
          const match = rawName.match(/^(.*)\(([^)]+)\)$/);

          if (!match) {
            return {
              name: rawName.trim(),
              acronym: "",
            };
          }

          return {
            name: match[1].trim(),
            acronym: match[2].trim(),
            slug: commission?.slug || null,
            id: commission?.id || null,
          };
        })
      : null;
  });

  return {
    commissions,
  };
};
