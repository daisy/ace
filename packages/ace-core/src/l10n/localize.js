const { newLocalizer } = require('@daisy/ace-localize');

const enJson = require("./locales/en.json");
const frJson = require("./locales/fr.json");

const localizer = newLocalizer({
    en: {
        name: "English",
        default: true,
        translation: enJson,
    },
    fr: {
        name: "Français",
        translation: frJson,
    },
});
module.exports = { localizer };
