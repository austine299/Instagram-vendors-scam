import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard.js';
import VendorSignUp from "./users/VendorSignUp.js"
import VendorLogin from './users/VendorLogin.js';
import CompleteKYC from './users/CompleteKYC.js'
import Privacy from './users/privacy.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element ={<Dashboard/>}/>
          <Route path="/signup" element ={<VendorSignUp/>}/>
          <Route path="/kyc" element ={<Privacy><CompleteKYC/></Privacy>}/>
          <Route path="/login" element ={<VendorLogin/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
