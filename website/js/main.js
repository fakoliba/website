document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
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
                    const data = await resp.json().catch(() => ({}));
                    contactStatus.textContent = data.message || 'Message sent — thank you! We will reply within 24 hours.';
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
