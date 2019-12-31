import formulaService from 'app/services/formulaService';
import * as Actions from 'app/store/actions';

export function fetchFormulas() {
    return function (dispatch) {
        dispatch({ 
            type: Actions.FETCH_FORMULAS_REQUEST
        });
        formulaService.fetchFormulas()
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_FORMULAS_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_FORMULAS_ERROR,
                    payload: error
                });
            });
    }
}

export function fetchDetail(formulaId) {
    return function (dispatch) {
        formulaService.fetchDetail(formulaId)
            .then(response => {
                    return dispatch({
                        type: Actions.FETCH_FORMULA_DETAIL_SUCCESS,
                        payload: response.data
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type: Actions.FETCH_FORMULA_DETAIL_ERROR,
                    payload: error
                });
            });
    }
}
