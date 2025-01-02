import React from 'react';
import styles from './tournament.module.css';
import loc from '../../assets/location-pin.png';

const Tournaments = () => {
    // const colors = [
    //     '#FF5733', 
    //     '#33FF57', 
    //     '#3357FF', 
    //     '#FF33A5', 
    //     '#FFC300', 
    //     '#DAF7A6', 
    //     '#900C3F', 
    //     '#581845', 
    //     '#FF5733', 
    //     '#C70039'
    // ];

    const colors = [
        '#FF5733', // Bright green
        '#33FF57', // Bright blue
        '#FFC300', // Yellow
        '#FF5733', // Orange
        '#3357FF', // Bright pink
        '#C70039',  // Red
        '#FF33A5', // yellow
        '#DAF7A6', // Light Green
    ];

    const tournaments = [
        {
            id: 1,
            name: 'City Football Championship',
            sport: 'Football',
            location: 'New York, USA',
            date: '2024/11/05',
            teamSize: 11,
            prize: '$5000',
            contact: {
                name: 'John Doe',
                phone: '+1 234-567-890',
                email: 'johndoe@example.com',
            }
        },
        {
            id: 2,
            name: 'Basketball Extravaganza',
            sport: 'Basketball',
            location: 'Los Angeles, USA',
            date: '2024/12/10',
            teamSize: 5,
            prize: '$3000',
            contact: {
                name: 'Sarah Smith',
                phone: '+1 987-654-321',
                email: 'sarah.smith@example.com',
            }
        },
        {
            id: 3,
            name: 'Badminton World Cup Qualifiers',
            sport: 'Badminton',
            location: 'Mumbai, India',
            date: '2024/10/20',
            teamSize: 2,
            prize: '$4000',
            contact: {
                name: 'Rajesh Gupta',
                phone: '+91 98765-43210',
                email: 'rajesh.gupta@example.com',
            }
        },
        {
            id: 4,
            name: 'Cricket Premier League',
            sport: 'Cricket',
            location: 'London, UK',
            date: '2024/11/15',
            teamSize: 11,
            prize: '£10000',
            contact: {
                name: 'David Miller',
                phone: '+44 123-456-789',
                email: 'david.miller@example.com',
            }
        },
    ];

    return (
        <div className={styles.tournamentPage}>
            <h2 className={styles.pageHeading}>OPEN TOURNAMENTS</h2>
            <div className={styles.tournamentContainer}>
                {tournaments.map((tournament) => (
                    <div               
                    key={tournament.id} className={styles.tournamentCard} style={{ backgroundColor: colors[tournament.id % colors.length] }}>
                        <div className={styles.details}>
                            <div className={styles.header}>
                                <h3 className={styles.tournamentHeading}>{tournament.name}</h3>
                                <p>{tournament.sport}</p>
                            </div>       
                            <p className={styles.cardcity}><img src={loc} />{tournament.location}</p>
                            <p className={styles.cardInfo}> <strong>Team Size</strong> {tournament.teamSize} </p>
                            <div className={styles.content}>
                                <p className={styles.tournamentDetails}>
                                    <strong className={styles.label}>Date</strong><br/>{tournament.date}
                                </p>
                                <p className={styles.tournamentDetails}>
                                    <strong className={styles.label}>Prize Pool</strong><br/>{tournament.prize}
                                </p>
                            </div>
                        </div>
                        <div className={styles.contactDetails}>
                            <p><strong>Contact:</strong> {tournament.contact.name}</p>
                            <p><strong>Phone:</strong> {tournament.contact.phone}</p>
                            <p><strong>Email:</strong> {tournament.contact.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tournaments;
