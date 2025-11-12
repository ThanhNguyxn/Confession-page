// API Configuration
const API_URL = window.location.origin;

// Utility Functions
function showMessage(message, type = 'success') {
    const existingMsg = document.querySelector('.alert-message');
    if (existingMsg) existingMsg.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-message';
    alertDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        ">
            ${message}
        </div>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.transition = 'opacity 0.3s';
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}

function showLoading(button) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner"></span> Đang xử lý...';
}

function hideLoading(button) {
    button.disabled = false;
    if (button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
    }
}

// Format date to Vietnamese format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('vi-VN', options);
}

// Confession Form Handler
const confessionForm = document.getElementById('confession-form');
if (confessionForm) {
    const contentTextarea = document.getElementById('content');
    const charCount = document.querySelector('.char-count');

    // Character counter
    if (contentTextarea && charCount) {
        contentTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = `${count}/5000 ký tự`;
            if (count > 4500) {
                charCount.style.color = '#ef4444';
            } else {
                charCount.style.color = '#9ca3af';
            }
        });
    }

    // Form submission
    confessionForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        showLoading(submitBtn);

        const formData = {
            category: document.getElementById('category').value,
            content: document.getElementById('content').value,
            photo: document.getElementById('photo').value || null,
            note: document.getElementById('note').value || null
        };

        try {
            const response = await fetch(`${API_URL}/api/confessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Show modal with tracking code
                showTrackingModal(data.trackingCode);

                // Reset form
                confessionForm.reset();
                if (charCount) charCount.textContent = '0/5000 ký tự';

                showMessage('Tâm sự của bạn đã được gửi thành công!', 'success');
            } else {
                showMessage(data.message || 'Có lỗi xảy ra. Vui lòng thử lại!', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Không thể kết nối đến server. Vui lòng thử lại!', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    });
}

// Show Tracking Modal
function showTrackingModal(trackingCode) {
    const modal = document.getElementById('success-modal');
    const trackingCodeText = document.getElementById('tracking-code-text');
    const copyBtn = document.getElementById('copy-code-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    if (modal && trackingCodeText) {
        trackingCodeText.value = trackingCode;
        modal.classList.add('active');

        // Copy tracking code
        if (copyBtn) {
            copyBtn.onclick = function() {
                trackingCodeText.select();
                document.execCommand('copy');
                this.textContent = '✓ Đã Sao Chép';
                setTimeout(() => {
                    this.textContent = 'Sao Chép';
                }, 2000);
            };
        }

        // Close modal
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('active');
            };
        }

        // Close on background click
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        };
    }
}

// Tracking Form Handler
const trackingForm = document.getElementById('tracking-form');
if (trackingForm) {
    trackingForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const trackingCode = document.getElementById('tracking-code').value.trim().toUpperCase();
        const resultDiv = document.getElementById('tracking-result');

        if (!trackingCode) {
            showMessage('Vui lòng nhập mã theo dõi!', 'error');
            return;
        }

        showLoading(submitBtn);

        try {
            const response = await fetch(`${API_URL}/api/confessions/${trackingCode}`);
            const data = await response.json();

            if (data.success && data.confession) {
                displayTrackingResult(data.confession);
                resultDiv.style.display = 'block';
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                showMessage(data.message || 'Không tìm thấy tâm sự với mã này!', 'error');
                resultDiv.style.display = 'none';
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Không thể kết nối đến server. Vui lòng thử lại!', 'error');
            resultDiv.style.display = 'none';
        } finally {
            hideLoading(submitBtn);
        }
    });
}

// Display Tracking Result
function displayTrackingResult(confession) {
    const categoryEmojis = {
        'Love': '💕',
        'Family': '👨‍👩‍👧',
        'Friendship': '🤝',
        'Work': '💼',
        'Study': '📚',
        'Life': '🌟',
        'Secret': '🤫',
        'Other': '📝'
    };

    const statusMessages = {
        'Pending': '⏳ Tâm sự của bạn đang chờ được xem xét. Chúng tôi sẽ kiểm duyệt sớm nhất có thể!',
        'Approved': '✅ Tâm sự của bạn đã được phê duyệt và đăng lên. Cảm ơn bạn đã chia sẻ!',
        'Rejected': '❌ Tâm sự không phù hợp với chính sách của chúng tôi. Vui lòng xem lại nội dung.'
    };

    const statusVietnamese = {
        'Pending': 'Đang Chờ Duyệt',
        'Approved': 'Đã Phê Duyệt',
        'Rejected': 'Đã Từ Chối'
    };

    document.getElementById('result-code').textContent = confession.tracking_code;
    document.getElementById('result-category').textContent =
        `${categoryEmojis[confession.category] || '📝'} ${confession.category}`;
    document.getElementById('result-status').textContent = statusVietnamese[confession.status] || confession.status;
    document.getElementById('result-date').textContent = formatDate(confession.created_at);
    document.getElementById('result-content').textContent = confession.content;

    const statusBadge = document.getElementById('status-badge');
    statusBadge.textContent = statusVietnamese[confession.status] || confession.status;
    statusBadge.className = `status-badge ${confession.status.toLowerCase()}`;

    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = statusMessages[confession.status] || '';
}

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (!target) return;

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number[data-target]');
            counters.forEach(counter => animateCounter(counter));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
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

console.log('Anonymous Confessions App Loaded ✨');

