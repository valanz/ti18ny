"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ISO639_1 = require("./ISO639");
var Translator = (function () {
    /**
     * @param {string} locale - the default locale
     */
    function Translator(locale) {
        this.dictionnary = {};
        this.locale = locale || ISO639_1.default.EN;
    }
    /**
     * Register some translation keys for a given locale
     * @param {string} locale - the targeted locale
     * @param {object} keys - the keys to be registered in the dictionnary
     */
    Translator.prototype.register = function (locale, keys) {
        this.dictionnary[locale] = Object.assign({}, this.dictionnary[locale], keys);
    };
    /**
     * Translate a given key into a localized string
     * @param {string} key - the key (represented in the following format: "some.key")
     * @param {array} parameters - the parameters that should be set in the final localized string
     * @return {string} the localized string
     */
    Translator.prototype.translate = function (key, parameters) {
        var localizedKey = this.locale + '.' + key;
        var stringKey = localizedKey.split('.').reduce(function (o, i) { return o[i] ? o[i] : false; }, this.dictionnary);
        // returns the original key if there isn't any match in the dictionnary
        if (!stringKey) {
            return key;
        }
        if (!parameters) {
            return stringKey;
        }
        return this.replaceWithArguments(stringKey, parameters);
    };
    /**
     * Replace placeholders by the given parameters
     * @param {string} string - the string to work on
     * @param {array} parameters - the parameters
     * @return {string} the string with the proper parameters
     */
    Translator.prototype.replaceWithArguments = function (string, parameters) {
        for (var key in parameters) {
            string = string.replace(new RegExp('\%(' + key + ')\%', "g"), parameters[key]);
        }
        return string;
    };
    return Translator;
}());
exports.default = Translator;
//# sourceMappingURL=Translator.js.map