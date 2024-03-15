const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Import fs.promises for asynchronous file operations
const path = require('path'); // Import path module

const app = express();
// const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function readJsonFile(filename) {
    try {
        const filePath = path.join(__dirname, filename); // Adjust the path as per your file structure
        const jsonData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}


// Define routes for handling JSON files

// Define route to get the content of the about section
app.get('/about', async (req, res) => {
    try {
        const data = await readJsonFile('./about.json');
        res.json(data);
    } catch (err) {
        console.error('Error reading about section data:', err);
        res.status(500).json({ error: 'Failed to read about section data' });
    }
});

// Define route to update the content of the about section
app.post('/about', async (req, res) => {
    try {
        const newData = req.body;
        await fs.writeFile(path.join(__dirname, './about.json'), JSON.stringify(newData, null, 2));
        console.log('About section data updated successfully:', newData);
        res.status(200).json({ message: 'About section data updated successfully', newData });
    } catch (err) {
        console.error('Error updating about section data:', err);
        res.status(500).json({ error: 'Failed to update about section data' });
    }
});


// Define route to get the content of the password section
app.get('/password', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, './password.json'));
        const passwordContent = JSON.parse(data);
        res.json(passwordContent);
    } catch (err) {
        console.error('Error reading password section data:', err);
        res.status(500).json({ error: 'Failed to read password section data' });
    }
});

// Define route to update the content of the password section
app.post('/password', async (req, res) => {
    try {
        const newData = req.body;
        await fs.writeFile(path.join(__dirname, './password.json'), JSON.stringify(newData, null, 2));
        console.log('Password section data updated successfully:', newData);
        res.status(200).json({ message: 'Password section data updated successfully', newData });
    } catch (err) {
        console.error('Error updating password section data:', err);
        res.status(500).json({ error: 'Failed to update password section data' });
    }
});


// Define route to get the content of the services section
app.get('/services', async (req, res) => {
    try {
        const servicesData = await fs.readFile(path.join(__dirname, './services.json'));
        const servicesContent = JSON.parse(servicesData);
        res.json(servicesContent);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Define route to update the content of the services section
app.post('/services', async (req, res) => {
    try {
        const newData = req.body;
        await fs.writeFile(path.join(__dirname, './services.json'), JSON.stringify(newData, null, 2));
        console.log('Services section data updated successfully:', newData);
        res.status(200).json({ message: 'Services section data updated successfully', newData });
    } catch (err) {
        console.error('Error updating services section data:', err);
        res.status(500).json({ error: 'Failed to update services section data' });
    }
});


// Define route to get the content of the database section
app.get('/database', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, './database.json'));
        const databaseContent = JSON.parse(data);
        res.json(databaseContent);
    } catch (err) {
        console.error('Error reading database section data:', err);
        res.status(500).json({ error: 'Failed to read database section data' });
    }
});

// Define route to update the content of the database section
app.post('/database', async (req, res) => {
    try {
        const newProfile = req.body;
        let profiles = await fs.readFile(path.join(__dirname, './database.json'), 'utf8');
        profiles = JSON.parse(profiles);
        newProfile.id = profiles.length + 1; // Generate a new ID (assuming IDs are sequential)
        profiles.push(newProfile);
        await fs.writeFile(path.join(__dirname, './database.json'), JSON.stringify(profiles, null, 2));
        console.log('Profile added successfully:', newProfile);
        res.status(200).json({ message: 'Profile added successfully', profile: newProfile });
    } catch (err) {
        console.error('Error updating database section data:', err);
        res.status(500).json({ error: 'Failed to update database section data' });
    }
});

app.delete('/database/:id', async (req, res) => {
    try {
        // Read the JSON file
        let data = await fs.readFile("./database.json", 'utf8');
        data = JSON.parse(data);

        // Get the profile ID from request parameters
        const profileId = parseInt(req.params.id);

        // Find index of profile with given ID
        const index = data.findIndex(profile => profile.id === profileId);
        if (index !== -1) {
            // Remove profile from data array
            data.splice(index, 1);

            // Write updated data back to the JSON file
            await fs.writeFile("./database.json", JSON.stringify(data, null, 2));

            // Respond with success message
            res.json({ message: 'Profile deleted successfully' });
        } else {
            // Profile with given ID not found
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        // Handle errors
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define the server port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
