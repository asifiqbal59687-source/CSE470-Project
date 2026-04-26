import React, { useState } from 'react';
// 1. Ensure all three components are imported correctly
import CustomerHistory from './components/CustomerHistory';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import StockAlerts from './components/StockAlerts';

function App() {
  // State for FR-4 (Customer History)
  const [currentId, setCurrentId] = useState(1);

  return (
    <div className="App" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '50px' }}>
      {/* Header Section */}
      <header style={{ 
        backgroundColor: '#1a1a2e', 
        padding: '30px', 
        color: 'white', 
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>SME360 Decision Support System</h1>
        <p style={{ opacity: 0.8 }}>Real-time Business Intelligence Dashboard</p>
      </header>
      
      <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* FEATURE 1: FR-9 LOW STOCK ALERTS (Must be at the top!) */}
        <div style={{ marginBottom: '20px' }}>
          <StockAlerts />
        </div>

        {/* FEATURE 2: FR-14 REVENUE & PROFIT VISUALIZATION */}
        <section style={{ 
          marginBottom: '40px', 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <AnalyticsDashboard />
        </section>

        <hr style={{ border: '0', height: '1px', background: '#ddd', margin: '40px 0' }} />

        {/* FEATURE 3: FR-4 CUSTOMER PURCHASE HISTORY */}
        <section style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '20px' }}>Customer Management</h2>
          
          <div style={{ 
            marginBottom: '30px', 
            padding: '20px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '10px',
            display: 'inline-block'
          }}>
            <label style={{ marginRight: '15px', fontWeight: 'bold' }}>
              Search Customer ID: 
            </label>
            <input 
              type="number" 
              value={currentId} 
              onChange={(e) => setCurrentId(e.target.value)}
              style={{ 
                padding: '10px', 
                width: '80px', 
                borderRadius: '6px', 
                border: '2px solid #007bff',
                textAlign: 'center'
              }}
            />
          </div>

          <div>
            <CustomerHistory customerId={currentId} />
          </div>
        </section>

      </main>

      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#888', fontSize: '0.9rem' }}>
        <p>© 2026 SME360 Project - CSE370 Feature Development</p>
      </footer>
    </div>
  );
}

export default App;