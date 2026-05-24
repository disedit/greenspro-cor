import countryLabels from "@/data/countries.js";

export const useMap = (profiles) => {
  const hoverPanelPosition = ref({ x: 0, y: 0 });

  const handleMapMouseMove = (event) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;

    const rect = target.getBoundingClientRect();
    hoverPanelPosition.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  /* Hovered country */
  const hoveredCountry = ref(null);

  const hoveredCountryName = computed(() => {
    return countryLabels[hoveredCountry.value] || hoveredCountry.value;
  });

  const hoveredCountryMembers = computed(() => {
    const filteredProfiles = profiles.value.filter(
      (p) => p.country === hoveredCountry.value && p.type === "full_member",
    );
    return filteredProfiles.length;
  });

  const hoveredCountryAlternates = computed(() => {
    const filteredProfiles = profiles.value.filter(
      (p) =>
        p.country === hoveredCountry.value && p.type === "alternate_member",
    );
    return filteredProfiles.length;
  });

  const hoveredCountryStyle = computed(() => {
    return {
      left: `${hoverPanelPosition.value.x + 16}px`,
      top: `${hoverPanelPosition.value.y + 16}px`,
    };
  });

  return {
    handleMapMouseMove,
    hoveredCountry,
    hoveredCountryName,
    hoveredCountryMembers,
    hoveredCountryAlternates,
    hoveredCountryStyle,
  };
};
