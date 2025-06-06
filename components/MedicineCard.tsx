
import React from 'react';
import { Medicine } from '../types';

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  return (
    <article className="medicine-card card" aria-labelledby={`med-name-${medicine.id}`}>
      <h3 id={`med-name-${medicine.id}`}>{medicine.name}</h3>
      {medicine.description && <p className="description">{medicine.description}</p>}
      <p className="price">Price: ${medicine.price.toFixed(2)}</p>

      {medicine.alternatives && medicine.alternatives.length > 0 && (
        <>
          <h4>Cheaper Alternatives:</h4>
          <ul className="alternatives-list">
            {medicine.alternatives.map((alt, index) => (
              <li key={index}>
                <span className="alt-name">{alt.name}</span> - 
                <span className="alt-price"> ${alt.price.toFixed(2)}</span>
                {alt.savings && <span className="alt-savings"> (Save {alt.savings})</span>}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
};

export default MedicineCard;
