
import React, { useState, useEffect } from 'react';
import { Medicine, Pharmacy } from './types';
import { mockMedicines } from './data/medicines';
import { mockPharmacies } from './data/pharmacies';
import SearchBar from './components/SearchBar';
import MedicineCard from './components/MedicineCard';
import PharmacyList from './components/PharmacyList';
import Auth from './components/Auth';

type View = 'search' | 'login' | 'register';

const API_BASE_URL = 'http://localhost:3001/api'; // Example backend URL

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('login'); // Default to login
  const [userEmail, setUserEmail] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem('medlink-token');
    const email = localStorage.getItem('medlink-user-email');
    if (token) {
      console.log("Token found, setting to authenticated and search view.");
      setIsAuthenticated(true);
      if (email) setUserEmail(email);
      setCurrentView('search'); 
    } else {
      console.log("No token, setting to login view.");
      setCurrentView('login'); 
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setIsLoading(true);
    setError(null);
    setSelectedMedicine(null);

    setTimeout(() => {
      if (query.trim() === '') {
        setSearchResults([]);
      } else {
        const results = mockMedicines.filter(med =>
          med.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        if (results.length === 0) {
          setError('No medicines found matching your search.');
        }
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSelectMedicine = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
  };

  const clearSelectedMedicine = () => {
    setSelectedMedicine(null);
    if (searchTerm && searchResults.length === 0 && !isLoading) { // Re-trigger search only if needed
        handleSearch(searchTerm);
    }
  };

  const handleLoginSuccess = (token: string, email: string) => {
    localStorage.setItem('medlink-token', token);
    localStorage.setItem('medlink-user-email', email);
    setIsAuthenticated(true);
    setUserEmail(email);
    setCurrentView('search');
    setError(null); 
  };

  const handleRegisterSuccess = (token: string, email: string) => {
    handleLoginSuccess(token, email);
  };

  const handleLogout = () => {
    localStorage.removeItem('medlink-token');
    localStorage.removeItem('medlink-user-email');
    setIsAuthenticated(false);
    setUserEmail(null);
    setCurrentView('login'); 
    setSelectedMedicine(null);
    setSearchTerm('');
    setSearchResults([]);
    setError(null);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setSelectedMedicine(null); 
    setError(null);
  }

  return (
    <>
      <header className="app-header">
        <div className="container">
          <h1>MedLink</h1>
          <nav>
            {isAuthenticated ? (
              <>
                {userEmail && <span>Welcome, {userEmail}!</span>}
                <button onClick={handleLogout} className="logout">Logout</button>
              </>
            ) : (
              <>
                {currentView !== 'login' && <a href="#login" onClick={(e) => { e.preventDefault(); navigateTo('login'); }}>Login</a>}
                {currentView !== 'register' && <a href="#register" onClick={(e) => { e.preventDefault(); navigateTo('register'); }}>Register</a>}
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        {!isAuthenticated && currentView === 'login' && (
            <Auth 
                mode="login" 
                onSuccess={handleLoginSuccess} 
                onSwitchMode={() => navigateTo('register')} 
                apiBaseUrl={API_BASE_URL}
            />
        )}
        {!isAuthenticated && currentView === 'register' && (
            <Auth 
                mode="register" 
                onSuccess={handleRegisterSuccess} 
                onSwitchMode={() => navigateTo('login')} 
                apiBaseUrl={API_BASE_URL}
            />
        )}
        
        {isAuthenticated && currentView === 'search' && (
          <>
            <section className="search-section" aria-labelledby="search-heading">
              <h2 id="search-heading" className="sr-only">Search Medicines</h2>
              <SearchBar onSearch={handleSearch} initialQuery={searchTerm}/>
            </section>

            {isLoading && <div className="loading">Searching for medicines...</div>}
            {error && !isLoading && <div className="error">{error}</div>}

            {!selectedMedicine && searchResults.length > 0 && (
              <div className="medicine-results-grid">
                {searchResults.map(med => (
                    <div key={med.id} className="medicine-card-search-result">
                        <h3>{med.name}</h3>
                        <p className="price">${med.price.toFixed(2)}</p>
                        <button onClick={() => handleSelectMedicine(med)}>View Details</button>
                    </div>
                ))}
              </div>
            )}
            
            {selectedMedicine && (
              <div>
                <button onClick={clearSelectedMedicine} className="secondary" style={{marginBottom: '20px'}}>
                  &larr; Back to Search Results
                </button>
                <MedicineCard medicine={selectedMedicine} />
              </div>
            )}
            
            {!isLoading && !error && searchResults.length === 0 && searchTerm !== '' && !selectedMedicine && (
                 <p className="no-results">No medicines found for "{searchTerm}". Try a different name.</p>
            )}
            {!isLoading && !error && searchResults.length === 0 && searchTerm === '' && !selectedMedicine && (
                 <p className="no-results">Enter a medicine name above to search.</p>
            )}


            <PharmacyList pharmacies={mockPharmacies} />
          </>
        )}
         {/* Fallback message if somehow !isAuthenticated but view is 'search' (should not happen with useEffect logic) */}
         {!isAuthenticated && currentView === 'search' && (
            <p className="no-results">Please <a href="#login" onClick={(e) => { e.preventDefault(); navigateTo('login'); }}>login</a> or <a href="#register" onClick={(e) => { e.preventDefault(); navigateTo('register'); }}>register</a> to search for medicines and view pharmacies.</p>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} MedLink. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;
