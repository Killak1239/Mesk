import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { X, Search } from 'lucide-react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
};

export default function SearchBar({ 
  value, 
  onChangeText, 
  onClear,
  placeholder = 'Search measurements'
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const inputRef = React.useRef(null);
  
  React.useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer,
        { backgroundColor: isDark ? '#3A3A3C' : '#E5E5EA' }
      ]}>
        <Search 
          size={18} 
          color={isDark ? '#8E8E93' : '#3A3A3C'} 
          style={styles.searchIcon} 
        />
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            { color: isDark ? '#FFFFFF' : '#000000' }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#8E8E93' : '#6C6C70'}
          returnKeyType="search"
          clearButtonMode="never"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <Pressable 
            onPress={onClear}
            hitSlop={8}
          >
            <X size={18} color={isDark ? '#8E8E93' : '#3A3A3C'} />
          </Pressable>
        )}
      </View>
      <Pressable
        onPress={onClear}
        hitSlop={8}
        style={styles.cancelButton}
      >
        <Text 
          style={[
            styles.cancelText,
            { color: '#0A84FF' }
          ]}
        >
          Cancel
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
});