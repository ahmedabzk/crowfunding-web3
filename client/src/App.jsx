import { Home, CreateCampaign, CampaignDetails, Profile } from './pages';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="nav-bar">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign/:campaignId" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App