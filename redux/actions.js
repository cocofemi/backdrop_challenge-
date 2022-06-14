import * as types from './actionTypes';

export const add_favorite = (data) => dispatch => {
    dispatch({
        type: types.ADD_FAVORITE,
        payload: data
    })
}   

export const remove_favorite = (id) => dispatch => {
    dispatch({
        type: types.REMOVE_FAVORITE,
        payload:{
            id
        }
    })
}