/**
 * INITIAL STATE
 */
const defaultUser = null

/**
 * ACTION TYPES
 */
const SET_CONFIGURATION = 'SET_CONFIGURATION';
const CREATED_IDENTITY = 'CREATED_IDENTITY'

/**
 * ACTION CREATORS
 */
const config = address => ({type: SET_CONFIGURATION, address})
const createdIdentity = address => ({type: CREATED_IDENTITY, address})

/**
 * THUNK CREATORS
 */
export const checkAccountConfig = address =>
  dispatch => dispatch(config(address))

export const setNewConfig = address =>
  dispatch => dispatch(createdIdentity(address))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_CONFIGURATION:
      return action.address;
    case CREATED_IDENTITY:
      return action.address;
    default:
      return state
  }
}
