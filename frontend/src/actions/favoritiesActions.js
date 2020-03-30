export const SET_FAVORITIES = "SET_FAVORITIES";
export const INCREMENT_FAVORITIES = "INCREMENT_FAVORITIES";
export const DECREMENT_FAVORITIES = "DECREMENT_FAVORITIES";

export const setFavorities = favorities => ({
  type: SET_FAVORITIES,
  favoritiesList: favorities
});

export const incrementFavorities = movie => ({
  type: INCREMENT_FAVORITIES,
  item: movie
});

export const decrementFavorities = movie => ({
  type: DECREMENT_FAVORITIES,
  item: movie
});
