import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

function OnboardingScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    require('../assets/onboard_1.png'),
    require('../assets/onboard_2.png'),
    require('../assets/onboard_3.png'),
  ];
  const titles = ['Welcome to Elder Reminder App', 'Add your tasks and schedule reminders', 'Stay on top of your daily tasks'];
  const subtitles = [
    'Get started by creating an account.',
    'Add tasks, set reminders, and stay organized.',
    'Stay on track with reminders that keep you informed.',
  ];

  function handleNext() {
    if (activeIndex === 2) {
      navigation.navigate('Registration');
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={images[activeIndex]} style={styles.image} />
      <Text style={styles.title}>{titles[activeIndex]}</Text>
      <Text style={styles.subtitle}>{subtitles[activeIndex]}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{activeIndex === 2 ? 'Get started' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1abc9c',
    padding: 10,
    borderRadius: 15,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OnboardingScreen;
