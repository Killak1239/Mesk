import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable, ScrollView, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/useSettings';
import { Smartphone, Ruler, Wifi, Share, HelpCircle, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { 
    settings, 
    toggleSetting, 
    setMeasurementUnit,
    resetCalibration,
  } = useSettings();
  
  const backgroundColor = isDark ? '#1C1C1E' : '#F2F2F7';
  const cardBackground = isDark ? '#2C2C2E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const secondaryTextColor = isDark ? '#8E8E93' : '#6C6C70';
  const separatorColor = isDark ? 'rgba(120, 120, 128, 0.2)' : 'rgba(60, 60, 67, 0.1)';
  
  const renderSetting = (title, value, onToggle, description = null) => (
    <View style={[styles.settingRow, { borderBottomColor: separatorColor }]}>
      <View style={styles.settingTextContainer}>
        <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
        {description && (
          <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#0A84FF' }}
        thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : value ? '#FFFFFF' : '#f4f3f4'}
      />
    </View>
  );
  
  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top, backgroundColor }]} 
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={[styles.sectionTitle, { color: textColor }]}>Measurement Settings</Text>
      
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        {renderSetting(
          'Use AI for Detection',
          settings.useAI,
          () => toggleSetting('useAI'),
          'Uses machine learning to identify objects and improve accuracy'
        )}
        
        {renderSetting(
          'Show Grid Lines',
          settings.showGrid,
          () => toggleSetting('showGrid'),
          'Display grid overlay on camera view'
        )}
        
        {renderSetting(
          'Save Photos Automatically',
          settings.autoSave,
          () => toggleSetting('autoSave'),
          'Save measurement photos to your gallery'
        )}
        
        {renderSetting(
          'Voice Guidance',
          settings.voiceGuidance,
          () => toggleSetting('voiceGuidance'),
          'Provides voice instructions during measurement'
        )}
      </View>
      
      <Text style={[styles.sectionTitle, { color: textColor }]}>Preferred Units</Text>
      
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <UnitSelector 
          title="Metric" 
          description="Centimeters, Meters" 
          selected={settings.unit === 'metric'}
          onPress={() => setMeasurementUnit('metric')}
          textColor={textColor}
          secondaryTextColor={secondaryTextColor}
          separatorColor={separatorColor}
        />
        
        <UnitSelector 
          title="Imperial" 
          description="Inches, Feet" 
          selected={settings.unit === 'imperial'}
          onPress={() => setMeasurementUnit('imperial')}
          textColor={textColor}
          secondaryTextColor={secondaryTextColor}
          separatorColor={separatorColor}
        />
      </View>
      
      <Text style={[styles.sectionTitle, { color: textColor }]}>Device Calibration</Text>
      
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <Pressable 
          style={[styles.actionButton, { borderBottomColor: separatorColor }]}
          onPress={resetCalibration}
        >
          <View style={styles.actionButtonContent}>
            <Smartphone size={22} color="#0A84FF" />
            <Text style={[styles.actionButtonText, { color: textColor }]}>
              Calibrate Camera
            </Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <Ruler size={22} color="#0A84FF" />
            <Text style={[styles.actionButtonText, { color: textColor }]}>
              Use Reference Object
            </Text>
          </View>
        </Pressable>
      </View>
      
      <Text style={[styles.sectionTitle, { color: textColor }]}>About</Text>
      
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <Pressable style={[styles.actionButton, { borderBottomColor: separatorColor }]}>
          <View style={styles.actionButtonContent}>
            <Share size={22} color="#0A84FF" />
            <Text style={[styles.actionButtonText, { color: textColor }]}>
              Share App
            </Text>
          </View>
        </Pressable>
        
        <Pressable style={[styles.actionButton, { borderBottomColor: separatorColor }]}>
          <View style={styles.actionButtonContent}>
            <HelpCircle size={22} color="#0A84FF" />
            <Text style={[styles.actionButtonText, { color: textColor }]}>
              Help & Support
            </Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <Info size={22} color="#0A84FF" />
            <Text style={[styles.actionButtonText, { color: textColor }]}>
              Version 1.0.0
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function UnitSelector({ title, description, selected, onPress, textColor, secondaryTextColor, separatorColor }) {
  return (
    <Pressable 
      style={[styles.unitSelector, { borderBottomColor: separatorColor }]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
        <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
          {description}
        </Text>
      </View>
      {selected && (
        <Text style={styles.selectedText}>✓</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selectedText: {
    fontSize: 18,
    color: '#0A84FF',
    fontWeight: '600',
  },
  actionButton: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});