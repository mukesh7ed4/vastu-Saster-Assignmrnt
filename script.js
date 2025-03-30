document.addEventListener('DOMContentLoaded', function() {
    // Handle accordion functionality for FAQ section
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on clicked item
            this.parentElement.classList.toggle('active');
            
            // Close other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            // Clear previous error messages
            clearErrors();
            
            // Validate name
            if (name.value.trim() === '') {
                displayError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                displayError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                displayError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone
            if (phone.value.trim() === '') {
                displayError(phone, 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                displayError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                displayError(message, 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, process submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this static website, we'll just show a success message
                
                // Simulate form submission
                const formData = new FormData(contactForm);
                let formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                console.log("Form data:", formValues);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message, ${formValues.name}! We will get back to you soon.</p>
                `;
                
                // Clear form and append success message
                contactForm.reset();
                contactForm.style.display = 'none';
                contactForm.parentElement.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                    contactForm.style.display = 'block';
                }, 5000);
            }
        });
    }
    
    // Newsletter Form Validation and Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Validate email
            if (email === '' || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            console.log("Newsletter subscription:", email);
            
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Subscribed!';
            button.disabled = true;
            emailInput.value = '';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        });
    }
    
    // Mobile Navigation Toggle (if needed)
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    function setupMobileNav() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-nav-toggle')) {
            header.insertBefore(mobileNavToggle, nav);
            nav.classList.add('mobile-nav');
            
            mobileNavToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-bars');
                this.querySelector('i').classList.toggle('fa-times');
            });
        } else if (window.innerWidth > 768 && document.querySelector('.mobile-nav-toggle')) {
            document.querySelector('.mobile-nav-toggle').remove();
            nav.classList.remove('mobile-nav', 'active');
        }
    }
    
    // Run on load and resize
    setupMobileNav();
    window.addEventListener('resize', setupMobileNav);
    
    // Helper functions for form validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Basic regex for Indian phone numbers (10 digits, may start with +91)
        const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return phoneRegex.test(phone);
    }
    
    function displayError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.classList.add('error');
        field.parentElement.appendChild(errorDiv);
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorFields = document.querySelectorAll('.error');
        
        errorMessages.forEach(msg => msg.remove());
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    // Add some basic animations for page elements
    function animateOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    // Initialize animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-section');
    });
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Optional: Image lightbox for gallery page
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${this.src}" alt="${this.alt}">
                        <span class="close-lightbox">&times;</span>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox on click
                lightbox.addEventListener('click', function() {
                    this.remove();
                    document.body.style.overflow = 'auto';
                });
            });
        });
    }
});

// Add CSS class for animation in styles
const style = document.createElement('style');
style.textContent = `
    .animate-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .error {
        border-color: #e74c3c !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 5px;
    }
    
    .success-message {
        text-align: center;
        padding: 2rem;
        color: #27ae60;
    }
    
    .success-message i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .mobile-nav-toggle {
        display: none;
    }
    
    @media (max-width: 768px) {
        .mobile-nav-toggle {
            display: block;
            cursor: pointer;
            font-size: 1.5rem;
            margin: 1rem 0;
        }
        
        .mobile-nav {
            display: none;
            width: 100%;
        }
        
        .mobile-nav.active {
            display: block;
        }
        
        .mobile-nav ul {
            flex-direction: column;
            align-items: center;
        }
        
        .mobile-nav ul li {
            margin: 0.5rem 0;
        }
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
`;

document.head.appendChild(style);