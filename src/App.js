import React from 'react';
import './App.scss';
import Nav from './components/Nav';
import DaysLables from './components/DaysLabels';

function App() {
  return (
    <div className="calendar">
      <Nav />
      <DaysLables />
    </div>
  );
}

export default App;
