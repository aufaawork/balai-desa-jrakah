document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // 3. Smooth Scroll (Fallback/Enforcement) & Active Link Highlight
    // Note: CSS scroll-behavior handles the smooth scroll, but we can add active state
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // You might need to add .active styles in CSS if you want
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active'); // Add a class to style it if needed
            }
        });
    });

    // 4. Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // The lower the slower
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // 5. Intersection Observer for Animations & Counters
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counters if Stats section
                if (entry.target.classList.contains('stats-container') && !hasCounted) {
                    startCounters();
                    hasCounted = true;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .stats-container, .chart-wrapper, .accordion');
    animatedElements.forEach(el => observer.observe(el));

    // 6. Accordion Functionality
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Close others
            const currentItem = this.parentElement;
            const isActive = currentItem.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isActive) {
                currentItem.classList.add('active');
                const content = currentItem.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});
