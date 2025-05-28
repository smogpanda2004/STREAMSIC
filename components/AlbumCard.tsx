import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface AlbumCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  onPress: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, coverUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: coverUrl }} style={styles.cover} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 16,
  },
  cover: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  textContainer: {
    paddingHorizontal: 4,
  },
  title: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});

export default AlbumCard;