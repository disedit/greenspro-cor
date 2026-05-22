export const useColorMode = () => {
  const colors = {
    dark: "#000",
    default: "#FAF5F2",
    primary: "#773E90",
  };

  const setDark = () => {
    document.documentElement.classList.add("dark");
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", colors.dark);
  };

  const unsetDark = () => {
    document.documentElement.classList.remove("dark");
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", colors.default);
  };

  const setMenuOpen = () => {
    document.documentElement.classList.add("overflow-hidden");
  };

  const unsetMenuOpen = () => {
    document.documentElement.classList.remove("overflow-hidden");
  };

  return {
    setDark,
    unsetDark,
    setMenuOpen,
    unsetMenuOpen,
  };
};
