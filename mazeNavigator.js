/* eslint-disable no-console */
let maze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e'],
];

function mazeNavigator(maze, attempts, pos = [0, 0], route = new Array(), successfulRoutes = new Array(), counter = 0) {
  let x = pos[0];
  let y = pos[1];

  if (maze[y][x] === 'e') {
    if (successfulRoutes.includes(route.join(''))) {
      console.log('Repeate route!');
    } else {
      console.log('Unique route found!');
      successfulRoutes.push(route.join(''));
      route = [];
    }
    counter++;
    return mazeNavigator(maze, attempts, (pos = [0, 0]), (route = []), successfulRoutes, counter);
  }

  while (counter < attempts) {
    let choices = {};
    if (x !== 0 && maze[y][x - 1] !== '*' && maze[y][x - 1][1] !== counter) {
      choices.left = { pos: [x - 1, y], direction: 'L', value: maze[y][x - 1] };
    }
    if (y !== 0 && maze[y - 1][x] !== '*' && maze[y - 1][x][1] !== counter) {
      choices.up = { pos: [x, y - 1], direction: 'U', value: maze[y - 1][x] };
    }
    if (x !== maze[y].length - 1 && maze[y][x + 1] !== '*' && maze[y][x + 1][1] !== counter) {
      choices.right = { pos: [x + 1, y], direction: 'R', value: maze[y][x + 1] };
    }
    if (y !== maze.length - 1 && maze[y + 1][x] !== '*' && maze[y + 1][x][1] !== counter) {
      choices.down = { pos: [x, y + 1], direction: 'D', value: maze[y + 1][x] };
    }

    let numChoices = Object.keys(choices).length;

    if (numChoices === 1) {
      maze[y][x] = [choices[Object.keys(choices)[0]].direction, counter];
      pos = choices[Object.keys(choices)[0]].pos;
      route.push(choices[Object.keys(choices)[0]].direction);
      return mazeNavigator(maze, attempts, pos, route, successfulRoutes, counter);
    }

    if (numChoices > 1) {
      const randomDir = Math.floor(Math.random() * numChoices);
      maze[y][x] = [choices[Object.keys(choices)[randomDir]].direction, counter];
      pos = choices[Object.keys(choices)[randomDir]].pos;
      route.push(choices[Object.keys(choices)[randomDir]].direction);
      return mazeNavigator(maze, attempts, pos, route, successfulRoutes, counter);
    }

    if (numChoices === 0) {
      console.log('Oops, got stuck!');
      counter++;
      return mazeNavigator(maze, attempts, (pos = [0, 0]), (route = []), successfulRoutes, counter);
    }
  }

  return `Unique routes: ${successfulRoutes.join(', ')}`;
}

// Function mazeNavigator will attempt to solve any (solvable) maze
console.log(mazeNavigator(maze, 25));
