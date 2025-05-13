import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MeasurementCamera from '@/components/MeasurementCamera';
import MeasurementOverlay from '@/components/MeasurementOverlay';
import { MeasurementProvider } from '@/contexts/MeasurementContext';
import { useMeasurement } from '@/hooks/useMeasurement';
import { CameraRulersLogo } from '@/components/CameraRulersLogo';

export default function MeasureScreen() {
  const insets = useSafeAreaInsets();
  const { isProcessing, currentUnit, toggleUnit } = useMeasurement();
  
  return (
    <MeasurementProvider>
      <View 
        style={[
          styles.container, 
          { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }
        ]}
      >
        <StatusBar style="light" />
        
        <View style={styles.header}>
          <CameraRulersLogo size={36} />
          <Text style={styles.title}>MeasureX</Text>
          <Pressable 
            style={styles.unitToggle}
            onPress={toggleUnit}
          >
            <Text style={styles.unitText}>{currentUnit}</Text>
          </Pressable>
        </View>
        
        <View style={styles.cameraContainer}>
          <MeasurementCamera />
          <MeasurementOverlay />
          
          {isProcessing && (
            <View style={styles.processingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.processingText}>Processing...</Text>
            </View>
          )}
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Position your device perpendicular to the object and tap to measure
          </Text>
        </View>
      </View>
    </MeasurementProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  unitToggle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  unitText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 12,
    fontWeight: '600',
  },
  instructionsContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  instructionsText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});