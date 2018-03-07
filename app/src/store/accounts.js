/**
 * INITIAL STATE
 */
const defaultAccounts = []

/**
 * ACTION TYPES
 */
const GET_ACCOUNTS = 'GET_ACCOUNTS';

/**
 * ACTION CREATORS
 */
const setAccounts = accounts => ({type: GET_ACCOUNTS, accounts})

/**
 * THUNK CREATORS
 */
// we make this a promise so we can await its result on the front end
export const fetchAccounts = web3  =>
    dispatch =>
      new Promise((resolve, reject) =>
        web3.eth.getAccounts((err, accounts) => {
          if (err) reject(err)
          return resolve(dispatch(setAccounts(accounts)))
        }))

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
