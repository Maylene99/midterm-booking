/// BookNow.jsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

export default function BookNow() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Booking</Text>

      {/* Expo Router navigation */}
      <Link href="/BookingForm" style={styles.link}>
        Fill Booking Form
      </Link>

      {/* Or with a button */}
      <Button title="Fill Booking Form" onPress={() => router.push("/BookingForm")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, marginBottom: 20 },
  link: { fontSize: 18, color: "blue", marginBottom: 10 }
});

