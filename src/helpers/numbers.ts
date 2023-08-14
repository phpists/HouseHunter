export const formatNumber = (num: number): string =>
  num
    ? num
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .split(".")[0]
    : "0";
