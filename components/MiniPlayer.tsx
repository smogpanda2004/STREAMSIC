import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface MiniPlayerProps {
  onExpand: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onExpand }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          scale: withTiming(isPlaying ? 1 : 0.8, { 
            duration: 150, 
            easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
          }) 
        }
      ],
    };
  });

  return (
    <TouchableOpacity onPress={onExpand} activeOpacity={0.9}>
      <LinearGradient
        colors={[Colors.card, Colors.elevated]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.songInfo}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg' }}
            style={styles.albumArt}
          />
          <View style={styles.textContainer}>
            <Text style={styles.songTitle} numberOfLines={1}>
              Midnight City
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              M83
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={toggleFavorite} style={styles.controlButton}>
            <Heart
              size={20}
              color={isFavorite ? Colors.error : Colors.textSecondary}
              fill={isFavorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
            <Animated.View style={animatedIconStyle}>
              {isPlaying ? (
                <Pause size={20} color={Colors.text} />
              ) : (
                <Play size={20} color={Colors.text} />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70, // Positioned above the tab bar
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  albumArt: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  songTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  artistName: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    marginHorizontal: 8,
    padding: 8,
  },
  playButton: {
    backgroundColor: Colors.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default MiniPlayer;