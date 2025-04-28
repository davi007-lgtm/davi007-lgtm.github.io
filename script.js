// Inicialización de AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar el menú móvil si está abierto
            navLinks.classList.remove('active');
        }
    });
});

// Animación de la barra de navegación al desplazarse
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Manejo del modo oscuro
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Validación del formulario de contacto
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');

function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (field.required && !value) {
        errorElement.textContent = 'Este campo es requerido';
        errorElement.style.display = 'block';
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorElement.textContent = 'Por favor ingresa un email válido';
            errorElement.style.display = 'block';
            return false;
        }
    }
    
    errorElement.style.display = 'none';
    return true;
}

function validateForm() {
    let isValid = true;
    const fields = contactForm.querySelectorAll('input, textarea');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Aquí iría el código para enviar el formulario
        // Por ahora solo mostraremos el mensaje de éxito
        successMessage.style.display = 'flex';
        errorMessage.style.display = 'none';
        contactForm.reset();
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    } else {
        errorMessage.style.display = 'flex';
        successMessage.style.display = 'none';
    }
});

// Validación en tiempo real
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur', () => validateField(input));
});

// Filtros de proyectos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Animación de las barras de progreso
const progressBars = document.querySelectorAll('.progress-bar');

function animateProgressBars() {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Ejecutar la animación cuando las barras sean visibles
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.skills-grid').querySelectorAll('.skill-card').forEach(card => {
    progressObserver.observe(card);
});

// Animación de las tarjetas de proyectos
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Contador animado para las estadísticas
const stats = document.querySelectorAll('.stat h3');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            let currentValue = 0;
            
            const duration = 2000; // 2 segundos
            const increment = finalValue / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    target.textContent = finalValue + '+';
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(currentValue);
                }
            }, 16);
            
            observer.unobserve(target);
        }
    });
}, observerOptions);

stats.forEach(stat => observer.observe(stat));

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner"></div>
    `;
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(preloader);
        }, 300);
    }, 500);
}); 