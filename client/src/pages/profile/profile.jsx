

import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';  // Import the CSS module4
import logo from '../../assets/logo.png'
import user from '../../assets/profile-user.png'
import Dashboard from './components/Dashboard';


const Profile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isOwner, setIsOwner] = useState(false);  // New state for owner

    const checkAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/check-auth', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User Data:', data);
                setUserData(data.user);
                setIsAuthenticated(true);
                setIsOwner(data.isOwner);  // Set owner status from backend
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Failed to verify authentication:', error);
            setIsAuthenticated(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setUserData(null);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    // const handleGoogleLogin = () => {
    //     window.location.href = 'http://localhost:5000/auth/google';
    // };
    const handleGoogleLogin = (isOwner = false) => {
        console.log(isOwner)
        const loginURL = `http://localhost:5000/auth/google?isOwner=${isOwner}`;
        window.location.href = loginURL;
    };

    const renderNotAuthenticated = () => (
        <div className={styles.mainContainer}>
            <div className={styles.leftPane}>
                {/* <img src={ground} alt="Ground" className={styles.groundImage} />  */}
                <p>Leave the excuses at home</p>
                <p>bring your A-game to the turf.</p>
            </div>
            <div className={styles.rightPane}>
                <h2>Get Started</h2>
                <div>
                    <button className={styles.loginBtn} onClick={() => handleGoogleLogin(false)}>Log in</button>
                    <button className={styles.loginBtn} onClick={() => handleGoogleLogin(false)}>Sign up</button>
                </div>
                <div className={styles.ownerLogin}>
                    <img src={logo}/>
                    <button className={styles.ownerBtn} onClick={() => handleGoogleLogin(true)}>Are you a turf owner? | <u>Go to Dashboard</u></button>
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className={styles.mainContainer}>
            <div className={styles.userPane}>
                <div className={styles.p1}>
                    <h1 className={styles.heading}>Player Profile</h1>
                    {userData ? (
                        <div className={styles.profileInfo}>
                            <div className={styles.info}>{userData.displayName}</div>
                            <div className={styles.info}>{userData.email}</div>
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
                <div className={styles.p2}>
                    <img src={user} />
                    <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </div>
    );

    // Render the profile for owners
    const renderOwnerProfile = () => (
        <div className={styles.mainContainer2}>
            <div className={styles.ownerPane}>
                {/* <h1 className={styles.heading}>Owner Dashboard</h1> */}
                {userData ? (
                    <div className={styles.profileInfo}>
                        <img src={user} />
                        <div className={styles.info}>Owner: {userData.displayName}</div>
                        <div className={styles.info}>Email: {userData.email}</div>
                    </div>
                ) : (
                    <p>Loading owner data...</p>
                )}
                <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
            <Dashboard/>

        </div>
    );

    if (!isAuthenticated) {
        return renderNotAuthenticated();
    }

    return isOwner ? renderOwnerProfile() : renderProfile();
    // return isAuthenticated ? renderProfile() : renderNotAuthenticated();
};

export default Profile;
