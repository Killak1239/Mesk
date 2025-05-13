import React, { createContext, useState, useRef } from 'react';
import { Animated } from 'react-native';
import { nanoid } from '@/utils/nanoid';

export type Point = {
  x: number;
  y: number;
};

export type Measurement = {
  id: string;
  value: number;
  unit: string;
  imageUri?: string;
  timestamp: number;
  label?: string;
  objectName?: string;
  objectDetails?: string;
  points: Point[];
};

type MeasurementContextType = {
  measurements: Measurement[];
  activeMeasurement: Measurement | null;
  measurementPoints: Point[];
  isProcessing: boolean;
  currentUnit: string;
  lineAnimation: Animated.Value;
  resultAnimation: Animated.Value;
  addMeasurementPoint: (point: Point) => void;
  clearMeasurementPoints: () => void;
  takeMeasurement: (photo: { uri: string }) => void;
  saveMeasurement: (measurement: Partial<Measurement>) => void;
  deleteMeasurement: (id: string) => void;
  toggleUnit: () => void;
};

export const MeasurementContext = createContext<MeasurementContextType>({
  measurements: [],
  activeMeasurement: null,
  measurementPoints: [],
  isProcessing: false,
  currentUnit: 'cm',
  lineAnimation: new Animated.Value(0),
  resultAnimation: new Animated.Value(0),
  addMeasurementPoint: () => {},
  clearMeasurementPoints: () => {},
  takeMeasurement: () => {},
  saveMeasurement: () => {},
  deleteMeasurement: () => {},
  toggleUnit: () => {},
});

// Mock data for the AI measurement simulation
const MOCK_OBJECTS = [
  { name: 'Smartphone', width: 7.5, height: 15 },
  { name: 'Book', width: 15, height: 21 },
  { name: 'Coffee Cup', width: 8, height: 12 },
  { name: 'Laptop', width: 35, height: 24 },
  { name: 'Credit Card', width: 8.5, height: 5.4 },
  { name: 'A4 Paper', width: 21, height: 29.7 },
  { name: 'Water Bottle', width: 7, height: 23 },
  { name: 'Desk', width: 120, height: 60 },
];

export const MeasurementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [activeMeasurement, setActiveMeasurement] = useState<Measurement | null>(null);
  const [measurementPoints, setMeasurementPoints] = useState<Point[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentUnit, setCurrentUnit] = useState('cm');
  
  const lineAnimation = useRef(new Animated.Value(0)).current;
  const resultAnimation = useRef(new Animated.Value(0)).current;
  
  const addMeasurementPoint = (point: Point) => {
    const newPoints = [...measurementPoints, point];
    setMeasurementPoints(newPoints);
    
    // Animate line drawing when 2 or more points exist
    if (newPoints.length >= 2) {
      lineAnimation.setValue(0);
      Animated.timing(lineAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  };
  
  const clearMeasurementPoints = () => {
    setMeasurementPoints([]);
    lineAnimation.setValue(0);
    resultAnimation.setValue(0);
  };
  
  const takeMeasurement = async (photo: { uri: string }) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Simulate object detection and measurement
      const randomObject = MOCK_OBJECTS[Math.floor(Math.random() * MOCK_OBJECTS.length)];
      const randomDimension = Math.random() > 0.5 ? randomObject.width : randomObject.height;
      
      // Add small variations to make it more realistic
      const measuredValue = randomDimension * (0.9 + Math.random() * 0.2);
      
      const newMeasurement: Measurement = {
        id: nanoid(),
        value: parseFloat(measuredValue.toFixed(1)),
        unit: currentUnit,
        imageUri: photo.uri,
        timestamp: Date.now(),
        objectName: randomObject.name,
        objectDetails: `Detected with AI assistance`,
        points: [...measurementPoints],
      };
      
      setActiveMeasurement(newMeasurement);
      
      // Animate the result appearance
      resultAnimation.setValue(0);
      Animated.timing(resultAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
      // Add to measurements history
      setMeasurements(prev => [newMeasurement, ...prev]);
      
      setIsProcessing(false);
    }, 1500);
  };
  
  const saveMeasurement = (measurement: Partial<Measurement>) => {
    if (!activeMeasurement) return;
    
    const updatedMeasurement = {
      ...activeMeasurement,
      ...measurement,
    };
    
    setMeasurements(prev => 
      prev.map(m => m.id === updatedMeasurement.id ? updatedMeasurement : m)
    );
    
    setActiveMeasurement(updatedMeasurement);
  };
  
  const deleteMeasurement = (id: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== id));
    if (activeMeasurement?.id === id) {
      setActiveMeasurement(null);
    }
  };
  
  const toggleUnit = () => {
    setCurrentUnit(current => current === 'cm' ? 'in' : 'cm');
  };
  
  return (
    <MeasurementContext.Provider
      value={{
        measurements,
        activeMeasurement,
        measurementPoints,
        isProcessing,
        currentUnit,
        lineAnimation,
        resultAnimation,
        addMeasurementPoint,
        clearMeasurementPoints,
        takeMeasurement,
        saveMeasurement,
        deleteMeasurement,
        toggleUnit,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};