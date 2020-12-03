/* eslint-disable indent */
/* eslint-disable no-console */

let maze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e'],
];

function mazeNavigator(maze, newPath = false, pos = [0, 0], route = [], successfulRoutes = []) {
  let x = pos[0];
  let y = pos[1];
  // console.log('Current Route: ' + route)
  // console.log('Successful Routes: ' + successfulRoutes)
  console.log('Current Pos: ' + x + y + maze[y][x]);
  // console.log('Last dir: ' + route[route.length - 1])
  // console.log(maze[y])

  let choices = 0;

  if (x !== 0 && maze[y][x - 1] !== '*' && maze[y][x] !== 'L') {
    choices++;
  }
  if (y !== 0 && maze[y - 1][x] !== '*' && maze[y][x] !== 'U') {
    choices++;
  }
  if (x !== maze[y].length - 1 && maze[y][x + 1] !== '*' && maze[y][x] !== 'R') {
    choices++;
  }
  if (y !== maze.length - 1 && maze[y + 1][x] !== '*' && maze[y][x] !== 'D') {
    choices++;
  }

  console.log(choices);

  function resetMaze() {
    maze.map((x) => {
      if (x.indexOf('s') !== -1) {
        console.log('Resetting stuck spots.');
        x[x.indexOf('s')] = ' ';
      }
    });
  }

  let incomplete = maze.map((a) => a.includes(' '));
  console.log(incomplete.includes(true));

  // Boundary detection
  if (x !== 0 && maze[y][x - 1] !== '*') {
    if (maze[y][x - 1] === 'e' && newPath === true) {
      maze[y][x] = 'L';
      route.push('Left');
      console.log(`Maze completed with new route: ${route}`);
      successfulRoutes.push(route);
      resetMaze();
      return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
    } else if (maze[y][x - 1] === 'e' && newPath === false) {
      if (incomplete.includes(true)) {
        console.log('Bad route, but unexplored areas left.');
        maze[y][x] = 'L';
        return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
      } else {
        console.log('Maze completed with no new routes.');
        return successfulRoutes;
      }
    } else if (maze[y][x - 1] === ' ' && route[route.length - 1] !== 'Right') {
      maze[y][x] = 'L';
      console.log('Left, New Route');
      route.push('Left');
      newPath = true;
      return mazeNavigator(maze, newPath, (pos = [x - 1, y]), route, successfulRoutes);
    }
  }

  if (y !== 0 && maze[y - 1][x] !== '*') {
    if (maze[y - 1][x] === 'e' && newPath === true) {
      maze[y][x] = 'U';
      route.push('Up');
      console.log(`Maze completed with new route: ${route}`);
      successfulRoutes.push(route);
      resetMaze();
      return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
    } else if (maze[y - 1][x] === 'e' && newPath === false) {
      if (incomplete.includes(true)) {
        console.log('Bad route, but unexplored areas left.');
        maze[y][x] = 'U';
        return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
      } else {
        console.log('Maze completed with no new routes.');
        return successfulRoutes;
      }
    } else if (maze[y - 1][x] === ' ' && route[route.length - 1] !== 'Down') {
      maze[y][x] = 'U';
      console.log('Up, New Route');
      route.push('Up');
      newPath = true;
      return mazeNavigator(maze, newPath, (pos = [x, y - 1]), route, successfulRoutes);
    }
  }

  if (x !== maze[y].length - 1 && maze[y][x + 1] !== '*') {
    if (maze[y][x + 1] === 'e' && newPath === true) {
      maze[y][x] = 'R';
      route.push('Right');
      console.log(`Maze completed with new route: ${route}`);
      successfulRoutes.push(route);
      resetMaze();
      return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
    } else if (maze[y][x + 1] === 'e' && newPath === false) {
      if (incomplete.includes(true)) {
        console.log('Bad route, but unexplored areas left.');
        maze[y][x] = 'R';
        return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
      } else {
        console.log('Maze completed with no new routes.');
        return successfulRoutes;
      }
    } else if (maze[y][x + 1] === ' ' && route[route.length - 1] !== 'Left') {
      maze[y][x] = 'R';
      console.log('Right, New Route');
      route.push('Right');
      newPath = true;
      return mazeNavigator(maze, newPath, (pos = [x + 1, y]), route, successfulRoutes);
    }
  }

  if (y !== maze.length - 1 && maze[y + 1][x] !== '*') {
    if (maze[y + 1][x] === 'e' && newPath === true) {
      maze[y][x] = 'D';
      route.push('Down');
      console.log(`Maze completed with new route: ${route}`);
      successfulRoutes.push(route);
      resetMaze();
      return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
    } else if (maze[y + 1][x] === 'e' && newPath === false) {
      if (incomplete.includes(true)) {
        console.log('Bad route, but unexplored areas left.');
        maze[y][x] = 'D';
        return mazeNavigator(maze, (newPath = false), (pos = [0, 0]), (route = []), successfulRoutes);
      } else {
        console.log('Maze completed with no new routes.');
        return successfulRoutes;
      }
    } else if (maze[y + 1][x] === ' ' && route[route.length - 1] !== 'Up') {
      maze[y][x] = 'D';
      console.log('Down, New Route');
      route.push('Down');
      newPath = true;
      return mazeNavigator(maze, newPath, (pos = [x, y + 1]), route, successfulRoutes);
    }
  }

  if (newPath === true && choices === 0) {
    console.log('Stuck!');
    switch (route[route.length - 1]) {
      case 'Left': {
        maze[y][x] = 's';
        route.pop();
        return mazeNavigator(maze, newPath, (pos = [x + 1, y]), route, successfulRoutes);
      }
      case 'Right': {
        maze[y][x] = 's';
        route.pop();
        return mazeNavigator(maze, newPath, (pos = [x - 1, y]), route, successfulRoutes);
      }
      case 'Up': {
        maze[y][x] = 's';
        route.pop();
        return mazeNavigator(maze, newPath, (pos = [x, y + 1]), route, successfulRoutes);
      }
      case 'Down': {
        maze[y][x] = 's';
        route.pop();
        return mazeNavigator(maze, newPath, (pos = [x, y - 1]), route, successfulRoutes);
      }
      default: {
        break;
      }
    }
  } else {
    if (x !== 0 && maze[y][x - 1] !== '*') {
      if (route[route.length - 1] !== 'Right' && (maze[y][x] !== 'L' || choices < 2)) {
        console.log('Left, Not New Route');
        maze[y][x] = 'L';
        route.push('Left');
        return mazeNavigator(maze, newPath, (pos = [x - 1, y]), route, successfulRoutes);
      }
    }

    if (y !== 0 && maze[y - 1][x] !== '*') {
      if (route[route.length - 1] !== 'Down' && (maze[y][x] !== 'U' || choices < 2)) {
        console.log('Up, Not New Route');
        maze[y][x] = 'U';
        route.push('Up');
        return mazeNavigator(maze, newPath, (pos = [x, y - 1]), route, successfulRoutes);
      }
    }

    if (x !== maze[y].length - 1 && maze[y][x + 1] !== '*') {
      if (route[route.length - 1] !== 'Left' && (maze[y][x] !== 'R' || choices < 2)) {
        console.log('Right, Not New Route');
        maze[y][x] = 'R';
        route.push('Right');
        return mazeNavigator(maze, newPath, (pos = [x + 1, y]), route, successfulRoutes);
      }
    }

    if (y !== maze.length - 1 && maze[y + 1][x] !== '*') {
      if (route[route.length - 1] !== 'Up' && (maze[y][x] !== 'D' || choices < 2)) {
        console.log('Down, Not New Route');
        maze[y][x] = 'D';
        route.push('Down');
        return mazeNavigator(maze, newPath, (pos = [x, y + 1]), route, successfulRoutes);
      }
    }
  }

  return successfulRoutes;
}

console.log(mazeNavigator(maze));
