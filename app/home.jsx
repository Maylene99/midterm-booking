import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";  
import { Ionicons } from "@expo/vector-icons"; // nice icons

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏨 Booking Hotel</Text>
      <Text style={styles.subtitle}>Plan your stay with ease</Text>

      <View style={styles.menu}>
        <Link href="/BookNow" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="bed-outline" size={28} color="#fff" />
            <Text style={styles.cardText}>Book Now</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/MyBookings" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="calendar-outline" size={28} color="#fff" />
            <Text style={styles.cardText}>My Bookings</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/Profile" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="person-outline" size={28} color="#fff" />
            <Text style={styles.cardText}>Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f7fa", 
    alignItems: "center",
    justifyContent: "center"
  },
  title: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 5, 
    color: "#333" 
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30
  },
  menu: {
    width: "100%",
    gap: 15
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 10
  }
});
