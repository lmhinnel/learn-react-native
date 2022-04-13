export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASK_ID';

const API_URL = 'https://mocki.io/v1/f7fc68a1-9b67-4f54-8976-925755e19fda';
// const API_URL = 'https://mocki.io/v1/aac8b81a-139c-4235-82e6-0dbadf33f2b7';

export const getCities = () => {
    try {
        return async (dispatch) => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: GET_CITIES,
                    payload: json,
                })
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const setName = (name) => (dispatch) => {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    });
};

export const setAge = (age) => (dispatch) => {

}

export const setTasks = (tasks) => (dispatch) => {
    dispatch({
        type: SET_TASKS,
        payload: tasks,
    });
};

export const setTaskID = (taskID) => (dispatch) => {
    dispatch({
        type: SET_TASK_ID,
        payload: taskID,
    });
};