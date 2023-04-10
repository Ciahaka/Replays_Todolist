import React, {useState} from 'react';
import '../App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {UniversalInput} from '../universal input form/UniversalInput';

export type ChangeFilterType = 'All' | 'Active' | 'Completed'

type TodolistType = {
  id: string
  title: string
  filter: ChangeFilterType
}
export type  TasksStateType = {
  [key: string]: TasksType[]
}

function App() {
  let tLID_1 = v1()
  let tLID_2 = v1()

  let [todos, setTodos] = useState<Array<TodolistType>>([
    {id: tLID_1, title: 'Что учить?', filter: 'All'},
    {id: tLID_2, title: 'Что купить?', filter: 'All'},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
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
  const removeTodo = (tLID: string) => {
    setTodos(todos.filter(td => td.id !== tLID))
    delete tasks[tLID]
    setTasks({...tasks})
  }
  const changeFilter = (tdLID: string, value: ChangeFilterType) => {
    todos.find((td) => td.id === tdLID ? td.filter = value : '')
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
  const addInputForm = (title: string) => {
    let newTodo: TodolistType = {id: v1(), title, filter: 'All'}
    setTodos([newTodo, ...todos])
    setTasks({
      ...tasks,
      [newTodo.id]: []
    })
  }
  const changeTaskTitle = (taskID: string, tLID: string, newTitle: string) => {
    let tasksTodolist = tasks[tLID]
    let newStatusTask = tasksTodolist.find(t => t.id === taskID)
    if (newStatusTask) {
      newStatusTask.title = newTitle
    }
    setTasks({...tasks})
  }
  const changeTodoTitle = (tLID: string, newTitle: string) => {
    let itemForChange = todos.find(tl => tl.id === tLID)
    if (itemForChange){
      itemForChange.title = newTitle
    }
    setTodos([...todos])
  }

  return (
    <div className="App">
      <UniversalInput addInputForm={addInputForm}/>

      {todos.map((td) => {
        let filteredTasks = tasks[td.id]
        let tasksForTodolist = filteredTasks

        if (td.filter === 'Active') {
          tasksForTodolist = filteredTasks.filter((t) => !t.isDone)
        }
        if (td.filter === 'Completed') {
          tasksForTodolist = filteredTasks.filter((t) => t.isDone)
        }
        return <>
          <Todolist key={td.id}
                    id={td.id}
                    title={td.title}
                    filter={td.filter}
                    tasks={tasksForTodolist}
                    removeTasks={removeTasks}
                    removeTodo={removeTodo}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    statusCheckbox={changeStatusCheckbox}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoTitle={changeTodoTitle}
          />
        </>
      })}

    </div>
  );
}

export default App;
