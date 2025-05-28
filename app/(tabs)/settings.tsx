import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Music, Database, Wifi, CloudDownload as DownloadCloud, Moon, LayoutGrid, FileSliders as Sliders, CircleHelp as HelpCircle, Info, LogOut } from 'lucide-react-native';
import MiniPlayer from '@/components/MiniPlayer';
import Colors from '@/constants/Colors';

const settingsSections = [
  {
    title: 'Account',
    items: [
      { id: 'profile', title: 'Profile', icon: Sliders },
      { id: 'servers', title: 'Manage Servers', icon: Database },
      { id: 'streaming', title: 'Streaming Quality', icon: Wifi },
    ],
  },
  {
    title: 'Music',
    items: [
      { id: 'download', title: 'Downloads', icon: DownloadCloud, toggle: true },
      { id: 'equalizer', title: 'Equalizer', icon: Sliders },
      { id: 'theme', title: 'Dark Theme', icon: Moon, toggle: true },
      { id: 'layout', title: 'Display Options', icon: LayoutGrid },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', title: 'Help & Support', icon: HelpCircle },
      { id: 'about', title: 'About STREAMSIC', icon: Info },
      { id: 'logout', title: 'Log Out', icon: LogOut, destructive: true },
    ],
  },
];

export default function SettingsScreen() {
  const [toggleStates, setToggleStates] = useState({
    download: true,
    theme: true,
  });

  const handleToggle = (key: string) => {
    setToggleStates({
      ...toggleStates,
      [key]: !toggleStates[key as keyof typeof toggleStates],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>J</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
          </View>
          
          {settingsSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              
              {section.items.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[
                    styles.settingItem, 
                    item.destructive && styles.destructiveItem
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingIcon}>
                    <item.icon 
                      size={20} 
                      color={item.destructive ? Colors.error : Colors.primary} 
                    />
                  </View>
                  
                  <Text style={[
                    styles.settingTitle,
                    item.destructive && styles.destructiveText
                  ]}>
                    {item.title}
                  </Text>
                  
                  {item.toggle ? (
                    <Switch
                      value={toggleStates[item.id as keyof typeof toggleStates]}
                      onValueChange={() => handleToggle(item.id)}
                      trackColor={{ false: Colors.border, true: Colors.primary }}
                      thumbColor={Colors.text}
                    />
                  ) : (
                    <ChevronRight 
                      size={20} 
                      color={item.destructive ? Colors.error : Colors.textSecondary} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>STREAMSIC v1.0.0</Text>
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150, // Extra space for mini player and tab bar
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.elevated,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  destructiveItem: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
    paddingTop: 16,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.elevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  destructiveText: {
    color: Colors.error,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  spacer: {
    height: 60,
  },
});