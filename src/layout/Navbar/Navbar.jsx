import React, {
    useState, useLayoutEffect, useEffect,
    useContext, useRef
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '#src/styles/App.scss';
import styles from '#src/styles/layout/Navbar/Navbar.module.scss';
import { authActions } from '#src/store/slices/Auth';
import useAuth from '#src/hooks/useAuth';

import { NavbarModuleContext } from '../../contexts/NavbarModuleContext';
import { NavbarModuleParent } from './NavbarModule';
import { NavbarItems } from './NavbarItems';

// CONSTANTS
const FULL_MENU_BREAKPOINT = 1024;
const SHORT_MENU_BREAKPOINT = 768;

const COLLAPSE_ICON = 'ri-close-fill';
const EXPAND_ICON = 'ri-menu-fill';

// Description of modes:
// 0 - without menu (class 'hide'), 1 - mobile menu (class 'mobile'), 2 - short menu (class 'short'), 3 - full menu (without additional class)
const translateMenuObject = (modeNumber) => {
    switch (modeNumber) {
        case 0:
            return { class: styles.hide, number: 0, icon: EXPAND_ICON };
        case 1:
            return { class: styles.mobile, number: 1, icon: COLLAPSE_ICON };
        case 2:
            return { class: styles.short, number: 2, icon: EXPAND_ICON };
        case 3:
            return { class: '', number: 3, icon: COLLAPSE_ICON };
    }
};

const initializeMenu = () => {
    if (window.innerWidth >= FULL_MENU_BREAKPOINT)
        return translateMenuObject(3);
    else if (window.innerWidth >= SHORT_MENU_BREAKPOINT)
        return translateMenuObject(2);
    else return translateMenuObject(0);
};

const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { user } = useAuth();

    const refTopContainer = useRef();
    const { setNavbarModule } = useContext(NavbarModuleContext);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mode, setMode] = useState(initializeMenu());

    const fitModeClass = () => {
        if (windowWidth >= FULL_MENU_BREAKPOINT)
            setMode(translateMenuObject(3));
        else if (windowWidth >= SHORT_MENU_BREAKPOINT)
            setMode(translateMenuObject(2));
        else setMode(translateMenuObject(0));
    };

    const handleMenuModeClick = () => {
        switch (mode.number) {
            case 0:
                setMode(translateMenuObject(1));
                break;
            case 1:
                setMode(translateMenuObject(0));
                break;
            case 2:
                setMode(translateMenuObject(3));
                break;
            case 3:
                setMode(translateMenuObject(2));
                break;
        }
    };

    const handleMenuClose = () => {
        if (mode.number === 1) setMode(translateMenuObject(0));
    };

    useLayoutEffect(() => {
        fitModeClass();
        setNavbarModule((prevState) => ({ ...prevState, reference: refTopContainer.current }))
    }, [windowWidth]);

    useEffect(() => {
        dispatch(authActions.getCurrentUser());

        const handleResize = () => {
            if (window.innerWidth !== windowWidth)
                setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className={`${styles.top} ${mode.class}`}>
                <div className={`${styles.upperContainer} ${mode.class}`}>
                    <div className={`${styles.logoContainer} ${mode.class}`}>
                        <Link
                            to="/home"
                            className={`${styles.logoImageLink} ${mode.class}`}
                        >
                            <div
                                className={`${styles.logoImage} ${mode.class}`}
                            >
                                <i className="ri-checkbox-blank-circle-line"></i>
                            </div>
                        </Link>
                        <Link to="/home">
                            <div
                                className={`${styles.logoAppName} ${mode.class}`}
                            >
                                DoDo
                            </div>
                        </Link>
                    </div>

                    <div
                        className={`${styles.menuIcon} ${mode.class}`}
                        onClick={handleMenuModeClick}
                    >
                        <i className={mode.icon}></i>
                    </div>
                </div>
                <NavbarModuleParent ref={refTopContainer} modeClass={mode.class}/>
            </div>

            <nav className={`${styles.side} ${mode.class}`}>
                <div className={`${styles.menuContainer} ${mode.class}`}>
                    <ul className={`${styles.menuList} ${mode.class}`}>
                        {NavbarItems.map((item, index) => {
                            const isActive =
                                location.pathname.split('/')[1] ===
                                item.link.split('/')[1];

                            const activeStyle = {
                                style: {
                                    backgroundColor: 'var(--darkgray-color)',
                                    color: 'var(--contrastbg-color)',
                                },
                            };

                            return (
                                <div
                                    key={index}
                                    className={`${styles.menuListWrapper} ${mode.class}`}
                                >
                                    <li
                                        key={index}
                                        className={`${styles.menuItem} ${mode.class}`}
                                    >
                                        <Link
                                            to={item.link}
                                            className={`${styles.menuLink} ${mode.class}`}
                                            onClick={handleMenuClose}
                                        >
                                            <div
                                                className={`${styles.menuLinkIcon} ${mode.class}`}
                                                {...(isActive && activeStyle)}
                                            >
                                                <i className={item.icon}></i>
                                            </div>
                                            <div
                                                className={`${styles.menuLinkTag} ${mode.class}`}
                                            >
                                                {item.name}
                                            </div>
                                        </Link>
                                    </li>
                                    {isActive && (
                                        <div
                                            className={`${styles.menuItemActive} ${mode.class}`}
                                        ></div>
                                    )}
                                </div>
                            );
                        })}
                    </ul>
                </div>

                <div className={`${styles.userContainer} ${mode.class}`}>
                    <div className={`${styles.logoutBackgroundSnippet} ${mode.class}`}>
                        <div className={`${styles.logoutBackground} ${mode.class}`}>
                            <div className={`${styles.userInfoContainer} ${mode.class}`}>
                                <div className={`${styles.userLogo} ${mode.class}`}>AV</div>
                                <div className={`${styles.userTextContainer} ${mode.class}`} >
                                    <div className={`${styles.line} ${mode.class}`}></div>
                                    <div className={`${styles.userName} ${mode.class}`}>
                                        {user?.username ?? ''}
                                    </div>
                                    <div className={`${styles.userLogout} ${mode.class}`} >PROFILE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
