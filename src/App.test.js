import React from 'react';
import { render } from '@testing-library/react';
import Home from './components/home/Home';
import DashBoardPasajero from './components/dashboard_pasajero/DashBoardPasajero';

// Prueba Render Home
test('render Home', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/¿Quienes somos?/i);
  expect(linkElement).toBeInTheDocument();
});

