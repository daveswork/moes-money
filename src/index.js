import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Home from './components/Home';
import Summary from './components/Summary';
import IncomeList from './components/IncomeList';
import ExpenseList from './components/ExpenseList';

import ErrorPage from './components/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:
    <ErrorPage/>,
    children: [
      {
        path:"/home",
        element:<Home />
      },
      {
        path:"/summary",
        element: <Summary />
      },
      {
        path: "/expenselist",
        element: <ExpenseList/>
      },
      {
        path: "/incomelist",
        element: <IncomeList />
      }


    ]
  },

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
