import * as i18n from 'i18next';

import * as enJson from "./locales/en.json";
import * as frJson from "./locales/fr.json";

export const LANGUAGES = {
    en: "English",
    fr: "Français",
};
export const LANGUAGE_KEYS = Object.keys(LANGUAGES);

export const DEFAULT_LANGUAGE = "en";

// https://www.i18next.com/overview/configuration-options
i18n.init({
    debug: false,
    resources: {
        en: {
            translation: enJson.default || enJson,
        },
        fr: {
            translation: frJson.default || frJson,
        },
    },
    // lng: undefined,
    fallbackLng: DEFAULT_LANGUAGE,
    // whitelist: LANGUAGE_KEYS,
    // nonExplicitWhitelist: true,
    // load: "all",
    // preload: LANGUAGE_KEYS,
    // lowerCaseLng: false,
});

var _currentLanguage = DEFAULT_LANGUAGE;

export function getCurrentLanguage() {
    return _currentLanguage;
};

export function setCurrentLanguage(language) {
    
    for (const lang of LANGUAGE_KEYS) {
        if (language === lang) {
            _currentLanguage = language;
            return;
        }
    }
    // fallback
    _currentLanguage = DEFAULT_LANGUAGE;
};

export function localize(msg, options) {
    const opts = options || {};

    if (i18n.language !== _currentLanguage) {
        i18n.changeLanguage(_currentLanguage);
    }

    return i18n.t(msg, opts);
};
