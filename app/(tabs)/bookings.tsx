import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const MOCK_BOOKINGS = [
  {
    id: 'BK-1024',
    venue: 'Thrones Lounge Bar',
    date: 'Saturday, 28 Dec',
    time: '8:00 PM',
    type: 'VIP Table (4 pax)',
    status: 'Confirmed',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BK-1024',
  },
  {
    id: 'BK-0988',
    venue: 'Sky Lounge',
    date: 'Tonight',
    time: '9:00 PM',
    type: 'General Entry (2 pax)',
    status: 'Active',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BK-0988',
  }
];

export default function BookingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Bookings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {MOCK_BOOKINGS.map((booking) => (
          <View key={booking.id} style={[styles.bookingCard, { backgroundColor: theme.card }]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.venueName, { color: theme.text }]}>{booking.venue}</Text>
                <Text style={[styles.bookingId, { color: theme.secondary }]}>ID: {booking.id}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
                <Text style={styles.statusText}>{booking.status}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color={theme.tint} />
                <Text style={[styles.detailText, { color: theme.text }]}>{booking.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color={theme.tint} />
                <Text style={[styles.detailText, { color: theme.text }]}>{booking.time}</Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.qrSection}>
              <View style={styles.qrInfo}>
                <Text style={[styles.ticketType, { color: theme.text }]}>{booking.type}</Text>
                <Text style={[styles.qrHelp, { color: theme.secondary }]}>Show this QR at the entrance</Text>
              </View>
              <Image 
                source={{ uri: booking.qrCode }} 
                style={styles.qrImage}
                contentFit="contain"
              />
            </View>

            <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.border }]}>
              <Text style={[styles.actionBtnText, { color: theme.text }]}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.pastBookingsHeader}>
          <Text style={[styles.pastTitle, { color: theme.text }]}>Past Events</Text>
          <TouchableOpacity>
            <Text style={{ color: theme.tint }}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.emptyPast, { backgroundColor: theme.card }]}>
          <Ionicons name="archive-outline" size={32} color={theme.secondary} />
          <Text style={[styles.emptyText, { color: theme.secondary }]}>Your past bookings will appear here</Text>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  bookingCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingId: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginBottom: 15,
  },
  qrSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  qrInfo: {
    flex: 1,
  },
  ticketType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  qrHelp: {
    fontSize: 12,
  },
  qrImage: {
    width: 80,
    height: 80,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 4,
  },
  actionBtn: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pastBookingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  pastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyPast: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    gap: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#333',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
