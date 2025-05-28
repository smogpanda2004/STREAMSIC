import React from 'react';
import { View, StyleSheet, PanResponder, GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

interface SliderProps {
  value: number; // 0 to 1
  onValueChange: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: any;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumTrackTintColor = Colors.primary,
  maximumTrackTintColor = Colors.border,
  thumbTintColor = Colors.text,
  style,
}) => {
  const [width, setWidth] = React.useState(0);
  const thumbSize = 12;
  const activeThumbSize = 16;
  const thumbAnim = useSharedValue(thumbSize);
  const isTracking = React.useRef(false);

  const calculatePosition = (x: number) => {
    const newValue = Math.max(0, Math.min(1, x / width));
    onValueChange(newValue);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isTracking.current = true;
        thumbAnim.value = withTiming(activeThumbSize, { duration: 150 });
      },
      onPanResponderMove: (_, gestureState) => {
        calculatePosition(gestureState.moveX - gestureState.x0);
      },
      onPanResponderRelease: () => {
        isTracking.current = false;
        thumbAnim.value = withTiming(thumbSize, { duration: 150 });
      },
      onPanResponderTerminate: () => {
        isTracking.current = false;
        thumbAnim.value = withTiming(thumbSize, { duration: 150 });
      },
    })
  ).current;

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: thumbAnim.value,
      height: thumbAnim.value,
      borderRadius: thumbAnim.value / 2,
      transform: [
        { translateX: -thumbAnim.value / 2 },
      ],
    };
  });

  return (
    <View style={[styles.container, style]} {...panResponder.panHandlers} onLayout={onLayout}>
      <View 
        style={[
          styles.track, 
          { backgroundColor: maximumTrackTintColor }
        ]}
      />
      <View 
        style={[
          styles.filledTrack, 
          { 
            backgroundColor: minimumTrackTintColor,
            width: `${value * 100}%`,
          }
        ]}
      />
      <Animated.View 
        style={[
          styles.thumb, 
          thumbAnimatedStyle,
          { 
            backgroundColor: thumbTintColor,
            left: `${value * 100}%`,
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    justifyContent: 'center',
  },
  track: {
    height: 3,
    borderRadius: 2,
  },
  filledTrack: {
    position: 'absolute',
    height: 3,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default Slider;