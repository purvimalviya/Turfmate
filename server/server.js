const express = require('express');
const dotenv = require('dotenv');
const exploreRoutes = require('./routes/exploreRoutes');
const bookRoutes = require('./routes/bookRoutes');
const turfManagementRoutes = require('./routes/turfManagementRoutes');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the database
connectDB();

app.get('/',(req,res)=>{
    return res.json({message : "this is a trial"});
})

app.use('/api/explore', exploreRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/management', turfManagementRoutes);

const PORT = process.env.PORT || 5001 ;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

