/**
 * INITIAL STATE
 */
const defaultTokenList = [];

/**
 * ACTION TYPES
 */
const GET_TOKENS = 'GET_TOKENS';
const CREATED_TOKEN = 'CREATED_TOKEN';

/**
 * ACTION CREATORS
 */
const setTokenList = tokens => ({type: GET_TOKENS, tokens})
const createToken = token => ({type: CREATED_TOKEN, token})

/**
 * THUNK CREATORS
 */
export const updateTokenList = tokens =>
  dispatch => dispatch(setTokenList(tokens))

export const addToken = token =>
  dispatch => dispatch(createToken(token))

/**
 * REDUCER
 */
export default function (state = defaultTokenList, action) {
  switch (action.type) {
    case GET_TOKENS:
      return action.tokens;
    case CREATED_TOKEN:
      const { age, metaData, gender, encryptedData, creator } = action.token;
      const newToken = [age, metaData, gender, encryptedData, creator];
      return [...state, newToken];
    default:
      return state
  }
}
