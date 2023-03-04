import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReminderCard = ({ title, date, time }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const targetTime = new Date(date + 'T' + time + ':00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setTimeRemaining(targetTime - now);
    }, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
  };

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.dateTime}>{date} - {time}</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(days)}</Text>
        <Text style={styles.timerLabel}>days</Text>
        <Text style={styles.timer}>{formatTime(hours)}</Text>
        <Text style={styles.timerLabel}>hrs</Text>
        <Text style={styles.timer}>{formatTime(minutes)}</Text>
        <Text style={styles.timerLabel}>min</Text>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <Text style={styles.timerLabel}>sec</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  timerLabel: {
    fontSize: 14,
    marginHorizontal: 5,
  },
});

export default ReminderCard;
