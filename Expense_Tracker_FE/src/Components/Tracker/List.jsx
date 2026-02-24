import React from 'react';
import propTypes from 'prop-types';
import { getRandomString } from '../../utils/utilities';

function List({
    title, list, onClick, listName,
}) {
    let totalCost = 0;
    return (
        <div>
            <h3>{title}</h3>
            {list.map((item, index) => {
                totalCost += item.cost * 1;
                return (
                    <div key={getRandomString(20)} className="list">
                        <p>{`${index + 1}.`}</p>
                        <p>{item.description}</p>
                        <p>{item.cost}</p>
                        <button type="button" onClick={() => onClick(index, listName)}>X</button>
                    </div>
                );
            })}
            {list?.length > 0 && <div className="list">
                <p>Total</p>
                <p />
                <p id="total">{totalCost}</p>
            </div>}
        </div>
    );
}

List.propTypes = {
    title: propTypes.string.isRequired,
    list: propTypes.array.isRequired,
    listName: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired,
};

export default List;
