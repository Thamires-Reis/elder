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
} from "firebase/firestore";
import { db } from "../Firebase";
import tailwind from "twrnc";
import moment from "moment/moment";
import ReactNativeAN from "react-native-alarm-notification";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/AntDesign";
import ReminderList from "../components/ReminderList";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/userReducer";
import { addReminder, selectReminder } from "../slices/alarmReducer";

const CategoryScreen02 = ({ route }) => {
  const navigation = useNavigation();
  const category = route.params.category.name;
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [reminders, setReminders] = useState(
    moment(new Date().getTime()).format("hh:mm A")
  );
  const alramTime = useSelector(selectReminder);
  const dispatch = useDispatch();

  useEffect(() => {
    const email=user.email;
    const cat=category;
    const docRef = doc(db, category, user.email);
    const colRef = collection(docRef, category);
    const q = query(colRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          category:cat,
          email:email
        }))
      );
    });

    return () => unsubscribe;
  }, []);
  const handleAddReminder = () => {
    navigation.navigate("AddNew", { category_type: category });
  };
console.log(data)
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
              index={index}
              reminderValue={item?.data.reminderValue}
              id={item.id}
              email={item.email}
              category={item.category}
            />
          ))
        ) : (
          <View style={tailwind`w-full h-full items-center justify-center`}>
            <Text style={tailwind`text-black`}>Loading data...</Text>
          </View>
        )}
      </ScrollView>
      <View style={tailwind`flex flex-row flex justify-center`}>
        <TouchableOpacity 
        onPress={() => navigation.goBack()}
        // style={tailwind`flex flex-col h-50 flex items-center justify-end`}
        >
          <Ionicons
            name="arrow-back-circle-sharp"
            style={tailwind`text-[7rem] text-[#1abc9c]`}
          />
        </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAddReminder}
        // style={tailwind`flex flex-col h-50 flex items-center justify-end`}
      >
        <Ionicons
          name="ios-add-circle"
          style={tailwind`text-[7rem] text-[#1abc9c]`}
        />
      </TouchableOpacity>
      </View>
    </>
  );
};

export default CategoryScreen02;
