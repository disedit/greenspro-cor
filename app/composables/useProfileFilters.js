const memberTypeLabels = {
  full_member: "Member",
  alternate_member: "Alternate",
};

const countryLabels = {
  AT: "Austria",
  BE: "Belgium",
  BG: "Bulgaria",
  CY: "Cyprus",
  CZ: "Czechia",
  DE: "Germany",
  DK: "Denmark",
  EE: "Estonia",
  GR: "Greece",
  ES: "Spain",
  FI: "Finland",
  FR: "France",
  HR: "Croatia",
  HU: "Hungary",
  IE: "Ireland",
  IT: "Italy",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  MT: "Malta",
  NL: "Netherlands",
  PL: "Poland",
  PT: "Portugal",
  RO: "Romania",
  SE: "Sweden",
  SI: "Slovenia",
  SK: "Slovakia",
};

const normalizeText = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim().toLowerCase();
};

const parseQueryValue = (value) => {
  if (Array.isArray(value)) {
    value = value[0];
  }

  if (value === undefined || value === null) {
    return null;
  }

  const parsed = String(value).trim();
  return parsed ? parsed : null;
};

const getProfileCommissionNames = (profile) => {
  if (!profile?.commissions || !Array.isArray(profile.commissions)) {
    return [];
  }

  return profile.commissions
    .map((commission) => {
      if (typeof commission === "string") {
        return commission.trim();
      }

      return (commission?.name || "").trim();
    })
    .filter(Boolean);
};

const uniqueSorted = (values) => {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );
};

const toOptions = (values, labels = {}) => {
  return values.map((value) => ({
    value,
    label: labels[value] || value,
  }));
};

export const useProfileFilters = (profiles) => {
  const route = useRoute();
  const router = useRouter();

  const setQueryValue = async (keys, value) => {
    const normalizedValue = parseQueryValue(value);
    const nextQuery = { ...route.query };

    keys.forEach((key) => {
      delete nextQuery[key];
    });

    if (normalizedValue) {
      nextQuery[keys[0]] = normalizedValue;
    }

    try {
      await router.replace({
        query: nextQuery,
        hash: route.hash,
      });
    } catch {
      // Ignore duplicated or interrupted navigations while typing.
    }
  };

  const createQueryFilter = (keys) => {
    return computed({
      get: () => {
        for (const key of keys) {
          const value = parseQueryValue(route.query[key]);
          if (value) {
            return value;
          }
        }

        return null;
      },
      set: (value) => {
        void setQueryValue(keys, value);
      },
    });
  };

  const country = createQueryFilter(["country"]);
  const commission = createQueryFilter(["commission"]);
  const memberType = createQueryFilter(["type", "memberType"]);
  const name = createQueryFilter(["name"]);

  const countryOptions = computed(() => {
    return toOptions(
      uniqueSorted((profiles.value || []).map((profile) => profile.country)),
      countryLabels,
    );
  });

  const commissionOptions = computed(() => {
    const commissions = (profiles.value || []).flatMap((profile) =>
      getProfileCommissionNames(profile),
    );
    return toOptions(uniqueSorted(commissions));
  });

  const memberTypeOptions = computed(() => {
    const types = uniqueSorted(
      (profiles.value || []).map((profile) => profile.type),
    );
    return toOptions(types, memberTypeLabels);
  });

  const filteredProfiles = computed(() => {
    const currentCountry = country.value;
    const currentCommission = commission.value;
    const currentMemberType = memberType.value;
    const currentName = normalizeText(name.value);

    return (profiles.value || []).filter((profile) => {
      if (currentCountry && profile.country !== currentCountry) {
        return false;
      }

      if (currentMemberType && profile.type !== currentMemberType) {
        return false;
      }

      if (currentCommission) {
        const commissions = getProfileCommissionNames(profile);
        if (!commissions.includes(currentCommission)) {
          return false;
        }
      }

      if (currentName) {
        const profileName = normalizeText(profile.name);
        if (!profileName.includes(currentName)) {
          return false;
        }
      }

      return true;
    });
  });

  return {
    country,
    commission,
    memberType,
    name,
    countryOptions,
    commissionOptions,
    memberTypeOptions,
    filteredProfiles,
  };
};
