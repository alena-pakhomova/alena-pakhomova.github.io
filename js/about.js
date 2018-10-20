(function AboutPageModule(pageName) {

    const moduleName = "about";

    function init() {
        new NavigationScrollingBehaviour();
    }

    if (pageName === moduleName) {
        init();
    }

})(window.appPage);