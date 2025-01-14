import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import './styles/App.scss';

import store from './store';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toastConfig } from './configs/toast';

import Layout from './layout/Layout';
import Home from './pages/home';
import ToDoList from './pages/todolist';
import Calendar from './pages/calendar';
import Settings from './pages/settings';
import Login from './pages/login';
import Modal from './components/widgets/ModalWidget';

import {
    NavbarModuleContext,
    initialNavbarModuleContext,
} from './contexts/NavbarModuleContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeContext, initialThemeContext } from './contexts/ThemeContext';

import getStoredTheme from './components/utils/getStoredTheme';

const IS_GOOGLE_AVAILABLE =
    import.meta.env.VITE_GOOGLE_CLIENT_ID !== '' &&
    import.meta.env.VITE_GOOGLE_CLIENT_ID !== undefined;
// TODO: pack it to different component

const App = () => {
    const [navbarModule, setNavbarModule] = useState(
        initialNavbarModuleContext,
    );

    const [theme, setTheme] = useState(getStoredTheme);

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    return (
        <main className="main" themestyle={theme.style} thememode={theme.mode}>
            <GoogleOAuthProvider
                clientId={
                    import.meta.env.VITE_GOOGLE_CLIENT_ID ?? 'defaultnotvalid'
                }
            >
                <ToastContainer {...toastConfig} theme="light" />
                <Provider store={store}>
                    <ThemeContext.Provider value={{ theme, setTheme }}>
                        <NavbarModuleContext.Provider
                            value={{ navbarModule, setNavbarModule }}
                        >
                            <Router>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <Navigate
                                                to="/home"
                                                replace={true}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/home"
                                        element={Layout({
                                            Component: Home,
                                            props: {},
                                        })}
                                    />
                                    <Route
                                        path="/calendar"
                                        element={Layout({
                                            Component: Calendar,
                                            props: {},
                                        })}
                                    />
                                    <Route
                                        path="/todolist"
                                        element={Layout({
                                            Component: ToDoList,
                                            props: {},
                                        })}
                                    />
                                    <Route
                                        path="/categories"
                                        element={Layout({
                                            Component: Home,
                                            props: {},
                                        })}
                                    />
                                    <Route
                                        path="/notes"
                                        element={Layout({
                                            Component: Home,
                                            props: {},
                                        })}
                                    />
                                    <Route
                                        path="/settings/*"
                                        element={Layout({
                                            Component: Settings,
                                            props: {},
                                        })}
                                    />
                                    <Route
                                        path="*"
                                        element={<div>Not found</div>}
                                    />
                                    <Route path="/login" element={<Login />} />
                                </Routes>
                            </Router>
                        </NavbarModuleContext.Provider>
                    </ThemeContext.Provider>
                </Provider>
            </GoogleOAuthProvider>
        </main>
    );
};

export default App;
