export const getMessengerDocName = (arr) => {
  const sortedArray = arr.sort();
  return `${sortedArray[0]}:${sortedArray[1]}`;
};
