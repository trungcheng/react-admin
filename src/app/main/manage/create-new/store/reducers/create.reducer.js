import * as Actions from 'app/store/actions';

const create = function (state = {}, action) {
    switch (action.type) {
        case Actions.CREATE_NEW_REQUEST: 
            return { ...state, isCreating: true };
        case Actions.CREATE_NEW_SUCCESS:
            let data = action.payload;
            data = data.map((item, idx) => {
                return {
                    ...item,
                    idx: idx + 1
                }
            });

            return { ...state, isCreating: false, list: data };
        default:
            return state;
    }
};

export default create;