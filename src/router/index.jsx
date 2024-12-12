import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/index.jsx';
import PokemonDetails from '../pages/PokemonDetails/index.jsx';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/pokenavigator', // Página inicial
      element: <Home />,
    },
    {
      path: '/pokemon/:id', // Página de detalhes do Pokémon com parâmetro dinâmico
      element: <PokemonDetails />,
    },
  ]);

  return <RouterProvider router={router} />;
}
