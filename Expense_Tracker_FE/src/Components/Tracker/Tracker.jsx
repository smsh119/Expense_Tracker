import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/style.Tracker.css';
import List from './List';
import http from '../../services/httpService';
import Loading from '../Loading';

function Tracker() {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('phone')) navigate('/not-found');
        const fetchData = async () => {
            try {
                const { status, body } = await http.get('/tracker');
                if (status === 200) {
                    setData(body.data);
                    setLoading(false);
                } else {
                    console.log(body.error);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleChange = ({ target }) => {
        if (error)setError('');
        if (target.name === 'description')setDescription(target.value);
        if (target.name === 'cost')setCost(target.value);
    };

    const handleClickResponse = (res, operation) => {
        if (res.status === 200) {
            // success work
            const newData = { ...data };
            if (operation === 'income') {
                const list = [...newData.incomes];
                list.push({
                    description,
                    cost,
                });
                newData.incomes = list;
                newData.availableBalance = (newData.availableBalance * 1) + (cost * 1);
            } else if (operation === 'expense') {
                const list = [...newData.expenses];
                list.push({
                    description,
                    cost,
                });
                newData.expenses = list;
                newData.availableBalance = (newData.availableBalance * 1) - (cost * 1);
            } else {
                console.log(operation);
            }
            setData(newData);
            setDescription('');
            setCost('');
        } else {
            console.log(res);
            setError(res.body.error);
        }
    };

    const handleClick = async (operation) => {
        try {
            const reqObj = {
                description,
                cost,
                operation,
            };
            const res = await http.post('/tracker', reqObj);
            handleClickResponse(res, operation);
        } catch (err) {
            console.log(err);
            setError('Unexpected error occured.');
        }
    };

    const handleDelete = async (index, listName = false) => {
        try {
            const newData = { ...data };
            newData[listName] = [...newData[listName]];
            if (listName === 'expenses')newData.availableBalance = (newData.availableBalance * 1) + (newData[listName][index].cost * 1);
            else if (listName === 'incomes')newData.availableBalance = (newData.availableBalance * 1) - (newData[listName][index].cost * 1);
            newData[listName].splice(index, 1);
            setData(newData);
            const operation = listName.slice(0, -1);
            const res = await http.remove(`/tracker?indx=${index}&operation=${operation}`);
            if (res.status === 200) {
            // success
            } else {
                console.log(res.body.error);
                alert(res.body.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <Loading />;
    return (
        <div className="tracker-container">
            <h1>Expense Tracker</h1>
            <div className="inputs">
                <input type="text" name="description" placeholder="Item Description" value={description} onChange={handleChange} />
                <input type="number" name="cost" placeholder="Expense/Income" value={cost} onChange={handleChange} />
                <button type="button" onClick={() => handleClick('expense')}>Expense</button>
                <button type="button" onClick={() => handleClick('income')}>Income</button>
            </div>
            {error && <div className="error-div">{error}</div>}
            <p>{`Available Balance: ${data.availableBalance}`}</p>
            <div className="expense-income-container">
                <List title="Incomes" list={data.incomes} onClick={handleDelete} listName="incomes" />
                <List title="Expenses" list={data.expenses} onClick={handleDelete} listName="expenses" />
            </div>
        </div>
    );
}

export default Tracker;
