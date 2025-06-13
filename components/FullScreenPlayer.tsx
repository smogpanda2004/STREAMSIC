import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Play, Pause, SkipForward, SkipBack, Heart, Volume2, ListMusic, ChevronDown, Repeat, Shuffle, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, Easing, FadeIn, FadeOut, SlideInUp, SlideOutDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Slider from '@/components/ui/Slider';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface FullScreenPlayerProps {
  onClose: () => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [volume, setVolume] = useState(0.8);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleRepeat = () => setIsRepeat(!isRepeat);
  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalDuration = 247; // 4:07 in seconds
  const currentTime = totalDuration * progress;

  const handleProgressChange = (value: number) => {
    setProgress(value);
    console.log('Seeking to:', formatTime(totalDuration * value));
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    console.log('Volume changed to:', Math.round(value * 100) + '%');
  };

  return (
    <Animated.View 
      style={styles.container}
      entering={SlideInUp.duration(400)}
      exiting={SlideOutDown.duration(300)}
    >
      <LinearGradient
        colors={['#2D1B69', '#0A0A0A']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
      
      {/* Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeIn.delay(200)}
      >
        <TouchableOpacity onPress={onClose} style={styles.headerButton}>
          <ChevronDown size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <Text style={styles.headerSubtitle}>from Ethereal Nights</Text>
        </View>
        
        <TouchableOpacity style={styles.headerButton}>
          <MoreHorizontal size={20} color={Colors.text} />
        </TouchableOpacity>
      </Animated.View>

      {/* Album Art */}
      <Animated.View 
        style={styles.albumContainer}
        entering={FadeIn.delay(400).duration(800)}
      >
        <View style={styles.albumArtWrapper}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg' }}
            style={styles.albumArt}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.albumOverlay}
          />
        </View>
      </Animated.View>

      {/* Track Info */}
      <Animated.View 
        style={styles.infoContainer}
        entering={FadeIn.delay(600).duration(800)}
      >
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.songTitle}>Quantum Entanglement</Text>
            <Text style={styles.artistName}>Physics & Poetry</Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Heart
              size={24}
              color={isFavorite ? Colors.error : Colors.textSecondary}
              fill={isFavorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <Slider
            value={progress}
            onValueChange={handleProgressChange}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor={Colors.border}
            thumbTintColor={Colors.text}
            style={styles.progressSlider}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={toggleShuffle} style={styles.secondaryButton}>
            <Shuffle 
              size={20} 
              color={isShuffle ? Colors.primary : Colors.textTertiary} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <SkipBack size={28} color={Colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
            <LinearGradient
              colors={Colors.gradientPrimary}
              style={styles.playButtonGradient}
            >
              {isPlaying ? (
                <Pause size={32} color={Colors.background} />
              ) : (
                <Play size={32} color={Colors.background} fill={Colors.background} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <SkipForward size={28} color={Colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={toggleRepeat} style={styles.secondaryButton}>
            <Repeat 
              size={20} 
              color={isRepeat ? Colors.primary : Colors.textTertiary} 
            />
          </TouchableOpacity>
        </View>

        {/* Volume */}
        <View style={styles.volumeContainer}>
          <Volume2 size={18} color={Colors.textSecondary} />
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor={Colors.border}
            thumbTintColor={Colors.text}
            style={styles.volumeSlider}
          />
          <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: Colors.textTertiary,
    fontSize: 12,
    marginTop: 2,
  },
  albumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
    flex: 1,
  },
  albumArtWrapper: {
    position: 'relative',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  albumOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  songTitle: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  artistName: {
    color: Colors.textSecondary,
    fontSize: 18,
    fontWeight: '400',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressSlider: {
    marginHorizontal: -10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  timeText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  secondaryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  playButtonGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 16,
  },
  volumeText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    minWidth: 40,
    textAlign: 'right',
  },
});

export default FullScreenPlayer;