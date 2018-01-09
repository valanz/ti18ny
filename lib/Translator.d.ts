export default class Translator {
    locale: string;
    dictionnary: Object;
    /**
     * @param {string} locale - the default locale
     */
    constructor(locale?: string);
    /**
     * Register some translation keys for a given locale
     * @param {string} locale - the targeted locale
     * @param {object} keys - the keys to be registered in the dictionnary
     */
    register(locale: string, keys: Object): void;
    /**
     * Translate a given key into a localized string
     * @param {string} key - the key (represented in the following format: "some.key")
     * @param {array} parameters - the parameters that should be set in the final localized string
     * @return {string} the localized string
     */
    translate(key: string, parameters?: {}): string;
    /**
     * Replace placeholders by the given parameters
     * @param {string} string - the string to work on
     * @param {array} parameters - the parameters
     * @return {string} the string with the proper parameters
     */
    replaceWithArguments(string: string, parameters: {}): string;
}
