import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import reportWebVitals from './reportWebVitals';
import { CustomizedTables } from './components/TableView';
import Navbar from './components/navbar/Navbar';
import { StyledTree } from './components/TreeLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="bar" element={<BarChart />} />
          <Route path="pie" element={<PieChart />} />
          <Route path="table" element={<CustomizedTables />} />
          <Route path="tree" element={<StyledTree focus="1"/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
