import React from 'react';
import { View, StyleSheet, Text, Dimensions, Animated } from 'react-native';
import { useSettings } from '@/hooks/useSettings';
import { useMeasurement } from '@/hooks/useMeasurement';

const { width, height } = Dimensions.get('window');

export default function MeasurementOverlay() {
  const { settings } = useSettings();
  const { 
    measurements, 
    activeMeasurement, 
    measurementPoints,
    lineAnimation,
    resultAnimation
  } = useMeasurement();
  
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Grid lines overlay */}
      {settings.showGrid && (
        <View style={styles.gridContainer}>
          {/* Vertical lines */}
          {[0.25, 0.5, 0.75].map((position, index) => (
            <View 
              key={`v-${index}`}
              style={[
                styles.gridLine, 
                { 
                  left: position * width, 
                  height: height,
                  width: position === 0.5 ? 1 : StyleSheet.hairlineWidth
                }
              ]} 
            />
          ))}
          
          {/* Horizontal lines */}
          {[0.25, 0.5, 0.75].map((position, index) => (
            <View 
              key={`h-${index}`}
              style={[
                styles.gridLine, 
                { 
                  top: position * height, 
                  width: width,
                  height: position === 0.5 ? 1 : StyleSheet.hairlineWidth
                }
              ]} 
            />
          ))}
          
          {/* Rule of thirds markers */}
          {[0.33, 0.67].map((vPosition) => 
            [0.33, 0.67].map((hPosition) => (
              <View 
                key={`marker-${vPosition}-${hPosition}`}
                style={[
                  styles.intersectionMarker,
                  { left: vPosition * width, top: hPosition * height }
                ]}
              />
            ))
          )}
        </View>
      )}
      
      {/* Measurement points */}
      {measurementPoints.map((point, index) => (
        <View 
          key={`point-${index}`} 
          style={[
            styles.measurementPoint,
            { left: point.x - 6, top: point.y - 6 }
          ]}
        >
          <Text style={styles.pointIndex}>{index + 1}</Text>
        </View>
      ))}
      
      {/* Measurement lines */}
      {measurementPoints.length >= 2 && (
        <View style={styles.linesContainer}>
          {/* Draw lines between points */}
          {measurementPoints.map((point, index) => {
            if (index === measurementPoints.length - 1) return null;
            
            const nextPoint = measurementPoints[index + 1];
            const dx = nextPoint.x - point.x;
            const dy = nextPoint.y - point.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            return (
              <Animated.View 
                key={`line-${index}`}
                style={[
                  styles.measurementLine,
                  {
                    left: point.x,
                    top: point.y,
                    width: lineAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, length]
                    }),
                    transform: [{ rotate: `${angle}deg` }],
                    transformOrigin: 'left center',
                  }
                ]}
              />
            );
          })}
        </View>
      )}
      
      {/* Active measurement result */}
      {activeMeasurement && (
        <Animated.View
          style={[
            styles.resultContainer,
            {
              opacity: resultAnimation,
              transform: [
                { 
                  translateY: resultAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.resultValue}>
            {activeMeasurement.value} {activeMeasurement.unit}
          </Text>
          {activeMeasurement.objectName && (
            <Text style={styles.resultObjectName}>
              {activeMeasurement.objectName}
            </Text>
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  intersectionMarker: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: -3,
  },
  measurementPoint: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0A84FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointIndex: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  linesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  measurementLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#0A84FF',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
  },
  resultContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 140,
    alignItems: 'center',
    padding: 16,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  resultObjectName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});