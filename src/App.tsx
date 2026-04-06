/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Optin from './pages/Optin';
import Sales from './pages/Sales';

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Fire CAPI PageView Event
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName: 'PageView' })
    }).catch(console.error);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      <div className="noise-bg"></div>
      <Routes>
        <Route path="/" element={<Optin />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}
