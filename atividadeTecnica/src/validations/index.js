export const isProductValid = result => {
  if (result !== "") {
    return true;
  }
  throw new Error("Any product find");
};

export const isRequestValid = result => {
  if (result.length > 0) {
    return true;
  }
  throw new Error("Any request find");
};
