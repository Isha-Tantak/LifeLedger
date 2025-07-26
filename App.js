import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserForm from './components/UserForm';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <UserForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
