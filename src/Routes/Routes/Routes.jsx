
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";

import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import Homes from "../../Pages/Home/Homes";
import Matches from "../../Pages/Matches/Matches";
import PointTables from "../../Pages/PointTable/PointTables";
import Teams from "../../Pages/Teams/Teams";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
       
        children: [
            {
                path: '/',
                element: <Homes/>
            },
            {
                path: '/matches',
                element: <Matches/>
            },
            {
                path: '/pointTable',
                element: <PointTables/>
            },
            {
                path: '/teams',
                element: <Teams/>
            },
          
           
        ]
    },
    {
        path: '/dashboard',
        element: 
            <DashboardLayout></DashboardLayout>,
        
        children:[
            {
                path: '/dashboard',
                element: <>dashboard</>
            },
           
        ]
    }
    
]);