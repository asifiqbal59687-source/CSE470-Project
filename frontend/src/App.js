import React, { useState, useEffect } from 'react';
import StockAlerts from './components/StockAlerts';
import LowMarginAlerts from './components/LowMarginAlerts';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CustomerHistory from './components/CustomerHistory';
import SupplierList from './components/SupplierList';
import AuditLogs from './components/AuditLogs';

function App() {
  const [currentId, setCurrentId] = useState(1);
  const [maxId, setMaxId] = useState(1); 


  useEffect(() => {
    fetch('/api/customers/meta/max-id')
      .then(res => res.json())
      .then(data => setMaxId(data.maxId))
      .catch(err => console.error("Error fetching limits:", err));
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '60px' }}>
      
      <header style={{ backgroundColor: '#1a1a2e', padding: '40px 20px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2.8rem' }}>SME360 COMMAND CENTER</h1>
        <p style={{ opacity: 0.7 }}>Integrated Decision Support System</p>
      </header>
      
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        <section style={{ marginBottom: '30px' }}>
          <StockAlerts />
          <LowMarginAlerts />
        </section>

        <section style={{ marginBottom: '40px', backgroundColor: 'white', padding: '30px', borderRadius: '20px' }}>
          <AnalyticsDashboard />
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          <section style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px' }}>
            <SupplierList />
          </section>

          <section style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px' }}>
            <h2 style={{ color: '#1a1a2e', marginBottom: '20px' }}>Customer Intelligence</h2>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Enter Customer ID:</label>
              <input 
                type="number" 
                min="1"      
                max={maxId}   
                value={currentId} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);

                  if (val >= 1 && val <= maxId) {
                    setCurrentId(val);
                  } else if (e.target.value === "") {
                    setCurrentId(""); 
                  }
                }}
                style={{ 
                  padding: '10px', 
                  width: '80px', 
                  borderRadius: '8px', 
                  border: '2px solid #007bff',
                  textAlign: 'center'
                }}
              />
              <span style={{ marginLeft: '10px', color: '#6c757d', fontSize: '0.8rem' }}>
                (Valid: 1 to {maxId})
              </span>
            </div>
            <CustomerHistory customerId={currentId} />
          </section>
        </div>

        <section style={{ marginTop: '20px' }}>
          <AuditLogs />
        </section>

      </main>

      <footer style={{ textAlign: 'center', color: '#6c757d', padding: '40px 0' }}>
        <p style={{ fontWeight: 'bold' }}>SME360 | BRAC University CSE370</p>
      </footer>
    </div>
  );
}

export default App;