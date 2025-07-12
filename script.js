// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Quick view button functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h4').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Create modal for quick view
        showQuickViewModal(productName, productPrice);
    });
});

// Quick view modal
function showQuickViewModal(productName, productPrice) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${productName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="product-preview">
                        <div class="image-placeholder">
                            <i class="fas fa-tshirt"></i>
                        </div>
                    </div>
                    <div class="product-details">
                        <p class="price">${productPrice}</p>
                        <p>Product description and details would go here.</p>
                        <div class="size-selector">
                            <h4>Select Size</h4>
                            <div class="size-options">
                                <button class="size-btn">S</button>
                                <button class="size-btn">M</button>
                                <button class="size-btn">L</button>
                                <button class="size-btn">XL</button>
                            </div>
                        </div>
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background: white;
            border-radius: 8px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            z-index: 2001;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-body {
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .product-preview .image-placeholder {
            width: 100%;
            height: 200px;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }
        
        .product-preview .image-placeholder i {
            font-size: 3rem;
            color: #adb5bd;
        }
        
        .product-details .price {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .size-selector {
            margin: 1.5rem 0;
        }
        
        .size-selector h4 {
            margin-bottom: 0.5rem;
        }
        
        .size-options {
            display: flex;
            gap: 0.5rem;
        }
        
        .size-btn {
            width: 40px;
            height: 40px;
            border: 1px solid #dee2e6;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .size-btn:hover,
        .size-btn.selected {
            background: #000;
            color: white;
            border-color: #000;
        }
        
        .add-to-cart {
            width: 100%;
            margin-top: 1rem;
        }
        
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        }
    });
    
    // Size selection
    modal.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Add to cart functionality
    modal.querySelector('.add-to-cart').addEventListener('click', function() {
        const selectedSize = modal.querySelector('.size-btn.selected');
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        
        alert(`${productName} (${selectedSize.textContent}) added to cart!`);
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            alert('Please enter your email address');
        }
    });
}

// Color dot selection for products
document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const colorDots = productCard.querySelectorAll('.color-dot');
        
        colorDots.forEach(d => d.style.transform = 'scale(1)');
        this.style.transform = 'scale(1.2)';
    });
});

// Lazy loading for images (placeholder for future implementation)
function lazyLoadImages() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Here you would load actual images
                // For now, we'll just add a subtle animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    });
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.opacity = '0.8';
        placeholder.style.transform = 'scale(0.95)';
        placeholder.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(placeholder);
    });
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Smooth reveal animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply reveal animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Trigger initial animations
    document.querySelector('.hero').style.opacity = '1';
    document.querySelector('.hero').style.transform = 'translateY(0)';
}); 