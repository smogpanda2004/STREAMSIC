import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MoreHorizontal, Play, Pause } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

interface TrackItemProps {
  title: string;
  artist: string;
  coverUrl: string;
  onPress: () => void;
  onMorePress?: () => void;
  isPlaying?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ 
  title, 
  artist, 
  coverUrl, 
  onPress, 
  onMorePress,
  isPlaying = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        {isPlaying && (
          <LinearGradient
            colors={[Colors.glow, 'transparent']}
            style={styles.playingGlow}
          />
        )}
        
        <View style={styles.coverContainer}>
          <Image source={{ uri: coverUrl }} style={styles.cover} />
          {isPlaying && (
            <View style={styles.playingOverlay}>
              <View style={styles.playingIndicator}>
                <Pause size={12} color={Colors.background} fill={Colors.background} />
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, isPlaying && styles.playingText]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {artist}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
          <MoreHorizontal size={18} color={Colors.textTertiary} />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'relative',
  },
  playingGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 12,
  },
  coverContainer: {
    position: 'relative',
    marginRight: 16,
  },
  cover: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  playingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
  },
  playingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  playingText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '400',
  },
  moreButton: {
    padding: 12,
    marginRight: -8,
  },
});

export default TrackItem;