export const arrayToObject = (arr, keyField = 'code') =>
  Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));

export const mergeArrays = (...arrays) => {
  let jointArray = [];

  arrays.forEach(array => {
    jointArray = [...jointArray, ...array];
  });
  const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index);
  return uniqueArray;
};

export const mergeArraysWithKey = (array, key = 'code') => {
  const temp = [];
  array.forEach(e => {
    if (temp.find(e2 => e[key] === e2[key])) {
      //
    } else {
      temp.push(e);
    }
  });
  return temp;
};
