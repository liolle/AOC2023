export const pyramid = (array) => {
  const res = [];
  let current = array;
  res.push(current);

  while (!checkAllSame(current)) {
    current = nextSequence(current);
    res.push(current);
  }
  return pushLastUp(res);
};

export const nextSequence = (array) => {
  const arr = [];

  for (let i = 0; i < array.length - 1; i++) {
    arr.push(array[i + 1] - array[i]);
  }
  return arr;
};

const checkAllSame = (array) => {
  const num = array[0];
  for (const elem of array) {
    if (elem != num) return false;
  }
  return true;
};

const pushLastUp = (array) => {
  return recurPushLastUp(array, 0);
};

const recurPushLastUp = (array, first) => {
  if (array.length == 0) {
    return first;
  }

  const current = array.pop();

  return recurPushLastUp(array, current[0] - first);
};

export const sum_last = (array) => {
  let sum = 0;
  for (const arr of array) {
    sum += pyramid(arr);
  }
  return sum;
};
