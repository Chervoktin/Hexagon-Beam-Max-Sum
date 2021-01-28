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
    c += i;
    if (c <= length) {
      i = i * -1;
    }
    if (c == (length * 2 - 1)) {
      i = i * -1;
    }

    return c;
  }
}

function getHexagon(seq, n) {
  let getLength = generatorOfLength(n);
  let getIndex = generatorOfIndex(seq.length);
  let result = [];
  for (let i = 0; i != (n * 2 - 1); i++) {
    let arr = [];
    let length = getLength();
    for (let j = 0; j < length; j++) {
      arr.push(seq[getIndex()]);
    }
    result.push(arr);
  }
  return result;
}

function getLeftDiagonalItem(arrOfRow, indexOfDiagonal, indexOfRow, n) {
  let offset = (n * 2 - 1) - arrOfRow.length;
  if (indexOfRow > n - 1) {
    if (indexOfDiagonal < offset) {
      return null;
    } else {
      return arrOfRow[indexOfDiagonal - offset];
    }
  } else {
    if (indexOfDiagonal > arrOfRow.length - 1) {
      return null;
    } else {
      return arrOfRow[indexOfDiagonal];
    }
  }
}

function getRightDiagonalItem(arrOfRow, indexOfDiagonal, indexOfRow, n) {
  let s = (n * 2 - 1) - arrOfRow.length;
  if (indexOfRow < n - 1) {
    if (indexOfDiagonal < s) {
      return null;
    } else {
      return arrOfRow[indexOfDiagonal - s];
    }
  } else {
    if (indexOfDiagonal > arrOfRow.length - 1) {
      return null;
    } else {
      return arrOfRow[indexOfDiagonal];
    }
  }
}

function getMax(grid, funOfSum, n) {
  let max = funOfSum(grid, 0, n);
  for (let indexOfDiagonal = 1; indexOfDiagonal != (n * 2 - 1); indexOfDiagonal++) {
    let sum = funOfSum(grid, indexOfDiagonal, n);
    if (sum > max) {
      max = sum;
    }
  }
  return max;
}

function getSumHorizontal(row) {
  let sum = 0;
  row.forEach(function (item) {
    sum += item;
  });
  return sum;
}


function getSumFun(funOfGettingItemOfDiagonal) {
  return function (grid, indexOfDiagonal, n, fun) {
    let sum = 0;
    for (let row = 0; row != grid.length; row++) {
      sum += funOfGettingItemOfDiagonal(grid[row], indexOfDiagonal, row, n);
    };
    return sum;
  }
}

function getMaxHorizontal(grid) {
  let max = Number.MIN_SAFE_INTEGER;
  grid.forEach(function (row) {
    let sum = getSumHorizontal(row);
    if (sum > max) {
      max = sum;
    }
  });
  return max;
}

function maxHexagonBeam(n, seq) {
  let hex = getHexagon(seq, n);
  let leftMax = getMax(hex, getSumFun(getLeftDiagonalItem), n);
  let rightMax = getMax(hex, getSumFun(getRightDiagonalItem), n);
  let horizontalMax = getMax(hex, getMaxHorizontal, n);
  return Math.max(leftMax, rightMax, horizontalMax);
}