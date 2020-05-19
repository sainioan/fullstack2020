import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const persons = [
  {
 
    name: 'Arto Hellas',
    number: '1234 556',
 
  }
]
ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)

