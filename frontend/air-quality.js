
        // Generate heatmap cells
        document.addEventListener('DOMContentLoaded', function() {
            const heatmapGrid = document.getElementById('heatmapGrid');
            const aqiLevels = ['good', 'moderate', 'unhealthy-sensitive', 'unhealthy', 'very-unhealthy', 'hazardous'];
            
            for (let i = 0; i < 100; i++) {
                const cell = document.createElement('div');
                const randomLevel = aqiLevels[Math.floor(Math.random() * aqiLevels.length)];
                cell.className = `heatmap-cell aqi-${randomLevel}`;
                cell.style.opacity = Math.random() * 0.7 + 0.3;
                heatmapGrid.appendChild(cell);
            }
            
            // Generate map points
            const mapContainer = document.querySelector('.map-container');
            for (let i = 0; i < 15; i++) {
                const point = document.createElement('div');
                const randomLevel = aqiLevels[Math.floor(Math.random() * aqiLevels.length)];
                point.className = `map-point aqi-${randomLevel}`;
                point.style.left = `${10 + Math.random() * 80}%`;
                point.style.top = `${10 + Math.random() * 80}%`;
                mapContainer.appendChild(point);
            }
            
            // Generate hourly forecast
            const hourlyForecast = document.getElementById('hourlyForecast');
            const hours = ['Now', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'];
            
            hours.forEach(hour => {
                const card = document.createElement('div');
                card.className = 'hour-card';
                
                const randomAqi = 120 + Math.floor(Math.random() * 60);
                let statusClass = 'aqi-unhealthy-sensitive';
                if (randomAqi > 150) statusClass = 'aqi-unhealthy';
                if (randomAqi < 100) statusClass = 'aqi-moderate';
                
                card.innerHTML = `
                    <div class="fw-bold">${hour}</div>
                    <div class="${statusClass} rounded-circle d-inline-flex align-items-center justify-content-center my-2" style="width: 40px; height: 40px;">
                        <span class="text-white fw-bold">${randomAqi}</span>
                    </div>
                    <small>PM2.5</small>
                `;
                
                hourlyForecast.appendChild(card);
            });
            
            // Initialize forecast chart
            const ctx = document.getElementById('forecastChart').getContext('2d');
            const forecastChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'AQI Index',
                            data: [156, 142, 138, 145, 132, 128, 121],
                            backgroundColor: [
                                'rgba(244, 67, 54, 0.7)',
                                'rgba(255, 152, 0, 0.7)',
                                'rgba(255, 152, 0, 0.7)',
                                'rgba(255, 152, 0, 0.7)',
                                'rgba(255, 193, 7, 0.7)',
                                'rgba(255, 193, 7, 0.7)',
                                'rgba(76, 175, 80, 0.7)'
                            ],
                            borderColor: [
                                'rgb(244, 67, 54)',
                                'rgb(255, 152, 0)',
                                'rgb(255, 152, 0)',
                                'rgb(255, 152, 0)',
                                'rgb(255, 193, 7)',
                                'rgb(255, 193, 7)',
                                'rgb(76, 175, 80)'
                            ],
                            borderWidth: 1,
                            borderRadius: 5
                        },
                        {
                            label: 'PM2.5 (μg/m³)',
                            data: [45, 42, 40, 38, 35, 32, 30],
                            type: 'line',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            borderWidth: 2,
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'AQI Index / PM2.5 Concentration'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    }
                }
            });
            
            // Initialize comparison chart
            const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
            const comparisonChart = new Chart(comparisonCtx, {
                type: 'bar',
                data: {
                    labels: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
                    datasets: [{
                        label: 'Current AQI',
                        data: [142, 168, 135, 158, 145, 139],
                        backgroundColor: [
                            'rgba(255, 152, 0, 0.7)',
                            'rgba(244, 67, 54, 0.7)',
                            'rgba(255, 152, 0, 0.7)',
                            'rgba(244, 67, 54, 0.7)',
                            'rgba(255, 152, 0, 0.7)',
                            'rgba(255, 152, 0, 0.7)'
                        ],
                        borderColor: [
                            'rgb(255, 152, 0)',
                            'rgb(244, 67, 54)',
                            'rgb(255, 152, 0)',
                            'rgb(244, 67, 54)',
                            'rgb(255, 152, 0)',
                            'rgb(255, 152, 0)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'AQI Index'
                            }
                        }
                    }
                }
            });
            
            // Initialize historical chart
            const historicalCtx = document.getElementById('historicalChart').getContext('2d');
            const historicalChart = new Chart(historicalCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Average AQI',
                        data: [125, 118, 132, 145, 152, 168, 156, 142, 135, 128, 122, 118],
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'AQI Index'
                            }
                        }
                    }
                }
            });
            
            // Auto-focus on zone selector
            document.getElementById('zoneSelect').focus();
            
            // Add loading animation to health alert
            const healthAlert = document.querySelector('.health-alert');
            setTimeout(() => {
                const loadingIcon = document.createElement('span');
                loadingIcon.className = 'loading ms-2';
                healthAlert.querySelector('.d-flex').appendChild(loadingIcon);
            }, 1000);
            
            // Scroll to top functionality
            const scrollTopBtn = document.getElementById('scrollTop');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Simulate data refresh
            setInterval(() => {
                const refreshElement = document.querySelector('.data-refresh');
                if (refreshElement) {
                    refreshElement.innerHTML = '<i class="fas fa-sync-alt me-2"></i> Last updated: Just now';
                    
                    // Add a brief animation
                    refreshElement.classList.add('animate__animated', 'animate__flash');
                    setTimeout(() => {
                        refreshElement.classList.remove('animate__animated', 'animate__flash');
                    }, 1000);
                }
            }, 30000); // Refresh every 30 seconds
        });