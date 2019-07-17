const { newLocalizer } = require('@daisy/ace-localize');

const enJson = require("./locales/en.json");
const frJson = require("./locales/fr.json");
const pt_BRJson = require("./locales/pt_BR.json");


export const localizer = newLocalizer({
    en: {
        name: "English",
        default: true,
        translation: enJson,
    },
    fr: {
        name: "Français",
        translation: frJson,
    },
    pt_BR: {
        name: "Português do Brasil",
        translation: pt_BRJson,
    },
});
