module.exports = function solveSudoku(matrix) {
  if (!matrix.some(item => item.includes(0))) {
    return matrix;
  }
  let lost = false;
  let changed = false;
  let currentHor;
  let currentVer;
  let possible;

  do {
    const whitelist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let horIndex = 0; horIndex < matrix.length; horIndex++) {
      for (let verIndex = 0; verIndex < 9; verIndex++) {
        if (!matrix[horIndex][verIndex]) {
          let localwhiteList = [...whitelist];
          localwhiteList = checkHorizontaly(matrix, horIndex, localwhiteList);
          localwhiteList = checkVerticaly(matrix, verIndex, localwhiteList);
          localwhiteList = checkSquare(matrix, horIndex, verIndex, localwhiteList);

          if (!localwhiteList.length) {
            return null;
          } else if (localwhiteList.length === 1) {
            matrix[horIndex][verIndex] = localwhiteList[0];
            changed = true;
          } else {
            lost = true;
            if (!possible || localwhiteList.length < possible.length) {
              currentHor = horIndex;
              currentVer = verIndex;
              possible = [...localwhiteList];
            }
          }
        }
      }
    }
  } while (!lost && !changed);

  if (possible && matrix.some(item => item.includes(0))) {
    for (let i = 0; i < possible.length; i++) {
      const copy = matrix.map(item => [...item]);
      copy[currentHor][currentVer] = possible[i];
      const result = solveSudoku(copy);

      if (result) {
        return result;
      }
    }
    return null;
  }

  return matrix;
};

function checkHorizontaly(matrix, horIndex, whitelist) {
  return whitelist.filter(item => !matrix[horIndex].includes(item));
}

function checkVerticaly(matrix, verIndex, whitelist) {
  const verticalList = matrix.map(item => item[verIndex]);
  return whitelist.filter(item => !verticalList.includes(item));
}

function checkSquare(matrix, horIndex, verIndex, whitelist) {
  let localMatrix = [...matrix];

  if (horIndex < 3) {
    localMatrix = localMatrix.filter((item, index) => index < 3);
  } else if (horIndex < 6) {
    localMatrix = localMatrix.filter((item, index) => index < 6 && index > 2);
  } else {
    localMatrix = localMatrix.filter((item, index) => index < 9 && index > 5);
  }

  if (verIndex < 3) {
    localMatrix = localMatrix.map(item => item.filter((v, i) => i < 3));
  } else if (verIndex < 6) {
    localMatrix = localMatrix.map(item => item.filter((v, i) => i < 6 && i > 2));
  } else {
    localMatrix = localMatrix.map(item => item.filter((v, i) => i < 9 && i > 5));
  }

  const [first, second, third] = localMatrix;
  localMatrix = [...first, ...second, ...third];

  const filtered = whitelist.filter(item => !localMatrix.includes(item));
  let notNull = filtered.filter(item => item);

  return notNull;
  // if (notNull.length === 1) {
  //   return notNull;
  // }

  // let otherHorizontal = [];
  // let otherVertical = [];

  // if (horIndex < 3) {
  //   otherHorizontal = matrix.filter((item, index) => index < 3 && index !== horIndex);
  // } else if (horIndex < 6) {
  //   otherHorizontal = matrix.filter((item, index) => index < 6 && index > 2 && index !== horIndex);
  // } else {
  //   otherHorizontal = matrix.filter((item, index) => index < 9 && index > 5 && index !== horIndex);
  // }

  // if (verIndex < 3) {
  //   otherVertical = matrix.map(item => item.filter((v, i) => i < 3 && i !== verIndex));
  // } else if (verIndex < 6) {
  //   otherVertical = matrix.map(item => item.filter((v, i) => i < 6 && i > 2 && i !== verIndex));
  // } else {
  //   otherVertical = matrix.map(item => item.filter((v, i) => i < 9 && i > 5 && i !== verIndex));
  // }

  // // notNull = notNull.filter(item => otherHorizontal.every(v => v.includes(item)) || otherVertical.every(v => v.includes(item)));

  // if (!currentHor && first.filter(i => i).length === 2) {
  //   notNull = notNull.filter(item => otherHorizontal.every(v => v.includes(item)));
  // }

  // if (currentHor === 1 && second.filter(i => i).length === 2) {
  //   notNull = notNull.filter(item => otherHorizontal.every(v => v.includes(item)));
  // }

  // if (currentHor === 2 && third.filter(i => i).length === 2) {
  //   notNull = notNull.filter(item => otherHorizontal.every(v => v.includes(item)));
  // }

  // const firstVer = [first[0], second[0], third[0]];
  // const secondVer = [first[1], second[1], third[1]];
  // const thirdVer = [first[2], second[2], third[2]];

  // if (!currentVer && firstVer.filter(i => i).length === 2) {
  //   notNull = notNull.filter(item => otherVertical.every(v => v.includes(item)));
  // }

  // if (currentVer === 1 && secondVer.filter(i => i).length === 2) {
  //   notNull = notNull.filter(item => otherVertical.every(v => v.includes(item)));
  // }

  // if (currentVer === 2 && thirdVer.filter(i => i).length === 2) {
  //   notNull = notNull.filter(item => otherVertical.every(v => v.includes(item)));
  // }

  // return notNull;
}

// var end = [];

// function solve(matrix, index = 0) {
//   console.log(matrix);
//   console.log('');
//   const whitelist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const copy = matrix.map(item => [...item]);

//   for (let i = 0; i < copy.length; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (!copy[i][j]) {
//         whitelist.forEach(item => {
//           copy[i][j] = item;

//           solve(copy);
//         });
//       }
//     }
//   }

//   if (checkMatrix(copy)) {
//     end.push(copy);
//   }
// }

// function checkMatrix(matrix) {
//   let result = true;

//   parent: for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < 9; j++) {
//       const horIndex = i;
//       const verIndex = j;
//       const currentHorizontal = matrix[horIndex];
//       const currentVertical = matrix.map(item => item[verIndex]);

//       let localMatrix = [...matrix];

//       if (horIndex < 3) {
//         localMatrix = localMatrix.filter((item, index) => index < 3);
//       } else if (horIndex < 6) {
//         localMatrix = localMatrix.filter((item, index) => index < 6 && index > 2);
//       } else {
//         localMatrix = localMatrix.filter((item, index) => index < 9 && index > 5);
//       }

//       if (verIndex < 3) {
//         localMatrix = localMatrix.map(item => item.filter((v, i) => i < 3));
//       } else if (verIndex < 6) {
//         localMatrix = localMatrix.map(item => item.filter((v, i) => i < 6 && i > 2));
//       } else {
//         localMatrix = localMatrix.map(item => item.filter((v, i) => i < 9 && i > 5));
//       }

//       const [first, second, third] = localMatrix;
//       localMatrix = [...first, ...second, ...third];

//       if (!checkIfUnique(currentHorizontal) || !checkIfUnique(currentVertical) || !checkIfUnique(localMatrix)) {
//         result = false;
//         break parent;
//       }
//     }
//   }

//   return result;
// }

// function checkIfUnique(arr = []) {
//   return arr.filter((item, index) => arr.indexOf(item) === index).length === arr.length;
// }

// const initial = [
//   [0, 5, 0, 4, 0, 0, 0, 1, 3],
//   [0, 2, 6, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 9, 0],
//   [0, 0, 0, 0, 8, 5, 6, 0, 0],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 6, 0, 0, 0, 0],
//   [3, 0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 7, 3, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 5, 0, 0]
// ];
// console.log(solveSudoku(initial));
// console.log(solveSudoku(initial));

// console.log('end', end);
