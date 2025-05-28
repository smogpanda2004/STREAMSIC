import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Album as Albums, Music, Play as PlaylistAdd, Radio, Clock, Download, Star, Heart } from 'lucide-react-native';
import TrackItem from '@/components/TrackItem';
import SectionHeader from '@/components/SectionHeader';
import MiniPlayer from '@/components/MiniPlayer';
import Colors from '@/constants/Colors';

// Mock data
const recentlyAdded = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
  },
  {
    id: '2',
    title: 'Don\'t Start Now',
    artist: 'Dua Lipa',
    coverUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg',
  },
  {
    id: '3',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
];

const libraryCategories = [
  { id: '1', title: 'Albums', icon: Albums },
  { id: '2', title: 'Songs', icon: Music },
  { id: '3', title: 'Playlists', icon: PlaylistAdd },
  { id: '4', title: 'Radio', icon: Radio },
  { id: '5', title: 'Recently Played', icon: Clock },
  { id: '6', title: 'Downloaded', icon: Download },
  { id: '7', title: 'Favorites', icon: Heart },
];

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Library</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.categories}>
            {libraryCategories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryItem}
                activeOpacity={0.7}
              >
                <View style={styles.categoryIcon}>
                  <category.icon size={20} color={Colors.text} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <SectionHeader 
            title="Recently Added" 
            onSeeAllPress={() => {}} 
          />
          
          <View style={styles.tracksList}>
            {recentlyAdded.map((track) => (
              <TrackItem
                key={track.id}
                title={track.title}
                artist={track.artist}
                coverUrl={track.coverUrl}
                onPress={() => {}}
              />
            ))}
          </View>
          
          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
      
      <MiniPlayer onExpand={() => {}} />
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150, // Extra space for mini player and tab bar
  },
  categories: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.elevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  tracksList: {
    marginTop: 12,
  },
  spacer: {
    height: 60,
  },
});