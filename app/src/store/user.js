/**
 * INITIAL STATE
 */
const defaultUser = null

/**
 * ACTION TYPES
 */
const CHECK_CONFIGURATION = 'CHECK_CONFIGURATION';

/**
 * ACTION CREATORS
 */
const checkUser = address => ({type: CHECK_CONFIGURATION, address})

/**
 * THUNK CREATORS
 */
export const checkConfig = address  => {
    return dispatch => {
      configuredAccount(address)
    }
      web3.eth.getAccounts((err, accounts) => dispatch(setAccounts(accounts)))
}

/**
 * REDUCER
 */
export default function (state = defaultAccounts, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.accounts;
    default:
      return state
  }
}
