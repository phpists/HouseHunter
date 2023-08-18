import { currencies } from "../constants/currency";

export const getLocation = ({
  area = "",
  city = "",
  district = "",
  street = "",
}: {
  area: string;
  city: string;
  district: string;
  street: string;
}): string =>
  `${city}${district?.length > 0 ? `, ${district}` : ""}${
    street?.length > 0 ? `, ${street}` : ""
  }`;

export const getIdFromUrl = () => window.location.search?.split("=")[1] ?? null;

export const getCurrencySymbol = (currencyTitle: string): string =>
  currencies.find((c) => c.title === currencyTitle)?.symbol ?? "";

export const addZero = (num: number): string | number =>
  num < 10 ? `0${num}` : num;

export const getHours = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const handleDownload = (fileLink: string) => {
  var link = document.createElement("a");
  link.setAttribute("download", "file");
  link.href = fileLink;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const removeDublicats = (array: any) => {
  const updatedArray: any = [];

  array.forEach((element: any) => {
    if (!updatedArray.find((e: any) => e.id_object === element.id_object)) {
      updatedArray.push(element);
    }
  });

  return updatedArray;
};
