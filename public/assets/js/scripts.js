// Additional Scripts for Enhanced User Experience

// Auto-resize textarea
document.querySelectorAll('textarea.form-control').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});

// Form validation feedback
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else if (this.value.trim()) {
            this.style.borderColor = '#10b981';
        } else {
            this.style.borderColor = '#e5e7eb';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#6366f1';
    });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add loading state to page
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.7';
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Ctrl/Cmd + K to focus tracking code input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const trackingInput = document.getElementById('tracking-code');
        if (trackingInput) {
            trackingInput.focus();
        }
    }
});

// Add fade-in animation to cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.step-card, .info-card, .form-card').forEach(card => {
    fadeInObserver.observe(card);
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.innerWidth <= 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.querySelector('.mobile-menu-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-menu-toggle';
            toggleBtn.innerHTML = '☰';
            toggleBtn.style.cssText = `
                display: block;
                font-size: 1.5rem;
                background: none;
                border: none;
                cursor: pointer;
                color: var(--text-dark);
            `;

            toggleBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                toggleBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            navbar.appendChild(toggleBtn);

            // Mobile styles for nav-links
            navLinks.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                display: none;
            `;

            const style = document.createElement('style');
            style.textContent = `
                .nav-links.active {
                    display: flex !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Initialize on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add tooltip functionality
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            z-index: 10001;
            pointer-events: none;
        `;
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

        this._tooltip = tooltip;
    });

    element.addEventListener('mouseleave', function() {
        if (this._tooltip) {
            this._tooltip.remove();
            this._tooltip = null;
        }
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// Service Worker registration (optional, for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

console.log('Enhanced scripts loaded ✨');

