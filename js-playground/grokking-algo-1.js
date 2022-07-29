// Binary Search

function binary_search(sorted_items, search_key, sorted = true) {
  if (!Array.isArray(sorted_items)) {
    throw new Error("argument 1 should be an array");
  }

  if (!sorted) {
    sorted_items = sorted_items.sort();
  }

  let low_index = 0;
  let high_index = sorted_items.length - 1;
  let mid_point = Math.floor(high_index / 2);
  while (low_index <= high_index) {
    guess = sorted_items[mid_point];
    if (guess == search_key) {
      console.log(guess);
      return guess;
    } else if (guess < search_key) {
      low_index = mid_point + 1;
    } else {
      high_index = mid_point - 1;
    }
  }

  return null;
}

// console.log(binary_search([1, 4, 5, 3, 1], 5, false));
