"use strict";

(function AboutPageModule(pageName) {

    const moduleName = "about";

    function init() {
        new NavigationScrollingBehaviour();
    }

    if (pageName === moduleName) {
        init();
    }

})(window.appPage);
"use strict";

(function AllworkPageModule(pageName) {

    const moduleName = "allwork";

    function init() {
        new NavigationScrollingBehaviour();
    }

    if (pageName === moduleName) {
        init();
    }

})(window.appPage);
"use strict";

(function ContactPageModule(pageName) {

    const moduleName = "contact";

    function init() {
        new NavigationScrollingBehaviour();
    }

    if (pageName === moduleName) {
        init();
    }

})(window.appPage);
"use strict";

(function WorkPageModule(pageName) {

    const moduleName = "work";

    let pswpElement = null;
    let photoswipeImages = null;

    function onPhotoswipeItemClick(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        const curItemIndex = e.target.getAttribute("data-pswp-index");

        const options = {
            index: parseInt(curItemIndex, 10) - 1
        };
        
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, photoswipeImages, options);
        gallery.init();
    }

    function createPhotoswipeImagesArr() {
        const allImages = document.getElementsByClassName("old_site__wrap");
        const returnValue = [];

        for (let i = 0; i < allImages.length; i++) {
            const image = allImages[i];

            image.onclick = onPhotoswipeItemClick

            const photoSwipeItem = {};
            const itemSrc = image.getAttribute("href");
            const itemHeight = image.getAttribute("data-pswp-height");
            const itemWidth = image.getAttribute("data-pswp-width");
            
            if (itemSrc && itemHeight && itemWidth) {
                photoSwipeItem.src = itemSrc;
                photoSwipeItem.h = parseInt(itemHeight, 10);
                photoSwipeItem.w = parseInt(itemWidth, 10);
                returnValue.push(photoSwipeItem);
            }
        }

        return returnValue;
    }

    function init() {
        pswpElement = document.querySelectorAll('.pswp')[0];
        photoswipeImages = createPhotoswipeImagesArr();
        
        new NavigationScrollingBehaviour();
    }

    if (pageName === moduleName) {
        init();
    }

})(window.appPage);
"use strict";

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