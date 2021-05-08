export const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const generatePassword = () => {
  const length = 8;
  const chars = ['$', '#', '%', '^', '&', '*'];
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%^&*';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  const specialchar = chars[Math.floor(Math.random() * 6)];
  const randomnumber = Math.floor(Math.random() * 10).toString();
  return (retVal += specialchar + randomnumber);
};
export const range = (from: number, to: number, step = 1) => {
  const rangee = [];
  for (let i = from; i <= to; i += step) {
    rangee.push(i);
  }
  return rangee;
};
export const JSONparse = (data: any) => {
  try {
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};
export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
export const niceBytes = (x: any) => {
  let l = 0;
  let n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
};
export const getSubset = (subObject: object, data: object) => {
  try {
    const properties = Object.keys(subObject);
    const fields = pick(data, ...properties);
    return fields;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};
const pick = (obj: object, ...keys: string[]) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
export const isDate = (date: any) => {
  try {
    const dateVariable = new Date(date);
    if (!date || dateVariable === new Date('Invalid Date')) {
      return false;
    } else {
      return true;
    }
  } catch (ex) {
    console.log(ex);
    return false;
  }
};
export const getUniqueRow = (data: any[]) => {
  return data.filter((value, index, array) => array.indexOf(value) === index);
};
export const getData = (key: string, row: any) => {
  const count = key.split('.').length - 1;
  let data: any;
  if (count === 4) {
    const [key1, key2, key3, key4, key5] = key.split('.');
    data =
      row[key1]?.[key2]?.[key3]?.[key4] === null || row[key1]?.[key2]?.[key3]?.[key4] === undefined
        ? '-'
        : row[key1]?.[key2]?.[key3]?.[key4]?.[key5];
  } else if (count === 3) {
    const [key1, key2, key3, key4] = key.split('.');
    data =
      row[key1]?.[key2]?.[key3] === null || row[key1]?.[key2]?.[key3] === undefined
        ? '-'
        : row[key1]?.[key2]?.[key3]?.[key4];
  } else if (count === 2) {
    const [key1, key2, key3] = key.split('.');
    data =
      row[key1]?.[key2] === null || row[key1]?.[key2] === undefined
        ? '-'
        : row[key1]?.[key2]?.[key3];
  } else if (count === 1) {
    const [key1, key2] = key.split('.');
    data = row[key1] === null || row[key1] === undefined ? '-' : row[key1]?.[key2];
  } else {
    data = row[key] === null || row[key] === undefined ? '-' : row[key];
  }
  // if (data === false || data === 'false') {
  //   return 'No';
  // } else if (data === true || data === 'true') {
  //   return 'Yes';
  // } else {
  //   return data;
  // }
  return data;
};
export const capitalizeFirstLetter = (str: string) => {
  return str[0]?.toUpperCase() + str?.slice(1);
};
export const splitAt = (x: any[], index: number) => [x.slice(0, index), x.slice(index)];
