import React from 'react';
import AnalyticsPanel from './panels/AnalyticsPanel';

export default function FirebasePanel() {
  return (
    <div style={{ padding: '16px' }}>
      <h2>Firebase Analytics</h2>
      <AnalyticsPanel />
    </div>
  );
}
