
  
    // Three.js Earth Animation
    let scene, camera, renderer, earth;
    
    function initEarth() {
      // Create scene
      scene = new THREE.Scene();
      
      // Create camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('earthCanvas'), alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Create Earth geometry
      const geometry = new THREE.SphereGeometry(2, 32, 32);
      
      // Create Earth material with texture
      const textureLoader = new THREE.TextureLoader();
      const earthTexture = textureLoader.load('https://cdn.pixabay.com/photo/2017/02/09/08/05/earth-2052108_1280.jpg');
      const material = new THREE.MeshPhongMaterial({ map: earthTexture });
      
      // Create Earth mesh
      earth = new THREE.Mesh(geometry, material);
      scene.add(earth);
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);
      
      // Add stars background
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
      });
      
      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
      
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      
      // Handle window resize
      window.addEventListener('resize', onWindowResize, false);
      
      // Start animation
      animateEarth();
    }
    
    function animateEarth() {
      requestAnimationFrame(animateEarth);
      
      // Rotate Earth
      earth.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    }
    
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Initialize Earth when page loads
    window.addEventListener('load', initEarth);
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
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
    
    // Animate stats
    function animateStats() {
      const aqiElement = document.getElementById('aqiValue');
      const tempElement = document.getElementById('tempValue');
      const floodElement = document.getElementById('floodValue');
      
      let aqi = 45;
      let temp = 22.5;
      
      setInterval(() => {
        // Simulate small changes in stats
        aqi += (Math.random() - 0.5) * 2;
        temp += (Math.random() - 0.5) * 0.2;
        
        // Keep values in realistic ranges
        aqi = Math.max(10, Math.min(80, aqi));
        temp = Math.max(18, Math.min(28, temp));
        
        aqiElement.textContent = Math.round(aqi);
        tempElement.textContent = temp.toFixed(1) + '°C';
        
        // Randomly change flood risk
        const risks = ['Low', 'Moderate', 'High'];
        floodElement.textContent = risks[Math.floor(Math.random() * risks.length)];
      }, 5000);
    }
    
    // Satellite image refresh simulation
    function refreshSatelliteImage() {
      const imageElement = document.getElementById('satelliteImage');
      const updateElement = document.getElementById('lastUpdate');
      
      setInterval(() => {
        // In a real implementation, this would fetch a new image from NASA's API
        // For demo purposes, we'll just update the timestamp
        const now = new Date();
        updateElement.textContent = now.toLocaleTimeString();
        
        // Add a subtle visual effect to simulate refresh
        imageElement.style.opacity = '0.7';
        setTimeout(() => {
          imageElement.style.opacity = '1';
        }, 300);
      }, 30000); // Refresh every 30 seconds
    }
    
    // Scroll animation for transformation section
    function initScrollAnimation() {
      const scrollItems = document.querySelectorAll('.scroll-item');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.3 });
      
      scrollItems.forEach(item => {
        observer.observe(item);
      });
    }
    
    // Feature cards animation
    function initFeatureAnimation() {
      const featureCards = document.querySelectorAll('.feature-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp');
          }
        });
      }, { threshold: 0.1 });
      
      featureCards.forEach(card => {
        observer.observe(card);
      });
    }
    
    // Initialize all animations when page loads
    document.addEventListener('DOMContentLoaded', function() {
      animateStats();
      refreshSatelliteImage();
      initScrollAnimation();
      initFeatureAnimation();
    });