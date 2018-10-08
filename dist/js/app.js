"use strict";

(function WorkPageModule() {

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

    const pswpElement = document.querySelectorAll('.pswp')[0];
    const photoswipeImages = createPhotoswipeImagesArr();

})();