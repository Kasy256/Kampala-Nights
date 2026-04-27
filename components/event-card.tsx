import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

export type Event = {
  id: string;
  title: string;
  artist?: string;
  venueName: string;
  location: string;
  date: string;
  time: string;
  image: string;
  category: string;
  price: string;
  verified?: boolean;
};

interface EventCardProps {
  event: Event;
  style?: ViewStyle;
}

export function EventCard({ event, style }: EventCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();

  return (
    <Animated.View entering={FadeInDown.delay(100).duration(500)}>
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => router.push(`/venue/${event.id}`)}
        style={[styles.card, { backgroundColor: theme.card || '#1A1A24' }, style]}
      >
        <Image 
          source={{ uri: event.image }} 
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{event.date.split(',')[0]}</Text>
        </View>

        {event.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#E91E63" />
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={[styles.category, { color: theme.tint }]}>{event.category}</Text>
            <Text style={[styles.price, { color: theme.text }]}>From {event.price}</Text>
          </View>
          
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {event.title}
          </Text>
          
          {event.artist && (
            <Text style={[styles.artist, { color: theme.secondary }]}>
              with {event.artist}
            </Text>
          )}

          <View style={styles.venueRow}>
            <Ionicons name="location-sharp" size={14} color={theme.secondary} />
            <Text style={[styles.venueText, { color: theme.secondary }]}>
              {event.venueName} • {event.location}
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.bookButton, { backgroundColor: theme.tint }]}
            onPress={() => router.push(`/booking?eventId=${event.id}`)}
          >
            <Text style={styles.bookButtonText}>Book Tickets</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  dateBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(233, 30, 99, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dateText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  venueText: {
    fontSize: 13,
  },
  bookButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
