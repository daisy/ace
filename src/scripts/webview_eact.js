
window._eact_createEactReport = function(eactJsonReport) {

    // TODO
    let imagesWithAlt = document.querySelectorAll('img[alt]:not([alt=""])');
    console.debug(imagesWithAlt);

    eactJsonReport.imagesWithAlt = [];

    imagesWithAlt.forEach(function(imageElement) {
        console.debug(imageElement);

        eactJsonReport.imagesWithAlt.push({
            html: imageElement.outerHTML,
            alt: imageElement.getAttribute('alt'),
            cfi: window._eact_createElementCFI(imageElement)
        });
    });

    let imagesWithEmptyAlt = document.querySelectorAll('img[alt=""]');
    console.debug(imagesWithEmptyAlt);

    eactJsonReport.imagesWithEmptyAlt = [];

    imagesWithEmptyAlt.forEach(function(imageElement) {
        console.debug(imageElement);

        eactJsonReport.imagesWithEmptyAlt.push({
            html: imageElement.outerHTML,
            cfi: window._eact_createElementCFI(imageElement)
        });
    });

    let imagesWithNoAlt = document.querySelectorAll('img:not([alt])');
    console.debug(imagesWithNoAlt);

    eactJsonReport.imagesWithNoAlt = [];

    imagesWithNoAlt.forEach(function(imageElement) {
        console.debug(imageElement);

        eactJsonReport.imagesWithNoAlt.push({
            html: imageElement.outerHTML,
            cfi: window._eact_createElementCFI(imageElement)
        });
    });

    eactJsonReport.eactListOfImages = ["test1", "test2"];
    eactJsonReport.eactOutline = {"test1":"here1", "test2":"here2"};
};
