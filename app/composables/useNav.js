import { breakpointsTailwind } from "@vueuse/core";

let navWatcherInitialized = false;

export const useNav = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller("xl");
  const { y } = useWindowScroll();
  const showNavbar = useState("nav-show-navbar", () => true);
  const lastScrollPosition = useState("nav-last-scroll-position", () => 0);
  const navbarHidden = useState("nav-navbar-hidden", () => false);

  if (import.meta.client && !navWatcherInitialized) {
    navWatcherInitialized = true;

    watch(
      [y, isMobile],
      ([currentScrollPosition, mobile]) => {
        if (currentScrollPosition >= 0) {
          if (
            Math.abs(currentScrollPosition - lastScrollPosition.value) >= 60
          ) {
            showNavbar.value = currentScrollPosition < lastScrollPosition.value;
            lastScrollPosition.value = currentScrollPosition;
          }
        }

        navbarHidden.value = !mobile && !showNavbar.value;
      },
      { immediate: true },
    );
  }

  const navCanHide = computed(() => {
    return !isMobile.value;
  });

  const setMenuOpen = () => {
    document.documentElement.classList.add("overflow-hidden");
  };

  const unsetMenuOpen = () => {
    document.documentElement.classList.remove("overflow-hidden");
  };

  return {
    y,
    navbarHidden,
    showNavbar,
    navCanHide,
    setMenuOpen,
    unsetMenuOpen,
  };
};
