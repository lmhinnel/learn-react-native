export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_USER_AGE = 'INCREASE_USER_AGE';


export const setName = (name) => (dispatch) => {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    });
};

export const setAge = (age) => (dispatch) => {
    dispatch({
        type: SET_USER_AGE,
        payload: age,
    });
};

export const increaseAge = (age) => (dispatch) => {
    dispatch({
        type: INCREASE_USER_AGE,
        payload: age,
    });
};