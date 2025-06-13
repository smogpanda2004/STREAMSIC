import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onSeeAllPress?: () => void;
  showSeeAll?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle,
  onSeeAllPress, 
  showSeeAll = true 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      
      {showSeeAll && (
        <Animated.View entering={FadeInRight.delay(200)}>
          <TouchableOpacity 
            style={styles.seeAllButton} 
            onPress={onSeeAllPress}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Colors.primary} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 32,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontWeight: '400',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    marginRight: 4,
    fontWeight: '500',
  },
});

export default SectionHeader;