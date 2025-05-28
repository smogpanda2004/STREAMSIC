import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AlbumCard from '@/components/AlbumCard';
import TrackItem from '@/components/TrackItem';
import SectionHeader from '@/components/SectionHeader';
import MiniPlayer from '@/components/MiniPlayer';
import FullScreenPlayer from '@/components/FullScreenPlayer';
import Colors from '@/constants/Colors';

// Mock data
const recentlyPlayed = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
  },
  {
    id: '2',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg',
  },
  {
    id: '3',
    title: 'Chromatica',
    artist: 'Lady Gaga',
    coverUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg',
  },
  {
    id: '4',
    title: 'Fine Line',
    artist: 'Harry Styles',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
];

const recommendedAlbums = [
  {
    id: '5',
    title: 'WHEN WE ALL FALL ASLEEP',
    artist: 'Billie Eilish',
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
  },
  {
    id: '6',
    title: 'Folklore',
    artist: 'Taylor Swift',
    coverUrl: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
  },
  {
    id: '7',
    title: 'DAMN.',
    artist: 'Kendrick Lamar',
    coverUrl: 'https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg',
  },
  {
    id: '8',
    title: 'Plastic Beach',
    artist: 'Gorillaz',
    coverUrl: 'https://images.pexels.com/photos/2261/food-man-person-face.jpg',
  },
];

const popularTracks = [
  {
    id: '9',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
  },
  {
    id: '10',
    title: 'Don\'t Start Now',
    artist: 'Dua Lipa',
    coverUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg',
  },
  {
    id: '11',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
  {
    id: '12',
    title: 'Rain On Me',
    artist: 'Lady Gaga & Ariana Grande',
    coverUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg',
  },
  {
    id: '13',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
  },
];

export default function HomeScreen() {
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SectionHeader title="Recently Played" onSeeAllPress={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {recentlyPlayed.map((album) => (
              <AlbumCard
                key={album.id}
                title={album.title}
                artist={album.artist}
                coverUrl={album.coverUrl}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
          
          <SectionHeader title="Recommended Albums" onSeeAllPress={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {recommendedAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                title={album.title}
                artist={album.artist}
                coverUrl={album.coverUrl}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
          
          <SectionHeader title="Popular Tracks" onSeeAllPress={() => {}} />
          <View style={styles.tracksList}>
            {popularTracks.map((track, index) => (
              <TrackItem
                key={track.id}
                title={track.title}
                artist={track.artist}
                coverUrl={track.coverUrl}
                onPress={() => {}}
                isPlaying={index === 0}
              />
            ))}
          </View>
          
          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
      
      <MiniPlayer onExpand={() => setShowFullPlayer(true)} />
      {showFullPlayer && <FullScreenPlayer onClose={() => setShowFullPlayer(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150, // Extra space for mini player and tab bar
  },
  horizontalScrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  tracksList: {
    marginTop: 12,
  },
  spacer: {
    height: 60,
  },
});