import { getRozeniteDevToolsClient } from '@rozenite/plugin-bridge';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface FirebaseAnalyticsEvent {
  type: 'analytics-event' | 'analytics-screen-view' | 'analytics-user-property';
  name: string;
  parameters?: Record<string, any>;
}

interface FirebaseContextType {
  logEvent: (name: string, parameters?: Record<string, any>) => void;
  logScreenView: (screenName: string, screenClass?: string) => void;
  setUserProperty: (name: string, value: string) => void;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    // Initialize Rozenite client
    getRozeniteDevToolsClient<{
      'analytics-event': FirebaseAnalyticsEvent;
      'analytics-screen-view': FirebaseAnalyticsEvent;
      'analytics-user-property': FirebaseAnalyticsEvent;
    }>('firebase-analytics')
      .then(setClient)
      .catch(console.error);
  }, []);

  const logEvent = (name: string, parameters?: Record<string, any>) => {
    const event: FirebaseAnalyticsEvent = {
      type: 'analytics-event',
      name,
      parameters,
    };

    if (client) {
      client.send('analytics-event', event);
    }

    // Also log to console for debugging
    console.log('Firebase Analytics Event:', event);
  };

  const logScreenView = (screenName: string, screenClass?: string) => {
    const event: FirebaseAnalyticsEvent = {
      type: 'analytics-screen-view',
      name: screenName,
      parameters: { screenClass },
    };

    if (client) {
      client.send('analytics-screen-view', event);
    }

    console.log('Firebase Screen View:', event);
  };

  const setUserProperty = (name: string, value: string) => {
    const event: FirebaseAnalyticsEvent = {
      type: 'analytics-user-property',
      name,
      parameters: { value },
    };

    if (client) {
      client.send('analytics-user-property', event);
    }

    console.log('Firebase User Property:', event);
  };

  const value: FirebaseContextType = {
    logEvent,
    logScreenView,
    setUserProperty,
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}
