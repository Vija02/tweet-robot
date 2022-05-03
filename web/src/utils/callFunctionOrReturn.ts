export default (objectOrFunction: any, value: any) => {
  return typeof objectOrFunction === "function"
    ? objectOrFunction(value)
    : objectOrFunction;
};
