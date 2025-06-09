import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface NotificationContextType {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  scheduleLocalNotification: (title: string, body: string, trigger?: Notifications.NotificationTriggerInput) => Promise<void>;
  requestPermissions: () => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);

  useEffect(() => {
    loadNotificationSettings();
    requestPermissions();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const stored = await SecureStore.getItemAsync('notificationsEnabled');
      if (stored !== null) {
        setNotificationsEnabledState(stored === 'true');
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const setNotificationsEnabled = async (enabled: boolean) => {
    try {
      setNotificationsEnabledState(enabled);
      await SecureStore.setItemAsync('notificationsEnabled', enabled.toString());
      
      if (enabled) {
        await requestPermissions();
      }
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'web') {
      return true; // Web doesn't need explicit permissions for local notifications
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      return finalStatus === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  };

  const scheduleLocalNotification = async (
    title: string, 
    body: string, 
    trigger?: Notifications.NotificationTriggerInput
  ) => {
    if (!notificationsEnabled) return;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
        },
        trigger: trigger || null,
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{
      notificationsEnabled,
      setNotificationsEnabled,
      scheduleLocalNotification,
      requestPermissions
    }}>
      {children}
    </NotificationContext.Provider>
  );
}