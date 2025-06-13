import React from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';

interface SliderProps {
  value: number; // 0 to 1
  onValueChange: (value: number) => void;
  onSlidingStart?: () => void;
  onSlidingComplete?: () => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: any;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  minimumTrackTintColor = Colors.primary,
  maximumTrackTintColor = Colors.border,
  thumbTintColor = Colors.text,
  style,
  disabled = false,
}) => {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const thumbSize = useSharedValue(12);
  const isDragging = React.useRef(false);
  const currentValue = React.useRef(value);

  // Update current value when prop changes
  React.useEffect(() => {
    if (!isDragging.current) {
      currentValue.current = value;
    }
  }, [value]);

  const calculateValueFromPosition = (x: number) => {
    'worklet';
    if (containerWidth === 0) return 0;
    const newValue = Math.max(0, Math.min(1, x / containerWidth));
    return newValue;
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      
      onPanResponderGrant: (evt) => {
        if (disabled) return;
        
        isDragging.current = true;
        thumbSize.value = withTiming(16, { duration: 150 });
        
        if (onSlidingStart) {
          onSlidingStart();
        }

        // Calculate initial position
        const x = evt.nativeEvent.locationX;
        const newValue = calculateValueFromPosition(x);
        currentValue.current = newValue;
        onValueChange(newValue);
      },
      
      onPanResponderMove: (evt, gestureState) => {
        if (disabled) return;
        
        const x = evt.nativeEvent.locationX;
        const newValue = calculateValueFromPosition(x);
        currentValue.current = newValue;
        onValueChange(newValue);
      },
      
      onPanResponderRelease: () => {
        if (disabled) return;
        
        isDragging.current = false;
        thumbSize.value = withTiming(12, { duration: 150 });
        
        if (onSlidingComplete) {
          onSlidingComplete();
        }
      },
      
      onPanResponderTerminate: () => {
        if (disabled) return;
        
        isDragging.current = false;
        thumbSize.value = withTiming(12, { duration: 150 });
        
        if (onSlidingComplete) {
          onSlidingComplete();
        }
      },
    })
  ).current;

  const onLayout = (event: any) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const thumbPosition = (isDragging.current ? currentValue.current : value) * containerWidth;
    
    return {
      width: thumbSize.value,
      height: thumbSize.value,
      borderRadius: thumbSize.value / 2,
      transform: [
        { translateX: thumbPosition - thumbSize.value / 2 },
      ],
    };
  });

  const fillAnimatedStyle = useAnimatedStyle(() => {
    const fillWidth = (isDragging.current ? currentValue.current : value) * containerWidth;
    
    return {
      width: Math.max(0, fillWidth),
    };
  });

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      <View 
        style={[styles.track, { backgroundColor: maximumTrackTintColor }]}
        {...panResponder.panHandlers}
      >
        <Animated.View 
          style={[
            styles.filledTrack, 
            { backgroundColor: minimumTrackTintColor },
            fillAnimatedStyle
          ]}
        />
        <Animated.View 
          style={[
            styles.thumb, 
            { backgroundColor: thumbTintColor },
            thumbAnimatedStyle
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
  },
  filledTrack: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
    left: 0,
    top: 0,
  },
  thumb: {
    position: 'absolute',
    top: -4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default Slider;