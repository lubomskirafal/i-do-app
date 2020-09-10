import React from 'react';
import './App.scss';
import Nav from './components/Nav';
import DaysLables from './components/DaysLabels';
import Day from './components/Day';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month:'',
      year: new Date().getFullYear(),
      monthIndex: new Date().getMonth()
    };

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.days = [];
  };

  getDate = ()=> {
    return new Date(this.state.year, this.state.monthIndex,0);
  };

  getDays = ()=> {
    this.days = [];
    for (let i=0; i<this.getDate().getDate(); i++) {
      const day = {
        date: i+1,
        tasks:{}
      };
      this.days.push(day);
    };
  };

  selectMonth = ()=> {
    this.setState({month: this.months[this.state.monthIndex]})
  };

  setMonthIndex = (e)=> {
    let index = this.state.monthIndex;
    if(e.target.classList.contains('button--prev')) {
      index--;
      if(index<0) {
        index = 11;
        this.setState(prevState=>({
          year: prevState.year -1,
        }));
      };
    };
    
    if(e.target.classList.contains('button--next')) {
      index++;
      if(index>11) {
        index = 0;
        this.setState(prevState=>({
          year: prevState.year + 1
        }));
      };
    };

    return this.setState(prevState=>({
      monthIndex: prevState.monthIndex = index,
      month: this.months[prevState.monthIndex]
    }), this.getDays());
  };

  setYear = (e)=> {
    let index = this.state.year;
    if(e.target.classList.contains('button--prev')) index--;
    
    if(e.target.classList.contains('button--next')) index++;

    return this.setState(prevState=>({
      year: prevState.year = index
    }), this.getDays());
  };

  componentDidMount() {
    this.selectMonth();
    this.getDays();
  }

  render (){
    const days = this.days.map(day=> {
      const {date, task} = day;
      return (
        <Day 
          key={date}
          task={task}
          date={date}
        />
      )
    });

    return (
      <div className="calendar">
        <Nav 
          month={this.state.month}
          year={this.state.year}
          setMonthIndex={this.setMonthIndex}
          setYear={this.setYear}
        />
        
        <div
          className={"day__box"}
          >
            <DaysLables />
            {days}
          </div>
      </div>
    );
  }
}

export default App;
