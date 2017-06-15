import ISO639 from './ISO639'

export default class Translator {
    locale:string;
    dictionnary:Object = {};

    /**
     * @param {string} locale - the default locale
     */
    constructor(locale?:string) {
        this.locale = locale || ISO639.EN;
    }

    /**
     * Register some translation keys for a given locale
     * @param {string} locale - the targeted locale
     * @param {object} keys - the keys to be registered in the dictionnary
     */
    register(locale:string, keys:Object) {
        this.dictionnary[locale] = Object.assign({}, this.dictionnary[locale], keys);
    }

    /**
     * Translate a given key into a localized string
     * @param {string} key - the key (represented in the following format: "some.key")
     * @param {array} parameters - the parameters that should be set in the final localized string
     * @return {string} the localized string
     */
    translate(key:string, parameters?:{}):string {
        let localizedKey = this.locale + '.' + key;

        let stringKey:string = <string> localizedKey.split('.').reduce((o,i):string => o[i] ? o[i] : false, this.dictionnary);

        // returns the original key if there isn't any match in the dictionnary
        if (!stringKey) {
            return key;
        }

        if (!parameters) {
            return stringKey;
        }

        return this.replaceWithArguments(stringKey, parameters);
    }

    /**
     * Replace placeholders by the given parameters
     * @param {string} string - the string to work on
     * @param {array} parameters - the parameters
     * @return {string} the string with the proper parameters
     */
    replaceWithArguments(string:string, parameters:{}):string {
        for (var key in parameters) {
            string = string.replace(new RegExp('\%('+key+')\%', "g"), parameters[key]);
        }

        return string;
    }
}

