import React, { useEffect, useState } from 'react';
import '../../Styles/style.Tracker.css';
import List from './List';

function Tracker() {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        if (!localStorage.getItem('phone'))window.location = '/';
        const newData = {
            expenses: [{
                _id: 'asdfkhlasdkfjlh',
                description: 'this is item description 1',
                cost: 100,
            },
            {
                _id: 'qwerqwerfs',
                description: 'this is item description 2',
                cost: 100,
            },
            {
                _id: 'qwe23werqwerfs',
                description: 'this is item description 3',
                cost: 100,
            }],
            incomes: [{
                _id: 'werdsafasdf',
                description: 'this is item description',
                cost: 100,
            }],
            availableBalance: 0.00,
        };
        setData(newData);
        setLoading(false);
    }, []);

    const handleChange = ({ target }) => {
        if (target.name === 'description')setDescription(target.value);
        if (target.name === 'cost')setCost(target.value);
    };

    const handleClick = (btnName) => {
        console.log(btnName);
    };

    const handleDelete = (index, listName = false) => {
        const newData = { ...data };
        newData[listName] = [...newData[listName]];
        newData[listName].splice(index, 1);
        setData(newData);
    };

    if (loading) return null;
    return (
        <div className="tracker-container">
            <h1>Expense Tracker</h1>
            <div className="inputs">
                <input type="text" name="description" placeholder="Item Description" value={description} onChange={handleChange} />
                <input type="number" name="cost" placeholder="Expense/Income" value={cost} onChange={handleChange} />
                <button type="button" onClick={() => handleClick('expenseBtn')}>Expense</button>
                <button type="button" onClick={() => handleClick('incomeBtn')}>Income</button>
            </div>
            <p>{`Available Balance: ${data.availableBalance}`}</p>
            <div className="expense-income-container">
                <List title="Expenses" list={data.expenses} onClick={handleDelete} listName="expenses" />
                <List title="Incomes" list={data.incomes} onClick={handleDelete} listName="incomes" />
            </div>
        </div>
    );
}

export default Tracker;
