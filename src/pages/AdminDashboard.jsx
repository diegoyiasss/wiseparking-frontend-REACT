import React from 'react';

// Atrapamos los props (vehiculos y setView)
const AdminDashboard = ({ vehiculos, setView }) => {
  return (
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
          
          {/* Ciclo para dibujar los vehículos recibidos por props */}
          {vehiculos.length > 0 ? vehiculos.map((v, index) => (
            <React.Fragment key={v.registroid || index}>
              <div className="grid-item">{v.licensePlate}</div>
              <div className="grid-item">{v.tipoVehiculoId === 1 ? 'Car' : 'Moto'}</div>
              <div className="grid-item">{new Date(v.arrivalTime).toLocaleTimeString()}</div>
              <div className="grid-item"><span className="status-badge">Active</span></div>
            </React.Fragment>
          )) : <div className="grid-item" style={{gridColumn: 'span 4', textAlign: 'center'}}>No vehicles active.</div>}
          
        </div>
        
        <div className="admin-image">
          <img src="/images/admin.png" alt="Admin" />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;