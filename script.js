window.addEventListener("load", function () {
    setTimeout(function () {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 3000); 
});