import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import {useSelector} from "react-redux";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AppliedJobs from "./pages/user/AppliedJobs";
import Profile from "./pages/user/profile";
import PostedJobs from "./pages/user/postedjobs";
import NewEditJob from "./pages/user/postedjobs/NewEditJob";
import AllJobs from "./pages/admin/AllJobs";
import AllUsers from "./pages/admin/AllUsers";
import JobDescription from "./pages/JobDescription";
import Notifications from "./pages/Notifications";
import {LangForm} from "./pages/lang/LangForm";
import {LangList} from "./pages/lang/LangList";
import {LangEdu} from "./pages/lang/LangEdu";
import {FirebaseComponent} from "./components/FirebaseComponent";
import PaginatedList from "./pages/lang/PaginatedList";
import Sqlite from "./pages/Sqlite";

// function AdminJobs() {
//     return null;
// }

// function AllUsers() {
//     return null;
// }

function Router() {
    const {loading} = useSelector(state => state.alert);
    return (
        <div>
            {loading && <Loader/>}
            <BrowserRouter>
                <Routes>

                    {/*<Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />*/}
                    <Route path="/" element={ <ProtectedRoute><LangEdu /></ProtectedRoute> } />
                    {/*<Route path="/lang/edu" element={ <ProtectedRoute><LangEdu /></ProtectedRoute> } />*/}


                    <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> } />
                    {/*<Route path="/register" element={ <PublicRoute><Register /></PublicRoute> } />*/}
                    <Route path="/applied-jobs" element={ <ProtectedRoute><AppliedJobs /></ProtectedRoute> } />
                    <Route path="/posted-jobs" element={ <ProtectedRoute><PostedJobs /></ProtectedRoute> } />
                    <Route path="/posted-jobs/new" element={ <ProtectedRoute><NewEditJob /></ProtectedRoute> } />
                    <Route path="/posted-jobs/edit/:id" element={ <ProtectedRoute><NewEditJob /></ProtectedRoute> } />
                    {/*<Route path="/profile/:id" element={ <ProtectedRoute><Profile /></ProtectedRoute> } />*/}
                    <Route path="/profile/" element={ <ProtectedRoute><Profile /></ProtectedRoute> } />
                    <Route path="/notifications" element={ <ProtectedRoute><Notifications /></ProtectedRoute> } />
                    <Route path="/job-description/:id" element={ <ProtectedRoute><JobDescription /></ProtectedRoute> } />


                    <Route path="/app" element={ <ProtectedRoute><LangList /></ProtectedRoute> } />
                    <Route path="/app/new" element={ <ProtectedRoute><LangForm /></ProtectedRoute> } />
                    <Route path="/app/edit/:id" element={ <ProtectedRoute><LangForm /></ProtectedRoute> } />


                    <Route path="/admin/jobs" element={ <ProtectedRoute><AllJobs /></ProtectedRoute> } />
                    <Route path="/admin/users" element={ <ProtectedRoute><AllUsers /></ProtectedRoute> } />

                    {/*<Route path="/admin/ajax" element={ <FirebaseComponent /> } />*/}
                    <Route path="/list" element={ <ProtectedRoute><PaginatedList /></ProtectedRoute> } />
                    {/*<Route path="/sqlite" element={ <ProtectedRoute><Sqlite /></ProtectedRoute> } />*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;
