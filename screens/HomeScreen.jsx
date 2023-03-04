import { signOut } from "firebase/auth";
import React, { useLayoutEffect,useEffect,useRef,useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "twrnc";
import { categories } from "../data/categoryData";
import { auth } from "../Firebase";
import { addUser, removeUser, selectUser } from "../slices/userReducer";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home Screen",
      headerRight: () => (
        <TouchableOpacity
          style={tailwind`mr-4 px-5 py-2 bg-[#ccc] rounded-full`}
          onPress={handleSignOut}
        >
          <Text>{user ? "SignOut" : null}</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  const handleCategoryPress = (category) => {
    navigation.navigate(category.name, { category });
  };

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigation.navigate("Registration");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryContainer}
          onPress={() => handleCategoryPress(category)}
        >
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  categoryContainer: {
    width: "48%",
    height: "31%",
    borderRadius: 5,
    backgroundColor: "#1abc9c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  categoryImage: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log(finalStatus);
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
