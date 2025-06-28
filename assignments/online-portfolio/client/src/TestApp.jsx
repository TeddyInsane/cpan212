import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Portfolio Test</h1>
      <p>If you can see this, React is working!</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
}

export default TestApp;
