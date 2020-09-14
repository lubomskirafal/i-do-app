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
      newTask: false,
      newTaskDate: this.getTodayDate().date,
      newTaskCategory: 'category',
      newTaskPriority: false,
      newTaskTitle: '',
      newTaskContent: '',
      tasks:'',
      error: {
        title: false,
        content: false
      },
    };

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.days = [];
    this.tasks = [];
  };

  getTodayDate = (y, m, d)=> {
    //set default date to date input state
    let today;
    if(y&&m&&d) {
      today = new Date(y, m, d)
    }else {
      today = new Date();
    };
    
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = `${year}-${month+1<10?"0"+(month+1):(month+1)}-${day<10?"0"+day:day}`;
    return ({
      day, month, year, date
    });
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
        date: `blank-${i+1}`,
        tasks:{},
        classes:'blank'
      };
      this.days.push(day);
    }
  };

  isToday = (date)=>{
    //check when is today date
    if (
      this.getTodayDate().day===date&&
      this.getTodayDate().month===this.state.monthIndex&&
      this.getTodayDate().year===this.state.year
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
        id: this.getTodayDate(this.state.year,this.state.monthIndex, date, date).date,
        date: date,
        tasks: [],
        classes:'day',
        hollyday: hollyday,
        today:this.isToday(date)
      };
      console.log(day.id)
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

  isValid = (isTitle, isContent)=> {
    
    let title, content;

    if(isTitle === '' ) {
      title = true;
    }else {
      title = false;
    };

    if(isContent === '') {
      content = true;
    }else {
      content = false;
    }

    const noValid = {
      title, content
    };

    this.setState({
      error: {
        title: noValid.title,
        content: noValid.content
      }
    });
    
    if(noValid.title || noValid.content) return false;
    return true;
  };

  handleAddNewTask = (e)=> {
    //create new task object fom form inputs in state, and add to render array

    e.preventDefault();
    const {newTaskDate, newTaskCategory, newTaskPriority, newTaskTitle, newTaskContent} = this.state;

    if(!this.isValid(newTaskTitle, newTaskContent)) return;
    
    const task = {
      id: {
        date: newTaskDate,
        title: newTaskTitle
      },
      date: newTaskDate,
      category: newTaskCategory,
      priority: newTaskPriority,
      title: newTaskTitle,
      content: newTaskContent
    };

    this.tasks.push(task);

    this.days.forEach(day=>{
      
      if(day.id === task.id.date) {
        day.tasks.push(task);
        day.classes = `${day.classes} day__tasked`;
      };
    });

    this.setState({tasks: this.tasks});
    this.handleNewTaskModal();
  };

  handleFormChange = (value, name)=> {
    //handle changes in add new task form
    this.setState({
      [name]: value
    });
  };

  

  componentDidMount() {
    //init date
    this.selectMonth();
  };

  //render main component

  render (){
    
    const {
      month, 
      year, 
      newTaskDate, 
      newTaskCategory, 
      newTaskPriority,
      newTaskTitle,
      newTaskContent,
      error
    } = this.state;

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
          month={month}
          year={year}
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
          {this.state.newTask&&<NewTask 
            handleNewTaskModal={this.handleNewTaskModal} 
            handleAddNewTask={this.handleAddNewTask}
            handleFormChange={this.handleFormChange}
            handleError={this.handleError}
            newTaskDate={newTaskDate}
            newTaskCategory={newTaskCategory}
            newTaskPriority={newTaskPriority}
            newTaskTitle={newTaskTitle}
            newTaskContent={newTaskContent}
            noTaskTitle={error.title}
            noTaskContent={error.content}
          />}
      </div>
    );
  };
};

export default App;
