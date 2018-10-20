function NavigationScrollingBehaviour() {

    function init() {
        const allNavigationLinks = document.querySelectorAll(".scroll-wrap__link, .scroll-wrap__link-r");

        for (let i = 0; i < allNavigationLinks.length; i++) {
            const navigationLink = allNavigationLinks[i];
            const navigateTo = navigationLink.getAttribute("data-navigate-to-id");
            if (navigateTo) {
                navigationLink.onclick = function() {
                    scrollTo(navigateTo);
                };
            }
        }
    }

    function scrollTo(elementId) {
        TweenLite.to(window, 1.3, { scrollTo: "#" + elementId, ease: Power2.easeOut });
    }

    init();
}