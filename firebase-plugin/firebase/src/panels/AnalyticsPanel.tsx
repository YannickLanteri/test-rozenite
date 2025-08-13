import React, { useEffect, useState } from 'react';
import { useRozeniteDevToolsClient } from '@rozenite/plugin-bridge';

interface FirebaseAnalyticsEvent {
  type: 'analytics-event' | 'analytics-screen-view' | 'analytics-user-property';
  name: string;
  parameters?: Record<string, any>;
  timestamp: number;
}

export default function AnalyticsPanel() {
  const client = useRozeniteDevToolsClient<{
    'analytics-event': FirebaseAnalyticsEvent;
    'analytics-screen-view': FirebaseAnalyticsEvent;
    'analytics-user-property': FirebaseAnalyticsEvent;
  }>({
    pluginId: 'firebase-analytics',
  });

  const [events, setEvents] = useState<FirebaseAnalyticsEvent[]>([]);

  useEffect(() => {
    if (!client) return;

    const subscriptions = [
      client.onMessage('analytics-event', (event) => {
        setEvents(prev => [...prev, { ...event, timestamp: Date.now() }]);
      }),
      client.onMessage('analytics-screen-view', (event) => {
        setEvents(prev => [...prev, { ...event, timestamp: Date.now() }]);
      }),
      client.onMessage('analytics-user-property', (event) => {
        setEvents(prev => [...prev, { ...event, timestamp: Date.now() }]);
      }),
    ];

    return () => {
      subscriptions.forEach(sub => sub.remove());
    };
  }, [client]);

  const clearEvents = () => {
    setEvents([]);
  };

  if (!client) {
    return <div>Connecting to React Native...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={clearEvents}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Events
        </button>
        <span style={{ marginLeft: '8px', color: '#666' }}>
          {events.length} events
        </span>
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {events.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No Firebase Analytics events yet. Trigger some events from your app!
          </p>
        ) : (
          events.map((event, index) => (
            <div 
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '12px',
                marginBottom: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#007AFF' }}>
                {event.type}
              </div>
              <div style={{ marginTop: '4px' }}>
                <strong>Name:</strong> {event.name}
              </div>
              {event.parameters && Object.keys(event.parameters).length > 0 && (
                <div style={{ marginTop: '4px' }}>
                  <strong>Parameters:</strong>
                  <pre style={{ 
                    margin: '4px 0 0 0', 
                    fontSize: '12px',
                    backgroundColor: '#fff',
                    padding: '4px',
                    borderRadius: '2px'
                  }}>
                    {JSON.stringify(event.parameters, null, 2)}
                  </pre>
                </div>
              )}
              <div style={{ 
                marginTop: '4px', 
                fontSize: '12px', 
                color: '#666' 
              }}>
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
