/**
 * INITIAL STATE
 */
const defaultTokenList = [];

/**
 * ACTION TYPES
 */
const GET_TOKENS = 'GET_TOKENS';

/**
 * ACTION CREATORS
 */
const setTokenList = tokens => ({type: GET_TOKENS, tokens})

/**
 * THUNK CREATORS
 */
export const updateTokenList = tokens =>
  dispatch => dispatch(setTokenList(tokens))

/**
 * REDUCER
 */
export default function (state = defaultTokenList, action) {
  switch (action.type) {
    case GET_TOKENS:
      return action.tokens;
    default:
      return state
  }
}
