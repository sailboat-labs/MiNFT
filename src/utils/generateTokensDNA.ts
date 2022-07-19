// flattens data a

import _ from "lodash";

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

export const generateTokensDNA = (data: any[], tokenSupply: number) => {
  if (data.length < 1) return;

  const n = data.length;
  console.log({ n });

  const inputData = prepareData(data);

  console.log({ inputData });

  console.log({ tokenSupply });

  const outputData = Array(tokenSupply);

  const values = inputData.reduce((acc, curr, index) => {
    let layer = getLayerItems(curr);
    console.log({ layer });

    for (let i = 0; i < n - index; i++) {
      layer = reorder(layer, tokenSupply);
    }

    acc.push(layer);
    return acc;
  }, []);

  console.log({ values });

  for (let i = 0; i < outputData.length; i++) {
    outputData[i] = Array(n);

    for (let j = 0; j < outputData[i].length; j++) {
      outputData[i][j] = values[j][i];
    }
  }

  console.log({ outputData });

  const parsedOutput = [];

  for (let i = 0; i < outputData.length; i++) {
    const element = outputData[i];
    parsedOutput.push(element.join("*"));
  }

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

const reorder = (data: any[], max: number) => {
  const left = data.splice(0, max / 2);
  const right = data.splice(0, max);
  // console.log({ left: left.length, right: right.length });

  const z1 = _.zip(left, right);
  // console.log({ z1 });

  const _newArr = _.flatten(z1);

  const newArr = _newArr.reduce((acc, curr) => {
    if (curr == null || curr == undefined) {
      acc.push("null");
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  console.log({ newArr });

  return newArr;
};
