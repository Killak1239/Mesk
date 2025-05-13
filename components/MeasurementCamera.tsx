import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Platform, Text, Pressable, Alert } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { Camera, RefreshCw, Square } from 'lucide-react-native';
import { useMeasurement } from '@/hooks/useMeasurement';
import { useFocusEffect } from 'expo-router';

export default function MeasurementCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef(null);
  const { takeMeasurement, isProcessing } = useMeasurement();
  
  // Request camera permissions when component mounts
  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, []);
  
  // Reset camera when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Camera setup logic when screen is focused
      return () => {
        // Cleanup logic when screen loses focus
      };
    }, [])
  );
  
  const handleToggleFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const handleCapture = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ 
          quality: 0.8,
          skipProcessing: false
        });
        takeMeasurement(photo);
      } catch (e) {
        console.error('Error taking picture:', e);
        Alert.alert('Error', 'Failed to capture image');
      }
    }
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Loading camera...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need camera permission to measure objects
        </Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onMountError={(error) => {
          console.error('Camera error:', error);
          Alert.alert('Camera Error', 'Failed to start camera');
        }}
        enableZoomGesture={true}
      >
        <View style={styles.controlsContainer}>
          <Pressable 
            style={styles.controlButton}
            onPress={handleToggleFacing}
          >
            <RefreshCw color="#FFFFFF" size={24} />
          </Pressable>
          
          <Pressable
            style={[styles.captureButton, isProcessing && styles.captureButtonDisabled]}
            onPress={handleCapture}
            disabled={isProcessing}
          >
            <Square color="#FFFFFF" size={24} />
          </Pressable>
          
          <View style={styles.placeholderButton} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0A84FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  captureButtonDisabled: {
    backgroundColor: '#8E8E93',
  },
  placeholderButton: {
    width: 48,
    height: 48,
  },
});