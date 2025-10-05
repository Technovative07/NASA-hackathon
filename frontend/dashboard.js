 // Sidebar Toggle
        document.getElementById('sidebarToggle').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('collapsed');
            document.getElementById('mainContent').classList.toggle('expanded');
        });
        
        // Mobile Toggle
        document.getElementById('mobileToggle').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });
        
        // Profile Dropdown Toggle
        document.getElementById('userProfile').addEventListener('click', function(e) {
            e.stopPropagation();
            document.getElementById('profileDropdown').classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            document.getElementById('profileDropdown').classList.remove('show');
        });
        
        // View Profile Button
        document.getElementById('viewProfileBtn').addEventListener('click', function() {
            // Switch to profile section
            document.getElementById('dashboardSection').classList.remove('active');
            document.getElementById('profileSection').classList.add('active');
            
            // Update sidebar active state
            document.querySelectorAll('.sidebar-menu a').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('a[data-section="profile"]').classList.add('active');
            
            // Close dropdown
            document.getElementById('profileDropdown').classList.remove('show');
        });
        
        // Sidebar navigation
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const section = this.getAttribute('data-section');
                if (section) {
                    // Update active state
                    document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show appropriate section
                    if (section === 'dashboard') {
                        document.getElementById('dashboardSection').classList.add('active');
                        document.getElementById('profileSection').classList.remove('active');
                    } else if (section === 'profile') {
                        document.getElementById('dashboardSection').classList.remove('active');
                        document.getElementById('profileSection').classList.add('active');
                    }
                    
                    // Close sidebar on mobile
                    if (window.innerWidth < 768) {
                        document.getElementById('sidebar').classList.remove('mobile-open');
                    }
                }
            });
        });
        
        // Chatbot Toggle
        document.getElementById('chatbotBtn').addEventListener('click', function() {
            const chatWindow = document.getElementById('chatWindow');
            if (chatWindow.style.display === 'flex') {
                chatWindow.style.display = 'none';
            } else {
                chatWindow.style.display = 'flex';
            }
        });
        
        document.getElementById('closeChat').addEventListener('click', function() {
            document.getElementById('chatWindow').style.display = 'none';
        });
        
        // Send Message
        document.getElementById('sendMessage').addEventListener('click', sendMessage);
        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                const chatBody = document.getElementById('chatBody');
                
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.textContent = message;
                chatBody.appendChild(userMessage);
                
                // Clear input
                input.value = '';
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Simulate bot response after a delay
                setTimeout(function() {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot-message';
                    botMessage.textContent = getBotResponse(message);
                    chatBody.appendChild(botMessage);
                    
                    // Scroll to bottom again
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }
        
        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('flood') && lowerMessage.includes('zone')) {
                return "Based on current satellite data and precipitation models, flood risk in the specified zone remains low. Would you like a detailed report?";
            } else if (lowerMessage.includes('air quality') || lowerMessage.includes('aqi')) {
                return "Current air quality index is 42, which is considered good. Ozone levels are within safe limits across most monitoring stations.";
            } else if (lowerMessage.includes('heat') || lowerMessage.includes('temperature')) {
                return "Urban heat island effect is showing a 2°C increase in downtown areas compared to suburbs. Cooling centers have been activated in zones 3 and 7.";
            } else if (lowerMessage.includes('report') || lowerMessage.includes('generate')) {
                return "I can help you generate a custom environmental report. Which parameters would you like to include?";
            } else if (lowerMessage.includes('profile') || lowerMessage.includes('account')) {
                return "You can update your profile information and settings in the 'My Profile' section accessible from the sidebar.";
            } else {
                return "I understand you're asking about: '" + message + "'. As a NASA environmental assistant, I can provide insights on air quality, urban heat, flood risks, and more. How can I assist you specifically?";
            }
        }
        
        // Add animation to summary cards on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.summary-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            cards.forEach(card => {
                card.style.opacity = '0';
                observer.observe(card);
            });
        });