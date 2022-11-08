import { useRoutes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
export default function Router() {
    return useRoutes([
        {
            path: 'chat',
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

    ])
}