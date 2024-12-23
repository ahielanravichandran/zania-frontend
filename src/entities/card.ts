import { dataMap } from "../db/data";

export const getCardDataById = (id: string) => {
  const card = dataMap[id];
  return card;
};
