import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { Home, Library, Search, Settings } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          height: 80,
          paddingBottom: Platform.OS === 'ios' ? 25 : 15,
          paddingTop: 15,
          paddingHorizontal: 20,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView 
              tint="dark" 
              intensity={100} 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
              }} 
            >
              <LinearGradient
                colors={['rgba(36, 36, 36, 0.9)', 'rgba(20, 20, 20, 0.95)']}
                style={{ flex: 1 }}
              />
            </BlurView>
          ) : (
            <LinearGradient
              colors={['rgba(36, 36, 36, 0.95)', 'rgba(20, 20, 20, 0.98)']}
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          )
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size - 2} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => <Library color={color} size={size - 2} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size - 2} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size - 2} strokeWidth={2.5} />,
        }}
      />
    </Tabs>
  );
}