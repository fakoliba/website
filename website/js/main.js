document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Initialize RAG
    const rag = new CustomRAG();
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    async function handleUserInput() {
        const question = userInput.value.trim();
        if (!question) return;

        // Add user message
        chatMessages.innerHTML += `
            <div class="message user-message">
                <p>${question}</p>
            </div>
        `;

        userInput.value = '';
        userInput.disabled = true;
        sendButton.disabled = true;

        try {
            const response = await rag.query(question);
            chatMessages.innerHTML += `
                <div class="message bot-message">
                    <p>${response.answer}</p>
                </div>
            `;
        } catch (error) {
            chatMessages.innerHTML += `
                <div class="message error-message">
                    <p>Sorry, there was an error processing your request.</p>
                </div>
            `;
        }

        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });
});