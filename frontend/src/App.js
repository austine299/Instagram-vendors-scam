import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element ={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
