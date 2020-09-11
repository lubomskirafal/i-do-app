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

  getDate = (prev)=> { 
    const date = new Date(this.state.year, prev?this.state.monthIndex:this.state.monthIndex+1,0);
    return date;
  };

  getPrevMonthDays = ()=> {
    for(let i=0; i<=this.getDate('prev').getDay(); i++) {
      const day = {
        date: `blanc-${i+1}`,
        tasks:{},
        classes:'blanc'
      };
      this.days.push(day);
    }
  };

  getDays = ()=> {
    this.days = [];
    this.getPrevMonthDays();
    let hollyday = false;
    let date;
    for (let i=0; i<this.getDate().getDate(); i++) {
      date = i+1; 
      const isSunnday = new Date(this.state.year,this.state.monthIndex, date).getDay();
      if(isSunnday === 0) hollyday = true;
      if(isSunnday !== 0) hollyday = false;
      const day = {
        date: date,
        tasks:{},
        classes:'day',
        hollyday: hollyday
      };
      this.days.push(day);
    };
  };

  selectMonth = ()=> {
    this.setState({
      month: this.months[this.state.monthIndex],
      days: this.getDays()
    });
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
    
    this.setState(prevState=>({
      monthIndex: prevState.monthIndex = index,
      month: prevState.month = this.months[prevState.monthIndex],
      days: this.getDays()
    }));
  };

  setYear = (e)=> {
    let index = this.state.year;
    if(e.target.classList.contains('button--prev')) index--;
    
    if(e.target.classList.contains('button--next')) index++;

    this.setState(prevState=>({
      monthIndex: prevState.monthIndex,
      year: prevState.year = index,
      days: this.getDays()
    }));
    
  };

  componentDidMount() {
    this.selectMonth();
  };

  render (){
    const days = this.days.map(day=> {
      const {date, task, classes, hollyday} = day;
      return (
        <Day 
          key={date}
          task={task}
          date={date}
          classes={hollyday?`${classes} sunday`: classes}
        />
      );
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
  };
};

export default App;
