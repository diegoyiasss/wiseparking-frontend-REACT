import React from 'react';

const Home = () => {
  return (
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
  );
};

export default Home;