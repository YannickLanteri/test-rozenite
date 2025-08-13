interface FirebaseAnalyticsEvent {
  type: 'analytics-event' | 'analytics-screen-view' | 'analytics-user-property';
  name: string;
  parameters?: Record<string, any>;
}

export async function setupPlugin() {
  // Plugin is now initialized - the app will send events directly
  console.log('Firebase Analytics plugin initialized');
}

export function useFirebaseAnalytics() {
  return {
    logEvent: (name: string, parameters?: Record<string, any>) => {
      console.log(
        `FIREBASE_ANALYTICS_EVENT:${JSON.stringify({ type: 'analytics-event', name, parameters })}`
      );
    },
    logScreenView: (screenName: string, screenClass?: string) => {
      console.log(
        `FIREBASE_SCREEN_VIEW:${JSON.stringify({
          type: 'analytics-screen-view',
          name: screenName,
          parameters: { screenClass },
        })}`
      );
    },
    setUserProperty: (name: string, value: string) => {
      console.log(
        `FIREBASE_USER_PROPERTY:${JSON.stringify({
          type: 'analytics-user-property',
          name,
          parameters: { value },
        })}`
      );
    },
  };
}
