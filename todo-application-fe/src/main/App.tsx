import React from 'react';
import { useParams } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeView from './layout/view/homeView/HomeView';
import AddTaskView from './layout/view/addTaskView/AddTaskView';

function App() {

  
  const { task } = useParams();
  
  return (
    <div className="App">
      {<BrowserRouter>
        <Routes >
          <Route path="/" element={<HomeView />}></Route>
          <Route path="/add" element={<AddTaskView />}></Route>
          <Route path="/edit/:id"  element={<AddTaskView/>}></Route>
        </Routes>

      </BrowserRouter>}
    </div>
  );
}

export default App;
