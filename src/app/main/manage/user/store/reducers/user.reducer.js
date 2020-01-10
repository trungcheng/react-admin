import * as Actions from 'app/store/actions';

const user = function (state = {}, action) {
    switch (action.type) {
        case Actions.FETCH_USERS_REQUEST: 
            return { ...state, isFetching: true };
        case Actions.FETCH_USERS_SUCCESS:
            let data = action.payload;
            data = data.map((user, idx) => {
                return {
                    ...user,
                    idx: idx + 1
                }
            });

            return { ...state, isFetching: false, list: data };
        case Actions.SAVE_USER_SUCCESS:
            return { ...state, success: true };
        case Actions.SAVE_USER_ERROR:
            return { ...state, success: false, error: action.payload };
        case Actions.FETCH_USER_DETAIL_SUCCESS:
            let dataDetail = action.payload;
            dataDetail = dataDetail.map((user, idx) => {
                return {
                    ...user,
                    idx: idx + 1
                }
            });

            return { ...state, detail: dataDetail };
        default:
            return state;
    }
};

export default user;