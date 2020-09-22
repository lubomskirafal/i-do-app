import React from 'react';
import Button from './Button';

const Nav = (props)=> {
    
    //render nav bar
    const classes = {
        //css classes
        navigation: 'navigation',
        selectMonth: 'select select--month',
        selectYear: 'select select--year',
        buttonAddTask: 'button button--add-task',
        selectButton :'select select__button',
        displayMonth: 'select__display-span select__display-span--month',
        displayYear: 'select__display-span select__display-span--year',
        buttonPrev: 'button button--prev',
        buttonNext : 'button button--next',
        buttonToday: 'button button--today'
    };

    const {
            navigation,
            selectMonth, 
            selectYear,
            buttonAddTask,
            selectButton,
            displayMonth,
            displayYear,
            buttonPrev,
            buttonNext,
            buttonToday
        } = classes;

    const {month, year, setMonthIndex, setYear, handleNewTaskModal, goToday} = props;

    return(

        <nav className={navigation}>

            <div className={selectMonth}>
                
                <Button 
                    classes={buttonPrev}
                    handleClick={setMonthIndex}
                />

                <span className={displayMonth}>{month}</span>

                <Button 
                    classes={buttonNext}
                    handleClick={setMonthIndex}
                />

            </div>

            <div className={selectYear}>

                <Button
                    classes={buttonPrev}
                    handleClick={setYear}
                />

                <span className={displayYear}>{year}</span>

                <Button 
                    classes={buttonNext}
                    handleClick={setYear}
                />

            </div>

            <div className={selectButton}>

                <Button 
                    classes={buttonToday}
                    content={'Today'}
                    handleClick={goToday}
                />

                <Button 
                    classes={buttonAddTask}
                    spanClassName={'fas fa-edit'}
                    handleClick={handleNewTaskModal}
                />

            </div>

        </nav>

    );
};

export default Nav;