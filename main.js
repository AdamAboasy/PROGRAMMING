import express from 'express';

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

// Define an array to store user data

const users = [];

// Endpoint to add a new user

app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'User with the same email already exists' });
    }
    const user = { id: Date.now().toString(), name, email, age };
    users.push(user);
    res.status(201).json(user);
    console.log('New user added:', user);
    // Add code to save user data to a database or file system
    // ...
});

// Endpoint to get all users

app.get('/users', (req, res) => {
    res.json(users);
    console.log('All users retrieved:', users);
    // Add code to retrieve user data from a database or file system
    // ...
});

// Endpoint to get a specific user by email

app.get('/users/:email', (req, res) => {
    const { email } = req.params;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    console.log('User retrieved by email:', user);
    // Add code to retrieve user data from a database or file system
    // ...
});

// Endpoint to update a specific user by email

app.put('/users/:email', (req, res) => {
    const { email } = req.params;
    const { name, age } = req.body;
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!name && !age) {
        return res.status(400).json({ message: 'At least one field is required to update' });
    }
    const updatedUser = {...users[userIndex], name, age };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
    console.log('User updated by email:', updatedUser);
    // Add code to save updated user data to a database or file system
    // ...
});

// Endpoint to delete a specific user by email

app.delete('/users/:email', (req, res) => {
    const { email } = req.params;
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
    console.log('User deleted by email:', deletedUser);
    // Add code to save deleted user data to a database or file system
    // ...
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});