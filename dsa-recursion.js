/* eslint-disable no-console */
//1. Counting Sheep
function countSheep(num) {
  console.log(num + ': Another sheep jumps over the fence');
  num--;
  if (num === 0) {
    return console.log('All sheep jumped over the fence!');
  }
  countSheep(num);
}

console.log(countSheep(3));

//2. Power Calculator

function powerCalculator(num1, num2) {
  let result = num1;
  if (num2 < 0) {
    return console.log('Exponent should be >= 0');
  }
  if (num2 <= 1) {
    return result;
  }
  result = result * num1;
  num2--;
  return powerCalculator(result, num2);
}

console.log(powerCalculator(10, 2));
console.log(powerCalculator(10, -2));

//3. Reverse String

function stringReverser(string, newString = '') {
  if (string.length === 0) {
    return newString;
  }
  let newLetter = string[0];
  newString = newLetter + newString;
  string = string.slice(1);
  return stringReverser(string, newString);
}

console.log(stringReverser('This is a test string'));

//4. nth Triangular Number

function nthTriangularNumber(num1, count = 1, seq = []) {
  if (num1 === 1) {
    return '1';
  }
  if (num1 === count) {
    return seq.reduce((a, b) => a + b, 0);
  }
  seq.push(count);
  count++;
  return nthTriangularNumber(num1, count, seq);
}

console.log(nthTriangularNumber(10));

//5. String Splitter

function stringSplitter(string, split = '', array = []) {
  if (string.length === 0) {
    array.push(split);
    return array;
  }
  if (string[0] === '/') {
    array.push(split);
    split = '';
    string = string.slice(1);
  }
  split = split + string[0];
  string = string.slice(1);

  return stringSplitter(string, split, array);
}

console.log(stringSplitter('02/20/2020'));

//6. Fibonacci

function fibonacci(num1, count = 2, seq = [1, 1]) {
  if (num1 === 1) {
    return '1';
  }
  if (num1 === count) {
    return seq.join(', ');
  }

  let newNum = seq[count - 1] + seq[count - 2];
  seq.push(newNum);
  count++;

  return fibonacci(num1, count, seq);
}

console.log(fibonacci(7));

//7. Factorial

function factorial(num1, count = 1, seq = []) {
  if (num1 === 1) {
    return 1;
  }
  if (num1 === count) {
    seq.push(count);
    return seq.reduce((a, b) => a * b);
  }
  seq.push(count);
  count++;
  return factorial(num1, count, seq);
}

console.log(factorial(5));

//8. Find a way out of the maze

// let smallMaze = [
//   [' ', ' ', ' '],
//   [' ', '*', ' '],
//   [' ', ' ', 'e'],
// ];

let maze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e'],
];

function mazeNavigation(maze, pos = [0, 0], directions = '') {
  let y = pos[0];
  let x = pos[1];

  if (maze[y][x + 1] === 'e') {
    directions = directions + 'R';
    return `Directions: ${directions}`;
  }

  if (maze[y + 1][x] === 'e') {
    directions = directions + 'D';
    return `Directions: ${directions}`;
  }

  if (maze[y][x + 1] && maze[y][x + 1] !== '*' && maze[y][x + 1] !== 'e') {
    directions = directions + 'R';
    return mazeNavigation(maze, (pos = [y, x + 1]), directions);
  }

  if (maze[y + 1][x] && maze[y + 1][x] !== '*' && maze[y + 1][x] !== 'e') {
    directions = directions + 'D';
    return mazeNavigation(maze, (pos = [y + 1, x]), directions);
  }
}

console.log(mazeNavigation(maze));

//9. Find ALL the ways out of the maze

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

//10. Anagrams

// Currently incomplete

//11. Organization Chart

// Currently incomplete

//12. Binary Representation

// Currently incomplete
