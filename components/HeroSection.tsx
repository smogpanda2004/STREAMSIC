import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Plus } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface HeroSectionProps {
  content: {
    id: string;
    title: string;
    artist: string;
    description: string;
    coverUrl: string;
    gradient: string[];
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: content.coverUrl }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <LinearGradient
          colors={['rgba(10,10,10,0.3)', 'rgba(10,10,10,0.9)']}
          style={styles.overlay}
        />
        
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInUp.delay(200).duration(800)}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>FEATURED</Text>
          </Animated.View>
          
          <Animated.Text 
            entering={FadeInUp.delay(400).duration(800)}
            style={styles.title}
          >
            {content.title}
          </Animated.Text>
          
          <Animated.Text 
            entering={FadeInUp.delay(600).duration(800)}
            style={styles.artist}
          >
            {content.artist}
          </Animated.Text>
          
          <Animated.Text 
            entering={FadeInUp.delay(800).duration(800)}
            style={styles.description}
          >
            {content.description}
          </Animated.Text>
          
          <Animated.View 
            entering={FadeInDown.delay(1000).duration(800)}
            style={styles.actions}
          >
            <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
              <LinearGradient
                colors={Colors.gradientPrimary}
                style={styles.playButtonGradient}
              >
                <Play size={24} color={Colors.background} fill={Colors.background} />
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
              <Plus size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        <View style={styles.bottomGradient}>
          <LinearGradient
            colors={['transparent', Colors.background]}
            style={styles.fadeGradient}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.6,
    width: width,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    zIndex: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: Colors.background,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  artist: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginBottom: 24,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  playButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  fadeGradient: {
    flex: 1,
  },
});

export default HeroSection;