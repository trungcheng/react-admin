import createNewService from 'app/services/createNewService';
import * as Actions from 'app/store/actions';

export function createNew() {
    return function (dispatch) {
        dispatch({ 
            type: Actions.CREATE_NEW_REQUEST
        });
        createNewService.createNew()
            .then(response => {
                    return dispatch({
                        type: Actions.CREATE_NEW_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.CREATE_NEW_ERROR,
                    payload: error
                });
            });
    }
}
