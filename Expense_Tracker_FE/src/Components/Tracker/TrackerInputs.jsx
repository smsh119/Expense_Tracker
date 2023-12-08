import React from 'react';
import propTypes from 'prop-types';

function TrackerInputs({
    description, cost, handleClick, handleChange,
}) {
    return (
        <div className="inputs">
            <input type="text" name="description" placeholder="Item Description" value={description} onChange={handleChange} />
            <input type="number" name="cost" placeholder="Expense/Income" value={cost} onChange={handleChange} />
            <button type="button" onClick={() => handleClick('expense')}>Expense</button>
            <button type="button" onClick={() => handleClick('income')}>Income</button>
        </div>
    );
}

TrackerInputs.propTypes = {
    description: propTypes.string.isRequired,
    cost: propTypes.string.isRequired,
    handleClick: propTypes.func.isRequired,
    handleChange: propTypes.func.isRequired,
};

export default TrackerInputs;
