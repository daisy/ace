const i18n = require('i18next');
const winston = require('winston');

// EXAMPLE `resources` initialization parameter:
// {
//     en: {
//         name: "English",
//         default: true,
//         translation: { hello: "Hello" },
//     },
//     fr: {
//         name: "Français",
//         translation: { hello: "Bonjour" },
//     },
// }
export function newLocalizer(resources) {

    const LANGUAGE_KEYS = Object.keys(resources);
    const DEFAULT_LANGUAGE = LANGUAGE_KEYS.find((lang) => {
        return resources[lang].default;
    });
    var _currentLanguage = DEFAULT_LANGUAGE;

    const i18nextInstance = i18n.createInstance();
    // https://www.i18next.com/overview/configuration-options
    i18nextInstance.init({
        debug: false,
        resources: resources,
        // lng: undefined,
        fallbackLng: DEFAULT_LANGUAGE,
        // whitelist: LANGUAGE_KEYS,
        // nonExplicitWhitelist: true,
        // load: "all",
        // preload: LANGUAGE_KEYS,
        // lowerCaseLng: false,
        saveMissing: true,
        missingKeyHandler: (lng, ns, key, fallbackValue, updateMissing, options) => {
            if (!options || !options.ignoreMissingKey) {
                winston.info('i18next missingKey (ACE REPORT AXE): ' + key);
            }
            return key;
        },
    });
    
    return {
        LANGUAGES: resources,

        getDefaultLanguage: function() {
            return DEFAULT_LANGUAGE;
        },

        getCurrentLanguage: function() {
            return _currentLanguage;
        },
        setCurrentLanguage: function(language) {
            
            for (const lang of LANGUAGE_KEYS) {
                if (language === lang) {
                    _currentLanguage = language;
                    return;
                }
            }
            // fallback
            _currentLanguage = DEFAULT_LANGUAGE;
        },
        
        localize: function(msg, options) {
            const opts = options || {};
        
            if (i18nextInstance.language !== _currentLanguage) {
                i18nextInstance.changeLanguage(_currentLanguage);
            }
        
            return i18nextInstance.t(msg, opts);
        },
        
        getRawResources: function() {
            return resources;
        },
        
        getRawResourcesForCurrentLanguage: function() {
            if (resources[_currentLanguage]) {
                return resources[_currentLanguage].translation;
            }
            return resources[DEFAULT_LANGUAGE].translation;
        },
    };
}
