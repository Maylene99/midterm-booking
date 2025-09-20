import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";   // ✅ correct path
import { useRouter } from "expo-router";        // ✅ use router

export default function BookingForm() {
  const [name, setName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState("1");

  const router = useRouter(); // ✅ expo-router navigation

  const handleBooking = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "You must be logged in to make a booking.");
      return;
    }

    if (!name || !roomType || !date || !guests) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name,
        roomType,
        date: date.toISOString().split("T")[0],
        guests: parseInt(guests) || 1,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Booking saved!");
      setName("");
      setRoomType("");
      setDate(new Date());
      setGuests("1");

      router.replace("/home");  // ✅ instead of navigation.navigate
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Room Type (e.g. Deluxe, Suite)"
        value={roomType}
        onChangeText={setRoomType}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          Booking Date: {date.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TextInput
        placeholder="Guests"
        value={guests}
        onChangeText={setGuests}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Book Now" onPress={handleBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
});
