function generatorOfIndex(length) {
  var i = -1;
  return function () {
    i += 1;
    return i % length;
  }
}

function generatorOfLength(length) {
  var c = length + 1;
  var i = -1;
  return function () {
    if (c <= length) {
      i = i * -1;
    }
    if (c == (length * 2 - 1)) {
      i = i * -1;
    }
    c += i;
    return c;
  }
}

function getHexagon(seq) {
  let getLength = generatorOfLength(seq.length);
  let getIndex = generatorOfIndex(seq.length);
  let result = [];
  for (let i = 0; i != (seq.length * 2 - 1); i++) {
    let arr = [];
    let length = getLength();
    for (let j = 0; j < length; j++) {
      arr.push(seq[getIndex()]);
    }
    result.push(arr);
  }
  return result;
}

function get(arr, i, r, size) {
  let s = (size * 2 - 1) - arr.length;
  if (r > size - 1) {
    if (i < s) {
      return null;
    } else {
      return arr[i - s];
    }
  } else {
    if (i > arr.length - 1) {
      return null;
    } else {
      return arr[i];
    }
  }
}

function getRight(arr, i, r, size) {
  let s = (size * 2 - 1) - arr.length;
  if (r < size - 1) {
    if (i < s) {
      return null;
    } else {
      return arr[i - s];
    }
  } else {
    if (i > arr.length - 1) {
      return null;
    } else {
      return arr[i];
    }
  }
}

function getMaxOfLeftDiagonal(grid, n) {
  let max = getSumOfLeftDiagonal(grid, 0, n);
  for (let i = 1; i != (n * 2 - 1); i++) {
    let sum = getSumOfLeftDiagonal(grid, i, n);
    if (sum > max) {
      max = sum;
    }
  }
  return max;
}

function getMaxOfRightDiagonal(grid, n) {
  let max = getSumOfRightDiagonal(grid, 0, n);
  for (let i = 1; i != (n * 2 - 1); i++) {
    let sum = getSumOfRightDiagonal(grid, i, n);
    if (sum > max) {
      max = sum;
    }
  }
  return max;
}

function getSumOfRightDiagonal(grid, indexOfDiagonal, n) {
  let sum = 0;
  for (let row = 0; row != grid.length; row++) {
    sum += getRight(grid[row], indexOfDiagonal, row, n);
  };
  return sum;
}

function getSumOfLeftDiagonal(grid, indexOfDiagonal, n) {
  let sum = 0;
  for (let row = 0; row != grid.length; row++) {
    sum += get(grid[row], indexOfDiagonal, row, n);
  };
  return sum;
}

function getSumHorizontal(row) {
  let sum = 0;
  row.forEach(function (item) {
    sum += item;
  });
  return sum;
}

function getMaxHorizontal(grid) {
  let max = 0;
  grid.forEach(function (row) {
    let sum = getSumHorizontal(row);
    if (sum > max) {
      max = sum;
    }
  });
  return max;
}

function max_hexagon_beam(n, seq) {
  let hex = getHexagon(seq);
  let leftMax = getMaxOfLeftDiagonal(hex, seq.length);
  let rightMax = getMaxOfRightDiagonal(hex, seq.length);
  let horizontalMax = getMaxHorizontal(hex);
  return Math.max(leftMax, rightMax, horizontalMax);
}

