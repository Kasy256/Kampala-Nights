import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';

const LOCATIONS = ['Thrones Lounge Bar', 'Sky Lounge', 'The ByPass', 'Tales Lounge', 'Cielo Lounge', 'Lugogo Cricket Oval'];

export default function CreatePostScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  const [caption, setCaption] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    setIsPosting(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Simulate upload
    setTimeout(() => {
      setIsPosting(false);
      Alert.alert("Success!", "Your update is now live! 🔥", [
        { text: "View Feed", onPress: () => router.replace('/(tabs)/live') }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Share the Vibe</Text>
        <TouchableOpacity 
          style={[styles.postBtn, { backgroundColor: theme.tint, opacity: isPosting ? 0.5 : 1 }]}
          onPress={handlePost}
          disabled={isPosting}
        >
          <Text style={styles.postBtnText}>{isPosting ? 'Posting...' : 'Post'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity 
          style={[styles.cameraPlaceholder, { backgroundColor: theme.card }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <Ionicons name="camera" size={60} color={theme.secondary} />
          <Text style={[styles.placeholderText, { color: theme.secondary }]}>Tap to Capture</Text>
        </TouchableOpacity>

        <View style={styles.inputSection}>
          <Text style={[styles.label, { color: theme.text }]}>What&apos;s the vibe? 🔥</Text>
          <TextInput
            placeholder="Add a caption..."
            placeholderTextColor={theme.secondary}
            multiline
            style={[styles.input, { color: theme.text, backgroundColor: theme.card }]}
            value={caption}
            onChangeText={setCaption}
          />
        </View>

        <View style={styles.venueSection}>
          <Text style={[styles.label, { color: theme.text }]}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.venueScroll}>
            {LOCATIONS.map((location) => (
              <TouchableOpacity
                key={location}
                onPress={() => {
                  setSelectedLocation(location);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={[
                  styles.venueChip,
                  { 
                    backgroundColor: selectedLocation === location ? theme.tint : theme.card,
                    borderColor: theme.border 
                  }
                ]}
              >
                <Text style={[
                  styles.venueChipText,
                  { color: selectedLocation === location ? '#FFF' : theme.text }
                ]}>
                  {location}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
    padding: 20,
  },
  closeBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  cameraPlaceholder: {
    width: '100%',
    height: 350,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#333',
  },
  placeholderText: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  inputSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 100,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  venueSection: {
    marginBottom: 30,
  },
  venueScroll: {
    flexDirection: 'row',
  },
  venueChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  venueChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
