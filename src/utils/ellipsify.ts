const ellipsify = (
  str: string,
  position: "center" | "end" = "center"
): string => {
  let ellipsifiedStr = "";
  const strLen = str.length;

  switch (position) {
    case "center":
      ellipsifiedStr = str
        .slice(0, 4)
        .concat("...")
        .concat(str.slice(strLen - 4, strLen));
  }

  return ellipsifiedStr;
};

export default ellipsify;
