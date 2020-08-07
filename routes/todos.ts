import { Router } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ todos });
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);

  // 201: created success
  res.status(201).json({ message: 'Todo added.', todo: newTodo, todos });
});

// Replace todo
router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const todoId = params.todoId;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: 'Todo updated.', todos });
  }
  res.status(404).json({ message: 'Could not find todo with this ID.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res.status(200).json({ message: 'Todo deleted.', todos });
});

export default router;
