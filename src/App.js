import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import VendorKYC from "./users/VendorKYC";
import VendorSignUp from "./users/VendorSignUp"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element ={<Dashboard/>}/>
          <Route path="/signup" element ={<VendorSignUp/>}/>
          <Route path="/kyc" element ={<VendorKYC/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
