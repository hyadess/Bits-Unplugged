const express = require('express');
const app = express();

// Create a new article
app.post('/articles', (req, res) => {
    // Logic to create a new article
    res.send('New article created');
});

// Update an existing article
app.put('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    // Logic to update the article with the given ID
    res.send(`Article ${articleId} updated`);
});

// Delete an article
app.delete('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    // Logic to delete the article with the given ID
    res.send(`Article ${articleId} deleted`);
});

// Make an article live
app.patch('/articles/:id/live', (req, res) => {
    const articleId = req.params.id;
    // Logic to make the article with the given ID live
    res.send(`Article ${articleId} is now live`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});