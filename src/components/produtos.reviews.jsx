import React from 'react';

export function ProductReviews({ reviews }) {
  // Evita erro caso algum produto ainda não tenha avaliações cadastradas
  if (!reviews || reviews.length === 0) {
    return <p>Este produto ainda não possui avaliações.</p>;
  }

  return (
    <section style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
      <h3>Avaliações de Clientes ({reviews.length})</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {reviews.map((review) => (
          <div 
            key={review.id} 
            style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fafafa' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong>{review.user}</strong>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>{review.date}</span>
            </div>
            
            {/* Exibe as estrelas baseadas na nota */}
            <div style={{ color: '#f5a623', marginBottom: '0.5rem' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            
            <p style={{ margin: 0, color: '#333' }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
