import { useContext } from 'react';
import { MeasurementContext } from '@/contexts/MeasurementContext';

export function useMeasurement() {
  const context = useContext(MeasurementContext);
  
  if (!context) {
    throw new Error('useMeasurement must be used within a MeasurementProvider');
  }
  
  return context;
}