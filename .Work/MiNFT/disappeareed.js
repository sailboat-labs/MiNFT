let n = 0;
const originalArray = [4, 3, 2, 7, 8, 2, 3, 1];
const tempArray = originalArray.slice(
)
const disappeared = [];
while (tempArray.pop()) {
  n += 1;

  if (originalArray.includes(n) == false) {
    disappeared.push(n);
    console.log(originalArray, "does not includes", n);
  } else {
    console.log(originalArray, "includes", n);

  }
}
console.log(disappeared);