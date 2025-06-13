import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AlbumCard from '@/components/AlbumCard';
import TrackItem from '@/components/TrackItem';
import SectionHeader from '@/components/SectionHeader';
import MiniPlayer from '@/components/MiniPlayer';
import FullScreenPlayer from '@/components/FullScreenPlayer';
import HeroSection from '@/components/HeroSection';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Enhanced mock data with more sophisticated content
const featuredContent = {
  id: 'featured-1',
  title: 'Ethereal Nights',
  artist: 'Neon Dreams',
  description: 'A journey through ambient soundscapes',
  coverUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
  gradient: ['#6B46C1', '#EC4899'],
};

const recentlyPlayed = [
  {
    id: '1',
    title: 'Midnight Reverie',
    artist: 'Luna Eclipse',
    coverUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
  },
  {
    id: '2',
    title: 'Digital Horizons',
    artist: 'Cyber Collective',
    coverUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg',
  },
  {
    id: '3',
    title: 'Neon Pulse',
    artist: 'Synthwave Society',
    coverUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg',
  },
  {
    id: '4',
    title: 'Cosmic Drift',
    artist: 'Stellar Sounds',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
];

const curatedPlaylists = [
  {
    id: '5',
    title: 'Abstract Emotions',
    artist: 'Curated Collection',
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
  },
  {
    id: '6',
    title: 'Minimalist Moods',
    artist: 'Essential Listening',
    coverUrl: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
  },
  {
    id: '7',
    title: 'Future Frequencies',
    artist: 'Tomorrow\'s Sound',
    coverUrl: 'https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg',
  },
];

const trendingNow = [
  {
    id: '9',
    title: 'Quantum Entanglement',
    artist: 'Physics & Poetry',
    coverUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
  },
  {
    id: '10',
    title: 'Binary Dreams',
    artist: 'Digital Natives',
    coverUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg',
  },
  {
    id: '11',
    title: 'Holographic Love',
    artist: 'Virtual Reality',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
  {
    id: '12',
    title: 'Neural Networks',
    artist: 'AI Symphony',
    coverUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg',
  },
];

export default function HomeScreen() {
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={Colors.gradientBackground}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <HeroSection content={featuredContent} />
          
          <View style={styles.contentContainer}>
            <SectionHeader 
              title="Recently Played" 
              subtitle="Pick up where you left off"
              onSeeAllPress={() => {}} 
            />
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
            
            <SectionHeader 
              title="Curated for You" 
              subtitle="Handpicked collections"
              onSeeAllPress={() => {}} 
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {curatedPlaylists.map((album) => (
                <AlbumCard
                  key={album.id}
                  title={album.title}
                  artist={album.artist}
                  coverUrl={album.coverUrl}
                  onPress={() => {}}
                />
              ))}
            </ScrollView>
            
            <SectionHeader 
              title="Trending Now" 
              subtitle="What's moving the world"
              onSeeAllPress={() => {}} 
            />
            <View style={styles.tracksList}>
              {trendingNow.map((track, index) => (
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150,
  },
  contentContainer: {
    paddingTop: 20,
  },
  horizontalScrollContent: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  tracksList: {
    marginTop: 16,
  },
  spacer: {
    height: 80,
  },
});