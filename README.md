# AI Conversations Website

A minimalist website that showcases AI conversations as supplementary material for a research paper. The website automatically updates when new conversations are added to the AI_Conversations folder.

## Setup

1. Install Node.js from [nodejs.org](https://nodejs.org/) if you don't have it already.

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart on file changes:
   ```
   npm run dev
   ```

4. Open the website in your browser:
   ```
   http://localhost:3000
   ```

## Adding New Conversations

To add new conversations:

1. Create folders and subfolders in the `AI_Conversations` directory to organize your content.
2. Add markdown files (.md) with your conversations following this format:

```markdown
### User Prompt 1

Your user prompt text here...

---

### Gemini's Answer 1

AI response text here...

---

### User Prompt 2

Your next user prompt text here...

---

### Gemini's Answer 2

AI response text here...
```

The website will automatically detect new files and folders when they are added.

## File Structure

- `AI_Conversations/` - Contains all AI conversation files
  - `[AI System]/` (e.g., Gemini Chats) - Folders for different AI systems
    - `[Question X]/` - Folders for different questions or topics
      - `[Conversation Name].md` - Individual conversation files

## Features

- Minimalist and intuitive user interface
- Automatic detection of new conversation files
- Hierarchical organization of conversations
- Markdown rendering with support for code blocks
- Responsive design for desktop and mobile
- Dark mode support

## Technologies Used

- Node.js + Express for the backend
- Vanilla JavaScript for the frontend
- Marked.js for Markdown rendering 