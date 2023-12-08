import http from './httpService';

const fetchData = async () => {
    try {
        const { status, body } = await http.get('/tracker');
        if (status === 200) {
            return { data: body.data };
        }
        console.log(body.error);
        return body.error;
    } catch (err) {
        console.log(err);
        return 'Unexpected error occured!';
    }
};

const deleteEntry = async (index, listName, data, setData) => {
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
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    }
};

const handlePostResponse = (res, operation, states) => {
    const { data, description, cost } = states;
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
        return { data: newData, error: null };
    }
    console.log(res);
    return { error: res.body.error };
};

const postRequest = async (description, cost, operation, states) => {
    try {
        const reqObj = {
            description,
            cost,
            operation,
        };
        const res = await http.post('/tracker', reqObj);
        return handlePostResponse(res, operation, states);
    } catch (err) {
        console.log(err);
        return {
            error: 'Unexpected error occured',
        };
    }
};

const tracker = {
    fetchData,
    deleteEntry,
    postRequest,
};

export default tracker;
