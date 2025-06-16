import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard.js';
import CustomerOrderPage from './OrderPage.js';
import OrderConfirmation from './ConfirmOrder.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element ={<Dashboard/>}/>
          <Route path="/orderPage" element ={<CustomerOrderPage/>}/>
          <Route path="/confirmOrder" element ={<OrderConfirmation/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
