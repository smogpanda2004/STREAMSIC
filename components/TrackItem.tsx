import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MoveVertical as MoreVertical, Play } from 'lucide-react-native';
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
  return (
    <TouchableOpacity 
      style={[styles.container, isPlaying && styles.playingContainer]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: coverUrl }} style={styles.cover} />
      
      <View style={styles.textContainer}>
        <Text style={[styles.title, isPlaying && styles.playingText]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist}
        </Text>
      </View>
      
      {isPlaying && (
        <View style={styles.playingIndicator}>
          <Play size={14} color={Colors.primary} fill={Colors.primary} />
        </View>
      )}
      
      <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
        <MoreVertical size={20} color={Colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  playingContainer: {
    backgroundColor: Colors.elevated,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 3,
  },
  playingText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  playingIndicator: {
    marginRight: 8,
  },
  moreButton: {
    padding: 10,
  },
});

export default TrackItem;