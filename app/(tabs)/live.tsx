import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;

const MOCK_REELS = [
  {
    id: '1',
    user: 'Brian K.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    venue: 'Thrones Lounge Bar',
    location: 'Naguru, Kampala',
    caption: 'The vibe here is unmatched tonight! 🔥 Elijah Kitaka is killing it.',
    timeAgo: '2min ago',
    likes: '2.4k',
    comments: '128',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    user: 'Jane M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    venue: 'Sky Lounge',
    location: 'Kisementi, Kampala',
    caption: 'Sunset cocktails are the best! 🍹✨ #KampalaNights',
    timeAgo: '15min ago',
    likes: '1.2k',
    comments: '45',
    image: 'https://images.unsplash.com/photo-1536935338218-841272c2069b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    user: 'DJ Roja',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    venue: 'The ByPass',
    location: 'Kabalagala, Kampala',
    caption: 'Full house tonight! Who\'s coming through? 🎧🔥',
    timeAgo: '42min ago',
    likes: '5.8k',
    comments: '312',
    image: 'https://images.unsplash.com/photo-1598333122483-1d218f060f65?q=80&w=800&auto=format&fit=crop',
  }
];

const SwipeHint = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.swipeHint, animatedStyle]}>
      <Ionicons name="chevron-up" size={24} color="#FFF" />
      <Text style={styles.swipeHintText}>Swipe up for more</Text>
    </Animated.View>
  );
};

const ReelItem = ({ item, index }: { item: typeof MOCK_REELS[0], index: number }) => {
  const router = useRouter();

  return (
    <View style={styles.reelContainer}>
      <Image source={{ uri: item.image }} style={styles.backgroundContent} contentFit="cover" />

      <View style={styles.overlay}>
        <SafeAreaView style={styles.topHeader}>
          <View style={styles.timeBadge}>
            <Ionicons name="time" size={14} color="#FFF" />
            <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/post/create')}>
            <Ionicons name="camera" size={28} color="#FFF" />
          </TouchableOpacity>
        </SafeAreaView>

        {index === 0 && <SwipeHint />}

        <View style={styles.sideActions}>
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="heart" size={35} color="#E91E63" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="chatbubble-ellipses" size={35} color="#FFF" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionItem, styles.directionsBtn]}
            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.venue + ' ' + item.location)}`)}
          >
            <Ionicons name="navigate" size={28} color="#FFF" />
            <Text style={styles.actionText}>Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.userName}>{item.user}</Text>
              <TouchableOpacity style={styles.venueBadge} onPress={() => router.push(`/venue/${item.id}`)}>
                <Ionicons name="location" size={12} color="#FFF" />
                <Text style={styles.venueName}>{item.venue}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.caption} numberOfLines={3}>
            {item.caption}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function LiveScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />
      <FlatList
        data={MOCK_REELS}
        renderItem={({ item, index }) => <ReelItem item={item} index={index} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height - TAB_BAR_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width: width,
    height: height - TAB_BAR_HEIGHT,
  },
  backgroundContent: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeAgoText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  swipeHint: {
    position: 'absolute',
    bottom: 250,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  swipeHintText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  sideActions: {
    position: 'absolute',
    right: 15,
    bottom: 60,
    gap: 25,
    alignItems: 'center',
  },
  actionItem: {
    alignItems: 'center',
  },
  directionsBtn: {
    backgroundColor: 'rgba(233, 30, 99, 0.8)',
    padding: 10,
    borderRadius: 15,
  },
  actionText: {
    color: '#FFF',
    fontSize: 11,
    marginTop: 4,
    fontWeight: 'bold',
  },
  bottomContent: {
    padding: 20,
    paddingBottom: 40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(233, 30, 99, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  venueName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  caption: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 22,
    width: '85%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
