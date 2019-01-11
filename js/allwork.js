(function AllworkPageModule(pageName) {

    const moduleName = "allwork";

    function init() {
        new NavigationScrollingBehaviour();
    }

    if (pageName === moduleName) {
        init();
    }

})(window.appPage);