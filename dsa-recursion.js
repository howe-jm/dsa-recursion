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
  return nthTriangularNumber(num1, count, seq);
}

console.log(factorial(5));

//8. Find a way out of the maze

//9. Find ALL the ways out of the maze

//10. Anagrams

//11. Organization Chart

//12. Binary Representation
