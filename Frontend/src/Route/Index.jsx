import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import HomeLayout from '../Pages/HomeLayout';
import StockList from '../Components/StockList';
import Position from '../Pages/Position';
import NewsRedirect from '../Pages/NewsRedirect';
import Money from '../Pages/Money';
import AdminPanel from '../Pages/AdminPanel';  // ✅ Import Admin Panel
import UsersTable from '../Components/UsersTable';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/home',
        element: <HomeLayout />, // ✅ Navbar yaha hamesha dikhega
        children: [
            {
                path: '',
                element: <StockList />,
            },
            { 
                path: "position", 
                element: <Position />
            },
            { 
                path: "money", 
                element: <Money /> 
            },
            { 
                path: "news", 
                element: <NewsRedirect />
            },
            { 
                path: "admin",  // ✅ Admin Panel ka route
                element: <AdminPanel />,
            },
        ],
    },
    {
        path: "/allusers",
        element: <UsersTable/>,
    }
]);

export default router;
