# TrueSec.ai - Enterprise AI, Security & SRE Solutions

## Overview
TrueSec.ai is a professional consulting website providing enterprise-grade solutions in:
- **AI Automation** - Intelligent process automation and AI-driven workflow optimization
- **Cyber Security (CISSP)** - Enterprise security aligned with CISSP standards
- **SRE Services** - Site Reliability Engineering for infrastructure optimization
- **CTO Services** - Strategic technology leadership and guidance

## Website Structure

### Pages
- **index.html** - Home page with hero section, services overview, video section, chat, and leadership
- **services.html** - Detailed service offerings with feature highlights
- **about.html** - Company mission, values, and team information
- **contact.html** - Contact form, contact information, and testimonials

### Assets
- `/assets/logo.svg` - TrueSec.ai brand logo
- `/assets/ai-security-logo.svg` - AI & Security Compliance badge
- `/styles/main.css` - Complete styling with responsive design
- `/js/main.js` - Client-side interactivity (navigation, chat)

## Design Features

### Color Scheme
- **Primary**: #6b5b5f (Mauve/Burgundy)
- **Secondary**: #7a9fb5 (Soft Blue)
- **Accent**: #7a9fb5
- **Dark Background**: #3d3338
- **Text**: #f3f4f6 (Off-white)

### Responsive Design
- Mobile-first approach
- Hamburger menu for tablets and mobile
- Smooth animations and transitions
- Professional gradients and shadows

### Key Sections
1. **Navigation Bar** - Dark theme navbar with logo and navigation links
2. **Hero Section** - Eye-catching gradient background with call-to-action
3. **Services Grid** - 4-card layout showcasing core offerings
4. **Video Section** - "How We Help Businesses Grow" section
5. **Chat Integration** - AI Assistant for customer engagement
6. **Leadership** - Founder profiles with expertise highlights
7. **Footer** - Multi-column layout with links and information

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
# Navigate to project directory
cd website-UAT_Albert

# Install dependencies
npm install

# Start the development server
npm start
```

The website will be available at `http://localhost:3001`

### Project Structure
```
website-UAT_Albert/
├── server/
│   └── index.js
├── website/
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── services.html
│   ├── assets/
│   │   ├── logo.svg
│   │   └── ai-security-logo.svg
│   ├── styles/
│   │   └── main.css
│   └── js/
│       └── main.js
├── package.json
└── Procfile
```

## Deployment

### Development
```bash
npm start
# Runs on http://localhost:3001
```

### Production
The website is configured to run with Node.js/Express. For production deployment:

1. **Environment Setup**
   - Set NODE_ENV=production
   - Configure port environment variable

2. **Server Configuration**
   - Express server serves static files from `/website` directory
   - All routing handled server-side

3. **Deployment Options**
   - **Heroku**: Push with Procfile included
   - **AWS**: Deploy to EC2 or Elastic Beanstalk
   - **DigitalOcean**: Create droplet with Node.js
   - **Vercel/Netlify**: Static deployment (requires static build)

### Deployment Steps (Example: Heroku)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create truesec-ai

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## Customization

### Updating Content
Edit the HTML files directly to update:
- Service descriptions
- Team member information
- Contact details
- Testimonials

### Changing Colors
Update CSS variables in `/website/styles/main.css`:
```css
:root {
    --primary-color: #6b5b5f;
    --secondary-color: #8b7d82;
    --accent-color: #7a9fb5;
    /* ... other variables */
}
```

### Adding Pages
1. Create new HTML file in `/website/`
2. Include the navbar and footer (copy from existing pages)
3. Update navigation links in all pages

## Features

✅ Fully responsive design
✅ Professional branding and UI
✅ SEO-friendly meta tags
✅ Smooth animations and transitions
✅ Contact form integration ready
✅ AI chat assistant placeholder
✅ Mobile hamburger menu
✅ Founder/leadership section
✅ Testimonials/social proof
✅ Multiple service pages

## Performance Optimization

- Minimized CSS with all animations using GPU-accelerated transforms
- Optimized SVG assets for crisp rendering
- Responsive images ready for optimization
- Semantic HTML structure
- Fast-loading static assets

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contact & Support

**Email**: truesecai@gmail.com
**Founders**: 
- Albert Cisse - Founder & CEO
- Mohammed Cherif - Co-Founder & CTO

## Future Enhancements

- [ ] Blog section for thought leadership
- [ ] Case studies showcase
- [ ] Pricing page
- [ ] Live chat integration
- [ ] Email notification system
- [ ] Analytics dashboard
- [ ] Client testimonials video
- [ ] Team expansion profiles

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Status**: Production Ready ✅

## SMTP / Email setup (Gmail)

To send real emails from the contact form using Gmail, you must set environment variables for SMTP credentials. For Gmail, create an "App password" (recommended) and set these in your environment before starting the server:

```bash
export EMAIL_HOST=smtp.gmail.com
export EMAIL_PORT=587
export EMAIL_SECURE=false
export EMAIL_USER=your-gmail-address@gmail.com
export EMAIL_PASS=your-app-password
export CONTACT_TO=truesecai@gmail.com   # optional; default is truesecai@gmail.com
export EMAIL_FROM="TrueSec.ai <no-reply@yourdomain.com>"  # optional
npm start
```

Notes:
- Use a Gmail App Password (https://support.google.com/accounts/answer/185833) instead of your main Google password for SMTP access.
- For production, ensure the environment variables are injected securely by your hosting provider (Heroku config vars, AWS Secrets Manager, etc.).
- The server will return an error if SMTP credentials are not provided (this prevents accidental fallback to test accounts in production).