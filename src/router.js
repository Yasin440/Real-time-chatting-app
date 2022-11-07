import { useRoute } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
export default function Router() {
    return useRoute([
        {
            path: '/login', element: <Registration />
        },
        {
            path: '/login', element: <Login />
        },
    ])
}