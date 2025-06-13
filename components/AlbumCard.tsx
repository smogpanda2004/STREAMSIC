import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

interface AlbumCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  onPress: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, coverUrl, onPress }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withSpring(1);
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: coverUrl }} style={styles.cover} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageOverlay}
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  cover: {
    width: 160,
    height: 160,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  textContainer: {
    paddingHorizontal: 4,
  },
  title: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
});

export default AlbumCard;