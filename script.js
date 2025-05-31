// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Inicializar Particles.js
    initParticles();
    
    // Inicializar Countdown
    initCountdown();
    
    // Inicializar Progress Bar
    initProgressBar();
    
    // Inicializar Form Handler
    initFormHandler();
    
    // Adicionar efeitos de hover nos elementos
    addHoverEffects();
});

// Configuração do Particles.js
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#ffd700', '#ffffff', '#ffed4e']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Countdown Timer
function initCountdown() {
    // Data de lançamento (30 dias a partir de hoje)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Atualizar elementos com animação
            animateNumber('days', days);
            animateNumber('hours', hours);
            animateNumber('minutes', minutes);
            animateNumber('seconds', seconds);
        } else {
            // Countdown finalizado
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Mostrar mensagem de lançamento
            showLaunchMessage();
        }
    }
    
    // Atualizar a cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Executar imediatamente
}

// Animação dos números do countdown
function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ffed4e';
        
        setTimeout(() => {
            element.textContent = newValue.toString().padStart(2, '0');
            element.style.transform = 'scale(1)';
            element.style.color = '#ffd700';
        }, 150);
    }
}

// Progress Bar Animation
function initProgressBar() {
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    
    function updateProgress() {
        // Simular progresso baseado no tempo
        const now = new Date();
        const startDate = new Date('2024-01-01'); // Data de início do projeto
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30); // 30 dias para conclusão
        
        const totalTime = endDate.getTime() - startDate.getTime();
        const elapsedTime = now.getTime() - startDate.getTime();
        
        progress = Math.min(Math.floor((elapsedTime / totalTime) * 100), 95);
        
        // Animar a barra de progresso
        progressBar.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
        
        // Adicionar efeito de pulso quando próximo de 100%
        if (progress > 90) {
            progressBar.classList.add('progress-bar-striped');
        }
    }
    
    // Atualizar progresso gradualmente
    let currentProgress = 0;
    const targetProgress = Math.floor(Math.random() * 30) + 65; // Entre 65% e 95%
    
    const progressInterval = setInterval(() => {
        if (currentProgress < targetProgress) {
            currentProgress++;
            progressBar.style.width = currentProgress + '%';
            progressPercent.textContent = currentProgress + '%';
        } else {
            clearInterval(progressInterval);
        }
    }, 50);
}

// Form Handler
function initFormHandler() {
    const form = document.querySelector('.subscription-form form');
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Animação de loading
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Simular envio (substituir por integração real)
            setTimeout(() => {
                showSuccessMessage();
                emailInput.value = '';
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Enviado!';
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                }, 3000);
            }, 2000);
        } else {
            showErrorMessage('Por favor, insira um e-mail válido.');
        }
    });
}

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mensagens de feedback
function showSuccessMessage() {
    const message = createMessage('Obrigado! Você será notificado em breve.', 'success');
    showMessage(message);
}

function showErrorMessage(text) {
    const message = createMessage(text, 'error');
    showMessage(message);
}

