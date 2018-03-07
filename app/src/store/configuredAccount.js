/**
 * INITIAL STATE
 */
const defaultUser = null

/**
 * ACTION TYPES
 */
const SET_CONFIGURATION = 'SET_CONFIGURATION';

/**
 * ACTION CREATORS
 */
const config = address => ({type: SET_CONFIGURATION, address})

/**
 * THUNK CREATORS
 */
export const checkAccountConfig = address =>
  dispatch => dispatch(config(address))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_CONFIGURATION:
      return action.address;
    default:
      return state
  }
}
