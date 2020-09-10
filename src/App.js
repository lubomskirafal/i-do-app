import React from 'react';
import './App.scss';
import Nav from './components/Nav';
import DaysLables from './components/DaysLabels';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month:'',
      year:'',
      monthIndex: new Date().getMonth(),
    };

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  };

  selectMonth = ()=> {
    this.setState({month: this.months[this.state.monthIndex]})
  };

  setIndex = (e)=> {
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

  componentDidMount() {
    this.selectMonth();
  }

  render (){
    
    return (
      <div className="calendar">
        <Nav 
          month={this.state.month}
          year={this.state.year}
          setIndex={this.setIndex}
        />
        <DaysLables />
      </div>
    );
  }
}

export default App;
