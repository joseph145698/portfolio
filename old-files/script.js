const loaderDoneKey = "helloLoaderDone";

function getLocalStorageItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn("Local storage unavailable:", e);
        return null;
    }
}

function setLocalStorageItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn("Local storage unavailable:", e);
    }
}

function hideLoaderInstant() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    loader.style.opacity = "0";
    loader.style.transition = "none";
    loader.style.display = "none";
    document.body.classList.remove("loading");
}

function hideLoaderWithFade() {
    const loader = document.getElementById("loader");
    const text = loader.querySelector("h1");

    if (!loader) return;

    // Fade text first
    if (text) text.style.opacity = "0";

    setTimeout(() => {
        loader.style.opacity = "0";
    }, 300);

    setTimeout(() => {
        loader.style.display = "none";
        document.body.classList.remove("loading");
    }, 800);
}

const isLoadDone = getLocalStorageItem(loaderDoneKey) === "true";
if (!isLoadDone) {
    document.body.classList.add("loading");
} else {
    hideLoaderInstant();
}

window.addEventListener("load", function () {
    const menuBtn = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("expanded");
            document.body.classList.toggle("sidebar-open");
        });
    }

    const resetBtn = document.getElementById("reset-loader");
    if (resetBtn) {
        resetBtn.addEventListener("click", (e) => {
            e.preventDefault();
            setLocalStorageItem(loaderDoneKey, "false");
            window.location.href = "../index.html";
        });
    }

    if (!isLoadDone) {
        setTimeout(() => {
            hideLoaderWithFade();
            setLocalStorageItem(loaderDoneKey, "true");
        }, 3000);
    }
});



// HOME ANIMATION
function showHomeAnimation() {
    const homeSection = document.querySelector(".home");
    if (homeSection) {
        homeSection.classList.add("show");
    }
}

// Run after everything loads
window.addEventListener("load", () => {
    const isLoadDone = getLocalStorageItem(loaderDoneKey) === "true";

    if (isLoadDone) {
        // No loader → animate immediately
        showHomeAnimation();
    } else {
        // Wait for loader to finish
        setTimeout(() => {
            showHomeAnimation();
        }, 3000);
    }
});





// ABOUT ANIMATION
function showAboutAnimation() {
    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
        aboutSection.classList.add("show");
    }
}

// Trigger when scrolling
window.addEventListener("scroll", () => {
    const aboutSection = document.querySelector(".about");
    if (!aboutSection) return;

    const sectionTop = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (sectionTop < triggerPoint) {
        showAboutAnimation();
    }
});





document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', (e) => {

        e.preventDefault(); // stop instant jump

        // Close sidebar
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.remove("expanded");
        document.body.classList.remove("sidebar-open");

        const targetId = link.getAttribute('href');
        const section = document.querySelector(targetId);

        if (!section) return;

        // ✅ SMOOTH SCROLL
        section.scrollIntoView({
            behavior: "smooth"
        });

        // ✅ RESET ANIMATION (for ALL sections including certifications)
        const animatedItems = section.querySelectorAll(
            '.home-text, .home-image, .about-text, .about-images img, .certifications-text, .certifications-images img'
        );

        animatedItems.forEach(el => {
            el.style.transition = "none";
            el.style.opacity = "0";

            // reset translate (for your CSS variable system)
            if (section.classList.contains("certifications")) {
                el.style.setProperty('--translateY', '60px');
            } else {
                el.style.transform = "translateY(60px)";
            }

            void el.offsetWidth;

            el.style.transition = "all 0.8s ease";

            setTimeout(() => {
                el.style.opacity = "1";

                if (section.classList.contains("certifications")) {
                    el.style.setProperty('--translateY', '0');
                } else {
                    el.style.transform = "translateY(0)";
                }

            }, 200);
        });

    });
});




// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const allImages = document.querySelectorAll('.about-images img, .certifications-images img');
    
    allImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src; // show clicked image
        });
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

});


// CERTIFICATIONS ANIMATION
function showCertificationsAnimation() {
    const section = document.querySelector(".certifications");
    if (section) {
        section.classList.add("show");
    }
}

window.addEventListener("scroll", () => {
    const section = document.querySelector(".certifications");
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (sectionTop < triggerPoint) {
        showCertificationsAnimation();
    }
});





// CERTIFICATIONS ANIMATION
window.addEventListener("scroll", () => {
    const section = document.querySelector(".certifications");
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (sectionTop < triggerPoint) {
        section.classList.add("show");
    }
});