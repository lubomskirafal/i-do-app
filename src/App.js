import React from 'react';
import './App.scss';
import Nav from './components/Nav';
import DaysLables from './components/DaysLabels';
import Day from './components/Day';
import NewTask from './components/NewTask';
import Tasks from './components/Tasks';
import FullTask from './components/FullTask';
import {exportTasks, importTasks} from './components/fethTasks';
import isValid from './components/isValid';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      days: [],// days object created according to days in month;
      month:'', //month name;
      year: new Date().getFullYear(),
      monthIndex: new Date().getMonth(),
      newTask: false,//determ if add new task modal is on;
      newTaskDate: this.getTodayDate().date,// date input default content;
      newTaskPriority: false,//determ tasks css classes;
      newTaskClassList: 'dayTasks__list-item', // dafault task css class list;
      newTaskTitle: '',// new task modal title input value;
      newTaskContent: '', //new task modal content textarea value;
      tasks: importTasks(), // import task list from local storage;
      isDayTasks: false,// determ css for day if contain task
      prevEventTarget: '',//handle display proper task by click;
      prevFullTask:'',//handle display proper task by click;
      dayTasks: [], //tasks assigned to each day;
      isFullTask: false,//determ if full task msg is displayed;
      fullTask: null,//pass task object to display full msg;
      editedTask: null,// pass task if its for edition;
      //handle error msg
      error: {
        title: false,
        content: false
      },

    };

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  };


  // handle dates and determ days amount to create rendered days objects
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

  getPrevMonthDays = (days)=> {
    //create "blank" previous month days
    
    for(let i=0; i<=this.getDate('prev').getDay(); i++) {

      const day = {
        date: `blank-${i+1}`,
        tasks:{},
        classes:'blank'
      };

      days.push(day);

    };

    return days;
  };

  isToday = (date)=>{

    //check when is today date
    if (
      this.getTodayDate().day === date &&
      this.getTodayDate().month === this.state.monthIndex &&
      this.getTodayDate().year === this.state.year
      ) return  true;

      return false;

  };

  getID = (y, m, d)=> {
    //set date like formated id for days, and tasks;
    const  today = new Date(y, m, d);
    
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = `${year}-${month<10?"0"+(month):(month)}-${day<10?"0"+day:day}`;
    
    return  date;
  };

  getDays = ()=> {
    //create day object acording days in month
    const days = [];
    this.getPrevMonthDays(days);
    let hollyday, date;
    
    for (let i=0; i<this.getDate().getDate(); i++) {
      date = i+1; 
      const ID = this.getID(this.state.year,this.state.monthIndex, date);
      const isSunnday = new Date(this.state.year,this.state.monthIndex, date).getDay();
      isSunnday===0? hollyday=true:hollyday=false;
      
      const day = {
        id: ID,
        date: date,
        tasks: this.isTask(ID),
        classes:'day',
        hollyday: hollyday,
        today:this.isToday(date)
      };
      days.push(day);
    };
    return days
  };


  //handle date selection
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
      month: prevState.month = this.months[prevState.monthIndex]
    }),()=>{this.setState({days: this.getDays()})});

  };

  goToday = ()=> {
    // on click return to present month
    const index = new Date().getMonth();
    const month = this.months[index];
    const year = new Date().getFullYear();

    this.setState({

      monthIndex: index,
      month: month,
      year: year,
      isFullTask: false,
      isDayTasks:false
    },()=>{
      this.setState({
        days: this.getDays()
      });

    });
    
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

  //handle tasks
  isTask = (ID)=> {
    //determ if each day contain tasks
    const tasks = [];

    this.state.tasks.forEach(task=> {

      if(task.id.date === ID) tasks.push(task);

    });

    return tasks;

  };

  editTask = ()=> {
    //fil add new task width edited task content
    const tasks = this.state.tasks;
    const {title, date, content, priority, classList} = this.state.editedTask;

    this.setState({
      newTaskTitle: title,
      newTaskDate: date,
      newTaskContent: content,
      newTaskClassList: classList,
      newTaskPriority: priority,
      tasks: tasks
    });

  }

  handleNewTaskModal = (e, task = null)=> {
    //open "add new task" modal
    if(task) {
      this.setState({
        editedTask: task
      }, ()=> this.editTask());
    };

    this.setState(prevState=>({
      newTask: !prevState.newTask
    }));

  };

  handleAddNewTask = (e)=> {
    //create new task object fom form inputs in state, and add to render array
  
    e.preventDefault();

    const {newTaskDate, newTaskPriority, newTaskTitle, newTaskContent, newTaskClassList, editedTask} = this.state;
    const tasks = this.state.tasks;

    if(editedTask) {
      //if editing task find old task in array and replace with new one
      tasks.forEach(task=> {

        if(task.id === editedTask.id) {
          let index = tasks.indexOf(task);
          tasks.splice(index,1);
        };
  
      });
    };
    
    //add new task
    if(!isValid(newTaskTitle, newTaskContent, this)) return;

    const task = {
      id: {
        date: newTaskDate,
        title: newTaskTitle
      },
      date: newTaskDate,
      priority: newTaskPriority,
      title: newTaskTitle,
      classList: newTaskClassList,
      content: newTaskContent,
      done:false
    };

    tasks.push(task);

    this.setState({
      // reset form inputs
      fullTask: task,
      tasks: tasks,
      newTaskPriority: false,
      newTaskTitle: '',
      newTaskContent: '',
      newTaskClassList: 'dayTasks__list-item',
      newTaskDate: this.getTodayDate().date
    },()=> {
      this.selectMonth();//re render to mark days with tasks
      this.handleNewTaskModal();// close "add new task" modal
      this.getDays();
      exportTasks(this.state.tasks);
      this.showDayTaskList();
    });
    
  };

  handleFormChange = (value, name)=> {
    //handle changes in add new task form
    this.setState({
      [name]: value
    });
  };

  showDayTaskList = (e, dayTasks)=> {
    //display task list for each day on click it

    if(!e) {
      //if call on add new ewent
        const tasks = this.isTask(this.state.prevEventTarget);
        return this.setState({
          dayTasks: tasks
        });
    };
  
    //if call by day click
    if(dayTasks.length<1 && this.state.isDayTasks) return this.setState({
      isDayTasks: false
    });

    if(dayTasks.length<1) return;

    const prevEventTarget = this.state.prevEventTarget;
    const eventTarget = e.target.id;
    
    if(prevEventTarget!==eventTarget) {
      this.setState({
        isDayTasks: true,
        dayTasks: dayTasks,
        prevEventTarget: eventTarget
      });
    }else if(prevEventTarget===eventTarget) {
      this.setState(prevState=>({
        isDayTasks: !prevState.isDayTasks,
        dayTasks: dayTasks,
        prevEventTarget: eventTarget
      }));
    };
  };

  showFullTask = (e,task) => {
    //display full task msg, and determ with task was clicked
    if(this.state.prevFullTask !== task) {

      this.setState(prevState=>({
        isFullTask: true,
        fullTask: task,
        prevFullTask: task
      }));

    }else {

      this.setState(prevState=>({
        isFullTask: !prevState.isFullTask,
        fullTask: task,
        prevFullTask: task
      }));

    };
    
  };

  setTaskAsDone = (e, id) => {
    e.stopPropagation();

    const tasks = this.state.tasks;

    tasks.forEach(task=>{

      if(task.id === id){

        task.done = !task.done

      };

    });

    this.setState({
      tasks: tasks
    },()=> {

      exportTasks(this.state.tasks); //export re writed task to local storage;
      this.showDayTaskList();//render task list;

    });
    
  };

  removeTask = (e, id) => {
    e.stopPropagation();

    const tasks = this.state.tasks;

    tasks.forEach(task=> {

      if(task.id === id) {
        let index = tasks.indexOf(task);
        tasks.splice(index,1);
      };

    });

    this.setState({

      tasks: tasks,
      isFullTask: false

    },()=>{

      exportTasks(); //export re writed task to local storage
      this.showDayTaskList();//render task list

      this.setState({
        days: this.getDays()
      });
    });

  };

  chceckIfResize = ()=> {

    //reset display view to default
    window.addEventListener('resize', ()=> {
      this.setState({
        newTask: false,
        isFullTask: false
      });

    });

  };

  componentDidMount() {
    //init calendar. month init days
    
    this.selectMonth();
    importTasks(); //import tasks from local storage

    this.chceckIfResize(); //reset display view to default
  
  };

  //render main component

  render (){
    
    const {
      month, 
      year,
      newTask, 
      newTaskDate, 
      newTaskCategory, 
      newTaskPriority,
      newTaskTitle,
      newTaskContent,
      isDayTasks,
      dayTasks,
      tasks,
      isFullTask,
      fullTask,
      error
    } = this.state;
    
    const days = this.state.days.map(day=> {

      //return array of days to render include html structure
      const {date, tasks, classes, hollyday, today, id} = day;
      let styles;
      //define day css
      if(!hollyday) styles = classes;
      if(hollyday) styles = `${classes} sunday`;
      if(today) styles = `${styles} today`;
      if(today&&hollyday) styles = `${styles} todayIsSunday`;
      if(tasks.length>0) styles = `${styles} day__isTask`;
      
      return (

        <Day 
          key={date}
          id={id}
          tasks={tasks}
          date={date}
          classes={styles}
          hollyday={hollyday}
          handleClick={this.showDayTaskList}
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
            goToday={this.goToday}
          />
          
          <main className="calendar__wrapper">

            {!isFullTask && <div
              //main calendar component
              className={"day__box"}
                >
                <DaysLables />
                {days}
              </div>
             }
            
            { 
                isFullTask && 
                <FullTask 
                  task={fullTask} 
                  setTaskAsDone={this.setTaskAsDone}
                  removeTask={this.removeTask}
                  handleEditTask={this.handleNewTaskModal}
                />
              }

            <div className={'dayTasks'}>

              {isDayTasks && <Tasks
                  tasks={dayTasks}
                  handleClick={this.showFullTask}
                  setTaskAsDone={this.setTaskAsDone}
                  removeTask={this.removeTask}
                />}
                
              { !isDayTasks && <Tasks
                  tasks={tasks}
                  handleClick={this.showFullTask}
                  setTaskAsDone={this.setTaskAsDone}
                  removeTask={this.removeTask}
                />}

            </div>
          </main>

          {newTask&&<NewTask 
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
