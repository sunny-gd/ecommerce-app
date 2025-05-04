import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/Navbar';
import Products from './features/products/Products';
import Cart from './features/cart/Cart';
import About from './components/About';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/ecommerce-app" element={<Products />} />
            <Route path="/ecommerce-app/cart" element={<Cart />} />
            <Route path="/ecommerce-app/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;