function prepareData(arr: any[]) {
  const output = [];
  for (let index = 0; index < arr.length; index++) {
    const data = arr[index].elements;
    const parsed = [];

    for (const item of data) {
      const filename = item.filename;
      const val = `${index}.${item.id}:${filename.split(".")[0]}#${
        item.weight
      }.${filename.split(".")[1]}`;
      parsed.push(val);
    }
    output.push(parsed);
  }
  return output;
}

export const generateTokensDNA = (data: any[]) => {
  if (data.length < 1) return;

  const n = data.length;
  const inputData = prepareData(data);

  const noOfEntries = inputData[0].reduce((acc, curr) => {
    acc += parseInt(curr.split("#")[1].split(".")[0]);
    return acc;
  }, 0);

  const outputData = Array(noOfEntries);

  const values = inputData.reduce((acc, curr, index) => {
    let layer = getLayerItems(curr);

    if (index > 0) {
      for (let i = 0; i < n - index; i++) {
        layer = reorder(layer, noOfEntries);
      }
    }
    acc.push(layer);
    return acc;
  }, []);

  for (let i = 0; i < outputData.length; i++) {
    outputData[i] = Array(n);

    for (let j = 0; j < outputData[i].length; j++) {
      outputData[i][j] = values[j][i];
    }
  }

  const parsedOutput = [];

  for (let i = 0; i < outputData.length; i++) {
    const element = outputData[i];
    parsedOutput.push(element.join("*"));
  }

  console.log(parsedOutput);
  return parsedOutput;
};

const getLayerItems = (data: any[]) => {
  //"0.2:Pink#32.png*1.1:Gray Skin#48.png"

  //"#32.png*#48.png"

  const layerItems = data.reduce((acc, curr) => {
    const reg = /.*#/g;
    const value = `${curr.match(reg)[0].split("#")[0]}.png`;

    const count = curr.split("#")[1].split(".")[0];

    for (let i = 0; i < count; i++) {
      acc.push(value);
    }
    return acc;
  }, []);

  return layerItems;
};

const interleave: any = ([x, ...xs]: any, ys: any = []) =>
  x === undefined
    ? ys // base: no x
    : [x, ...interleave(ys, xs)]; // inductive: some x

const reorder = (data: any[], max: number) => {
  const left = data.splice(0, max / 2);
  const right = data.splice(0, max);

  const newArr = interleave(left, right);
  return newArr;
};
