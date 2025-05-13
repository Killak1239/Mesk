import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { History, Camera, Settings } from 'lucide-react-native';

type EmptyStateProps = {
  title: string;
  message: string;
  icon: 'history' | 'camera' | 'settings';
};

export default function EmptyState({ title, message, icon }: EmptyStateProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const renderIcon = () => {
    const iconColor = isDark ? '#8E8E93' : '#3A3A3C';
    const iconSize = 64;
    
    switch(icon) {
      case 'history':
        return <History size={iconSize} color={iconColor} />;
      case 'camera':
        return <Camera size={iconSize} color={iconColor} />;
      case 'settings':
        return <Settings size={iconSize} color={iconColor} />;
      default:
        return <History size={iconSize} color={iconColor} />;
    }
  };
  
  return (
    <View style={styles.container}>
      {renderIcon()}
      <Text 
        style={[
          styles.title, 
          { color: isDark ? '#FFFFFF' : '#000000' }
        ]}
      >
        {title}
      </Text>
      <Text 
        style={[
          styles.message, 
          { color: isDark ? '#8E8E93' : '#6C6C70' }
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 280,
  },
});