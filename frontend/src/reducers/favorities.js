import {
    INCREMENT_FAVORITIES,
    DECREMENT_FAVORITIES,
    SET_FAVORITIES
    } from "../actions/favoritiesActions";

    const initialState = {
        favorities: []
    };

    export const favorities = (state = initialState, action) => {
    switch (action.type) {
        case SET_FAVORITIES:
        return {
            ...state,
            favorities: action.favoritiesList
        };
        case INCREMENT_FAVORITIES:
        return {
            ...state,
            favorities: state.favorities.concat(action.item)
        };
        case DECREMENT_FAVORITIES:
        return {
            ...state,
            favorities: state.favorities.filter(function(value){ return value !== action.item })
        };
        default:
        return state;
    }
};
