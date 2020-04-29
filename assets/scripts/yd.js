(function () {
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        Function('return this')() ||
        {};
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var push = ArrayProto.push;
    function _(obj) {
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
        // return _;
    };
    _.throttle = function (fn, wait = 500) {
        let timer;
        return function (...args) {
            if (timer == null) {
                // 500ms之内用户只能点击一次ajax
                timer = setTimeout(() => { timer = null }, wait);
                return fn.apply(this, args);
            }
        }
    }
    _.each = function (obj, callback) {
        if (Array.isArray(obj)) {
            for (let item of obj) {
                callback && callback.call(_, item);
            }
        }
    }
    _.map = function (wrapped, callback) {
        // console.log("map");
        console.log("🍊", wrapped);
        console.log("🍌", callback);
    }
    _.isFunction = function (obj) {
        return typeof obj == 'function' || false;
    };
    _.functions = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    }
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (name) {
            //        _.map        _.map = function(){} = 
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return func.apply(_, args);
            };
        });
        return _;
    }
    _.mixin(_);
    root._ = _;
})();