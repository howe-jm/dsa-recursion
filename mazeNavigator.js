/* eslint-disable no-console */
let maze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e'],
];

let bigMaze = [
  [' ', '*', ' ', '*', '*', '*', '*', '*', '*', ' '],
  [' ', '*', ' ', ' ', ' ', ' ', '*', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', ' ', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*', ' '],
  ['*', '*', '*', ' ', '*', '*', '*', '*', ' ', ' '],
  [' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', ' ', '*', '*', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*', ' '],
  [' ', '*', '*', '*', '*', ' ', ' ', ' ', ' ', ' '],
  ['*', '*', ' ', ' ', ' ', ' ', '*', '*', ' ', 'e'],
];

function mazeNavigator(maze, attempts, pos = [0, 0], route = [], successfulRoutes = [], counter = 0) {
  let x = pos[0];
  let y = pos[1];

  if (maze[y][x] === 'e') {
    if (!successfulRoutes.includes(route.join(''))) {
      console.log(`Attempt ${counter + 1}: Unique route found!`);
      successfulRoutes.push(route.join(''));
      route = [];
    }
    counter++;
    return mazeNavigator(maze, attempts, (pos = [0, 0]), (route = []), successfulRoutes, counter);
  }

  while (counter < attempts) {
    let choices = {};
    if (x !== 0 && maze[y][x - 1] !== '*' && maze[y][x - 1] !== counter) {
      choices.left = { pos: [x - 1, y], direction: 'L' };
    }
    if (y !== 0 && maze[y - 1][x] !== '*' && maze[y - 1][x] !== counter) {
      choices.up = { pos: [x, y - 1], direction: 'U' };
    }
    if (x !== maze[y].length - 1 && maze[y][x + 1] !== '*' && maze[y][x + 1] !== counter) {
      choices.right = { pos: [x + 1, y], direction: 'R' };
    }
    if (y !== maze.length - 1 && maze[y + 1][x] !== '*' && maze[y + 1][x] !== counter) {
      choices.down = { pos: [x, y + 1], direction: 'D' };
    }

    let numChoices = Object.keys(choices).length;

    if (numChoices === 1) {
      maze[y][x] = counter;
      pos = choices[Object.keys(choices)[0]].pos;
      route.push(choices[Object.keys(choices)[0]].direction);
      return mazeNavigator(maze, attempts, pos, route, successfulRoutes, counter);
    }

    if (numChoices > 1) {
      const randomDir = Math.floor(Math.random() * numChoices);
      maze[y][x] = counter;
      pos = choices[Object.keys(choices)[randomDir]].pos;
      route.push(choices[Object.keys(choices)[randomDir]].direction);
      return mazeNavigator(maze, attempts, pos, route, successfulRoutes, counter);
    }

    if (numChoices === 0) {
      counter++;
      return mazeNavigator(maze, attempts, (pos = [0, 0]), (route = []), successfulRoutes, counter);
    }
  }

  return `Unique routes: ${successfulRoutes.join(', ')}`;
}

// Function mazeNavigator will attempt to solve any (solvable) maze.
// It will attempt to solve any maze of any size, from any starting position and with the exit in any reachable place.
// Due to the nature of RNG, it may not find all routes every time. It is possible, though statistically unlikely, that it will find no routes or get stuck every time!
// The only limit on how big a maze it can solve is that JS will only allow for about 250 attempts before call stack limits are reached and it stops the function.
console.log(mazeNavigator(bigMaze, 250));