function createMessage(text, type) {
    const message = document.createElement('div');
    message.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    message.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.5s ease;
    `;
    
    message.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    return message;
}

function showMessage(message) {
    document.body.appendChild(message);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Efeitos de hover adicionais
function addHoverEffects() {
    // Efeito de tilt nos cards do countdown
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateX(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    // Efeito de shake no ícone de construção
    const constructionIcon = document.querySelector('.construction-icon');
    
    constructionIcon.addEventListener('mouseenter', function() {
        this.style.animation = 'shake 0.5s ease-in-out';
    });
    
    constructionIcon.addEventListener('animationend', function() {
        this.style.animation = 'bounce 2s ease-in-out infinite';
    });
}

// Animação de shake
const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;

// Adicionar keyframes ao CSS
const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);

// Mensagem de lançamento
function showLaunchMessage() {
    const launchMessage = document.createElement('div');
    launchMessage.className = 'launch-message';
    launchMessage.innerHTML = `
        <div class="text-center">
            <h2 class="text-gradient mb-3">🎉 Estamos no Ar! 🎉</h2>
            <p class="text-light">Nosso site está pronto! Obrigado por aguardar.</p>
            <button class="btn btn-gradient mt-3" onclick="window.location.reload()">
                <i class="fas fa-rocket me-2"></i>Explorar Agora
            </button>
        </div>
    `;
    
    // Substituir o conteúdo principal
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = launchMessage.innerHTML;
    
    // Adicionar confetti
    createConfetti();
}

// Efeito de confetti
function createConfetti() {
    const colors = ['#ffd700', '#ffed4e', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Adicionar animação de confetti
const confettiKeyframes = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Adicionar mais keyframes
const additionalStyle = document.createElement('style');
additionalStyle.textContent = confettiKeyframes;
document.head.appendChild(additionalStyle);

// Smooth scroll para dispositivos móveis
document.addEventListener('touchstart', function() {}, {passive: true});

// Otimização de performance
window.addEventListener('load', function() {
    // Preload de imagens se houver
    // Otimizar animações para dispositivos com baixa performance
    if (window.devicePixelRatio > 2) {
        document.body.classList.add('high-dpi');
    }
});

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s ease-in-out infinite';
    
    const easterEggMessage = createMessage('🎮 Código Konami ativado!');
    showMessage(easterEggMessage);
    
    // Adicionar efeitos especiais
    document.querySelectorAll('.floating-element').forEach(element => {
        element.style.animation = 'spin 1s linear infinite';
        element.style.color = '#ffd700';
        element.style.fontSize = '3rem';
    });
    
    // Resetar após 10 segundos
    setTimeout(() => {
        document.body.style.animation = '';
        document.querySelectorAll('.floating-element').forEach(element => {
            element.style.animation = 'float 6s ease-in-out infinite';
            element.style.color = 'rgba(255, 255, 255, 0.1)';
            element.style.fontSize = '2rem';
        });
    }, 10000);
}

// Adicionar mais animações CSS
const extraAnimations = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
        50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
    }
    
    /* Responsividade adicional */
    @media (max-width: 576px) {
        .countdown-number {
            font-size: 1.8rem;
        }
        
        .construction-icon {
            width: 80px;
            height: 80px;
        }
        
        .construction-icon i {
            font-size: 2rem;
        }
        
        .floating-element {
            font-size: 1.5rem;
        }
        
        .social-link {
            width: 45px;
            height: 45px;
        }
    }
    
    @media (max-width: 480px) {
        .display-4 {
            font-size: 2rem;
        }
        
        .countdown-item {
            padding: 1rem 0.5rem;
        }
        
        .countdown-number {
            font-size: 1.5rem;
        }
        
        .countdown-label {
            font-size: 0.8rem;
        }
    }
    
    /* Modo escuro automático */
    @media (prefers-color-scheme: dark) {
        .custom-input {
            background: rgba(0, 0, 0, 0.3);
        }
        
        .countdown-item {
            background: rgba(0, 0, 0, 0.2);
        }
    }
    
    /* Redução de movimento para acessibilidade */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .floating-element {
            animation: none;
        }
        
        .construction-icon {
            animation: none;
        }
    }
    
    /* High DPI optimizations */
    .high-dpi .floating-element {
        will-change: transform;
    }
    
    .high-dpi .countdown-item {
        will-change: transform;
    }
`;

// Adicionar animações extras
const finalStyle = document.createElement('style');
finalStyle.textContent = extraAnimations;
document.head.appendChild(finalStyle);

// Performance monitoring
let performanceMetrics = {
    loadTime: 0,
    animationFrames: 0,
    lastFrameTime: performance.now()
};

function monitorPerformance() {
    const now = performance.now();
    const delta = now - performanceMetrics.lastFrameTime;
    
    if (delta > 16.67) { // Se frame rate < 60fps
        // Reduzir qualidade das animações
        document.body.classList.add('reduced-animations');
    }
    
    performanceMetrics.lastFrameTime = now;
    performanceMetrics.animationFrames++;
    
    requestAnimationFrame(monitorPerformance);
}

// Iniciar monitoramento de performance
requestAnimationFrame(monitorPerformance);

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado com sucesso:', registration.scope);
            })
            .catch(function(error) {
                console.log('Falha ao registrar ServiceWorker:', error);
            });
    });
}

