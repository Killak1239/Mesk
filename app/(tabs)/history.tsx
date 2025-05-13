import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trash2, Search, FilterX } from 'lucide-react-native';
import { useStoredMeasurements } from '@/hooks/useStoredMeasurements';
import EmptyState from '@/components/EmptyState';
import { formatDate } from '@/utils/dateUtils';
import MeasurementItem from '@/components/MeasurementItem';
import SearchBar from '@/components/SearchBar';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { measurements, deleteMeasurement } = useStoredMeasurements();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const filteredMeasurements = searchQuery
    ? measurements.filter(m => m.label?.toLowerCase().includes(searchQuery.toLowerCase()))
    : measurements;
  
  const renderItem = ({ item }) => (
    <MeasurementItem 
      item={item} 
      onDelete={() => deleteMeasurement(item.id)} 
    />
  );
  
  const backgroundColor = isDark ? '#1C1C1E' : '#F2F2F7';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor }]}>
      <View style={styles.header}>
        {isSearching ? (
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => {
              setSearchQuery('');
              setIsSearching(false);
            }}
          />
        ) : (
          <>
            <Text style={[styles.title, { color: textColor }]}>Measurement History</Text>
            <Pressable 
              hitSlop={8} 
              onPress={() => setIsSearching(true)}
              style={styles.searchButton}
            >
              <Search size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </Pressable>
          </>
        )}
      </View>
      
      {measurements.length === 0 ? (
        <EmptyState 
          title="No measurements yet"
          message="Your measurement history will appear here"
          icon="history"
        />
      ) : (
        <>
          {searchQuery && filteredMeasurements.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <FilterX size={48} color={isDark ? '#8E8E93' : '#3A3A3C'} />
              <Text style={[styles.noResultsText, { color: textColor }]}>
                No measurements match "{searchQuery}"
              </Text>
              <Pressable 
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>Clear Search</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList
              data={filteredMeasurements}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(120, 120, 128, 0.3)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchButton: {
    padding: 8,
  },
  listContent: {
    padding: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
  },
  clearButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#0A84FF',
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});