const fs = require('fs');
const path = require('path');

const tasksFile = path.join(__dirname, 'tasks.json');

function readTasks() {
  if (!fs.existsSync(tasksFile)) {
    return [];
  }
  const data = fs.readFileSync(tasksFile, 'utf8');
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('Usage: node index.js <command> [args]');
  console.log('Commands: add <task>, list, remove <id>, done <id>, update <id> <new task>');
  process.exit(1);
}

let tasks = readTasks();

if (command === 'add') {
  if (args.length < 2) {
    console.log('Usage: node index.js add <task>');
    process.exit(1);
  }
  const newTask = args.slice(1).join(' ');
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  tasks.push({ id, task: newTask, done: false });
  writeTasks(tasks);
  console.log(`Task added: ${newTask}`);
} else if (command === 'list') {
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    tasks.forEach(t => {
      console.log(`${t.id}. [${t.done ? 'x' : ' '}] ${t.task}`);
    });
  }
} else if (command === 'remove') {
  if (args.length < 2) {
    console.log('Usage: node index.js remove <id>');
    process.exit(1);
  }
  const removeId = parseInt(args[1]);
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== removeId);
  if (tasks.length < initialLength) {
    writeTasks(tasks);
    console.log(`Task ${removeId} removed.`);
  } else {
    console.log(`Task ${removeId} not found.`);
  }
} else if (command === 'done') {
  if (args.length < 2) {
    console.log('Usage: node index.js done <id>');
    process.exit(1);
  }
  const doneId = parseInt(args[1]);
  const task = tasks.find(t => t.id === doneId);
  if (task) {
    task.done = true;
    writeTasks(tasks);
    console.log(`Task ${doneId} marked as done.`);
  } else {
    console.log(`Task ${doneId} not found.`);
  }
} else if (command === 'update') {
  if (args.length < 3) {
    console.log('Usage: node index.js update <id> <new task>');
    process.exit(1);
  }
  const updateId = parseInt(args[1]);
  const newTaskText = args.slice(2).join(' ');
  const updateTask = tasks.find(t => t.id === updateId);
  if (updateTask) {
    updateTask.task = newTaskText;
    writeTasks(tasks);
    console.log(`Task ${updateId} updated.`);
  } else {
    console.log(`Task ${updateId} not found.`);
  }
} else {
  console.log('Unknown command. Use: add, list, remove, done, update');
}
