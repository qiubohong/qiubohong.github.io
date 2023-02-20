import { RouteObject } from 'react-router-dom';

import Home from '@/pages/Home';

const ROUTER_CONFIG: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '*',
        element: <div>404</div>,
    },
];
export default ROUTER_CONFIG;