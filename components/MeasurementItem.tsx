import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, useColorScheme } from 'react-native';
import { Trash2, Edit2 } from 'lucide-react-native';
import { formatDate } from '@/utils/dateUtils';

export default function MeasurementItem({ item, onDelete }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#2C2C2E' : '#FFFFFF' }
    ]}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageUri }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.value} {item.unit}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text 
            style={[
              styles.title, 
              { color: isDark ? '#FFFFFF' : '#000000' }
            ]}
          >
            {item.label || 'Unnamed measurement'}
          </Text>
          <Text 
            style={[
              styles.timestamp, 
              { color: isDark ? '#8E8E93' : '#6C6C70' }
            ]}
          >
            {formatDate(item.timestamp)}
          </Text>
        </View>
        
        {item.objectDetails && (
          <Text 
            style={[
              styles.details, 
              { color: isDark ? '#CCCCCC' : '#3A3A3C' }
            ]}
          >
            {item.objectDetails}
          </Text>
        )}
        
        <View style={styles.actionsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: isDark ? '#3A3A3C' : '#E5E5EA' },
              pressed && { opacity: 0.8 }
            ]}
          >
            <Edit2 size={16} color={isDark ? '#FFFFFF' : '#000000'} />
            <Text 
              style={[
                styles.actionText, 
                { color: isDark ? '#FFFFFF' : '#000000' }
              ]}
            >
              Edit
            </Text>
          </Pressable>
          
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: '#FF3B30' },
              pressed && { opacity: 0.8 }
            ]}
            onPress={onDelete}
          >
            <Trash2 size={16} color="#FFFFFF" />
            <Text style={[styles.actionText, { color: '#FFFFFF' }]}>
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#0A84FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  infoContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 14,
  },
  details: {
    fontSize: 14,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionText: {
    marginLeft: 6,
    fontWeight: '500',
    fontSize: 14,
  },
});