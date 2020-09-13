import React from 'react';
import './App.scss';
import Nav from './components/Nav';
import DaysLables from './components/DaysLabels';
import Day from './components/Day';
import NewTask from './components/NewTask';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: '',
      month:'',
      year: new Date().getFullYear(),
      monthIndex: new Date().getMonth(),
      newTask: false
    };

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.days = [];
  };

  getDate = (prev)=> { 
    //get date object of selected date range
    const date = new Date(this.state.year, prev?this.state.monthIndex:this.state.monthIndex+1,0);
    return date;
  };

  getPrevMonthDays = ()=> {
    //create "blank" previous month days
    for(let i=0; i<=this.getDate('prev').getDay(); i++) {
      const day = {
        date: `blanc-${i+1}`,
        tasks:{},
        classes:'blanc'
      };
      this.days.push(day);
    }
  };

  isToday = (date)=>{
    //check when is today date
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    if (
      todayDay===date&&
      todayMonth===this.state.monthIndex&&
      todayYear===this.state.year
      ) return  true;
      return false;
  };

  getDays = ()=> {
    //create day object acording days in month
    this.days = [];
    this.getPrevMonthDays();
    let hollyday, date;
    
    for (let i=0; i<this.getDate().getDate(); i++) {
      date = i+1; 
      const isSunnday = new Date(this.state.year,this.state.monthIndex, date).getDay();
      isSunnday===0? hollyday=true:hollyday=false;
      const day = {
        date: date,
        tasks:{},
        classes:'day',
        hollyday: hollyday,
        today:this.isToday(date)
      };
      this.days.push(day);
      
    };
  };

  selectMonth = ()=> {
    //set month on load
    this.setState({
      month: this.months[this.state.monthIndex],
      days: this.getDays()
    });
  };

  setMonthIndex = (e)=> {
    //set month on btn click
    let index = this.state.monthIndex;
    //go to prev date
    if(e.target.classList.contains('button--prev')) {
      index--;
      if(index<0) {
        index = 11;
        this.setState(prevState=>({
          year: prevState.year -1,
        }));
      };
    };
    //go to next date
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
    //change year on btn click
    let index = this.state.year;
    //got to prev year
    if(e.target.classList.contains('button--prev')) index--;
    //got to nex year
    if(e.target.classList.contains('button--next')) index++;

    this.setState(prevState=>({
      monthIndex: prevState.monthIndex,
      year: prevState.year = index,
      days: this.getDays()
    }));
    
  };

  handleNewTaskModal = (e)=> {
    //open "add new task" modal
    this.setState(prevState=>({
      newTask: !prevState.newTask
    }));
  };

  componentDidMount() {
    //init date
    this.selectMonth();
  };

  render (){
    const {newTask} = this.state;

    const days = this.days.map(day=> {

      const {date, task, classes, hollyday, today} = day;
      let styles;
      //define day css
      if(!hollyday) styles = classes;
      if(hollyday) styles = `${classes} sunday`;
      if(today) styles = `${styles} today`;
      if(today&&hollyday) styles = `${styles} todayIsSunday`;
      
      return (
        //return array of days to render include html structure
        <Day 
          key={date}
          task={task}
          date={date}
          classes={styles}
          hollyday={hollyday}
        />
      );
    });
    
    return (
      //render main component
      <div className="calendar">
        <Nav 
          //navigation component
          month={this.state.month}
          year={this.state.year}
          setMonthIndex={this.setMonthIndex}
          setYear={this.setYear}
          handleNewTaskModal={this.handleNewTaskModal}
        />
        
        <div
          //main calendar component
          className={"day__box"}
          >
            <DaysLables 
              //calendar days name component
            />
            {days} 
          </div>
          {newTask&&<NewTask handleNewTaskModal={this.handleNewTaskModal} />}
      </div>
    );
  };
};

export default App;
