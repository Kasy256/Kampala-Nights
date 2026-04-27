import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';

const TICKET_TYPES = [
  { id: 'gen', name: 'General Entry', price: 'UGX 30,000', description: 'Access to main floor' },
  { id: 'vip', name: 'VIP Table (4-6 pax)', price: 'UGX 250,000', description: 'Reserved table + bottle' },
  { id: 'vnavip', name: 'VNAV VIP (8 pax)', price: 'UGX 1,000,000', description: 'Private area + premium service' }
];

export default function BookingScreen() {
  useLocalSearchParams<{ venueId: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [selectedTicket, setSelectedTicket] = useState('gen');
  const [count, setCount] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    setIsBooking(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      Alert.alert(
        "Booking Confirmed!",
        "Your ticket has been saved to 'My Bookings'. See you at the party! 🥂",
        [{ text: "Awesome!", onPress: () => router.replace('/(tabs)/bookings') }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Secure Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Select Ticket Type</Text>
        {TICKET_TYPES.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            onPress={() => {
              setSelectedTicket(ticket.id);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={[
              styles.ticketCard,
              { 
                backgroundColor: theme.card,
                borderColor: selectedTicket === ticket.id ? theme.tint : 'transparent',
                borderWidth: 2
              }
            ]}
          >
            <View style={styles.ticketHeader}>
              <Text style={[styles.ticketName, { color: theme.text }]}>{ticket.name}</Text>
              <Text style={[styles.ticketPrice, { color: theme.tint }]}>{ticket.price}</Text>
            </View>
            <Text style={[styles.ticketDesc, { color: theme.secondary }]}>{ticket.description}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.counterSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Number of Tickets</Text>
          <View style={[styles.counter, { backgroundColor: theme.card }]}>
            <TouchableOpacity 
              onPress={() => count > 1 && setCount(count - 1)}
              style={styles.counterBtn}
            >
              <Ionicons name="remove" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.counterText, { color: theme.text }]}>{count}</Text>
            <TouchableOpacity 
              onPress={() => setCount(count + 1)}
              style={styles.counterBtn}
            >
              <Ionicons name="add" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Method</Text>
          <View style={[styles.paymentMethod, { backgroundColor: theme.card }]}>
            <Ionicons name="phone-portrait-outline" size={24} color={theme.tint} />
            <Text style={[styles.paymentText, { color: theme.text }]}>Mobile Money (MTN/Airtel)</Text>
            <Ionicons name="checkmark-circle" size={24} color={theme.tint} style={{ marginLeft: 'auto' }} />
          </View>
        </View>

        <View style={[styles.summary, { backgroundColor: theme.card }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.secondary }]}>Subtotal</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>UGX {count * 30000}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.secondary }]}>Service Fee</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>UGX 2,000</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
            <Text style={[styles.totalValue, { color: theme.tint }]}>UGX {count * 30000 + 2000}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.confirmButton, { backgroundColor: theme.tint }]}
          onPress={handleBooking}
          disabled={isBooking}
        >
          <Text style={styles.confirmButtonText}>
            {isBooking ? 'Processing...' : 'Confirm & Pay'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  ticketCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketDesc: {
    fontSize: 13,
  },
  counterSection: {
    marginTop: 20,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentSection: {
    marginTop: 30,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    gap: 12,
  },
  paymentText: {
    fontSize: 15,
    fontWeight: '500',
  },
  summary: {
    marginTop: 30,
    padding: 20,
    borderRadius: 20,
    gap: 12,
    marginBottom: 40,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingBottom: 35,
  },
  confirmButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
