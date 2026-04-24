// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';

function App() {
  const [dbStatus, setDbStatus] = useState("Checking...");

  useEffect(() => {
    // This calls the backend through the proxy you set in package.json
    fetch('/test-db')
      .then(res => res.json())
      .then(data => setDbStatus(data.message))
      .catch(err => setDbStatus("Connection Failed"));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>SME360 Integration Test</h1>
      <p>Database Status: <strong>{dbStatus}</strong></p>
    </div>
  );
}

export default App;
