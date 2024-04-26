#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
//  Welcome Message
console.log(chalk.bold.rgb(204, 204, 204)(chalk.magenta.bold(`\t\t\tWelcome To \` Ameer Saria's updated \` Todo-List Application\n`)));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            { name: "choices",
                type: "list",
                message: chalk.red(" Select an option you want to do"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"]
            }
        ]);
        if (option.choices === "Add Task") {
            await addTask();
        }
        else if (option.choices === "Delete Task") {
            await deleteTask();
        }
        else if (option.choices === "Update Task") {
            await updateTask();
        }
        else if (option.choices === "View Todo-List") {
            await viewTask();
        }
        else if (option.choices === "Exit") {
            condition = false;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.magenta("Enter Your New Task")
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.greenBright.italic(`\n ${newTask.task} Task added sucessfully in Todo-List\n`));
};
// function  to  view all  Todo-list Task
let viewTask = () => {
    console.log(chalk.magenta.bold("\n Your Todo-List: \n"));
    todoList.forEach((task, index) => {
        console.log(` ${index + 1}:  ${task}`);
    });
    console.log("\n");
};
// function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blueBright.bold("Enter the `index no.`of the task you want to delete:")
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.redBright.italic(`\n ${deleteTask} this task has been deleted sucessfully from your Todo-list`));
    console.log(`\n`);
};
// function to update a task from the list
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: (chalk.blueBright.bold("Enter the 'index no' of the task you want to update:"))
        },
        {
            name: "new_task",
            type: "input",
            message: (chalk.magenta.bold("Now enter new task name"))
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.greenBright.italic(`\n Task at index no ${update_task_index.index - 1} updated sucessfully [for updated list check option: "view-Todo-List"]\n`));
};
main();
