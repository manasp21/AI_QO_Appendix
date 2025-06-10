const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.static(__dirname));

// API endpoint to get the folder structure
app.get('/api/conversations', (req, res) => {
    try {
        const aiConversationsPath = path.join(__dirname, 'AI_Conversations');
        const result = {};

        // Read all AI model folders
        const modelFolders = fs.readdirSync(aiConversationsPath)
            .filter(item => fs.statSync(path.join(aiConversationsPath, item)).isDirectory());

        modelFolders.forEach(modelFolder => {
            const modelPath = path.join(aiConversationsPath, modelFolder);
            result[modelFolder] = [];

            // Read question folders within each model folder
            const questionFolders = fs.readdirSync(modelPath)
                .filter(item => fs.statSync(path.join(modelPath, item)).isDirectory());

            questionFolders.forEach(questionFolder => {
                const questionPath = path.join(modelPath, questionFolder);
                const questionItem = {};
                questionItem[questionFolder] = [];

                // Read conversation files within each question folder
                const conversationFiles = fs.readdirSync(questionPath)
                    .filter(file => file.endsWith('.md'));

                conversationFiles.forEach(file => {
                    questionItem[questionFolder].push({
                        name: file.replace('.md', ''),
                        path: path.join('AI_Conversations', modelFolder, questionFolder, file).replace(/\\/g, '/')
                    });
                });

                result[modelFolder].push(questionItem);
            });
        });

        res.json(result);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});

// API endpoint to get a specific conversation
app.get('/api/conversation', (req, res) => {
    try {
        const filePath = path.join(__dirname, req.query.path);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('Conversation not found');
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        res.send(content);
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).send('Failed to fetch conversation');
    }
});

// Serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Monitoring AI conversations in: ${path.join(__dirname, 'AI_Conversations')}`);
}); 