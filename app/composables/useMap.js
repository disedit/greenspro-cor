import countryLabels from "@/data/countries.js";

export const useMap = (profiles) => {
  const HOVER_PANEL_WIDTH = 200;
  const HOVER_PANEL_OFFSET = 16;
  const hoverPanelPosition = ref({ x: 0, y: 0 });

  const handleMapMouseMove = (event) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;

    const rect = target.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    // Place panel to the left of the cursor when right placement would overflow.
    const wouldOverflowRight =
      event.clientX + HOVER_PANEL_OFFSET + HOVER_PANEL_WIDTH >
      window.innerWidth;

    hoverPanelPosition.value = {
      x: wouldOverflowRight
        ? localX - HOVER_PANEL_OFFSET - HOVER_PANEL_WIDTH
        : localX,
      y: localY,
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
      left: `${hoverPanelPosition.value.x + HOVER_PANEL_OFFSET}px`,
      top: `${hoverPanelPosition.value.y + HOVER_PANEL_OFFSET}px`,
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
