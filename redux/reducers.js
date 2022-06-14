import * as types from './actionTypes'

const initialState = {
    favorites: []
}
export default function favoriteReducer (state = initialState, action) {
    switch(action.type) {
        case types.ADD_FAVORITE: 
            return{...state, favorites:[...state.favorites, action.payload]}
        case types.REMOVE_FAVORITE:
            return{
                ...state,
                favorites: state.favorites.filter(favorite => favorite.id !== action.payload.id)
            }
        default: 
            return state
    }
}