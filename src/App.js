import React from 'react';
import './App.scss';
import Nav from './components/Nav';
import DaysLables from './components/DaysLabels';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month:'',
      year: new Date().getFullYear(),
      monthIndex: new Date().getMonth(),
    };

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  };

  selectMonth = ()=> {
    this.setState({month: this.months[this.state.monthIndex]})
  };

  setMonthIndex = (e)=> {
    let index = this.state.monthIndex;
    if(e.target.classList.contains('button--prev')) {
      index--;
      if(index<0) index = 11;
    };
    
    if(e.target.classList.contains('button--next')) {
      index++;
      if(index>11) index = 0;
    };

    return this.setState(prevState=>({
      monthIndex: prevState.monthIndex = index,
      month: this.months[this.state.monthIndex]
    }));
  };

  setYear = (e)=> {
    let index = this.state.year;
    if(e.target.classList.contains('button--prev')) index--;
    
    if(e.target.classList.contains('button--next')) index++;

    return this.setState(prevState=>({
      year: prevState.year = index
    }));
  };

  componentDidMount() {
    this.selectMonth();
  }

  render (){
    
    return (
      <div className="calendar">
        <Nav 
          month={this.state.month}
          year={this.state.year}
          setMonthIndex={this.setMonthIndex}
          setYear={this.setYear}
        />
        <DaysLables />
      </div>
    );
  }
}

export default App;
