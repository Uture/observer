import { createStore } from 'redux'
import mainReducer from '@redux/mainReducer'

const store = createStore(mainReducer)

export default store