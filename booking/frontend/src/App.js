import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Booking
        </h2>
        <p className="text-gray-700 mb-8">
          Start your hotel search below...
        </p>

        <SearchBar />
      </main>

      <Footer />
    </div>
  );
}

export default App;
