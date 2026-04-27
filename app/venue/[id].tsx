import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');

const MOCK_EVENTS = {
  '1': {
    title: 'Amapiano Night',
    artist: 'DJ Etania',
    venueName: 'Thrones Lounge Bar',
    location: 'Naguru, Kampala',
    date: 'Monday, 27 April',
    time: '8:00 PM - 4:00 AM',
    category: 'Live Music',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
    description: 'Get ready for the ultimate Amapiano experience at Thrones! Featuring a special set by DJ Etania, we\'re bringing the hottest South African sounds straight to the heart of Naguru. Don\'t miss out on the energy, the vibes, and the best cocktails in the city.',
    price: 'UGX 30,000',
    rating: 4.8,
  },
  '2': {
    title: 'Vybz Kartel Live',
    artist: 'Vybz Kartel',
    venueName: 'Lugogo Cricket Oval',
    location: 'Lugogo, Kampala',
    date: 'Saturday, 15 May',
    time: '6:00 PM - Midnight',
    category: 'Concert',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    description: 'The World Boss is coming to Kampala! Join thousands for a historic night at Lugogo Cricket Oval as Vybz Kartel performs live. This is a once-in-a-lifetime experience for every dancehall fan in East Africa.',
    price: 'UGX 50,000',
    rating: 4.9,
  },
  '3': {
    title: 'Sunset Wine Tasting',
    venueName: 'Sky Lounge',
    location: 'Kisementi, Kampala',
    date: 'Sunday, 28 April',
    time: '4:00 PM - 10:00 PM',
    category: 'Rooftop',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=800&auto=format&fit=crop',
    description: 'Unwind as the sun goes down over the Kampala skyline. Enjoy a curated selection of international wines, paired with gourmet appetizers and smooth lounge music.',
    price: 'UGX 100,000',
    rating: 4.7,
  },
  '4': {
    title: 'Techno Takeover',
    artist: 'Dark Knight',
    venueName: 'The ByPass',
    location: 'Kabalagala, Kampala',
    date: 'Friday, 30 April',
    time: '10:00 PM - 6:00 AM',
    category: 'Club Night',
    image: 'https://images.unsplash.com/photo-1598333122483-1d218f060f65?q=80&w=800&auto=format&fit=crop',
    description: 'Kabalagala is getting loud! Join us for a high-intensity techno session with Dark Knight on the decks. If you\'re looking for a late-night dance marathon, this is where you need to be.',
    price: 'UGX 20,000',
    rating: 4.5,
  }
};

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  const event = MOCK_EVENTS[id as keyof typeof MOCK_EVENTS] || MOCK_EVENTS['1'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: event.image }} 
            style={styles.heroImage}
            contentFit="cover"
          />
          <SafeAreaView style={styles.headerOverlay}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={[styles.backButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
            >
              <Ionicons name="chevron-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
            >
              <Ionicons name="share-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: theme.text }]}>{event.title}</Text>
              {event.artist && (
                <Text style={[styles.artist, { color: theme.tint }]}>with {event.artist}</Text>
              )}
            </View>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{event.rating}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(233, 30, 99, 0.1)' }]}>
                <Ionicons name="calendar" size={20} color={theme.tint} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.secondary }]}>Date</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{event.date}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(233, 30, 99, 0.1)' }]}>
                <Ionicons name="time" size={20} color={theme.tint} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.secondary }]}>Time</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(233, 30, 99, 0.1)' }]}>
                <Ionicons name="location" size={20} color={theme.tint} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: theme.secondary }]}>Venue</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{event.venueName}</Text>
                <Text style={[styles.infoSubValue, { color: theme.secondary }]}>{event.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>About Event</Text>
            <Text style={[styles.description, { color: theme.secondary }]}>
              {event.description}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.secondaryAction, { borderColor: theme.border }]}>
              <Ionicons name="map-outline" size={20} color={theme.text} />
              <Text style={[styles.secondaryActionText, { color: theme.text }]}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryAction, { borderColor: theme.border }]}>
              <Ionicons name="call-outline" size={20} color={theme.text} />
              <Text style={[styles.secondaryActionText, { color: theme.text }]}>Contact Venue</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <View style={styles.footerPrice}>
          <Text style={[styles.priceLabel, { color: theme.secondary }]}>Tickets from</Text>
          <Text style={[styles.priceValue, { color: theme.text }]}>{event.price}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.bookButton, { backgroundColor: theme.tint }]}
          onPress={() => router.push(`/booking?eventId=${id}`)}
        >
          <Text style={styles.bookButtonText}>Book Tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: '#0D0D12',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    fontSize: 18,
    fontWeight: '600',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  infoSection: {
    gap: 20,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoSubValue: {
    fontSize: 13,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 35,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  footerPrice: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookButton: {
    flex: 1.5,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
