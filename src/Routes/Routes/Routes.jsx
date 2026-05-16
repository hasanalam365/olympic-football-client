
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";

import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import Homes from "../../Pages/Home/Homes";
import Matches from "../../Pages/Matches/Matches";
import PointTables from "../../Pages/PointTable/PointTables";
import Teams from "../../Pages/Teams/Teams";
import Dashboard from "../../Pages/Dashboards/Dashboard";
import AdminMatches from "../../Pages/Dashboards/AdminMatches";
import AdminTeams from "../../Pages/Dashboards/AdminTeams";
import AdminPlayers from "../../Pages/Dashboards/AdminPlayers";






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
                element: <Dashboard/>
            },
            {
                path: '/dashboard/matches',
                element: <AdminMatches/>
            },
            {
                path: '/dashboard/teams',
                element: <AdminTeams/>
            },
            {
                path: '/dashboard/players',
                element: <AdminPlayers/>
            },
           
        ]
    }
    
]);