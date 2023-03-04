import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./AppNavigator";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <ToastManager /> */}
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
