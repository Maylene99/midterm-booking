import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
 


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  const loadBookings = async () => {
    if (!uid) {
      setBookings([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const q = query(collection(db, "bookings"), where("userId", "==", uid));
      const snaps = await getDocs(q);
      const arr = snaps.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBookings(arr);
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const removeBooking = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      Alert.alert("Booking cancelled!");
      loadBookings();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const quickEdit = async (id, currentGuests = 1) => {
    try {
      await updateDoc(doc(db, "bookings", id), { guests: currentGuests + 1 });
      Alert.alert("Updated guest count!");
      loadBookings();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>Name: {item.name}</Text>
              <Text style={styles.label}>Room Type: {item.roomType}</Text>
              <Text style={styles.label}>Date: {item.date}</Text>
              <Text style={styles.label}>Guests: {item.guests || 1}</Text>
              <Text style={styles.labelSmall}>Booking ID: {item.id}</Text>

              <TouchableOpacity
                onPress={() => quickEdit(item.id, item.guests || 1)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>+ Add Guest</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeBooking(item.id)}
                style={[styles.button, { backgroundColor: "#f55" }]}
              >
                <Text style={styles.buttonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text>No bookings yet.</Text>}
        />
      )}

      <Button title="Back to Home" onPress={() => router.push("/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  labelSmall: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
