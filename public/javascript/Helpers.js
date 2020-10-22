class Helpers {
    static setDefaultValue = (object, value) =>
        new Proxy(object, { get: (target, property) =>
            target.hasOwnProperty(property) ? target[property] : value
        });
}