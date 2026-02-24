import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/style.Tracker.css';
import List from './List';
import Loading from '../Loading';
import tracker from '../../services/trackerService';
import TrackerInputs from './TrackerInputs';

function Tracker() {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await tracker.fetchData();
        if (res.data) {
            setData(res.data);
            setLoading(false);
        } else {
            console.log(res.error);
            setError(res.error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('phone')) navigate('/not-found');
        else fetchData();
    }, []);

    const handleChange = ({ target }) => {
        if (error) setError('');
        if (target.name === 'description') setDescription(target.value);
        if (target.name === 'cost') setCost(target.value);
    };

    const handleClick = async (operation) => {
        const states = { data, description, cost };
        const res = await tracker.postRequest(description, cost, operation, states);
        if (res.error) setError(res.error);
        else {
            setData(res.data);
            setDescription('');
            setCost('');
        }
    };

    const handleDelete = async (index, listName = false) => {
        await tracker.deleteEntry(index, listName, data, setData);
    };

    if (loading) return <Loading />;
    return (
        <div className="tracker-container">
            <h1>Expense Tracker</h1>

            <div className="balance-card">
                <h2>Available Balance</h2>
                <span className={`balance-amount ${data.availableBalance >= 0 ? 'positive' : 'negative'}`}>
                    {Number(data.availableBalance).toFixed(2)}
                </span>
            </div>

            <TrackerInputs
                description={description}
                cost={cost}
                handleChange={handleChange}
                handleClick={handleClick}
            />
            {error && <div className="error-div">{error}</div>}
            <div className="expense-income-container">
                <List title="Incomes" list={data.incomes} onClick={handleDelete} listName="incomes" />
                <List title="Expenses" list={data.expenses} onClick={handleDelete} listName="expenses" />
            </div>
        </div>
    );
}

export default Tracker;
