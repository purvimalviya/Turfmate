import React, { useState, useEffect } from 'react';
import styles from './BuildTeam.module.css';
import loc from '../../assets/location-pin.png'


const BuildTeam = () => {
    const [teamRequirements, setTeamRequirements] = useState([]);
    const [postedRequirements, setPostedRequirements] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        skillLevel: 'noob',
        teamSize: '',
        emptySpots: '',
        sport: 'Football',
        city: '',
        date: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/team/requirement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                // throw new Error('Failed to post team requirement');
                window.location.href = 'http://localhost:5000/auth/google';
                return;
            }

            const newRequirement = await response.json();
            setTeamRequirements((prevRequirements) => [...prevRequirements, newRequirement]);

            setFormData({
                description: '',
                skillLevel: 'noob',
                teamSize: '',
                emptySpots: '',
                sport: 'Football',
                city: '',
                date: ''
            });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleJoinRequest = async (requirementId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/team/join/${requirementId}`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                alert('Join request sent already!');
                throw new Error('Failed to send join request');
            }

            alert('Join request sent successfully!');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    useEffect(() => {
        const fetchTeamRequirements = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/team/');
                const data = await response.json();
                setTeamRequirements(data);
            } catch (error) {
                console.error('Failed to fetch team requirements:', error);
            }
        };

        const fetchPostedRequirements = async () => {
            try {

                const response = await fetch('http://localhost:5000/api/team/user-requirements', {
                    credentials: 'include' // To send cookies for authentication
                });
                const data = await response.json();
                setPostedRequirements(data);
            } catch (error) {
                console.error('Failed to fetch posted requirements:', error);
            }
        };

        fetchTeamRequirements();
        fetchPostedRequirements();
    }, []);

    return (
        <div className={styles.buildpage}>
            {/* <h2 className={styles.formHeading}>Post Your Team Requirement</h2> */}
            <div className={styles.buildflex}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={styles.textarea}
                            placeholder="Describe your team needs"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Skill Level</label>
                        <select
                            name="skillLevel"
                            value={formData.skillLevel}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="noob">Noob</option>
                            <option value="mid">Mid</option>
                            <option value="seasoned">Seasoned</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Team Size</label>
                        <input
                            type="number"
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Total team size"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Empty Spots</label>
                        <input
                            type="number"
                            name="emptySpots"
                            value={formData.emptySpots}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Number of empty spots"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Sport</label>
                        <select
                            name="sport"
                            value={formData.sport}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="Football">Football</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Cricket">Cricket</option>
                            <option value="Badminton">Badminton</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="City name"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>Post Requirement</button>
                </form>
                
                <div className={styles.reqpost}>
                    <h3 className={styles.teamRequirementsHeading}>Current Empty Spots</h3>
                    {/* <div> */}
                        {teamRequirements.length > 0 ? (
                            teamRequirements.map((requirement, index) => (
                                <div key={index} className={styles.teamCard}>
                                    <p className={styles.cardsport}>{requirement.sport}</p>
                                    <h4 className={styles.cardHeading}>{requirement.description}</h4>
                                    <p className={styles.cardcity}><img src={loc} />{requirement.city}</p>

                                    <p className={styles.cardInfo}><strong>Skill Level </strong> {requirement.skillLevel}</p>
                                    <p className={styles.cardInfo}><strong>Date </strong>{new Date(requirement.date).toLocaleDateString()}</p> {/* Display date */}
                                    <p className={styles.cardInfo}><strong>Team Size </strong> {requirement.teamSize}</p>
                                    <p className={styles.cardInfo}><strong>Empty Spots </strong> {requirement.emptySpots}</p>
                                    <button className={styles.requestButton} onClick={() => handleJoinRequest(requirement._id)}>
                                        Request to Join &rarr;
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No team requirements posted yet</p>
                        )}
                </div>
                
            </div>

            {/* New Section to Show Posted Requirements */}
            <div className={styles.postedRequirements}>
                    <h3 className={styles.postedRequirementsHeading}>Post Responses</h3>
                    {postedRequirements.length > 0 ? (
                        postedRequirements.map((requirement, index) => (
                            <div key={index} className={styles.teamCard}>
                                <div className={styles.header}>
                                    <div>
                                        <p className={styles.cardsport}>{requirement.sport}</p>
                                        <h4 className={styles.cardHeading}>{requirement.description}</h4>
                                    </div>
                                    <div>
                                        <p className={styles.cardcity}><img src={loc} />{requirement.city}</p>
                                        <p className={styles.cardInfo}><strong>Date </strong>{new Date(requirement.date).toLocaleDateString()}</p> {/* Display date */}
                                        <p className={styles.cardInfo}><strong>Empty Spots </strong> {requirement.emptySpots}</p>
                                    </div>
                                </div>
                                <div className={styles.requestersContainer}>
                                    <h5 className={styles.requestersHeading}>Requests</h5>
                                    {requirement.requesters.length > 0 ? (
                                        requirement.requesters.map((requester, rIndex) => (
                                            <p key={rIndex} className={styles.requesterInfo}>
                                                {requester.displayName} - {requester.email}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No requests yet</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No requirements posted by you yet</p>
                    )}
                </div>
            
        </div>
    );
};

export default BuildTeam;