// Lazy loading para imagens (se houver)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Função para detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Otimizações específicas para mobile
if (isMobile()) {
    document.body.classList.add('mobile-device');
    
    // Reduzir número de partículas em dispositivos móveis
    if (window.particlesJS) {
        // Reconfigurar particles para mobile
        particlesJS('particles-js', {
            particles: {
                number: { value: 30 }, // Reduzir de 80 para 30
                // ... outras configurações otimizadas
            }
        });
    }
}

// Função para salvar email no localStorage
function saveEmailToStorage(email) {
    try {
        const emails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('subscribedEmails', JSON.stringify(emails));
        }
    } catch (error) {
        console.warn('Não foi possível salvar no localStorage:', error);
    }
}

// Função para verificar se email já foi cadastrado
function isEmailSubscribed(email) {
    try {
        const emails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
        return emails.includes(email);
    } catch (error) {
        return false;
    }
}

// Atualizar form handler para incluir verificação
const originalFormHandler = initFormHandler;
initFormHandler = function() {
    const form = document.querySelector('.subscription-form form');
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showErrorMessage('Por favor, insira um e-mail válido.');
            return;
        }
        
        if (isEmailSubscribed(email)) {
            showErrorMessage('Este e-mail já está cadastrado!');
            return;
        }
        
        // Animação de loading
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            saveEmailToStorage(email);
            showSuccessMessage();
            emailInput.value = '';
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Enviado!';
            submitBtn.classList.add('btn-success');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
            }, 3000);
        }, 2000);
    });
};

// Analytics simples (opcional)
function trackEvent(eventName, eventData = {}) {
    try {
        // Implementar tracking personalizado ou Google Analytics
        console.log('Event tracked:', eventName, eventData);
        
        // Exemplo com Google Analytics (se configurado)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    } catch (error) {
        console.warn('Erro ao rastrear evento:', error);
    }
}

// Rastrear interações importantes
document.addEventListener('click', function(e) {
    if (e.target.matches('.social-link')) {
        trackEvent('social_click', { platform: e.target.querySelector('i').className });
    }
    
    if (e.target.matches('.btn-gradient')) {
        trackEvent('cta_click', { button: 'subscribe' });
    }
});

// Função para debug (apenas em desenvolvimento)
function enableDebugMode() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.debugMode = true;
        console.log('🔧 Modo debug ativado');
        
        // Adicionar informações de debug
        const debugInfo = document.createElement('div');
        debugInfo.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
        `;
        
        function updateDebugInfo() {
            const fps = Math.round(1000 / (performance.now() - performanceMetrics.lastFrameTime));
            debugInfo.innerHTML = `
                FPS: ${fps}<br>
                Frames: ${performanceMetrics.animationFrames}<br>
                Device: ${isMobile() ? 'Mobile' : 'Desktop'}<br>
                Particles: ${document.querySelectorAll('#particles-js canvas').length > 0 ? 'Active' : 'Inactive'}
            `;
        }
        
        document.body.appendChild(debugInfo);
        setInterval(updateDebugInfo, 1000);
    }
}

// Ativar debug mode
enableDebugMode();

// Cleanup function para evitar memory leaks
window.addEventListener('beforeunload', function() {
    // Limpar intervals e timeouts
    clearInterval(window.countdownInterval);
    clearInterval(window.progressInterval);
    
    // Remover event listeners se necessário
    document.removeEventListener('keydown', arguments.callee);
});

console.log('🚀 Site de Construção carregado com sucesso!');