import React from 'react';
import './Timeline.css';

const Timeline = ({ eventos }) => {
  return (
    <ul className="timeline">
      {eventos.map((item, index) => (
        <li key={index}>
          <span className="fecha">{item.fecha}</span> –{' '}
          <span className={item.estado === 'Presente' ? 'presente' : 'ausente'}>
            {item.estado}
          </span>{' '}
          en <strong>{item.materia}</strong>
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
