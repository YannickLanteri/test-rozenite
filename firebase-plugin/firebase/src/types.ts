// Firebase Analytics Event
export interface FirebaseAnalyticsEvent {
  type: 'analytics-event' | 'analytics-screen-view' | 'analytics-user-property';
  name: string;
  parameters?: Record<string, any>;
}

// Firebase Analytics Events
export interface FirebaseAnalyticsEvents {
  'analytics-event': {
    eventName: string;
    parameters?: Record<string, any>;
    timestamp: number;
  };
  'analytics-screen-view': {
    screenName: string;
    screenClass?: string;
    timestamp: number;
  };
  'analytics-user-property': {
    propertyName: string;
    propertyValue: string;
    timestamp: number;
  };
}

// Plugin Events Map
export interface FirebasePluginEvents extends FirebaseAnalyticsEvents {
  'request-analytics-events': {
    limit?: number;
  };
  'clear-analytics-events': {};
}

// Event Store
export interface EventStore {
  analytics: FirebaseAnalyticsEvents[keyof FirebaseAnalyticsEvents][];
}

// Plugin Configuration
export interface FirebasePluginConfig {
  maxEventsPerType: number;
  enableAnalytics: boolean;
}
