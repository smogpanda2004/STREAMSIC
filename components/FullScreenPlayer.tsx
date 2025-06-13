import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { Play, Pause, SkipForward, SkipBack, Heart, Volume2, ListMusic, ChevronDown, Repeat, Shuffle } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Slider from '@/components/ui/Slider';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface FullScreenPlayerProps {
  onClose: () => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0.3); // 0 to 1
  const [volume, setVolume] = useState(0.8); // 0 to 1
  const [isSeekingProgress, setIsSeekingProgress] = useState(false);
  const [isSeekingVolume, setIsSeekingVolume] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalDuration = 237; // 3:57 in seconds
  const currentTime = totalDuration * progress;

  const handleProgressChange = (value: number) => {
    setProgress(value);
    // In a real app, you would seek to this position in the audio
    console.log('Seeking to:', formatTime(totalDuration * value));
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    // In a real app, you would set the audio volume
    console.log('Volume changed to:', Math.round(value * 100) + '%');
  };

  const handleProgressSlidingStart = () => {
    setIsSeekingProgress(true);
    // In a real app, you might pause playback during seeking
  };

  const handleProgressSlidingComplete = () => {
    setIsSeekingProgress(false);
    // In a real app, you would resume playback and seek to the new position
  };

  const handleVolumeSlidingStart = () => {
    setIsSeekingVolume(true);
  };

  const handleVolumeSlidingComplete = () => {
    setIsSeekingVolume(false);
  };

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          scale: withTiming(isPlaying ? 1 : 0.9, { 
            duration: 150, 
            easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
          }) 
        }
      ],
    };
  });

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', Colors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <ChevronDown size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity style={styles.queueButton}>
          <ListMusic size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.albumContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg' }}
          style={styles.albumArt}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.songTitle}>Midnight City</Text>
            <Text style={styles.artistName}>M83</Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite}>
            <Heart
              size={24}
              color={isFavorite ? Colors.error : Colors.textSecondary}
              fill={isFavorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Slider
            value={progress}
            onValueChange={handleProgressChange}
            onSlidingStart={handleProgressSlidingStart}
            onSlidingComplete={handleProgressSlidingComplete}
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

        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={toggleShuffle} style={styles.secondaryButton}>
            <Shuffle 
              size={20} 
              color={isShuffle ? Colors.primary : Colors.textSecondary} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <SkipBack size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
            <Animated.View style={animatedIconStyle}>
              {isPlaying ? (
                <Pause size={28} color={Colors.text} />
              ) : (
                <Play size={28} color={Colors.text} fill={Colors.text} />
              )}
            </Animated.View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <SkipForward size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={toggleRepeat} style={styles.secondaryButton}>
            <Repeat 
              size={20} 
              color={isRepeat ? Colors.primary : Colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.volumeContainer}>
          <Volume2 size={18} color={Colors.textSecondary} />
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            onSlidingStart={handleVolumeSlidingStart}
            onSlidingComplete={handleVolumeSlidingComplete}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor={Colors.border}
            thumbTintColor={Colors.text}
            style={styles.volumeSlider}
          />
          <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
        </View>
      </View>
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
    paddingTop: 50,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  queueButton: {
    padding: 8,
  },
  albumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  infoContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  songTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  artistName: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressSlider: {
    marginHorizontal: -10, // Extend touch area
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  timeText: {
    color: Colors.textSecondary,
    fontSize: 12,
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
    padding: 10,
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    backgroundColor: Colors.secondary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 12,
  },
  volumeText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    minWidth: 35,
    textAlign: 'right',
  },
});

export default FullScreenPlayer;