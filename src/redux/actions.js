export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_USER_AGE = 'INCREASE_USER_AGE';
export const GET_CITIES = "GET_CITIES";

// const API_URL = 'https://mocki.io/v1/f7fc68a1-9b67-4f54-8976-925755e19fda';
const API_URL = 'https://mocki.io/v1/aac8b81a-139c-4235-82e6-0dbadf33f2b7';

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