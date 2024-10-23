import React from 'react';
import "./stylesheets/custom-components.css";
import "./stylesheets/layout.css";

import Router from "./Router";

function App() {
  return (
    // className="m-5"
    <div>
        <Router />
        {/*{loading && <Loader/>}*/}
        {/*<BrowserRouter>*/}
        {/*  <Routes>*/}
        {/*      <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />*/}
        {/*      <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> } />*/}
        {/*      <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> } />*/}
        {/*      <Route path="/applied-jobs" element={ <ProtectedRoute><AppliedJobs /></ProtectedRoute> } />*/}
        {/*  </Routes>*/}
        {/*</BrowserRouter>*/}
    </div>
  );
}

export default App;
