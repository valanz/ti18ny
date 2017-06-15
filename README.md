# Ti18ny
## Example
```js
let translator = new Translator(Locale.FR);

//Register a dictionnary for a specific language
translator.register(Locale.FR, {
    greetings: {
        hello: 'Bonjour %name%'
    }
});

translator.translate('greetings.hello', {name: 'Betty'})
// => Bonjour Betty
```

Check out the [tests](https://github.com/valanz/ti18ny/blob/master/test/translator.test.ts) to get more details on how to use the lib.