const { newLocalizer } = require('@daisy/ace-localize');

const enJson = require("./locales/en");
const frJson = require("./locales/fr");

export const localizer = newLocalizer({
    en: {
        name: "English",
        default: true,
        translation: enJson.default || enJson,
    },
    fr: {
        name: "Français",
        translation: frJson.default || frJson,
    },
});
