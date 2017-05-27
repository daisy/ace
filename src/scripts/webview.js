
window._eact_createElementCFI = function(domMatch) {

    var cfi_ = undefined;

    var currentElement = domMatch;
    do {
        var elementIndex = 0;
        var siblingElement = currentElement;
        for (elementIndex = 1; siblingElement = siblingElement.previousElementSibling; elementIndex++);
        elementIndex *= 2; // even CFI element indices

        var IDassertion = "";
        var id = currentElement.getAttribute("id");
        if (id) {
            IDassertion = "[" + id + "]";
        }

        if (cfi_) {
            cfi_ = elementIndex + IDassertion + "/" + cfi_;
        } else {
            cfi_ = elementIndex + IDassertion;
        }

        currentElement = currentElement.parentNode;
    } while (currentElement && currentElement.nodeType && currentElement.nodeType == 1
            && currentElement.parentNode && currentElement.parentNode.nodeType && currentElement.parentNode.nodeType == 1);

    return "/" + cfi_;
};


window._eact_RUN = function(jsURL, jsDoneFunction) {

    // console.debug(window["$"]); // jQuery
    // console.debug(window["_"]); // Underscore
    // throw new Error("CFI BREAK");

    var addCFIs = function(jsonItem) {

        if (Array.isArray(jsonItem)) {
            for (var i = 0; i < jsonItem.length; i++) {
                var arrayItem = jsonItem[i];
                addCFIs(arrayItem);
            }
        } else if (typeof jsonItem === 'object') {
            for (var key in jsonItem) {
                if (!jsonItem.hasOwnProperty(key)) continue;
                var val = jsonItem[key];

                if (key !== "target") {
                    addCFIs(val);
                    continue;
                }

                if (Array.isArray(val)) {
                    jsonItem["targetCFI"] = [];

                    for (var i = 0; i < val.length; i++) {
                        var cssSelector = val[i];
                        var domMatch = document.querySelector(cssSelector);

                        var cfi = "_CFI_";

                        if (domMatch && domMatch instanceof Element) { //domMatch.nodeType == 1
                            // if (!window["EPUBcfi"]) {
                            //     throw new Error("CFI??!");
                            // }
                            // //console.log(window.EPUBcfi);
                            // console.log(window.EPUBcfi.Parser);
                            // console.log(window.EPUBcfi.Interpreter);
                            // console.log(window.EPUBcfi.CFIInstructions);
                            // console.log(window.EPUBcfi.Generator);

                            // console.log(window.EPUBcfi.NodeTypeError);
                            // console.log(window.EPUBcfi.OutOfRangeError);
                            // console.log(window.EPUBcfi.TerminusError);
                            // console.log(window.EPUBcfi.CFIAssertionError);

                            // throw new Error("CFI BREAK");

                            // var cfiREADIUM = undefined;
                            // if (window["EPUBcfi"] && EPUBcfi.Generator) {
                            //     try {
                            //         cfiREADIUM = EPUBcfi.Generator.generateElementCFIComponent(domMatch);
                            //     } catch (err) {
                            //         //noop
                            //     }
                            //     console.log(cfiREADIUM);
                            // }
                            //else
                            {
                                try {
                                    cfi = window._eact_createElementCFI(domMatch);

                                } catch (err) {
                                    //noop
                                }

                                // console.log(cfi);

                                // if (cfi !== cfiREADIUM) {
                                //     console.debug(domMatch);
                                //     throw new Error("CFI BREAK");
                                // }
                            }
                        }

                        jsonItem.targetCFI.push(cfi);
                    }
                } else {
                    throw "WTF?!";
                }
            }
        }
    };

    window.axe.run(
        function(axeError, axeJsonReport) {
            if (axeError)  {
                throw axeError;
            }
            console.debug(jsURL);
            console.log(axeJsonReport);

            addCFIs(axeJsonReport);

            var eactJsonReport = {};
            eactJsonReport.axe = axeJsonReport;

            window._eact_createEactReport(eactJsonReport);

            let eactJsonReport_STR = JSON.stringify(eactJsonReport, null, '  ');
            console.log(eactJsonReport_STR);

            jsDoneFunction(eactJsonReport_STR);
        }
    );
};
