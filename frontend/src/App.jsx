import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import SearchFlights from './pages/SearchFlights';
import FlightResults from './pages/FlightResults';
import BookingDetails from './pages/BookingDetails';
import MealSelection from './pages/MealSelection';
import Payment from './pages/Payment';
import TicketConfirmation from './pages/TicketConfirmation';
import CancelTicket from './pages/CancelTicket';
import FlightSchedule from './pages/FlightSchedule';
import FareBaggage from './pages/FareBaggage';
import MealOptions from './pages/MealOptions';
import InternationalTravel from './pages/InternationalTravel';
import AirportInfo from './pages/AirportInfo';
import SafetyTrust from './pages/SafetyTrust';
import HelpCenter from './pages/HelpCenter';
import RefundPolicy from './pages/RefundPolicy';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchFlights />} />
        <Route path="/flights" element={<FlightResults />} />
        <Route path="/booking" element={<BookingDetails />} />
        <Route path="/meals" element={<MealSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<TicketConfirmation />} />
        <Route path="/cancel" element={<CancelTicket />} />
        <Route path="/schedule" element={<FlightSchedule />} />
        <Route path="/fares" element={<FareBaggage />} />
        <Route path="/meal-options" element={<MealOptions />} />
        <Route path="/international-travel" element={<InternationalTravel />} />
        <Route path="/airports" element={<AirportInfo />} />
        <Route path="/safety" element={<SafetyTrust />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
