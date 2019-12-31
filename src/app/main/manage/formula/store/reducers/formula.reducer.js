import * as Actions from 'app/store/actions';

const formula = function (state = {}, action) {
    switch (action.type) {
        case Actions.FETCH_FORMULAS_REQUEST: 
            return { ...state, isFetching: true };
        case Actions.FETCH_FORMULAS_SUCCESS:
            let data = action.payload;
            data = data.map((acc, idx) => {
                return {
                    ...acc,
                    idx: idx + 1
                }
            });

            return { ...state, isFetching: false, list: data };
        case Actions.FETCH_FORMULA_DETAIL_SUCCESS:
            let dataDetail = action.payload;
            dataDetail = dataDetail.map((acc, idx) => {
                return {
                    ...acc,
                    idx: idx + 1
                }
            });

            return { ...state, detail: dataDetail };
        default:
            return state;
    }
};

export default formula;