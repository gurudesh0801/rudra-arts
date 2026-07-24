import { Wrench } from "lucide-react";
import "./Maintenance.css";

const Maintenance = () => (
  <main className="maintenance-page">
    <section className="maintenance-card" aria-labelledby="maintenance-title">
      <div className="maintenance-icon" aria-hidden="true">
        <Wrench size={38} strokeWidth={1.8} />
      </div>
      <p className="maintenance-label">RUDRA ARTS</p>
      <h1 id="maintenance-title">We’ll be back soon.</h1>
      <p className="maintenance-message">
        Our website is currently undergoing maintenance to make your experience
        better. Please check back shortly.
      </p>
      <span className="maintenance-status">
        <span /> Maintenance in progress
      </span>
    </section>
  </main>
);

export default Maintenance;
