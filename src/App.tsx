import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type ChangeFilterType = 'All' | 'Active' | 'Completed'

type TodolistType = {
  id: string
  title: string
  filter: ChangeFilterType
}

function App() {
  let tLID_1 = v1()
  let tLID_2 = v1()

  let [todos, setTodos] = useState<Array<TodolistType>>([
    {id: tLID_1, title: 'Что учить?', filter: 'All'},
    {id: tLID_2, title: 'Что купить?', filter: 'All'},
  ])

  let [tasks, setTasks] = useState({
    [tLID_1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: false},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [tLID_2]: [
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Jem', isDone: false},
    ]
  })

  const removeTasks = (taskID: string, tLID: string) => {
    let tasksTodolist = tasks[tLID]
    tasks[tLID] = tasksTodolist.filter(t => t.id !== taskID)
    setTasks({...tasks})
  }
  // const removeTodo = (tLID: string) => {
  //   todos.filter((td) => td.id !== tLID)
  //   setTodos([...todos])
  // }
  const changeFilter = (tdID: string, value: ChangeFilterType) => {
    todos.find((td) => td.id === tdID ? td.filter = value : '')
    setTodos([...todos])
  }
  const addTask = (title: string, tLID: string) => {
    let newTask = {id: v1(), title, isDone: false}
    let tasksTodolist = tasks[tLID]
    tasks[tLID] = [newTask, ...tasksTodolist]
    setTasks({...tasks})
  }
  const changeStatusCheckbox = (taskID: string, tLID: string, isDone: boolean) => {

    let tasksTodolist = tasks[tLID]
    let newStatusTask = tasksTodolist.find(t => t.id === taskID)
    if (newStatusTask) {
      newStatusTask.isDone = isDone
    }
    setTasks({...tasks})
  }

  return (
    <div className="App">
      {todos.map((td) => {
        let filteredTasks = tasks[td.id]
        let tasksForTodolist = filteredTasks

        if (td.filter === 'Active') {
          tasksForTodolist = filteredTasks.filter((t) => !t.isDone)
        }
        if (td.filter === 'Completed') {
          tasksForTodolist = filteredTasks.filter((t) => t.isDone)
        }
        return <Todolist key={td.id}
                         id={td.id}
                         title={td.title}
                         tasks={tasksForTodolist}
                         removeTasks={removeTasks}
                         changeFilter={changeFilter}
                         addTask={addTask}
                         statusCheckbox={changeStatusCheckbox}
                         filter={td.filter}
        />
      })}

    </div>
  );
}

export default App;
