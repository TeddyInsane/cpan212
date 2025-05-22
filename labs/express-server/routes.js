const express = require('express');
const router = express.Router();

const myName = "Paritoshveer";
const studentNumber = "n01709032";

router.get('/name', (req, res) => {
  res.send(`Name: ${myName}`);
});

router.get('/greeting', (req, res) => {
  res.send(`Hello! My name is ${myName} and my student number is ${studentNumber}.`);
});

router.get('/add', (req, res) => {
  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);

  if (isNaN(x) || isNaN(y)) {
    return res.status(400).send('Please provide valid numbers for x and y.');
  }

  const sum = x + y;
  res.send(`Result of adding ${x} and ${y} is ${sum}`);
});

router.get('/calculate', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const op = req.query.operation;

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send('Please provide valid numbers for a and b.');
  }

  let result;

  switch (op) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) {
        return res.status(400).send('Division by zero is not allowed.');
      }
      result = a / b;
      break;
    case '**':
      result = a ** b;
      break;
    default:
      return res.status(400).send('Invalid operation. Use one of +, -, *, /, **');
  }

  res.send(`Result of ${a} ${op} ${b} is ${result}`);
});

router.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
  });
  
  module.exports = router;


