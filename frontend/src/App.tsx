import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import NoMatch from './pages/NoMatchPage'
import TaskList from './pages/Tasks/TaskList'
import AddTask from './pages/Tasks/AddTask'

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="" element={<TaskList />} />
          <Route path="add-task/" element={<AddTask />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
