import React, { useState } from 'react';
import CustomerHistory from './components/CustomerHistory';

function App() {
  // We start with ID 1 (Arham), but now it's a "state" that can change!
  const [currentId, setCurrentId] = useState(1);

  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>SME360 Business Analytics</h1>
      </header>
      
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>View History for Customer ID: </label>
          <input 
            type="number" 
            value={currentId} 
            onChange={(e) => setCurrentId(e.target.value)}
            style={{ padding: '8px', width: '60px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            Try switching between 1 (Arham) and 2 (Test Client)
          </p>
        </div>

        {/* This component now updates every time currentId changes */}
        <CustomerHistory customerId={currentId} />
      </main>
    </div>
  );
}

export default App;
