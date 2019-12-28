import memberService from 'app/services/memberService';
import * as Actions from 'app/store/actions';

export function fetchMembers() {
    return function (dispatch) {
        dispatch({ 
            type: Actions.FETCH_MEMBERS_REQUEST
        });
        memberService.fetchMembers()
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_MEMBERS_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_MEMBERS_ERROR,
                    payload: error
                });
            });
    }
}

export function fetchDetail(memberId) {
    return function (dispatch) {
        memberService.fetchDetail(memberId)
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_MEMBER_DETAIL_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_MEMBER_DETAIL_ERROR,
                    payload: error
                });
            });
    }
}
