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