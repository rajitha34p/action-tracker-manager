// app.js
const Web3 = require('web3');
const contractAbi = require('./build/contracts/ActionTracker.json').abi;
const contractAddress = '0xE86319d6A614b663083e50CdE284c724dd7EefE2';

const web3 = new Web3('http://localhost:8545'); // Connect to your local or external Ethereum node

const actionTrackerContract = new web3.eth.Contract(contractAbi, contractAddress);

async function addTask() {
    const description = document.getElementById('taskDescription').value;
    const accounts = await web3.eth.getAccounts();
    await actionTrackerContract.methods.addTask(description).send({ from: accounts[0] });
}

async function markTaskComplete() {
    const taskId = document.getElementById('taskId').value;
    const accounts = await web3.eth.getAccounts();
    await actionTrackerContract.methods.markTaskComplete(taskId).send({ from: accounts[0] });
}

async function assignTask() {
    const taskId = document.getElementById('assignTaskId').value;
    const assigneeAddress = document.getElementById('assigneeAddress').value;
    const accounts = await web3.eth.getAccounts();
    await actionTrackerContract.methods.assignTask(taskId, assigneeAddress).send({ from: accounts[0] });
}

// Function to update the task list UI
function updateTaskList() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    for (let i = 1; i <= taskCount; i++) {
        const task = tasks[i];
        const listItem = document.createElement('li');
        listItem.textContent = `Task ${i}: ${task.description} (Completed: ${task.isCompleted ? 'Yes' : 'No'}, Assigned To: ${task.assignedTo})`;
        taskListElement.appendChild(listItem);
    }
}
