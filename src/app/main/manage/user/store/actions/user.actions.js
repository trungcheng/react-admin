import userService from 'app/services/userService';
import * as Actions from 'app/store/actions';

export function fetchUsers() {
    return function (dispatch) {
        dispatch({ 
            type: Actions.FETCH_USERS_REQUEST
        });
        userService.fetchUsers()
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_USERS_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_USERS_ERROR,
                    payload: error
                });
            });
    }
}

export function saveUser(data, cb) {
    return function (dispatch) {
        userService.saveUser(data)
            .then(response => {
                    dispatch({
                        type: Actions.SAVE_USER_SUCCESS,
                        payload: response.status
                    });

                    return cb(true);
                }
            )
            .catch(error => {
                dispatch({
                    type: Actions.SAVE_USER_ERROR,
                    payload: error
                });

                return cb(false);
            });
    }
}

export function fetchDetail(userId) {
    return function (dispatch) {
        userService.fetchDetail(userId)
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_USER_DETAIL_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_USER_DETAIL_ERROR,
                    payload: error
                });
            });
    }
}
