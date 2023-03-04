import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getDocs,
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import tailwind from "twrnc";
import moment from "moment/moment";
import ReactNativeAN from "react-native-alarm-notification";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/AntDesign";
import ReminderList from "../components/ReminderList";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userReducer";

const ReminderScreen = ({ route }) => {
  const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));
  const navigation = useNavigation();
  const category = route.params.category;
  const user = useSelector(selectUser);

  const [data, setData] = useState([]);
  const [sound, setSound] = useState("");
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "Exercise", user.email);
    const colRef = collection(docRef, "Exercise");
    const q = query(colRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe;
  }, []);
  const handleAddReminder = () => {
    navigation.navigate("NewReminder", { category });
    console.log('hi');

  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingTop: 30,
        }}
        style={tailwind`pt-4 `}
      >
        {data ? (
          data?.map((item, index) => (
            <ReminderList
              key={index}
              title={item?.data.title}
              date={item?.data.date}
              time={item?.data.time}
              reminderValue={item.data.reminderValue}
              index={index}
            />
          ))
        ) : (
          <View style={tailwind`w-full h-full items-center justify-center`}>
            <Text style={tailwind`text-black`}>Loading data...</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={handleAddReminder}
        style={tailwind`h-50 flex items-center justify-end`}
      >
        <Ionicons
          name="ios-add-circle"
          style={tailwind`text-[6rem] text-[#1abc9c]`}
        />
      </TouchableOpacity>
    </>
  );
};

export default ReminderScreen;
