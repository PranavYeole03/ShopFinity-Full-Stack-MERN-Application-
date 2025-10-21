export const ValideURLConvert = (name) => {
  const url = name
    ?.toString()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-");
  return url;
};
