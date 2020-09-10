import React from 'react';
import Button from './Button';

const Nav = (props)=> {

    const classes = {
        navigation: 'navigation',
        selectMonth: 'select select--month',
        selectYear: 'select select--year',
        buttonAddTask: 'button button--add-task',
        selectButton :'select select__button',
        displayMonth: 'select__display-span select__display-span--month',
        displayYear: 'select__display-span select__display-span--year',
        buttonPrev: 'button button--prev',
        buttonNext : 'button button--next',
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
        } = classes;

    return(
        <nav className={navigation}>
            <div className={selectMonth}>
                <Button classes={buttonPrev}/>
                <span className={displayMonth}>January</span>
                <Button classes={buttonNext} />
            </div>
            <div className={selectYear}>
                <Button classes={buttonPrev}/>
                <span className={displayYear}>2020</span>
                <Button classes={buttonNext} />
            </div>
            <div className={selectButton}>
                <Button 
                    classes={buttonAddTask}
                    content="Add task" 
                />
            </div>
        </nav>
    )
};

export default Nav;