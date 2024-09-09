import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Inventory from '../components/Inventory';
import DispatchForm from '../components/DispatchForm';
import Navigation from '../components/Navigation';
import StockOrder from '../components/StockOrder';
import Returns from '../components/Returns';
import Orders from '../components/Orders';

export default function AppRoute() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Inventory' element={<Inventory />} />
                <Route path='/DispatchForm' element={<DispatchForm />} />
                <Route path='/StockOrder' element={<StockOrder/>}/>
                <Route path='/Returns' element={<Returns/>}/>
                <Route path='/Orders' element={<Orders/>}/>
            </Routes>
        </Router>
    );
}
