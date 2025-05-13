import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Measurement } from '@/contexts/MeasurementContext';

// Mock data for demonstration
const MOCK_MEASUREMENTS: Measurement[] = [
  {
    id: 'meas-1',
    value: 12.5,
    unit: 'cm',
    imageUri: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
    label: 'Coffee Table',
    objectName: 'Table',
    objectDetails: 'Wooden coffee table, rectangular shape',
    points: [],
  },
  {
    id: 'meas-2',
    value: 6.2,
    unit: 'in',
    imageUri: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    label: 'Book Width',
    objectName: 'Book',
    objectDetails: 'Hardcover book, medium size',
    points: [],
  },
  {
    id: 'meas-3',
    value: 155.3,
    unit: 'cm',
    imageUri: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    label: 'Wall Length',
    objectName: 'Wall',
    objectDetails: 'Living room east wall, white paint',
    points: [],
  },
];

export function useStoredMeasurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>(MOCK_MEASUREMENTS);
  
  const addMeasurement = (measurement: Measurement) => {
    setMeasurements(prev => [measurement, ...prev]);
  };
  
  const updateMeasurement = (updatedMeasurement: Measurement) => {
    setMeasurements(prev => 
      prev.map(m => m.id === updatedMeasurement.id ? updatedMeasurement : m)
    );
  };
  
  const deleteMeasurement = (id: string) => {
    Alert.alert(
      'Delete Measurement',
      'Are you sure you want to delete this measurement?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMeasurements(prev => prev.filter(m => m.id !== id));
          },
        },
      ]
    );
  };
  
  return {
    measurements,
    addMeasurement,
    updateMeasurement,
    deleteMeasurement,
  };
}