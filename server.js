const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static('public'));
mongoose.connect('mongodb://admin:password@mongo:27017/mysitedb?authSource=admin')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error: ', err));
const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    submittedAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);


app.post('/submit', async (req, res) => {
    try {
        const {name, email, message } = req.body;
        const newSubmission = new Submission({ name, email, message});
        await newSubmission.save();
        
        res.send('Form received!');
    } catch (err){
        console.error(err);
        res.status(500).send('Error saving form');

    }

});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});