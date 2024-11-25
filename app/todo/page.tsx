'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Todo {
  id: number
  text: string
  completed: boolean
}

// Add type for the checkbox change event
type CheckedState = boolean | 'indeterminate';

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (!inputValue.trim()) return

    setTodos(prev => [...prev, {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }])
    setInputValue('')
  }

  const handleToggleTodo = (id: number, checked: CheckedState) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: checked as boolean } : todo
    ))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
            aria-label="New todo input"
          />
          <Button 
            onClick={handleAddTodo}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-black text-white font-bold py-2 px-4 rounded shadow-lg hover:opacity-90 transition duration-300"
            aria-label="Add todo"
          >
            Add
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={(checked) => handleToggleTodo(todo.id, checked)}
                aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className="flex-grow cursor-pointer select-none"
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default TodoPage