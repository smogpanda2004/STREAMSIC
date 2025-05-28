import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search as SearchIcon, X } from 'lucide-react-native';
import AlbumCard from '@/components/AlbumCard';
import TrackItem from '@/components/TrackItem';
import SectionHeader from '@/components/SectionHeader';
import MiniPlayer from '@/components/MiniPlayer';
import Colors from '@/constants/Colors';

// Mock data for genres
const genres = [
  { id: '1', name: 'Pop', color: '#8669F2' },
  { id: '2', name: 'Hip Hop', color: '#E84545' },
  { id: '3', name: 'Rock', color: '#FF9800' },
  { id: '4', name: 'Electronic', color: '#1DB954' },
  { id: '5', name: 'R&B', color: '#5D4CDE' },
  { id: '6', name: 'Jazz', color: '#00BCD4' },
];

// Mock data for search results
const searchResults = {
  tracks: [
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
  ],
  albums: [
    {
      id: '3',
      title: 'After Hours',
      artist: 'The Weeknd',
      coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
    },
    {
      id: '4',
      title: 'Future Nostalgia',
      artist: 'Dua Lipa',
      coverUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg',
    },
  ],
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsSearching(text.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search</Text>
          <View style={styles.searchContainer}>
            <SearchIcon size={20} color={Colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Artists, songs, or albums"
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={handleSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <X size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {!isSearching ? (
            <View>
              <SectionHeader title="Browse Genres\" showSeeAll={false} />
              <View style={styles.genresGrid}>
                {genres.map((genre) => (
                  <TouchableOpacity 
                    key={genre.id} 
                    style={[styles.genreItem, { backgroundColor: genre.color }]}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.genreName}>{genre.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <SectionHeader title="Popular Searches" onSeeAllPress={() => {}} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {searchResults.albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    title={album.title}
                    artist={album.artist}
                    coverUrl={album.coverUrl}
                    onPress={() => {}}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View>
              <SectionHeader title="Top Results" showSeeAll={false} />
              <View style={styles.tracksList}>
                {searchResults.tracks.map((track) => (
                  <TrackItem
                    key={track.id}
                    title={track.title}
                    artist={track.artist}
                    coverUrl={track.coverUrl}
                    onPress={() => {}}
                  />
                ))}
              </View>
              
              <SectionHeader title="Albums" onSeeAllPress={() => {}} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {searchResults.albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    title={album.title}
                    artist={album.artist}
                    coverUrl={album.coverUrl}
                    onPress={() => {}}
                  />
                ))}
              </ScrollView>
            </View>
          )}
          
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.elevated,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150, // Extra space for mini player and tab bar
  },
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  genreItem: {
    width: '46%',
    height: 80,
    margin: '2%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  genreName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
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