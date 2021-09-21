import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore } from 'redux-persist';

const appEnv = process.env.REACT_APP_ENV || 'development';

const composeEnhancers =
	((appEnv === 'development' || appEnv === 'local') &&
		typeof window !== 'undefined' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);
