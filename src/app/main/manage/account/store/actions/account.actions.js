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

export function saveAccount(data, cb) {
    return function (dispatch) {
        accountService.saveAccount(data)
            .then(response => {
                    dispatch({
                        type: Actions.SAVE_ACCOUNT_SUCCESS,
                        payload: response.status
                    });

                    return cb(true);
                }
            )
            .catch(error => {
                dispatch({
                    type: Actions.SAVE_ACCOUNT_ERROR,
                    payload: error
                });

                return cb(false);
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

export function getAccountByCompanyId(companyId) {
    return function (dispatch) {
        accountService.getAccountByCompanyId(companyId)
            .then(response => {
                    return dispatch({
                        type: Actions.GET_ACCOUNT_BY_COMPANY_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.GET_ACCOUNT_BY_COMPANY_ERROR,
                    payload: error
                });
            });
    }
}
