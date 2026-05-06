import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Importamos nuestros componentes modulares (TODOS VAN AQUÍ ARRIBA)
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard'; // <-- ¡Aquí está el import correcto!

function App() {
  const [view, setView] = useState('home'); 
  const [vehiculos, setVehiculos] = useState([]);
  
  // Estados para nuestros formularios
  const [formData, setFormData] = useState({ ownerName: '', licensePlate: '', tipoVehiculoId: 1 });
  const [loginData, setLoginData] = useState({ email: '', passwordHash: '' });
  const [registerData, setRegisterData] = useState({ nombrePropietario: '', email: '', passwordHash: '' });
  const [exitPlate, setExitPlate] = useState('');
  
  const API_URL = "http://localhost:8081/api/vehiculos";

  useEffect(() => {
    if (view === 'admin') fetchVehiculos();
  }, [view]);

  // 1. Función para traer vehículos
  const fetchVehiculos = async () => {
    try {
      const res = await axios.get(`${API_URL}/activos`);
      setVehiculos(res.data);
    } catch (err) { console.error("Error al cargar vehículos", err); }
  };

  // 2. Función para registrar vehículo
  const handleRegisterVehicle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/registrar`, formData);
      alert("✅ ¡Vehículo Registrado con éxito!");
      setFormData({ ownerName: '', licensePlate: '', tipoVehiculoId: 1 });
      setView('admin');
      fetchVehiculos(); // Refrescamos la lista de inmediato
    } catch (err) { 
      alert("❌ Error en el servidor al registrar el vehículo"); 
    }
  };

  // 3. Función para procesar salida y cobrar
  const handleExitVehicle = async (e) => {
    e.preventDefault();
    if (!exitPlate) return alert("Por favor ingresa una placa");

    try {
      const res = await axios.put(`${API_URL}/salida/${exitPlate}`);
      alert("✅ " + res.data);
      setExitPlate(''); 
      setView('admin'); 
    } catch (err) {
      alert("❌ " + (err.response?.data || "Error al procesar la salida"));
    }
  };

  // 4. Función para Iniciar Sesión 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/auth/login", loginData);
      alert("✅ " + res.data); 
      setLoginData({ email: '', passwordHash: '' }); 
      setView('admin'); 
    } catch (err) {
      alert("❌ " + (err.response?.data || "Error al conectar con el servidor"));
    }
  };

  // 5. Función para Registrar Usuario 
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/auth/register", registerData);
      alert("✅ " + res.data); 
      setRegisterData({ nombrePropietario: '', email: '', passwordHash: '' });
      setView('signin'); 
    } catch (err) {
      alert("❌ " + (err.response?.data || "Error al registrar usuario"));
    }
  };

  return (
    <div className="app-container">
      {/* 1. BARRA DE NAVEGACIÓN MODULAR */}
      <Navbar view={view} setView={setView} />
      
      <main>
        {/* 2. PÁGINA DE INICIO MODULAR */}
        {view === 'home' && <Home />}

        {/* 3. SIGN IN */}
        {view === 'signin' && (
          <section className="auth-section">
            <div className="auth-form">
              <h2>Sign in</h2>
              <form onSubmit={handleLogin}>
                <label>Username</label>
                <input 
                  type="email" 
                  placeholder="user@email.com" 
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required 
                />
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="********" 
                  value={loginData.passwordHash}
                  onChange={(e) => setLoginData({...loginData, passwordHash: e.target.value})}
                  required 
                />
                <button type="submit">Sign in</button>
              </form>
            </div>
            <div className="auth-image"><img src="/images/Signin.png" alt="Sign in" /></div>
          </section>
        )}

        {/* 4. REGISTER USER */}
        {view === 'register' && (
          <section className="auth-section">
            <div className="auth-form">
              <h2>Register</h2>
              <form onSubmit={handleRegisterUser}>
                <label>Full name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={registerData.nombrePropietario}
                  onChange={(e) => setRegisterData({...registerData, nombrePropietario: e.target.value})}
                  required 
                />
                <label>Email address</label>
                <input 
                  type="email" 
                  placeholder="user@email.com" 
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required 
                />
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="********" 
                  value={registerData.passwordHash}
                  onChange={(e) => setRegisterData({...registerData, passwordHash: e.target.value})}
                  required 
                />
                <button type="submit">Register Account</button>
              </form>
            </div>
            <div className="auth-image"><img src="/images/register.png" alt="Register" /></div>
          </section>
        )}

        {/* 5. ADMIN DASHBOARD MODULAR */}
        {view === 'admin' && (
          <AdminDashboard 
            vehiculos={vehiculos}  /* Le enviamos la lista de vehículos */
            setView={setView}      /* Le enviamos la función para cambiar de pantalla */
          />
        )}

        {/* 6. REGISTER VEHICLE */}
        {view === 'reg-vehicle' && (
          <section className="admin-panel" style={{padding: '40px 10%'}}>
            <div className="admin-links">
              <button className="active-link">Register vehicle</button>
              <button onClick={() => setView('exit')}>Exit vehicle</button>
              <button onClick={() => setView('admin')}>Admin vehicles</button>
            </div>
            <div className="dashboard-container">
              <div className="admin-form-container">
                <form onSubmit={handleRegisterVehicle}>
                  <div className="form-row">
                    <label>Owner name</label>
                    <input type="text" value={formData.ownerName} onChange={(e)=>setFormData({...formData, ownerName: e.target.value})} required/>
                  </div>
                  <div className="form-row">
                    <label>Vehicle type</label>
                    <select value={formData.tipoVehiculoId} onChange={(e)=>setFormData({...formData, tipoVehiculoId: parseInt(e.target.value)})}>
                      <option value="1">Car</option>
                      <option value="2">Motorcycle</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>License plate</label>
                    <input type="text" placeholder="ABC-123" value={formData.licensePlate} onChange={(e)=>setFormData({...formData, licensePlate: e.target.value})} required/>
                  </div>
                  <button type="submit" className="save-btn">Save Vehicle</button>
                </form>
              </div>
              <div className="admin-image"><img src="/images/RegisterVehicle.png" alt="Register" /></div>
            </div>
          </section>
        )}

        {/* 7. EXIT VEHICLE */}
        {view === 'exit' && (
          <section className="admin-panel" style={{padding: '40px 10%'}}>
            <div className="admin-links">
              <button onClick={() => setView('reg-vehicle')}>Register vehicle</button>
              <button className="active-link">Exit vehicle</button>
              <button onClick={() => setView('admin')}>Admin vehicles</button>
            </div>
            <div className="dashboard-container">
              <div className="admin-form-container">
                <form onSubmit={handleExitVehicle}>
                  <div className="form-row search-row">
                    <label>License plate</label>
                    <div className="search-group">
                      <input 
                        type="text" 
                        placeholder="ABC-123" 
                        value={exitPlate}
                        onChange={(e) => setExitPlate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="save-btn">Process Exit & Charge</button>
                </form>
              </div>
              <div className="admin-image exit-specific"><img src="/images/ExitVehicle.png" alt="Exit" /></div>
            </div>
          </section>
        )}

        {/* 8. REPORTS */}
        {view === 'reports' && (
          <section className="admin-panel" style={{padding: '40px 10%'}}>
             <div className="back-nav">
                <button onClick={() => setView('admin')} className="nav-link-btn-back">
                   &larr; Back to admin
                </button>
             </div>
             <div className="dashboard-container">
                <div className="admin-form-container">
                  <h2>Historic Reports</h2>
                  <div className="form-row"><label>Date range</label><input type="date" /></div>
                  <button className="download-btn">Download 📥</button>
                </div>
                <div className="admin-image reports-specific"><img src="/images/reports.png" alt="Reports" /></div>
             </div>
          </section>
        )}
      </main>

      {/* 9. CONTACT US / FOOTER MODULAR */}
      <Footer />
    </div>
  );
}

export default App;