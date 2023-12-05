import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateTender from './pages/CreateTender';
import TenderDetails from './pages/TenderDetails';

function App() {

  return (
    <Router>
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row w-full">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/tender-details/:id" element={<TenderDetails />} /> */}
        </Routes>
      </div>
    </div>
  </Router>

  )
}

export default App;
