import createHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history
