import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import tailwind from "twrnc";
import moment from "moment";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userReducer";
import ReactNativeAN from "react-native-alarm-notification";
import * as Notifications from "expo-notifications";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { current } from "@reduxjs/toolkit";
const items = [
  { label: "Daily", value: "Daily", id: 0 },
  { label: "Weekly", value: "Weekly", id: 1 },
  { label: "Monthly", value: "Monthly", id: 2 },
];

const AddNewComponent = ({ route, navigation }) => {
  const [title, setTitle] = useState("Daily");
  const [value, setValue] = React.useState("Daily");
  const [alarmTime, setAlarmTime] = useState(null);
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);
  const [dateIs, setdate] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const handleConfirm = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dateyear=`${year}/${month}/${day}`;
    setHour(hours)
    setMin(minutes)
    setdate(dateyear)
    setAlarmTime(date);
    setIsPickerVisible(false);
    scheduleAlarm(date);
  };
  console.log(value)
  const scheduleAlarm = async (date) => {
    let trigger;
    switch (value) {
      case "Daily":
        trigger = {
          date:date,
          repeats: true,
          intervalMs: 86400000, // 24 hours in milliseconds
        };
        break;
      case "Weekly":
        trigger = {
          date: date,
          repeats: true,
          intervalMs: 604800000, // 7 days in milliseconds
        };
        break;
      case "Monthly":
        trigger = {
          date: date,
          repeats: true,
          intervalMs: 2592000000, // 30 days in milliseconds (approximate)
        };
        break;
      default:
        trigger = new Date();
        break;
    }
    
    const schedulingOptions = {
      content: {
        title: title,
        sound: true,
        priority: "high",
        data: { data: "goes here" },
        vibrate: [0, 250, 250, 250],
      },
      trigger: trigger,
    };

    await Notifications.scheduleNotificationAsync(schedulingOptions);
  };
  const [setDate, setSetDate] = useState(moment().format("YYYY/MM/DD"));
  const [timePick, setTimePick] = useState(
    moment(new Date().getTime).format("hh:mm A")
  );
  
  const user = useSelector(selectUser);
  const cat_type = route.params.category_type;
  const handleSubmit = async () => {
    moment.locale("en");
    console.log(alarmTime);
    const formData = {
      title,
      date: dateIs,
      time: `${hour}:${min}`,
      value,
      reminderValue: timePick,
    };
    if (
      title !== "" ||
      (title !== null && setDate !== null && time !== null && value !== null)
    ) {
      const docRef = doc(db, cat_type, user.email);
      const colRef = collection(docRef, cat_type);
      await addDoc(colRef, formData).then((res) => {
        scheduleAlarm();
        alert("reminder added successfully!");
        navigation.goBack();
      });
    }
    // scheduleAlarm();
    // alert("reminder added successfully!");
    // navigation.goBack();
    console.log(date,time);
  };

  return (
    <View
      style={tailwind`flex flex-col justify-center w-full h-full items-center p-10`}
    >
      <View
        style={tailwind`flex flex-col items-start justify-start bg-[#1abc9c] w-full flex-1 p-5`}
      >
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#fff"
          placeholder="TITLE"
          onChangeText={setTitle}
        />
        <>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View
              style={tailwind`flex flex-row w-full items-center justify-between `}
            >
              <Text style={tailwind`text-white uppercase text-2xl font-bold`}>Daily</Text>
              <RadioButton color="#fff" value="Daily" />
            </View>
            <View
              style={tailwind`flex flex-row w-full items-center justify-between  `}
            >
              <Text style={tailwind`text-white uppercase text-2xl font-bold`}>Weekly</Text>
              <RadioButton color="#fff" value="Weekly" />
            </View>
            <View
              style={tailwind`flex flex-row w-full items-center justify-between  `}
            >
              <Text style={tailwind`text-white uppercase text-2xl font-bold`}>Monthly</Text>
              <RadioButton color="#fff" value="Monthly" />
            </View>
          </RadioButton.Group>
        </>
        <TouchableOpacity
          onPress={() => setIsPickerVisible(true)}
          style={{
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "center",
            margin: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 32, marginTop: 20 }}>
            Set Time and Date
          </Text>
          <Ionicons
            name="alarm-outline"
            style={tailwind`text-[7rem] text-[#000000]`}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={() => setIsPickerVisible(false)}
          style={tailwind `bg-black` }

        />
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity
          onPress={() => setIsPickerVisible(true)}
          style={styles.dateButton}
        >
          <Text style={tailwind`text-white uppercase mt-10 text-3xl`}>
            Selected Date -: 
          </Text>
          <Text style={tailwind`text-Black uppercase font-bold text-3xl`}>
            {dateIs ? moment(dateIs).format("LL") : "Select Date"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsPickerVisible(true)}
          style={styles.timeButton}
        >
          <Text style={tailwind`text-white uppercase mt-5 text-3xl`}>
            Selected Time -: 
          </Text>
          <Text style={tailwind`text-Black font-bold uppercase text-3xl`}>
            {hour && min ? `${hour}:${min}` : "Select Time"}
          </Text>
        </TouchableOpacity>
      </View>
  

      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-circle-sharp"
            style={tailwind`text-[6rem] text-[#1abc9c]`}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons
            name="ios-add-circle"
            style={tailwind`text-[6rem] text-[#1abc9c]`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddNewComponent;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#149b80",
    width: "100%",
    padding: 5,
    height: 50,
    color: "black",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 30
  },
});
