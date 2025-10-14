import './index.css';
import Header from './components/Header';
import Footer from './components/Footer'; 

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Booking</h2>
        <p className="text-gray-700">Start your hotel search below...</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
