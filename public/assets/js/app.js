// API Base URL
const API_URL = window.location.origin;

// Utility functions
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMsg = document.querySelector('.alert-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message alert-${type}`;
    alertDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#05de7d' : '#ff4757'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        ">
            ${message}
        </div>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}

function showLoading(button) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner"></span> Processing...';
}

function hideLoading(button) {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText;
}

// Confession Submission Form
const confessionForm = document.getElementById('confession-form');
if (confessionForm) {
    confessionForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const category = document.getElementById('category').value;
        const content = document.getElementById('content').value;
        const photo = document.getElementById('photo').value;
        const note = document.getElementById('note').value;

        // Validation
        if (!category || !content) {
            showMessage('Please select a category and write your confession', 'error');
            return;
        }

        if (content.length < 10) {
            showMessage('Confession must be at least 10 characters long', 'error');
            return;
        }

        showLoading(submitBtn);

        try {
            const response = await fetch(`${API_URL}/api/confessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category,
                    content,
                    photo,
                    note
                })
            });

            const data = await response.json();

            if (data.success) {
                // Show success message with tracking code
                showMessage(`Confession submitted! Your tracking code: <strong>${data.trackingCode}</strong>`, 'success');
                
                // Clear form
                confessionForm.reset();

                // Show tracking code in modal or alert
                setTimeout(() => {
                    alert(`Your tracking code is: ${data.trackingCode}\n\nPlease save this code to track your confession status.`);
                }, 1000);
            } else {
                showMessage(data.message || 'Failed to submit confession', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Network error. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    });
}

// Tracking Form
const trackingForm = document.getElementById('tracking-form');
if (trackingForm) {
    trackingForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const code = document.getElementById('code').value.trim().toUpperCase();
        const submitBtn = this.querySelector('button[type="submit"]');

        if (!code) {
            showMessage('Please enter a tracking code', 'error');
            return;
        }

        showLoading(submitBtn);

        try {
            const response = await fetch(`${API_URL}/api/confessions/${code}`);
            const data = await response.json();

            if (data.success) {
                displayConfessionDetails(data.confession);
            } else {
                showMessage(data.message || 'Confession not found', 'error');
                clearConfessionDetails();
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Network error. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    });
}

function displayConfessionDetails(confession) {
    const resultDiv = document.getElementById('tracking-result');
    if (!resultDiv) return;

    const statusClass = confession.status === 'Posted' ? 'success' : 
                       confession.status === 'Pending' ? 'warning' : 'danger';

    const createdDate = new Date(confession.created_at).toLocaleDateString();

    resultDiv.innerHTML = `
        <div class="confession-result" style="
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-top: 30px;
        ">
            <h3 style="margin-bottom: 20px; color: #333;">Confession Details</h3>
            <div class="detail-row">
                <strong>Tracking Code:</strong> ${confession.tracking_code}
            </div>
            <div class="detail-row">
                <strong>Category:</strong> ${confession.category}
            </div>
            <div class="detail-row">
                <strong>Status:</strong> 
                <span class="badge badge-${statusClass}">${confession.status}</span>
            </div>
            <div class="detail-row">
                <strong>Submitted:</strong> ${createdDate}
            </div>
            <div class="detail-row">
                <strong>Content:</strong>
                <p style="margin-top: 10px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                    ${confession.content}
                </p>
            </div>
        </div>
    `;

    resultDiv.style.display = 'block';
}

function clearConfessionDetails() {
    const resultDiv = document.getElementById('tracking-result');
    if (resultDiv) {
        resultDiv.innerHTML = '';
        resultDiv.style.display = 'none';
    }
}

// Load recent confessions on homepage
async function loadRecentConfessions() {
    const container = document.getElementById('recent-confessions-container');
    if (!container) return;

    try {
        const response = await fetch(`${API_URL}/api/confessions?limit=6`);
        const data = await response.json();

        if (data.success && data.confessions.length > 0) {
            container.innerHTML = data.confessions.map(conf => `
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="confession-card" style="
                        background: white;
                        padding: 20px;
                        border-radius: 12px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                        transition: transform 0.3s;
                    ">
                        <div class="confession-category" style="
                            color: #05de7d;
                            font-size: 12px;
                            text-transform: uppercase;
                            margin-bottom: 10px;
                        ">${conf.category}</div>
                        <p class="confession-content" style="
                            color: #666;
                            line-height: 1.6;
                            margin-bottom: 15px;
                        ">${conf.content.substring(0, 150)}${conf.content.length > 150 ? '...' : ''}</p>
                        <div class="confession-meta" style="
                            font-size: 12px;
                            color: #999;
                        ">
                            <span>Code: ${conf.tracking_code}</span>
                            <span style="float: right;">${new Date(conf.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = `
                <div class="col-12">
                    <p style="text-align: center; color: #999;">
                        No confessions to display yet. Be the first to share your story!
                    </p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading confessions:', error);
    }
}

// Load statistics
async function loadStatistics() {
    try {
        const response = await fetch(`${API_URL}/api/stats`);
        const data = await response.json();

        if (data.success) {
            updateCounter('stories-count', data.stats.posted);
            updateCounter('followers-count', data.stats.total);
            updateCounter('acceptance-rate', data.stats.acceptanceRate);
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

function updateCounter(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load recent confessions if on homepage
    if (document.getElementById('recent-confessions-container')) {
        loadRecentConfessions();
    }

    // Load statistics
    loadStatistics();

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #ffffff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }

        .badge-success {
            background: #05de7d;
            color: white;
        }

        .badge-warning {
            background: #ffc107;
            color: #333;
        }

        .badge-danger {
            background: #ff4757;
            color: white;
        }

        .detail-row {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .detail-row:last-child {
            border-bottom: none;
        }

        .confession-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
    `;
    document.head.appendChild(style);
});
