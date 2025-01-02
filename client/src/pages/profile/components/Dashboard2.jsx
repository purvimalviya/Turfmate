// import React, { useState, useEffect } from 'react';

// // const AddTurf = () => {
// const Dashboard = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     allsports: [], // Initialize as an array
//     location:{},
//     // address: '',
//     features: {
//       lighting: false,
//       parking: false,
//       restrooms: false,
//     },
//     contact_info: {
//       phone: '',
//       email: '',
//     },
//     city: '',
//     price_per_sport: {
//       Soccer: '',
//       Football: '',
//     },
//     slots: {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//       Saturday: [],
//       Sunday: [],
//     },
//     average_price: '',
//   });

//   const [ownerId, setOwnerId] = useState(null); // State to hold owner ID
//   const [message, setMessage] = useState('');

//   // Fetch owner ID when the component mounts
//   useEffect(() => {
//     const fetchOwnerId = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/auth/user', {
//           method: 'GET',
//           credentials: 'include', // Include credentials like cookies
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setOwnerId(data.user._id); // Adjust according to your API response structure
//         console.log(data)
//         console.log(ownerId)
//       } catch (error) {
//         console.error('Error fetching owner ID:', error);
//         setMessage('Error fetching owner ID');
//       }
//     };

//     fetchOwnerId();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       features: {
//         ...prevData.features,
//         [name]: checked,
//       },
//     }));
//   };

//   // Handle nested input changes for contact_info
//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       contact_info: {
//         ...prevData.contact_info,
//         [name]: value,
//       },
//     }));
//   };

//   // Handle input changes for allsports (convert string to array)
//   const handleSportsChange = (e) => {
//     const { value } = e.target;
//     const sportsArray = value.split(',').map((sport) => sport.trim());
//     setFormData((prevData) => ({
//       ...prevData,
//       allsports: sportsArray,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Prepare request data
//       const requestData = {
//         ...formData,
//         ownerId,  // Include the fetched owner ID
//       };

//       // Make the POST request to add turf
//       const response = await fetch('http://localhost:5000/api/management/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include credentials like cookies
//         body: JSON.stringify(requestData), // Convert request data to JSON
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setMessage(result.message);
//     } catch (error) {
//       console.error('Error adding turf:', error);
//       setMessage('Error adding turf');
//     }
//   };

//   return (
//     <div>
//       <h1>Add a New Turf</h1>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         {/* Turf Details */}
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
//         </div>
//         <div>
//           <label>Sports (comma-separated):</label>
//           <input type="text" name="allsports" value={formData.allsports.join(', ')} onChange={handleSportsChange} placeholder="Soccer, Football" />
//         </div>

//         {/* Location */}
//         {/* <div>
//           <label>Address:</label>
//           <input type="text" name="address" value={formData.address} onChange={handleChange} />
//         </div> */}

//         {/* Features */}
//         <div>
//           <label>Features:</label>
//           <div>
//             <label>Lighting</label>
//             <input type="checkbox" name="lighting" checked={formData.features.lighting} onChange={handleCheckboxChange} />
//           </div>
//           <div>
//             <label>Parking</label>
//             <input type="checkbox" name="parking" checked={formData.features.parking} onChange={handleCheckboxChange} />
//           </div>
//           <div>
//             <label>Restrooms</label>
//             <input type="checkbox" name="restrooms" checked={formData.features.restrooms} onChange={handleCheckboxChange} />
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <label>Phone:</label>
//           <input type="text" name="phone" value={formData.contact_info.phone} onChange={handleContactChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.contact_info.email} onChange={handleContactChange} />
//         </div>

//         {/* City and Price */}
//         <div>
//           <label>City:</label>
//           <input type="text" name="city" value={formData.city} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Price per Sport:</label>
//           <div>
//             <label>Soccer:</label>
//             <input type="number" name="Soccer" value={formData.price_per_sport.Soccer} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Football:</label>
//             <input type="number" name="Football" value={formData.price_per_sport.Football} onChange={handleChange} />
//           </div>
//         </div>

//         {/* Slots */}
//         <div>
//           <h3>Availability Slots:</h3>
//           {Object.keys(formData.slots).map((day) => (
//             <div key={day}>
//               <label>{day}:</label>
//               <input 
//                 type="text" 
//                 name={day} 
//                 value={formData.slots[day].join(', ')} 
//                 onChange={(e) => {
//                   const timeSlots = e.target.value.split(',').map(slot => slot.trim());
//                   setFormData(prevData => ({
//                     ...prevData,
//                     slots: {
//                       ...prevData.slots,
//                       [day]: timeSlots,
//                     },
//                   }));
//                 }} 
//                 placeholder="e.g., 1100-1200, 1200-1300" 
//               />
//             </div>
//           ))}
//         </div>

//         <button type="submit">Add Turf</button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;
// // export default AddTurf;

