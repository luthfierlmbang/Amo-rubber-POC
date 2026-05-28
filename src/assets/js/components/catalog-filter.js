document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");
    const emptyState = document.getElementById("empty-state");

    if (filterBtns.length === 0 || productCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            // Toggle active button styles
            filterBtns.forEach(b => {
                b.classList.remove("bg-primary", "text-white");
                b.classList.add("bg-white", "text-default-800");
            });
            btn.classList.remove("bg-white", "text-default-800");
            btn.classList.add("bg-primary", "text-white");

            let visibleCount = 0;

            productCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            if (visibleCount === 0) {
                if (emptyState) emptyState.classList.remove("hidden");
            } else {
                if (emptyState) emptyState.classList.add("hidden");
            }
        });
    });
});
