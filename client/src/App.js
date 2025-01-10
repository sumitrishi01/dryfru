import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import ProductPage from './pages/ProductPage/ProductPage';

function App(){
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route path='/products' element={<ProductPage/>} />
      <Route path='/contact' element={<Contact/>} />
    </Routes>
  );
}
export default App;