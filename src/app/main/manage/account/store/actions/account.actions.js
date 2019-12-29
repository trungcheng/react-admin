import accountService from 'app/services/accountService';
import * as Actions from 'app/store/actions';

export function fetchAccounts() {
    return function (dispatch) {
        dispatch({ 
            type: Actions.FETCH_ACCOUNTS_REQUEST
        });
        accountService.fetchAccounts()
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_ACCOUNTS_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_ACCOUNTS_ERROR,
                    payload: error
                });
            });
    }
}

export function fetchDetail(accountId) {
    return function (dispatch) {
        accountService.fetchDetail(accountId)
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_ACCOUNT_DETAIL_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_ACCOUNT_DETAIL_ERROR,
                    payload: error
                });
            });
    }
}
