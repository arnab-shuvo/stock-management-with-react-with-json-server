import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import userReducer from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import utilityReducer from './utilityReducer';

const persistConfig = {
	key: 'root',
	storage: storage,
};
const persistedReducer = persistReducer(persistConfig, utilityReducer);
const reducers = combineReducers({
	utilityStore: persistedReducer,
	userStore: userReducer,
	stockStore: stockReducer,
});

export default reducers;
