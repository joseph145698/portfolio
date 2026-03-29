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
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
        loader.style.display = "none";
        document.body.classList.remove("loading");
    }, 500);
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