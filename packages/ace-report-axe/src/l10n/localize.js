const { newLocalizer } = require('@daisy/ace-localize');

const enJson = require("./locales/en.json");
const frJson = require("./locales/fr.json");
const pt_BRJson = require("./locales/pt_BR.json");
const esJson = require("./locales/es.json");
const daJson = require("./locales/da.json");
const jaJson = require("./locales/ja.json");
const deJson = require("./locales/de.json");

const localizer = newLocalizer({
    en: {
        name: "English",
        default: true,
        translation: enJson,
    },
    // de: {
    //     name: "Deutsch",
    //     translation: deJson,
    // },
    fr: {
        name: "Français",
        translation: frJson,
    },
    pt_BR: {
        name: "Português do Brasil",
        translation: pt_BRJson,
    },
    es: {
        name: "Español",
        translation: esJson,
    },
    da: {
        name: "Dansk",
        translation: daJson,
    },
    ja: {
        name: "Japanese",
        translation: jaJson,
    },
});
module.exports = { localizer };
