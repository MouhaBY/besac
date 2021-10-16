import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import './Main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hello from '../Hello';
import Error from '../Error';
import ListUsers from '../Users/ListUsers';
import AddUser from '../Users/AddUser';
import EditUser from '../Users/EditUser';
import ViewUser from '../Users/ViewUser';
import Profiles from '../Profiles';
import { ShowBarProvider, userDataContext } from '../../utils/context';
import { useEffect } from 'react';
import { getUser } from '../../WS/API';

const TITLE = 'Solution';

const getUserId = () => {
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    return token?.userId
};

const getUserData = (userId, funct) => {
    getUser(userId).then(result =>{
        funct(result);
    })
}

function Main({ setToken }){
    const { toggleUserData } = useContext(userDataContext);

    useEffect(()=>{
        getUserData(getUserId(), toggleUserData )
    },[toggleUserData])

    return(
        <div className="MainContainer">
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <ShowBarProvider>
                <Navigation/>
                <div className="MainSubContainer">
                    <Header setToken={setToken}/>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Hello />
                            </Route>
                            <Route exact path="/users">
                                <ListUsers />
                            </Route>
                            <Route exact path="/users/add">
                                <AddUser />
                            </Route>
                            <Route exact path="/users/edit/:id">
                                <EditUser />
                            </Route>
                            <Route exact path="/users/view/:id">
                                <ViewUser />
                            </Route>
                            <Route exact path="/profiles">
                                <Profiles />
                            </Route>
                            <Route>
                                <Error />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </ShowBarProvider>
        </div>
    )
}

export default Main;