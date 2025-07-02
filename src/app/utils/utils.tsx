export const directions = [
  [-1, 0], //上
  [0, 1], //右
  [1, 0], //下
  [0, -1], //左
];

export const makeWallFunction = (mazeBoard: number[][]) => {
  const countWall: [number, number][] = [];
  const checkWall = new Set<string>();
  const storage: [number, number][] = [];
  for (let y = 1; y < 14; y++) {
    for (let x = 1; x < 18; x++) {
      if (mazeBoard[y][x] === 1) {
        countWall.push([y, x]);
      }
    }
  }
  for (const [ky, kx] of countWall) {
    let putStorage = true;
    while (putStorage) {
      const makeWallDirection = directions[Math.floor(Math.random() * directions.length)];
      if (!checkWall.has(`${ky + makeWallDirection[0]},${kx + makeWallDirection[1]}`)) {
        checkWall.add(`${ky + makeWallDirection[0]},${kx + makeWallDirection[1]}`);
        storage.push([ky + makeWallDirection[0], kx + makeWallDirection[1]]);
        putStorage = false;
      }
    }
  }
  return storage;
};

export const handDirection = (angleAI: number) => {
  //右向き
  if (angleAI % 4 === 0) {
    return [directions[0], directions[1], directions[2], directions[3]];
  }
  //下向き
  if (angleAI % 4 === 1) {
    return [directions[1], directions[2], directions[3], directions[0]];
  }
  //左向き
  if (angleAI % 4 === 2) {
    return [directions[2], directions[3], directions[0], directions[1]];
  }
  //上向き
  else {
    return [directions[3], directions[0], directions[1], directions[2]];
  }
};
