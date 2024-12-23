export const arrayToObj = <T>(arr: T[], key: keyof T) => {
  return arr.reduce((acc, item) => {
    acc[String(item[key])] = item;
    return acc;
  }, {} as Record<string, T>);
};
