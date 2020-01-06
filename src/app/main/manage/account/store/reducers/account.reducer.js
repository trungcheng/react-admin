import * as Actions from 'app/store/actions';

const account = function (state = {}, action) {
    switch (action.type) {
        case Actions.FETCH_ACCOUNTS_REQUEST: 
            return { ...state, isFetching: true };
        case Actions.FETCH_ACCOUNTS_SUCCESS:
            let data = action.payload;
            data = data.map((acc, idx) => {
                return {
                    ...acc,
                    idx: idx + 1
                }
            });

            return { ...state, isFetching: false, list: data };
        case Actions.SAVE_ACCOUNT_SUCCESS:
            return { ...state, success: true };
        case Actions.SAVE_ACCOUNT_ERROR:
            return { ...state, success: false, error: action.payload };
        case Actions.FETCH_ACCOUNT_DETAIL_SUCCESS:
            return { ...state, detail: action.payload };
        case Actions.GET_ACCOUNT_BY_COMPANY_SUCCESS:
            return { ...state, accountList: action.payload }
        default:
            return state;
    }
};

export default account;