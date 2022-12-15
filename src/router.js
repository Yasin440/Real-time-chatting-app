import { useRoutes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Messenger from './pages/Messenger';
import Registration from './pages/Registration';
export default function Router() {
    return useRoutes([
        {
            path: 'user',
            // element: '',
            children: [
                {
                    path: 'registration', element: <Registration />
                },
                {
                    path: 'login', element: <Login />
                },
            ]
        },
        {
            path: '/',
            element: <Messenger />,
            children: []
        },

    ])
}