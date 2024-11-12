import React from 'react';
import VisitorDashboard from './components/VisitorDashboard';
import ChatWidget from './components/ChatWidget/ChatWidget';
import RiskLevel from './components/RiskLevel';

function App() {
  return (
    <>
      <VisitorDashboard />
      <RiskLevel level="low" />
      <ChatWidget />
    </>
  );
}

export default App;