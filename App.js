import React from "react";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { profileReducer } from "./store/reducers/profileReducer";
import MainNavigator from "./src/navigator/MainNavigator";

const rootReducer = combineReducers({
  profileReducer: profileReducer
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App;