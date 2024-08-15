import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SingUp from './pages/SingUp';
import Home from './pages/Home';
import SingIn from './pages/SingIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects'; 
import About from './pages/About'; 
import Header from './components/Header';
import Footer from './components/Footer';


export default function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/sing-up' element={<SingUp />} />
      <Route path='/sing-in' element={<SingIn />} />
      <Route path='/projects' element={<Projects />} />

      





    </Routes>
    <Footer />
    
    
    </BrowserRouter>
  )
}