# Task Manager CLI

A simple command-line task manager built with Node.js. Manage your tasks directly from the terminal with add, list, remove, mark as done, and update functionality.

## Features

- Add new tasks
- List all tasks with completion status
- Remove tasks by ID
- Mark tasks as done
- Update existing tasks
- Persistent storage using JSON file

## Installation

1. Make sure you have Node.js installed (version 14 or higher)
2. Clone or download this project
3. Navigate to the project directory
4. No additional dependencies required - uses only built-in Node.js modules

## Usage

Run the application using:

```bash
node index.js <command> [arguments]
```

### Commands

#### Add a new task
```bash
node index.js add "Buy groceries"
```

#### List all tasks
```bash
node index.js list
```

#### Remove a task
```bash
node index.js remove <task_id>
```

#### Mark a task as done
```bash
node index.js done <task_id>
```

#### Update a task
```bash
node index.js update <task_id> "New task description"
```

## Examples

```bash
# Add some tasks
node index.js add "Complete project report"
node index.js add "Call dentist"
node index.js add "Buy birthday gift"

# List all tasks
node index.js list

# Mark first task as done
node index.js done 1

# Update second task
node index.js update 2 "Schedule dentist appointment"

# Remove third task
node index.js remove 3
```

## Task Storage

Tasks are stored in a `tasks.json` file in the same directory as the script. The file is created automatically when you add your first task.

## Task Format

Each task has the following structure:
```json
{
  "id": 1,
  "task": "Task description",
  "done": false
}
```

## Error Handling

The application includes basic error handling for:
- Missing commands or arguments
- Invalid task IDs
- File system errors

## Contributing

Feel free to fork this project and submit pull requests with improvements.

## License

This project is licensed under the ISC License.
