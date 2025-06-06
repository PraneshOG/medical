
import React from 'react';
import { Pharmacy } from '../types';

interface PharmacyListProps {
  pharmacies: Pharmacy[];
}

const PharmacyList: React.FC<PharmacyListProps> = ({ pharmacies }) => {
  if (!pharmacies || pharmacies.length === 0) {
    return <p className="no-results">No pharmacies listed at the moment.</p>;
  }

  return (
    <section className="pharmacy-section card" aria-labelledby="pharmacy-heading">
      <h2 id="pharmacy-heading">Nearby Pharmacies</h2>
      <ul className="pharmacy-list">
        {pharmacies.map(pharmacy => (
          <li key={pharmacy.id}>
            <h3 className="pharmacy-name">{pharmacy.name}</h3>
            <p className="pharmacy-address">{pharmacy.address}</p>
            {pharmacy.phone && <p className="pharmacy-phone">Phone: {pharmacy.phone}</p>}
            {pharmacy.hours && <p className="pharmacy-hours">Hours: {pharmacy.hours}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PharmacyList;
