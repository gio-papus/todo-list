import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoApp from '../components/TodoApp'
import Signup from '../components/signup/Signup'

function Router() {
  return (
    <BrowserRouter>
                <Routes>
                 
                          
                          
                        
                    <Route path='/' element={<Signup />} />
                 
                    <Route path='/todolist' element={<TodoApp/>} />


                </Routes>
            </BrowserRouter>
  )
}

export default Router