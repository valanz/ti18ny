import ISO639 from '../src/ISO639'
import Translator from "../src/Translator";

describe('should translate some string', () => {
    let translator = new Translator();

    translator.register(ISO639.FR, {
        greetings: {
            hello: 'Bonjour %name%',
            bye: 'A bientôt'
        }
    });

    translator.register(ISO639.EN, {
        greetings: {
            hello: 'Hello %name%',
            bye: 'Bye'
        }
    });

    let translations = {
        fr: {
            greetings: {
                hello: 'Bonjour %name%',
                bye: 'A bientôt'
            }
        },
        en: {
            greetings: {
                hello: 'Hello %name%',
                bye: 'Bye'
            }
        }
    };

    test('it should register some keys', () => {
        expect(translator.dictionnary).toMatchObject(translations);
    });

    test('it should append some keys', () => {
        let someTranslations = {
            greetings: {
                bye: 'Adiòs'
            }
        };

        translator.register(ISO639.ES, someTranslations);

        expect(translator.dictionnary).toMatchObject({
            fr: {
                greetings: {
                    hello: 'Bonjour %name%',
                    bye: 'A bientôt'
                }
            },
            en: {
                greetings: {
                    hello: 'Hello %name%',
                    bye: 'Bye'
                }
            },
            es: {
                greetings: {
                    bye: 'Adiòs'
                }
            }
        });
    });

    test('it should translate a string', () => {
        expect(translator.translate('greetings.hello', {name: 'Betty'})).toEqual('Hello Betty');
        expect(translator.translate('greetings.bye')).toEqual('Bye');

        expect(translator.translate('greetings.hello')).toEqual('Hello %name%');

        translator.locale = ISO639.FR;
        expect(translator.translate('greetings.hello', {name: 'Betty'})).toEqual('Bonjour Betty');
    });

    test('it should give back the key if there is no match', () => {
        expect(translator.translate('unknown.key')).toEqual('unknown.key');
    })

    test('it should replace some parameters in a string', () => {
        expect(translator.replaceWithArguments('Hello %name%, you are %age% yo', {
            name: 'Betty',
            age: 23
        })).toEqual('Hello Betty, you are 23 yo');

        expect(translator.replaceWithArguments('Hello %name%, you are %age% yo', {
            name: 'Jug'
        })).toEqual('Hello Jug, you are %age% yo');
    });
})

