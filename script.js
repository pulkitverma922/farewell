document.addEventListener('DOMContentLoaded', function() {
    const cakeContainer = document.getElementById('cakeContainer');
    const cakeCut = document.getElementById('cakeCut');
    const cakePiece = document.getElementById('cakePiece');
    const flame = document.getElementById('flame');
    const cutCakeBtn = document.getElementById('cutCakeBtn');
    const revealGiftBtn = document.getElementById('revealGiftBtn');
    const giftContainer = document.getElementById('giftContainer');
    
    // Create and add knife element
    const knife = document.createElement('div');
    knife.className = 'knife';
    cakeContainer.appendChild(knife);
    
    cutCakeBtn.addEventListener('click', function() {
        // Animate the knife
        knife.style.display = 'block';
        knife.style.animation = 'knifeAnimation 1.5s forwards';
        
        // Play cutting sound (optional)
        const cuttingSound = new Audio('https://www.soundjay.com/mechanical/sounds/knife-cutting-1.mp3');
        cuttingSound.volume = 0.5;
        cuttingSound.play().catch(e => console.log('Audio play failed:', e));
        
        // Wait for knife animation then continue with cake effects
        setTimeout(() => {
            // Extinguish the flame with a puff of smoke
            flame.style.animation = 'none';
            createSmokeEffect();
            flame.style.opacity = '0';
            
            // Shake the cake slightly
            const cake = document.querySelector('.cake');
            cake.classList.add('shake');
            
            // Show the cake cut with a slight delay
            setTimeout(() => {
                cakeCut.style.opacity = '1';
                
                // Create filling effect
                createFillingEffect();
                
                // Animate the cake piece with physics
                cakePiece.style.animation = 'cakePieceFall 1.8s forwards cubic-bezier(.36,.07,.19,.97)';
                
                // Create cake cutting effect (enhanced particles/crumbs)
                createCakeCrumbs();
                
                // Show sparkle effects
                createSparkles();
                
                // Change button text and disable it
                cutCakeBtn.textContent = 'Cake Cut!';
                cutCakeBtn.disabled = true;
                cutCakeBtn.style.opacity = '0.7';
                
                // Show the gift reveal button after cake is cut
                setTimeout(() => {
                    revealGiftBtn.style.display = 'inline-block';
                    revealGiftBtn.classList.add('pulse');
                }, 1800);
            }, 300);
        }, 800);
    });
    
    revealGiftBtn.addEventListener('click', function() {
        const giftContainer = document.getElementById('giftContainer');
        
        // Clear any existing content
        giftContainer.innerHTML = '';
        
        // Create and add new elements
        const messagePara = document.createElement('p');
        messagePara.textContent = "Here's a small token of our appreciation:";
        giftContainer.appendChild(messagePara);
        
        const voucherDiv = document.createElement('div');
        voucherDiv.className = 'voucher';
        voucherDiv.id = 'voucherCode';
        // Use the VOUCHER_CODE from secrets.js that's created by GitHub Actions
        // voucherDiv.textContent = VOUCHER_CODE;
        voucherDiv.textContent = "SVDC-VK3AMR-44B";
        giftContainer.appendChild(voucherDiv);
        
        const notePara = document.createElement('p');
        notePara.className = 'note';
        notePara.textContent = 'Use this Amazon voucher code to treat yourself to something special!';
        giftContainer.appendChild(notePara);
        
        // Show the gift container with animation
        giftContainer.classList.add('show');
        
        // Change button text and disable it
        revealGiftBtn.textContent = 'Gift Revealed!';
        revealGiftBtn.disabled = true;
        revealGiftBtn.style.backgroundColor = '#27ae60';
        
        // Add confetti effect
        createConfetti();
    });
    
    function createSmokeEffect() {
        for (let i = 0; i < 10; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            smoke.style.left = '92.5px';
            smoke.style.top = '-75px';
            cakeContainer.appendChild(smoke);
            
            // Randomize the smoke movement
            const angle = -Math.PI/2 + (Math.random() - 0.5);
            const distance = 20 + Math.random() * 30;
            const duration = 0.5 + Math.random() * 0.8;
            const size = 5 + Math.random() * 10;
            
            smoke.style.width = size + 'px';
            smoke.style.height = size + 'px';
            
            smoke.animate(
                [
                    { 
                        transform: 'translate(-50%, -50%) scale(0.5)',
                        opacity: 0.8 
                    },
                    { 
                        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(2)`,
                        opacity: 0 
                    }
                ],
                {
                    duration: duration * 1000,
                    easing: 'ease-out'
                }
            );
            
            setTimeout(() => {
                cakeContainer.removeChild(smoke);
            }, duration * 1000);
        }
    }
    
    function createFillingEffect() {
        const colors = ['#e74c3c', '#3498db', '#f1c40f'];
        const fillingColor = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 15; i++) {
            const filling = document.createElement('div');
            filling.className = 'filling-particle';
            filling.style.backgroundColor = fillingColor;
            filling.style.left = '30px'; // Position where the cut is
            filling.style.top = '40px';  // Middle of the cake
            cakeContainer.appendChild(filling);
            
            const angle = Math.random() * Math.PI - Math.PI/2; // Mostly downward
            const distance = 20 + Math.random() * 40;
            const duration = 0.5 + Math.random() * 1;
            
            filling.animate(
                [
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { 
                        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`,
                        opacity: 0 
                    }
                ],
                {
                    duration: duration * 1000,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            );
            
            setTimeout(() => {
                cakeContainer.removeChild(filling);
            }, duration * 1000);
        }
    }
    
    function createCakeCrumbs() {
        const colors = ['#f39c12', '#e67e22', '#f1c40f', '#e74c3c', '#c0392b'];
        
        for (let i = 0; i < 40; i++) {
            const crumb = document.createElement('div');
            crumb.className = 'crumb-particle';
            crumb.style.width = Math.random() * 8 + 2 + 'px';
            crumb.style.height = crumb.style.width;
            crumb.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            if (Math.random() > 0.7) {
                crumb.style.borderRadius = '50%';
            } else {
                crumb.style.borderRadius = Math.random() * 5 + 2 + 'px';
            }
            
            crumb.style.left = 30 + Math.random() * 30 + 'px';
            crumb.style.top = Math.random() * 100 + 'px';
            cakeContainer.appendChild(crumb);
            
            const xVelocity = (Math.random() - 0.5) * 150;
            const yVelocity = (Math.random() - 0.3) * 100;
            const gravity = 300;
            const rotationSpeed = Math.random() * 1080 - 540;
            const duration = 0.8 + Math.random() * 1.2;
            
            const keyframes = [];
            const steps = 20;
            for (let step = 0; step <= steps; step++) {
                const time = step / steps;
                const x = xVelocity * time;
                const y = yVelocity * time + 0.5 * gravity * time * time;
                const rotate = rotationSpeed * time;
                
                keyframes.push({
                    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                    opacity: step < steps * 0.8 ? 1 : 1 - (step - steps * 0.8) / (steps * 0.2)
                });
            }
            
            crumb.animate(keyframes, {
                duration: duration * 1000,
                easing: 'linear'
            });
            
            setTimeout(() => {
                cakeContainer.removeChild(crumb);
            }, duration * 1000);
        }
    }
    
    function createSparkles() {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            sparkle.style.left = 30 + Math.random() * 30 + 'px';
            sparkle.style.top = Math.random() * 100 + 'px';
            cakeContainer.appendChild(sparkle);
            
            const size = Math.random() * 6 + 2;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';
            
            const duration = 0.3 + Math.random() * 0.7;
            
            sparkle.animate(
                [
                    { transform: 'scale(0)', opacity: 1 },
                    { transform: 'scale(1)', opacity: 1, offset: 0.2 },
                    { transform: 'scale(0)', opacity: 0 }
                ],
                {
                    duration: duration * 1000,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            );
            
            setTimeout(() => {
                cakeContainer.removeChild(sparkle);
            }, duration * 1000);
        }
    }
    
    function createConfetti() {
        const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.width = '8px';
                confetti.style.height = '12px';
            }
            
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            document.body.appendChild(confetti);
            
            const animDuration = Math.random() * 3 + 2;
            const xMovement = (Math.random() - 0.5) * 40;
            
            confetti.animate(
                [
                    { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight}px) translateX(${xMovement}vw) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ],
                {
                    duration: animDuration * 1000,
                    easing: 'cubic-bezier(0.15, 0.5, 0.5, 0.85)'
                }
            );
            
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, animDuration * 1000);
        }
    }
});
