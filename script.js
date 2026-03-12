document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------
       Scroll Reveal Animations
    ------------------------------------------- */
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    /* -------------------------------------------
       Countdown Timer Logic (Oct 24, 2026)
    ------------------------------------------- */
    const targetDate = new Date("Oct 24, 2026 15:00:00").getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(updateCountdown);
            document.getElementById("timer").innerHTML = "<h2>Just Married!</h2>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);

    /* -------------------------------------------
       Audio Control Logic
    ------------------------------------------- */
    const bgMusic = document.getElementById('bgMusic');
    const musicToggleBtn = document.getElementById('musicToggle');
    const toggleIcon = musicToggleBtn.querySelector('i');
    
    bgMusic.volume = 0.5;

    // Track state: Initially true because we set 'autoplay' and 'muted' in HTML
    let isPlaying = true;
    let isMuted = true;

    // Set initial button state to reflect muted autoplay
    toggleIcon.classList.remove('fa-volume-up');
    toggleIcon.classList.add('fa-volume-mute');
    musicToggleBtn.classList.remove('playing');

    const toggleMusic = () => {
        // If it's the first time interacting, we just want to unmute it
        if (isMuted) {
            bgMusic.muted = false;
            isMuted = false;
            toggleIcon.classList.remove('fa-volume-mute');
            toggleIcon.classList.add('fa-volume-up');
            musicToggleBtn.classList.add('playing');
            
            // Ensure it's actually playing (some browsers might pause instead of mute)
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.log("Play failed:", e));
            }
            isPlaying = true;
        } else {
            // Standard toggle behavior after initial unmute
            if (isPlaying) {
                bgMusic.pause();
                toggleIcon.classList.remove('fa-volume-up');
                toggleIcon.classList.add('fa-volume-mute');
                musicToggleBtn.classList.remove('playing');
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    toggleIcon.classList.remove('fa-volume-mute');
                    toggleIcon.classList.add('fa-volume-up');
                    musicToggleBtn.classList.add('playing');
                    isPlaying = true;
                }).catch(e => {
                    console.log("Audio play prevented:", e);
                    isPlaying = false;
                });
            }
        }
    };

    musicToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from firing too
        toggleMusic();
    });

    // Handle unlocking audio/unmuting on first meaningful interaction anywhere
    const unlockAudio = () => {
        if (isMuted) {
            toggleMusic();
        }
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);


    /* -------------------------------------------
       Lightbox for Gallery
    ------------------------------------------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".gallery-img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Close lightbox when clicking outside the image
    window.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });



});
