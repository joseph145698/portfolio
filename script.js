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

    if (!loader) return;

    const text = loader.querySelector("h1");

    if (text) {
        text.style.opacity = "0";
    }

    setTimeout(() => {
        loader.style.opacity = "0";
    }, 300);

    setTimeout(() => {
        loader.style.display = "none";

        document.body.classList.remove("loading");
    }, 800);
}

const isLoadDone = getLocalStorageItem(loaderDoneKey) === "true";

if (!isLoadDone && document.getElementById("loader")) {
    document.body.classList.add("loading");
} else {
    hideLoaderInstant();
}

function showCurrentPageAnimation() {
    const sections = document.querySelectorAll(
        ".home, .about, .certifications, .tech-stack, .contacts"
    );

    sections.forEach(section => {
        section.classList.add("show");

        if (section.classList.contains("certifications")) {
            setTimeout(() => {
                section.classList.add("animation-done");
            }, 1800);
        }
    });
}

window.addEventListener("load", function () {

    const resetBtn = document.getElementById("reset-loader");

    if (resetBtn) {

        resetBtn.addEventListener("click", (e) => {

            e.preventDefault();

            Swal.fire({
                title: "Go back to homepage?",
                text: "The Hello, World! intro animation will play again.",
                icon: "question",
                background: "#242424",
                color: "#ffffff",
                confirmButtonText: "Continue",
                cancelButtonText: "Cancel",
                showCancelButton: true,
                confirmButtonColor: "#ffffff",
                cancelButtonColor: "#555555",

                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    htmlContainer: "custom-swal-text",
                    confirmButton: "custom-swal-confirm",
                    cancelButton: "custom-swal-cancel"
                }
            }).then((result) => {

                if (result.isConfirmed) {
                    setLocalStorageItem(loaderDoneKey, "false");

                    window.location.href = "index.html";
                }

            });

        });

    }

    if (!isLoadDone && document.getElementById("loader")) {

        setTimeout(() => {

            hideLoaderWithFade();

            setLocalStorageItem(loaderDoneKey, "true");

            showCurrentPageAnimation();

        }, 3000);

    } else {

        showCurrentPageAnimation();

    }

});

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("lightbox");

    const lightboxImg = lightbox?.querySelector("img");

    const lightboxDescription = lightbox?.querySelector(".lightbox-description");

    const certificateButton = lightbox?.querySelector(".certificate-button");

    if (!lightbox || !lightboxImg) return;

    let isClosing = false;

    let currentCertificateLink = "";

    const clickableImages = document.querySelectorAll(
        ".about-images img, .certifications-images img"
    );

    clickableImages.forEach(img => {

        img.addEventListener("click", () => {

            if (isClosing) return;

            lightboxImg.src = img.src;

            lightboxImg.alt = img.alt || "Zoomed Image";

            if (lightboxDescription) {
                lightboxDescription.textContent =
                    img.dataset.description || "";
            }

            currentCertificateLink = img.dataset.link || "";

            document.body.classList.add("lightbox-active");

            requestAnimationFrame(() => {
                lightbox.classList.add("show");
            });

        });

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox && !isClosing) {

            isClosing = true;

            lightbox.classList.add("closing");

            lightbox.classList.remove("show");

            setTimeout(() => {

                lightboxImg.src = "";

                currentCertificateLink = "";

                if (lightboxDescription) {
                    lightboxDescription.textContent = "";
                }

                lightbox.classList.remove("closing");

                document.body.classList.remove("lightbox-active");

                isClosing = false;

            }, 400);

        }

    });

    if (certificateButton) {

        certificateButton.addEventListener("click", (e) => {

            e.stopPropagation();

            if (currentCertificateLink) {

                window.open(
                    currentCertificateLink,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        });

    }

});

// Homepage particle background effect
const particlesContainer = document.getElementById(
    "particles-container"
);

if (particlesContainer) {

    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {

        const particle = document.createElement("div");

        particle.className = "particle";

        const size = Math.random() * 3 + 1;

        particle.style.width = `${size}px`;

        particle.style.height = `${size}px`;

        particlesContainer.appendChild(particle);

        animateParticle(particle);

    }

    function resetParticle(particle) {

        const posX = Math.random() * 100;

        const posY = Math.random() * 100;

        particle.style.left = `${posX}%`;

        particle.style.top = `${posY}%`;

        particle.style.opacity = "0";

        return {
            x: posX,
            y: posY
        };

    }

    function animateParticle(particle) {

        const pos = resetParticle(particle);

        const duration = Math.random() * 10 + 10;

        const delay = Math.random() * 5;

        setTimeout(() => {

            particle.style.transition =
                `all ${duration}s linear`;

            particle.style.opacity =
                Math.random() * 0.4 + 0.15;

            const moveX =
                pos.x + (Math.random() * 20 - 10);

            const moveY =
                pos.y - Math.random() * 30;

            particle.style.left = `${moveX}%`;

            particle.style.top = `${moveY}%`;

            setTimeout(() => {
                animateParticle(particle);
            }, duration * 1000);

        }, delay * 1000);

    }

}

// External link SweetAlert
const externalLinks = document.querySelectorAll(".external-link");

externalLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const url = link.href;

        Swal.fire({
            title: "Leave this website?",
            text: "You're about to leave this website to go to my profile.",
            icon: "warning",
            background: "#242424",
            color: "#ffffff",
            confirmButtonText: "Go to Link",
            cancelButtonText: "Stay",
            showCancelButton: true,
            confirmButtonColor: "#ffffff",
            cancelButtonColor: "#555555",

            customClass: {
                popup: "custom-swal-popup",
                title: "custom-swal-title",
                htmlContainer: "custom-swal-text",
                confirmButton: "custom-swal-confirm",
                cancelButton: "custom-swal-cancel"
            }

        }).then((result) => {

            if (result.isConfirmed) {

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        });

    });

});