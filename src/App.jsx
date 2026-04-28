import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [view, setView] = useState('home'); 
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [formData, setFormData] = useState({ ownerName: '', licensePlate: '', tipoVehiculoId: 1 });

  const API_URL = "http://localhost:8081/api/vehiculos";

  useEffect(() => {
    if (view === 'admin') fetchVehiculos();
  }, [view]);

  const fetchVehiculos = async () => {
    try {
      const res = await axios.get(`${API_URL}/activos`);
      setVehiculos(res.data);
    } catch (err) { console.error("Error al cargar vehículos", err); }
  };

  const handleRegisterVehicle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/registrar`, formData);
      alert("¡Vehículo Registrado con éxito!");
      setFormData({ ownerName: '', licensePlate: '', tipoVehiculoId: 1 });
      setView('admin');
    } catch (err) { alert("Error en el servidor al registrar"); }
  };

  const Navbar = () => (
    <header className="navbar">
      <div className="logo" onClick={() => setView('home')}>
        <img src="/images/logo.png" alt="logo" />
      </div>
      <button className="nav-toggle" onClick={() => setIsMenuVisible(!isMenuVisible)}>☰</button>
      <nav className="nav">
        <ul className={`menu ${isMenuVisible ? 'nav-visible' : ''}`}>
          {['home', 'signin', 'register'].includes(view) ? (
            <>
              <li><a href="#services" onClick={() => setView('home')}>Services</a></li>
              <li><a href="#contact">Contact us</a></li>
              <li><button onClick={() => setView('signin')} className="nav-link-btn">Sign in</button></li>
              <li><button onClick={() => setView('register')} className="nav-link-btn">Register</button></li>
            </>
          ) : (
            <>
              <li><button onClick={() => setView('reports')} className="nav-link-btn">Reports</button></li>
              <li><button onClick={() => setView('home')} className="nav-link-btn">Sign out</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );

  return (
    <div className="app-container">
      <Navbar />
      <main>
        {view === 'home' && (
          <>
            <section className="home" id="home">
              <div className="home-content">
                <h2>Home</h2>
                <p>Streamline parking management with a simple platform that records check-in and check-out times.</p>
                <ul>
                  <li>Automatic entry and exit logging.</li>
                  <li>License plate identification.</li>
                  <li>Instant price calculation.</li>
                </ul>
              </div>
              <img src="/images/home-icono1.png" alt="Icon 1" />
            </section>
            <section className="Services" id="services">
              <div className="services-content">
                <h2>Services</h2>
                <p>Comprehensive tools to manage the parking lot from any device.</p>
                <ul>
                    <li>Access control.</li>
                    <li>Rate management.</li>
                    <li>Reporting and audit.</li>
                </ul>
              </div>
              <img src="/images/home-icono2.png" alt="Icon 2" />
            </section>
          </>
        )}

        {view === 'signin' && (
          <section className="auth-section">
            <div className="auth-form">
              <h2>Sign in</h2>
              <form onSubmit={(e) => { e.preventDefault(); setView('admin'); }}>
                <label>Username</label><input type="text" placeholder="user@email.com" required />
                <label>Password</label><input type="password" placeholder="********" required />
                <button type="submit">Sign in</button>
              </form>
            </div>
            <div className="auth-image"><img src="/images/Signin.png" alt="Sign in" /></div>
          </section>
        )}

        {view === 'register' && (
          <section className="auth-section">
            <div className="auth-form">
              <h2>Register</h2>
              <form onSubmit={(e) => { e.preventDefault(); setView('signin'); }}>
                <label>Full name</label><input type="text" placeholder="John Doe" required />
                <label>Email address</label><input type="email" placeholder="user@email.com" required />
                <label>Password</label><input type="password" placeholder="********" required />
                <button type="submit">Register Account</button>
              </form>
            </div>
            <div className="auth-image"><img src="/images/register.png" alt="Register" /></div>
          </section>
        )}

        {view === 'admin' && (
          <section className="admin-panel" style={{padding: '40px 10%'}}>
            <div className="admin-links">
              <button onClick={() => setView('reg-vehicle')}>Register vehicle</button>
              <button onClick={() => setView('exit')}>Exit vehicle</button>
              <button className="active-link">Admin vehicles</button>
            </div>
            <p className="description">Manage the currently registered vehicles</p>
            <div className="dashboard-container">
              <div className="vehicle-grid">
                <div className="grid-header">License plate</div>
                <div className="grid-header">Type</div>
                <div className="grid-header">Arrival</div>
                <div className="grid-header">Status</div>
                {vehiculos.length > 0 ? vehiculos.map(v => (
                  <React.Fragment key={v.registroid}>
                    <div className="grid-item">{v.licensePlate}</div>
                    <div className="grid-item">{v.tipoVehiculoId === 1 ? 'Car' : 'Moto'}</div>
                    <div className="grid-item">{new Date(v.arrivalTime).toLocaleTimeString()}</div>
                    <div className="grid-item"><span className="status-badge">Active</span></div>
                  </React.Fragment>
                )) : <div className="grid-item" style={{gridColumn: 'span 4', textAlign: 'center'}}>No vehicles active.</div>}
              </div>
              <div className="admin-image"><img src="/images/admin.png" alt="Admin" /></div>
            </div>
          </section>
        )}

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

        {view === 'exit' && (
          <section className="admin-panel" style={{padding: '40px 10%'}}>
            <div className="admin-links">
              <button onClick={() => setView('reg-vehicle')}>Register vehicle</button>
              <button className="active-link">Exit vehicle</button>
              <button onClick={() => setView('admin')}>Admin vehicles</button>
            </div>
            <div className="dashboard-container">
              <div className="admin-form-container">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row search-row">
                    <label>License plate</label>
                    <div className="search-group">
                      <input type="text" placeholder="ABC-123" />
                      <button type="button" className="search-btn">🔍 Search</button>
                    </div>
                  </div>
                  <div className="form-row"><label>Charge</label><input type="text" readOnly placeholder="$0.00" /></div>
                  <button type="button" className="save-btn" onClick={() => setView('admin')}>Process Exit</button>
                </form>
              </div>
              <div className="admin-image exit-specific"><img src="/images/ExitVehicle.png" alt="Exit" /></div>
            </div>
          </section>
        )}

{/* 7. REPORTS (reports.html) */}
{view === 'reports' && (
  <section className="admin-panel" style={{padding: '40px 10%'}}>
     {/* Cambiamos className="nav-link-btn" por "nav-link-btn-back" */}
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

        <section className="Contact-us" id="contact">
          <h2>Contact us</h2>
          <div className="contact-container">
            <div className="contact-item"><h3>Call us</h3><p>+573224121883</p></div>
            <div className="contact-item whatsapp"><h3>WhatsApp</h3><p>+573224121883</p></div>
            <div className="contact-item instagram"><h3>Instagram</h3><p>@wiseparking</p></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;