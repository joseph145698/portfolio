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

if (!isLoadDone && document.getElementById("loader")) {
    document.body.classList.add("loading");
} else {
    hideLoaderInstant();
}

function showCurrentPageAnimation() {
    const sections = document.querySelectorAll(".home, .about, .certifications, .tech-stack, .contacts");
    sections.forEach(section => section.classList.add("show"));
}

window.addEventListener("load", function () {
    const resetBtn = document.getElementById("reset-loader");

    if (resetBtn) {
        resetBtn.addEventListener("click", (e) => {
            e.preventDefault();
            setLocalStorageItem(loaderDoneKey, "false");
            window.location.href = "index.html";
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

    if (!lightbox || !lightboxImg) return;

    let isClosing = false;

    const clickableImages = document.querySelectorAll(
        ".about-images img, .certifications-images img"
    );

    clickableImages.forEach(img => {
        img.addEventListener("click", () => {

            // ❌ prevent clicking while closing
            if (isClosing) return;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "Zoomed Image";

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
                lightbox.classList.remove("closing");

                document.body.classList.remove("lightbox-active");

                isClosing = false;
            }, 400); // match CSS animation duration
        }
    });
});