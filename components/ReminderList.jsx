import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tailwind from "twrnc";
import Icon from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { db } from "../Firebase";
import CountDown from "react-native-countdown-component";
import { collection, deleteDoc,doc } from "firebase/firestore";

const ReminderList = ({
  index,
  id,
  title,
  date,
  time,
  category,
  email,
  handleDelete,
  reminderValue,
}) => {
  const [inputDate, setInputDate] = useState(null);
  const [countdown, setCountdown] = useState([]);

  useEffect(() => {
    setInputDate(date)
    const interval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(inputDate);
      const diff = targetDate.getTime() - now.getTime();
      if (diff < 0) {
        clearInterval(interval); // stop the timer
        setCountdown('Today');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [inputDate]);
  
  const deleteEvent = async () => {
    try {
      const path=`/${category}/${email}/${category}`
      console.log(path)
      const docRef=doc(db,path,id)
      await deleteDoc(docRef)
      alert("Event Deleted");
    } catch (e) {
      console.log(e);
    }
   
  };
  return (
    <TouchableOpacity
      style={tailwind`w-[85] h-full bg-[#1abc9c] flex mr-4 items-center justify-center p-3`}
      key={index}
    >
      <TouchableOpacity style={styles.closeBtn} onPress={() => deleteEvent()}>
        <Ionicons name="trash-outline" size={50} color="#e81c2e" />
      </TouchableOpacity>
      <Text style={tailwind`text-[50px] text-white font-bold uppercase `}>
        {title}
      </Text>
      <Text style={tailwind`text-[3rem] font-bold uppercase `}>{date}</Text>
      <Text style={tailwind`text-[3rem] font-bold uppercase `}>{time}</Text>
      <Text style={tailwind`text-[30px] text-white font-bold uppercase `}>{countdown}</Text>
    </TouchableOpacity>
  );
};

export default ReminderList;

const styles = StyleSheet.create({
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 3,
  },
});
