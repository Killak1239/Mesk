import { useState, useCallback } from 'react';

type Settings = {
  useAI: boolean;
  showGrid: boolean;
  autoSave: boolean;
  voiceGuidance: boolean;
  unit: 'metric' | 'imperial';
};

export function useSettings() {
  // Default settings
  const [settings, setSettings] = useState<Settings>({
    useAI: true,
    showGrid: true,
    autoSave: false,
    voiceGuidance: false,
    unit: 'metric',
  });
  
  const toggleSetting = useCallback((key: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);
  
  const setMeasurementUnit = useCallback((unit: 'metric' | 'imperial') => {
    setSettings(prev => ({
      ...prev,
      unit,
    }));
  }, []);
  
  const resetCalibration = useCallback(() => {
    // For the demo, we'll just show a console message
    console.log('Resetting device calibration...');
    // This would typically involve a more complex calibration process
  }, []);
  
  return {
    settings,
    toggleSetting,
    setMeasurementUnit,
    resetCalibration,
  };
}