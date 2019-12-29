import * as Actions from 'app/store/actions';

const member = function (state = {}, action) {
    switch (action.type) {
        case Actions.FETCH_MEMBERS_REQUEST: 
            return { ...state, isFetching: true };
        case Actions.FETCH_MEMBERS_SUCCESS:
            let data = action.payload;
            data = data.map((mem, idx) => {
                return {
                    ...mem,
                    idx: idx + 1,
                    statusText: (mem.status === 0) ? 'Off' : 'On'
                }
            });

            return { ...state, isFetching: false, list: data };
        case Actions.FETCH_MEMBER_DETAIL_SUCCESS:
            let dataDetail = action.payload;
            dataDetail = dataDetail.map((mem, idx) => {
                return {
                    ...mem,
                    idx: idx + 1
                }
            });

            return { ...state, detail: dataDetail };
        default:
            return state;
    }
};

export default member;