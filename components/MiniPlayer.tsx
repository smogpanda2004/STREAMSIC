import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Play, Pause, SkipForward, Heart } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface MiniPlayerProps {
  onExpand: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onExpand }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const scale = useSharedValue(1);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <TouchableOpacity 
      onPress={onExpand} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={styles.touchable}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <LinearGradient
            colors={['rgba(36, 36, 36, 0.9)', 'rgba(20, 20, 20, 0.9)']}
            style={styles.gradient}
          >
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '35%' }]} />
            </View>
            
            <View style={styles.content}>
              <View style={styles.songInfo}>
                <View style={styles.albumArtContainer}>
                  <Image
                    source={{ uri: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg' }}
                    style={styles.albumArt}
                  />
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={styles.songTitle} numberOfLines={1}>
                    Quantum Entanglement
                  </Text>
                  <Text style={styles.artistName} numberOfLines={1}>
                    Physics & Poetry
                  </Text>
                </View>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity onPress={toggleFavorite} style={styles.controlButton}>
                  <Heart
                    size={18}
                    color={isFavorite ? Colors.error : Colors.textTertiary}
                    fill={isFavorite ? Colors.error : 'transparent'}
                  />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
                  <LinearGradient
                    colors={Colors.gradientPrimary}
                    style={styles.playButtonGradient}
                  >
                    {isPlaying ? (
                      <Pause size={16} color={Colors.background} />
                    ) : (
                      <Play size={16} color={Colors.background} fill={Colors.background} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.controlButton}>
                  <SkipForward size={18} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    bottom: 80,
    left: 12,
    right: 12,
    zIndex: 50,
  },
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  blurContainer: {
    overflow: 'hidden',
  },
  gradient: {
    paddingTop: 2,
  },
  progressBar: {
    height: 2,
    backgroundColor: Colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  albumArtContainer: {
    marginRight: 12,
  },
  albumArt: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  textContainer: {
    flex: 1,
  },
  songTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: -0.1,
  },
  artistName: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    marginHorizontal: 4,
  },
  playButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MiniPlayer;