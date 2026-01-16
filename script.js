let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Blockchain Developer', 'Web Designer', 'Youtuber'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
});

// EmailJS integration: sends contact form as email.
// Quick notes:
// - Create an EmailJS account (https://www.emailjs.com), add a Service and an Email Template.
// - Copy your Public Key (User ID), Service ID and Template ID from the EmailJS dashboard.
// - Replace the placeholders below with those exact values.

// Initialize EmailJS with your Public Key / User ID
if (window.emailjs) {
    console.log('EmailJS SDK loaded');
    emailjs.init('service_x4ncq5m'); // <-- REPLACE with your EmailJS Public Key / User ID
} else {
    console.warn('EmailJS SDK not found. Make sure email.min.js is included before script.js');
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!window.emailjs) {
            console.error('emailjs is not available on window');
            alert('Email service not available. Please check your internet connection and that EmailJS SDK is loaded.');
            return;
        }

        // Replace these with values from your EmailJS dashboard
        const serviceID = 'service_x4ncq5m'; // e.g. 'service_xxxxxx'
        const templateID = 'template_x4ncq5m'; // e.g. 'template_xxxxxx'

        // Collect form values and map to template variable names.
        // Make sure your EmailJS template uses these variable names (from_name, reply_to, phone, subject, message)
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name') || '',
            reply_to: formData.get('email') || '',
            phone: formData.get('number') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };

        console.log('Sending email with params:', templateParams);

        emailjs.send(serviceID, templateID, templateParams)
            .then((response) => {
                console.log('EmailJS success:', response);
                alert('Message sent — thank you!');
                contactForm.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                // Try to show a helpful message to the user
                let msg = 'Failed to send message. Please try again later.';
                try {
                    if (err && err.status) msg += ` (status: ${err.status})`;
                } catch (e) {}
                alert(msg);
            });
    });
} else {
    console.warn('Contact form element (#contact-form) not found');
}