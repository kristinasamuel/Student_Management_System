#! /usr/bin/env node

import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "Enter student name:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a non-empty value.";
    },
  },
  {
    name: "course",
    type: "list",
    message: " Select the course to enrolled",
    choices: ["MS.office", "HTML", "Javascript", "Typescript", "Python"],
  },
]);

const tutionFee: { [key: string]: number } = {
  "MS.office": 700,
  HTML: 1200,
  Javascript: 4000,
  Typescript: 6000,
  Python: 12000,
};
console.log(`\nTution Fees: ${tutionFee[answer.course]}\n`);
console.log(`Balance: ${myBalance}`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Please select the payment method",
    choices: ["Bank transfer", "Easypaisa", "Jazzcash"],
  },
  {
    name: "amount",
    type: "input",
    message: "transfer money:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return " Please enter a non-empty value.";
    },
  },
]);

console.log(`\nYou select the payment method ${paymentType.payment}`);

const tutionFees = tutionFee[answer.course];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
  console.log(
    `Congratulation,you have successfully enrolled in ${answer.course}.\n`
  );

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next?",
      choices: ["View Status", "Exit"],
    },
  ]);

  if (ans.select === "View Status") {
    console.log("\n ********status******** \n");
    console.log(`Student Name: ${answer.student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course: ${answer.course}`);
    console.log(`Tution Fees Paid: ${paymentAmount}`);
    console.log(`Balance: ${(myBalance += paymentAmount)}`);
  } else {
    console.log("\n Exit \n");
  }
} else {
  console.log("Invalid amount due to course\n");
}
