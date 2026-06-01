
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
import AddTeam from "../../Components/AddTeam";
import AddPlayer from "../../Components/AddPlayer";
import EditTeam from "../../Components/EditTeam";
import EditPlayer from "../../Components/EditPlayer";
import AddMatch from "../../Components/AddMatch";
import EditMatch from "../../Components/EditMatch";
import AdminUpMatch from "../../Pages/Dashboards/AdminUpMatch";
import Login from "../../Pages/Login/Login";
// import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import News from "../../Pages/News/News";
import Players from "../../Pages/Players/Players";
import LiveMatch from "../../Pages/Dashboards/LiveMatch";






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
            {
                path: '/players',
                element: <Players/>
            },
            {
  path: "/login",
  element: <Login />,
},

// {
//   path: "/register",
//   element: <Register />,
// },
{
  path: "/news",
  element: <News />,
},


          
           
        ]
    },
    {
        path: '/dashboard',
        element: 
           <PrivateRoute>
             <DashboardLayout></DashboardLayout>
           </PrivateRoute>,
        
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
            {
                path: '/dashboard/addTeam',
                element: <AddTeam/>
            },
            {
  path: "/dashboard/editTeam/:id",
  element: <EditTeam />,
},
            {
  path: "/dashboard/addPlayer",
  element: <AddPlayer />,
},
{
    path: "/dashboard/editPlayer/:id",
    element: <EditPlayer/>
},

{
  path: "/dashboard/addMatch",
  element: <AddMatch />,
},
{
 path: "/dashboard/editMatch/:id",
  element:<EditMatch />
},
{
 path: "/dashboard/next-match",
  element:<AdminUpMatch/>
},
{
  path: "/dashboard/live-match/:id",
  element: <LiveMatch />,
}
           
        ]
    }
    
]);