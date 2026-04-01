/** script.js - Bloom & Beauty Interaction Logic **/

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Welcome Screen Logic
    const welcomeScreen = document.getElementById("welcome-screen");
    const enterBtn = document.getElementById("enter-btn");
    const mainContent = document.getElementById("main-content");
    const petalsContainer = document.getElementById('petals-container');

    // Create falling petals
    const createPetals = () => {
        const petalCount = 20;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal");
            
            // Randomize position, size, and animation duration
            const leftPos = Math.random() * 100; // 0 to 100vw
            const size = Math.random() * 15 + 10; // 10px to 25px
            const duration = Math.random() * 5 + 4; // 4s to 9s
            const delay = Math.random() * 3; // 0s to 3s

            petal.style.left = `${leftPos}vw`;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;

            petalsContainer.appendChild(petal);
        }
    };
    
    createPetals();

    // Handle Enter Click
    enterBtn.addEventListener("click", () => {
        // Fade out welcome screen
        welcomeScreen.style.opacity = "0";
        welcomeScreen.style.visibility = "hidden";
        
        // Show main content
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            mainContent.classList.remove("main-hidden");
            
            // Re-initialize any components that need to be recalculate dimensions
            initScrollAnimations();
        }, 800); // Wait for transition to finish
    });

    // 3. Navbar scroll effect & Mobile Menu Toggle
    const navbar = document.getElementById("navbar");
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-nav-links");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });
    
    // Close mobile menu on link click
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });

    // 4. Scroll Animations using IntersectionObserver
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // trigger when 15% is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-section').forEach(section => {
            observer.observe(section);
        });
    }
});
