import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { EventCard, Event } from '@/components/event-card';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Amapiano Night',
    artist: 'DJ Etania',
    venueName: 'Thrones Lounge Bar',
    location: 'Naguru',
    date: 'TONIGHT, 27 APR',
    time: '8:00 PM',
    category: 'Live Music',
    price: 'UGX 30,000',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
    verified: true
  },
  {
    id: '2',
    title: 'Vybz Kartel Live',
    artist: 'Vybz Kartel',
    venueName: 'Lugogo Cricket Oval',
    location: 'Lugogo',
    date: 'SAT, 15 MAY',
    time: '6:00 PM',
    category: 'Concert',
    price: 'UGX 50,000',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    verified: true
  },
  {
    id: '3',
    title: 'Sunset Wine Tasting',
    venueName: 'Sky Lounge',
    location: 'Kisementi',
    date: 'SUN, 28 APR',
    time: '4:00 PM',
    category: 'Rooftop',
    price: 'UGX 100,000',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=800&auto=format&fit=crop',
    verified: true
  },
  {
    id: '4',
    title: 'Techno Takeover',
    artist: 'Dark Knight',
    venueName: 'The ByPass',
    location: 'Kabalagala',
    date: 'FRI, 30 APR',
    time: '10:00 PM',
    category: 'Club Night',
    price: 'UGX 20,000',
    image: 'https://images.unsplash.com/photo-1598333122483-1d218f060f65?q=80&w=800&auto=format&fit=crop',
    verified: false
  }
];

const CATEGORIES = ['All', 'Live Music', 'Concerts', 'Rooftop', 'Comedy', 'Club Night'];

export default function DiscoverScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color={theme.tint} />
            <Text style={[styles.locationText, { color: theme.text }]}>Kampala</Text>
            <Ionicons name="chevron-down" size={14} color={theme.text} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>What's Happening?</Text>
        </View>
        <TouchableOpacity style={[styles.profileButton, { backgroundColor: theme.card }]}>
          <Ionicons name="person" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: theme.card }]}>
            <Ionicons name="search" size={20} color={theme.secondary} />
            <TextInput
              placeholder="Search events, artists..."
              placeholderTextColor={theme.secondary}
              style={[styles.searchInput, { color: theme.text }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.tint }]}>
            <Ionicons name="options" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              style={[
                styles.categoryBadge,
                { backgroundColor: activeCategory === category ? theme.tint : theme.card }
              ]}
            >
              <Text style={[
                styles.categoryText,
                { color: activeCategory === category ? '#FFF' : theme.text }
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.feed}>
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  feed: {
    paddingHorizontal: 20,
  },
});
