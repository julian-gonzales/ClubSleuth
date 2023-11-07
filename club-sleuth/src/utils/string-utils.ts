export const changeWordsToUpperCase = (str: string): string => {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

export const truncate = (str: string, n: number): string => {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

export const dateToString = (date: string): string => {
  const str = new Date(date);
  return str.toLocaleDateString();
};

export const emailReg = new RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
