/**
 * Author		jssoscar
 * Date			2014-3-11 12:13:35
 * Version		1.0.0
 * Description	Interface for Javascript
 */

/**
 * Define the interface object
 *
 * @param {String} name : the interface name
 * @param {Array} methods : the intereace methods
 */
function Interface(name, methods) {
	if (this instanceof Instance) {
		if (!(methods && typeof methods === "object" && Array == methods.constructor)) {
			this.exception("The parameter 'methods' be an array.");
		}
		if (arguments.length !== 2) {
			this.exception("The argument length is" + arguments.length + ".In fact,here expect have 2 arguments");
		}
		this.name = name;
		this.methods = [];
		for (var iterator in methods) {
			var data = methods[iterator];
			if ( typeof data !== "string") {
				this.exception("The method name must be passed as string.");
			}
			this.methods.push(data);
		}
	} else {
		return new Interface(name, methods);
	}
}

/**
 * Define the prototype for the Interface object
 *
 * constructor : point the constructor to Interface object
 * exception : error handler
 * ensureImplements : ensure the instance implements all the interface methods
 */
Interface.prototype = {
	constructor : Interface,
	exception : function(msg) {
		throw new Error(msg);
	},
	ensureImplements : function(obj) {
		if (arguments.length < 2) {
			this.exception("The argument length is" + arguments.length + ".In fact,here expect at least 2 arguments");
		}
		for (var index = 1, len = arguments.length; index < len; index++) {
			var data = arguments[index];
			if (data.constructor !== Interface) {
				this.exception("The arguments over 0 must be instanceof Interface.");
			}
			for (var method in data.methods) {
				var methodName = data.methods[method];
				if (!obj[methodName] || typeof object[methodName] !== "function") {
					this.exception("Method " + methodName + "was not found in the object.Please ensure the object implements all interface methods.");
				}
			}
		}
	}
};