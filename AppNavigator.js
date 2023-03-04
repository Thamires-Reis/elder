// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';

// import OnboardingScreen from './screens/OnboardingScreen';
// import RegistrationScreen from './screens/RegistrationScreen';
// import HomeScreen from './screens/HomeScreen';
// import ExerciseScreen from './screens/ExerciseScreen';

// const Stack = createStackNavigator();

// function AppNavigator({ isRegistered }) {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={isRegistered ? "Home" : "Onboarding"}>
//         <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppNavigator;

import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./screens/OnboardingScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./Firebase";
import { addUser, selectUser } from "./slices/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import NewReminder from "./components/NewReminder";
import CategoryScreen02 from "./screens/CategoryScreen02";
import AddNewComponent from "./components/AddNewComponent";

const Stack = createStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          addUser({
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
      }
    });
  }, [dispatch]);

  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName={user ?  'HomeScreen' : 'Onboarding'}>
          <Stack.Screen name="HomeScreen">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} 
            options={{ headerShown: false }}/>

            {!user ? (
            <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Exercise"
              component={CategoryScreen02}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Breakfast"
              component={CategoryScreen02}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Doctors"
              component={CategoryScreen02}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Lunch"
              component={CategoryScreen02}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Medicine"
              component={CategoryScreen02}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dinner"
              component={CategoryScreen02}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewReminder"
              component={NewReminder}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddNew"
              component={AddNewComponent}
              options={{ headerShown: false }}
              />
              </>
            )}      
            
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
