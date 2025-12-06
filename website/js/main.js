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

    // Floating Chat Widget functionality
    const chatWidgetBtn = document.getElementById('chat-widget-btn');
    const chatModal = document.getElementById('chat-modal');
    const chatModalClose = document.getElementById('chat-modal-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle chat modal
    chatWidgetBtn.addEventListener('click', () => {
        chatModal.classList.toggle('active');
        if (chatModal.classList.contains('active')) {
            chatInput.focus();
        }
    });

    // Close chat modal
    chatModalClose.addEventListener('click', () => {
        chatModal.classList.remove('active');
    });

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatModal.contains(e.target) && !chatWidgetBtn.contains(e.target)) {
            chatModal.classList.remove('active');
        }
    });

    // Send chat message
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'chat-message user';
        userMsgDiv.textContent = message;
        chatMessages.appendChild(userMsgDiv);

        // Clear input
        chatInput.value = '';

        // Disable send button temporarily
        chatSend.disabled = true;

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'chat-message bot';
            botMsgDiv.textContent = 'Thanks for reaching out! One of our team members will be with you shortly. You can also email us at TruesecAi@mail.com.';
            chatMessages.appendChild(botMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatSend.disabled = false;
            chatInput.focus();
        }, 500);

        // Auto-scroll to latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    chatSend.addEventListener('click', sendChatMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Contact form submission (AJAX) -> POST to /api/contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const contactStatus = document.getElementById('contact-status');
        const contactSubmit = document.getElementById('contact-submit');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!contactStatus || !contactSubmit) return;
            contactSubmit.disabled = true;
            contactStatus.style.display = 'block';
            contactStatus.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                subject: formData.get('subject') || '',
                message: formData.get('message') || ''
            };

            try {
                const resp = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (resp.ok) {
                    contactStatus.textContent = 'Message sent — thank you! We will reply within 24 hours.';
                    contactForm.reset();
                } else {
                    const data = await resp.json().catch(() => ({}));
                    contactStatus.textContent = data.error || 'Failed to send message. Please try again later.';
                }
            } catch (err) {
                console.error('Contact form error', err);
                contactStatus.textContent = 'Network error. Please try again later.';
            } finally {
                contactSubmit.disabled = false;
            }
        });
    }
});