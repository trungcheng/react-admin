import * as Actions from 'app/store/actions';

const member = function (state = {}, action) {
    switch (action.type) {
        case Actions.FETCH_MEMBERS_SUCCESS:
            return { list: action.payload, ...state };
        case Actions.FETCH_MEMBER_DETAIL_SUCCESS:
            return { ...state.member, member: action.payload };
        default:
            return state;
    }
};

export default member;