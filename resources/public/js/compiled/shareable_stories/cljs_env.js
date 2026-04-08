var $CLJS = {};
var CLJS_GLOBAL = global;
var CLOSURE_DEFINES = CLJS_GLOBAL.CLOSURE_DEFINES = $CLJS.CLOSURE_DEFINES = {"shadow.cljs.devtools.client.env.repl_pprint":false,"shadow.cljs.devtools.client.env.reload_strategy":"optimized","shadow.cljs.devtools.client.env.devtools_url":"","shadow.cljs.devtools.client.env.autoload":true,"shadow.cljs.devtools.client.env.proc_id":"22c0e46a-4994-41b2-b1f1-dd71b786126a","shadow.cljs.devtools.client.env.use_document_protocol":false,"goog.ENABLE_DEBUG_LOADER":false,"shadow.cljs.devtools.client.env.server_port":9630,"shadow.cljs.devtools.client.env.server_token":"3771008a-a9aa-462b-a8ac-f716c4c9f2a0","shadow.cljs.devtools.client.env.use_document_host":true,"shadow.cljs.devtools.client.env.module_format":"js","goog.LOCALE":"en","shadow.cljs.devtools.client.env.build_id":"stories","shadow.cljs.devtools.client.env.ignore_warnings":false,"goog.DEBUG":true,"shadow.cljs.devtools.client.env.log":true,"shadow.cljs.devtools.client.env.ssl":false,"shadow.cljs.devtools.client.env.enabled":true,"shadow.cljs.devtools.client.env.server_host":"localhost","shadow.cljs.devtools.client.env.worker_client_id":3,"goog.TRANSPILE":"never"};
CLJS_GLOBAL.CLOSURE_NO_DEPS = true;
CLJS_GLOBAL.$CLJS = $CLJS;
global.shadow$provide = {};
var goog = $CLJS.goog = {};
var COMPILED = false;
var goog = goog || {};
goog.global = global;
goog.global.CLOSURE_UNCOMPILED_DEFINES;
goog.global.CLOSURE_DEFINES;
goog.exportPath_ = function(name, object, overwriteImplicit, objectToExportTo) {
  var parts = name.split(".");
  var cur = objectToExportTo || goog.global;
  if (!(parts[0] in cur) && typeof cur.execScript != "undefined") {
    cur.execScript("var " + parts[0]);
  }
  for (var part; parts.length && (part = parts.shift());) {
    if (!parts.length && object !== undefined) {
      if (!overwriteImplicit && goog.isObject(object) && goog.isObject(cur[part])) {
        for (var prop in object) {
          if (object.hasOwnProperty(prop)) {
            cur[part][prop] = object[prop];
          }
        }
      } else {
        cur[part] = object;
      }
    } else if (cur[part] && cur[part] !== Object.prototype[part]) {
      cur = cur[part];
    } else {
      cur = cur[part] = {};
    }
  }
};
goog.define = function(name, defaultValue) {
  var value = defaultValue;
  if (!COMPILED) {
    var uncompiledDefines = goog.global.CLOSURE_UNCOMPILED_DEFINES;
    var defines = goog.global.CLOSURE_DEFINES;
    if (uncompiledDefines && uncompiledDefines.nodeType === undefined && Object.prototype.hasOwnProperty.call(uncompiledDefines, name)) {
      value = uncompiledDefines[name];
    } else if (defines && defines.nodeType === undefined && Object.prototype.hasOwnProperty.call(defines, name)) {
      value = defines[name];
    }
  }
  return value;
};
goog.FEATURESET_YEAR = goog.define("goog.FEATURESET_YEAR", 2012);
goog.DEBUG = goog.define("goog.DEBUG", true);
goog.LOCALE = goog.define("goog.LOCALE", "en");
goog.TRUSTED_SITE = goog.define("goog.TRUSTED_SITE", true);
goog.DISALLOW_TEST_ONLY_CODE = goog.define("goog.DISALLOW_TEST_ONLY_CODE", COMPILED && !goog.DEBUG);
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = goog.define("goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING", false);
goog.provide = function(name) {
  if (goog.isInModuleLoader_()) {
    throw new Error("goog.provide cannot be used within a module.");
  }
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw new Error('Namespace "' + name + '" already declared.');
    }
  }
  goog.constructNamespace_(name);
};
goog.constructNamespace_ = function(name, object, overwriteImplicit) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while (namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if (goog.getObjectByName(namespace)) {
        break;
      }
      goog.implicitNamespaces_[namespace] = true;
    }
  }
  goog.exportPath_(name, object, overwriteImplicit);
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.getScriptNonce_ = function(opt_window) {
  var doc = (opt_window || goog.global).document;
  var script = doc.querySelector && doc.querySelector("script[nonce]");
  if (script) {
    var nonce = script["nonce"] || script.getAttribute("nonce");
    if (nonce && goog.NONCE_PATTERN_.test(nonce)) {
      return nonce;
    }
  }
  return "";
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(name) {
  if (typeof name !== "string" || !name || name.search(goog.VALID_MODULE_RE_) == -1) {
    throw new Error("Invalid module identifier");
  }
  if (!goog.isInGoogModuleLoader_()) {
    throw new Error("Module " + name + " has been loaded incorrectly. Note, " + "modules cannot be loaded as normal scripts. They require some kind of " + "pre-processing step. You're likely trying to load a module via a " + "script tag or as a part of a concatenated bundle without rewriting the " + "module. For more info see: " + "https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw new Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = name;
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw new Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
  }
};
goog.module.get = function(name) {
  return goog.module.getInternal_(name);
};
goog.module.getInternal_ = function(name) {
  if (!COMPILED) {
    if (name in goog.loadedModules_) {
      return goog.loadedModules_[name].exports;
    } else if (!goog.implicitNamespaces_[name]) {
      var ns = goog.getObjectByName(name);
      return ns != null ? ns : null;
    }
  }
  return null;
};
goog.ModuleType = {ES6:"es6", GOOG:"goog"};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
};
goog.isInEs6ModuleLoader_ = function() {
  var inLoader = !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6;
  if (inLoader) {
    return true;
  }
  var jscomp = goog.global["$jscomp"];
  if (jscomp) {
    if (typeof jscomp.getCurrentModulePath != "function") {
      return false;
    }
    return !!jscomp.getCurrentModulePath();
  }
  return false;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInGoogModuleLoader_()) {
    throw new Error("goog.module.declareLegacyNamespace must be called from " + "within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw new Error("goog.module must be called prior to " + "goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = true;
};
goog.declareModuleId = function(namespace) {
  if (!COMPILED) {
    if (!goog.isInEs6ModuleLoader_()) {
      throw new Error("goog.declareModuleId may only be called from " + "within an ES6 module");
    }
    if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName) {
      throw new Error("goog.declareModuleId may only be called once per module.");
    }
    if (namespace in goog.loadedModules_) {
      throw new Error('Module with namespace "' + namespace + '" already exists.');
    }
  }
  if (goog.moduleLoaderState_) {
    goog.moduleLoaderState_.moduleName = namespace;
  } else {
    var jscomp = goog.global["$jscomp"];
    if (!jscomp || typeof jscomp.getCurrentModulePath != "function") {
      throw new Error('Module with namespace "' + namespace + '" has been loaded incorrectly.');
    }
    var exports = jscomp.require(jscomp.getCurrentModulePath());
    goog.loadedModules_[namespace] = {exports:exports, type:goog.ModuleType.ES6, moduleId:namespace};
  }
};
goog.setTestOnly = function(opt_message) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    opt_message = opt_message || "";
    throw new Error("Importing test-only code into non-debug environment" + (opt_message ? ": " + opt_message : "."));
  }
};
goog.forwardDeclare = function(name) {
};
goog.forwardDeclare("Document");
goog.forwardDeclare("HTMLScriptElement");
goog.forwardDeclare("XMLHttpRequest");
if (!COMPILED) {
  goog.isProvided_ = function(name) {
    return name in goog.loadedModules_ || !goog.implicitNamespaces_[name] && goog.getObjectByName(name) != null;
  };
  goog.implicitNamespaces_ = {"goog.module":true};
}
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for (var i = 0; i < parts.length; i++) {
    cur = cur[parts[i]];
    if (cur == null) {
      return null;
    }
  }
  return cur;
};
goog.addDependency = function(relPath, provides, requires, opt_loadFlags) {
  if (!COMPILED && goog.DEPENDENCIES_ENABLED) {
    goog.debugLoader_.addDependency(relPath, provides, requires, opt_loadFlags);
  }
};
goog.ENABLE_DEBUG_LOADER = goog.define("goog.ENABLE_DEBUG_LOADER", true);
goog.logToConsole_ = function(msg) {
  if (goog.global.console) {
    goog.global.console["error"](msg);
  }
};
goog.require = function(namespace) {
  if (!COMPILED) {
    if (goog.ENABLE_DEBUG_LOADER) {
      goog.debugLoader_.requested(namespace);
    }
    if (goog.isProvided_(namespace)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(namespace);
      }
    } else if (goog.ENABLE_DEBUG_LOADER) {
      var moduleLoaderState = goog.moduleLoaderState_;
      goog.moduleLoaderState_ = null;
      try {
        goog.debugLoader_.load_(namespace);
      } finally {
        goog.moduleLoaderState_ = moduleLoaderState;
      }
    }
    return null;
  }
};
goog.requireType = function(namespace) {
  return {};
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.abstractMethod = function() {
  throw new Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.instance_ = undefined;
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    if (goog.DEBUG) {
      goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
    }
    return ctor.instance_ = new ctor();
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = goog.define("goog.LOAD_MODULE_USING_EVAL", true);
goog.SEAL_MODULE_EXPORTS = goog.define("goog.SEAL_MODULE_EXPORTS", goog.DEBUG);
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = goog.define("goog.TRANSPILE", "detect");
goog.ASSUME_ES_MODULES_TRANSPILED = goog.define("goog.ASSUME_ES_MODULES_TRANSPILED", false);
goog.TRUSTED_TYPES_POLICY_NAME = goog.define("goog.TRUSTED_TYPES_POLICY_NAME", "goog");
goog.hasBadLetScoping = null;
goog.loadModule = function(moduleDef) {
  var previousState = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:"", declareLegacyNamespace:false, type:goog.ModuleType.GOOG};
    var origExports = {};
    var exports = origExports;
    if (typeof moduleDef === "function") {
      exports = moduleDef.call(undefined, exports);
    } else if (typeof moduleDef === "string") {
      exports = goog.loadModuleFromSource_.call(undefined, exports, moduleDef);
    } else {
      throw new Error("Invalid module definition");
    }
    var moduleName = goog.moduleLoaderState_.moduleName;
    if (typeof moduleName === "string" && moduleName) {
      if (goog.moduleLoaderState_.declareLegacyNamespace) {
        var isDefaultExport = origExports !== exports;
        goog.constructNamespace_(moduleName, exports, isDefaultExport);
      } else if (goog.SEAL_MODULE_EXPORTS && Object.seal && typeof exports == "object" && exports != null) {
        Object.seal(exports);
      }
      var data = {exports:exports, type:goog.ModuleType.GOOG, moduleId:goog.moduleLoaderState_.moduleName};
      goog.loadedModules_[moduleName] = data;
    } else {
      throw new Error('Invalid module name "' + moduleName + '"');
    }
  } finally {
    goog.moduleLoaderState_ = previousState;
  }
};
goog.loadModuleFromSource_ = function(exports) {
  eval(goog.CLOSURE_EVAL_PREFILTER_.createScript(arguments[1]));
  return exports;
};
goog.normalizePath_ = function(path) {
  var components = path.split("/");
  var i = 0;
  while (i < components.length) {
    if (components[i] == ".") {
      components.splice(i, 1);
    } else if (i && components[i] == ".." && components[i - 1] && components[i - 1] != "..") {
      components.splice(--i, 2);
    } else {
      i++;
    }
  }
  return components.join("/");
};
goog.global.CLOSURE_LOAD_FILE_SYNC;
goog.loadFileSync_ = function(src) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
  } else {
    try {
      var xhr = new goog.global["XMLHttpRequest"]();
      xhr.open("get", src, false);
      xhr.send();
      return xhr.status == 0 || xhr.status == 200 ? xhr.responseText : null;
    } catch (err) {
      return null;
    }
  }
};
goog.typeOf = function(value) {
  var s = typeof value;
  if (s != "object") {
    return s;
  }
  if (!value) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  return s;
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number";
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function";
};
goog.isObject = function(val) {
  var type = typeof val;
  return type == "object" && val != null || type == "function";
};
goog.getUid = function(obj) {
  return Object.prototype.hasOwnProperty.call(obj, goog.UID_PROPERTY_) && obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(obj) {
  return !!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function(obj) {
  if (obj !== null && "removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_);
  }
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (Math.random() * 1e9 >>> 0);
goog.uidCounter_ = 0;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if (type == "object" || type == "array") {
    if (typeof obj.clone === "function") {
      return obj.clone();
    }
    if (typeof Map !== "undefined" && obj instanceof Map) {
      return new Map(obj);
    } else if (typeof Set !== "undefined" && obj instanceof Set) {
      return new Set(obj);
    }
    var clone = type == "array" ? [] : {};
    for (var key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments);
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw new Error();
  }
  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  } else {
    return function() {
      return fn.apply(selfObj, arguments);
    };
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if (Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_;
  } else {
    goog.bind = goog.bindJs_;
  }
  return goog.bind.apply(null, arguments);
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.now = function() {
  return Date.now();
};
goog.globalEval = function(script) {
  (0,eval)(script);
};
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.global.CLOSURE_CSS_NAME_MAP_FN;
goog.getCssName = function(className, opt_modifier) {
  if (String(className).charAt(0) == ".") {
    throw new Error('className passed in goog.getCssName must not start with ".".' + " You passed: " + className);
  }
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for (var i = 0; i < parts.length; i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  };
  var rename;
  if (goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts;
  } else {
    rename = function(a) {
      return a;
    };
  }
  var result = opt_modifier ? className + "-" + rename(opt_modifier) : rename(className);
  if (goog.global.CLOSURE_CSS_NAME_MAP_FN) {
    return goog.global.CLOSURE_CSS_NAME_MAP_FN(result);
  }
  return result;
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
}
goog.GetMsgOptions = function() {
};
goog.GetMsgOptions.prototype.html;
goog.GetMsgOptions.prototype.unescapeHtmlEntities;
goog.GetMsgOptions.prototype.original_code;
goog.GetMsgOptions.prototype.example;
goog.getMsg = function(str, opt_values, opt_options) {
  if (opt_options && opt_options.html) {
    str = str.replace(/</g, "\x26lt;");
  }
  if (opt_options && opt_options.unescapeHtmlEntities) {
    str = str.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "\x26");
  }
  if (opt_values) {
    str = str.replace(/\{\$([^}]+)}/g, function(match, key) {
      return opt_values != null && key in opt_values ? opt_values[key] : match;
    });
  }
  return str;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(publicPath, object, objectToExportTo) {
  goog.exportPath_(publicPath, object, true, objectToExportTo);
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function(me, methodName, var_args) {
    var args = new Array(arguments.length - 2);
    for (var i = 2; i < arguments.length; i++) {
      args[i - 2] = arguments[i];
    }
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.scope = function(fn) {
  if (goog.isInModuleLoader_()) {
    throw new Error("goog.scope is not supported within a module.");
  }
  fn.call(goog.global);
};
if (!COMPILED) {
  goog.global["COMPILED"] = COMPILED;
}
goog.defineClass = function(superClass, def) {
  var constructor = def.constructor;
  var statics = def.statics;
  if (!constructor || constructor == Object.prototype.constructor) {
    constructor = function() {
      throw new Error("cannot instantiate an interface (no constructor defined).");
    };
  }
  var cls = goog.defineClass.createSealingConstructor_(constructor, superClass);
  if (superClass) {
    goog.inherits(cls, superClass);
  }
  delete def.constructor;
  delete def.statics;
  goog.defineClass.applyProperties_(cls.prototype, def);
  if (statics != null) {
    if (statics instanceof Function) {
      statics(cls);
    } else {
      goog.defineClass.applyProperties_(cls, statics);
    }
  }
  return cls;
};
goog.defineClass.ClassDescriptor;
goog.defineClass.SEAL_CLASS_INSTANCES = goog.define("goog.defineClass.SEAL_CLASS_INSTANCES", goog.DEBUG);
goog.defineClass.createSealingConstructor_ = function(ctr, superClass) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
    return ctr;
  }
  var wrappedCtr = function() {
    var instance = ctr.apply(this, arguments) || this;
    instance[goog.UID_PROPERTY_] = instance[goog.UID_PROPERTY_];
    return instance;
  };
  return wrappedCtr;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.defineClass.applyProperties_ = function(target, source) {
  var key;
  for (key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  for (var i = 0; i < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; i++) {
    key = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[i];
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
};
goog.identity_ = function(s) {
  return s;
};
goog.createTrustedTypesPolicy = function(name) {
  var policy = null;
  var policyFactory = goog.global.trustedTypes;
  if (!policyFactory || !policyFactory.createPolicy) {
    return policy;
  }
  try {
    policy = policyFactory.createPolicy(name, {createHTML:goog.identity_, createScript:goog.identity_, createScriptURL:goog.identity_});
  } catch (e) {
    goog.logToConsole_(e.message);
  }
  return policy;
};
if (!COMPILED && goog.DEPENDENCIES_ENABLED) {
  goog.isEdge_ = function() {
    var userAgent = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
    var edgeRe = /Edge\/(\d+)(\.\d)*/i;
    return !!userAgent.match(edgeRe);
  };
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return doc != null && "write" in doc;
  };
  goog.isDocumentLoading_ = function() {
    var doc = goog.global.document;
    return doc.attachEvent ? doc.readyState != "complete" : doc.readyState == "loading";
  };
  goog.findBasePath_ = function() {
    if (goog.global.CLOSURE_BASE_PATH != undefined && typeof goog.global.CLOSURE_BASE_PATH === "string") {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return;
    } else if (!goog.inHtmlDocument_()) {
      return;
    }
    var doc = goog.global.document;
    var currentScript = doc.currentScript;
    if (currentScript) {
      var scripts = [currentScript];
    } else {
      var scripts = doc.getElementsByTagName("SCRIPT");
    }
    for (var i = scripts.length - 1; i >= 0; --i) {
      var script = scripts[i];
      var src = script.src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if (src.slice(l - 7, l) == "base.js") {
        goog.basePath = src.slice(0, l - 7);
        return;
      }
    }
  };
  goog.findBasePath_();
  goog.protectScriptTag_ = function(str) {
    return str.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
  };
  goog.DebugLoader_ = function() {
    this.dependencies_ = {};
    this.idToPath_ = {};
    this.written_ = {};
    this.loadingDeps_ = [];
    this.depsToLoad_ = [];
    this.paused_ = false;
    this.factory_ = new goog.DependencyFactory();
    this.deferredCallbacks_ = {};
    this.deferredQueue_ = [];
  };
  goog.DebugLoader_.prototype.bootstrap = function(namespaces, callback) {
    var cb = callback;
    function resolve() {
      if (cb) {
        goog.global.setTimeout(cb, 0);
        cb = null;
      }
    }
    if (!namespaces.length) {
      resolve();
      return;
    }
    var deps = [];
    for (var i = 0; i < namespaces.length; i++) {
      var path = this.getPathFromDeps_(namespaces[i]);
      if (!path) {
        throw new Error("Unregonized namespace: " + namespaces[i]);
      }
      deps.push(this.dependencies_[path]);
    }
    var require = goog.require;
    var loaded = 0;
    for (var i = 0; i < namespaces.length; i++) {
      require(namespaces[i]);
      deps[i].onLoad(function() {
        if (++loaded == namespaces.length) {
          resolve();
        }
      });
    }
  };
  goog.DebugLoader_.prototype.loadClosureDeps = function() {
    var relPath = "deps.js";
    this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + relPath), relPath, [], [], {}));
    this.loadDeps_();
  };
  goog.DebugLoader_.prototype.requested = function(absPathOrId, opt_force) {
    var path = this.getPathFromDeps_(absPathOrId);
    if (path && (opt_force || this.areDepsLoaded_(this.dependencies_[path].requires))) {
      var callback = this.deferredCallbacks_[path];
      if (callback) {
        delete this.deferredCallbacks_[path];
        callback();
      }
    }
  };
  goog.DebugLoader_.prototype.setDependencyFactory = function(factory) {
    this.factory_ = factory;
  };
  goog.DebugLoader_.prototype.load_ = function(namespace) {
    if (!this.getPathFromDeps_(namespace)) {
      var errorMessage = "goog.require could not find: " + namespace;
      goog.logToConsole_(errorMessage);
    } else {
      var loader = this;
      var deps = [];
      var visit = function(namespace) {
        var path = loader.getPathFromDeps_(namespace);
        if (!path) {
          throw new Error("Bad dependency path or symbol: " + namespace);
        }
        if (loader.written_[path]) {
          return;
        }
        loader.written_[path] = true;
        var dep = loader.dependencies_[path];
        for (var i = 0; i < dep.requires.length; i++) {
          if (!goog.isProvided_(dep.requires[i])) {
            visit(dep.requires[i]);
          }
        }
        deps.push(dep);
      };
      visit(namespace);
      var wasLoading = !!this.depsToLoad_.length;
      this.depsToLoad_ = this.depsToLoad_.concat(deps);
      if (!this.paused_ && !wasLoading) {
        this.loadDeps_();
      }
    }
  };
  goog.DebugLoader_.prototype.loadDeps_ = function() {
    var loader = this;
    var paused = this.paused_;
    while (this.depsToLoad_.length && !paused) {
      (function() {
        var loadCallDone = false;
        var dep = loader.depsToLoad_.shift();
        var loaded = false;
        loader.loading_(dep);
        var controller = {pause:function() {
          if (loadCallDone) {
            throw new Error("Cannot call pause after the call to load.");
          } else {
            paused = true;
          }
        }, resume:function() {
          if (loadCallDone) {
            loader.resume_();
          } else {
            paused = false;
          }
        }, loaded:function() {
          if (loaded) {
            throw new Error("Double call to loaded.");
          }
          loaded = true;
          loader.loaded_(dep);
        }, pending:function() {
          var pending = [];
          for (var i = 0; i < loader.loadingDeps_.length; i++) {
            pending.push(loader.loadingDeps_[i]);
          }
          return pending;
        }, setModuleState:function(type) {
          goog.moduleLoaderState_ = {type:type, moduleName:"", declareLegacyNamespace:false};
        }, registerEs6ModuleExports:function(path, exports, opt_closureNamespace) {
          if (opt_closureNamespace) {
            goog.loadedModules_[opt_closureNamespace] = {exports:exports, type:goog.ModuleType.ES6, moduleId:opt_closureNamespace || ""};
          }
        }, registerGoogModuleExports:function(moduleId, exports) {
          goog.loadedModules_[moduleId] = {exports:exports, type:goog.ModuleType.GOOG, moduleId:moduleId};
        }, clearModuleState:function() {
          goog.moduleLoaderState_ = null;
        }, defer:function(callback) {
          if (loadCallDone) {
            throw new Error("Cannot register with defer after the call to load.");
          }
          loader.defer_(dep, callback);
        }, areDepsLoaded:function() {
          return loader.areDepsLoaded_(dep.requires);
        }};
        try {
          dep.load(controller);
        } finally {
          loadCallDone = true;
        }
      })();
    }
    if (paused) {
      this.pause_();
    }
  };
  goog.DebugLoader_.prototype.pause_ = function() {
    this.paused_ = true;
  };
  goog.DebugLoader_.prototype.resume_ = function() {
    if (this.paused_) {
      this.paused_ = false;
      this.loadDeps_();
    }
  };
  goog.DebugLoader_.prototype.loading_ = function(dep) {
    this.loadingDeps_.push(dep);
  };
  goog.DebugLoader_.prototype.loaded_ = function(dep) {
    for (var i = 0; i < this.loadingDeps_.length; i++) {
      if (this.loadingDeps_[i] == dep) {
        this.loadingDeps_.splice(i, 1);
        break;
      }
    }
    for (var i = 0; i < this.deferredQueue_.length; i++) {
      if (this.deferredQueue_[i] == dep.path) {
        this.deferredQueue_.splice(i, 1);
        break;
      }
    }
    if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length) {
      while (this.deferredQueue_.length) {
        this.requested(this.deferredQueue_.shift(), true);
      }
    }
    dep.loaded();
  };
  goog.DebugLoader_.prototype.areDepsLoaded_ = function(pathsOrIds) {
    for (var i = 0; i < pathsOrIds.length; i++) {
      var path = this.getPathFromDeps_(pathsOrIds[i]);
      if (!path || !(path in this.deferredCallbacks_) && !goog.isProvided_(pathsOrIds[i])) {
        return false;
      }
    }
    return true;
  };
  goog.DebugLoader_.prototype.getPathFromDeps_ = function(absPathOrId) {
    if (absPathOrId in this.idToPath_) {
      return this.idToPath_[absPathOrId];
    } else if (absPathOrId in this.dependencies_) {
      return absPathOrId;
    } else {
      return null;
    }
  };
  goog.DebugLoader_.prototype.defer_ = function(dependency, callback) {
    this.deferredCallbacks_[dependency.path] = callback;
    this.deferredQueue_.push(dependency.path);
  };
  goog.LoadController = function() {
  };
  goog.LoadController.prototype.pause = function() {
  };
  goog.LoadController.prototype.resume = function() {
  };
  goog.LoadController.prototype.loaded = function() {
  };
  goog.LoadController.prototype.pending = function() {
  };
  goog.LoadController.prototype.registerEs6ModuleExports = function(path, exports, opt_closureNamespace) {
  };
  goog.LoadController.prototype.setModuleState = function(type) {
  };
  goog.LoadController.prototype.clearModuleState = function() {
  };
  goog.LoadController.prototype.defer = function(callback) {
  };
  goog.LoadController.prototype.areDepsLoaded = function() {
  };
  goog.Dependency = function(path, relativePath, provides, requires, loadFlags) {
    this.path = path;
    this.relativePath = relativePath;
    this.provides = provides;
    this.requires = requires;
    this.loadFlags = loadFlags;
    this.loaded_ = false;
    this.loadCallbacks_ = [];
  };
  goog.Dependency.prototype.getPathName = function() {
    var pathName = this.path;
    var protocolIndex = pathName.indexOf("://");
    if (protocolIndex >= 0) {
      pathName = pathName.substring(protocolIndex + 3);
      var slashIndex = pathName.indexOf("/");
      if (slashIndex >= 0) {
        pathName = pathName.substring(slashIndex + 1);
      }
    }
    return pathName;
  };
  goog.Dependency.prototype.onLoad = function(callback) {
    if (this.loaded_) {
      callback();
    } else {
      this.loadCallbacks_.push(callback);
    }
  };
  goog.Dependency.prototype.loaded = function() {
    this.loaded_ = true;
    var callbacks = this.loadCallbacks_;
    this.loadCallbacks_ = [];
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
  };
  goog.Dependency.defer_ = false;
  goog.Dependency.callbackMap_ = {};
  goog.Dependency.registerCallback_ = function(callback) {
    var key = Math.random().toString(32);
    goog.Dependency.callbackMap_[key] = callback;
    return key;
  };
  goog.Dependency.unregisterCallback_ = function(key) {
    delete goog.Dependency.callbackMap_[key];
  };
  goog.Dependency.callback_ = function(key, var_args) {
    if (key in goog.Dependency.callbackMap_) {
      var callback = goog.Dependency.callbackMap_[key];
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      callback.apply(undefined, args);
    } else {
      var errorMessage = "Callback key " + key + " does not exist (was base.js loaded more than once?).";
      throw Error(errorMessage);
    }
  };
  goog.Dependency.prototype.load = function(controller) {
    if (goog.global.CLOSURE_IMPORT_SCRIPT) {
      if (goog.global.CLOSURE_IMPORT_SCRIPT(this.path)) {
        controller.loaded();
      } else {
        controller.pause();
      }
      return;
    }
    if (!goog.inHtmlDocument_()) {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents.");
      if (this.relativePath == "deps.js") {
        goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, " + "or setting CLOSURE_NO_DEPS to true.");
        controller.loaded();
      } else {
        controller.pause();
      }
      return;
    }
    var doc = goog.global.document;
    if (doc.readyState == "complete" && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
      var isDeps = /\bdeps.js$/.test(this.path);
      if (isDeps) {
        controller.loaded();
        return;
      } else {
        throw Error('Cannot write "' + this.path + '" after document load');
      }
    }
    var nonce = goog.getScriptNonce_();
    if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
      var key;
      var callback = function(script) {
        if (script.readyState && script.readyState != "complete") {
          script.onload = callback;
          return;
        }
        goog.Dependency.unregisterCallback_(key);
        controller.loaded();
      };
      key = goog.Dependency.registerCallback_(callback);
      var defer = goog.Dependency.defer_ ? " defer" : "";
      var nonceAttr = nonce ? ' nonce\x3d"' + nonce + '"' : "";
      var script = '\x3cscript src\x3d"' + this.path + '"' + nonceAttr + defer + ' id\x3d"script-' + key + '"\x3e\x3c/script\x3e';
      script += "\x3cscript" + nonceAttr + "\x3e";
      if (goog.Dependency.defer_) {
        script += "document.getElementById('script-" + key + "').onload \x3d function() {\n" + "  goog.Dependency.callback_('" + key + "', this);\n" + "};\n";
      } else {
        script += "goog.Dependency.callback_('" + key + "', document.getElementById('script-" + key + "'));";
      }
      script += "\x3c/script\x3e";
      doc.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(script) : script);
    } else {
      var scriptEl = doc.createElement("script");
      scriptEl.defer = goog.Dependency.defer_;
      scriptEl.async = false;
      if (nonce) {
        scriptEl.nonce = nonce;
      }
      scriptEl.onload = function() {
        scriptEl.onload = null;
        controller.loaded();
      };
      scriptEl.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path) : this.path;
      doc.head.appendChild(scriptEl);
    }
  };
  goog.Es6ModuleDependency = function(path, relativePath, provides, requires, loadFlags) {
    goog.Es6ModuleDependency.base(this, "constructor", path, relativePath, provides, requires, loadFlags);
  };
  goog.inherits(goog.Es6ModuleDependency, goog.Dependency);
  goog.Es6ModuleDependency.prototype.load = function(controller) {
    if (goog.global.CLOSURE_IMPORT_SCRIPT) {
      if (goog.global.CLOSURE_IMPORT_SCRIPT(this.path)) {
        controller.loaded();
      } else {
        controller.pause();
      }
      return;
    }
    if (!goog.inHtmlDocument_()) {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents.");
      controller.pause();
      return;
    }
    var doc = goog.global.document;
    var dep = this;
    function write(src, contents) {
      var nonceAttr = "";
      var nonce = goog.getScriptNonce_();
      if (nonce) {
        nonceAttr = ' nonce\x3d"' + nonce + '"';
      }
      if (contents) {
        var script = '\x3cscript type\x3d"module" crossorigin' + nonceAttr + "\x3e" + contents + "\x3c/" + "script\x3e";
        doc.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(script) : script);
      } else {
        var script = '\x3cscript type\x3d"module" crossorigin src\x3d"' + src + '"' + nonceAttr + "\x3e\x3c/" + "script\x3e";
        doc.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(script) : script);
      }
    }
    function append(src, contents) {
      var scriptEl = doc.createElement("script");
      scriptEl.defer = true;
      scriptEl.async = false;
      scriptEl.type = "module";
      scriptEl.setAttribute("crossorigin", true);
      var nonce = goog.getScriptNonce_();
      if (nonce) {
        scriptEl.nonce = nonce;
      }
      if (contents) {
        scriptEl.text = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScript(contents) : contents;
      } else {
        scriptEl.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(src) : src;
      }
      doc.head.appendChild(scriptEl);
    }
    var create;
    if (goog.isDocumentLoading_()) {
      create = write;
      goog.Dependency.defer_ = true;
    } else {
      create = append;
    }
    var beforeKey = goog.Dependency.registerCallback_(function() {
      goog.Dependency.unregisterCallback_(beforeKey);
      controller.setModuleState(goog.ModuleType.ES6);
    });
    create(undefined, 'goog.Dependency.callback_("' + beforeKey + '")');
    create(this.path, undefined);
    var registerKey = goog.Dependency.registerCallback_(function(exports) {
      goog.Dependency.unregisterCallback_(registerKey);
      controller.registerEs6ModuleExports(dep.path, exports, goog.moduleLoaderState_.moduleName);
    });
    create(undefined, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + registerKey + '", m)');
    var afterKey = goog.Dependency.registerCallback_(function() {
      goog.Dependency.unregisterCallback_(afterKey);
      controller.clearModuleState();
      controller.loaded();
    });
    create(undefined, 'goog.Dependency.callback_("' + afterKey + '")');
  };
  goog.TransformedDependency = function(path, relativePath, provides, requires, loadFlags) {
    goog.TransformedDependency.base(this, "constructor", path, relativePath, provides, requires, loadFlags);
    this.contents_ = null;
    this.lazyFetch_ = !goog.inHtmlDocument_() || !("noModule" in goog.global.document.createElement("script"));
  };
  goog.inherits(goog.TransformedDependency, goog.Dependency);
  goog.TransformedDependency.prototype.load = function(controller) {
    var dep = this;
    function fetch() {
      dep.contents_ = goog.loadFileSync_(dep.path);
      if (dep.contents_) {
        dep.contents_ = dep.transform(dep.contents_);
        if (dep.contents_) {
          dep.contents_ += "\n//# sourceURL\x3d" + dep.path;
        }
      }
    }
    if (goog.global.CLOSURE_IMPORT_SCRIPT) {
      fetch();
      if (this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_)) {
        this.contents_ = null;
        controller.loaded();
      } else {
        controller.pause();
      }
      return;
    }
    var isEs6 = this.loadFlags["module"] == goog.ModuleType.ES6;
    if (!this.lazyFetch_) {
      fetch();
    }
    function load() {
      if (dep.lazyFetch_) {
        fetch();
      }
      if (!dep.contents_) {
        return;
      }
      if (isEs6) {
        controller.setModuleState(goog.ModuleType.ES6);
      }
      var namespace;
      try {
        var contents = dep.contents_;
        dep.contents_ = null;
        goog.globalEval(goog.CLOSURE_EVAL_PREFILTER_.createScript(contents));
        if (isEs6) {
          namespace = goog.moduleLoaderState_.moduleName;
        }
      } finally {
        if (isEs6) {
          controller.clearModuleState();
        }
      }
      if (isEs6) {
        goog.global["$jscomp"]["require"]["ensure"]([dep.getPathName()], function() {
          controller.registerEs6ModuleExports(dep.path, goog.global["$jscomp"]["require"](dep.getPathName()), namespace);
        });
      }
      controller.loaded();
    }
    function fetchInOwnScriptThenLoad() {
      var doc = goog.global.document;
      var key = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_(key);
        load();
      });
      var nonce = goog.getScriptNonce_();
      var nonceAttr = nonce ? ' nonce\x3d"' + nonce + '"' : "";
      var script = "\x3cscript" + nonceAttr + "\x3e" + goog.protectScriptTag_('goog.Dependency.callback_("' + key + '");') + "\x3c/" + "script\x3e";
      doc.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(script) : script);
    }
    var anythingElsePending = controller.pending().length > 1;
    var needsAsyncLoading = goog.Dependency.defer_ && (anythingElsePending || goog.isDocumentLoading_());
    if (needsAsyncLoading) {
      controller.defer(function() {
        load();
      });
      return;
    }
    var doc = goog.global.document;
    var isInternetExplorerOrEdge = goog.inHtmlDocument_() && ("ActiveXObject" in goog.global || goog.isEdge_());
    if (isEs6 && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !isInternetExplorerOrEdge) {
      goog.Dependency.defer_ = true;
      controller.pause();
      var oldCallback = doc.onreadystatechange;
      doc.onreadystatechange = function() {
        if (doc.readyState == "interactive") {
          doc.onreadystatechange = oldCallback;
          load();
          controller.resume();
        }
        if (typeof oldCallback === "function") {
          oldCallback.apply(undefined, arguments);
        }
      };
    } else {
      if (!goog.inHtmlDocument_() || !goog.isDocumentLoading_()) {
        load();
      } else {
        fetchInOwnScriptThenLoad();
      }
    }
  };
  goog.TransformedDependency.prototype.transform = function(contents) {
  };
  goog.PreTranspiledEs6ModuleDependency = function(path, relativePath, provides, requires, loadFlags) {
    goog.PreTranspiledEs6ModuleDependency.base(this, "constructor", path, relativePath, provides, requires, loadFlags);
  };
  goog.inherits(goog.PreTranspiledEs6ModuleDependency, goog.TransformedDependency);
  goog.PreTranspiledEs6ModuleDependency.prototype.transform = function(contents) {
    return contents;
  };
  goog.GoogModuleDependency = function(path, relativePath, provides, requires, loadFlags) {
    goog.GoogModuleDependency.base(this, "constructor", path, relativePath, provides, requires, loadFlags);
  };
  goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency);
  goog.GoogModuleDependency.prototype.transform = function(contents) {
    if (!goog.LOAD_MODULE_USING_EVAL || goog.global.JSON === undefined) {
      return "" + "goog.loadModule(function(exports) {" + '"use strict";' + contents + "\n" + ";return exports" + "});" + "\n//# sourceURL\x3d" + this.path + "\n";
    } else {
      return "" + "goog.loadModule(" + goog.global.JSON.stringify(contents + "\n//# sourceURL\x3d" + this.path + "\n") + ");";
    }
  };
  goog.DebugLoader_.prototype.addDependency = function(relPath, provides, requires, opt_loadFlags) {
    provides = provides || [];
    relPath = relPath.replace(/\\/g, "/");
    var path = goog.normalizePath_(goog.basePath + relPath);
    if (!opt_loadFlags || typeof opt_loadFlags === "boolean") {
      opt_loadFlags = opt_loadFlags ? {"module":goog.ModuleType.GOOG} : {};
    }
    var dep = this.factory_.createDependency(path, relPath, provides, requires, opt_loadFlags);
    this.dependencies_[path] = dep;
    for (var i = 0; i < provides.length; i++) {
      this.idToPath_[provides[i]] = path;
    }
    this.idToPath_[relPath] = path;
  };
  goog.DependencyFactory = function() {
  };
  goog.DependencyFactory.prototype.createDependency = function(path, relativePath, provides, requires, loadFlags) {
    if (loadFlags["module"] == goog.ModuleType.GOOG) {
      return new goog.GoogModuleDependency(path, relativePath, provides, requires, loadFlags);
    } else {
      if (loadFlags["module"] == goog.ModuleType.ES6) {
        if (goog.ASSUME_ES_MODULES_TRANSPILED) {
          return new goog.PreTranspiledEs6ModuleDependency(path, relativePath, provides, requires, loadFlags);
        } else {
          return new goog.Es6ModuleDependency(path, relativePath, provides, requires, loadFlags);
        }
      } else {
        return new goog.Dependency(path, relativePath, provides, requires, loadFlags);
      }
    }
  };
  goog.debugLoader_ = new goog.DebugLoader_();
  goog.loadClosureDeps = function() {
    goog.debugLoader_.loadClosureDeps();
  };
  goog.setDependencyFactory = function(factory) {
    goog.debugLoader_.setDependencyFactory(factory);
  };
  goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null;
  if (!goog.global.CLOSURE_NO_DEPS) {
    goog.debugLoader_.loadClosureDeps();
  }
  goog.bootstrap = function(namespaces, callback) {
    goog.debugLoader_.bootstrap(namespaces, callback);
  };
}
if (!COMPILED) {
  var isChrome87 = false;
  try {
    isChrome87 = eval(goog.global.trustedTypes.emptyScript) !== goog.global.trustedTypes.emptyScript;
  } catch (err) {
  }
  goog.CLOSURE_EVAL_PREFILTER_ = goog.global.trustedTypes && isChrome87 && goog.createTrustedTypesPolicy("goog#base#devonly#eval") || {createScript:goog.identity_};
}

$CLJS.$jscomp = {};
goog.global = CLJS_GLOBAL;var SHADOW_ENV = $CLJS.SHADOW_ENV = (function() {
    var env = {};

    var loadedFiles = {};

    env.setLoaded = function(name) {
        loadedFiles[name] = true;
    };

    env.load = function(opts, paths) {
        paths.forEach(function(name) {
            env.setLoaded(name);
        });
    };

    env.isLoaded = function(name) {
        // this is only used by live-reload checking if it should reload a file
        // since all files will always be loaded we don't really need to track this?
        return true;
        // return loadedFiles[name] || false;
    }

    return env;
})();

var originalGoogExportPath = goog.exportPath_;

goog.exportPath_ = function(name, object, overwriteImplicit, objectToExportTo) {
  // must keep the export to global for things like (goog/exportSymbol js/React ...)
  originalGoogExportPath(name, object, overwriteImplicit, objectToExportTo);
  // goog.module.declareLegacyNamespace() otherwise only exports to global but we need it on the $CLJS object
  if (goog.isInModuleLoader_()) {
    originalGoogExportPath(name, object, overwriteImplicit, $CLJS);
  }
}

goog.provide = function(name) {
  return originalGoogExportPath(name, undefined, undefined, $CLJS);
};


// in goog.module this needs to have a return value
// the getObjectByName will only find modules that declareLegacyNamespace
// otherwise get the module directly. can't use default goog.require since
// we are never using the debug loader and it never has a return value in that case
goog.require = function(name) {
  return goog.getObjectByName(name, $CLJS) || goog.module.getInternal_(name);
};

module.exports = $CLJS;

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.debug.Error");
  goog.module.declareLegacyNamespace();
  function DebugError(msg = undefined, cause = undefined) {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DebugError);
    } else {
      const stack = (new Error()).stack;
      if (stack) {
        this.stack = stack;
      }
    }
    if (msg) {
      this.message = String(msg);
    }
    if (cause !== undefined) {
      this.cause = cause;
    }
    this.reportErrorToServer = true;
  }
  goog.inherits(DebugError, Error);
  DebugError.prototype.name = "CustomError";
  exports = DebugError;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.debug.error.js");

goog.provide("goog.dom.NodeType");
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.nodetype.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.asserts");
  goog.module.declareLegacyNamespace();
  const DebugError = goog.require("goog.debug.Error");
  const NodeType = goog.require("goog.dom.NodeType");
  exports.ENABLE_ASSERTS = goog.define("goog.asserts.ENABLE_ASSERTS", goog.DEBUG);
  function AssertionError(messagePattern, messageArgs) {
    DebugError.call(this, subs(messagePattern, messageArgs));
    this.messagePattern = messagePattern;
  }
  goog.inherits(AssertionError, DebugError);
  exports.AssertionError = AssertionError;
  AssertionError.prototype.name = "AssertionError";
  exports.DEFAULT_ERROR_HANDLER = function(e) {
    throw e;
  };
  let errorHandler_ = exports.DEFAULT_ERROR_HANDLER;
  function subs(pattern, subs) {
    const splitParts = pattern.split("%s");
    let returnString = "";
    const subLast = splitParts.length - 1;
    for (let i = 0; i < subLast; i++) {
      const sub = i < subs.length ? subs[i] : "%s";
      returnString += splitParts[i] + sub;
    }
    return returnString + splitParts[subLast];
  }
  function doAssertFailure(defaultMessage, defaultArgs, givenMessage, givenArgs) {
    let message = "Assertion failed";
    let args;
    if (givenMessage) {
      message += ": " + givenMessage;
      args = givenArgs;
    } else if (defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs;
    }
    const e = new AssertionError("" + message, args || []);
    errorHandler_(e);
  }
  exports.setErrorHandler = function(errorHandler) {
    if (exports.ENABLE_ASSERTS) {
      errorHandler_ = errorHandler;
    }
  };
  exports.assert = function(condition, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && !condition) {
      doAssertFailure("", null, opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return condition;
  };
  exports.assertExists = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && value == null) {
      doAssertFailure("Expected to exist: %s.", [value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.fail = function(opt_message, var_args) {
    if (exports.ENABLE_ASSERTS) {
      errorHandler_(new AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1)));
    }
  };
  exports.assertNumber = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && typeof value !== "number") {
      doAssertFailure("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.assertString = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && typeof value !== "string") {
      doAssertFailure("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.assertFunction = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && typeof value !== "function") {
      doAssertFailure("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.assertObject = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && !goog.isObject(value)) {
      doAssertFailure("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.assertArray = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && !Array.isArray(value)) {
      doAssertFailure("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.assertBoolean = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && typeof value !== "boolean") {
      doAssertFailure("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.assertElement = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && (!goog.isObject(value) || value.nodeType != NodeType.ELEMENT)) {
      doAssertFailure("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  exports.assertInstanceof = function(value, type, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && !(value instanceof type)) {
      doAssertFailure("Expected instanceof %s but got %s.", [getType(type), getType(value)], opt_message, Array.prototype.slice.call(arguments, 3));
    }
    return value;
  };
  exports.assertFinite = function(value, opt_message, var_args) {
    if (exports.ENABLE_ASSERTS && (typeof value != "number" || !isFinite(value))) {
      doAssertFailure("Expected %s to be a finite number but it is not.", [value], opt_message, Array.prototype.slice.call(arguments, 2));
    }
    return value;
  };
  function getType(value) {
    if (value instanceof Function) {
      return value.displayName || value.name || "unknown type name";
    } else if (value instanceof Object) {
      return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
    } else {
      return value === null ? "null" : typeof value;
    }
  }
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.asserts.asserts.js");

goog.provide("goog.reflect");
goog.reflect.object = function(type, object) {
  return object;
};
goog.reflect.objectProperty = function(prop, object) {
  return prop;
};
goog.reflect.sinkValue = function(x) {
  goog.reflect.sinkValue[" "](x);
  return x;
};
goog.reflect.sinkValue[" "] = function() {
};
goog.reflect.canAccessProperty = function(obj, prop) {
  try {
    goog.reflect.sinkValue(obj[prop]);
    return true;
  } catch (e) {
  }
  return false;
};
goog.reflect.cache = function(cacheObj, key, valueFn, opt_keyFn) {
  const storedKey = opt_keyFn ? opt_keyFn(key) : key;
  if (Object.prototype.hasOwnProperty.call(cacheObj, storedKey)) {
    return cacheObj[storedKey];
  }
  return cacheObj[storedKey] = valueFn(key);
};

$CLJS.SHADOW_ENV.setLoaded("goog.reflect.reflect.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.math.Long");
  goog.module.declareLegacyNamespace();
  const asserts = goog.require("goog.asserts");
  const reflect = goog.require("goog.reflect");
  class Long {
    constructor(low, high) {
      this.low_ = low | 0;
      this.high_ = high | 0;
    }
    toInt() {
      return this.low_;
    }
    toNumber() {
      return this.high_ * TWO_PWR_32_DBL_ + this.getLowBitsUnsigned();
    }
    isSafeInteger() {
      var top11Bits = this.high_ >> 21;
      return top11Bits == 0 || top11Bits == -1 && !(this.low_ == 0 && this.high_ == (4292870144 | 0));
    }
    toString(opt_radix) {
      var radix = opt_radix || 10;
      if (radix < 2 || 36 < radix) {
        throw new Error("radix out of range: " + radix);
      }
      if (this.isSafeInteger()) {
        var asNumber = this.toNumber();
        return radix == 10 ? "" + asNumber : asNumber.toString(radix);
      }
      var safeDigits = 14 - (radix >> 2);
      var radixPowSafeDigits = Math.pow(radix, safeDigits);
      var radixToPower = Long.fromBits(radixPowSafeDigits, radixPowSafeDigits / TWO_PWR_32_DBL_);
      var remDiv = this.div(radixToPower);
      var val = Math.abs(this.subtract(remDiv.multiply(radixToPower)).toNumber());
      var digits = radix == 10 ? "" + val : val.toString(radix);
      if (digits.length < safeDigits) {
        digits = "0000000000000".slice(digits.length - safeDigits) + digits;
      }
      val = remDiv.toNumber();
      return (radix == 10 ? val : val.toString(radix)) + digits;
    }
    toUnsignedString(opt_radix) {
      if (this.high_ >= 0) {
        return this.toString(opt_radix);
      }
      var radix = opt_radix || 10;
      if (radix < 2 || 36 < radix) {
        throw new Error("radix out of range: " + radix);
      }
      var longRadix = Long.fromInt(radix);
      var quotient = this.shiftRightUnsigned(1).div(longRadix).shiftLeft(1);
      var remainder = this.subtract(quotient.multiply(longRadix));
      if (remainder.greaterThanOrEqual(longRadix)) {
        quotient = quotient.add(Long.getOne());
        remainder = this.subtract(quotient.multiply(longRadix));
      }
      return quotient.toString(radix) + remainder.toString(radix);
    }
    getHighBits() {
      return this.high_;
    }
    getLowBits() {
      return this.low_;
    }
    getLowBitsUnsigned() {
      return this.low_ >>> 0;
    }
    getNumBitsAbs() {
      if (this.isNegative()) {
        if (this.equals(Long.getMinValue())) {
          return 64;
        } else {
          return this.negate().getNumBitsAbs();
        }
      } else {
        var val = this.high_ != 0 ? this.high_ : this.low_;
        for (var bit = 31; bit > 0; bit--) {
          if ((val & 1 << bit) != 0) {
            break;
          }
        }
        return this.high_ != 0 ? bit + 33 : bit + 1;
      }
    }
    isZero() {
      return this.low_ == 0 && this.high_ == 0;
    }
    isNegative() {
      return this.high_ < 0;
    }
    isOdd() {
      return (this.low_ & 1) == 1;
    }
    hashCode() {
      return this.getLowBits() ^ this.getHighBits();
    }
    equals(other) {
      return this.low_ == other.low_ && this.high_ == other.high_;
    }
    notEquals(other) {
      return !this.equals(other);
    }
    lessThan(other) {
      return this.compare(other) < 0;
    }
    lessThanOrEqual(other) {
      return this.compare(other) <= 0;
    }
    greaterThan(other) {
      return this.compare(other) > 0;
    }
    greaterThanOrEqual(other) {
      return this.compare(other) >= 0;
    }
    compare(other) {
      if (this.high_ == other.high_) {
        if (this.low_ == other.low_) {
          return 0;
        }
        return this.getLowBitsUnsigned() > other.getLowBitsUnsigned() ? 1 : -1;
      }
      return this.high_ > other.high_ ? 1 : -1;
    }
    negate() {
      var negLow = ~this.low_ + 1 | 0;
      var overflowFromLow = !negLow;
      var negHigh = ~this.high_ + overflowFromLow | 0;
      return Long.fromBits(negLow, negHigh);
    }
    add(other) {
      var a48 = this.high_ >>> 16;
      var a32 = this.high_ & 65535;
      var a16 = this.low_ >>> 16;
      var a00 = this.low_ & 65535;
      var b48 = other.high_ >>> 16;
      var b32 = other.high_ & 65535;
      var b16 = other.low_ >>> 16;
      var b00 = other.low_ & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 + b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 + b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 + b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 + b48;
      c48 &= 65535;
      return Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    multiply(other) {
      if (this.isZero()) {
        return this;
      }
      if (other.isZero()) {
        return other;
      }
      var a48 = this.high_ >>> 16;
      var a32 = this.high_ & 65535;
      var a16 = this.low_ >>> 16;
      var a00 = this.low_ & 65535;
      var b48 = other.high_ >>> 16;
      var b32 = other.high_ & 65535;
      var b16 = other.low_ >>> 16;
      var b00 = other.low_ & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 * b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 * b00;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c16 += a00 * b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 * b00;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a16 * b16;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a00 * b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
      c48 &= 65535;
      return Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
    }
    div(other) {
      if (other.isZero()) {
        throw new Error("division by zero");
      }
      if (this.isNegative()) {
        if (this.equals(Long.getMinValue())) {
          if (other.equals(Long.getOne()) || other.equals(Long.getNegOne())) {
            return Long.getMinValue();
          }
          if (other.equals(Long.getMinValue())) {
            return Long.getOne();
          }
          var halfThis = this.shiftRight(1);
          var approx = halfThis.div(other).shiftLeft(1);
          if (approx.equals(Long.getZero())) {
            return other.isNegative() ? Long.getOne() : Long.getNegOne();
          }
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
        if (other.isNegative()) {
          return this.negate().div(other.negate());
        }
        return this.negate().div(other).negate();
      }
      if (this.isZero()) {
        return Long.getZero();
      }
      if (other.isNegative()) {
        if (other.equals(Long.getMinValue())) {
          return Long.getZero();
        }
        return this.div(other.negate()).negate();
      }
      var res = Long.getZero();
      var rem = this;
      while (rem.greaterThanOrEqual(other)) {
        var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));
        var log2 = Math.ceil(Math.log(approx) / Math.LN2);
        var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
        var approxRes = Long.fromNumber(approx);
        var approxRem = approxRes.multiply(other);
        while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
          approx -= delta;
          approxRes = Long.fromNumber(approx);
          approxRem = approxRes.multiply(other);
        }
        if (approxRes.isZero()) {
          approxRes = Long.getOne();
        }
        res = res.add(approxRes);
        rem = rem.subtract(approxRem);
      }
      return res;
    }
    modulo(other) {
      return this.subtract(this.div(other).multiply(other));
    }
    not() {
      return Long.fromBits(~this.low_, ~this.high_);
    }
    and(other) {
      return Long.fromBits(this.low_ & other.low_, this.high_ & other.high_);
    }
    or(other) {
      return Long.fromBits(this.low_ | other.low_, this.high_ | other.high_);
    }
    xor(other) {
      return Long.fromBits(this.low_ ^ other.low_, this.high_ ^ other.high_);
    }
    shiftLeft(numBits) {
      numBits &= 63;
      if (numBits == 0) {
        return this;
      } else {
        var low = this.low_;
        if (numBits < 32) {
          var high = this.high_;
          return Long.fromBits(low << numBits, high << numBits | low >>> 32 - numBits);
        } else {
          return Long.fromBits(0, low << numBits - 32);
        }
      }
    }
    shiftRight(numBits) {
      numBits &= 63;
      if (numBits == 0) {
        return this;
      } else {
        var high = this.high_;
        if (numBits < 32) {
          var low = this.low_;
          return Long.fromBits(low >>> numBits | high << 32 - numBits, high >> numBits);
        } else {
          return Long.fromBits(high >> numBits - 32, high >= 0 ? 0 : -1);
        }
      }
    }
    shiftRightUnsigned(numBits) {
      numBits &= 63;
      if (numBits == 0) {
        return this;
      } else {
        var high = this.high_;
        if (numBits < 32) {
          var low = this.low_;
          return Long.fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits);
        } else if (numBits == 32) {
          return Long.fromBits(high, 0);
        } else {
          return Long.fromBits(high >>> numBits - 32, 0);
        }
      }
    }
    static fromInt(value) {
      var intValue = value | 0;
      asserts.assert(value === intValue, "value should be a 32-bit integer");
      if (-128 <= intValue && intValue < 128) {
        return getCachedIntValue_(intValue);
      } else {
        return new Long(intValue, intValue < 0 ? -1 : 0);
      }
    }
    static fromNumber(value) {
      if (value > 0) {
        if (value >= TWO_PWR_63_DBL_) {
          return Long.getMaxValue();
        }
        return new Long(value, value / TWO_PWR_32_DBL_);
      } else if (value < 0) {
        if (value <= -TWO_PWR_63_DBL_) {
          return Long.getMinValue();
        }
        return (new Long(-value, -value / TWO_PWR_32_DBL_)).negate();
      } else {
        return Long.getZero();
      }
    }
    static fromBits(lowBits, highBits) {
      return new Long(lowBits, highBits);
    }
    static fromString(str, opt_radix) {
      if (str.charAt(0) == "-") {
        return Long.fromString(str.substring(1), opt_radix).negate();
      }
      var numberValue = parseInt(str, opt_radix || 10);
      if (numberValue <= MAX_SAFE_INTEGER_) {
        return new Long(numberValue % TWO_PWR_32_DBL_ | 0, numberValue / TWO_PWR_32_DBL_ | 0);
      }
      if (str.length == 0) {
        throw new Error("number format error: empty string");
      }
      if (str.indexOf("-") >= 0) {
        throw new Error('number format error: interior "-" character: ' + str);
      }
      var radix = opt_radix || 10;
      if (radix < 2 || 36 < radix) {
        throw new Error("radix out of range: " + radix);
      }
      var radixToPower = Long.fromNumber(Math.pow(radix, 8));
      var result = Long.getZero();
      for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i);
        var value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
          var power = Long.fromNumber(Math.pow(radix, size));
          result = result.multiply(power).add(Long.fromNumber(value));
        } else {
          result = result.multiply(radixToPower);
          result = result.add(Long.fromNumber(value));
        }
      }
      return result;
    }
    static isStringInRange(str, opt_radix) {
      var radix = opt_radix || 10;
      if (radix < 2 || 36 < radix) {
        throw new Error("radix out of range: " + radix);
      }
      var extremeValue = str.charAt(0) == "-" ? MIN_VALUE_FOR_RADIX_[radix] : MAX_VALUE_FOR_RADIX_[radix];
      if (str.length < extremeValue.length) {
        return true;
      } else if (str.length == extremeValue.length && str <= extremeValue) {
        return true;
      } else {
        return false;
      }
    }
    static getZero() {
      return ZERO_;
    }
    static getOne() {
      return ONE_;
    }
    static getNegOne() {
      return NEG_ONE_;
    }
    static getMaxValue() {
      return MAX_VALUE_;
    }
    static getMinValue() {
      return MIN_VALUE_;
    }
    static getTwoPwr24() {
      return TWO_PWR_24_;
    }
  }
  exports = Long;
  const IntCache_ = {};
  function getCachedIntValue_(value) {
    return reflect.cache(IntCache_, value, function(val) {
      return new Long(val, val < 0 ? -1 : 0);
    });
  }
  const MAX_VALUE_FOR_RADIX_ = ["", "", "111111111111111111111111111111111111111111111111111111111111111", "2021110011022210012102010021220101220221", "13333333333333333333333333333333", "1104332401304422434310311212", "1540241003031030222122211", "22341010611245052052300", "777777777777777777777", "67404283172107811827", "9223372036854775807", "1728002635214590697", "41a792678515120367", "10b269549075433c37", "4340724c6c71dc7a7", "160e2ad3246366807", "7fffffffffffffff", "33d3d8307b214008", "16agh595df825fa7", 
  "ba643dci0ffeehh", "5cbfjia3fh26ja7", "2heiciiie82dh97", "1adaibb21dckfa7", "i6k448cf4192c2", "acd772jnc9l0l7", "64ie1focnn5g77", "3igoecjbmca687", "27c48l5b37oaop", "1bk39f3ah3dmq7", "q1se8f0m04isb", "hajppbc1fc207", "bm03i95hia437", "7vvvvvvvvvvvv", "5hg4ck9jd4u37", "3tdtk1v8j6tpp", "2pijmikexrxp7", "1y2p0ij32e8e7"];
  const MIN_VALUE_FOR_RADIX_ = ["", "", "-1000000000000000000000000000000000000000000000000000000000000000", "-2021110011022210012102010021220101220222", "-20000000000000000000000000000000", "-1104332401304422434310311213", "-1540241003031030222122212", "-22341010611245052052301", "-1000000000000000000000", "-67404283172107811828", "-9223372036854775808", "-1728002635214590698", "-41a792678515120368", "-10b269549075433c38", "-4340724c6c71dc7a8", "-160e2ad3246366808", "-8000000000000000", "-33d3d8307b214009", 
  "-16agh595df825fa8", "-ba643dci0ffeehi", "-5cbfjia3fh26ja8", "-2heiciiie82dh98", "-1adaibb21dckfa8", "-i6k448cf4192c3", "-acd772jnc9l0l8", "-64ie1focnn5g78", "-3igoecjbmca688", "-27c48l5b37oaoq", "-1bk39f3ah3dmq8", "-q1se8f0m04isc", "-hajppbc1fc208", "-bm03i95hia438", "-8000000000000", "-5hg4ck9jd4u38", "-3tdtk1v8j6tpq", "-2pijmikexrxp8", "-1y2p0ij32e8e8"];
  const MAX_SAFE_INTEGER_ = 9007199254740991;
  const TWO_PWR_32_DBL_ = 4294967296;
  const TWO_PWR_63_DBL_ = 0x7fffffffffffffff;
  const ZERO_ = Long.fromBits(0, 0);
  const ONE_ = Long.fromBits(1, 0);
  const NEG_ONE_ = Long.fromBits(-1, -1);
  const MAX_VALUE_ = Long.fromBits(4294967295, 2147483647);
  const MIN_VALUE_ = Long.fromBits(0, 2147483648);
  const TWO_PWR_24_ = Long.fromBits(1 << 24, 0);
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.math.long.js");

goog.provide("goog.math.Integer");
goog.require("goog.reflect");
goog.math.Integer = function(bits, sign) {
  this.sign_ = sign;
  var localBits = [];
  var top = true;
  for (var i = bits.length - 1; i >= 0; i--) {
    var val = bits[i] | 0;
    if (!top || val != sign) {
      localBits[i] = val;
      top = false;
    }
  }
  this.bits_ = localBits;
};
goog.math.Integer.IntCache_ = {};
goog.math.Integer.fromInt = function(value) {
  if (-128 <= value && value < 128) {
    return goog.reflect.cache(goog.math.Integer.IntCache_, value, function(val) {
      return new goog.math.Integer([val | 0], val < 0 ? -1 : 0);
    });
  }
  return new goog.math.Integer([value | 0], value < 0 ? -1 : 0);
};
goog.math.Integer.fromNumber = function(value) {
  if (isNaN(value) || !isFinite(value)) {
    return goog.math.Integer.ZERO;
  } else if (value < 0) {
    return goog.math.Integer.fromNumber(-value).negate();
  } else {
    var bits = [];
    var pow = 1;
    for (var i = 0; value >= pow; i++) {
      bits[i] = value / pow | 0;
      pow *= goog.math.Integer.TWO_PWR_32_DBL_;
    }
    return new goog.math.Integer(bits, 0);
  }
};
goog.math.Integer.fromBits = function(bits) {
  var high = bits[bits.length - 1];
  return new goog.math.Integer(bits, high & 1 << 31 ? -1 : 0);
};
goog.math.Integer.fromString = function(str, opt_radix) {
  if (str.length == 0) {
    throw new Error("number format error: empty string");
  }
  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw new Error("radix out of range: " + radix);
  }
  if (str.charAt(0) == "-") {
    return goog.math.Integer.fromString(str.substring(1), radix).negate();
  } else if (str.indexOf("-") >= 0) {
    throw new Error('number format error: interior "-" character');
  }
  var radixToPower = goog.math.Integer.fromNumber(Math.pow(radix, 8));
  var result = goog.math.Integer.ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i);
    var value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = goog.math.Integer.fromNumber(Math.pow(radix, size));
      result = result.multiply(power).add(goog.math.Integer.fromNumber(value));
    } else {
      result = result.multiply(radixToPower);
      result = result.add(goog.math.Integer.fromNumber(value));
    }
  }
  return result;
};
goog.math.Integer.TWO_PWR_32_DBL_ = (1 << 16) * (1 << 16);
goog.math.Integer.ZERO = goog.math.Integer.fromInt(0);
goog.math.Integer.ONE = goog.math.Integer.fromInt(1);
goog.math.Integer.TWO_PWR_24_ = goog.math.Integer.fromInt(1 << 24);
goog.math.Integer.prototype.toInt = function() {
  return this.bits_.length > 0 ? this.bits_[0] : this.sign_;
};
goog.math.Integer.prototype.toNumber = function() {
  if (this.isNegative()) {
    return -this.negate().toNumber();
  } else {
    var val = 0;
    var pow = 1;
    for (var i = 0; i < this.bits_.length; i++) {
      val += this.getBitsUnsigned(i) * pow;
      pow *= goog.math.Integer.TWO_PWR_32_DBL_;
    }
    return val;
  }
};
goog.math.Integer.prototype.toString = function(opt_radix) {
  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw new Error("radix out of range: " + radix);
  }
  if (this.isZero()) {
    return "0";
  } else if (this.isNegative()) {
    return "-" + this.negate().toString(radix);
  }
  var radixToPower = goog.math.Integer.fromNumber(Math.pow(radix, 6));
  var rem = this;
  var result = "";
  while (true) {
    var remDiv = rem.divide(radixToPower);
    var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt() >>> 0;
    var digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero()) {
      return digits + result;
    } else {
      while (digits.length < 6) {
        digits = "0" + digits;
      }
      result = "" + digits + result;
    }
  }
};
goog.math.Integer.prototype.getBits = function(index) {
  if (index < 0) {
    return 0;
  } else if (index < this.bits_.length) {
    return this.bits_[index];
  } else {
    return this.sign_;
  }
};
goog.math.Integer.prototype.getBitsUnsigned = function(index) {
  var val = this.getBits(index);
  return val >= 0 ? val : goog.math.Integer.TWO_PWR_32_DBL_ + val;
};
goog.math.Integer.prototype.getSign = function() {
  return this.sign_;
};
goog.math.Integer.prototype.isZero = function() {
  if (this.sign_ != 0) {
    return false;
  }
  for (var i = 0; i < this.bits_.length; i++) {
    if (this.bits_[i] != 0) {
      return false;
    }
  }
  return true;
};
goog.math.Integer.prototype.isNegative = function() {
  return this.sign_ == -1;
};
goog.math.Integer.prototype.isOdd = function() {
  return this.bits_.length == 0 && this.sign_ == -1 || this.bits_.length > 0 && (this.bits_[0] & 1) != 0;
};
goog.math.Integer.prototype.equals = function(other) {
  if (this.sign_ != other.sign_) {
    return false;
  }
  var len = Math.max(this.bits_.length, other.bits_.length);
  for (var i = 0; i < len; i++) {
    if (this.getBits(i) != other.getBits(i)) {
      return false;
    }
  }
  return true;
};
goog.math.Integer.prototype.notEquals = function(other) {
  return !this.equals(other);
};
goog.math.Integer.prototype.greaterThan = function(other) {
  return this.compare(other) > 0;
};
goog.math.Integer.prototype.greaterThanOrEqual = function(other) {
  return this.compare(other) >= 0;
};
goog.math.Integer.prototype.lessThan = function(other) {
  return this.compare(other) < 0;
};
goog.math.Integer.prototype.lessThanOrEqual = function(other) {
  return this.compare(other) <= 0;
};
goog.math.Integer.prototype.compare = function(other) {
  var diff = this.subtract(other);
  if (diff.isNegative()) {
    return -1;
  } else if (diff.isZero()) {
    return 0;
  } else {
    return +1;
  }
};
goog.math.Integer.prototype.shorten = function(numBits) {
  var arr_index = numBits - 1 >> 5;
  var bit_index = (numBits - 1) % 32;
  var bits = [];
  for (var i = 0; i < arr_index; i++) {
    bits[i] = this.getBits(i);
  }
  var sigBits = bit_index == 31 ? 4294967295 : (1 << bit_index + 1) - 1;
  var val = this.getBits(arr_index) & sigBits;
  if (val & 1 << bit_index) {
    val |= 4294967295 - sigBits;
    bits[arr_index] = val;
    return new goog.math.Integer(bits, -1);
  } else {
    bits[arr_index] = val;
    return new goog.math.Integer(bits, 0);
  }
};
goog.math.Integer.prototype.negate = function() {
  return this.not().add(goog.math.Integer.ONE);
};
goog.math.Integer.prototype.abs = function() {
  return this.isNegative() ? this.negate() : this;
};
goog.math.Integer.prototype.add = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  var carry = 0;
  for (var i = 0; i <= len; i++) {
    var a1 = this.getBits(i) >>> 16;
    var a0 = this.getBits(i) & 65535;
    var b1 = other.getBits(i) >>> 16;
    var b0 = other.getBits(i) & 65535;
    var c0 = carry + a0 + b0;
    var c1 = (c0 >>> 16) + a1 + b1;
    carry = c1 >>> 16;
    c0 &= 65535;
    c1 &= 65535;
    arr[i] = c1 << 16 | c0;
  }
  return goog.math.Integer.fromBits(arr);
};
goog.math.Integer.prototype.subtract = function(other) {
  return this.add(other.negate());
};
goog.math.Integer.prototype.multiply = function(other) {
  if (this.isZero()) {
    return goog.math.Integer.ZERO;
  } else if (other.isZero()) {
    return goog.math.Integer.ZERO;
  }
  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().multiply(other.negate());
    } else {
      return this.negate().multiply(other).negate();
    }
  } else if (other.isNegative()) {
    return this.multiply(other.negate()).negate();
  }
  if (this.lessThan(goog.math.Integer.TWO_PWR_24_) && other.lessThan(goog.math.Integer.TWO_PWR_24_)) {
    return goog.math.Integer.fromNumber(this.toNumber() * other.toNumber());
  }
  var len = this.bits_.length + other.bits_.length;
  var arr = [];
  for (var i = 0; i < 2 * len; i++) {
    arr[i] = 0;
  }
  for (var i = 0; i < this.bits_.length; i++) {
    for (var j = 0; j < other.bits_.length; j++) {
      var a1 = this.getBits(i) >>> 16;
      var a0 = this.getBits(i) & 65535;
      var b1 = other.getBits(j) >>> 16;
      var b0 = other.getBits(j) & 65535;
      arr[2 * i + 2 * j] += a0 * b0;
      goog.math.Integer.carry16_(arr, 2 * i + 2 * j);
      arr[2 * i + 2 * j + 1] += a1 * b0;
      goog.math.Integer.carry16_(arr, 2 * i + 2 * j + 1);
      arr[2 * i + 2 * j + 1] += a0 * b1;
      goog.math.Integer.carry16_(arr, 2 * i + 2 * j + 1);
      arr[2 * i + 2 * j + 2] += a1 * b1;
      goog.math.Integer.carry16_(arr, 2 * i + 2 * j + 2);
    }
  }
  for (var i = 0; i < len; i++) {
    arr[i] = arr[2 * i + 1] << 16 | arr[2 * i];
  }
  for (var i = len; i < 2 * len; i++) {
    arr[i] = 0;
  }
  return new goog.math.Integer(arr, 0);
};
goog.math.Integer.carry16_ = function(bits, index) {
  while ((bits[index] & 65535) != bits[index]) {
    bits[index + 1] += bits[index] >>> 16;
    bits[index] &= 65535;
    index++;
  }
};
goog.math.Integer.prototype.slowDivide_ = function(other) {
  if (this.isNegative() || other.isNegative()) {
    throw new Error("slowDivide_ only works with positive integers.");
  }
  var twoPower = goog.math.Integer.ONE;
  var multiple = other;
  while (multiple.lessThanOrEqual(this)) {
    twoPower = twoPower.shiftLeft(1);
    multiple = multiple.shiftLeft(1);
  }
  var res = twoPower.shiftRight(1);
  var total = multiple.shiftRight(1);
  var total2;
  multiple = multiple.shiftRight(2);
  twoPower = twoPower.shiftRight(2);
  while (!multiple.isZero()) {
    total2 = total.add(multiple);
    if (total2.lessThanOrEqual(this)) {
      res = res.add(twoPower);
      total = total2;
    }
    multiple = multiple.shiftRight(1);
    twoPower = twoPower.shiftRight(1);
  }
  var remainder = this.subtract(res.multiply(other));
  return new goog.math.Integer.DivisionResult(res, remainder);
};
goog.math.Integer.prototype.divide = function(other) {
  return this.divideAndRemainder(other).quotient;
};
goog.math.Integer.DivisionResult = function(quotient, remainder) {
  this.quotient = quotient;
  this.remainder = remainder;
};
goog.math.Integer.prototype.divideAndRemainder = function(other) {
  if (other.isZero()) {
    throw new Error("division by zero");
  } else if (this.isZero()) {
    return new goog.math.Integer.DivisionResult(goog.math.Integer.ZERO, goog.math.Integer.ZERO);
  }
  if (this.isNegative()) {
    var result = this.negate().divideAndRemainder(other);
    return new goog.math.Integer.DivisionResult(result.quotient.negate(), result.remainder.negate());
  } else if (other.isNegative()) {
    var result = this.divideAndRemainder(other.negate());
    return new goog.math.Integer.DivisionResult(result.quotient.negate(), result.remainder);
  }
  if (this.bits_.length > 30) {
    return this.slowDivide_(other);
  }
  var res = goog.math.Integer.ZERO;
  var rem = this;
  while (rem.greaterThanOrEqual(other)) {
    var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2);
    var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
    var approxRes = goog.math.Integer.fromNumber(approx);
    var approxRem = approxRes.multiply(other);
    while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
      approx -= delta;
      approxRes = goog.math.Integer.fromNumber(approx);
      approxRem = approxRes.multiply(other);
    }
    if (approxRes.isZero()) {
      approxRes = goog.math.Integer.ONE;
    }
    res = res.add(approxRes);
    rem = rem.subtract(approxRem);
  }
  return new goog.math.Integer.DivisionResult(res, rem);
};
goog.math.Integer.prototype.modulo = function(other) {
  return this.divideAndRemainder(other).remainder;
};
goog.math.Integer.prototype.not = function() {
  var len = this.bits_.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = ~this.bits_[i];
  }
  return new goog.math.Integer(arr, ~this.sign_);
};
goog.math.Integer.prototype.and = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = this.getBits(i) & other.getBits(i);
  }
  return new goog.math.Integer(arr, this.sign_ & other.sign_);
};
goog.math.Integer.prototype.or = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = this.getBits(i) | other.getBits(i);
  }
  return new goog.math.Integer(arr, this.sign_ | other.sign_);
};
goog.math.Integer.prototype.xor = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = this.getBits(i) ^ other.getBits(i);
  }
  return new goog.math.Integer(arr, this.sign_ ^ other.sign_);
};
goog.math.Integer.prototype.shiftLeft = function(numBits) {
  var arr_delta = numBits >> 5;
  var bit_delta = numBits % 32;
  var len = this.bits_.length + arr_delta + (bit_delta > 0 ? 1 : 0);
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (bit_delta > 0) {
      arr[i] = this.getBits(i - arr_delta) << bit_delta | this.getBits(i - arr_delta - 1) >>> 32 - bit_delta;
    } else {
      arr[i] = this.getBits(i - arr_delta);
    }
  }
  return new goog.math.Integer(arr, this.sign_);
};
goog.math.Integer.prototype.shiftRight = function(numBits) {
  var arr_delta = numBits >> 5;
  var bit_delta = numBits % 32;
  var len = this.bits_.length - arr_delta;
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (bit_delta > 0) {
      arr[i] = this.getBits(i + arr_delta) >>> bit_delta | this.getBits(i + arr_delta + 1) << 32 - bit_delta;
    } else {
      arr[i] = this.getBits(i + arr_delta);
    }
  }
  return new goog.math.Integer(arr, this.sign_);
};

$CLJS.SHADOW_ENV.setLoaded("goog.math.integer.js");

goog.provide("goog.dom.HtmlElement");
goog.dom.HtmlElement = function() {
};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.htmlelement.js");

goog.provide("goog.dom.TagName");
goog.require("goog.dom.HtmlElement");
goog.dom.TagName = class {
  static cast(name, type) {
    return name;
  }
  constructor() {
    this.googDomTagName_doNotImplementThisTypeOrElse_;
    this.ensureTypeScriptRemembersTypeT_;
  }
  toString() {
  }
};
goog.dom.TagName.A = "A";
goog.dom.TagName.ABBR = "ABBR";
goog.dom.TagName.ACRONYM = "ACRONYM";
goog.dom.TagName.ADDRESS = "ADDRESS";
goog.dom.TagName.APPLET = "APPLET";
goog.dom.TagName.AREA = "AREA";
goog.dom.TagName.ARTICLE = "ARTICLE";
goog.dom.TagName.ASIDE = "ASIDE";
goog.dom.TagName.AUDIO = "AUDIO";
goog.dom.TagName.B = "B";
goog.dom.TagName.BASE = "BASE";
goog.dom.TagName.BASEFONT = "BASEFONT";
goog.dom.TagName.BDI = "BDI";
goog.dom.TagName.BDO = "BDO";
goog.dom.TagName.BIG = "BIG";
goog.dom.TagName.BLOCKQUOTE = "BLOCKQUOTE";
goog.dom.TagName.BODY = "BODY";
goog.dom.TagName.BR = "BR";
goog.dom.TagName.BUTTON = "BUTTON";
goog.dom.TagName.CANVAS = "CANVAS";
goog.dom.TagName.CAPTION = "CAPTION";
goog.dom.TagName.CENTER = "CENTER";
goog.dom.TagName.CITE = "CITE";
goog.dom.TagName.CODE = "CODE";
goog.dom.TagName.COL = "COL";
goog.dom.TagName.COLGROUP = "COLGROUP";
goog.dom.TagName.COMMAND = "COMMAND";
goog.dom.TagName.DATA = "DATA";
goog.dom.TagName.DATALIST = "DATALIST";
goog.dom.TagName.DD = "DD";
goog.dom.TagName.DEL = "DEL";
goog.dom.TagName.DETAILS = "DETAILS";
goog.dom.TagName.DFN = "DFN";
goog.dom.TagName.DIALOG = "DIALOG";
goog.dom.TagName.DIR = "DIR";
goog.dom.TagName.DIV = "DIV";
goog.dom.TagName.DL = "DL";
goog.dom.TagName.DT = "DT";
goog.dom.TagName.EM = "EM";
goog.dom.TagName.EMBED = "EMBED";
goog.dom.TagName.FIELDSET = "FIELDSET";
goog.dom.TagName.FIGCAPTION = "FIGCAPTION";
goog.dom.TagName.FIGURE = "FIGURE";
goog.dom.TagName.FONT = "FONT";
goog.dom.TagName.FOOTER = "FOOTER";
goog.dom.TagName.FORM = "FORM";
goog.dom.TagName.FRAME = "FRAME";
goog.dom.TagName.FRAMESET = "FRAMESET";
goog.dom.TagName.H1 = "H1";
goog.dom.TagName.H2 = "H2";
goog.dom.TagName.H3 = "H3";
goog.dom.TagName.H4 = "H4";
goog.dom.TagName.H5 = "H5";
goog.dom.TagName.H6 = "H6";
goog.dom.TagName.HEAD = "HEAD";
goog.dom.TagName.HEADER = "HEADER";
goog.dom.TagName.HGROUP = "HGROUP";
goog.dom.TagName.HR = "HR";
goog.dom.TagName.HTML = "HTML";
goog.dom.TagName.I = "I";
goog.dom.TagName.IFRAME = "IFRAME";
goog.dom.TagName.IMG = "IMG";
goog.dom.TagName.INPUT = "INPUT";
goog.dom.TagName.INS = "INS";
goog.dom.TagName.ISINDEX = "ISINDEX";
goog.dom.TagName.KBD = "KBD";
goog.dom.TagName.KEYGEN = "KEYGEN";
goog.dom.TagName.LABEL = "LABEL";
goog.dom.TagName.LEGEND = "LEGEND";
goog.dom.TagName.LI = "LI";
goog.dom.TagName.LINK = "LINK";
goog.dom.TagName.MAIN = "MAIN";
goog.dom.TagName.MAP = "MAP";
goog.dom.TagName.MARK = "MARK";
goog.dom.TagName.MATH = "MATH";
goog.dom.TagName.MENU = "MENU";
goog.dom.TagName.MENUITEM = "MENUITEM";
goog.dom.TagName.META = "META";
goog.dom.TagName.METER = "METER";
goog.dom.TagName.NAV = "NAV";
goog.dom.TagName.NOFRAMES = "NOFRAMES";
goog.dom.TagName.NOSCRIPT = "NOSCRIPT";
goog.dom.TagName.OBJECT = "OBJECT";
goog.dom.TagName.OL = "OL";
goog.dom.TagName.OPTGROUP = "OPTGROUP";
goog.dom.TagName.OPTION = "OPTION";
goog.dom.TagName.OUTPUT = "OUTPUT";
goog.dom.TagName.P = "P";
goog.dom.TagName.PARAM = "PARAM";
goog.dom.TagName.PICTURE = "PICTURE";
goog.dom.TagName.PRE = "PRE";
goog.dom.TagName.PROGRESS = "PROGRESS";
goog.dom.TagName.Q = "Q";
goog.dom.TagName.RP = "RP";
goog.dom.TagName.RT = "RT";
goog.dom.TagName.RTC = "RTC";
goog.dom.TagName.RUBY = "RUBY";
goog.dom.TagName.S = "S";
goog.dom.TagName.SAMP = "SAMP";
goog.dom.TagName.SCRIPT = "SCRIPT";
goog.dom.TagName.SECTION = "SECTION";
goog.dom.TagName.SELECT = "SELECT";
goog.dom.TagName.SMALL = "SMALL";
goog.dom.TagName.SOURCE = "SOURCE";
goog.dom.TagName.SPAN = "SPAN";
goog.dom.TagName.STRIKE = "STRIKE";
goog.dom.TagName.STRONG = "STRONG";
goog.dom.TagName.STYLE = "STYLE";
goog.dom.TagName.SUB = "SUB";
goog.dom.TagName.SUMMARY = "SUMMARY";
goog.dom.TagName.SUP = "SUP";
goog.dom.TagName.SVG = "SVG";
goog.dom.TagName.TABLE = "TABLE";
goog.dom.TagName.TBODY = "TBODY";
goog.dom.TagName.TD = "TD";
goog.dom.TagName.TEMPLATE = "TEMPLATE";
goog.dom.TagName.TEXTAREA = "TEXTAREA";
goog.dom.TagName.TFOOT = "TFOOT";
goog.dom.TagName.TH = "TH";
goog.dom.TagName.THEAD = "THEAD";
goog.dom.TagName.TIME = "TIME";
goog.dom.TagName.TITLE = "TITLE";
goog.dom.TagName.TR = "TR";
goog.dom.TagName.TRACK = "TRACK";
goog.dom.TagName.TT = "TT";
goog.dom.TagName.U = "U";
goog.dom.TagName.UL = "UL";
goog.dom.TagName.VAR = "VAR";
goog.dom.TagName.VIDEO = "VIDEO";
goog.dom.TagName.WBR = "WBR";

$CLJS.SHADOW_ENV.setLoaded("goog.dom.tagname.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.dom.element");
  goog.module.declareLegacyNamespace();
  const NodeType = goog.require("goog.dom.NodeType");
  const TagName = goog.require("goog.dom.TagName");
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  const isElement = value => {
    return goog.isObject(value) && value.nodeType === NodeType.ELEMENT;
  };
  const isHtmlElement = value => {
    return goog.isObject(value) && isElement(value) && (!value.namespaceURI || value.namespaceURI === HTML_NAMESPACE);
  };
  const isHtmlElementOfType = (value, tagName) => {
    return goog.isObject(value) && isHtmlElement(value) && value.tagName.toUpperCase() === tagName.toString();
  };
  const isHtmlAnchorElement = value => {
    return isHtmlElementOfType(value, TagName.A);
  };
  const isHtmlButtonElement = value => {
    return isHtmlElementOfType(value, TagName.BUTTON);
  };
  const isHtmlLinkElement = value => {
    return isHtmlElementOfType(value, TagName.LINK);
  };
  const isHtmlImageElement = value => {
    return isHtmlElementOfType(value, TagName.IMG);
  };
  const isHtmlAudioElement = value => {
    return isHtmlElementOfType(value, TagName.AUDIO);
  };
  const isHtmlVideoElement = value => {
    return isHtmlElementOfType(value, TagName.VIDEO);
  };
  const isHtmlInputElement = value => {
    return isHtmlElementOfType(value, TagName.INPUT);
  };
  const isHtmlTextAreaElement = value => {
    return isHtmlElementOfType(value, TagName.TEXTAREA);
  };
  const isHtmlCanvasElement = value => {
    return isHtmlElementOfType(value, TagName.CANVAS);
  };
  const isHtmlEmbedElement = value => {
    return isHtmlElementOfType(value, TagName.EMBED);
  };
  const isHtmlFormElement = value => {
    return isHtmlElementOfType(value, TagName.FORM);
  };
  const isHtmlFrameElement = value => {
    return isHtmlElementOfType(value, TagName.FRAME);
  };
  const isHtmlIFrameElement = value => {
    return isHtmlElementOfType(value, TagName.IFRAME);
  };
  const isHtmlObjectElement = value => {
    return isHtmlElementOfType(value, TagName.OBJECT);
  };
  const isHtmlScriptElement = value => {
    return isHtmlElementOfType(value, TagName.SCRIPT);
  };
  exports = {isElement, isHtmlElement, isHtmlElementOfType, isHtmlAnchorElement, isHtmlButtonElement, isHtmlLinkElement, isHtmlImageElement, isHtmlAudioElement, isHtmlVideoElement, isHtmlInputElement, isHtmlTextAreaElement, isHtmlCanvasElement, isHtmlEmbedElement, isHtmlFormElement, isHtmlFrameElement, isHtmlIFrameElement, isHtmlObjectElement, isHtmlScriptElement,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.dom.element.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.asserts.dom");
  goog.module.declareLegacyNamespace();
  const TagName = goog.require("goog.dom.TagName");
  const asserts = goog.require("goog.asserts");
  const element = goog.require("goog.dom.element");
  const assertIsElement = value => {
    if (asserts.ENABLE_ASSERTS && !element.isElement(value)) {
      asserts.fail(`Argument is not an Element; got: ${debugStringForType(value)}`);
    }
    return value;
  };
  const assertIsHtmlElement = value => {
    if (asserts.ENABLE_ASSERTS && !element.isHtmlElement(value)) {
      asserts.fail(`Argument is not an HTML Element; got: ${debugStringForType(value)}`);
    }
    return value;
  };
  const assertIsHtmlElementOfType = (value, tagName) => {
    if (asserts.ENABLE_ASSERTS && !element.isHtmlElementOfType(value, tagName)) {
      asserts.fail(`Argument is not an HTML Element with tag name ` + `${tagName.toString()}; got: ${debugStringForType(value)}`);
    }
    return value;
  };
  const assertIsHtmlAnchorElement = value => {
    return assertIsHtmlElementOfType(value, TagName.A);
  };
  const assertIsHtmlButtonElement = value => {
    return assertIsHtmlElementOfType(value, TagName.BUTTON);
  };
  const assertIsHtmlLinkElement = value => {
    return assertIsHtmlElementOfType(value, TagName.LINK);
  };
  const assertIsHtmlImageElement = value => {
    return assertIsHtmlElementOfType(value, TagName.IMG);
  };
  const assertIsHtmlAudioElement = value => {
    return assertIsHtmlElementOfType(value, TagName.AUDIO);
  };
  const assertIsHtmlVideoElement = value => {
    return assertIsHtmlElementOfType(value, TagName.VIDEO);
  };
  const assertIsHtmlInputElement = value => {
    return assertIsHtmlElementOfType(value, TagName.INPUT);
  };
  const assertIsHtmlTextAreaElement = value => {
    return assertIsHtmlElementOfType(value, TagName.TEXTAREA);
  };
  const assertIsHtmlCanvasElement = value => {
    return assertIsHtmlElementOfType(value, TagName.CANVAS);
  };
  const assertIsHtmlEmbedElement = value => {
    return assertIsHtmlElementOfType(value, TagName.EMBED);
  };
  const assertIsHtmlFormElement = value => {
    return assertIsHtmlElementOfType(value, TagName.FORM);
  };
  const assertIsHtmlFrameElement = value => {
    return assertIsHtmlElementOfType(value, TagName.FRAME);
  };
  const assertIsHtmlIFrameElement = value => {
    return assertIsHtmlElementOfType(value, TagName.IFRAME);
  };
  const assertIsHtmlObjectElement = value => {
    return assertIsHtmlElementOfType(value, TagName.OBJECT);
  };
  const assertIsHtmlScriptElement = value => {
    return assertIsHtmlElementOfType(value, TagName.SCRIPT);
  };
  const debugStringForType = value => {
    if (goog.isObject(value)) {
      try {
        return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
      } catch (e) {
        return "\x3cobject could not be stringified\x3e";
      }
    } else {
      return value === undefined ? "undefined" : value === null ? "null" : typeof value;
    }
  };
  exports = {assertIsElement, assertIsHtmlElement, assertIsHtmlElementOfType, assertIsHtmlAnchorElement, assertIsHtmlButtonElement, assertIsHtmlLinkElement, assertIsHtmlImageElement, assertIsHtmlAudioElement, assertIsHtmlVideoElement, assertIsHtmlInputElement, assertIsHtmlTextAreaElement, assertIsHtmlCanvasElement, assertIsHtmlEmbedElement, assertIsHtmlFormElement, assertIsHtmlFrameElement, assertIsHtmlIFrameElement, assertIsHtmlObjectElement, assertIsHtmlScriptElement,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.asserts.dom.js");

goog.provide("goog.dom.asserts");
goog.require("goog.asserts");
goog.dom.asserts.assertIsLocation = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (win) {
      if (!o || !(o instanceof win.Location) && o instanceof win.Element) {
        goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s", goog.dom.asserts.debugStringForType_(o));
      }
    }
  }
  return o;
};
goog.dom.asserts.debugStringForType_ = function(value) {
  if (goog.isObject(value)) {
    try {
      return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
    } catch (e) {
      return "\x3cobject could not be stringified\x3e";
    }
  } else {
    return value === undefined ? "undefined" : value === null ? "null" : typeof value;
  }
};
goog.dom.asserts.getWindow_ = function(o) {
  try {
    var doc = o && o.ownerDocument;
    var win = doc && (doc.defaultView || doc.parentWindow);
    win = win || goog.global;
    if (win.Element && win.Location) {
      return win;
    }
  } catch (ex) {
  }
  return null;
};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.asserts.js");

goog.provide("goog.functions");
goog.functions.constant = function(retValue) {
  return function() {
    return retValue;
  };
};
goog.functions.FALSE = function() {
  return false;
};
goog.functions.TRUE = function() {
  return true;
};
goog.functions.NULL = function() {
  return null;
};
goog.functions.UNDEFINED = function() {
  return undefined;
};
goog.functions.EMPTY = goog.functions.UNDEFINED;
goog.functions.identity = function(opt_returnValue, var_args) {
  return opt_returnValue;
};
goog.functions.error = function(message) {
  return function() {
    throw new Error(message);
  };
};
goog.functions.fail = function(err) {
  return function() {
    throw err;
  };
};
goog.functions.lock = function(f, opt_numArgs) {
  opt_numArgs = opt_numArgs || 0;
  return function() {
    const self = this;
    return f.apply(self, Array.prototype.slice.call(arguments, 0, opt_numArgs));
  };
};
goog.functions.nth = function(n) {
  return function() {
    return arguments[n];
  };
};
goog.functions.partialRight = function(fn, var_args) {
  const rightArgs = Array.prototype.slice.call(arguments, 1);
  return function() {
    let self = this;
    if (self === goog.global) {
      self = undefined;
    }
    const newArgs = Array.prototype.slice.call(arguments);
    newArgs.push.apply(newArgs, rightArgs);
    return fn.apply(self, newArgs);
  };
};
goog.functions.withReturnValue = function(f, retValue) {
  return goog.functions.sequence(f, goog.functions.constant(retValue));
};
goog.functions.equalTo = function(value, opt_useLooseComparison) {
  return function(other) {
    return opt_useLooseComparison ? value == other : value === other;
  };
};
goog.functions.compose = function(fn, var_args) {
  const functions = arguments;
  const length = functions.length;
  return function() {
    const self = this;
    let result;
    if (length) {
      result = functions[length - 1].apply(self, arguments);
    }
    for (let i = length - 2; i >= 0; i--) {
      result = functions[i].call(self, result);
    }
    return result;
  };
};
goog.functions.sequence = function(var_args) {
  const functions = arguments;
  const length = functions.length;
  return function() {
    const self = this;
    let result;
    for (let i = 0; i < length; i++) {
      result = functions[i].apply(self, arguments);
    }
    return result;
  };
};
goog.functions.and = function(var_args) {
  const functions = arguments;
  const length = functions.length;
  return function() {
    const self = this;
    for (let i = 0; i < length; i++) {
      if (!functions[i].apply(self, arguments)) {
        return false;
      }
    }
    return true;
  };
};
goog.functions.or = function(var_args) {
  const functions = arguments;
  const length = functions.length;
  return function() {
    const self = this;
    for (let i = 0; i < length; i++) {
      if (functions[i].apply(self, arguments)) {
        return true;
      }
    }
    return false;
  };
};
goog.functions.not = function(f) {
  return function() {
    const self = this;
    return !f.apply(self, arguments);
  };
};
goog.functions.create = function(constructor, var_args) {
  const temp = function() {
  };
  temp.prototype = constructor.prototype;
  const obj = new temp();
  constructor.apply(obj, Array.prototype.slice.call(arguments, 1));
  return obj;
};
goog.functions.CACHE_RETURN_VALUE = goog.define("goog.functions.CACHE_RETURN_VALUE", true);
goog.functions.cacheReturnValue = function(fn) {
  let called = false;
  let value;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return fn();
    }
    if (!called) {
      value = fn();
      called = true;
    }
    return value;
  };
};
goog.functions.once = function(f) {
  let inner = f;
  return function() {
    if (inner) {
      const tmp = inner;
      inner = null;
      tmp();
    }
  };
};
goog.functions.debounce = function(f, interval, opt_scope) {
  let timeout = 0;
  return function(var_args) {
    goog.global.clearTimeout(timeout);
    const args = arguments;
    timeout = goog.global.setTimeout(function() {
      f.apply(opt_scope, args);
    }, interval);
  };
};
goog.functions.throttle = function(f, interval, opt_scope) {
  let timeout = 0;
  let shouldFire = false;
  let storedArgs = [];
  const handleTimeout = function() {
    timeout = 0;
    if (shouldFire) {
      shouldFire = false;
      fire();
    }
  };
  const fire = function() {
    timeout = goog.global.setTimeout(handleTimeout, interval);
    let args = storedArgs;
    storedArgs = [];
    f.apply(opt_scope, args);
  };
  return function(var_args) {
    storedArgs = arguments;
    if (!timeout) {
      fire();
    } else {
      shouldFire = true;
    }
  };
};
goog.functions.rateLimit = function(f, interval, opt_scope) {
  let timeout = 0;
  const handleTimeout = function() {
    timeout = 0;
  };
  return function(var_args) {
    if (!timeout) {
      timeout = goog.global.setTimeout(handleTimeout, interval);
      f.apply(opt_scope, arguments);
    }
  };
};
goog.functions.isFunction = val => {
  return typeof val === "function";
};

$CLJS.SHADOW_ENV.setLoaded("goog.functions.functions.js");

goog.provide("goog.string.TypedString");
goog.string.TypedString = function() {
};
goog.string.TypedString.prototype.implementsGoogStringTypedString;
goog.string.TypedString.prototype.getTypedStringValue;

$CLJS.SHADOW_ENV.setLoaded("goog.string.typedstring.js");

goog.provide("goog.string.Const");
goog.require("goog.asserts");
goog.require("goog.string.TypedString");
goog.string.Const = function(opt_token, opt_content) {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = opt_token === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ && opt_content || "";
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
};
goog.string.Const.prototype.implementsGoogStringTypedString = true;
goog.string.Const.prototype.getTypedStringValue = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
if (goog.DEBUG) {
  goog.string.Const.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
  };
}
goog.string.Const.unwrap = function(stringConst) {
  if (stringConst instanceof goog.string.Const && stringConst.constructor === goog.string.Const && stringConst.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
    return stringConst.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  } else {
    goog.asserts.fail("expected object of type Const, got '" + stringConst + "'");
    return "type_error:Const";
  }
};
goog.string.Const.from = function(s) {
  return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_, s);
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.string.Const.EMPTY = goog.string.Const.from("");

$CLJS.SHADOW_ENV.setLoaded("goog.string.const.js");

goog.provide("goog.html.trustedtypes");
goog.html.trustedtypes.POLICY_NAME = goog.define("goog.html.trustedtypes.POLICY_NAME", goog.TRUSTED_TYPES_POLICY_NAME ? goog.TRUSTED_TYPES_POLICY_NAME + "#html" : "");
goog.html.trustedtypes.cachedPolicy_;
goog.html.trustedtypes.getPolicyPrivateDoNotAccessOrElse = function() {
  if (!goog.html.trustedtypes.POLICY_NAME) {
    return null;
  }
  if (goog.html.trustedtypes.cachedPolicy_ === undefined) {
    goog.html.trustedtypes.cachedPolicy_ = goog.createTrustedTypesPolicy(goog.html.trustedtypes.POLICY_NAME);
  }
  return goog.html.trustedtypes.cachedPolicy_;
};

$CLJS.SHADOW_ENV.setLoaded("goog.html.trustedtypes.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.html.SafeScript");
  goog.module.declareLegacyNamespace();
  const Const = goog.require("goog.string.Const");
  const TypedString = goog.require("goog.string.TypedString");
  const trustedtypes = goog.require("goog.html.trustedtypes");
  const {fail} = goog.require("goog.asserts");
  const CONSTRUCTOR_TOKEN_PRIVATE = {};
  class SafeScript {
    constructor(value, token) {
      this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = token === CONSTRUCTOR_TOKEN_PRIVATE ? value : "";
      this.implementsGoogStringTypedString = true;
    }
    toString() {
      return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
    }
    static fromConstant(script) {
      const scriptString = Const.unwrap(script);
      if (scriptString.length === 0) {
        return SafeScript.EMPTY;
      }
      return SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(scriptString);
    }
    static fromJson(val) {
      return SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(SafeScript.stringify_(val));
    }
    getTypedStringValue() {
      return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
    }
    static unwrap(safeScript) {
      return SafeScript.unwrapTrustedScript(safeScript).toString();
    }
    static unwrapTrustedScript(safeScript) {
      if (safeScript instanceof SafeScript && safeScript.constructor === SafeScript) {
        return safeScript.privateDoNotAccessOrElseSafeScriptWrappedValue_;
      } else {
        fail("expected object of type SafeScript, got '" + safeScript + "' of type " + goog.typeOf(safeScript));
        return "type_error:SafeScript";
      }
    }
    static stringify_(val) {
      const json = JSON.stringify(val);
      return json.replace(/</g, "\\x3c");
    }
    static createSafeScriptSecurityPrivateDoNotAccessOrElse(script) {
      const noinlineScript = script;
      const policy = trustedtypes.getPolicyPrivateDoNotAccessOrElse();
      const trustedScript = policy ? policy.createScript(noinlineScript) : noinlineScript;
      return new SafeScript(trustedScript, CONSTRUCTOR_TOKEN_PRIVATE);
    }
  }
  SafeScript.EMPTY = {valueOf:function() {
    return SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
  },}.valueOf();
  exports = SafeScript;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.html.safescript.js");

goog.provide("goog.fs.url");
goog.fs.url.createObjectUrl = function(obj) {
  return goog.fs.url.getUrlObject_().createObjectURL(obj);
};
goog.fs.url.revokeObjectUrl = function(url) {
  goog.fs.url.getUrlObject_().revokeObjectURL(url);
};
goog.fs.url.UrlObject_ = function() {
};
goog.fs.url.UrlObject_.prototype.createObjectURL = function(arg) {
};
goog.fs.url.UrlObject_.prototype.revokeObjectURL = function(s) {
};
goog.fs.url.getUrlObject_ = function() {
  const urlObject = goog.fs.url.findUrlObject_();
  if (urlObject != null) {
    return urlObject;
  } else {
    throw new Error("This browser doesn't seem to support blob URLs");
  }
};
goog.fs.url.findUrlObject_ = function() {
  if (goog.global.URL !== undefined && goog.global.URL.createObjectURL !== undefined) {
    return goog.global.URL;
  } else if (goog.global.createObjectURL !== undefined) {
    return goog.global;
  } else {
    return null;
  }
};
goog.fs.url.browserSupportsObjectUrls = function() {
  return goog.fs.url.findUrlObject_() != null;
};

$CLJS.SHADOW_ENV.setLoaded("goog.fs.url.js");

goog.provide("goog.fs.blob");
goog.fs.blob.getBlob = function(var_args) {
  const BlobBuilder = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
  if (BlobBuilder !== undefined) {
    const bb = new BlobBuilder();
    for (let i = 0; i < arguments.length; i++) {
      bb.append(arguments[i]);
    }
    return bb.getBlob();
  } else {
    return goog.fs.blob.getBlobWithProperties(Array.prototype.slice.call(arguments));
  }
};
goog.fs.blob.getBlobWithProperties = function(parts, opt_type, opt_endings) {
  const BlobBuilder = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
  if (BlobBuilder !== undefined) {
    const bb = new BlobBuilder();
    for (let i = 0; i < parts.length; i++) {
      bb.append(parts[i], opt_endings);
    }
    return bb.getBlob(opt_type);
  } else if (goog.global.Blob !== undefined) {
    const properties = {};
    if (opt_type) {
      properties["type"] = opt_type;
    }
    if (opt_endings) {
      properties["endings"] = opt_endings;
    }
    return new Blob(parts, properties);
  } else {
    throw new Error("This browser doesn't seem to support creating Blobs");
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.fs.blob.js");

goog.provide("goog.html.TrustedResourceUrl");
goog.require("goog.asserts");
goog.require("goog.fs.blob");
goog.require("goog.fs.url");
goog.require("goog.html.SafeScript");
goog.require("goog.html.trustedtypes");
goog.require("goog.string.Const");
goog.require("goog.string.TypedString");
goog.html.TrustedResourceUrl = class {
  constructor(value, token) {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = token === goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ ? value : "";
  }
  toString() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "";
  }
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = true;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString();
};
goog.html.TrustedResourceUrl.prototype.cloneWithParams = function(searchParams, opt_hashParams) {
  var url = goog.html.TrustedResourceUrl.unwrap(this);
  var parts = goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(url);
  var urlBase = parts[1];
  var urlSearch = parts[2] || "";
  var urlHash = parts[3] || "";
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(urlBase + goog.html.TrustedResourceUrl.stringifyParams_("?", urlSearch, searchParams) + goog.html.TrustedResourceUrl.stringifyParams_("#", urlHash, opt_hashParams));
};
goog.html.TrustedResourceUrl.unwrap = function(trustedResourceUrl) {
  return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(trustedResourceUrl).toString();
};
goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function(trustedResourceUrl) {
  if (trustedResourceUrl instanceof goog.html.TrustedResourceUrl && trustedResourceUrl.constructor === goog.html.TrustedResourceUrl) {
    return trustedResourceUrl.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
  } else {
    goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + trustedResourceUrl + "' of type " + goog.typeOf(trustedResourceUrl));
    return "type_error:TrustedResourceUrl";
  }
};
goog.html.TrustedResourceUrl.format = function(format, args) {
  var formatStr = goog.string.Const.unwrap(format);
  if (!goog.html.TrustedResourceUrl.BASE_URL_.test(formatStr)) {
    throw new Error("Invalid TrustedResourceUrl format: " + formatStr);
  }
  var result = formatStr.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function(match, id) {
    if (!Object.prototype.hasOwnProperty.call(args, id)) {
      throw new Error('Found marker, "' + id + '", in format string, "' + formatStr + '", but no valid label mapping found ' + "in args: " + JSON.stringify(args));
    }
    var arg = args[id];
    if (arg instanceof goog.string.Const) {
      return goog.string.Const.unwrap(arg);
    } else {
      return encodeURIComponent(String(arg));
    }
  });
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(result);
};
goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
goog.html.TrustedResourceUrl.BASE_URL_ = new RegExp("^((https:)?//[0-9a-z.:[\\]-]+/" + "|/[^/\\\\]" + "|[^:/\\\\%]+/" + "|[^:/\\\\%]*[?#]" + "|about:blank#" + ")", "i");
goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
goog.html.TrustedResourceUrl.formatWithParams = function(format, args, searchParams, opt_hashParams) {
  var url = goog.html.TrustedResourceUrl.format(format, args);
  return url.cloneWithParams(searchParams, opt_hashParams);
};
goog.html.TrustedResourceUrl.fromConstant = function(url) {
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(url));
};
goog.html.TrustedResourceUrl.fromConstants = function(parts) {
  var unwrapped = "";
  for (var i = 0; i < parts.length; i++) {
    unwrapped += goog.string.Const.unwrap(parts[i]);
  }
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(unwrapped);
};
goog.html.TrustedResourceUrl.fromSafeScript = function(safeScript) {
  var blob = goog.fs.blob.getBlobWithProperties([goog.html.SafeScript.unwrap(safeScript)], "text/javascript");
  var url = goog.fs.url.createObjectUrl(blob);
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(url) {
  const noinlineUrl = url;
  const policy = goog.html.trustedtypes.getPolicyPrivateDoNotAccessOrElse();
  const value = policy ? policy.createScriptURL(noinlineUrl) : noinlineUrl;
  return new goog.html.TrustedResourceUrl(value, goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_);
};
goog.html.TrustedResourceUrl.stringifyParams_ = function(prefix, currentString, params) {
  if (params == null) {
    return currentString;
  }
  if (typeof params === "string") {
    return params ? prefix + encodeURIComponent(params) : "";
  }
  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      var value = params[key];
      var outputValues = Array.isArray(value) ? value : [value];
      for (var i = 0; i < outputValues.length; i++) {
        var outputValue = outputValues[i];
        if (outputValue != null) {
          if (!currentString) {
            currentString = prefix;
          }
          currentString += (currentString.length > prefix.length ? "\x26" : "") + encodeURIComponent(key) + "\x3d" + encodeURIComponent(String(outputValue));
        }
      }
    }
  }
  return currentString;
};

$CLJS.SHADOW_ENV.setLoaded("goog.html.trustedresourceurl.js");

goog.provide("goog.string.internal");
goog.string.internal.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0;
};
goog.string.internal.endsWith = function(str, suffix) {
  const l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l;
};
goog.string.internal.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.internal.caseInsensitiveCompare(prefix, str.slice(0, prefix.length)) == 0;
};
goog.string.internal.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.internal.caseInsensitiveCompare(suffix, str.slice(str.length - suffix.length)) == 0;
};
goog.string.internal.caseInsensitiveEquals = function(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
};
goog.string.internal.isEmptyOrWhitespace = function(str) {
  return /^[\s\xa0]*$/.test(str);
};
goog.string.internal.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(str) {
  return str.trim();
} : function(str) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(str)[1];
};
goog.string.internal.caseInsensitiveCompare = function(str1, str2) {
  const test1 = String(str1).toLowerCase();
  const test2 = String(str2).toLowerCase();
  if (test1 < test2) {
    return -1;
  } else if (test1 == test2) {
    return 0;
  } else {
    return 1;
  }
};
goog.string.internal.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "\x3cbr /\x3e" : "\x3cbr\x3e");
};
goog.string.internal.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    str = str.replace(goog.string.internal.AMP_RE_, "\x26amp;").replace(goog.string.internal.LT_RE_, "\x26lt;").replace(goog.string.internal.GT_RE_, "\x26gt;").replace(goog.string.internal.QUOT_RE_, "\x26quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_, "\x26#39;").replace(goog.string.internal.NULL_RE_, "\x26#0;");
    return str;
  } else {
    if (!goog.string.internal.ALL_RE_.test(str)) {
      return str;
    }
    if (str.indexOf("\x26") != -1) {
      str = str.replace(goog.string.internal.AMP_RE_, "\x26amp;");
    }
    if (str.indexOf("\x3c") != -1) {
      str = str.replace(goog.string.internal.LT_RE_, "\x26lt;");
    }
    if (str.indexOf("\x3e") != -1) {
      str = str.replace(goog.string.internal.GT_RE_, "\x26gt;");
    }
    if (str.indexOf('"') != -1) {
      str = str.replace(goog.string.internal.QUOT_RE_, "\x26quot;");
    }
    if (str.indexOf("'") != -1) {
      str = str.replace(goog.string.internal.SINGLE_QUOTE_RE_, "\x26#39;");
    }
    if (str.indexOf("\x00") != -1) {
      str = str.replace(goog.string.internal.NULL_RE_, "\x26#0;");
    }
    return str;
  }
};
goog.string.internal.AMP_RE_ = /&/g;
goog.string.internal.LT_RE_ = /</g;
goog.string.internal.GT_RE_ = />/g;
goog.string.internal.QUOT_RE_ = /"/g;
goog.string.internal.SINGLE_QUOTE_RE_ = /'/g;
goog.string.internal.NULL_RE_ = /\x00/g;
goog.string.internal.ALL_RE_ = /[\x00&<>"']/;
goog.string.internal.whitespaceEscape = function(str, opt_xml) {
  return goog.string.internal.newLineToBr(str.replace(/  /g, " \x26#160;"), opt_xml);
};
goog.string.internal.contains = function(str, subString) {
  return str.indexOf(subString) != -1;
};
goog.string.internal.caseInsensitiveContains = function(str, subString) {
  return goog.string.internal.contains(str.toLowerCase(), subString.toLowerCase());
};
goog.string.internal.compareVersions = function(version1, version2) {
  let order = 0;
  const v1Subs = goog.string.internal.trim(String(version1)).split(".");
  const v2Subs = goog.string.internal.trim(String(version2)).split(".");
  const subCount = Math.max(v1Subs.length, v2Subs.length);
  for (let subIdx = 0; order == 0 && subIdx < subCount; subIdx++) {
    let v1Sub = v1Subs[subIdx] || "";
    let v2Sub = v2Subs[subIdx] || "";
    do {
      const v1Comp = /(\d*)(\D*)(.*)/.exec(v1Sub) || ["", "", "", ""];
      const v2Comp = /(\d*)(\D*)(.*)/.exec(v2Sub) || ["", "", "", ""];
      if (v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break;
      }
      const v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      const v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.internal.compareElements_(v1CompNum, v2CompNum) || goog.string.internal.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.internal.compareElements_(v1Comp[2], v2Comp[2]);
      v1Sub = v1Comp[3];
      v2Sub = v2Comp[3];
    } while (order == 0);
  }
  return order;
};
goog.string.internal.compareElements_ = function(left, right) {
  if (left < right) {
    return -1;
  } else if (left > right) {
    return 1;
  }
  return 0;
};

$CLJS.SHADOW_ENV.setLoaded("goog.string.internal.js");

goog.provide("goog.html.SafeUrl");
goog.require("goog.asserts");
goog.require("goog.fs.url");
goog.require("goog.html.TrustedResourceUrl");
goog.require("goog.string.Const");
goog.require("goog.string.TypedString");
goog.require("goog.string.internal");
goog.html.SafeUrl = class {
  constructor(value, token) {
    this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = token === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ ? value : "";
  }
  toString() {
    return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
  }
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = true;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
};
goog.html.SafeUrl.unwrap = function(safeUrl) {
  if (safeUrl instanceof goog.html.SafeUrl && safeUrl.constructor === goog.html.SafeUrl) {
    return safeUrl.privateDoNotAccessOrElseSafeUrlWrappedValue_;
  } else {
    goog.asserts.fail("expected object of type SafeUrl, got '" + safeUrl + "' of type " + goog.typeOf(safeUrl));
    return "type_error:SafeUrl";
  }
};
goog.html.SafeUrl.fromConstant = function(url) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(url));
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = new RegExp("^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|" + "font/\\w+|" + "image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif)|" + "video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))" + '(?:;\\w+\x3d(?:\\w+|"[\\w;,\x3d ]+"))*$', "i");
goog.html.SafeUrl.isSafeMimeType = function(mimeType) {
  return goog.html.SAFE_MIME_TYPE_PATTERN_.test(mimeType);
};
goog.html.SafeUrl.fromBlob = function(blob) {
  var url = goog.html.SafeUrl.isSafeMimeType(blob.type) ? goog.fs.url.createObjectUrl(blob) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.SafeUrl.revokeObjectUrl = function(safeUrl) {
  var url = safeUrl.getTypedStringValue();
  if (url !== goog.html.SafeUrl.INNOCUOUS_STRING) {
    goog.fs.url.revokeObjectUrl(url);
  }
};
goog.html.SafeUrl.fromMediaSource = function(mediaSource) {
  goog.asserts.assert("MediaSource" in goog.global, "No support for MediaSource");
  const url = mediaSource instanceof MediaSource ? goog.fs.url.createObjectUrl(mediaSource) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.DATA_URL_PATTERN_ = /^data:(.*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.tryFromDataUrl = function(dataUrl) {
  dataUrl = String(dataUrl);
  var filteredDataUrl = dataUrl.replace(/(%0A|%0D)/g, "");
  var match = filteredDataUrl.match(goog.html.DATA_URL_PATTERN_);
  if (match) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(filteredDataUrl);
  }
  return null;
};
goog.html.SafeUrl.fromDataUrl = function(dataUrl) {
  return goog.html.SafeUrl.tryFromDataUrl(dataUrl) || goog.html.SafeUrl.INNOCUOUS_URL;
};
goog.html.SafeUrl.fromTelUrl = function(telUrl) {
  if (!goog.string.internal.caseInsensitiveStartsWith(telUrl, "tel:")) {
    telUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(telUrl);
};
goog.html.SIP_URL_PATTERN_ = new RegExp("^sip[s]?:[+a-z0-9_.!$%\x26'*\\/\x3d^`{|}~-]+@([a-z0-9-]+\\.)+[a-z0-9]{2,63}$", "i");
goog.html.SafeUrl.fromSipUrl = function(sipUrl) {
  if (!goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(sipUrl))) {
    sipUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(sipUrl);
};
goog.html.SafeUrl.fromFacebookMessengerUrl = function(facebookMessengerUrl) {
  if (!goog.string.internal.caseInsensitiveStartsWith(facebookMessengerUrl, "fb-messenger://share")) {
    facebookMessengerUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(facebookMessengerUrl);
};
goog.html.SafeUrl.fromWhatsAppUrl = function(whatsAppUrl) {
  if (!goog.string.internal.caseInsensitiveStartsWith(whatsAppUrl, "whatsapp://send")) {
    whatsAppUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(whatsAppUrl);
};
goog.html.SafeUrl.fromSmsUrl = function(smsUrl) {
  if (!goog.string.internal.caseInsensitiveStartsWith(smsUrl, "sms:") || !goog.html.SafeUrl.isSmsUrlBodyValid_(smsUrl)) {
    smsUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(smsUrl);
};
goog.html.SafeUrl.isSmsUrlBodyValid_ = function(smsUrl) {
  var hash = smsUrl.indexOf("#");
  if (hash > 0) {
    smsUrl = smsUrl.substring(0, hash);
  }
  var bodyParams = smsUrl.match(/[?&]body=/gi);
  if (!bodyParams) {
    return true;
  }
  if (bodyParams.length > 1) {
    return false;
  }
  var bodyValue = smsUrl.match(/[?&]body=([^&]*)/)[1];
  if (!bodyValue) {
    return true;
  }
  try {
    decodeURIComponent(bodyValue);
  } catch (error) {
    return false;
  }
  return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(bodyValue);
};
goog.html.SafeUrl.fromSshUrl = function(sshUrl) {
  if (!goog.string.internal.caseInsensitiveStartsWith(sshUrl, "ssh://")) {
    sshUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(sshUrl);
};
goog.html.SafeUrl.sanitizeChromeExtensionUrl = function(url, extensionId) {
  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//, url, extensionId);
};
goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function(url, extensionId) {
  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//, url, extensionId);
};
goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function(url, extensionId) {
  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//, url, extensionId);
};
goog.html.SafeUrl.sanitizeExtensionUrl_ = function(scheme, url, extensionId) {
  var matches = scheme.exec(url);
  if (!matches) {
    url = goog.html.SafeUrl.INNOCUOUS_STRING;
  } else {
    var extractedExtensionId = matches[1];
    var acceptedExtensionIds;
    if (extensionId instanceof goog.string.Const) {
      acceptedExtensionIds = [goog.string.Const.unwrap(extensionId)];
    } else {
      acceptedExtensionIds = extensionId.map(function unwrap(x) {
        return goog.string.Const.unwrap(x);
      });
    }
    if (acceptedExtensionIds.indexOf(extractedExtensionId) == -1) {
      url = goog.html.SafeUrl.INNOCUOUS_STRING;
    }
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.SafeUrl.fromTrustedResourceUrl = function(trustedResourceUrl) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(trustedResourceUrl));
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;
goog.html.SafeUrl.trySanitize = function(url) {
  if (url instanceof goog.html.SafeUrl) {
    return url;
  }
  if (typeof url == "object" && url.implementsGoogStringTypedString) {
    url = url.getTypedStringValue();
  } else {
    url = String(url);
  }
  if (!goog.html.SAFE_URL_PATTERN_.test(url)) {
    return goog.html.SafeUrl.tryFromDataUrl(url);
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.SafeUrl.sanitize = function(url) {
  return goog.html.SafeUrl.trySanitize(url) || goog.html.SafeUrl.INNOCUOUS_URL;
};
goog.html.SafeUrl.sanitizeAssertUnchanged = function(url, opt_allowDataUrl) {
  if (url instanceof goog.html.SafeUrl) {
    return url;
  } else if (typeof url == "object" && url.implementsGoogStringTypedString) {
    url = url.getTypedStringValue();
  } else {
    url = String(url);
  }
  if (opt_allowDataUrl && /^data:/i.test(url)) {
    var safeUrl = goog.html.SafeUrl.fromDataUrl(url);
    if (safeUrl.getTypedStringValue() == url) {
      return safeUrl;
    }
  }
  if (!goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(url), "%s does not match the safe URL pattern", url)) {
    url = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.SafeUrl.extractScheme = function(url) {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (e) {
    return "https:";
  }
  return parsedUrl.protocol;
};
goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged = function(url) {
  if (url instanceof goog.html.SafeUrl) {
    return url;
  } else if (typeof url == "object" && url.implementsGoogStringTypedString) {
    url = url.getTypedStringValue();
  } else {
    url = String(url);
  }
  const parsedScheme = goog.html.SafeUrl.extractScheme(url);
  if (!goog.asserts.assert(parsedScheme !== "javascript:", "%s is a javascript: URL", url)) {
    url = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(url) {
  return new goog.html.SafeUrl(url, goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_);
};
goog.html.SafeUrl.INNOCUOUS_URL = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.SafeUrl.INNOCUOUS_STRING);
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");

$CLJS.SHADOW_ENV.setLoaded("goog.html.safeurl.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.html.SafeStyle");
  goog.module.declareLegacyNamespace();
  const Const = goog.require("goog.string.Const");
  const SafeUrl = goog.require("goog.html.SafeUrl");
  const TypedString = goog.require("goog.string.TypedString");
  const {AssertionError, assert, fail} = goog.require("goog.asserts");
  const {contains, endsWith} = goog.require("goog.string.internal");
  const CONSTRUCTOR_TOKEN_PRIVATE = {};
  class SafeStyle {
    constructor(value, token) {
      this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = token === CONSTRUCTOR_TOKEN_PRIVATE ? value : "";
      this.implementsGoogStringTypedString = true;
    }
    static fromConstant(style) {
      const styleString = Const.unwrap(style);
      if (styleString.length === 0) {
        return SafeStyle.EMPTY;
      }
      assert(endsWith(styleString, ";"), `Last character of style string is not ';': ${styleString}`);
      assert(contains(styleString, ":"), "Style string must contain at least one ':', to " + 'specify a "name: value" pair: ' + styleString);
      return SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(styleString);
    }
    getTypedStringValue() {
      return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    }
    toString() {
      return this.privateDoNotAccessOrElseSafeStyleWrappedValue_.toString();
    }
    static unwrap(safeStyle) {
      if (safeStyle instanceof SafeStyle && safeStyle.constructor === SafeStyle) {
        return safeStyle.privateDoNotAccessOrElseSafeStyleWrappedValue_;
      } else {
        fail(`expected object of type SafeStyle, got '${safeStyle}` + "' of type " + goog.typeOf(safeStyle));
        return "type_error:SafeStyle";
      }
    }
    static createSafeStyleSecurityPrivateDoNotAccessOrElse(style) {
      return new SafeStyle(style, CONSTRUCTOR_TOKEN_PRIVATE);
    }
    static create(map) {
      let style = "";
      for (let name in map) {
        if (Object.prototype.hasOwnProperty.call(map, name)) {
          if (!/^[-_a-zA-Z0-9]+$/.test(name)) {
            throw new Error(`Name allows only [-_a-zA-Z0-9], got: ${name}`);
          }
          let value = map[name];
          if (value == null) {
            continue;
          }
          if (Array.isArray(value)) {
            value = value.map(sanitizePropertyValue).join(" ");
          } else {
            value = sanitizePropertyValue(value);
          }
          style += `${name}:${value};`;
        }
      }
      if (!style) {
        return SafeStyle.EMPTY;
      }
      return SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(style);
    }
    static concat(var_args) {
      let style = "";
      const addArgument = argument => {
        if (Array.isArray(argument)) {
          argument.forEach(addArgument);
        } else {
          style += SafeStyle.unwrap(argument);
        }
      };
      Array.prototype.forEach.call(arguments, addArgument);
      if (!style) {
        return SafeStyle.EMPTY;
      }
      return SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(style);
    }
  }
  SafeStyle.EMPTY = SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
  SafeStyle.INNOCUOUS_STRING = "zClosurez";
  SafeStyle.PropertyValue;
  SafeStyle.PropertyMap;
  function sanitizePropertyValue(value) {
    if (value instanceof SafeUrl) {
      const url = SafeUrl.unwrap(value);
      return 'url("' + url.replace(/</g, "%3c").replace(/[\\"]/g, "\\$\x26") + '")';
    }
    const result = value instanceof Const ? Const.unwrap(value) : sanitizePropertyValueString(String(value));
    if (/[{;}]/.test(result)) {
      throw new AssertionError("Value does not allow [{;}], got: %s.", [result]);
    }
    return result;
  }
  function sanitizePropertyValueString(value) {
    const valueWithoutFunctions = value.replace(FUNCTIONS_RE, "$1").replace(FUNCTIONS_RE, "$1").replace(URL_RE, "url");
    if (!VALUE_RE.test(valueWithoutFunctions)) {
      fail(`String value allows only ${VALUE_ALLOWED_CHARS}` + " and simple functions, got: " + value);
      return SafeStyle.INNOCUOUS_STRING;
    } else if (COMMENT_RE.test(value)) {
      fail(`String value disallows comments, got: ${value}`);
      return SafeStyle.INNOCUOUS_STRING;
    } else if (!hasBalancedQuotes(value)) {
      fail(`String value requires balanced quotes, got: ${value}`);
      return SafeStyle.INNOCUOUS_STRING;
    } else if (!hasBalancedSquareBrackets(value)) {
      fail("String value requires balanced square brackets and one" + " identifier per pair of brackets, got: " + value);
      return SafeStyle.INNOCUOUS_STRING;
    }
    return sanitizeUrl(value);
  }
  function hasBalancedQuotes(value) {
    let outsideSingle = true;
    let outsideDouble = true;
    for (let i = 0; i < value.length; i++) {
      const c = value.charAt(i);
      if (c == "'" && outsideDouble) {
        outsideSingle = !outsideSingle;
      } else if (c == '"' && outsideSingle) {
        outsideDouble = !outsideDouble;
      }
    }
    return outsideSingle && outsideDouble;
  }
  function hasBalancedSquareBrackets(value) {
    let outside = true;
    const tokenRe = /^[-_a-zA-Z0-9]$/;
    for (let i = 0; i < value.length; i++) {
      const c = value.charAt(i);
      if (c == "]") {
        if (outside) {
          return false;
        }
        outside = true;
      } else if (c == "[") {
        if (!outside) {
          return false;
        }
        outside = false;
      } else if (!outside && !tokenRe.test(c)) {
        return false;
      }
    }
    return outside;
  }
  const VALUE_ALLOWED_CHARS = "[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]";
  const VALUE_RE = new RegExp(`^${VALUE_ALLOWED_CHARS}+\$`);
  const URL_RE = new RegExp("\\b(url\\([ \t\n]*)(" + "'[ -\x26(-\\[\\]-~]*'" + '|"[ !#-\\[\\]-~]*"' + "|[!#-\x26*-\\[\\]-~]*" + ")([ \t\n]*\\))", "g");
  const ALLOWED_FUNCTIONS = ["calc", "cubic-bezier", "fit-content", "hsl", "hsla", "linear-gradient", "matrix", "minmax", "radial-gradient", "repeat", "rgb", "rgba", "(rotate|scale|translate)(X|Y|Z|3d)?", "steps", "var",];
  const FUNCTIONS_RE = new RegExp("\\b(" + ALLOWED_FUNCTIONS.join("|") + ")" + "\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)", "g");
  const COMMENT_RE = /\/\*/;
  function sanitizeUrl(value) {
    return value.replace(URL_RE, (match, before, url, after) => {
      let quote = "";
      url = url.replace(/^(['"])(.*)\1$/, (match, start, inside) => {
        quote = start;
        return inside;
      });
      const sanitized = SafeUrl.sanitize(url).getTypedStringValue();
      return before + quote + sanitized + quote + after;
    });
  }
  exports = SafeStyle;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.html.safestyle.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.object");
  goog.module.declareLegacyNamespace();
  function forEach(obj, f, opt_obj) {
    for (const key in obj) {
      f.call(opt_obj, obj[key], key, obj);
    }
  }
  function filter(obj, f, opt_obj) {
    const res = {};
    for (const key in obj) {
      if (f.call(opt_obj, obj[key], key, obj)) {
        res[key] = obj[key];
      }
    }
    return res;
  }
  function map(obj, f, opt_obj) {
    const res = {};
    for (const key in obj) {
      res[key] = f.call(opt_obj, obj[key], key, obj);
    }
    return res;
  }
  function some(obj, f, opt_obj) {
    for (const key in obj) {
      if (f.call(opt_obj, obj[key], key, obj)) {
        return true;
      }
    }
    return false;
  }
  function every(obj, f, opt_obj) {
    for (const key in obj) {
      if (!f.call(opt_obj, obj[key], key, obj)) {
        return false;
      }
    }
    return true;
  }
  function getCount(obj) {
    let rv = 0;
    for (const key in obj) {
      rv++;
    }
    return rv;
  }
  function getAnyKey(obj) {
    for (const key in obj) {
      return key;
    }
  }
  function getAnyValue(obj) {
    for (const key in obj) {
      return obj[key];
    }
  }
  function contains(obj, val) {
    return containsValue(obj, val);
  }
  function getValues(obj) {
    const res = [];
    let i = 0;
    for (const key in obj) {
      res[i++] = obj[key];
    }
    return res;
  }
  function getKeys(obj) {
    const res = [];
    let i = 0;
    for (const key in obj) {
      res[i++] = key;
    }
    return res;
  }
  function getValueByKeys(obj, var_args) {
    const isArrayLike = goog.isArrayLike(var_args);
    const keys = isArrayLike ? var_args : arguments;
    for (let i = isArrayLike ? 0 : 1; i < keys.length; i++) {
      if (obj == null) {
        return undefined;
      }
      obj = obj[keys[i]];
    }
    return obj;
  }
  function containsKey(obj, key) {
    return obj !== null && key in obj;
  }
  function containsValue(obj, val) {
    for (const key in obj) {
      if (obj[key] == val) {
        return true;
      }
    }
    return false;
  }
  function findKey(obj, f, thisObj = undefined) {
    for (const key in obj) {
      if (f.call(thisObj, obj[key], key, obj)) {
        return key;
      }
    }
    return undefined;
  }
  function findValue(obj, f, thisObj = undefined) {
    const key = findKey(obj, f, thisObj);
    return key && obj[key];
  }
  function isEmpty(obj) {
    for (const key in obj) {
      return false;
    }
    return true;
  }
  function clear(obj) {
    for (const i in obj) {
      delete obj[i];
    }
  }
  function remove(obj, key) {
    let rv;
    if (rv = key in obj) {
      delete obj[key];
    }
    return rv;
  }
  function add(obj, key, val) {
    if (obj !== null && key in obj) {
      throw new Error(`The object already contains the key "${key}"`);
    }
    set(obj, key, val);
  }
  function get(obj, key, val = undefined) {
    if (obj !== null && key in obj) {
      return obj[key];
    }
    return val;
  }
  function set(obj, key, value) {
    obj[key] = value;
  }
  function setIfUndefined(obj, key, value) {
    return key in obj ? obj[key] : obj[key] = value;
  }
  function setWithReturnValueIfNotSet(obj, key, f) {
    if (key in obj) {
      return obj[key];
    }
    const val = f();
    obj[key] = val;
    return val;
  }
  function equals(a, b) {
    for (const k in a) {
      if (!(k in b) || a[k] !== b[k]) {
        return false;
      }
    }
    for (const k in b) {
      if (!(k in a)) {
        return false;
      }
    }
    return true;
  }
  function clone(obj) {
    const res = {};
    for (const key in obj) {
      res[key] = obj[key];
    }
    return res;
  }
  function unsafeClone(obj) {
    if (!obj || typeof obj !== "object") {
      return obj;
    }
    if (typeof obj.clone === "function") {
      return obj.clone();
    }
    if (typeof Map !== "undefined" && obj instanceof Map) {
      return new Map(obj);
    } else if (typeof Set !== "undefined" && obj instanceof Set) {
      return new Set(obj);
    } else if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    const clone = Array.isArray(obj) ? [] : typeof ArrayBuffer === "function" && typeof ArrayBuffer.isView === "function" && ArrayBuffer.isView(obj) && !(obj instanceof DataView) ? new obj.constructor(obj.length) : {};
    for (const key in obj) {
      clone[key] = unsafeClone(obj[key]);
    }
    return clone;
  }
  function transpose(obj) {
    const transposed = {};
    for (const key in obj) {
      transposed[obj[key]] = key;
    }
    return transposed;
  }
  const PROTOTYPE_FIELDS = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf",];
  function extend(target, var_args) {
    let key;
    let source;
    for (let i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (key in source) {
        target[key] = source[key];
      }
      for (let j = 0; j < PROTOTYPE_FIELDS.length; j++) {
        key = PROTOTYPE_FIELDS[j];
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
  }
  function create(var_args) {
    const argLength = arguments.length;
    if (argLength == 1 && Array.isArray(arguments[0])) {
      return create.apply(null, arguments[0]);
    }
    if (argLength % 2) {
      throw new Error("Uneven number of arguments");
    }
    const rv = {};
    for (let i = 0; i < argLength; i += 2) {
      rv[arguments[i]] = arguments[i + 1];
    }
    return rv;
  }
  function createSet(var_args) {
    const argLength = arguments.length;
    if (argLength == 1 && Array.isArray(arguments[0])) {
      return createSet.apply(null, arguments[0]);
    }
    const rv = {};
    for (let i = 0; i < argLength; i++) {
      rv[arguments[i]] = true;
    }
    return rv;
  }
  function createImmutableView(obj) {
    let result = obj;
    if (Object.isFrozen && !Object.isFrozen(obj)) {
      result = Object.create(obj);
      Object.freeze(result);
    }
    return result;
  }
  function isImmutableView(obj) {
    return !!Object.isFrozen && Object.isFrozen(obj);
  }
  function getAllPropertyNames(obj, includeObjectPrototype = undefined, includeFunctionPrototype = undefined) {
    if (!obj) {
      return [];
    }
    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
      return getKeys(obj);
    }
    const visitedSet = {};
    let proto = obj;
    while (proto && (proto !== Object.prototype || !!includeObjectPrototype) && (proto !== Function.prototype || !!includeFunctionPrototype)) {
      const names = Object.getOwnPropertyNames(proto);
      for (let i = 0; i < names.length; i++) {
        visitedSet[names[i]] = true;
      }
      proto = Object.getPrototypeOf(proto);
    }
    return getKeys(visitedSet);
  }
  function getSuperClass(constructor) {
    const proto = Object.getPrototypeOf(constructor.prototype);
    return proto && proto.constructor;
  }
  exports = {add, clear, clone, contains, containsKey, containsValue, create, createImmutableView, createSet, equals, every, extend, filter, findKey, findValue, forEach, get, getAllPropertyNames, getAnyKey, getAnyValue, getCount, getKeys, getSuperClass, getValueByKeys, getValues, isEmpty, isImmutableView, map, remove, set, setIfUndefined, setWithReturnValueIfNotSet, some, transpose, unsafeClone,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.object.object.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.html.SafeStyleSheet");
  goog.module.declareLegacyNamespace();
  const Const = goog.require("goog.string.Const");
  const SafeStyle = goog.require("goog.html.SafeStyle");
  const TypedString = goog.require("goog.string.TypedString");
  const googObject = goog.require("goog.object");
  const {assert, fail} = goog.require("goog.asserts");
  const {contains} = goog.require("goog.string.internal");
  const CONSTRUCTOR_TOKEN_PRIVATE = {};
  class SafeStyleSheet {
    constructor(value, token) {
      this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = token === CONSTRUCTOR_TOKEN_PRIVATE ? value : "";
      this.implementsGoogStringTypedString = true;
    }
    toString() {
      return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_.toString();
    }
    static createRule(selector, style) {
      if (contains(selector, "\x3c")) {
        throw new Error(`Selector does not allow '<', got: ${selector}`);
      }
      const selectorToCheck = selector.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
      if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(selectorToCheck)) {
        throw new Error("Selector allows only [-_a-zA-Z0-9#.:* ,\x3e+~[\\]()\x3d^$|] and " + "strings, got: " + selector);
      }
      if (!SafeStyleSheet.hasBalancedBrackets_(selectorToCheck)) {
        throw new Error("() and [] in selector must be balanced, got: " + selector);
      }
      if (!(style instanceof SafeStyle)) {
        style = SafeStyle.create(style);
      }
      const styleSheet = `${selector}{` + SafeStyle.unwrap(style).replace(/</g, "\\3C ") + "}";
      return SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheet);
    }
    static hasBalancedBrackets_(s) {
      const brackets = {"(":")", "[":"]"};
      const expectedBrackets = [];
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (brackets[ch]) {
          expectedBrackets.push(brackets[ch]);
        } else if (googObject.contains(brackets, ch)) {
          if (expectedBrackets.pop() != ch) {
            return false;
          }
        }
      }
      return expectedBrackets.length == 0;
    }
    static concat(var_args) {
      let result = "";
      const addArgument = argument => {
        if (Array.isArray(argument)) {
          argument.forEach(addArgument);
        } else {
          result += SafeStyleSheet.unwrap(argument);
        }
      };
      Array.prototype.forEach.call(arguments, addArgument);
      return SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(result);
    }
    static fromConstant(styleSheet) {
      const styleSheetString = Const.unwrap(styleSheet);
      if (styleSheetString.length === 0) {
        return SafeStyleSheet.EMPTY;
      }
      assert(!contains(styleSheetString, "\x3c"), `Forbidden '<' character in style sheet string: ${styleSheetString}`);
      return SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheetString);
    }
    getTypedStringValue() {
      return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    }
    static unwrap(safeStyleSheet) {
      if (safeStyleSheet instanceof SafeStyleSheet && safeStyleSheet.constructor === SafeStyleSheet) {
        return safeStyleSheet.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
      } else {
        fail("expected object of type SafeStyleSheet, got '" + safeStyleSheet + "' of type " + goog.typeOf(safeStyleSheet));
        return "type_error:SafeStyleSheet";
      }
    }
    static createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheet) {
      return new SafeStyleSheet(styleSheet, CONSTRUCTOR_TOKEN_PRIVATE);
    }
  }
  SafeStyleSheet.EMPTY = SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
  exports = SafeStyleSheet;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.html.safestylesheet.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.flags");
  goog.module.declareLegacyNamespace();
  exports.USE_USER_AGENT_CLIENT_HINTS = false;
  exports.ASYNC_THROW_ON_UNICODE_TO_BYTE = false;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.flags.flags.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent");
  goog.module.declareLegacyNamespace();
  const flags = goog.require("goog.flags");
  const USE_CLIENT_HINTS_OVERRIDE = goog.define("goog.labs.userAgent.USE_CLIENT_HINTS_OVERRIDE", "");
  const USE_CLIENT_HINTS = goog.define("goog.labs.userAgent.USE_CLIENT_HINTS", false);
  let forceClientHintsInTests = false;
  exports.setUseClientHintsForTesting = use => {
    forceClientHintsInTests = use;
  };
  const useClientHintsRuntimeOverride = USE_CLIENT_HINTS_OVERRIDE ? !!goog.getObjectByName(USE_CLIENT_HINTS_OVERRIDE) : false;
  exports.useClientHints = () => {
    return flags.USE_USER_AGENT_CLIENT_HINTS || USE_CLIENT_HINTS || useClientHintsRuntimeOverride || forceClientHintsInTests;
  };
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.labs.useragent.useragent.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent.util");
  goog.module.declareLegacyNamespace();
  const {caseInsensitiveContains, contains} = goog.require("goog.string.internal");
  const {useClientHints} = goog.require("goog.labs.userAgent");
  const ASSUME_CLIENT_HINTS_SUPPORT = false;
  function getNativeUserAgentString() {
    const navigator = getNavigator();
    if (navigator) {
      const userAgent = navigator.userAgent;
      if (userAgent) {
        return userAgent;
      }
    }
    return "";
  }
  function getNativeUserAgentData() {
    const navigator = getNavigator();
    if (navigator) {
      return navigator.userAgentData || null;
    }
    return null;
  }
  function getNavigator() {
    return goog.global.navigator;
  }
  let userAgentInternal = null;
  let userAgentDataInternal = getNativeUserAgentData();
  function setUserAgent(userAgent = undefined) {
    userAgentInternal = typeof userAgent === "string" ? userAgent : getNativeUserAgentString();
  }
  function getUserAgent() {
    return userAgentInternal == null ? getNativeUserAgentString() : userAgentInternal;
  }
  function setUserAgentData(userAgentData) {
    userAgentDataInternal = userAgentData;
  }
  function resetUserAgentData() {
    userAgentDataInternal = getNativeUserAgentData();
  }
  function getUserAgentData() {
    return userAgentDataInternal;
  }
  function matchUserAgentDataBrand(str) {
    if (!useClientHints()) {
      return false;
    }
    const data = getUserAgentData();
    if (!data) {
      return false;
    }
    return data.brands.some(({brand}) => brand && contains(brand, str));
  }
  function matchUserAgent(str) {
    const userAgent = getUserAgent();
    return contains(userAgent, str);
  }
  function matchUserAgentIgnoreCase(str) {
    const userAgent = getUserAgent();
    return caseInsensitiveContains(userAgent, str);
  }
  function extractVersionTuples(userAgent) {
    const versionRegExp = new RegExp("([A-Z][\\w ]+)" + "/" + "([^\\s]+)" + "\\s*" + "(?:\\((.*?)\\))?", "g");
    const data = [];
    let match;
    while (match = versionRegExp.exec(userAgent)) {
      data.push([match[1], match[2], match[3] || undefined]);
    }
    return data;
  }
  exports = {ASSUME_CLIENT_HINTS_SUPPORT, extractVersionTuples, getNativeUserAgentString, getUserAgent, getUserAgentData, matchUserAgent, matchUserAgentDataBrand, matchUserAgentIgnoreCase, resetUserAgentData, setUserAgent, setUserAgentData,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.labs.useragent.util.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent.highEntropy.highEntropyValue");
  const util = goog.require("goog.labs.userAgent.util");
  const {compareVersions} = goog.require("goog.string.internal");
  class AsyncValue {
    getIfLoaded() {
    }
    load() {
    }
  }
  exports.AsyncValue = AsyncValue;
  class HighEntropyValue {
    constructor(key) {
      this.key_ = key;
      this.value_ = undefined;
      this.promise_ = undefined;
      this.pending_ = false;
    }
    getIfLoaded() {
      const userAgentData = util.getUserAgentData();
      if (!userAgentData) {
        return undefined;
      }
      return this.value_;
    }
    async load() {
      const userAgentData = util.getUserAgentData();
      if (!userAgentData) {
        return undefined;
      }
      if (!this.promise_) {
        this.pending_ = true;
        this.promise_ = (async() => {
          try {
            const dataValues = await userAgentData.getHighEntropyValues([this.key_]);
            this.value_ = dataValues[this.key_];
            return this.value_;
          } finally {
            this.pending_ = false;
          }
        })();
      }
      return await this.promise_;
    }
    resetForTesting() {
      if (this.pending_) {
        throw new Error("Unsafe call to resetForTesting");
      }
      this.promise_ = undefined;
      this.value_ = undefined;
      this.pending_ = false;
    }
  }
  exports.HighEntropyValue = HighEntropyValue;
  class Version {
    constructor(versionString) {
      this.versionString_ = versionString;
    }
    toVersionStringForLogging() {
      return this.versionString_;
    }
    isAtLeast(version) {
      return compareVersions(this.versionString_, version) >= 0;
    }
  }
  exports.Version = Version;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.labs.useragent.highentropy.highentropyvalue.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent.highEntropy.highEntropyData");
  const {HighEntropyValue} = goog.require("goog.labs.userAgent.highEntropy.highEntropyValue");
  const fullVersionList = new HighEntropyValue("fullVersionList");
  exports.fullVersionList = fullVersionList;
  const platformVersion = new HighEntropyValue("platformVersion");
  exports.platformVersion = platformVersion;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.labs.useragent.highentropy.highentropydata.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent.browser");
  goog.module.declareLegacyNamespace();
  const util = goog.require("goog.labs.userAgent.util");
  const {AsyncValue, Version} = goog.require("goog.labs.userAgent.highEntropy.highEntropyValue");
  const {assert, assertExists} = goog.require("goog.asserts");
  const {compareVersions} = goog.require("goog.string.internal");
  const {fullVersionList} = goog.require("goog.labs.userAgent.highEntropy.highEntropyData");
  const {useClientHints} = goog.require("goog.labs.userAgent");
  const Brand = {ANDROID_BROWSER:"Android Browser", CHROMIUM:"Chromium", EDGE:"Microsoft Edge", FIREFOX:"Firefox", IE:"Internet Explorer", OPERA:"Opera", SAFARI:"Safari", SILK:"Silk",};
  exports.Brand = Brand;
  function useUserAgentDataBrand(ignoreClientHintsFlag = false) {
    if (util.ASSUME_CLIENT_HINTS_SUPPORT) {
      return true;
    }
    if (!ignoreClientHintsFlag && !useClientHints()) {
      return false;
    }
    const userAgentData = util.getUserAgentData();
    return !!userAgentData && userAgentData.brands.length > 0;
  }
  function hasFullVersionList() {
    return isAtLeast(Brand.CHROMIUM, 98);
  }
  function matchOpera() {
    if (useUserAgentDataBrand()) {
      return false;
    }
    return util.matchUserAgent("Opera");
  }
  function matchIE() {
    if (useUserAgentDataBrand()) {
      return false;
    }
    return util.matchUserAgent("Trident") || util.matchUserAgent("MSIE");
  }
  function matchEdgeHtml() {
    if (useUserAgentDataBrand()) {
      return false;
    }
    return util.matchUserAgent("Edge");
  }
  function matchEdgeChromium() {
    if (useUserAgentDataBrand()) {
      return util.matchUserAgentDataBrand(Brand.EDGE);
    }
    return util.matchUserAgent("Edg/");
  }
  function matchOperaChromium() {
    if (useUserAgentDataBrand()) {
      return util.matchUserAgentDataBrand(Brand.OPERA);
    }
    return util.matchUserAgent("OPR");
  }
  function matchFirefox() {
    return util.matchUserAgent("Firefox") || util.matchUserAgent("FxiOS");
  }
  function matchSafari() {
    return util.matchUserAgent("Safari") && !(matchChrome() || matchCoast() || matchOpera() || matchEdgeHtml() || matchEdgeChromium() || matchOperaChromium() || matchFirefox() || isSilk() || util.matchUserAgent("Android"));
  }
  function matchCoast() {
    if (useUserAgentDataBrand()) {
      return false;
    }
    return util.matchUserAgent("Coast");
  }
  function matchIosWebview() {
    return (util.matchUserAgent("iPad") || util.matchUserAgent("iPhone")) && !matchSafari() && !matchChrome() && !matchCoast() && !matchFirefox() && util.matchUserAgent("AppleWebKit");
  }
  function matchChrome() {
    if (useUserAgentDataBrand()) {
      return util.matchUserAgentDataBrand(Brand.CHROMIUM);
    }
    return (util.matchUserAgent("Chrome") || util.matchUserAgent("CriOS")) && !matchEdgeHtml() || isSilk();
  }
  function matchAndroidBrowser() {
    return util.matchUserAgent("Android") && !(isChrome() || isFirefox() || isOpera() || isSilk());
  }
  const isOpera = matchOpera;
  exports.isOpera = isOpera;
  const isIE = matchIE;
  exports.isIE = isIE;
  const isEdge = matchEdgeHtml;
  exports.isEdge = isEdge;
  const isEdgeChromium = matchEdgeChromium;
  exports.isEdgeChromium = isEdgeChromium;
  const isOperaChromium = matchOperaChromium;
  exports.isOperaChromium = isOperaChromium;
  const isFirefox = matchFirefox;
  exports.isFirefox = isFirefox;
  const isSafari = matchSafari;
  exports.isSafari = isSafari;
  const isCoast = matchCoast;
  exports.isCoast = isCoast;
  const isIosWebview = matchIosWebview;
  exports.isIosWebview = isIosWebview;
  const isChrome = matchChrome;
  exports.isChrome = isChrome;
  const isAndroidBrowser = matchAndroidBrowser;
  exports.isAndroidBrowser = isAndroidBrowser;
  function isSilk() {
    return util.matchUserAgent("Silk");
  }
  exports.isSilk = isSilk;
  function createVersionMap(versionTuples) {
    const versionMap = {};
    versionTuples.forEach(tuple => {
      const key = tuple[0];
      const value = tuple[1];
      versionMap[key] = value;
    });
    return keys => versionMap[keys.find(key => key in versionMap)] || "";
  }
  function getVersion() {
    const userAgentString = util.getUserAgent();
    if (isIE()) {
      return getIEVersion(userAgentString);
    }
    const versionTuples = util.extractVersionTuples(userAgentString);
    const lookUpValueWithKeys = createVersionMap(versionTuples);
    if (isOpera()) {
      return lookUpValueWithKeys(["Version", "Opera"]);
    }
    if (isEdge()) {
      return lookUpValueWithKeys(["Edge"]);
    }
    if (isEdgeChromium()) {
      return lookUpValueWithKeys(["Edg"]);
    }
    if (isSilk()) {
      return lookUpValueWithKeys(["Silk"]);
    }
    if (isChrome()) {
      return lookUpValueWithKeys(["Chrome", "CriOS", "HeadlessChrome"]);
    }
    const tuple = versionTuples[2];
    return tuple && tuple[1] || "";
  }
  exports.getVersion = getVersion;
  function isVersionOrHigher(version) {
    return compareVersions(getVersion(), version) >= 0;
  }
  exports.isVersionOrHigher = isVersionOrHigher;
  function getIEVersion(userAgent) {
    const rv = /rv: *([\d\.]*)/.exec(userAgent);
    if (rv && rv[1]) {
      return rv[1];
    }
    let version = "";
    const msie = /MSIE +([\d\.]+)/.exec(userAgent);
    if (msie && msie[1]) {
      const tridentVersion = /Trident\/(\d.\d)/.exec(userAgent);
      if (msie[1] == "7.0") {
        if (tridentVersion && tridentVersion[1]) {
          switch(tridentVersion[1]) {
            case "4.0":
              version = "8.0";
              break;
            case "5.0":
              version = "9.0";
              break;
            case "6.0":
              version = "10.0";
              break;
            case "7.0":
              version = "11.0";
              break;
          }
        } else {
          version = "7.0";
        }
      } else {
        version = msie[1];
      }
    }
    return version;
  }
  function getFullVersionFromUserAgentString(browser) {
    const userAgentString = util.getUserAgent();
    if (browser === Brand.IE) {
      return isIE() ? getIEVersion(userAgentString) : "";
    }
    const versionTuples = util.extractVersionTuples(userAgentString);
    const lookUpValueWithKeys = createVersionMap(versionTuples);
    switch(browser) {
      case Brand.OPERA:
        if (isOpera()) {
          return lookUpValueWithKeys(["Version", "Opera"]);
        } else if (isOperaChromium()) {
          return lookUpValueWithKeys(["OPR"]);
        }
        break;
      case Brand.EDGE:
        if (isEdge()) {
          return lookUpValueWithKeys(["Edge"]);
        } else if (isEdgeChromium()) {
          return lookUpValueWithKeys(["Edg"]);
        }
        break;
      case Brand.CHROMIUM:
        if (isChrome()) {
          return lookUpValueWithKeys(["Chrome", "CriOS", "HeadlessChrome"]);
        }
        break;
    }
    if (browser === Brand.FIREFOX && isFirefox() || browser === Brand.SAFARI && isSafari() || browser === Brand.ANDROID_BROWSER && isAndroidBrowser() || browser === Brand.SILK && isSilk()) {
      const tuple = versionTuples[2];
      return tuple && tuple[1] || "";
    }
    return "";
  }
  function versionOf_(browser) {
    let versionParts;
    if (useUserAgentDataBrand() && browser !== Brand.SILK) {
      const data = util.getUserAgentData();
      const matchingBrand = data.brands.find(({brand}) => brand === browser);
      if (!matchingBrand || !matchingBrand.version) {
        return NaN;
      }
      versionParts = matchingBrand.version.split(".");
    } else {
      const fullVersion = getFullVersionFromUserAgentString(browser);
      if (fullVersion === "") {
        return NaN;
      }
      versionParts = fullVersion.split(".");
    }
    if (versionParts.length === 0) {
      return NaN;
    }
    const majorVersion = versionParts[0];
    return Number(majorVersion);
  }
  function isAtLeast(brand, majorVersion) {
    assert(Math.floor(majorVersion) === majorVersion, "Major version must be an integer");
    return versionOf_(brand) >= majorVersion;
  }
  exports.isAtLeast = isAtLeast;
  function isAtMost(brand, majorVersion) {
    assert(Math.floor(majorVersion) === majorVersion, "Major version must be an integer");
    return versionOf_(brand) <= majorVersion;
  }
  exports.isAtMost = isAtMost;
  class HighEntropyBrandVersion {
    constructor(brand, useUach, fallbackVersion) {
      this.brand_ = brand;
      this.version_ = new Version(fallbackVersion);
      this.useUach_ = useUach;
    }
    getIfLoaded() {
      if (this.useUach_) {
        const loadedVersionList = fullVersionList.getIfLoaded();
        if (loadedVersionList !== undefined) {
          const matchingBrand = loadedVersionList.find(({brand}) => this.brand_ === brand);
          assertExists(matchingBrand);
          return new Version(matchingBrand.version);
        }
      }
      if (preUachHasLoaded) {
        return this.version_;
      }
      return;
    }
    async load() {
      if (this.useUach_) {
        const loadedVersionList = await fullVersionList.load();
        if (loadedVersionList !== undefined) {
          const matchingBrand = loadedVersionList.find(({brand}) => this.brand_ === brand);
          assertExists(matchingBrand);
          return new Version(matchingBrand.version);
        }
      } else {
        await 0;
      }
      preUachHasLoaded = true;
      return this.version_;
    }
  }
  let preUachHasLoaded = false;
  async function loadFullVersions() {
    if (useUserAgentDataBrand(true)) {
      await fullVersionList.load();
    }
    preUachHasLoaded = true;
  }
  exports.loadFullVersions = loadFullVersions;
  exports.resetForTesting = () => {
    preUachHasLoaded = false;
    fullVersionList.resetForTesting();
  };
  function fullVersionOf(browser) {
    let fallbackVersionString = "";
    if (!hasFullVersionList()) {
      fallbackVersionString = getFullVersionFromUserAgentString(browser);
    }
    const useUach = browser !== Brand.SILK && useUserAgentDataBrand(true);
    if (useUach) {
      const data = util.getUserAgentData();
      if (!data.brands.find(({brand}) => brand === browser)) {
        return undefined;
      }
    } else if (fallbackVersionString === "") {
      return undefined;
    }
    return new HighEntropyBrandVersion(browser, useUach, fallbackVersionString);
  }
  exports.fullVersionOf = fullVersionOf;
  function getVersionStringForLogging(browser) {
    if (useUserAgentDataBrand(true)) {
      const fullVersionObj = fullVersionOf(browser);
      if (fullVersionObj) {
        const fullVersion = fullVersionObj.getIfLoaded();
        if (fullVersion) {
          return fullVersion.toVersionStringForLogging();
        }
        const data = util.getUserAgentData();
        const matchingBrand = data.brands.find(({brand}) => brand === browser);
        assertExists(matchingBrand);
        return matchingBrand.version;
      }
      return "";
    } else {
      return getFullVersionFromUserAgentString(browser);
    }
  }
  exports.getVersionStringForLogging = getVersionStringForLogging;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.labs.useragent.browser.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.array");
  goog.module.declareLegacyNamespace();
  const asserts = goog.require("goog.asserts");
  goog.NATIVE_ARRAY_PROTOTYPES = goog.define("goog.NATIVE_ARRAY_PROTOTYPES", goog.TRUSTED_SITE);
  const ASSUME_NATIVE_FUNCTIONS = goog.define("goog.array.ASSUME_NATIVE_FUNCTIONS", goog.FEATURESET_YEAR > 2012);
  exports.ASSUME_NATIVE_FUNCTIONS = ASSUME_NATIVE_FUNCTIONS;
  function peek(array) {
    return array[array.length - 1];
  }
  exports.peek = peek;
  exports.last = peek;
  const indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(arr, obj, opt_fromIndex) {
    asserts.assert(arr.length != null);
    return Array.prototype.indexOf.call(arr, obj, opt_fromIndex);
  } : function(arr, obj, opt_fromIndex) {
    const fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
    if (typeof arr === "string") {
      if (typeof obj !== "string" || obj.length != 1) {
        return -1;
      }
      return arr.indexOf(obj, fromIndex);
    }
    for (let i = fromIndex; i < arr.length; i++) {
      if (i in arr && arr[i] === obj) {
        return i;
      }
    }
    return -1;
  };
  exports.indexOf = indexOf;
  const lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
    asserts.assert(arr.length != null);
    const fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
    return Array.prototype.lastIndexOf.call(arr, obj, fromIndex);
  } : function(arr, obj, opt_fromIndex) {
    let fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
    if (fromIndex < 0) {
      fromIndex = Math.max(0, arr.length + fromIndex);
    }
    if (typeof arr === "string") {
      if (typeof obj !== "string" || obj.length != 1) {
        return -1;
      }
      return arr.lastIndexOf(obj, fromIndex);
    }
    for (let i = fromIndex; i >= 0; i--) {
      if (i in arr && arr[i] === obj) {
        return i;
      }
    }
    return -1;
  };
  exports.lastIndexOf = lastIndexOf;
  const forEach = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(arr, f, opt_obj) {
    asserts.assert(arr.length != null);
    Array.prototype.forEach.call(arr, f, opt_obj);
  } : function(arr, f, opt_obj) {
    const l = arr.length;
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = 0; i < l; i++) {
      if (i in arr2) {
        f.call(opt_obj, arr2[i], i, arr);
      }
    }
  };
  exports.forEach = forEach;
  function forEachRight(arr, f, opt_obj) {
    const l = arr.length;
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = l - 1; i >= 0; --i) {
      if (i in arr2) {
        f.call(opt_obj, arr2[i], i, arr);
      }
    }
  }
  exports.forEachRight = forEachRight;
  const filter = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(arr, f, opt_obj) {
    asserts.assert(arr.length != null);
    return Array.prototype.filter.call(arr, f, opt_obj);
  } : function(arr, f, opt_obj) {
    const l = arr.length;
    const res = [];
    let resLength = 0;
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = 0; i < l; i++) {
      if (i in arr2) {
        const val = arr2[i];
        if (f.call(opt_obj, val, i, arr)) {
          res[resLength++] = val;
        }
      }
    }
    return res;
  };
  exports.filter = filter;
  const map = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(arr, f, opt_obj) {
    asserts.assert(arr.length != null);
    return Array.prototype.map.call(arr, f, opt_obj);
  } : function(arr, f, opt_obj) {
    const l = arr.length;
    const res = new Array(l);
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = 0; i < l; i++) {
      if (i in arr2) {
        res[i] = f.call(opt_obj, arr2[i], i, arr);
      }
    }
    return res;
  };
  exports.map = map;
  const reduce = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(arr, f, val, opt_obj) {
    asserts.assert(arr.length != null);
    if (opt_obj) {
      f = goog.bind(f, opt_obj);
    }
    return Array.prototype.reduce.call(arr, f, val);
  } : function(arr, f, val, opt_obj) {
    let rval = val;
    forEach(arr, function(val, index) {
      rval = f.call(opt_obj, rval, val, index, arr);
    });
    return rval;
  };
  exports.reduce = reduce;
  const reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(arr, f, val, opt_obj) {
    asserts.assert(arr.length != null);
    asserts.assert(f != null);
    if (opt_obj) {
      f = goog.bind(f, opt_obj);
    }
    return Array.prototype.reduceRight.call(arr, f, val);
  } : function(arr, f, val, opt_obj) {
    let rval = val;
    forEachRight(arr, function(val, index) {
      rval = f.call(opt_obj, rval, val, index, arr);
    });
    return rval;
  };
  exports.reduceRight = reduceRight;
  const some = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(arr, f, opt_obj) {
    asserts.assert(arr.length != null);
    return Array.prototype.some.call(arr, f, opt_obj);
  } : function(arr, f, opt_obj) {
    const l = arr.length;
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = 0; i < l; i++) {
      if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
        return true;
      }
    }
    return false;
  };
  exports.some = some;
  const every = goog.NATIVE_ARRAY_PROTOTYPES && (ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(arr, f, opt_obj) {
    asserts.assert(arr.length != null);
    return Array.prototype.every.call(arr, f, opt_obj);
  } : function(arr, f, opt_obj) {
    const l = arr.length;
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = 0; i < l; i++) {
      if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
        return false;
      }
    }
    return true;
  };
  exports.every = every;
  function count(arr, f, opt_obj) {
    let count = 0;
    forEach(arr, function(element, index, arr) {
      if (f.call(opt_obj, element, index, arr)) {
        ++count;
      }
    }, opt_obj);
    return count;
  }
  exports.count = count;
  function find(arr, f, opt_obj) {
    const i = findIndex(arr, f, opt_obj);
    return i < 0 ? null : typeof arr === "string" ? arr.charAt(i) : arr[i];
  }
  exports.find = find;
  function findIndex(arr, f, opt_obj) {
    const l = arr.length;
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = 0; i < l; i++) {
      if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }
  exports.findIndex = findIndex;
  function findRight(arr, f, opt_obj) {
    const i = findIndexRight(arr, f, opt_obj);
    return i < 0 ? null : typeof arr === "string" ? arr.charAt(i) : arr[i];
  }
  exports.findRight = findRight;
  function findIndexRight(arr, f, opt_obj) {
    const l = arr.length;
    const arr2 = typeof arr === "string" ? arr.split("") : arr;
    for (let i = l - 1; i >= 0; i--) {
      if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }
  exports.findIndexRight = findIndexRight;
  function contains(arr, obj) {
    return indexOf(arr, obj) >= 0;
  }
  exports.contains = contains;
  function isEmpty(arr) {
    return arr.length == 0;
  }
  exports.isEmpty = isEmpty;
  function clear(arr) {
    if (!Array.isArray(arr)) {
      for (let i = arr.length - 1; i >= 0; i--) {
        delete arr[i];
      }
    }
    arr.length = 0;
  }
  exports.clear = clear;
  function insert(arr, obj) {
    if (!contains(arr, obj)) {
      arr.push(obj);
    }
  }
  exports.insert = insert;
  function insertAt(arr, obj, opt_i) {
    splice(arr, opt_i, 0, obj);
  }
  exports.insertAt = insertAt;
  function insertArrayAt(arr, elementsToAdd, opt_i) {
    goog.partial(splice, arr, opt_i, 0).apply(null, elementsToAdd);
  }
  exports.insertArrayAt = insertArrayAt;
  function insertBefore(arr, obj, opt_obj2) {
    let i;
    if (arguments.length == 2 || (i = indexOf(arr, opt_obj2)) < 0) {
      arr.push(obj);
    } else {
      insertAt(arr, obj, i);
    }
  }
  exports.insertBefore = insertBefore;
  function remove(arr, obj) {
    const i = indexOf(arr, obj);
    let rv;
    if (rv = i >= 0) {
      removeAt(arr, i);
    }
    return rv;
  }
  exports.remove = remove;
  function removeLast(arr, obj) {
    const i = lastIndexOf(arr, obj);
    if (i >= 0) {
      removeAt(arr, i);
      return true;
    }
    return false;
  }
  exports.removeLast = removeLast;
  function removeAt(arr, i) {
    asserts.assert(arr.length != null);
    return Array.prototype.splice.call(arr, i, 1).length == 1;
  }
  exports.removeAt = removeAt;
  function removeIf(arr, f, opt_obj) {
    const i = findIndex(arr, f, opt_obj);
    if (i >= 0) {
      removeAt(arr, i);
      return true;
    }
    return false;
  }
  exports.removeIf = removeIf;
  function removeAllIf(arr, f, opt_obj) {
    let removedCount = 0;
    forEachRight(arr, function(val, index) {
      if (f.call(opt_obj, val, index, arr)) {
        if (removeAt(arr, index)) {
          removedCount++;
        }
      }
    });
    return removedCount;
  }
  exports.removeAllIf = removeAllIf;
  function concat(var_args) {
    return Array.prototype.concat.apply([], arguments);
  }
  exports.concat = concat;
  function join(var_args) {
    return Array.prototype.concat.apply([], arguments);
  }
  exports.join = join;
  function toArray(object) {
    const length = object.length;
    if (length > 0) {
      const rv = new Array(length);
      for (let i = 0; i < length; i++) {
        rv[i] = object[i];
      }
      return rv;
    }
    return [];
  }
  exports.toArray = toArray;
  const clone = toArray;
  exports.clone = clone;
  function extend(arr1, var_args) {
    for (let i = 1; i < arguments.length; i++) {
      const arr2 = arguments[i];
      if (goog.isArrayLike(arr2)) {
        const len1 = arr1.length || 0;
        const len2 = arr2.length || 0;
        arr1.length = len1 + len2;
        for (let j = 0; j < len2; j++) {
          arr1[len1 + j] = arr2[j];
        }
      } else {
        arr1.push(arr2);
      }
    }
  }
  exports.extend = extend;
  function splice(arr, index, howMany, var_args) {
    asserts.assert(arr.length != null);
    return Array.prototype.splice.apply(arr, slice(arguments, 1));
  }
  exports.splice = splice;
  function slice(arr, start, opt_end) {
    asserts.assert(arr.length != null);
    if (arguments.length <= 2) {
      return Array.prototype.slice.call(arr, start);
    } else {
      return Array.prototype.slice.call(arr, start, opt_end);
    }
  }
  exports.slice = slice;
  function removeDuplicates(arr, opt_rv, opt_hashFn) {
    const returnArray = opt_rv || arr;
    const defaultHashFn = function(item) {
      return goog.isObject(item) ? "o" + goog.getUid(item) : (typeof item).charAt(0) + item;
    };
    const hashFn = opt_hashFn || defaultHashFn;
    let cursorInsert = 0;
    let cursorRead = 0;
    const seen = {};
    while (cursorRead < arr.length) {
      const current = arr[cursorRead++];
      const key = hashFn(current);
      if (!Object.prototype.hasOwnProperty.call(seen, key)) {
        seen[key] = true;
        returnArray[cursorInsert++] = current;
      }
    }
    returnArray.length = cursorInsert;
  }
  exports.removeDuplicates = removeDuplicates;
  function binarySearch(arr, target, opt_compareFn) {
    return binarySearch_(arr, opt_compareFn || defaultCompare, false, target);
  }
  exports.binarySearch = binarySearch;
  function binarySelect(arr, evaluator, opt_obj) {
    return binarySearch_(arr, evaluator, true, undefined, opt_obj);
  }
  exports.binarySelect = binarySelect;
  function binarySearch_(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
    let left = 0;
    let right = arr.length;
    let found;
    while (left < right) {
      const middle = left + (right - left >>> 1);
      let compareResult;
      if (isEvaluator) {
        compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr);
      } else {
        compareResult = compareFn(opt_target, arr[middle]);
      }
      if (compareResult > 0) {
        left = middle + 1;
      } else {
        right = middle;
        found = !compareResult;
      }
    }
    return found ? left : -left - 1;
  }
  function sort(arr, opt_compareFn) {
    arr.sort(opt_compareFn || defaultCompare);
  }
  exports.sort = sort;
  function stableSort(arr, opt_compareFn) {
    const compArr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      compArr[i] = {index:i, value:arr[i]};
    }
    const valueCompareFn = opt_compareFn || defaultCompare;
    function stableCompareFn(obj1, obj2) {
      return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
    }
    sort(compArr, stableCompareFn);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = compArr[i].value;
    }
  }
  exports.stableSort = stableSort;
  function sortByKey(arr, keyFn, opt_compareFn) {
    const keyCompareFn = opt_compareFn || defaultCompare;
    sort(arr, function(a, b) {
      return keyCompareFn(keyFn(a), keyFn(b));
    });
  }
  exports.sortByKey = sortByKey;
  function sortObjectsByKey(arr, key, opt_compareFn) {
    sortByKey(arr, function(obj) {
      return obj[key];
    }, opt_compareFn);
  }
  exports.sortObjectsByKey = sortObjectsByKey;
  function isSorted(arr, opt_compareFn, opt_strict) {
    const compare = opt_compareFn || defaultCompare;
    for (let i = 1; i < arr.length; i++) {
      const compareResult = compare(arr[i - 1], arr[i]);
      if (compareResult > 0 || compareResult == 0 && opt_strict) {
        return false;
      }
    }
    return true;
  }
  exports.isSorted = isSorted;
  function equals(arr1, arr2, opt_equalsFn) {
    if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
      return false;
    }
    const l = arr1.length;
    const equalsFn = opt_equalsFn || defaultCompareEquality;
    for (let i = 0; i < l; i++) {
      if (!equalsFn(arr1[i], arr2[i])) {
        return false;
      }
    }
    return true;
  }
  exports.equals = equals;
  function compare3(arr1, arr2, opt_compareFn) {
    const compare = opt_compareFn || defaultCompare;
    const l = Math.min(arr1.length, arr2.length);
    for (let i = 0; i < l; i++) {
      const result = compare(arr1[i], arr2[i]);
      if (result != 0) {
        return result;
      }
    }
    return defaultCompare(arr1.length, arr2.length);
  }
  exports.compare3 = compare3;
  function defaultCompare(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  exports.defaultCompare = defaultCompare;
  function inverseDefaultCompare(a, b) {
    return -defaultCompare(a, b);
  }
  exports.inverseDefaultCompare = inverseDefaultCompare;
  function defaultCompareEquality(a, b) {
    return a === b;
  }
  exports.defaultCompareEquality = defaultCompareEquality;
  function binaryInsert(array, value, opt_compareFn) {
    const index = binarySearch(array, value, opt_compareFn);
    if (index < 0) {
      insertAt(array, value, -(index + 1));
      return true;
    }
    return false;
  }
  exports.binaryInsert = binaryInsert;
  function binaryRemove(array, value, opt_compareFn) {
    const index = binarySearch(array, value, opt_compareFn);
    return index >= 0 ? removeAt(array, index) : false;
  }
  exports.binaryRemove = binaryRemove;
  function bucket(array, sorter, opt_obj) {
    const buckets = {};
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      const key = sorter.call(opt_obj, value, i, array);
      if (key !== undefined) {
        const bucket = buckets[key] || (buckets[key] = []);
        bucket.push(value);
      }
    }
    return buckets;
  }
  exports.bucket = bucket;
  function bucketToMap(array, sorter) {
    const buckets = new Map();
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      const key = sorter(value, i, array);
      if (key !== undefined) {
        let bucket = buckets.get(key);
        if (!bucket) {
          bucket = [];
          buckets.set(key, bucket);
        }
        bucket.push(value);
      }
    }
    return buckets;
  }
  exports.bucketToMap = bucketToMap;
  function toObject(arr, keyFunc, opt_obj) {
    const ret = {};
    forEach(arr, function(element, index) {
      ret[keyFunc.call(opt_obj, element, index, arr)] = element;
    });
    return ret;
  }
  exports.toObject = toObject;
  function toMap(arr, keyFunc) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      map.set(keyFunc(element, i, arr), element);
    }
    return map;
  }
  exports.toMap = toMap;
  function range(startOrEnd, opt_end, opt_step) {
    const array = [];
    let start = 0;
    let end = startOrEnd;
    const step = opt_step || 1;
    if (opt_end !== undefined) {
      start = startOrEnd;
      end = opt_end;
    }
    if (step * (end - start) < 0) {
      return [];
    }
    if (step > 0) {
      for (let i = start; i < end; i += step) {
        array.push(i);
      }
    } else {
      for (let i = start; i > end; i += step) {
        array.push(i);
      }
    }
    return array;
  }
  exports.range = range;
  function repeat(value, n) {
    const array = [];
    for (let i = 0; i < n; i++) {
      array[i] = value;
    }
    return array;
  }
  exports.repeat = repeat;
  function flatten(var_args) {
    const CHUNK_SIZE = 8192;
    const result = [];
    for (let i = 0; i < arguments.length; i++) {
      const element = arguments[i];
      if (Array.isArray(element)) {
        for (let c = 0; c < element.length; c += CHUNK_SIZE) {
          const chunk = slice(element, c, c + CHUNK_SIZE);
          const recurseResult = flatten.apply(null, chunk);
          for (let r = 0; r < recurseResult.length; r++) {
            result.push(recurseResult[r]);
          }
        }
      } else {
        result.push(element);
      }
    }
    return result;
  }
  exports.flatten = flatten;
  function rotate(array, n) {
    asserts.assert(array.length != null);
    if (array.length) {
      n %= array.length;
      if (n > 0) {
        Array.prototype.unshift.apply(array, array.splice(-n, n));
      } else if (n < 0) {
        Array.prototype.push.apply(array, array.splice(0, -n));
      }
    }
    return array;
  }
  exports.rotate = rotate;
  function moveItem(arr, fromIndex, toIndex) {
    asserts.assert(fromIndex >= 0 && fromIndex < arr.length);
    asserts.assert(toIndex >= 0 && toIndex < arr.length);
    const removedItems = Array.prototype.splice.call(arr, fromIndex, 1);
    Array.prototype.splice.call(arr, toIndex, 0, removedItems[0]);
  }
  exports.moveItem = moveItem;
  function zip(var_args) {
    if (!arguments.length) {
      return [];
    }
    const result = [];
    let minLen = arguments[0].length;
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i].length < minLen) {
        minLen = arguments[i].length;
      }
    }
    for (let i = 0; i < minLen; i++) {
      const value = [];
      for (let j = 0; j < arguments.length; j++) {
        value.push(arguments[j][i]);
      }
      result.push(value);
    }
    return result;
  }
  exports.zip = zip;
  function shuffle(arr, opt_randFn) {
    const randFn = opt_randFn || Math.random;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(randFn() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
  exports.shuffle = shuffle;
  function copyByIndex(arr, index_arr) {
    const result = [];
    forEach(index_arr, function(index) {
      result.push(arr[index]);
    });
    return result;
  }
  exports.copyByIndex = copyByIndex;
  function concatMap(arr, f, opt_obj) {
    return concat.apply([], map(arr, f, opt_obj));
  }
  exports.concatMap = concatMap;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.array.array.js");

goog.provide("goog.dom.tags");
goog.require("goog.object");
goog.dom.tags.VOID_TAGS_ = goog.object.createSet("area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr");
goog.dom.tags.isVoidTag = function(tagName) {
  return goog.dom.tags.VOID_TAGS_[tagName] === true;
};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.tags.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.html.SafeHtml");
  goog.module.declareLegacyNamespace();
  const Const = goog.require("goog.string.Const");
  const SafeScript = goog.require("goog.html.SafeScript");
  const SafeStyle = goog.require("goog.html.SafeStyle");
  const SafeStyleSheet = goog.require("goog.html.SafeStyleSheet");
  const SafeUrl = goog.require("goog.html.SafeUrl");
  const TagName = goog.require("goog.dom.TagName");
  const TrustedResourceUrl = goog.require("goog.html.TrustedResourceUrl");
  const TypedString = goog.require("goog.string.TypedString");
  const asserts = goog.require("goog.asserts");
  const browser = goog.require("goog.labs.userAgent.browser");
  const googArray = goog.require("goog.array");
  const googObject = goog.require("goog.object");
  const internal = goog.require("goog.string.internal");
  const tags = goog.require("goog.dom.tags");
  const trustedtypes = goog.require("goog.html.trustedtypes");
  const CONSTRUCTOR_TOKEN_PRIVATE = {};
  class SafeHtml {
    constructor(value, token) {
      this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = token === CONSTRUCTOR_TOKEN_PRIVATE ? value : "";
      this.implementsGoogStringTypedString = true;
    }
    getTypedStringValue() {
      return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
    }
    toString() {
      return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
    }
    static unwrap(safeHtml) {
      return SafeHtml.unwrapTrustedHTML(safeHtml).toString();
    }
    static unwrapTrustedHTML(safeHtml) {
      if (safeHtml instanceof SafeHtml && safeHtml.constructor === SafeHtml) {
        return safeHtml.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
      } else {
        asserts.fail(`expected object of type SafeHtml, got '${safeHtml}' of type ` + goog.typeOf(safeHtml));
        return "type_error:SafeHtml";
      }
    }
    static htmlEscape(textOrHtml) {
      if (textOrHtml instanceof SafeHtml) {
        return textOrHtml;
      }
      const textIsObject = typeof textOrHtml == "object";
      let textAsString;
      if (textIsObject && textOrHtml.implementsGoogStringTypedString) {
        textAsString = textOrHtml.getTypedStringValue();
      } else {
        textAsString = String(textOrHtml);
      }
      return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(internal.htmlEscape(textAsString));
    }
    static htmlEscapePreservingNewlines(textOrHtml) {
      if (textOrHtml instanceof SafeHtml) {
        return textOrHtml;
      }
      const html = SafeHtml.htmlEscape(textOrHtml);
      return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(internal.newLineToBr(SafeHtml.unwrap(html)));
    }
    static htmlEscapePreservingNewlinesAndSpaces(textOrHtml) {
      if (textOrHtml instanceof SafeHtml) {
        return textOrHtml;
      }
      const html = SafeHtml.htmlEscape(textOrHtml);
      return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(internal.whitespaceEscape(SafeHtml.unwrap(html)));
    }
    static comment(text) {
      return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("\x3c!--" + internal.htmlEscape(text) + "--\x3e");
    }
    static create(tagName, attributes = undefined, content = undefined) {
      SafeHtml.verifyTagName(String(tagName));
      return SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(tagName), attributes, content);
    }
    static verifyTagName(tagName) {
      if (!VALID_NAMES_IN_TAG.test(tagName)) {
        throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? `Invalid tag name <${tagName}>.` : "");
      }
      if (tagName.toUpperCase() in NOT_ALLOWED_TAG_NAMES) {
        throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? `Tag name <${tagName}> is not allowed for SafeHtml.` : "");
      }
    }
    static createIframe(src = undefined, srcdoc = undefined, attributes = undefined, content = undefined) {
      if (src) {
        TrustedResourceUrl.unwrap(src);
      }
      const fixedAttributes = {};
      fixedAttributes["src"] = src || null;
      fixedAttributes["srcdoc"] = srcdoc && SafeHtml.unwrap(srcdoc);
      const defaultAttributes = {"sandbox":""};
      const combinedAttrs = SafeHtml.combineAttributes(fixedAttributes, defaultAttributes, attributes);
      return SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", combinedAttrs, content);
    }
    static createSandboxIframe(src = undefined, srcdoc = undefined, attributes = undefined, content = undefined) {
      if (!SafeHtml.canUseSandboxIframe()) {
        throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? "The browser does not support sandboxed iframes." : "");
      }
      const fixedAttributes = {};
      if (src) {
        fixedAttributes["src"] = SafeUrl.unwrap(SafeUrl.sanitize(src));
      } else {
        fixedAttributes["src"] = null;
      }
      fixedAttributes["srcdoc"] = srcdoc || null;
      fixedAttributes["sandbox"] = "";
      const combinedAttrs = SafeHtml.combineAttributes(fixedAttributes, {}, attributes);
      return SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", combinedAttrs, content);
    }
    static canUseSandboxIframe() {
      return goog.global["HTMLIFrameElement"] && "sandbox" in goog.global["HTMLIFrameElement"].prototype;
    }
    static createScriptSrc(src, attributes = undefined) {
      TrustedResourceUrl.unwrap(src);
      const fixedAttributes = {"src":src};
      const defaultAttributes = {};
      const combinedAttrs = SafeHtml.combineAttributes(fixedAttributes, defaultAttributes, attributes);
      return SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", combinedAttrs);
    }
    static createScript(script, attributes = undefined) {
      for (let attr in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
          const attrLower = attr.toLowerCase();
          if (attrLower == "language" || attrLower == "src" || attrLower == "text") {
            throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? `Cannot set "${attrLower}" attribute` : "");
          }
        }
      }
      let content = "";
      script = googArray.concat(script);
      for (let i = 0; i < script.length; i++) {
        content += SafeScript.unwrap(script[i]);
      }
      const htmlContent = SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(content);
      return SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", attributes, htmlContent);
    }
    static createStyle(styleSheet, attributes = undefined) {
      const fixedAttributes = {"type":"text/css"};
      const defaultAttributes = {};
      const combinedAttrs = SafeHtml.combineAttributes(fixedAttributes, defaultAttributes, attributes);
      let content = "";
      styleSheet = googArray.concat(styleSheet);
      for (let i = 0; i < styleSheet.length; i++) {
        content += SafeStyleSheet.unwrap(styleSheet[i]);
      }
      const htmlContent = SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(content);
      return SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", combinedAttrs, htmlContent);
    }
    static createMetaRefresh(url, secs = undefined) {
      let unwrappedUrl = SafeUrl.unwrap(SafeUrl.sanitize(url));
      if (browser.isIE() || browser.isEdge()) {
        if (internal.contains(unwrappedUrl, ";")) {
          unwrappedUrl = "'" + unwrappedUrl.replace(/'/g, "%27") + "'";
        }
      }
      const attributes = {"http-equiv":"refresh", "content":(secs || 0) + "; url\x3d" + unwrappedUrl,};
      return SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", attributes);
    }
    static join(separator, parts) {
      const separatorHtml = SafeHtml.htmlEscape(separator);
      const content = [];
      const addArgument = argument => {
        if (Array.isArray(argument)) {
          argument.forEach(addArgument);
        } else {
          const html = SafeHtml.htmlEscape(argument);
          content.push(SafeHtml.unwrap(html));
        }
      };
      parts.forEach(addArgument);
      return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(content.join(SafeHtml.unwrap(separatorHtml)));
    }
    static concat(var_args) {
      return SafeHtml.join(SafeHtml.EMPTY, Array.prototype.slice.call(arguments));
    }
    static createSafeHtmlSecurityPrivateDoNotAccessOrElse(html) {
      const noinlineHtml = html;
      const policy = trustedtypes.getPolicyPrivateDoNotAccessOrElse();
      const trustedHtml = policy ? policy.createHTML(noinlineHtml) : noinlineHtml;
      return new SafeHtml(trustedHtml, CONSTRUCTOR_TOKEN_PRIVATE);
    }
    static createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(tagName, attributes = undefined, content = undefined) {
      let result = `<${tagName}`;
      result += SafeHtml.stringifyAttributes(tagName, attributes);
      if (content == null) {
        content = [];
      } else if (!Array.isArray(content)) {
        content = [content];
      }
      if (tags.isVoidTag(tagName.toLowerCase())) {
        asserts.assert(!content.length, `Void tag <${tagName}> does not allow content.`);
        result += "\x3e";
      } else {
        const html = SafeHtml.concat(content);
        result += "\x3e" + SafeHtml.unwrap(html) + "\x3c/" + tagName + "\x3e";
      }
      return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(result);
    }
    static stringifyAttributes(tagName, attributes = undefined) {
      let result = "";
      if (attributes) {
        for (let name in attributes) {
          if (Object.prototype.hasOwnProperty.call(attributes, name)) {
            if (!VALID_NAMES_IN_TAG.test(name)) {
              throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? `Invalid attribute name "${name}".` : "");
            }
            const value = attributes[name];
            if (value == null) {
              continue;
            }
            result += " " + getAttrNameAndValue(tagName, name, value);
          }
        }
      }
      return result;
    }
    static combineAttributes(fixedAttributes, defaultAttributes, attributes = undefined) {
      const combinedAttributes = {};
      for (const name in fixedAttributes) {
        if (Object.prototype.hasOwnProperty.call(fixedAttributes, name)) {
          asserts.assert(name.toLowerCase() == name, "Must be lower case");
          combinedAttributes[name] = fixedAttributes[name];
        }
      }
      for (const name in defaultAttributes) {
        if (Object.prototype.hasOwnProperty.call(defaultAttributes, name)) {
          asserts.assert(name.toLowerCase() == name, "Must be lower case");
          combinedAttributes[name] = defaultAttributes[name];
        }
      }
      if (attributes) {
        for (const name in attributes) {
          if (Object.prototype.hasOwnProperty.call(attributes, name)) {
            const nameLower = name.toLowerCase();
            if (nameLower in fixedAttributes) {
              throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? `Cannot override "${nameLower}" attribute, got "` + name + '" with value "' + attributes[name] + '"' : "");
            }
            if (nameLower in defaultAttributes) {
              delete combinedAttributes[nameLower];
            }
            combinedAttributes[name] = attributes[name];
          }
        }
      }
      return combinedAttributes;
    }
  }
  SafeHtml.ENABLE_ERROR_MESSAGES = goog.define("goog.html.SafeHtml.ENABLE_ERROR_MESSAGES", goog.DEBUG);
  SafeHtml.SUPPORT_STYLE_ATTRIBUTE = goog.define("goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE", true);
  SafeHtml.TextOrHtml_;
  SafeHtml.from = SafeHtml.htmlEscape;
  const VALID_NAMES_IN_TAG = /^[a-zA-Z0-9-]+$/;
  const URL_ATTRIBUTES = googObject.createSet("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
  const NOT_ALLOWED_TAG_NAMES = googObject.createSet(TagName.APPLET, TagName.BASE, TagName.EMBED, TagName.IFRAME, TagName.LINK, TagName.MATH, TagName.META, TagName.OBJECT, TagName.SCRIPT, TagName.STYLE, TagName.SVG, TagName.TEMPLATE);
  SafeHtml.AttributeValue;
  function getAttrNameAndValue(tagName, name, value) {
    if (value instanceof Const) {
      value = Const.unwrap(value);
    } else if (name.toLowerCase() == "style") {
      if (SafeHtml.SUPPORT_STYLE_ATTRIBUTE) {
        value = getStyleValue(value);
      } else {
        throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "style" not supported.' : "");
      }
    } else if (/^on/i.test(name)) {
      throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? `Attribute "${name}` + '" requires goog.string.Const value, "' + value + '" given.' : "");
    } else if (name.toLowerCase() in URL_ATTRIBUTES) {
      if (value instanceof TrustedResourceUrl) {
        value = TrustedResourceUrl.unwrap(value);
      } else if (value instanceof SafeUrl) {
        value = SafeUrl.unwrap(value);
      } else if (typeof value === "string") {
        value = SafeUrl.sanitize(value).getTypedStringValue();
      } else {
        throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? `Attribute "${name}" on tag "${tagName}` + '" requires goog.html.SafeUrl, goog.string.Const, or' + ' string, value "' + value + '" given.' : "");
      }
    }
    if (value.implementsGoogStringTypedString) {
      value = value.getTypedStringValue();
    }
    asserts.assert(typeof value === "string" || typeof value === "number", "String or number value expected, got " + typeof value + " with value: " + value);
    return `${name}="` + internal.htmlEscape(String(value)) + '"';
  }
  function getStyleValue(value) {
    if (!goog.isObject(value)) {
      throw new Error(SafeHtml.ENABLE_ERROR_MESSAGES ? 'The "style" attribute requires goog.html.SafeStyle or map ' + "of style properties, " + typeof value + " given: " + value : "");
    }
    if (!(value instanceof SafeStyle)) {
      value = SafeStyle.create(value);
    }
    return SafeStyle.unwrap(value);
  }
  SafeHtml.DOCTYPE_HTML = {valueOf:function() {
    return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("\x3c!DOCTYPE html\x3e");
  },}.valueOf();
  SafeHtml.EMPTY = new SafeHtml(goog.global.trustedTypes && goog.global.trustedTypes.emptyHTML || "", CONSTRUCTOR_TOKEN_PRIVATE);
  SafeHtml.BR = {valueOf:function() {
    return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("\x3cbr\x3e");
  },}.valueOf();
  exports = SafeHtml;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.html.safehtml.js");

goog.provide("goog.html.uncheckedconversions");
goog.require("goog.asserts");
goog.require("goog.html.SafeHtml");
goog.require("goog.html.SafeScript");
goog.require("goog.html.SafeStyle");
goog.require("goog.html.SafeStyleSheet");
goog.require("goog.html.SafeUrl");
goog.require("goog.html.TrustedResourceUrl");
goog.require("goog.string.Const");
goog.require("goog.string.internal");
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(justification, html) {
  goog.asserts.assertString(goog.string.Const.unwrap(justification), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(justification)), "must provide non-empty justification");
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(html);
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(justification, script) {
  goog.asserts.assertString(goog.string.Const.unwrap(justification), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(justification)), "must provide non-empty justification");
  return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(script);
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(justification, style) {
  goog.asserts.assertString(goog.string.Const.unwrap(justification), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(justification)), "must provide non-empty justification");
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(style);
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(justification, styleSheet) {
  goog.asserts.assertString(goog.string.Const.unwrap(justification), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(justification)), "must provide non-empty justification");
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheet);
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(justification, url) {
  goog.asserts.assertString(goog.string.Const.unwrap(justification), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(justification)), "must provide non-empty justification");
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(justification, url) {
  goog.asserts.assertString(goog.string.Const.unwrap(justification), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(justification)), "must provide non-empty justification");
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(url);
};

$CLJS.SHADOW_ENV.setLoaded("goog.html.uncheckedconversions.js");

goog.provide("goog.dom.safe");
goog.provide("goog.dom.safe.InsertAdjacentHtmlPosition");
goog.require("goog.asserts");
goog.require("goog.asserts.dom");
goog.require("goog.dom.asserts");
goog.require("goog.functions");
goog.require("goog.html.SafeHtml");
goog.require("goog.html.SafeScript");
goog.require("goog.html.SafeStyle");
goog.require("goog.html.SafeUrl");
goog.require("goog.html.TrustedResourceUrl");
goog.require("goog.html.uncheckedconversions");
goog.require("goog.string.Const");
goog.require("goog.string.internal");
goog.dom.safe.InsertAdjacentHtmlPosition = {AFTERBEGIN:"afterbegin", AFTEREND:"afterend", BEFOREBEGIN:"beforebegin", BEFOREEND:"beforeend"};
goog.dom.safe.insertAdjacentHtml = function(node, position, html) {
  node.insertAdjacentHTML(position, goog.html.SafeHtml.unwrapTrustedHTML(html));
};
goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {"MATH":true, "SCRIPT":true, "STYLE":true, "SVG":true, "TEMPLATE":true};
goog.dom.safe.isInnerHtmlCleanupRecursive_ = goog.functions.cacheReturnValue(function() {
  if (goog.DEBUG && typeof document === "undefined") {
    return false;
  }
  var div = document.createElement("div");
  var childDiv = document.createElement("div");
  childDiv.appendChild(document.createElement("div"));
  div.appendChild(childDiv);
  if (goog.DEBUG && !div.firstChild) {
    return false;
  }
  var innerChild = div.firstChild.firstChild;
  div.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(goog.html.SafeHtml.EMPTY);
  return !innerChild.parentElement;
});
goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function(elem, html) {
  if (goog.dom.safe.isInnerHtmlCleanupRecursive_()) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }
  elem.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(html);
};
goog.dom.safe.setInnerHtml = function(elem, html) {
  if (goog.asserts.ENABLE_ASSERTS && elem.tagName) {
    var tagName = elem.tagName.toUpperCase();
    if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[tagName]) {
      throw new Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + elem.tagName + ".");
    }
  }
  goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(elem, html);
};
goog.dom.safe.setInnerHtmlFromConstant = function(element, constHtml) {
  goog.dom.safe.setInnerHtml(element, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML to be immediatelly used."), goog.string.Const.unwrap(constHtml)));
};
goog.dom.safe.setOuterHtml = function(elem, html) {
  elem.outerHTML = goog.html.SafeHtml.unwrapTrustedHTML(html);
};
goog.dom.safe.setFormElementAction = function(form, url) {
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  goog.asserts.dom.assertIsHtmlFormElement(form).action = goog.html.SafeUrl.unwrap(safeUrl);
};
goog.dom.safe.setButtonFormAction = function(button, url) {
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  goog.asserts.dom.assertIsHtmlButtonElement(button).formAction = goog.html.SafeUrl.unwrap(safeUrl);
};
goog.dom.safe.setInputFormAction = function(input, url) {
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  goog.asserts.dom.assertIsHtmlInputElement(input).formAction = goog.html.SafeUrl.unwrap(safeUrl);
};
goog.dom.safe.setStyle = function(elem, style) {
  elem.style.cssText = goog.html.SafeStyle.unwrap(style);
};
goog.dom.safe.documentWrite = function(doc, html) {
  doc.write(goog.html.SafeHtml.unwrapTrustedHTML(html));
};
goog.dom.safe.setAnchorHref = function(anchor, url) {
  goog.asserts.dom.assertIsHtmlAnchorElement(anchor);
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  anchor.href = goog.html.SafeUrl.unwrap(safeUrl);
};
goog.dom.safe.setAudioSrc = function(audioElement, url) {
  goog.asserts.dom.assertIsHtmlAudioElement(audioElement);
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  audioElement.src = goog.html.SafeUrl.unwrap(safeUrl);
};
goog.dom.safe.setVideoSrc = function(videoElement, url) {
  goog.asserts.dom.assertIsHtmlVideoElement(videoElement);
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  videoElement.src = goog.html.SafeUrl.unwrap(safeUrl);
};
goog.dom.safe.setEmbedSrc = function(embed, url) {
  goog.asserts.dom.assertIsHtmlEmbedElement(embed);
  embed.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(url);
};
goog.dom.safe.setFrameSrc = function(frame, url) {
  goog.asserts.dom.assertIsHtmlFrameElement(frame);
  frame.src = goog.html.TrustedResourceUrl.unwrap(url);
};
goog.dom.safe.setIframeSrc = function(iframe, url) {
  goog.asserts.dom.assertIsHtmlIFrameElement(iframe);
  iframe.src = goog.html.TrustedResourceUrl.unwrap(url);
};
goog.dom.safe.setIframeSrcdoc = function(iframe, html) {
  goog.asserts.dom.assertIsHtmlIFrameElement(iframe);
  iframe.srcdoc = goog.html.SafeHtml.unwrapTrustedHTML(html);
};
goog.dom.safe.setLinkHrefAndRel = function(link, url, rel) {
  goog.asserts.dom.assertIsHtmlLinkElement(link);
  link.rel = rel;
  if (goog.string.internal.caseInsensitiveContains(rel, "stylesheet")) {
    goog.asserts.assert(url instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"');
    link.href = goog.html.TrustedResourceUrl.unwrap(url);
    const win = link.ownerDocument && link.ownerDocument.defaultView;
    const nonce = goog.dom.safe.getStyleNonce(win);
    if (nonce) {
      link.setAttribute("nonce", nonce);
    }
  } else if (url instanceof goog.html.TrustedResourceUrl) {
    link.href = goog.html.TrustedResourceUrl.unwrap(url);
  } else if (url instanceof goog.html.SafeUrl) {
    link.href = goog.html.SafeUrl.unwrap(url);
  } else {
    link.href = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url));
  }
};
goog.dom.safe.setObjectData = function(object, url) {
  goog.asserts.dom.assertIsHtmlObjectElement(object);
  object.data = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(url);
};
goog.dom.safe.setScriptSrc = function(script, url) {
  goog.asserts.dom.assertIsHtmlScriptElement(script);
  goog.dom.safe.setNonceForScriptElement_(script);
  script.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(url);
};
goog.dom.safe.setScriptContent = function(script, content) {
  goog.asserts.dom.assertIsHtmlScriptElement(script);
  goog.dom.safe.setNonceForScriptElement_(script);
  script.textContent = goog.html.SafeScript.unwrapTrustedScript(content);
};
goog.dom.safe.setNonceForScriptElement_ = function(script) {
  var win = script.ownerDocument && script.ownerDocument.defaultView;
  const nonce = goog.dom.safe.getScriptNonce(win);
  if (nonce) {
    script.setAttribute("nonce", nonce);
  }
};
goog.dom.safe.setLocationHref = function(loc, url) {
  goog.dom.asserts.assertIsLocation(loc);
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  loc.href = goog.html.SafeUrl.unwrap(safeUrl);
};
goog.dom.safe.assignLocation = function(loc, url) {
  goog.dom.asserts.assertIsLocation(loc);
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  loc.assign(goog.html.SafeUrl.unwrap(safeUrl));
};
goog.dom.safe.replaceLocation = function(loc, url) {
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  loc.replace(goog.html.SafeUrl.unwrap(safeUrl));
};
goog.dom.safe.openInWindow = function(url, opt_openerWin, opt_name, opt_specs) {
  var safeUrl;
  if (url instanceof goog.html.SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  var win = opt_openerWin || goog.global;
  var name = opt_name instanceof goog.string.Const ? goog.string.Const.unwrap(opt_name) : opt_name || "";
  if (opt_specs !== undefined) {
    return win.open(goog.html.SafeUrl.unwrap(safeUrl), name, opt_specs);
  } else {
    return win.open(goog.html.SafeUrl.unwrap(safeUrl), name);
  }
};
goog.dom.safe.parseFromStringHtml = function(parser, html) {
  return goog.dom.safe.parseFromString(parser, html, "text/html");
};
goog.dom.safe.parseFromString = function(parser, content, type) {
  return parser.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(content), type);
};
goog.dom.safe.createImageFromBlob = function(blob) {
  if (!/^image\/.*/g.test(blob.type)) {
    throw new Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");
  }
  var objectUrl = goog.global.URL.createObjectURL(blob);
  var image = new goog.global.Image();
  image.onload = function() {
    goog.global.URL.revokeObjectURL(objectUrl);
  };
  image.src = objectUrl;
  return image;
};
goog.dom.safe.createContextualFragment = function(range, html) {
  return range.createContextualFragment(goog.html.SafeHtml.unwrapTrustedHTML(html));
};
goog.dom.safe.getScriptNonce = function(opt_window) {
  return goog.dom.safe.getNonce_("script[nonce]", opt_window);
};
goog.dom.safe.getStyleNonce = function(opt_window) {
  return goog.dom.safe.getNonce_('style[nonce],link[rel\x3d"stylesheet"][nonce]', opt_window);
};
goog.dom.safe.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.dom.safe.getNonce_ = function(selector, win) {
  const doc = (win || goog.global).document;
  if (!doc.querySelector) {
    return "";
  }
  let el = doc.querySelector(selector);
  if (el) {
    const nonce = el["nonce"] || el.getAttribute("nonce");
    if (nonce && goog.dom.safe.NONCE_PATTERN_.test(nonce)) {
      return nonce;
    }
  }
  return "";
};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.safe.js");

goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.require("goog.dom.safe");
goog.require("goog.html.uncheckedconversions");
goog.require("goog.string.Const");
goog.require("goog.string.internal");
goog.string.DETECT_DOUBLE_ESCAPING = goog.define("goog.string.DETECT_DOUBLE_ESCAPING", false);
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = goog.define("goog.string.FORCE_NON_DOM_HTML_UNESCAPING", false);
goog.string.Unicode = {NBSP:" ", ZERO_WIDTH_SPACE:"​"};
goog.string.startsWith = goog.string.internal.startsWith;
goog.string.endsWith = goog.string.internal.endsWith;
goog.string.caseInsensitiveStartsWith = goog.string.internal.caseInsensitiveStartsWith;
goog.string.caseInsensitiveEndsWith = goog.string.internal.caseInsensitiveEndsWith;
goog.string.caseInsensitiveEquals = goog.string.internal.caseInsensitiveEquals;
goog.string.subs = function(str, var_args) {
  const splitParts = str.split("%s");
  let returnString = "";
  const subsArguments = Array.prototype.slice.call(arguments, 1);
  while (subsArguments.length && splitParts.length > 1) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = goog.string.internal.isEmptyOrWhitespace;
goog.string.isEmptyString = function(str) {
  return str.length == 0;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(str) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(str));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(str) {
  return !/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function(str) {
  return !/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function(str) {
  return !/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function(str) {
  return !/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function(ch) {
  return ch == " ";
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "" && ch <= "�";
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.string.internal.trim;
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = goog.string.internal.caseInsensitiveCompare;
goog.string.numberAwareCompare_ = function(str1, str2, tokenizerRegExp) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return -1;
  }
  if (!str2) {
    return 1;
  }
  const tokens1 = str1.toLowerCase().match(tokenizerRegExp);
  const tokens2 = str2.toLowerCase().match(tokenizerRegExp);
  const count = Math.min(tokens1.length, tokens2.length);
  for (let i = 0; i < count; i++) {
    const a = tokens1[i];
    const b = tokens2[i];
    if (a != b) {
      const num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        const num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  if (tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length;
  }
  return str1 < str2 ? -1 : 1;
};
goog.string.intAwareCompare = function(str1, str2) {
  return goog.string.numberAwareCompare_(str1, str2, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(str1, str2) {
  return goog.string.numberAwareCompare_(str1, str2, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = goog.string.internal.newLineToBr;
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  str = goog.string.internal.htmlEscape(str, opt_isLikelyToContainHtmlChars);
  if (goog.string.DETECT_DOUBLE_ESCAPING) {
    str = str.replace(goog.string.E_RE_, "\x26#101;");
  }
  return str;
};
goog.string.E_RE_ = /e/g;
goog.string.unescapeEntities = function(str) {
  if (goog.string.contains(str, "\x26")) {
    if (!goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global) {
      return goog.string.unescapeEntitiesUsingDom_(str);
    } else {
      return goog.string.unescapePureXmlEntities_(str);
    }
  }
  return str;
};
goog.string.unescapeEntitiesWithDocument = function(str, document) {
  if (goog.string.contains(str, "\x26")) {
    return goog.string.unescapeEntitiesUsingDom_(str, document);
  }
  return str;
};
goog.string.unescapeEntitiesUsingDom_ = function(str, opt_document) {
  const seen = {"\x26amp;":"\x26", "\x26lt;":"\x3c", "\x26gt;":"\x3e", "\x26quot;":'"'};
  let div;
  if (opt_document) {
    div = opt_document.createElement("div");
  } else {
    div = goog.global.document.createElement("div");
  }
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    let value = seen[s];
    if (value) {
      return value;
    }
    if (entity.charAt(0) == "#") {
      const n = Number("0" + entity.slice(1));
      if (!isNaN(n)) {
        value = String.fromCharCode(n);
      }
    }
    if (!value) {
      goog.dom.safe.setInnerHtml(div, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Single HTML entity."), s + " "));
      value = div.firstChild.nodeValue.slice(0, -1);
    }
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "\x26";
      case "lt":
        return "\x3c";
      case "gt":
        return "\x3e";
      case "quot":
        return '"';
      default:
        if (entity.charAt(0) == "#") {
          const n = Number("0" + entity.slice(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " \x26#160;"), opt_xml);
};
goog.string.preserveSpaces = function(str) {
  return str.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(str, quoteChars) {
  const length = quoteChars.length;
  for (let i = 0; i < length; i++) {
    const quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (str.length > chars) {
    str = str.substring(0, chars - 3) + "...";
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (opt_trailingChars && str.length > chars) {
    if (opt_trailingChars > chars) {
      opt_trailingChars = chars;
    }
    const endPoint = str.length - opt_trailingChars;
    const startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else if (str.length > chars) {
    let half = Math.floor(chars / 2);
    const endPos = str.length - half;
    half += chars % 2;
    str = str.substring(0, half) + "..." + str.substring(endPos);
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\v":"\\x0B", '"':'\\"', "\\":"\\\\", "\x3c":"\\u003C"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  const sb = ['"'];
  for (let i = 0; i < s.length; i++) {
    const ch = s.charAt(i);
    const cc = ch.charCodeAt(0);
    sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch));
  }
  sb.push('"');
  return sb.join("");
};
goog.string.escapeString = function(str) {
  const sb = [];
  for (let i = 0; i < str.length; i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  let rv = c;
  const cc = c.charCodeAt(0);
  if (cc > 31 && cc < 127) {
    rv = c;
  } else {
    if (cc < 256) {
      rv = "\\x";
      if (cc < 16 || cc > 256) {
        rv += "0";
      }
    } else {
      rv = "\\u";
      if (cc < 4096) {
        rv += "0";
      }
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.contains = goog.string.internal.contains;
goog.string.caseInsensitiveContains = goog.string.internal.caseInsensitiveContains;
goog.string.countOf = function(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function(s, index, stringLength) {
  let resultStr = s;
  if (index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.slice(0, index) + s.slice(index + stringLength);
  }
  return resultStr;
};
goog.string.remove = function(str, substr) {
  return str.replace(substr, "");
};
goog.string.removeAll = function(s, ss) {
  const re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.replaceAll = function(s, ss, replacement) {
  const re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, replacement.replace(/\$/g, "$$$$"));
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(string, length) {
  return string.repeat(length);
} : function(string, length) {
  return (new Array(length + 1)).join(string);
};
goog.string.padNumber = function(num, length, opt_precision) {
  if (!Number.isFinite(num)) {
    return String(num);
  }
  let s = opt_precision !== undefined ? num.toFixed(opt_precision) : String(num);
  let index = s.indexOf(".");
  if (index === -1) {
    index = s.length;
  }
  const sign = s[0] === "-" ? "-" : "";
  if (sign) {
    s = s.substring(1);
  }
  return sign + goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj);
};
goog.string.getRandomString = function() {
  const x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36);
};
goog.string.compareVersions = goog.string.internal.compareVersions;
goog.string.hashCode = function(str) {
  let result = 0;
  for (let i = 0; i < str.length; ++i) {
    result = 31 * result + str.charCodeAt(i) >>> 0;
  }
  return result;
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(str) {
  const num = Number(str);
  if (num == 0 && goog.string.isEmptyOrWhitespace(str)) {
    return NaN;
  }
  return num;
};
goog.string.isLowerCamelCase = function(str) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function(str) {
  return /^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(str, opt_delimiters) {
  let delimiters = typeof opt_delimiters === "string" ? goog.string.regExpEscape(opt_delimiters) : "\\s";
  delimiters = delimiters ? "|[" + delimiters + "]+" : "";
  const regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.capitalize = function(str) {
  return String(str.charAt(0)).toUpperCase() + String(str.slice(1)).toLowerCase();
};
goog.string.parseInt = function(value) {
  if (isFinite(value)) {
    value = String(value);
  }
  if (typeof value === "string") {
    return /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10);
  }
  return NaN;
};
goog.string.splitLimit = function(str, separator, limit) {
  const parts = str.split(separator);
  const returnVal = [];
  while (limit > 0 && parts.length) {
    returnVal.push(parts.shift());
    limit--;
  }
  if (parts.length) {
    returnVal.push(parts.join(separator));
  }
  return returnVal;
};
goog.string.lastComponent = function(str, separators) {
  if (!separators) {
    return str;
  } else if (typeof separators == "string") {
    separators = [separators];
  }
  let lastSeparatorIndex = -1;
  for (let i = 0; i < separators.length; i++) {
    if (separators[i] == "") {
      continue;
    }
    const currentSeparatorIndex = str.lastIndexOf(separators[i]);
    if (currentSeparatorIndex > lastSeparatorIndex) {
      lastSeparatorIndex = currentSeparatorIndex;
    }
  }
  if (lastSeparatorIndex == -1) {
    return str;
  }
  return str.slice(lastSeparatorIndex + 1);
};
goog.string.editDistance = function(a, b) {
  const v0 = [];
  const v1 = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (let i = 0; i < b.length + 1; i++) {
    v0[i] = i;
  }
  for (let i = 0; i < a.length; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < b.length; j++) {
      const cost = Number(a[i] != b[j]);
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j < v0.length; j++) {
      v0[j] = v1[j];
    }
  }
  return v1[b.length];
};

$CLJS.SHADOW_ENV.setLoaded("goog.string.string.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.collections.maps");
  goog.module.declareLegacyNamespace();
  class MapLike {
    constructor() {
      this.size;
    }
    set(key, val) {
    }
    get(key) {
    }
    keys() {
    }
    values() {
    }
    has(key) {
    }
  }
  exports.MapLike = MapLike;
  function setAll(map, entries) {
    if (!entries) {
      return;
    }
    for (const [k, v] of entries) {
      map.set(k, v);
    }
  }
  exports.setAll = setAll;
  function hasValue(map, val, valueEqualityFn = defaultEqualityFn) {
    for (const v of map.values()) {
      if (valueEqualityFn(v, val)) {
        return true;
      }
    }
    return false;
  }
  exports.hasValue = hasValue;
  const defaultEqualityFn = (a, b) => a === b;
  function equals(map, otherMap, valueEqualityFn = defaultEqualityFn) {
    if (map === otherMap) {
      return true;
    }
    if (map.size !== otherMap.size) {
      return false;
    }
    for (const key of map.keys()) {
      if (!otherMap.has(key)) {
        return false;
      }
      if (!valueEqualityFn(map.get(key), otherMap.get(key))) {
        return false;
      }
    }
    return true;
  }
  exports.equals = equals;
  function transpose(map) {
    const transposed = new Map();
    for (const key of map.keys()) {
      const val = map.get(key);
      transposed.set(val, key);
    }
    return transposed;
  }
  exports.transpose = transpose;
  function toObject(map) {
    const obj = {};
    for (const key of map.keys()) {
      obj[key] = map.get(key);
    }
    return obj;
  }
  exports.toObject = toObject;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.collections.maps.js");

goog.provide("goog.structs");
goog.require("goog.array");
goog.require("goog.object");
goog.structs.getCount = function(col) {
  if (col.getCount && typeof col.getCount == "function") {
    return col.getCount();
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return col.length;
  }
  return goog.object.getCount(col);
};
goog.structs.getValues = function(col) {
  if (col.getValues && typeof col.getValues == "function") {
    return col.getValues();
  }
  if (typeof Map !== "undefined" && col instanceof Map || typeof Set !== "undefined" && col instanceof Set) {
    return Array.from(col.values());
  }
  if (typeof col === "string") {
    return col.split("");
  }
  if (goog.isArrayLike(col)) {
    var rv = [];
    var l = col.length;
    for (var i = 0; i < l; i++) {
      rv.push(col[i]);
    }
    return rv;
  }
  return goog.object.getValues(col);
};
goog.structs.getKeys = function(col) {
  if (col.getKeys && typeof col.getKeys == "function") {
    return col.getKeys();
  }
  if (col.getValues && typeof col.getValues == "function") {
    return undefined;
  }
  if (typeof Map !== "undefined" && col instanceof Map) {
    return Array.from(col.keys());
  }
  if (typeof Set !== "undefined" && col instanceof Set) {
    return undefined;
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    var rv = [];
    var l = col.length;
    for (var i = 0; i < l; i++) {
      rv.push(i);
    }
    return rv;
  }
  return goog.object.getKeys(col);
};
goog.structs.contains = function(col, val) {
  if (col.contains && typeof col.contains == "function") {
    return col.contains(val);
  }
  if (col.containsValue && typeof col.containsValue == "function") {
    return col.containsValue(val);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return goog.array.contains(col, val);
  }
  return goog.object.containsValue(col, val);
};
goog.structs.isEmpty = function(col) {
  if (col.isEmpty && typeof col.isEmpty == "function") {
    return col.isEmpty();
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return col.length === 0;
  }
  return goog.object.isEmpty(col);
};
goog.structs.clear = function(col) {
  if (col.clear && typeof col.clear == "function") {
    col.clear();
  } else if (goog.isArrayLike(col)) {
    goog.array.clear(col);
  } else {
    goog.object.clear(col);
  }
};
goog.structs.forEach = function(col, f, opt_obj) {
  if (col.forEach && typeof col.forEach == "function") {
    col.forEach(f, opt_obj);
  } else if (goog.isArrayLike(col) || typeof col === "string") {
    Array.prototype.forEach.call(col, f, opt_obj);
  } else {
    var keys = goog.structs.getKeys(col);
    var values = goog.structs.getValues(col);
    var l = values.length;
    for (var i = 0; i < l; i++) {
      f.call(opt_obj, values[i], keys && keys[i], col);
    }
  }
};
goog.structs.filter = function(col, f, opt_obj) {
  if (typeof col.filter == "function") {
    return col.filter(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.filter.call(col, f, opt_obj);
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0; i < l; i++) {
      if (f.call(opt_obj, values[i], keys[i], col)) {
        rv[keys[i]] = values[i];
      }
    }
  } else {
    rv = [];
    for (var i = 0; i < l; i++) {
      if (f.call(opt_obj, values[i], undefined, col)) {
        rv.push(values[i]);
      }
    }
  }
  return rv;
};
goog.structs.map = function(col, f, opt_obj) {
  if (typeof col.map == "function") {
    return col.map(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.map.call(col, f, opt_obj);
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0; i < l; i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col);
    }
  } else {
    rv = [];
    for (var i = 0; i < l; i++) {
      rv[i] = f.call(opt_obj, values[i], undefined, col);
    }
  }
  return rv;
};
goog.structs.some = function(col, f, opt_obj) {
  if (typeof col.some == "function") {
    return col.some(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.some.call(col, f, opt_obj);
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0; i < l; i++) {
    if (f.call(opt_obj, values[i], keys && keys[i], col)) {
      return true;
    }
  }
  return false;
};
goog.structs.every = function(col, f, opt_obj) {
  if (typeof col.every == "function") {
    return col.every(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.every.call(col, f, opt_obj);
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0; i < l; i++) {
    if (!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return false;
    }
  }
  return true;
};

$CLJS.SHADOW_ENV.setLoaded("goog.structs.structs.js");

goog.provide("goog.uri.utils");
goog.provide("goog.uri.utils.ComponentIndex");
goog.provide("goog.uri.utils.QueryArray");
goog.provide("goog.uri.utils.QueryValue");
goog.provide("goog.uri.utils.StandardQueryParam");
goog.require("goog.asserts");
goog.require("goog.string");
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
  var out = "";
  if (opt_scheme) {
    out += opt_scheme + ":";
  }
  if (opt_domain) {
    out += "//";
    if (opt_userInfo) {
      out += opt_userInfo + "@";
    }
    out += opt_domain;
    if (opt_port) {
      out += ":" + opt_port;
    }
  }
  if (opt_path) {
    out += opt_path;
  }
  if (opt_queryData) {
    out += "?" + opt_queryData;
  }
  if (opt_fragment) {
    out += "#" + opt_fragment;
  }
  return out;
};
goog.uri.utils.splitRe_ = new RegExp("^" + "(?:" + "([^:/?#.]+)" + ":)?" + "(?://" + "(?:([^\\\\/?#]*)@)?" + "([^\\\\/?#]*?)" + "(?::([0-9]+))?" + "(?\x3d[\\\\/?#]|$)" + ")?" + "([^?#]+)?" + "(?:\\?([^#]*))?" + "(?:#([\\s\\S]*))?" + "$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.urlPackageSupportLoggingHandler_ = null;
goog.uri.utils.setUrlPackageSupportLoggingHandler = function(handler) {
  goog.uri.utils.urlPackageSupportLoggingHandler_ = handler;
};
goog.uri.utils.split = function(uri) {
  var result = uri.match(goog.uri.utils.splitRe_);
  if (goog.uri.utils.urlPackageSupportLoggingHandler_ && ["http", "https", "ws", "wss", "ftp"].indexOf(result[goog.uri.utils.ComponentIndex.SCHEME]) >= 0) {
    goog.uri.utils.urlPackageSupportLoggingHandler_(uri);
  }
  return result;
};
goog.uri.utils.decodeIfPossible_ = function(uri, opt_preserveReserved) {
  if (!uri) {
    return uri;
  }
  return opt_preserveReserved ? decodeURI(uri) : decodeURIComponent(uri);
};
goog.uri.utils.getComponentByIndex_ = function(componentIndex, uri) {
  return goog.uri.utils.split(uri)[componentIndex] || null;
};
goog.uri.utils.getScheme = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, uri);
};
goog.uri.utils.getEffectiveScheme = function(uri) {
  var scheme = goog.uri.utils.getScheme(uri);
  if (!scheme && goog.global.self && goog.global.self.location) {
    var protocol = goog.global.self.location.protocol;
    scheme = protocol.slice(0, -1);
  }
  return scheme ? scheme.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, uri);
};
goog.uri.utils.getUserInfo = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(uri));
};
goog.uri.utils.getDomainEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, uri);
};
goog.uri.utils.getDomain = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(uri), true);
};
goog.uri.utils.getPort = function(uri) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, uri)) || null;
};
goog.uri.utils.getPathEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, uri);
};
goog.uri.utils.getPath = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(uri), true);
};
goog.uri.utils.getQueryData = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, uri);
};
goog.uri.utils.getFragmentEncoded = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? null : uri.slice(hashIndex + 1);
};
goog.uri.utils.setFragmentEncoded = function(uri, fragment) {
  return goog.uri.utils.removeFragment(uri) + (fragment ? "#" + fragment : "");
};
goog.uri.utils.getFragment = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(uri));
};
goog.uri.utils.getHost = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], pieces[goog.uri.utils.ComponentIndex.USER_INFO], pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getOrigin = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], null, pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA], pieces[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? uri : uri.slice(0, hashIndex);
};
goog.uri.utils.haveSameDomain = function(uri1, uri2) {
  var pieces1 = goog.uri.utils.split(uri1);
  var pieces2 = goog.uri.utils.split(uri2);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.SCHEME] == pieces2[goog.uri.utils.ComponentIndex.SCHEME] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(uri) {
  goog.asserts.assert(uri.indexOf("#") < 0 && uri.indexOf("?") < 0, "goog.uri.utils: Fragment or query identifiers are not supported: [%s]", uri);
};
goog.uri.utils.QueryValue;
goog.uri.utils.QueryArray;
goog.uri.utils.parseQueryData = function(encodedQuery, callback) {
  if (!encodedQuery) {
    return;
  }
  var pairs = encodedQuery.split("\x26");
  for (var i = 0; i < pairs.length; i++) {
    var indexOfEquals = pairs[i].indexOf("\x3d");
    var name = null;
    var value = null;
    if (indexOfEquals >= 0) {
      name = pairs[i].substring(0, indexOfEquals);
      value = pairs[i].substring(indexOfEquals + 1);
    } else {
      name = pairs[i];
    }
    callback(name, value ? goog.string.urlDecode(value) : "");
  }
};
goog.uri.utils.splitQueryData_ = function(uri) {
  var hashIndex = uri.indexOf("#");
  if (hashIndex < 0) {
    hashIndex = uri.length;
  }
  var questionIndex = uri.indexOf("?");
  var queryData;
  if (questionIndex < 0 || questionIndex > hashIndex) {
    questionIndex = hashIndex;
    queryData = "";
  } else {
    queryData = uri.substring(questionIndex + 1, hashIndex);
  }
  return [uri.slice(0, questionIndex), queryData, uri.slice(hashIndex)];
};
goog.uri.utils.joinQueryData_ = function(parts) {
  return parts[0] + (parts[1] ? "?" + parts[1] : "") + parts[2];
};
goog.uri.utils.appendQueryData_ = function(queryData, newData) {
  if (!newData) {
    return queryData;
  }
  return queryData ? queryData + "\x26" + newData : newData;
};
goog.uri.utils.appendQueryDataToUri_ = function(uri, queryData) {
  if (!queryData) {
    return uri;
  }
  var parts = goog.uri.utils.splitQueryData_(uri);
  parts[1] = goog.uri.utils.appendQueryData_(parts[1], queryData);
  return goog.uri.utils.joinQueryData_(parts);
};
goog.uri.utils.appendKeyValuePairs_ = function(key, value, pairs) {
  goog.asserts.assertString(key);
  if (Array.isArray(value)) {
    goog.asserts.assertArray(value);
    for (var j = 0; j < value.length; j++) {
      goog.uri.utils.appendKeyValuePairs_(key, String(value[j]), pairs);
    }
  } else if (value != null) {
    pairs.push(key + (value === "" ? "" : "\x3d" + goog.string.urlEncode(value)));
  }
};
goog.uri.utils.buildQueryData = function(keysAndValues, opt_startIndex) {
  goog.asserts.assert(Math.max(keysAndValues.length - (opt_startIndex || 0), 0) % 2 == 0, "goog.uri.utils: Key/value lists must be even in length.");
  var params = [];
  for (var i = opt_startIndex || 0; i < keysAndValues.length; i += 2) {
    var key = keysAndValues[i];
    goog.uri.utils.appendKeyValuePairs_(key, keysAndValues[i + 1], params);
  }
  return params.join("\x26");
};
goog.uri.utils.buildQueryDataFromMap = function(map) {
  var params = [];
  for (var key in map) {
    goog.uri.utils.appendKeyValuePairs_(key, map[key], params);
  }
  return params.join("\x26");
};
goog.uri.utils.appendParams = function(uri, var_args) {
  var queryData = arguments.length == 2 ? goog.uri.utils.buildQueryData(arguments[1], 0) : goog.uri.utils.buildQueryData(arguments, 1);
  return goog.uri.utils.appendQueryDataToUri_(uri, queryData);
};
goog.uri.utils.appendParamsFromMap = function(uri, map) {
  var queryData = goog.uri.utils.buildQueryDataFromMap(map);
  return goog.uri.utils.appendQueryDataToUri_(uri, queryData);
};
goog.uri.utils.appendParam = function(uri, key, opt_value) {
  var value = opt_value != null ? "\x3d" + goog.string.urlEncode(opt_value) : "";
  return goog.uri.utils.appendQueryDataToUri_(uri, key + value);
};
goog.uri.utils.findParam_ = function(uri, startIndex, keyEncoded, hashOrEndIndex) {
  var index = startIndex;
  var keyLength = keyEncoded.length;
  while ((index = uri.indexOf(keyEncoded, index)) >= 0 && index < hashOrEndIndex) {
    var precedingChar = uri.charCodeAt(index - 1);
    if (precedingChar == goog.uri.utils.CharCode_.AMPERSAND || precedingChar == goog.uri.utils.CharCode_.QUESTION) {
      var followingChar = uri.charCodeAt(index + keyLength);
      if (!followingChar || followingChar == goog.uri.utils.CharCode_.EQUAL || followingChar == goog.uri.utils.CharCode_.AMPERSAND || followingChar == goog.uri.utils.CharCode_.HASH) {
        return index;
      }
    }
    index += keyLength + 1;
  }
  return -1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(uri, keyEncoded) {
  return goog.uri.utils.findParam_(uri, 0, keyEncoded, uri.search(goog.uri.utils.hashOrEndRe_)) >= 0;
};
goog.uri.utils.getParamValue = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var foundIndex = goog.uri.utils.findParam_(uri, 0, keyEncoded, hashOrEndIndex);
  if (foundIndex < 0) {
    return null;
  } else {
    var endPosition = uri.indexOf("\x26", foundIndex);
    if (endPosition < 0 || endPosition > hashOrEndIndex) {
      endPosition = hashOrEndIndex;
    }
    foundIndex += keyEncoded.length + 1;
    return goog.string.urlDecode(uri.slice(foundIndex, endPosition !== -1 ? endPosition : 0));
  }
};
goog.uri.utils.getParamValues = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var result = [];
  while ((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    position = uri.indexOf("\x26", foundIndex);
    if (position < 0 || position > hashOrEndIndex) {
      position = hashOrEndIndex;
    }
    foundIndex += keyEncoded.length + 1;
    result.push(goog.string.urlDecode(uri.slice(foundIndex, Math.max(position, 0))));
  }
  return result;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var buffer = [];
  while ((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    buffer.push(uri.substring(position, foundIndex));
    position = Math.min(uri.indexOf("\x26", foundIndex) + 1 || hashOrEndIndex, hashOrEndIndex);
  }
  buffer.push(uri.slice(position));
  return buffer.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function(uri, keyEncoded, value) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(uri, keyEncoded), keyEncoded, value);
};
goog.uri.utils.setParamsFromMap = function(uri, params) {
  var parts = goog.uri.utils.splitQueryData_(uri);
  var queryData = parts[1];
  var buffer = [];
  if (queryData) {
    queryData.split("\x26").forEach(function(pair) {
      var indexOfEquals = pair.indexOf("\x3d");
      var name = indexOfEquals >= 0 ? pair.slice(0, indexOfEquals) : pair;
      if (!params.hasOwnProperty(name)) {
        buffer.push(pair);
      }
    });
  }
  parts[1] = goog.uri.utils.appendQueryData_(buffer.join("\x26"), goog.uri.utils.buildQueryDataFromMap(params));
  return goog.uri.utils.joinQueryData_(parts);
};
goog.uri.utils.appendPath = function(baseUri, path) {
  goog.uri.utils.assertNoFragmentsOrQueries_(baseUri);
  if (goog.string.endsWith(baseUri, "/")) {
    baseUri = baseUri.slice(0, -1);
  }
  if (goog.string.startsWith(path, "/")) {
    path = path.slice(1);
  }
  return "" + baseUri + "/" + path;
};
goog.uri.utils.setPath = function(uri, path) {
  if (!goog.string.startsWith(path, "/")) {
    path = "/" + path;
  }
  var parts = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(parts[goog.uri.utils.ComponentIndex.SCHEME], parts[goog.uri.utils.ComponentIndex.USER_INFO], parts[goog.uri.utils.ComponentIndex.DOMAIN], parts[goog.uri.utils.ComponentIndex.PORT], path, parts[goog.uri.utils.ComponentIndex.QUERY_DATA], parts[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(uri) {
  return goog.uri.utils.setParam(uri, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};

$CLJS.SHADOW_ENV.setLoaded("goog.uri.utils.js");

goog.provide("goog.Uri");
goog.provide("goog.Uri.QueryData");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.collections.maps");
goog.require("goog.string");
goog.require("goog.structs");
goog.require("goog.uri.utils");
goog.require("goog.uri.utils.ComponentIndex");
goog.require("goog.uri.utils.StandardQueryParam");
goog.Uri = function(opt_uri, opt_ignoreCase) {
  this.scheme_ = "";
  this.userInfo_ = "";
  this.domain_ = "";
  this.port_ = null;
  this.path_ = "";
  this.fragment_ = "";
  this.isReadOnly_ = false;
  this.ignoreCase_ = false;
  this.queryData_;
  var m;
  if (opt_uri instanceof goog.Uri) {
    this.ignoreCase_ = opt_ignoreCase !== undefined ? opt_ignoreCase : opt_uri.getIgnoreCase();
    this.setScheme(opt_uri.getScheme());
    this.setUserInfo(opt_uri.getUserInfo());
    this.setDomain(opt_uri.getDomain());
    this.setPort(opt_uri.getPort());
    this.setPath(opt_uri.getPath());
    this.setQueryData(opt_uri.getQueryData().clone());
    this.setFragment(opt_uri.getFragment());
  } else if (opt_uri && (m = goog.uri.utils.split(String(opt_uri)))) {
    this.ignoreCase_ = !!opt_ignoreCase;
    this.setScheme(m[goog.uri.utils.ComponentIndex.SCHEME] || "", true);
    this.setUserInfo(m[goog.uri.utils.ComponentIndex.USER_INFO] || "", true);
    this.setDomain(m[goog.uri.utils.ComponentIndex.DOMAIN] || "", true);
    this.setPort(m[goog.uri.utils.ComponentIndex.PORT]);
    this.setPath(m[goog.uri.utils.ComponentIndex.PATH] || "", true);
    this.setQueryData(m[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", true);
    this.setFragment(m[goog.uri.utils.ComponentIndex.FRAGMENT] || "", true);
  } else {
    this.ignoreCase_ = !!opt_ignoreCase;
    this.queryData_ = new goog.Uri.QueryData(null, this.ignoreCase_);
  }
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.toString = function() {
  var out = [];
  var scheme = this.getScheme();
  if (scheme) {
    out.push(goog.Uri.encodeSpecialChars_(scheme, goog.Uri.reDisallowedInSchemeOrUserInfo_, true), ":");
  }
  var domain = this.getDomain();
  if (domain || scheme == "file") {
    out.push("//");
    var userInfo = this.getUserInfo();
    if (userInfo) {
      out.push(goog.Uri.encodeSpecialChars_(userInfo, goog.Uri.reDisallowedInSchemeOrUserInfo_, true), "@");
    }
    out.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode(domain)));
    var port = this.getPort();
    if (port != null) {
      out.push(":", String(port));
    }
  }
  var path = this.getPath();
  if (path) {
    if (this.hasDomain() && path.charAt(0) != "/") {
      out.push("/");
    }
    out.push(goog.Uri.encodeSpecialChars_(path, path.charAt(0) == "/" ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, true));
  }
  var query = this.getEncodedQuery();
  if (query) {
    out.push("?", query);
  }
  var fragment = this.getFragment();
  if (fragment) {
    out.push("#", goog.Uri.encodeSpecialChars_(fragment, goog.Uri.reDisallowedInFragment_));
  }
  return out.join("");
};
goog.Uri.prototype.resolve = function(relativeUri) {
  var absoluteUri = this.clone();
  var overridden = relativeUri.hasScheme();
  if (overridden) {
    absoluteUri.setScheme(relativeUri.getScheme());
  } else {
    overridden = relativeUri.hasUserInfo();
  }
  if (overridden) {
    absoluteUri.setUserInfo(relativeUri.getUserInfo());
  } else {
    overridden = relativeUri.hasDomain();
  }
  if (overridden) {
    absoluteUri.setDomain(relativeUri.getDomain());
  } else {
    overridden = relativeUri.hasPort();
  }
  var path = relativeUri.getPath();
  if (overridden) {
    absoluteUri.setPort(relativeUri.getPort());
  } else {
    overridden = relativeUri.hasPath();
    if (overridden) {
      if (path.charAt(0) != "/") {
        if (this.hasDomain() && !this.hasPath()) {
          path = "/" + path;
        } else {
          var lastSlashIndex = absoluteUri.getPath().lastIndexOf("/");
          if (lastSlashIndex != -1) {
            path = absoluteUri.getPath().slice(0, lastSlashIndex + 1) + path;
          }
        }
      }
      path = goog.Uri.removeDotSegments(path);
    }
  }
  if (overridden) {
    absoluteUri.setPath(path);
  } else {
    overridden = relativeUri.hasQuery();
  }
  if (overridden) {
    absoluteUri.setQueryData(relativeUri.getQueryData().clone());
  } else {
    overridden = relativeUri.hasFragment();
  }
  if (overridden) {
    absoluteUri.setFragment(relativeUri.getFragment());
  }
  return absoluteUri;
};
goog.Uri.prototype.clone = function() {
  return new goog.Uri(this);
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_;
};
goog.Uri.prototype.setScheme = function(newScheme, opt_decode) {
  this.enforceReadOnly();
  this.scheme_ = opt_decode ? goog.Uri.decodeOrEmpty_(newScheme, true) : newScheme;
  if (this.scheme_) {
    this.scheme_ = this.scheme_.replace(/:$/, "");
  }
  return this;
};
goog.Uri.prototype.hasScheme = function() {
  return !!this.scheme_;
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_;
};
goog.Uri.prototype.setUserInfo = function(newUserInfo, opt_decode) {
  this.enforceReadOnly();
  this.userInfo_ = opt_decode ? goog.Uri.decodeOrEmpty_(newUserInfo) : newUserInfo;
  return this;
};
goog.Uri.prototype.hasUserInfo = function() {
  return !!this.userInfo_;
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_;
};
goog.Uri.prototype.setDomain = function(newDomain, opt_decode) {
  this.enforceReadOnly();
  this.domain_ = opt_decode ? goog.Uri.decodeOrEmpty_(newDomain, true) : newDomain;
  return this;
};
goog.Uri.prototype.hasDomain = function() {
  return !!this.domain_;
};
goog.Uri.prototype.getPort = function() {
  return this.port_;
};
goog.Uri.prototype.setPort = function(newPort) {
  this.enforceReadOnly();
  if (newPort) {
    newPort = Number(newPort);
    if (isNaN(newPort) || newPort < 0) {
      throw new Error("Bad port number " + newPort);
    }
    this.port_ = newPort;
  } else {
    this.port_ = null;
  }
  return this;
};
goog.Uri.prototype.hasPort = function() {
  return this.port_ != null;
};
goog.Uri.prototype.getPath = function() {
  return this.path_;
};
goog.Uri.prototype.setPath = function(newPath, opt_decode) {
  this.enforceReadOnly();
  this.path_ = opt_decode ? goog.Uri.decodeOrEmpty_(newPath, true) : newPath;
  return this;
};
goog.Uri.prototype.hasPath = function() {
  return !!this.path_;
};
goog.Uri.prototype.hasQuery = function() {
  return this.queryData_.toString() !== "";
};
goog.Uri.prototype.setQueryData = function(queryData, opt_decode) {
  this.enforceReadOnly();
  if (queryData instanceof goog.Uri.QueryData) {
    this.queryData_ = queryData;
    this.queryData_.setIgnoreCase(this.ignoreCase_);
  } else {
    if (!opt_decode) {
      queryData = goog.Uri.encodeSpecialChars_(queryData, goog.Uri.reDisallowedInQuery_);
    }
    this.queryData_ = new goog.Uri.QueryData(queryData, this.ignoreCase_);
  }
  return this;
};
goog.Uri.prototype.setQuery = function(newQuery, opt_decode) {
  return this.setQueryData(newQuery, opt_decode);
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString();
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString();
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_;
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery();
};
goog.Uri.prototype.setParameterValue = function(key, value) {
  this.enforceReadOnly();
  this.queryData_.set(key, value);
  return this;
};
goog.Uri.prototype.setParameterValues = function(key, values) {
  this.enforceReadOnly();
  if (!Array.isArray(values)) {
    values = [String(values)];
  }
  this.queryData_.setValues(key, values);
  return this;
};
goog.Uri.prototype.getParameterValues = function(name) {
  return this.queryData_.getValues(name);
};
goog.Uri.prototype.getParameterValue = function(paramName) {
  return this.queryData_.get(paramName);
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_;
};
goog.Uri.prototype.setFragment = function(newFragment, opt_decode) {
  this.enforceReadOnly();
  this.fragment_ = opt_decode ? goog.Uri.decodeOrEmpty_(newFragment) : newFragment;
  return this;
};
goog.Uri.prototype.hasFragment = function() {
  return !!this.fragment_;
};
goog.Uri.prototype.hasSameDomainAs = function(uri2) {
  return (!this.hasDomain() && !uri2.hasDomain() || this.getDomain() == uri2.getDomain()) && (!this.hasPort() && !uri2.hasPort() || this.getPort() == uri2.getPort());
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this;
};
goog.Uri.prototype.removeParameter = function(key) {
  this.enforceReadOnly();
  this.queryData_.remove(key);
  return this;
};
goog.Uri.prototype.setReadOnly = function(isReadOnly) {
  this.isReadOnly_ = isReadOnly;
  return this;
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_;
};
goog.Uri.prototype.enforceReadOnly = function() {
  if (this.isReadOnly_) {
    throw new Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(ignoreCase) {
  this.ignoreCase_ = ignoreCase;
  if (this.queryData_) {
    this.queryData_.setIgnoreCase(ignoreCase);
  }
  return this;
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_;
};
goog.Uri.parse = function(uri, opt_ignoreCase) {
  return uri instanceof goog.Uri ? uri.clone() : new goog.Uri(uri, opt_ignoreCase);
};
goog.Uri.create = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_query, opt_fragment, opt_ignoreCase) {
  var uri = new goog.Uri(null, opt_ignoreCase);
  opt_scheme && uri.setScheme(opt_scheme);
  opt_userInfo && uri.setUserInfo(opt_userInfo);
  opt_domain && uri.setDomain(opt_domain);
  opt_port && uri.setPort(opt_port);
  opt_path && uri.setPath(opt_path);
  opt_query && uri.setQueryData(opt_query);
  opt_fragment && uri.setFragment(opt_fragment);
  return uri;
};
goog.Uri.resolve = function(base, rel) {
  if (!(base instanceof goog.Uri)) {
    base = goog.Uri.parse(base);
  }
  if (!(rel instanceof goog.Uri)) {
    rel = goog.Uri.parse(rel);
  }
  return base.resolve(rel);
};
goog.Uri.removeDotSegments = function(path) {
  if (path == ".." || path == ".") {
    return "";
  } else if (!goog.string.contains(path, "./") && !goog.string.contains(path, "/.")) {
    return path;
  } else {
    var leadingSlash = goog.string.startsWith(path, "/");
    var segments = path.split("/");
    var out = [];
    for (var pos = 0; pos < segments.length;) {
      var segment = segments[pos++];
      if (segment == ".") {
        if (leadingSlash && pos == segments.length) {
          out.push("");
        }
      } else if (segment == "..") {
        if (out.length > 1 || out.length == 1 && out[0] != "") {
          out.pop();
        }
        if (leadingSlash && pos == segments.length) {
          out.push("");
        }
      } else {
        out.push(segment);
        leadingSlash = true;
      }
    }
    return out.join("/");
  }
};
goog.Uri.decodeOrEmpty_ = function(val, opt_preserveReserved) {
  if (!val) {
    return "";
  }
  return opt_preserveReserved ? decodeURI(val.replace(/%25/g, "%2525")) : decodeURIComponent(val);
};
goog.Uri.encodeSpecialChars_ = function(unescapedPart, extra, opt_removeDoubleEncoding) {
  if (typeof unescapedPart === "string") {
    var encoded = encodeURI(unescapedPart).replace(extra, goog.Uri.encodeChar_);
    if (opt_removeDoubleEncoding) {
      encoded = goog.Uri.removeDoubleEncoding_(encoded);
    }
    return encoded;
  }
  return null;
};
goog.Uri.encodeChar_ = function(ch) {
  var n = ch.charCodeAt(0);
  return "%" + (n >> 4 & 15).toString(16) + (n & 15).toString(16);
};
goog.Uri.removeDoubleEncoding_ = function(doubleEncodedString) {
  return doubleEncodedString.replace(/%25([0-9a-fA-F]{2})/g, "%$1");
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(uri1String, uri2String) {
  var pieces1 = goog.uri.utils.split(uri1String);
  var pieces2 = goog.uri.utils.split(uri2String);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT];
};
goog.Uri.QueryData = function(opt_query, opt_ignoreCase) {
  this.keyMap_ = null;
  this.count_ = null;
  this.encodedQuery_ = opt_query || null;
  this.ignoreCase_ = !!opt_ignoreCase;
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if (!this.keyMap_) {
    this.keyMap_ = new Map();
    this.count_ = 0;
    if (this.encodedQuery_) {
      var self = this;
      goog.uri.utils.parseQueryData(this.encodedQuery_, function(name, value) {
        self.add(goog.string.urlDecode(name), value);
      });
    }
  }
};
goog.Uri.QueryData.createFromMap = function(map, opt_ignoreCase) {
  var keys = goog.structs.getKeys(map);
  if (typeof keys == "undefined") {
    throw new Error("Keys are undefined");
  }
  var queryData = new goog.Uri.QueryData(null, opt_ignoreCase);
  var values = goog.structs.getValues(map);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = values[i];
    if (!Array.isArray(value)) {
      queryData.add(key, value);
    } else {
      queryData.setValues(key, value);
    }
  }
  return queryData;
};
goog.Uri.QueryData.createFromKeysValues = function(keys, values, opt_ignoreCase) {
  if (keys.length != values.length) {
    throw new Error("Mismatched lengths for keys/values");
  }
  var queryData = new goog.Uri.QueryData(null, opt_ignoreCase);
  for (var i = 0; i < keys.length; i++) {
    queryData.add(keys[i], values[i]);
  }
  return queryData;
};
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_;
};
goog.Uri.QueryData.prototype.add = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  var values = this.keyMap_.get(key);
  if (!values) {
    this.keyMap_.set(key, values = []);
  }
  values.push(value);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.remove = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  if (this.keyMap_.has(key)) {
    this.invalidateCache_();
    this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(key).length;
    return this.keyMap_.delete(key);
  }
  return false;
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  this.keyMap_ = null;
  this.count_ = 0;
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return this.count_ == 0;
};
goog.Uri.QueryData.prototype.containsKey = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.has(key);
};
goog.Uri.QueryData.prototype.containsValue = function(value) {
  var vals = this.getValues();
  return goog.array.contains(vals, value);
};
goog.Uri.QueryData.prototype.forEach = function(f, opt_scope) {
  this.ensureKeyMapInitialized_();
  this.keyMap_.forEach(function(values, key) {
    values.forEach(function(value) {
      f.call(opt_scope, value, key, this);
    }, this);
  }, this);
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  const vals = Array.from(this.keyMap_.values());
  const keys = Array.from(this.keyMap_.keys());
  const rv = [];
  for (let i = 0; i < keys.length; i++) {
    const val = vals[i];
    for (let j = 0; j < val.length; j++) {
      rv.push(keys[i]);
    }
  }
  return rv;
};
goog.Uri.QueryData.prototype.getValues = function(opt_key) {
  this.ensureKeyMapInitialized_();
  let rv = [];
  if (typeof opt_key === "string") {
    if (this.containsKey(opt_key)) {
      rv = rv.concat(this.keyMap_.get(this.getKeyName_(opt_key)));
    }
  } else {
    const values = Array.from(this.keyMap_.values());
    for (let i = 0; i < values.length; i++) {
      rv = rv.concat(values[i]);
    }
  }
  return rv;
};
goog.Uri.QueryData.prototype.set = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if (this.containsKey(key)) {
    this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(key).length;
  }
  this.keyMap_.set(key, [value]);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.get = function(key, opt_default) {
  if (!key) {
    return opt_default;
  }
  var values = this.getValues(key);
  return values.length > 0 ? String(values[0]) : opt_default;
};
goog.Uri.QueryData.prototype.setValues = function(key, values) {
  this.remove(key);
  if (values.length > 0) {
    this.invalidateCache_();
    this.keyMap_.set(this.getKeyName_(key), goog.array.clone(values));
    this.count_ = goog.asserts.assertNumber(this.count_) + values.length;
  }
};
goog.Uri.QueryData.prototype.toString = function() {
  if (this.encodedQuery_) {
    return this.encodedQuery_;
  }
  if (!this.keyMap_) {
    return "";
  }
  const sb = [];
  const keys = Array.from(this.keyMap_.keys());
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const encodedKey = goog.string.urlEncode(key);
    const val = this.getValues(key);
    for (var j = 0; j < val.length; j++) {
      var param = encodedKey;
      if (val[j] !== "") {
        param += "\x3d" + goog.string.urlEncode(val[j]);
      }
      sb.push(param);
    }
  }
  return this.encodedQuery_ = sb.join("\x26");
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  return goog.Uri.decodeOrEmpty_(this.toString());
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  this.encodedQuery_ = null;
};
goog.Uri.QueryData.prototype.filterKeys = function(keys) {
  this.ensureKeyMapInitialized_();
  this.keyMap_.forEach(function(value, key) {
    if (!goog.array.contains(keys, key)) {
      this.remove(key);
    }
  }, this);
  return this;
};
goog.Uri.QueryData.prototype.clone = function() {
  var rv = new goog.Uri.QueryData();
  rv.encodedQuery_ = this.encodedQuery_;
  if (this.keyMap_) {
    rv.keyMap_ = new Map(this.keyMap_);
    rv.count_ = this.count_;
  }
  return rv;
};
goog.Uri.QueryData.prototype.getKeyName_ = function(arg) {
  var keyName = String(arg);
  if (this.ignoreCase_) {
    keyName = keyName.toLowerCase();
  }
  return keyName;
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(ignoreCase) {
  var resetKeys = ignoreCase && !this.ignoreCase_;
  if (resetKeys) {
    this.ensureKeyMapInitialized_();
    this.invalidateCache_();
    this.keyMap_.forEach(function(value, key) {
      var lowerCase = key.toLowerCase();
      if (key != lowerCase) {
        this.remove(key);
        this.setValues(lowerCase, value);
      }
    }, this);
  }
  this.ignoreCase_ = ignoreCase;
};
goog.Uri.QueryData.prototype.extend = function(var_args) {
  for (var i = 0; i < arguments.length; i++) {
    var data = arguments[i];
    goog.structs.forEach(data, function(value, key) {
      this.add(key, value);
    }, this);
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.uri.uri.js");

goog.provide("goog.string.StringBuffer");
goog.string.StringBuffer = function(opt_a1, var_args) {
  if (opt_a1 != null) {
    this.append.apply(this, arguments);
  }
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(s) {
  this.buffer_ = "" + s;
};
goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
  this.buffer_ += String(a1);
  if (opt_a2 != null) {
    for (let i = 1; i < arguments.length; i++) {
      this.buffer_ += arguments[i];
    }
  }
  return this;
};
goog.string.StringBuffer.prototype.clear = function() {
  this.buffer_ = "";
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.buffer_.length;
};
goog.string.StringBuffer.prototype.toString = function() {
  return this.buffer_;
};

$CLJS.SHADOW_ENV.setLoaded("goog.string.stringbuffer.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent.engine");
  goog.module.declareLegacyNamespace();
  const googArray = goog.require("goog.array");
  const googString = goog.require("goog.string.internal");
  const util = goog.require("goog.labs.userAgent.util");
  function isPresto() {
    return util.matchUserAgent("Presto");
  }
  function isTrident() {
    return util.matchUserAgent("Trident") || util.matchUserAgent("MSIE");
  }
  function isEdge() {
    return util.matchUserAgent("Edge");
  }
  function isWebKit() {
    return util.matchUserAgentIgnoreCase("WebKit") && !isEdge();
  }
  function isGecko() {
    return util.matchUserAgent("Gecko") && !isWebKit() && !isTrident() && !isEdge();
  }
  function getVersion() {
    const userAgentString = util.getUserAgent();
    if (userAgentString) {
      const tuples = util.extractVersionTuples(userAgentString);
      const engineTuple = getEngineTuple(tuples);
      if (engineTuple) {
        if (engineTuple[0] == "Gecko") {
          return getVersionForKey(tuples, "Firefox");
        }
        return engineTuple[1];
      }
      const browserTuple = tuples[0];
      let info;
      if (browserTuple && (info = browserTuple[2])) {
        const match = /Trident\/([^\s;]+)/.exec(info);
        if (match) {
          return match[1];
        }
      }
    }
    return "";
  }
  function getEngineTuple(tuples) {
    if (!isEdge()) {
      return tuples[1];
    }
    for (let i = 0; i < tuples.length; i++) {
      const tuple = tuples[i];
      if (tuple[0] == "Edge") {
        return tuple;
      }
    }
  }
  function isVersionOrHigher(version) {
    return googString.compareVersions(getVersion(), version) >= 0;
  }
  function getVersionForKey(tuples, key) {
    const pair = googArray.find(tuples, function(pair) {
      return key == pair[0];
    });
    return pair && pair[1] || "";
  }
  exports = {getVersion, isEdge, isGecko, isPresto, isTrident, isVersionOrHigher, isWebKit,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.labs.useragent.engine.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent.platform");
  goog.module.declareLegacyNamespace();
  const googString = goog.require("goog.string.internal");
  const util = goog.require("goog.labs.userAgent.util");
  const {AsyncValue, Version} = goog.require("goog.labs.userAgent.highEntropy.highEntropyValue");
  const {platformVersion} = goog.require("goog.labs.userAgent.highEntropy.highEntropyData");
  const {useClientHints} = goog.require("goog.labs.userAgent");
  function useUserAgentDataPlatform(ignoreClientHintsFlag = false) {
    if (util.ASSUME_CLIENT_HINTS_SUPPORT) {
      return true;
    }
    if (!ignoreClientHintsFlag && !useClientHints()) {
      return false;
    }
    const userAgentData = util.getUserAgentData();
    return !!userAgentData && !!userAgentData.platform;
  }
  function isAndroid() {
    if (useUserAgentDataPlatform()) {
      return util.getUserAgentData().platform === "Android";
    }
    return util.matchUserAgent("Android");
  }
  function isIpod() {
    return util.matchUserAgent("iPod");
  }
  function isIphone() {
    return util.matchUserAgent("iPhone") && !util.matchUserAgent("iPod") && !util.matchUserAgent("iPad");
  }
  function isIpad() {
    return util.matchUserAgent("iPad");
  }
  function isIos() {
    return isIphone() || isIpad() || isIpod();
  }
  function isMacintosh() {
    if (useUserAgentDataPlatform()) {
      return util.getUserAgentData().platform === "macOS";
    }
    return util.matchUserAgent("Macintosh");
  }
  function isLinux() {
    if (useUserAgentDataPlatform()) {
      return util.getUserAgentData().platform === "Linux";
    }
    return util.matchUserAgent("Linux");
  }
  function isWindows() {
    if (useUserAgentDataPlatform()) {
      return util.getUserAgentData().platform === "Windows";
    }
    return util.matchUserAgent("Windows");
  }
  function isChromeOS() {
    if (useUserAgentDataPlatform()) {
      return util.getUserAgentData().platform === "Chrome OS";
    }
    return util.matchUserAgent("CrOS");
  }
  function isChromecast() {
    return util.matchUserAgent("CrKey");
  }
  function isKaiOS() {
    return util.matchUserAgentIgnoreCase("KaiOS");
  }
  function getVersion() {
    const userAgentString = util.getUserAgent();
    let version = "", re;
    if (isWindows()) {
      re = /Windows (?:NT|Phone) ([0-9.]+)/;
      const match = re.exec(userAgentString);
      if (match) {
        version = match[1];
      } else {
        version = "0.0";
      }
    } else if (isIos()) {
      re = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/;
      const match = re.exec(userAgentString);
      version = match && match[1].replace(/_/g, ".");
    } else if (isMacintosh()) {
      re = /Mac OS X ([0-9_.]+)/;
      const match = re.exec(userAgentString);
      version = match ? match[1].replace(/_/g, ".") : "10";
    } else if (isKaiOS()) {
      re = /(?:KaiOS)\/(\S+)/i;
      const match = re.exec(userAgentString);
      version = match && match[1];
    } else if (isAndroid()) {
      re = /Android\s+([^\);]+)(\)|;)/;
      const match = re.exec(userAgentString);
      version = match && match[1];
    } else if (isChromeOS()) {
      re = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/;
      const match = re.exec(userAgentString);
      version = match && match[1];
    }
    return version || "";
  }
  function isVersionOrHigher(version) {
    return googString.compareVersions(getVersion(), version) >= 0;
  }
  class PlatformVersion {
    constructor() {
      this.preUachHasLoaded_ = false;
    }
    getIfLoaded() {
      if (useUserAgentDataPlatform(true)) {
        const loadedPlatformVersion = platformVersion.getIfLoaded();
        if (loadedPlatformVersion === undefined) {
          return undefined;
        }
        return new Version(loadedPlatformVersion);
      } else if (!this.preUachHasLoaded_) {
        return undefined;
      } else {
        return new Version(getVersion());
      }
    }
    async load() {
      if (useUserAgentDataPlatform(true)) {
        return new Version(await platformVersion.load());
      } else {
        this.preUachHasLoaded_ = true;
        return new Version(getVersion());
      }
    }
    resetForTesting() {
      platformVersion.resetForTesting();
      this.preUachHasLoaded_ = false;
    }
  }
  const version = new PlatformVersion();
  exports = {getVersion, isAndroid, isChromeOS, isChromecast, isIos, isIpad, isIphone, isIpod, isKaiOS, isLinux, isMacintosh, isVersionOrHigher, isWindows, version,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.labs.useragent.platform.js");

goog.provide("goog.userAgent");
goog.require("goog.labs.userAgent.browser");
goog.require("goog.labs.userAgent.engine");
goog.require("goog.labs.userAgent.platform");
goog.require("goog.labs.userAgent.util");
goog.require("goog.reflect");
goog.require("goog.string.internal");
goog.userAgent.ASSUME_IE = goog.define("goog.userAgent.ASSUME_IE", false);
goog.userAgent.ASSUME_EDGE = goog.define("goog.userAgent.ASSUME_EDGE", false);
goog.userAgent.ASSUME_GECKO = goog.define("goog.userAgent.ASSUME_GECKO", false);
goog.userAgent.ASSUME_WEBKIT = goog.define("goog.userAgent.ASSUME_WEBKIT", false);
goog.userAgent.ASSUME_MOBILE_WEBKIT = goog.define("goog.userAgent.ASSUME_MOBILE_WEBKIT", false);
goog.userAgent.ASSUME_OPERA = goog.define("goog.userAgent.ASSUME_OPERA", false);
goog.userAgent.ASSUME_ANY_VERSION = goog.define("goog.userAgent.ASSUME_ANY_VERSION", false);
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigatorTyped = function() {
  return goog.global["navigator"] || null;
};
goog.userAgent.getNavigator = function() {
  return goog.userAgent.getNavigatorTyped();
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var navigator = goog.userAgent.getNavigatorTyped();
  return navigator && navigator.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = goog.define("goog.userAgent.ASSUME_MAC", false);
goog.userAgent.ASSUME_WINDOWS = goog.define("goog.userAgent.ASSUME_WINDOWS", false);
goog.userAgent.ASSUME_LINUX = goog.define("goog.userAgent.ASSUME_LINUX", false);
goog.userAgent.ASSUME_X11 = goog.define("goog.userAgent.ASSUME_X11", false);
goog.userAgent.ASSUME_ANDROID = goog.define("goog.userAgent.ASSUME_ANDROID", false);
goog.userAgent.ASSUME_IPHONE = goog.define("goog.userAgent.ASSUME_IPHONE", false);
goog.userAgent.ASSUME_IPAD = goog.define("goog.userAgent.ASSUME_IPAD", false);
goog.userAgent.ASSUME_IPOD = goog.define("goog.userAgent.ASSUME_IPOD", false);
goog.userAgent.ASSUME_KAIOS = goog.define("goog.userAgent.ASSUME_KAIOS", false);
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var navigator = goog.userAgent.getNavigatorTyped();
  return !!navigator && goog.string.internal.contains(navigator["appVersion"] || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_KAIOS : goog.labs.userAgent.platform.isKaiOS();
goog.userAgent.determineVersion_ = function() {
  var version = "";
  var arr = goog.userAgent.getVersionRegexResult_();
  if (arr) {
    version = arr ? arr[1] : "";
  }
  if (goog.userAgent.IE) {
    var docMode = goog.userAgent.getDocumentMode_();
    if (docMode != null && docMode > parseFloat(version)) {
      return String(docMode);
    }
  }
  return version;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var userAgent = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv:([^\);]+)(\)|;)/.exec(userAgent);
  }
  if (goog.userAgent.EDGE) {
    return /Edge\/([\d\.]+)/.exec(userAgent);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(userAgent);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec(userAgent);
  }
  if (goog.userAgent.OPERA) {
    return /(?:Version)[ \/]?(\S+)/.exec(userAgent);
  }
  return undefined;
};
goog.userAgent.getDocumentMode_ = function() {
  var doc = goog.global["document"];
  return doc ? doc["documentMode"] : undefined;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(v1, v2) {
  return goog.string.internal.compareVersions(v1, v2);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(version) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, version, function() {
    return goog.string.internal.compareVersions(goog.userAgent.VERSION, version) >= 0;
  });
};
goog.userAgent.isDocumentModeOrHigher = function(documentMode) {
  return Number(goog.userAgent.DOCUMENT_MODE) >= documentMode;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
  var doc = goog.global["document"];
  if (!doc || !goog.userAgent.IE) {
    return undefined;
  }
  var documentMode = goog.userAgent.getDocumentMode_();
  if (documentMode) {
    return documentMode;
  }
  var ieVersion = parseInt(goog.userAgent.VERSION, 10);
  return ieVersion || undefined;
}();

$CLJS.SHADOW_ENV.setLoaded("goog.useragent.useragent.js");

goog.provide("goog.dom.BrowserFeature");
goog.require("goog.userAgent");
goog.dom.BrowserFeature.ASSUME_NO_OFFSCREEN_CANVAS = goog.define("goog.dom.ASSUME_NO_OFFSCREEN_CANVAS", false);
goog.dom.BrowserFeature.ASSUME_OFFSCREEN_CANVAS = goog.define("goog.dom.ASSUME_OFFSCREEN_CANVAS", false);
goog.dom.BrowserFeature.detectOffscreenCanvas_ = function(contextName) {
  try {
    return Boolean((new self.OffscreenCanvas(0, 0)).getContext(contextName));
  } catch (ex) {
  }
  return false;
};
goog.dom.BrowserFeature.OFFSCREEN_CANVAS_2D = !goog.dom.BrowserFeature.ASSUME_NO_OFFSCREEN_CANVAS && (goog.dom.BrowserFeature.ASSUME_OFFSCREEN_CANVAS || goog.dom.BrowserFeature.detectOffscreenCanvas_("2d"));
goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES = true;
goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE = true;
goog.dom.BrowserFeature.CAN_USE_INNER_TEXT = false;
goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY = goog.userAgent.IE || goog.userAgent.WEBKIT;
goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT = goog.userAgent.IE;

$CLJS.SHADOW_ENV.setLoaded("goog.dom.browserfeature.js");

goog.provide("goog.math");
goog.require("goog.asserts");
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
};
goog.math.modulo = function(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
};
goog.math.lerp = function(a, b, x) {
  return a + x * (b - a);
};
goog.math.nearlyEquals = function(a, b, opt_tolerance) {
  return Math.abs(a - b) <= (opt_tolerance || 0.000001);
};
goog.math.standardAngle = function(angle) {
  return goog.math.modulo(angle, 360);
};
goog.math.standardAngleInRadians = function(angle) {
  return goog.math.modulo(angle, 2 * Math.PI);
};
goog.math.toRadians = function(angleDegrees) {
  return angleDegrees * Math.PI / 180;
};
goog.math.toDegrees = function(angleRadians) {
  return angleRadians * 180 / Math.PI;
};
goog.math.angleDx = function(degrees, radius) {
  return radius * Math.cos(goog.math.toRadians(degrees));
};
goog.math.angleDy = function(degrees, radius) {
  return radius * Math.sin(goog.math.toRadians(degrees));
};
goog.math.angle = function(x1, y1, x2, y2) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
goog.math.angleDifference = function(startAngle, endAngle) {
  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);
  if (d > 180) {
    d = d - 360;
  } else if (d <= -180) {
    d = 360 + d;
  }
  return d;
};
goog.math.sign = function(x) {
  if (x > 0) {
    return 1;
  }
  if (x < 0) {
    return -1;
  }
  return x;
};
goog.math.longestCommonSubsequence = function(array1, array2, opt_compareFn, opt_collectorFn) {
  var compare = opt_compareFn || function(a, b) {
    return a == b;
  };
  var collect = opt_collectorFn || function(i1, i2) {
    return array1[i1];
  };
  var length1 = array1.length;
  var length2 = array2.length;
  var arr = [];
  for (var i = 0; i < length1 + 1; i++) {
    arr[i] = [];
    arr[i][0] = 0;
  }
  for (var j = 0; j < length2 + 1; j++) {
    arr[0][j] = 0;
  }
  for (i = 1; i <= length1; i++) {
    for (j = 1; j <= length2; j++) {
      if (compare(array1[i - 1], array2[j - 1])) {
        arr[i][j] = arr[i - 1][j - 1] + 1;
      } else {
        arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
      }
    }
  }
  var result = [];
  var i = length1, j = length2;
  while (i > 0 && j > 0) {
    if (compare(array1[i - 1], array2[j - 1])) {
      result.unshift(collect(i - 1, j - 1));
      i--;
      j--;
    } else {
      if (arr[i - 1][j] > arr[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  }
  return result;
};
goog.math.sum = function(var_args) {
  return Array.prototype.reduce.call(arguments, function(sum, value) {
    return sum + value;
  }, 0);
};
goog.math.average = function(var_args) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(var_args) {
  var sampleSize = arguments.length;
  if (sampleSize < 2) {
    return 0;
  }
  var mean = goog.math.average.apply(null, arguments);
  var variance = goog.math.sum.apply(null, Array.prototype.map.call(arguments, function(val) {
    return Math.pow(val - mean, 2);
  })) / (sampleSize - 1);
  return variance;
};
goog.math.standardDeviation = function(var_args) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(num) {
  return isFinite(num) && num % 1 == 0;
};
goog.math.isFiniteNumber = function(num) {
  return isFinite(num);
};
goog.math.isNegativeZero = function(num) {
  return num == 0 && 1 / num < 0;
};
goog.math.log10Floor = function(num) {
  if (num > 0) {
    var x = Math.round(Math.log(num) * Math.LOG10E);
    return x - (parseFloat("1e" + x) > num ? 1 : 0);
  }
  return num == 0 ? -Infinity : NaN;
};
goog.math.safeFloor = function(num, opt_epsilon) {
  goog.asserts.assert(opt_epsilon === undefined || opt_epsilon > 0);
  return Math.floor(num + (opt_epsilon || 2e-15));
};
goog.math.safeCeil = function(num, opt_epsilon) {
  goog.asserts.assert(opt_epsilon === undefined || opt_epsilon > 0);
  return Math.ceil(num - (opt_epsilon || 2e-15));
};

$CLJS.SHADOW_ENV.setLoaded("goog.math.math.js");

goog.provide("goog.math.Coordinate");
goog.require("goog.math");
goog.math.Coordinate = function(opt_x, opt_y) {
  this.x = opt_x !== undefined ? opt_x : 0;
  this.y = opt_y !== undefined ? opt_y : 0;
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y);
};
if (goog.DEBUG) {
  goog.math.Coordinate.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")";
  };
}
goog.math.Coordinate.prototype.equals = function(other) {
  return other instanceof goog.math.Coordinate && goog.math.Coordinate.equals(this, other);
};
goog.math.Coordinate.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.x == b.x && a.y == b.y;
};
goog.math.Coordinate.distance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};
goog.math.Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
goog.math.Coordinate.azimuth = function(a) {
  return goog.math.angle(0, 0, a.x, a.y);
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return dx * dx + dy * dy;
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};
goog.math.Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
goog.math.Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
goog.math.Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
goog.math.Coordinate.prototype.translate = function(tx, opt_ty) {
  if (tx instanceof goog.math.Coordinate) {
    this.x += tx.x;
    this.y += tx.y;
  } else {
    this.x += Number(tx);
    if (typeof opt_ty === "number") {
      this.y += opt_ty;
    }
  }
  return this;
};
goog.math.Coordinate.prototype.scale = function(sx, opt_sy) {
  var sy = typeof opt_sy === "number" ? opt_sy : sx;
  this.x *= sx;
  this.y *= sy;
  return this;
};
goog.math.Coordinate.prototype.rotateRadians = function(radians, opt_center) {
  var center = opt_center || new goog.math.Coordinate(0, 0);
  var x = this.x;
  var y = this.y;
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);
  this.x = (x - center.x) * cos - (y - center.y) * sin + center.x;
  this.y = (x - center.x) * sin + (y - center.y) * cos + center.y;
};
goog.math.Coordinate.prototype.rotateDegrees = function(degrees, opt_center) {
  this.rotateRadians(goog.math.toRadians(degrees), opt_center);
};

$CLJS.SHADOW_ENV.setLoaded("goog.math.coordinate.js");

goog.provide("goog.math.Size");
goog.math.Size = function(width, height) {
  this.width = width;
  this.height = height;
};
goog.math.Size.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.width == b.width && a.height == b.height;
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height);
};
if (goog.DEBUG) {
  goog.math.Size.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")";
  };
}
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height);
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height);
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height;
};
goog.math.Size.prototype.perimeter = function() {
  return (this.width + this.height) * 2;
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height;
};
goog.math.Size.prototype.isEmpty = function() {
  return !this.area();
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Size.prototype.fitsInside = function(target) {
  return this.width <= target.width && this.height <= target.height;
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Size.prototype.scale = function(sx, opt_sy) {
  const sy = typeof opt_sy === "number" ? opt_sy : sx;
  this.width *= sx;
  this.height *= sy;
  return this;
};
goog.math.Size.prototype.scaleToCover = function(target) {
  const s = this.aspectRatio() <= target.aspectRatio() ? target.width / this.width : target.height / this.height;
  return this.scale(s);
};
goog.math.Size.prototype.scaleToFit = function(target) {
  const s = this.aspectRatio() > target.aspectRatio() ? target.width / this.width : target.height / this.height;
  return this.scale(s);
};

$CLJS.SHADOW_ENV.setLoaded("goog.math.size.js");

goog.provide("goog.dom");
goog.provide("goog.dom.Appendable");
goog.provide("goog.dom.DomHelper");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.asserts.dom");
goog.require("goog.dom.BrowserFeature");
goog.require("goog.dom.NodeType");
goog.require("goog.dom.TagName");
goog.require("goog.dom.safe");
goog.require("goog.html.SafeHtml");
goog.require("goog.html.uncheckedconversions");
goog.require("goog.math.Coordinate");
goog.require("goog.math.Size");
goog.require("goog.object");
goog.require("goog.string");
goog.require("goog.string.Const");
goog.require("goog.string.Unicode");
goog.require("goog.userAgent");
goog.dom.ASSUME_QUIRKS_MODE = goog.define("goog.dom.ASSUME_QUIRKS_MODE", false);
goog.dom.ASSUME_STANDARDS_MODE = goog.define("goog.dom.ASSUME_STANDARDS_MODE", false);
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper());
};
goog.dom.defaultDomHelper_;
goog.dom.getDocument = function() {
  return document;
};
goog.dom.getElement = function(element) {
  return goog.dom.getElementHelper_(document, element);
};
goog.dom.getHTMLElement = function(id) {
  const element = goog.dom.getElement(id);
  if (!element) {
    return null;
  }
  return goog.asserts.dom.assertIsHtmlElement(element);
};
goog.dom.getElementHelper_ = function(doc, element) {
  return typeof element === "string" ? doc.getElementById(element) : element;
};
goog.dom.getRequiredElement = function(id) {
  return goog.dom.getRequiredElementHelper_(document, id);
};
goog.dom.getRequiredHTMLElement = function(id) {
  return goog.asserts.dom.assertIsHtmlElement(goog.dom.getRequiredElementHelper_(document, id));
};
goog.dom.getRequiredElementHelper_ = function(doc, id) {
  goog.asserts.assertString(id);
  var element = goog.dom.getElementHelper_(doc, id);
  return goog.asserts.assert(element, "No element found with id: " + id);
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagName = function(tagName, opt_parent) {
  var parent = opt_parent || document;
  return parent.getElementsByTagName(String(tagName));
};
goog.dom.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el);
};
goog.dom.getElementByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementByTagNameAndClass_(document, opt_tag, opt_class, opt_el);
};
goog.dom.getElementsByClass = function(className, opt_el) {
  var parent = opt_el || document;
  if (goog.dom.canUseQuerySelector_(parent)) {
    return parent.querySelectorAll("." + className);
  }
  return goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el);
};
goog.dom.getElementByClass = function(className, opt_el) {
  var parent = opt_el || document;
  var retVal = null;
  if (parent.getElementsByClassName) {
    retVal = parent.getElementsByClassName(className)[0];
  } else {
    retVal = goog.dom.getElementByTagNameAndClass_(document, "*", className, opt_el);
  }
  return retVal || null;
};
goog.dom.getHTMLElementByClass = function(className, opt_parent) {
  const element = goog.dom.getElementByClass(className, opt_parent);
  if (!element) {
    return null;
  }
  return goog.asserts.dom.assertIsHtmlElement(element);
};
goog.dom.getRequiredElementByClass = function(className, opt_root) {
  var retValue = goog.dom.getElementByClass(className, opt_root);
  return goog.asserts.assert(retValue, "No element found with className: " + className);
};
goog.dom.getRequiredHTMLElementByClass = function(className, opt_parent) {
  const retValue = goog.dom.getElementByClass(className, opt_parent);
  goog.asserts.assert(retValue, "No HTMLElement found with className: " + className);
  return goog.asserts.dom.assertIsHtmlElement(retValue);
};
goog.dom.canUseQuerySelector_ = function(parent) {
  return !!(parent.querySelectorAll && parent.querySelector);
};
goog.dom.getElementsByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc;
  var tagName = opt_tag && opt_tag != "*" ? String(opt_tag).toUpperCase() : "";
  if (goog.dom.canUseQuerySelector_(parent) && (tagName || opt_class)) {
    var query = tagName + (opt_class ? "." + opt_class : "");
    return parent.querySelectorAll(query);
  }
  if (opt_class && parent.getElementsByClassName) {
    var els = parent.getElementsByClassName(opt_class);
    if (tagName) {
      var arrayLike = {};
      var len = 0;
      for (var i = 0, el; el = els[i]; i++) {
        if (tagName == el.nodeName) {
          arrayLike[len++] = el;
        }
      }
      arrayLike.length = len;
      return arrayLike;
    } else {
      return els;
    }
  }
  var els = parent.getElementsByTagName(tagName || "*");
  if (opt_class) {
    var arrayLike = {};
    var len = 0;
    for (var i = 0, el; el = els[i]; i++) {
      var className = el.className;
      if (typeof className.split == "function" && goog.array.contains(className.split(/\s+/), opt_class)) {
        arrayLike[len++] = el;
      }
    }
    arrayLike.length = len;
    return arrayLike;
  } else {
    return els;
  }
};
goog.dom.getElementByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc;
  var tag = opt_tag && opt_tag != "*" ? String(opt_tag).toUpperCase() : "";
  if (goog.dom.canUseQuerySelector_(parent) && (tag || opt_class)) {
    return parent.querySelector(tag + (opt_class ? "." + opt_class : ""));
  }
  var elements = goog.dom.getElementsByTagNameAndClass_(doc, opt_tag, opt_class, opt_el);
  return elements[0] || null;
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(element, properties) {
  goog.object.forEach(properties, function(val, key) {
    if (val && typeof val == "object" && val.implementsGoogStringTypedString) {
      val = val.getTypedStringValue();
    }
    if (key == "style") {
      element.style.cssText = val;
    } else if (key == "class") {
      element.className = val;
    } else if (key == "for") {
      element.htmlFor = val;
    } else if (goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(key)) {
      element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val);
    } else if (goog.string.startsWith(key, "aria-") || goog.string.startsWith(key, "data-")) {
      element.setAttribute(key, val);
    } else {
      element[key] = val;
    }
  });
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {"cellpadding":"cellPadding", "cellspacing":"cellSpacing", "colspan":"colSpan", "frameborder":"frameBorder", "height":"height", "maxlength":"maxLength", "nonce":"nonce", "role":"role", "rowspan":"rowSpan", "type":"type", "usemap":"useMap", "valign":"vAlign", "width":"width"};
goog.dom.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window);
};
goog.dom.getViewportSize_ = function(win) {
  var doc = win.document;
  var el = goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight);
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window);
};
goog.dom.getDocumentHeightForWindow = function(win) {
  return goog.dom.getDocumentHeight_(win);
};
goog.dom.getDocumentHeight_ = function(win) {
  var doc = win.document;
  var height = 0;
  if (doc) {
    var body = doc.body;
    var docEl = doc.documentElement;
    if (!(docEl && body)) {
      return 0;
    }
    var vh = goog.dom.getViewportSize_(win).height;
    if (goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight) {
      height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight;
    } else {
      var sh = docEl.scrollHeight;
      var oh = docEl.offsetHeight;
      if (docEl.clientHeight != oh) {
        sh = body.scrollHeight;
        oh = body.offsetHeight;
      }
      if (sh > vh) {
        height = sh > oh ? sh : oh;
      } else {
        height = sh < oh ? sh : oh;
      }
    }
  }
  return height;
};
goog.dom.getPageScroll = function(opt_window) {
  var win = opt_window || goog.global || window;
  return goog.dom.getDomHelper(win.document).getDocumentScroll();
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document);
};
goog.dom.getDocumentScroll_ = function(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc);
  var win = goog.dom.getWindow_(doc);
  if (goog.userAgent.IE && win.pageYOffset != el.scrollTop) {
    return new goog.math.Coordinate(el.scrollLeft, el.scrollTop);
  }
  return new goog.math.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop);
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document);
};
goog.dom.getDocumentScrollElement_ = function(doc) {
  if (doc.scrollingElement) {
    return doc.scrollingElement;
  }
  if (!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc)) {
    return doc.documentElement;
  }
  return doc.body || doc.documentElement;
};
goog.dom.getWindow = function(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window;
};
goog.dom.getWindow_ = function(doc) {
  return doc.parentWindow || doc.defaultView;
};
goog.dom.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createDom_ = function(doc, args) {
  var tagName = String(args[0]);
  var attributes = args[1];
  var element = goog.dom.createElement_(doc, tagName);
  if (attributes) {
    if (typeof attributes === "string") {
      element.className = attributes;
    } else if (Array.isArray(attributes)) {
      element.className = attributes.join(" ");
    } else {
      goog.dom.setProperties(element, attributes);
    }
  }
  if (args.length > 2) {
    goog.dom.append_(doc, element, args, 2);
  }
  return element;
};
goog.dom.append_ = function(doc, parent, args, startIndex) {
  function childHandler(child) {
    if (child) {
      parent.appendChild(typeof child === "string" ? doc.createTextNode(child) : child);
    }
  }
  for (var i = startIndex; i < args.length; i++) {
    var arg = args[i];
    if (goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg)) {
      goog.array.forEach(goog.dom.isNodeList(arg) ? goog.array.toArray(arg) : arg, childHandler);
    } else {
      childHandler(arg);
    }
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(name) {
  return goog.dom.createElement_(document, name);
};
goog.dom.createElement_ = function(doc, name) {
  name = String(name);
  if (doc.contentType === "application/xhtml+xml") {
    name = name.toLowerCase();
  }
  return doc.createElement(name);
};
goog.dom.createTextNode = function(content) {
  return document.createTextNode(String(content));
};
goog.dom.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(document, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.createTable_ = function(doc, rows, columns, fillWithNbsp) {
  var table = goog.dom.createElement_(doc, goog.dom.TagName.TABLE);
  var tbody = table.appendChild(goog.dom.createElement_(doc, goog.dom.TagName.TBODY));
  for (var i = 0; i < rows; i++) {
    var tr = goog.dom.createElement_(doc, goog.dom.TagName.TR);
    for (var j = 0; j < columns; j++) {
      var td = goog.dom.createElement_(doc, goog.dom.TagName.TD);
      if (fillWithNbsp) {
        goog.dom.setTextContent(td, goog.string.Unicode.NBSP);
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  return table;
};
goog.dom.constHtmlToNode = function(var_args) {
  var stringArray = Array.prototype.map.call(arguments, goog.string.Const.unwrap);
  var safeHtml = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a " + "Node later, so it will be automatically balanced."), stringArray.join(""));
  return goog.dom.safeHtmlToNode(safeHtml);
};
goog.dom.safeHtmlToNode = function(html) {
  return goog.dom.safeHtmlToNode_(document, html);
};
goog.dom.safeHtmlToNode_ = function(doc, html) {
  var tempDiv = goog.dom.createElement_(doc, goog.dom.TagName.DIV);
  if (goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT) {
    goog.dom.safe.setInnerHtml(tempDiv, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, html));
    tempDiv.removeChild(goog.asserts.assert(tempDiv.firstChild));
  } else {
    goog.dom.safe.setInnerHtml(tempDiv, html);
  }
  return goog.dom.childrenToNode_(doc, tempDiv);
};
goog.dom.childrenToNode_ = function(doc, tempDiv) {
  if (tempDiv.childNodes.length == 1) {
    return tempDiv.removeChild(goog.asserts.assert(tempDiv.firstChild));
  } else {
    var fragment = doc.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document);
};
goog.dom.isCss1CompatMode_ = function(doc) {
  if (goog.dom.COMPAT_MODE_KNOWN_) {
    return goog.dom.ASSUME_STANDARDS_MODE;
  }
  return doc.compatMode == "CSS1Compat";
};
goog.dom.canHaveChildren = function(node) {
  if (node.nodeType != goog.dom.NodeType.ELEMENT) {
    return false;
  }
  switch(node.tagName) {
    case String(goog.dom.TagName.APPLET):
    case String(goog.dom.TagName.AREA):
    case String(goog.dom.TagName.BASE):
    case String(goog.dom.TagName.BR):
    case String(goog.dom.TagName.COL):
    case String(goog.dom.TagName.COMMAND):
    case String(goog.dom.TagName.EMBED):
    case String(goog.dom.TagName.FRAME):
    case String(goog.dom.TagName.HR):
    case String(goog.dom.TagName.IMG):
    case String(goog.dom.TagName.INPUT):
    case String(goog.dom.TagName.IFRAME):
    case String(goog.dom.TagName.ISINDEX):
    case String(goog.dom.TagName.KEYGEN):
    case String(goog.dom.TagName.LINK):
    case String(goog.dom.TagName.NOFRAMES):
    case String(goog.dom.TagName.NOSCRIPT):
    case String(goog.dom.TagName.META):
    case String(goog.dom.TagName.OBJECT):
    case String(goog.dom.TagName.PARAM):
    case String(goog.dom.TagName.SCRIPT):
    case String(goog.dom.TagName.SOURCE):
    case String(goog.dom.TagName.STYLE):
    case String(goog.dom.TagName.TRACK):
    case String(goog.dom.TagName.WBR):
      return false;
  }
  return true;
};
goog.dom.appendChild = function(parent, child) {
  goog.asserts.assert(parent != null && child != null, "goog.dom.appendChild expects non-null arguments");
  parent.appendChild(child);
};
goog.dom.append = function(parent, var_args) {
  goog.dom.append_(goog.dom.getOwnerDocument(parent), parent, arguments, 1);
};
goog.dom.removeChildren = function(node) {
  var child;
  while (child = node.firstChild) {
    node.removeChild(child);
  }
};
goog.dom.insertSiblingBefore = function(newNode, refNode) {
  goog.asserts.assert(newNode != null && refNode != null, "goog.dom.insertSiblingBefore expects non-null arguments");
  if (refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode);
  }
};
goog.dom.insertSiblingAfter = function(newNode, refNode) {
  goog.asserts.assert(newNode != null && refNode != null, "goog.dom.insertSiblingAfter expects non-null arguments");
  if (refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
  }
};
goog.dom.insertChildAt = function(parent, child, index) {
  goog.asserts.assert(parent != null, "goog.dom.insertChildAt expects a non-null parent");
  parent.insertBefore(child, parent.childNodes[index] || null);
};
goog.dom.removeNode = function(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};
goog.dom.replaceNode = function(newNode, oldNode) {
  goog.asserts.assert(newNode != null && oldNode != null, "goog.dom.replaceNode expects non-null arguments");
  var parent = oldNode.parentNode;
  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
};
goog.dom.copyContents = function(target, source) {
  goog.asserts.assert(target != null && source != null, "goog.dom.copyContents expects non-null arguments");
  var childNodes = source.cloneNode(true).childNodes;
  goog.dom.removeChildren(target);
  while (childNodes.length) {
    target.appendChild(childNodes[0]);
  }
};
goog.dom.flattenElement = function(element) {
  var child, parent = element.parentNode;
  if (parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if (element.removeNode) {
      return element.removeNode(false);
    } else {
      while (child = element.firstChild) {
        parent.insertBefore(child, element);
      }
      return goog.dom.removeNode(element);
    }
  }
};
goog.dom.getChildren = function(element) {
  if (element.children != undefined) {
    return element.children;
  }
  return Array.prototype.filter.call(element.childNodes, function(node) {
    return node.nodeType == goog.dom.NodeType.ELEMENT;
  });
};
goog.dom.getFirstElementChild = function(node) {
  if (node.firstElementChild !== undefined) {
    return node.firstElementChild;
  }
  return goog.dom.getNextElementNode_(node.firstChild, true);
};
goog.dom.getLastElementChild = function(node) {
  if (node.lastElementChild !== undefined) {
    return node.lastElementChild;
  }
  return goog.dom.getNextElementNode_(node.lastChild, false);
};
goog.dom.getNextElementSibling = function(node) {
  if (node.nextElementSibling !== undefined) {
    return node.nextElementSibling;
  }
  return goog.dom.getNextElementNode_(node.nextSibling, true);
};
goog.dom.getPreviousElementSibling = function(node) {
  if (node.previousElementSibling !== undefined) {
    return node.previousElementSibling;
  }
  return goog.dom.getNextElementNode_(node.previousSibling, false);
};
goog.dom.getNextElementNode_ = function(node, forward) {
  while (node && node.nodeType != goog.dom.NodeType.ELEMENT) {
    node = forward ? node.nextSibling : node.previousSibling;
  }
  return node;
};
goog.dom.getNextNode = function(node) {
  if (!node) {
    return null;
  }
  if (node.firstChild) {
    return node.firstChild;
  }
  while (node && !node.nextSibling) {
    node = node.parentNode;
  }
  return node ? node.nextSibling : null;
};
goog.dom.getPreviousNode = function(node) {
  if (!node) {
    return null;
  }
  if (!node.previousSibling) {
    return node.parentNode;
  }
  node = node.previousSibling;
  while (node && node.lastChild) {
    node = node.lastChild;
  }
  return node;
};
goog.dom.isNodeLike = function(obj) {
  return goog.isObject(obj) && obj.nodeType > 0;
};
goog.dom.isElement = function(obj) {
  return goog.isObject(obj) && obj.nodeType == goog.dom.NodeType.ELEMENT;
};
goog.dom.isWindow = function(obj) {
  return goog.isObject(obj) && obj["window"] == obj;
};
goog.dom.getParentElement = function(element) {
  var parent;
  if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY) {
    parent = element.parentElement;
    if (parent) {
      return parent;
    }
  }
  parent = element.parentNode;
  return goog.dom.isElement(parent) ? parent : null;
};
goog.dom.contains = function(parent, descendant) {
  if (!parent || !descendant) {
    return false;
  }
  if (parent.contains && descendant.nodeType == goog.dom.NodeType.ELEMENT) {
    return parent == descendant || parent.contains(descendant);
  }
  if (typeof parent.compareDocumentPosition != "undefined") {
    return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16);
  }
  while (descendant && parent != descendant) {
    descendant = descendant.parentNode;
  }
  return descendant == parent;
};
goog.dom.compareNodeOrder = function(node1, node2) {
  if (node1 == node2) {
    return 0;
  }
  if (node1.compareDocumentPosition) {
    return node1.compareDocumentPosition(node2) & 2 ? 1 : -1;
  }
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    if (node1.nodeType == goog.dom.NodeType.DOCUMENT) {
      return -1;
    }
    if (node2.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1;
    }
  }
  if ("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT;
    var isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if (isElement1 && isElement2) {
      return node1.sourceIndex - node2.sourceIndex;
    } else {
      var parent1 = node1.parentNode;
      var parent2 = node2.parentNode;
      if (parent1 == parent2) {
        return goog.dom.compareSiblingOrder_(node1, node2);
      }
      if (!isElement1 && goog.dom.contains(parent1, node2)) {
        return -1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2);
      }
      if (!isElement2 && goog.dom.contains(parent2, node1)) {
        return goog.dom.compareParentsDescendantNodeIe_(node2, node1);
      }
      return (isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex);
    }
  }
  var doc = goog.dom.getOwnerDocument(node1);
  var range1, range2;
  range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(true);
  range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(true);
  return range1.compareBoundaryPoints(goog.global["Range"].START_TO_END, range2);
};
goog.dom.compareParentsDescendantNodeIe_ = function(textNode, node) {
  var parent = textNode.parentNode;
  if (parent == node) {
    return -1;
  }
  var sibling = node;
  while (sibling.parentNode != parent) {
    sibling = sibling.parentNode;
  }
  return goog.dom.compareSiblingOrder_(sibling, textNode);
};
goog.dom.compareSiblingOrder_ = function(node1, node2) {
  var s = node2;
  while (s = s.previousSibling) {
    if (s == node1) {
      return -1;
    }
  }
  return 1;
};
goog.dom.findCommonAncestor = function(var_args) {
  var i, count = arguments.length;
  if (!count) {
    return null;
  } else if (count == 1) {
    return arguments[0];
  }
  var paths = [];
  var minLength = Infinity;
  for (i = 0; i < count; i++) {
    var ancestors = [];
    var node = arguments[i];
    while (node) {
      ancestors.unshift(node);
      node = node.parentNode;
    }
    paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length);
  }
  var output = null;
  for (i = 0; i < minLength; i++) {
    var first = paths[0][i];
    for (var j = 1; j < count; j++) {
      if (first != paths[j][i]) {
        return output;
      }
    }
    output = first;
  }
  return output;
};
goog.dom.isInDocument = function(node) {
  return (node.ownerDocument.compareDocumentPosition(node) & 16) == 16;
};
goog.dom.getOwnerDocument = function(node) {
  goog.asserts.assert(node, "Node cannot be null or undefined.");
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document;
};
goog.dom.getFrameContentDocument = function(frame) {
  return frame.contentDocument || frame.contentWindow.document;
};
goog.dom.getFrameContentWindow = function(frame) {
  try {
    return frame.contentWindow || (frame.contentDocument ? goog.dom.getWindow(frame.contentDocument) : null);
  } catch (e) {
  }
  return null;
};
goog.dom.setTextContent = function(node, text) {
  goog.asserts.assert(node != null, "goog.dom.setTextContent expects a non-null value for node");
  if ("textContent" in node) {
    node.textContent = text;
  } else if (node.nodeType == goog.dom.NodeType.TEXT) {
    node.data = String(text);
  } else if (node.firstChild && node.firstChild.nodeType == goog.dom.NodeType.TEXT) {
    while (node.lastChild != node.firstChild) {
      node.removeChild(goog.asserts.assert(node.lastChild));
    }
    node.firstChild.data = String(text);
  } else {
    goog.dom.removeChildren(node);
    var doc = goog.dom.getOwnerDocument(node);
    node.appendChild(doc.createTextNode(String(text)));
  }
};
goog.dom.getOuterHtml = function(element) {
  goog.asserts.assert(element !== null, "goog.dom.getOuterHtml expects a non-null value for element");
  if ("outerHTML" in element) {
    return element.outerHTML;
  } else {
    var doc = goog.dom.getOwnerDocument(element);
    var div = goog.dom.createElement_(doc, goog.dom.TagName.DIV);
    div.appendChild(element.cloneNode(true));
    return div.innerHTML;
  }
};
goog.dom.findNode = function(root, p) {
  var rv = [];
  var found = goog.dom.findNodes_(root, p, rv, true);
  return found ? rv[0] : undefined;
};
goog.dom.findNodes = function(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, false);
  return rv;
};
goog.dom.findNodes_ = function(root, p, rv, findOne) {
  if (root != null) {
    var child = root.firstChild;
    while (child) {
      if (p(child)) {
        rv.push(child);
        if (findOne) {
          return true;
        }
      }
      if (goog.dom.findNodes_(child, p, rv, findOne)) {
        return true;
      }
      child = child.nextSibling;
    }
  }
  return false;
};
goog.dom.findElement = function(root, pred) {
  var stack = goog.dom.getChildrenReverse_(root);
  while (stack.length > 0) {
    var next = stack.pop();
    if (pred(next)) {
      return next;
    }
    for (var c = next.lastElementChild; c; c = c.previousElementSibling) {
      stack.push(c);
    }
  }
  return null;
};
goog.dom.findElements = function(root, pred) {
  var result = [], stack = goog.dom.getChildrenReverse_(root);
  while (stack.length > 0) {
    var next = stack.pop();
    if (pred(next)) {
      result.push(next);
    }
    for (var c = next.lastElementChild; c; c = c.previousElementSibling) {
      stack.push(c);
    }
  }
  return result;
};
goog.dom.getChildrenReverse_ = function(node) {
  if (node.nodeType == goog.dom.NodeType.DOCUMENT) {
    return [node.documentElement];
  } else {
    var children = [];
    for (var c = node.lastElementChild; c; c = c.previousElementSibling) {
      children.push(c);
    }
    return children;
  }
};
goog.dom.TAGS_TO_IGNORE_ = {"SCRIPT":1, "STYLE":1, "HEAD":1, "IFRAME":1, "OBJECT":1};
goog.dom.PREDEFINED_TAG_VALUES_ = {"IMG":" ", "BR":"\n"};
goog.dom.isFocusableTabIndex = function(element) {
  return goog.dom.hasSpecifiedTabIndex_(element) && goog.dom.isTabIndexFocusable_(element);
};
goog.dom.setFocusableTabIndex = function(element, enable) {
  if (enable) {
    element.tabIndex = 0;
  } else {
    element.tabIndex = -1;
    element.removeAttribute("tabIndex");
  }
};
goog.dom.isFocusable = function(element) {
  var focusable;
  if (goog.dom.nativelySupportsFocus_(element)) {
    focusable = !element.disabled && (!goog.dom.hasSpecifiedTabIndex_(element) || goog.dom.isTabIndexFocusable_(element));
  } else {
    focusable = goog.dom.isFocusableTabIndex(element);
  }
  return focusable && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(element) : focusable;
};
goog.dom.hasSpecifiedTabIndex_ = function(element) {
  return element.hasAttribute("tabindex");
};
goog.dom.isTabIndexFocusable_ = function(element) {
  var index = element.tabIndex;
  return typeof index === "number" && index >= 0 && index < 32768;
};
goog.dom.nativelySupportsFocus_ = function(element) {
  return element.tagName == goog.dom.TagName.A && element.hasAttribute("href") || element.tagName == goog.dom.TagName.INPUT || element.tagName == goog.dom.TagName.TEXTAREA || element.tagName == goog.dom.TagName.SELECT || element.tagName == goog.dom.TagName.BUTTON;
};
goog.dom.hasNonZeroBoundingRect_ = function(element) {
  var rect;
  if (typeof element["getBoundingClientRect"] !== "function" || goog.userAgent.IE && element.parentElement == null) {
    rect = {"height":element.offsetHeight, "width":element.offsetWidth};
  } else {
    rect = element.getBoundingClientRect();
  }
  return rect != null && rect.height > 0 && rect.width > 0;
};
goog.dom.getTextContent = function(node) {
  var textContent;
  var buf = [];
  goog.dom.getTextContent_(node, buf, true);
  textContent = buf.join("");
  textContent = textContent.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  textContent = textContent.replace(/\u200B/g, "");
  textContent = textContent.replace(/ +/g, " ");
  if (textContent != " ") {
    textContent = textContent.replace(/^\s*/, "");
  }
  return textContent;
};
goog.dom.getRawTextContent = function(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, false);
  return buf.join("");
};
goog.dom.getTextContent_ = function(node, buf, normalizeWhitespace) {
  if (node.nodeName in goog.dom.TAGS_TO_IGNORE_) {
  } else if (node.nodeType == goog.dom.NodeType.TEXT) {
    if (normalizeWhitespace) {
      buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, ""));
    } else {
      buf.push(node.nodeValue);
    }
  } else if (node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
    buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName]);
  } else {
    var child = node.firstChild;
    while (child) {
      goog.dom.getTextContent_(child, buf, normalizeWhitespace);
      child = child.nextSibling;
    }
  }
};
goog.dom.getNodeTextLength = function(node) {
  return goog.dom.getTextContent(node).length;
};
goog.dom.getNodeTextOffset = function(node, opt_offsetParent) {
  var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body;
  var buf = [];
  while (node && node != root) {
    var cur = node;
    while (cur = cur.previousSibling) {
      buf.unshift(goog.dom.getTextContent(cur));
    }
    node = node.parentNode;
  }
  return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length;
};
goog.dom.getNodeAtOffset = function(parent, offset, opt_result) {
  var stack = [parent], pos = 0, cur = null;
  while (stack.length > 0 && pos < offset) {
    cur = stack.pop();
    if (cur.nodeName in goog.dom.TAGS_TO_IGNORE_) {
    } else if (cur.nodeType == goog.dom.NodeType.TEXT) {
      var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
      pos += text.length;
    } else if (cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
      pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length;
    } else {
      for (var i = cur.childNodes.length - 1; i >= 0; i--) {
        stack.push(cur.childNodes[i]);
      }
    }
  }
  if (goog.isObject(opt_result)) {
    opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0;
    opt_result.node = cur;
  }
  return cur;
};
goog.dom.isNodeList = function(val) {
  if (val && typeof val.length == "number") {
    if (goog.isObject(val)) {
      return typeof val.item == "function" || typeof val.item == "string";
    } else if (typeof val === "function") {
      return typeof val.item == "function";
    }
  }
  return false;
};
goog.dom.getAncestorByTagNameAndClass = function(element, opt_tag, opt_class, opt_maxSearchSteps) {
  if (!opt_tag && !opt_class) {
    return null;
  }
  var tagName = opt_tag ? String(opt_tag).toUpperCase() : null;
  return goog.dom.getAncestor(element, function(node) {
    return (!tagName || node.nodeName == tagName) && (!opt_class || typeof node.className === "string" && goog.array.contains(node.className.split(/\s+/), opt_class));
  }, true, opt_maxSearchSteps);
};
goog.dom.getAncestorByClass = function(element, className, opt_maxSearchSteps) {
  return goog.dom.getAncestorByTagNameAndClass(element, null, className, opt_maxSearchSteps);
};
goog.dom.getAncestor = function(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  if (element && !opt_includeNode) {
    element = element.parentNode;
  }
  var steps = 0;
  while (element && (opt_maxSearchSteps == null || steps <= opt_maxSearchSteps)) {
    goog.asserts.assert(element.name != "parentNode");
    if (matcher(element)) {
      return element;
    }
    element = element.parentNode;
    steps++;
  }
  return null;
};
goog.dom.getActiveElement = function(doc) {
  try {
    var activeElement = doc && doc.activeElement;
    return activeElement && activeElement.nodeName ? activeElement : null;
  } catch (e) {
    return null;
  }
};
goog.dom.getPixelRatio = function() {
  var win = goog.dom.getWindow();
  if (win.devicePixelRatio !== undefined) {
    return win.devicePixelRatio;
  } else if (win.matchMedia) {
    return goog.dom.matchesPixelRatio_(3) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(1) || .75;
  }
  return 1;
};
goog.dom.matchesPixelRatio_ = function(pixelRatio) {
  var win = goog.dom.getWindow();
  var dpiPerDppx = 96;
  var query = "(min-resolution: " + pixelRatio + "dppx)," + "(min--moz-device-pixel-ratio: " + pixelRatio + ")," + "(min-resolution: " + pixelRatio * dpiPerDppx + "dpi)";
  return win.matchMedia(query).matches ? pixelRatio : 0;
};
goog.dom.getCanvasContext2D = function(canvas) {
  return canvas.getContext("2d");
};
goog.dom.DomHelper = function(opt_document) {
  this.document_ = opt_document || goog.global.document || document;
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(document) {
  this.document_ = document;
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_;
};
goog.dom.DomHelper.prototype.getElement = function(element) {
  return goog.dom.getElementHelper_(this.document_, element);
};
goog.dom.DomHelper.prototype.getRequiredElement = function(id) {
  return goog.dom.getRequiredElementHelper_(this.document_, id);
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagName = function(tagName, opt_parent) {
  var parent = opt_parent || this.document_;
  return parent.getElementsByTagName(String(tagName));
};
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el);
};
goog.dom.DomHelper.prototype.getElementByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el);
};
goog.dom.DomHelper.prototype.getElementsByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementsByClass(className, doc);
};
goog.dom.DomHelper.prototype.getElementByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementByClass(className, doc);
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(className, opt_root) {
  var root = opt_root || this.document_;
  return goog.dom.getRequiredElementByClass(className, root);
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow());
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow());
};
goog.dom.Appendable;
goog.dom.DomHelper.prototype.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(name) {
  return goog.dom.createElement_(this.document_, name);
};
goog.dom.DomHelper.prototype.createTextNode = function(content) {
  return this.document_.createTextNode(String(content));
};
goog.dom.DomHelper.prototype.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(this.document_, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(html) {
  return goog.dom.safeHtmlToNode_(this.document_, html);
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_);
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_);
};
goog.dom.DomHelper.prototype.getActiveElement = function(opt_doc) {
  return goog.dom.getActiveElement(opt_doc || this.document_);
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.copyContents = goog.dom.copyContents;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.DomHelper.prototype.getCanvasContext2D = goog.dom.getCanvasContext2D;

$CLJS.SHADOW_ENV.setLoaded("goog.dom.dom.js");

goog.provide("goog.userAgent.product");
goog.require("goog.labs.userAgent.browser");
goog.require("goog.labs.userAgent.platform");
goog.require("goog.userAgent");
goog.userAgent.product.ASSUME_FIREFOX = goog.define("goog.userAgent.product.ASSUME_FIREFOX", false);
goog.userAgent.product.ASSUME_IPHONE = goog.define("goog.userAgent.product.ASSUME_IPHONE", false);
goog.userAgent.product.ASSUME_IPAD = goog.define("goog.userAgent.product.ASSUME_IPAD", false);
goog.userAgent.product.ASSUME_ANDROID = goog.define("goog.userAgent.product.ASSUME_ANDROID", false);
goog.userAgent.product.ASSUME_CHROME = goog.define("goog.userAgent.product.ASSUME_CHROME", false);
goog.userAgent.product.ASSUME_SAFARI = goog.define("goog.userAgent.product.ASSUME_SAFARI", false);
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.EDGE = goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
goog.userAgent.product.isIphoneOrIpod_ = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
};
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_ = function() {
  return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
};
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();

$CLJS.SHADOW_ENV.setLoaded("goog.useragent.product.js");

goog.provide("goog.dom.InputType");
goog.dom.InputType = {BUTTON:"button", CHECKBOX:"checkbox", COLOR:"color", DATE:"date", DATETIME:"datetime", DATETIME_LOCAL:"datetime-local", EMAIL:"email", FILE:"file", HIDDEN:"hidden", IMAGE:"image", MENU:"menu", MONTH:"month", NUMBER:"number", PASSWORD:"password", RADIO:"radio", RANGE:"range", RESET:"reset", SEARCH:"search", SELECT_MULTIPLE:"select-multiple", SELECT_ONE:"select-one", SUBMIT:"submit", TEL:"tel", TEXT:"text", TEXTAREA:"textarea", TIME:"time", URL:"url", WEEK:"week"};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.inputtype.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.collections.iters");
  goog.module.declareLegacyNamespace();
  function getIterator(iterable) {
    return iterable[goog.global.Symbol.iterator]();
  }
  exports.getIterator = getIterator;
  function forEach(iterator, f) {
    let result;
    while (!(result = iterator.next()).done) {
      f(result.value);
    }
  }
  exports.forEach = forEach;
  class MapIterator {
    constructor(childIter, mapFn) {
      this.childIterator_ = getIterator(childIter);
      this.mapFn_ = mapFn;
    }
    [Symbol.iterator]() {
      return this;
    }
    next() {
      const childResult = this.childIterator_.next();
      return {value:childResult.done ? undefined : this.mapFn_.call(undefined, childResult.value), done:childResult.done,};
    }
  }
  exports.map = function(iterable, f) {
    return new MapIterator(iterable, f);
  };
  class FilterIterator {
    constructor(childIter, filterFn) {
      this.childIter_ = getIterator(childIter);
      this.filterFn_ = filterFn;
    }
    [Symbol.iterator]() {
      return this;
    }
    next() {
      while (true) {
        const childResult = this.childIter_.next();
        if (childResult.done) {
          return {done:true, value:undefined};
        }
        const passesFilter = this.filterFn_.call(undefined, childResult.value);
        if (passesFilter) {
          return childResult;
        }
      }
    }
  }
  exports.filter = function(iterable, f) {
    return new FilterIterator(iterable, f);
  };
  class ConcatIterator {
    constructor(iterators) {
      this.iterators_ = iterators;
      this.iterIndex_ = 0;
    }
    [Symbol.iterator]() {
      return this;
    }
    next() {
      while (this.iterIndex_ < this.iterators_.length) {
        const result = this.iterators_[this.iterIndex_].next();
        if (!result.done) {
          return result;
        }
        this.iterIndex_++;
      }
      return {done:true};
    }
  }
  exports.concat = function(...iterables) {
    return new ConcatIterator(iterables.map(getIterator));
  };
  exports.toArray = function(iterator) {
    const arr = [];
    forEach(iterator, e => arr.push(e));
    return arr;
  };
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.collections.iters.js");

goog.provide("goog.debug.errorcontext");
goog.debug.errorcontext.addErrorContext = function(err, contextKey, contextValue) {
  if (!err[goog.debug.errorcontext.CONTEXT_KEY_]) {
    err[goog.debug.errorcontext.CONTEXT_KEY_] = {};
  }
  err[goog.debug.errorcontext.CONTEXT_KEY_][contextKey] = contextValue;
};
goog.debug.errorcontext.getErrorContext = function(err) {
  return err[goog.debug.errorcontext.CONTEXT_KEY_] || {};
};
goog.debug.errorcontext.CONTEXT_KEY_ = "__closure__error__context__984382";

$CLJS.SHADOW_ENV.setLoaded("goog.debug.errorcontext.js");

goog.provide("goog.debug");
goog.require("goog.array");
goog.require("goog.debug.errorcontext");
goog.debug.LOGGING_ENABLED = goog.define("goog.debug.LOGGING_ENABLED", goog.DEBUG);
goog.debug.FORCE_SLOPPY_STACKS = goog.define("goog.debug.FORCE_SLOPPY_STACKS", false);
goog.debug.CHECK_FOR_THROWN_EVENT = goog.define("goog.debug.CHECK_FOR_THROWN_EVENT", false);
goog.debug.catchErrors = function(logFunc, opt_cancel, opt_target) {
  var target = opt_target || goog.global;
  var oldErrorHandler = target.onerror;
  var retVal = !!opt_cancel;
  target.onerror = function(message, url, line, opt_col, opt_error) {
    if (oldErrorHandler) {
      oldErrorHandler(message, url, line, opt_col, opt_error);
    }
    logFunc({message:message, fileName:url, line:line, lineNumber:line, col:opt_col, error:opt_error});
    return retVal;
  };
};
goog.debug.expose = function(obj, opt_showFn) {
  if (typeof obj == "undefined") {
    return "undefined";
  }
  if (obj == null) {
    return "NULL";
  }
  var str = [];
  for (var x in obj) {
    if (!opt_showFn && typeof obj[x] === "function") {
      continue;
    }
    var s = x + " \x3d ";
    try {
      s += obj[x];
    } catch (e) {
      s += "*** " + e + " ***";
    }
    str.push(s);
  }
  return str.join("\n");
};
goog.debug.deepExpose = function(obj, opt_showFn) {
  var str = [];
  var uidsToCleanup = [];
  var ancestorUids = {};
  var helper = function(obj, space) {
    var nestspace = space + "  ";
    var indentMultiline = function(str) {
      return str.replace(/\n/g, "\n" + space);
    };
    try {
      if (obj === undefined) {
        str.push("undefined");
      } else if (obj === null) {
        str.push("NULL");
      } else if (typeof obj === "string") {
        str.push('"' + indentMultiline(obj) + '"');
      } else if (typeof obj === "function") {
        str.push(indentMultiline(String(obj)));
      } else if (goog.isObject(obj)) {
        if (!goog.hasUid(obj)) {
          uidsToCleanup.push(obj);
        }
        var uid = goog.getUid(obj);
        if (ancestorUids[uid]) {
          str.push("*** reference loop detected (id\x3d" + uid + ") ***");
        } else {
          ancestorUids[uid] = true;
          str.push("{");
          for (var x in obj) {
            if (!opt_showFn && typeof obj[x] === "function") {
              continue;
            }
            str.push("\n");
            str.push(nestspace);
            str.push(x + " \x3d ");
            helper(obj[x], nestspace);
          }
          str.push("\n" + space + "}");
          delete ancestorUids[uid];
        }
      } else {
        str.push(obj);
      }
    } catch (e) {
      str.push("*** " + e + " ***");
    }
  };
  helper(obj, "");
  for (var i = 0; i < uidsToCleanup.length; i++) {
    goog.removeUid(uidsToCleanup[i]);
  }
  return str.join("");
};
goog.debug.exposeArray = function(arr) {
  var str = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      str.push(goog.debug.exposeArray(arr[i]));
    } else {
      str.push(arr[i]);
    }
  }
  return "[ " + str.join(", ") + " ]";
};
goog.debug.normalizeErrorObject = function(err) {
  var href = goog.getObjectByName("window.location.href");
  if (err == null) {
    err = 'Unknown Error of type "null/undefined"';
  }
  if (typeof err === "string") {
    return {"message":err, "name":"Unknown error", "lineNumber":"Not available", "fileName":href, "stack":"Not available"};
  }
  var lineNumber, fileName;
  var threwError = false;
  try {
    lineNumber = err.lineNumber || err.line || "Not available";
  } catch (e) {
    lineNumber = "Not available";
    threwError = true;
  }
  try {
    fileName = err.fileName || err.filename || err.sourceURL || goog.global["$googDebugFname"] || href;
  } catch (e) {
    fileName = "Not available";
    threwError = true;
  }
  var stack = goog.debug.serializeErrorStack_(err);
  if (threwError || !err.lineNumber || !err.fileName || !err.stack || !err.message || !err.name) {
    var message = err.message;
    if (message == null) {
      if (err.constructor && err.constructor instanceof Function) {
        var ctorName = err.constructor.name ? err.constructor.name : goog.debug.getFunctionName(err.constructor);
        message = 'Unknown Error of type "' + ctorName + '"';
        if (goog.debug.CHECK_FOR_THROWN_EVENT && ctorName == "Event") {
          try {
            message = message + ' with Event.type "' + (err.type || "") + '"';
          } catch (e) {
          }
        }
      } else {
        message = "Unknown Error of unknown type";
      }
      if (typeof err.toString === "function" && Object.prototype.toString !== err.toString) {
        message += ": " + err.toString();
      }
    }
    return {"message":message, "name":err.name || "UnknownError", "lineNumber":lineNumber, "fileName":fileName, "stack":stack || "Not available"};
  }
  err.stack = stack;
  return {"message":err.message, "name":err.name, "lineNumber":err.lineNumber, "fileName":err.fileName, "stack":err.stack};
};
goog.debug.serializeErrorStack_ = function(e, seen) {
  if (!seen) {
    seen = {};
  }
  seen[goog.debug.serializeErrorAsKey_(e)] = true;
  var stack = e["stack"] || "";
  var cause = e.cause;
  if (cause && !seen[goog.debug.serializeErrorAsKey_(cause)]) {
    stack += "\nCaused by: ";
    if (!cause.stack || cause.stack.indexOf(cause.toString()) != 0) {
      stack += typeof cause === "string" ? cause : cause.message + "\n";
    }
    stack += goog.debug.serializeErrorStack_(cause, seen);
  }
  return stack;
};
goog.debug.serializeErrorAsKey_ = function(e) {
  var keyPrefix = "";
  if (typeof e.toString === "function") {
    keyPrefix = "" + e;
  }
  return keyPrefix + e["stack"];
};
goog.debug.enhanceError = function(err, opt_message) {
  var error;
  if (!(err instanceof Error)) {
    error = Error(err);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, goog.debug.enhanceError);
    }
  } else {
    error = err;
  }
  if (!error.stack) {
    error.stack = goog.debug.getStacktrace(goog.debug.enhanceError);
  }
  if (opt_message) {
    var x = 0;
    while (error["message" + x]) {
      ++x;
    }
    error["message" + x] = String(opt_message);
  }
  return error;
};
goog.debug.enhanceErrorWithContext = function(err, opt_context) {
  var error = goog.debug.enhanceError(err);
  if (opt_context) {
    for (var key in opt_context) {
      goog.debug.errorcontext.addErrorContext(error, key, opt_context[key]);
    }
  }
  return error;
};
goog.debug.getStacktraceSimple = function(opt_depth) {
  if (!goog.debug.FORCE_SLOPPY_STACKS) {
    var stack = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
    if (stack) {
      return stack;
    }
  }
  var sb = [];
  var fn = arguments.callee.caller;
  var depth = 0;
  while (fn && (!opt_depth || depth < opt_depth)) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push("()\n");
    try {
      fn = fn.caller;
    } catch (e) {
      sb.push("[exception trying to get caller]\n");
      break;
    }
    depth++;
    if (depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push("[...long stack...]");
      break;
    }
  }
  if (opt_depth && depth >= opt_depth) {
    sb.push("[...reached max depth limit...]");
  } else {
    sb.push("[end]");
  }
  return sb.join("");
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(fn) {
  var tempErr = new Error();
  if (Error.captureStackTrace) {
    Error.captureStackTrace(tempErr, fn);
    return String(tempErr.stack);
  } else {
    try {
      throw tempErr;
    } catch (e) {
      tempErr = e;
    }
    var stack = tempErr.stack;
    if (stack) {
      return String(stack);
    }
  }
  return null;
};
goog.debug.getStacktrace = function(fn) {
  var stack;
  if (!goog.debug.FORCE_SLOPPY_STACKS) {
    var contextFn = fn || goog.debug.getStacktrace;
    stack = goog.debug.getNativeStackTrace_(contextFn);
  }
  if (!stack) {
    stack = goog.debug.getStacktraceHelper_(fn || arguments.callee.caller, []);
  }
  return stack;
};
goog.debug.getStacktraceHelper_ = function(fn, visited) {
  var sb = [];
  if (goog.array.contains(visited, fn)) {
    sb.push("[...circular reference...]");
  } else if (fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
    sb.push(goog.debug.getFunctionName(fn) + "(");
    var args = fn.arguments;
    for (var i = 0; args && i < args.length; i++) {
      if (i > 0) {
        sb.push(", ");
      }
      var argDesc;
      var arg = args[i];
      switch(typeof arg) {
        case "object":
          argDesc = arg ? "object" : "null";
          break;
        case "string":
          argDesc = arg;
          break;
        case "number":
          argDesc = String(arg);
          break;
        case "boolean":
          argDesc = arg ? "true" : "false";
          break;
        case "function":
          argDesc = goog.debug.getFunctionName(arg);
          argDesc = argDesc ? argDesc : "[fn]";
          break;
        case "undefined":
        default:
          argDesc = typeof arg;
          break;
      }
      if (argDesc.length > 40) {
        argDesc = argDesc.slice(0, 40) + "...";
      }
      sb.push(argDesc);
    }
    visited.push(fn);
    sb.push(")\n");
    try {
      sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited));
    } catch (e) {
      sb.push("[exception trying to get caller]\n");
    }
  } else if (fn) {
    sb.push("[...long stack...]");
  } else {
    sb.push("[end]");
  }
  return sb.join("");
};
goog.debug.getFunctionName = function(fn) {
  if (goog.debug.fnNameCache_[fn]) {
    return goog.debug.fnNameCache_[fn];
  }
  var functionSource = String(fn);
  if (!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function\s+([^\(]+)/m.exec(functionSource);
    if (matches) {
      var method = matches[1];
      goog.debug.fnNameCache_[functionSource] = method;
    } else {
      goog.debug.fnNameCache_[functionSource] = "[Anonymous]";
    }
  }
  return goog.debug.fnNameCache_[functionSource];
};
goog.debug.makeWhitespaceVisible = function(string) {
  return string.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]");
};
goog.debug.runtimeType = function(value) {
  if (value instanceof Function) {
    return value.displayName || value.name || "unknown type name";
  } else if (value instanceof Object) {
    return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
  } else {
    return value === null ? "null" : typeof value;
  }
};
goog.debug.fnNameCache_ = {};
goog.debug.freezeInternal_ = goog.DEBUG && Object.freeze || function(arg) {
  return arg;
};
goog.debug.freeze = function(arg) {
  return {valueOf:function() {
    return goog.debug.freezeInternal_(arg);
  }}.valueOf();
};

$CLJS.SHADOW_ENV.setLoaded("goog.debug.debug.js");

goog.provide("goog.iter");
goog.provide("goog.iter.Iterable");
goog.provide("goog.iter.Iterator");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.debug");
goog.require("goog.functions");
goog.require("goog.math");
goog.iter.Iterable;
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  return goog.iter.ES6_ITERATOR_DONE;
};
goog.iter.ES6_ITERATOR_DONE = goog.debug.freeze({done:true, value:undefined});
goog.iter.createEs6IteratorYield = function(value) {
  return {value, done:false};
};
goog.iter.Iterator.prototype.__iterator__ = function(opt_keys) {
  return this;
};
goog.iter.toIterator = function(iterable) {
  if (iterable instanceof goog.iter.Iterator) {
    return iterable;
  }
  if (typeof iterable.__iterator__ == "function") {
    return iterable.__iterator__(false);
  }
  if (goog.isArrayLike(iterable)) {
    const like = iterable;
    let i = 0;
    const newIter = new goog.iter.Iterator();
    newIter.next = function() {
      while (true) {
        if (i >= like.length) {
          return goog.iter.ES6_ITERATOR_DONE;
        }
        if (!(i in like)) {
          i++;
          continue;
        }
        return goog.iter.createEs6IteratorYield(like[i++]);
      }
    };
    return newIter;
  }
  throw new Error("Not implemented");
};
goog.iter.forEach = function(iterable, f, opt_obj) {
  if (goog.isArrayLike(iterable)) {
    goog.array.forEach(iterable, f, opt_obj);
  } else {
    const iterator = goog.iter.toIterator(iterable);
    while (true) {
      const {done, value} = iterator.next();
      if (done) {
        return;
      }
      f.call(opt_obj, value, undefined, iterator);
    }
  }
};
goog.iter.filter = function(iterable, f, opt_obj) {
  const iterator = goog.iter.toIterator(iterable);
  const newIter = new goog.iter.Iterator();
  newIter.next = function() {
    while (true) {
      const {done, value} = iterator.next();
      if (done) {
        return goog.iter.ES6_ITERATOR_DONE;
      }
      if (f.call(opt_obj, value, undefined, iterator)) {
        return goog.iter.createEs6IteratorYield(value);
      }
    }
  };
  return newIter;
};
goog.iter.filterFalse = function(iterable, f, opt_obj) {
  return goog.iter.filter(iterable, goog.functions.not(f), opt_obj);
};
goog.iter.range = function(startOrStop, opt_stop, opt_step) {
  let start = 0;
  let stop = startOrStop;
  let step = opt_step || 1;
  if (arguments.length > 1) {
    start = startOrStop;
    stop = +opt_stop;
  }
  if (step == 0) {
    throw new Error("Range step argument must not be zero");
  }
  const newIter = new goog.iter.Iterator();
  newIter.next = function() {
    if (step > 0 && start >= stop || step < 0 && start <= stop) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    const rv = start;
    start += step;
    return goog.iter.createEs6IteratorYield(rv);
  };
  return newIter;
};
goog.iter.join = function(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator);
};
goog.iter.map = function(iterable, f, opt_obj) {
  const iterator = goog.iter.toIterator(iterable);
  const newIter = new goog.iter.Iterator();
  newIter.next = function() {
    const {done, value} = iterator.next();
    if (done) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    const mappedVal = f.call(opt_obj, value, undefined, iterator);
    return goog.iter.createEs6IteratorYield(mappedVal);
  };
  return newIter;
};
goog.iter.reduce = function(iterable, f, val, opt_obj) {
  let rval = val;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val);
  });
  return rval;
};
goog.iter.some = function(iterable, f, opt_obj) {
  const iterator = goog.iter.toIterator(iterable);
  while (true) {
    const {done, value} = iterator.next();
    if (done) {
      return false;
    }
    if (f.call(opt_obj, value, undefined, iterator)) {
      return true;
    }
  }
};
goog.iter.every = function(iterable, f, opt_obj) {
  const iterator = goog.iter.toIterator(iterable);
  while (true) {
    const {done, value} = iterator.next();
    if (done) {
      return true;
    }
    if (!f.call(opt_obj, value, undefined, iterator)) {
      return false;
    }
  }
};
goog.iter.chain = function(var_args) {
  return goog.iter.chainFromIterable(arguments);
};
goog.iter.chainFromIterable = function(iterable) {
  const iteratorOfIterators = goog.iter.toIterator(iterable);
  const iter = new goog.iter.Iterator();
  let current = null;
  iter.next = function() {
    while (true) {
      if (current == null) {
        const it = iteratorOfIterators.next();
        if (it.done) {
          return goog.iter.ES6_ITERATOR_DONE;
        }
        const value = it.value;
        current = goog.iter.toIterator(value);
      }
      const it = current.next();
      if (it.done) {
        current = null;
        continue;
      }
      const value = it.value;
      return goog.iter.createEs6IteratorYield(value);
    }
  };
  return iter;
};
goog.iter.dropWhile = function(iterable, f, opt_obj) {
  const iterator = goog.iter.toIterator(iterable);
  const newIter = new goog.iter.Iterator();
  let dropping = true;
  newIter.next = function() {
    while (true) {
      const {done, value} = iterator.next();
      if (done) {
        return goog.iter.ES6_ITERATOR_DONE;
      }
      if (dropping && f.call(opt_obj, value, undefined, iterator)) {
        continue;
      } else {
        dropping = false;
      }
      return goog.iter.createEs6IteratorYield(value);
    }
  };
  return newIter;
};
goog.iter.takeWhile = function(iterable, f, opt_obj) {
  const iterator = goog.iter.toIterator(iterable);
  const iter = new goog.iter.Iterator();
  iter.next = function() {
    const {done, value} = iterator.next();
    if (done) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    if (f.call(opt_obj, value, undefined, iterator)) {
      return goog.iter.createEs6IteratorYield(value);
    }
    return goog.iter.ES6_ITERATOR_DONE;
  };
  return iter;
};
goog.iter.toArray = function(iterable) {
  if (goog.isArrayLike(iterable)) {
    return goog.array.toArray(iterable);
  }
  iterable = goog.iter.toIterator(iterable);
  const array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val);
  });
  return array;
};
goog.iter.equals = function(iterable1, iterable2, opt_equalsFn) {
  const fillValue = {};
  const pairs = goog.iter.zipLongest(fillValue, iterable1, iterable2);
  const equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  return goog.iter.every(pairs, function(pair) {
    return equalsFn(pair[0], pair[1]);
  });
};
goog.iter.nextOrValue = function(iterable, defaultValue) {
  const iterator = goog.iter.toIterator(iterable);
  const {done, value} = iterator.next();
  if (done) {
    return defaultValue;
  }
  return value;
};
goog.iter.product = function(var_args) {
  const someArrayEmpty = Array.prototype.some.call(arguments, function(arr) {
    return !arr.length;
  });
  if (someArrayEmpty || !arguments.length) {
    return new goog.iter.Iterator();
  }
  const iter = new goog.iter.Iterator();
  const arrays = arguments;
  let indices = goog.array.repeat(0, arrays.length);
  iter.next = function() {
    if (indices) {
      const retVal = goog.array.map(indices, function(valueIndex, arrayIndex) {
        return arrays[arrayIndex][valueIndex];
      });
      for (let i = indices.length - 1; i >= 0; i--) {
        goog.asserts.assert(indices);
        if (indices[i] < arrays[i].length - 1) {
          indices[i]++;
          break;
        }
        if (i == 0) {
          indices = null;
          break;
        }
        indices[i] = 0;
      }
      return goog.iter.createEs6IteratorYield(retVal);
    }
    return goog.iter.ES6_ITERATOR_DONE;
  };
  return iter;
};
goog.iter.cycle = function(iterable) {
  const baseIterator = goog.iter.toIterator(iterable);
  const cache = [];
  let cacheIndex = 0;
  const iter = new goog.iter.Iterator();
  let useCache = false;
  iter.next = function() {
    let returnElement = null;
    if (!useCache) {
      const it = baseIterator.next();
      if (it.done) {
        if (goog.array.isEmpty(cache)) {
          return goog.iter.ES6_ITERATOR_DONE;
        }
        useCache = true;
      } else {
        cache.push(it.value);
        return it;
      }
    }
    returnElement = cache[cacheIndex];
    cacheIndex = (cacheIndex + 1) % cache.length;
    return goog.iter.createEs6IteratorYield(returnElement);
  };
  return iter;
};
goog.iter.count = function(opt_start, opt_step) {
  let counter = opt_start || 0;
  const step = opt_step !== undefined ? opt_step : 1;
  const iter = new goog.iter.Iterator();
  iter.next = function() {
    const returnValue = counter;
    counter += step;
    return goog.iter.createEs6IteratorYield(returnValue);
  };
  return iter;
};
goog.iter.repeat = function(value) {
  const iter = new goog.iter.Iterator();
  iter.next = function() {
    return goog.iter.createEs6IteratorYield(value);
  };
  return iter;
};
goog.iter.accumulate = function(iterable) {
  const iterator = goog.iter.toIterator(iterable);
  let total = 0;
  const iter = new goog.iter.Iterator();
  iter.next = function() {
    const {done, value} = iterator.next();
    if (done) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    total += value;
    return goog.iter.createEs6IteratorYield(total);
  };
  return iter;
};
goog.iter.zip = function(var_args) {
  const args = arguments;
  const iter = new goog.iter.Iterator();
  if (args.length > 0) {
    const iterators = goog.array.map(args, goog.iter.toIterator);
    let allDone = false;
    iter.next = function() {
      if (allDone) {
        return goog.iter.ES6_ITERATOR_DONE;
      }
      const arr = [];
      for (let i = 0, iterator; iterator = iterators[i++];) {
        const it = iterator.next();
        if (it.done) {
          allDone = true;
          return goog.iter.ES6_ITERATOR_DONE;
        }
        arr.push(it.value);
      }
      return goog.iter.createEs6IteratorYield(arr);
    };
  }
  return iter;
};
goog.iter.zipLongest = function(fillValue, var_args) {
  const args = Array.prototype.slice.call(arguments, 1);
  const iter = new goog.iter.Iterator();
  if (args.length > 0) {
    const iterators = goog.array.map(args, goog.iter.toIterator);
    let allDone = false;
    iter.next = function() {
      if (allDone) {
        return goog.iter.ES6_ITERATOR_DONE;
      }
      let iteratorsHaveValues = false;
      const arr = [];
      for (let i = 0, iterator; iterator = iterators[i++];) {
        const it = iterator.next();
        if (it.done) {
          arr.push(fillValue);
          continue;
        }
        arr.push(it.value);
        iteratorsHaveValues = true;
      }
      if (!iteratorsHaveValues) {
        allDone = true;
        return goog.iter.ES6_ITERATOR_DONE;
      }
      return goog.iter.createEs6IteratorYield(arr);
    };
  }
  return iter;
};
goog.iter.compress = function(iterable, selectors) {
  const valueIterator = goog.iter.toIterator(iterable);
  const selectorIterator = goog.iter.toIterator(selectors);
  const iter = new goog.iter.Iterator();
  let allDone = false;
  iter.next = function() {
    if (allDone) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    while (true) {
      const valIt = valueIterator.next();
      if (valIt.done) {
        allDone = true;
        return goog.iter.ES6_ITERATOR_DONE;
      }
      const selectorIt = selectorIterator.next();
      if (selectorIt.done) {
        allDone = true;
        return goog.iter.ES6_ITERATOR_DONE;
      }
      const val = valIt.value;
      const selectorVal = selectorIt.value;
      if (selectorVal) {
        return goog.iter.createEs6IteratorYield(val);
      }
    }
  };
  return iter;
};
goog.iter.GroupByIterator_ = function(iterable, opt_keyFunc) {
  this.iterator = goog.iter.toIterator(iterable);
  this.keyFunc = opt_keyFunc || goog.functions.identity;
  this.targetKey;
  this.currentKey;
  this.currentValue;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
  while (this.currentKey == this.targetKey) {
    const it = this.iterator.next();
    if (it.done) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    this.currentValue = it.value;
    this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return goog.iter.createEs6IteratorYield([this.currentKey, this.groupItems_(this.targetKey)]);
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(targetKey) {
  const arr = [];
  while (this.currentKey == targetKey) {
    arr.push(this.currentValue);
    const it = this.iterator.next();
    if (it.done) {
      break;
    }
    this.currentValue = it.value;
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return arr;
};
goog.iter.groupBy = function(iterable, opt_keyFunc) {
  return new goog.iter.GroupByIterator_(iterable, opt_keyFunc);
};
goog.iter.starMap = function(iterable, f, opt_obj) {
  const iterator = goog.iter.toIterator(iterable);
  const iter = new goog.iter.Iterator();
  iter.next = function() {
    const it = iterator.next();
    if (it.done) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    const args = goog.iter.toArray(it.value);
    const value = f.apply(opt_obj, [].concat(args, undefined, iterator));
    return goog.iter.createEs6IteratorYield(value);
  };
  return iter;
};
goog.iter.tee = function(iterable, opt_num) {
  const iterator = goog.iter.toIterator(iterable);
  const num = typeof opt_num === "number" ? opt_num : 2;
  const buffers = goog.array.map(goog.array.range(num), function() {
    return [];
  });
  function addNextIteratorValueToBuffers() {
    const {done, value} = iterator.next();
    if (done) {
      return false;
    }
    for (let i = 0, buffer; buffer = buffers[i++];) {
      buffer.push(value);
    }
    return true;
  }
  function createIterator(buffer) {
    const iter = new goog.iter.Iterator();
    iter.next = function() {
      if (goog.array.isEmpty(buffer)) {
        const added = addNextIteratorValueToBuffers();
        if (!added) {
          return goog.iter.ES6_ITERATOR_DONE;
        }
      }
      goog.asserts.assert(!goog.array.isEmpty(buffer));
      return goog.iter.createEs6IteratorYield(buffer.shift());
    };
    return iter;
  }
  return goog.array.map(buffers, createIterator);
};
goog.iter.enumerate = function(iterable, opt_start) {
  return goog.iter.zip(goog.iter.count(opt_start), iterable);
};
goog.iter.limit = function(iterable, limitSize) {
  goog.asserts.assert(goog.math.isInt(limitSize) && limitSize >= 0);
  const iterator = goog.iter.toIterator(iterable);
  const iter = new goog.iter.Iterator();
  let remaining = limitSize;
  iter.next = function() {
    if (remaining-- > 0) {
      return iterator.next();
    }
    return goog.iter.ES6_ITERATOR_DONE;
  };
  return iter;
};
goog.iter.consume = function(iterable, count) {
  goog.asserts.assert(goog.math.isInt(count) && count >= 0);
  const iterator = goog.iter.toIterator(iterable);
  while (count-- > 0) {
    goog.iter.nextOrValue(iterator, null);
  }
  return iterator;
};
goog.iter.slice = function(iterable, start, opt_end) {
  goog.asserts.assert(goog.math.isInt(start) && start >= 0);
  let iterator = goog.iter.consume(iterable, start);
  if (typeof opt_end === "number") {
    goog.asserts.assert(goog.math.isInt(opt_end) && opt_end >= start);
    iterator = goog.iter.limit(iterator, opt_end - start);
  }
  return iterator;
};
goog.iter.hasDuplicates_ = function(arr) {
  const deduped = [];
  goog.array.removeDuplicates(arr, deduped);
  return arr.length != deduped.length;
};
goog.iter.permutations = function(iterable, opt_length) {
  const elements = goog.iter.toArray(iterable);
  const length = typeof opt_length === "number" ? opt_length : elements.length;
  const sets = goog.array.repeat(elements, length);
  const product = goog.iter.product.apply(undefined, sets);
  return goog.iter.filter(product, function(arr) {
    return !goog.iter.hasDuplicates_(arr);
  });
};
goog.iter.combinations = function(iterable, length) {
  const elements = goog.iter.toArray(iterable);
  const indexes = goog.iter.range(elements.length);
  const indexIterator = goog.iter.permutations(indexes, length);
  const sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  });
  const iter = new goog.iter.Iterator();
  function getIndexFromElements(index) {
    return elements[index];
  }
  iter.next = function() {
    const {done, value} = sortedIndexIterator.next();
    if (done) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    return goog.iter.createEs6IteratorYield(goog.array.map(value, getIndexFromElements));
  };
  return iter;
};
goog.iter.combinationsWithReplacement = function(iterable, length) {
  const elements = goog.iter.toArray(iterable);
  const indexes = goog.array.range(elements.length);
  const sets = goog.array.repeat(indexes, length);
  const indexIterator = goog.iter.product.apply(undefined, sets);
  const sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  });
  const iter = new goog.iter.Iterator();
  function getIndexFromElements(index) {
    return elements[index];
  }
  iter.next = function() {
    const {done, value} = sortedIndexIterator.next();
    if (done) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    return goog.iter.createEs6IteratorYield(goog.array.map(value, getIndexFromElements));
  };
  return iter;
};

$CLJS.SHADOW_ENV.setLoaded("goog.iter.iter.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.iter.es6");
  goog.module.declareLegacyNamespace();
  const GoogIterable = goog.require("goog.iter.Iterable");
  const GoogIterator = goog.require("goog.iter.Iterator");
  class ShimIterable {
    __iterator__() {
    }
    toGoog() {
    }
    toEs6() {
    }
    static of(iter) {
      if (iter instanceof ShimIterableImpl || iter instanceof ShimGoogIterator || iter instanceof ShimEs6Iterator) {
        return iter;
      } else if (typeof iter.next == "function") {
        return new ShimIterableImpl(() => iter);
      } else if (typeof iter[Symbol.iterator] == "function") {
        return new ShimIterableImpl(() => iter[Symbol.iterator]());
      } else if (typeof iter.__iterator__ == "function") {
        return new ShimIterableImpl(() => iter.__iterator__());
      }
      throw new Error("Not an iterator or iterable.");
    }
  }
  class ShimIterableImpl {
    constructor(func) {
      this.func_ = func;
    }
    __iterator__() {
      return new ShimGoogIterator(this.func_());
    }
    toGoog() {
      return new ShimGoogIterator(this.func_());
    }
    [Symbol.iterator]() {
      return new ShimEs6Iterator(this.func_());
    }
    toEs6() {
      return new ShimEs6Iterator(this.func_());
    }
  }
  class ShimGoogIterator extends GoogIterator {
    constructor(iter) {
      super();
      this.iter_ = iter;
    }
    next() {
      return this.iter_.next();
    }
    toGoog() {
      return this;
    }
    [Symbol.iterator]() {
      return new ShimEs6Iterator(this.iter_);
    }
    toEs6() {
      return new ShimEs6Iterator(this.iter_);
    }
  }
  class ShimEs6Iterator extends ShimIterableImpl {
    constructor(iter) {
      super(() => iter);
      this.iter_ = iter;
    }
    next() {
      return this.iter_.next();
    }
  }
  exports = {ShimIterable, ShimEs6Iterator, ShimGoogIterator,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.iter.es6.js");

goog.provide("goog.structs.Map");
goog.require("goog.collections.iters");
goog.require("goog.iter");
goog.require("goog.iter.Iterator");
goog.require("goog.iter.es6");
goog.structs.Map = function(opt_map, var_args) {
  this.map_ = {};
  this.keys_ = [];
  this.size = 0;
  this.version_ = 0;
  var argLength = arguments.length;
  if (argLength > 1) {
    if (argLength % 2) {
      throw new Error("Uneven number of arguments");
    }
    for (var i = 0; i < argLength; i += 2) {
      this.set(arguments[i], arguments[i + 1]);
    }
  } else if (opt_map) {
    this.addAll(opt_map);
  }
};
goog.structs.Map.prototype.getCount = function() {
  return this.size;
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  var rv = [];
  for (var i = 0; i < this.keys_.length; i++) {
    var key = this.keys_[i];
    rv.push(this.map_[key]);
  }
  return rv;
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat();
};
goog.structs.Map.prototype.containsKey = function(key) {
  return this.has(key);
};
goog.structs.Map.prototype.has = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key);
};
goog.structs.Map.prototype.containsValue = function(val) {
  for (var i = 0; i < this.keys_.length; i++) {
    var key = this.keys_[i];
    if (goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val) {
      return true;
    }
  }
  return false;
};
goog.structs.Map.prototype.equals = function(otherMap, opt_equalityFn) {
  if (this === otherMap) {
    return true;
  }
  if (this.size != otherMap.getCount()) {
    return false;
  }
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var key, i = 0; key = this.keys_[i]; i++) {
    if (!equalityFn(this.get(key), otherMap.get(key))) {
      return false;
    }
  }
  return true;
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b;
};
goog.structs.Map.prototype.isEmpty = function() {
  return this.size == 0;
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.keys_.length = 0;
  this.setSizeInternal_(0);
  this.version_ = 0;
};
goog.structs.Map.prototype.remove = function(key) {
  return this.delete(key);
};
goog.structs.Map.prototype.delete = function(key) {
  if (goog.structs.Map.hasKey_(this.map_, key)) {
    delete this.map_[key];
    this.setSizeInternal_(this.size - 1);
    this.version_++;
    if (this.keys_.length > 2 * this.size) {
      this.cleanupKeysArray_();
    }
    return true;
  }
  return false;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if (this.size != this.keys_.length) {
    var srcIndex = 0;
    var destIndex = 0;
    while (srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if (goog.structs.Map.hasKey_(this.map_, key)) {
        this.keys_[destIndex++] = key;
      }
      srcIndex++;
    }
    this.keys_.length = destIndex;
  }
  if (this.size != this.keys_.length) {
    var seen = {};
    var srcIndex = 0;
    var destIndex = 0;
    while (srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if (!goog.structs.Map.hasKey_(seen, key)) {
        this.keys_[destIndex++] = key;
        seen[key] = 1;
      }
      srcIndex++;
    }
    this.keys_.length = destIndex;
  }
};
goog.structs.Map.prototype.get = function(key, opt_val) {
  if (goog.structs.Map.hasKey_(this.map_, key)) {
    return this.map_[key];
  }
  return opt_val;
};
goog.structs.Map.prototype.set = function(key, value) {
  if (!goog.structs.Map.hasKey_(this.map_, key)) {
    this.setSizeInternal_(this.size + 1);
    this.keys_.push(key);
    this.version_++;
  }
  this.map_[key] = value;
};
goog.structs.Map.prototype.addAll = function(map) {
  if (map instanceof goog.structs.Map) {
    var keys = map.getKeys();
    for (var i = 0; i < keys.length; i++) {
      this.set(keys[i], map.get(keys[i]));
    }
  } else {
    for (var key in map) {
      this.set(key, map[key]);
    }
  }
};
goog.structs.Map.prototype.forEach = function(f, opt_obj) {
  var keys = this.getKeys();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = this.get(key);
    f.call(opt_obj, value, key, this);
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function() {
  var transposed = new goog.structs.Map();
  for (var i = 0; i < this.keys_.length; i++) {
    var key = this.keys_[i];
    var value = this.map_[key];
    transposed.set(value, key);
  }
  return transposed;
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  var obj = {};
  for (var i = 0; i < this.keys_.length; i++) {
    var key = this.keys_[i];
    obj[key] = this.map_[key];
  }
  return obj;
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(true);
};
goog.structs.Map.prototype.keys = function() {
  return goog.iter.es6.ShimIterable.of(this.getKeyIterator()).toEs6();
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(false);
};
goog.structs.Map.prototype.values = function() {
  return goog.iter.es6.ShimIterable.of(this.getValueIterator()).toEs6();
};
goog.structs.Map.prototype.entries = function() {
  const self = this;
  return goog.collections.iters.map(this.keys(), function(key) {
    return [key, self.get(key)];
  });
};
goog.structs.Map.prototype.__iterator__ = function(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0;
  var version = this.version_;
  var selfObj = this;
  var newIter = new goog.iter.Iterator();
  newIter.next = function() {
    if (version != selfObj.version_) {
      throw new Error("The map has changed since the iterator was created");
    }
    if (i >= selfObj.keys_.length) {
      return goog.iter.ES6_ITERATOR_DONE;
    }
    var key = selfObj.keys_[i++];
    return goog.iter.createEs6IteratorYield(opt_keys ? key : selfObj.map_[key]);
  };
  return newIter;
};
goog.structs.Map.prototype.setSizeInternal_ = function(newSize) {
  this.size = newSize;
};
goog.structs.Map.hasKey_ = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

$CLJS.SHADOW_ENV.setLoaded("goog.structs.map.js");

goog.provide("goog.window");
goog.require("goog.dom");
goog.require("goog.dom.TagName");
goog.require("goog.dom.safe");
goog.require("goog.html.SafeUrl");
goog.require("goog.html.uncheckedconversions");
goog.require("goog.labs.userAgent.platform");
goog.require("goog.string");
goog.require("goog.string.Const");
goog.require("goog.userAgent");
goog.requireType("goog.string.TypedString");
goog.window.DEFAULT_POPUP_HEIGHT = 500;
goog.window.DEFAULT_POPUP_WIDTH = 690;
goog.window.DEFAULT_POPUP_TARGET = "google_popup";
goog.window.createFakeWindow_ = function() {
  return {};
};
goog.window.open = function(linkRef, opt_options, opt_parentWin) {
  if (!opt_options) {
    opt_options = {};
  }
  var parentWin = opt_parentWin || window;
  var safeLinkRef;
  if (linkRef instanceof goog.html.SafeUrl) {
    safeLinkRef = linkRef;
  } else {
    var url = typeof linkRef.href != "undefined" ? linkRef.href : String(linkRef);
    safeLinkRef = goog.html.SafeUrl.sanitize(url);
  }
  const browserSupportsCoop = self.crossOriginIsolated !== undefined;
  let referrerPolicy = "strict-origin-when-cross-origin";
  if (window.Request) {
    referrerPolicy = (new Request("/")).referrerPolicy;
  }
  const pageSetsUnsafeReferrerPolicy = referrerPolicy === "unsafe-url";
  let noReferrerOption = opt_options["noreferrer"];
  if (browserSupportsCoop && noReferrerOption) {
    if (pageSetsUnsafeReferrerPolicy) {
      throw new Error("Cannot use the noreferrer option on a page that sets a referrer-policy of `unsafe-url` in modern browsers!");
    }
    noReferrerOption = false;
  }
  var target = opt_options.target || linkRef.target;
  var sb = [];
  for (var option in opt_options) {
    switch(option) {
      case "width":
      case "height":
      case "top":
      case "left":
        sb.push(option + "\x3d" + opt_options[option]);
        break;
      case "target":
      case "noopener":
      case "noreferrer":
        break;
      default:
        sb.push(option + "\x3d" + (opt_options[option] ? 1 : 0));
    }
  }
  var optionString = sb.join(",");
  var newWin;
  if (goog.labs.userAgent.platform.isIos() && parentWin.navigator && parentWin.navigator["standalone"] && target && target != "_self") {
    var a = goog.dom.createElement(goog.dom.TagName.A);
    goog.dom.safe.setAnchorHref(a, safeLinkRef);
    a.target = target;
    if (noReferrerOption) {
      a.rel = "noreferrer";
    }
    var click = document.createEvent("MouseEvent");
    click.initMouseEvent("click", true, true, parentWin, 1);
    a.dispatchEvent(click);
    newWin = goog.window.createFakeWindow_();
  } else if (noReferrerOption) {
    newWin = goog.dom.safe.openInWindow("", parentWin, target, optionString);
    var sanitizedLinkRef = goog.html.SafeUrl.unwrap(safeLinkRef);
    if (newWin) {
      if (goog.userAgent.EDGE_OR_IE) {
        if (goog.string.contains(sanitizedLinkRef, ";")) {
          sanitizedLinkRef = "'" + sanitizedLinkRef.replace(/'/g, "%27") + "'";
        }
      }
      newWin.opener = null;
      if (sanitizedLinkRef === "") {
        sanitizedLinkRef = "javascript:''";
      }
      var safeHtml = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("b/12014412, meta tag with sanitized URL"), '\x3cmeta name\x3d"referrer" content\x3d"no-referrer"\x3e' + '\x3cmeta http-equiv\x3d"refresh" content\x3d"0; url\x3d' + goog.string.htmlEscape(sanitizedLinkRef) + '"\x3e');
      var newDoc = newWin.document;
      if (newDoc && newDoc.write) {
        goog.dom.safe.documentWrite(newDoc, safeHtml);
        newDoc.close();
      }
    }
  } else {
    newWin = goog.dom.safe.openInWindow(safeLinkRef, parentWin, target, optionString);
    if (newWin && opt_options["noopener"]) {
      newWin.opener = null;
    }
    if (newWin && opt_options["noreferrer"]) {
      newWin.opener = null;
    }
  }
  return newWin;
};
goog.window.openBlank = function(opt_message, opt_options, opt_parentWin) {
  const win = goog.window.open("", opt_options, opt_parentWin);
  if (win && opt_message) {
    const body = win.document.body;
    if (body) {
      body.textContent = opt_message;
    }
  }
  return win;
};
goog.window.popup = function(linkRef, opt_options) {
  if (!opt_options) {
    opt_options = {};
  }
  opt_options["target"] = opt_options["target"] || linkRef["target"] || goog.window.DEFAULT_POPUP_TARGET;
  opt_options["width"] = opt_options["width"] || goog.window.DEFAULT_POPUP_WIDTH;
  opt_options["height"] = opt_options["height"] || goog.window.DEFAULT_POPUP_HEIGHT;
  var newWin = goog.window.open(linkRef, opt_options);
  if (!newWin) {
    return true;
  }
  newWin.focus();
  return false;
};

$CLJS.SHADOW_ENV.setLoaded("goog.window.window.js");

goog.provide("goog.dom.forms");
goog.require("goog.dom.InputType");
goog.require("goog.dom.TagName");
goog.require("goog.dom.safe");
goog.require("goog.structs.Map");
goog.require("goog.window");
goog.dom.forms.submitFormInNewWindow = function(form, opt_submitElement) {
  var formData = goog.dom.forms.getFormDataMap(form);
  var action = form.action;
  var method = form.method;
  if (opt_submitElement) {
    if (goog.dom.InputType.SUBMIT != opt_submitElement.type.toLowerCase()) {
      throw new Error("opt_submitElement does not have a valid type.");
    }
    var submitValue = goog.dom.forms.getValue(opt_submitElement);
    if (submitValue != null) {
      goog.dom.forms.addFormDataToMap_(formData, opt_submitElement.name, submitValue);
    }
    if (opt_submitElement.getAttribute("formaction")) {
      action = opt_submitElement.getAttribute("formaction");
    }
    if (opt_submitElement.getAttribute("formmethod")) {
      method = opt_submitElement.getAttribute("formmethod");
    }
  }
  return goog.dom.forms.submitFormDataInNewWindow(action, method, formData);
};
goog.dom.forms.submitFormDataInNewWindow = function(actionUri, method, formData) {
  var newWin = goog.window.openBlank("", {noreferrer:true});
  if (!newWin) {
    return false;
  }
  var newDocument = newWin.document;
  var newForm = newDocument.createElement("form");
  newForm.method = method;
  goog.dom.safe.setFormElementAction(newForm, actionUri);
  formData.forEach(function(fieldValues, fieldName) {
    for (var i = 0; i < fieldValues.length; i++) {
      var fieldValue = fieldValues[i];
      var newInput = newDocument.createElement("input");
      newInput.name = fieldName;
      newInput.value = fieldValue;
      newInput.type = "hidden";
      HTMLFormElement.prototype.appendChild.call(newForm, newInput);
    }
  });
  HTMLFormElement.prototype.submit.call(newForm);
  return true;
};
goog.dom.forms.getFormDataMap = function(form) {
  var map = new goog.structs.Map();
  goog.dom.forms.getFormDataHelper_(form, map, goog.dom.forms.addFormDataToMap_);
  return map;
};
goog.dom.forms.getFormDataString = function(form) {
  var sb = [];
  goog.dom.forms.getFormDataHelper_(form, sb, goog.dom.forms.addFormDataToStringBuffer_);
  return sb.join("\x26");
};
goog.dom.forms.getFormDataHelper_ = function(form, result, fnAppend) {
  var els = form.elements;
  for (var el, i = 0; el = els.item(i); i++) {
    if (el.form != form || el.disabled || el.tagName == goog.dom.TagName.FIELDSET) {
      continue;
    }
    var name = el.name;
    switch(el.type.toLowerCase()) {
      case goog.dom.InputType.FILE:
      case goog.dom.InputType.SUBMIT:
      case goog.dom.InputType.RESET:
      case goog.dom.InputType.BUTTON:
        break;
      case goog.dom.InputType.SELECT_MULTIPLE:
        var values = goog.dom.forms.getValue(el);
        if (values != null) {
          for (var value, j = 0; value = values[j]; j++) {
            fnAppend(result, name, value);
          }
        }
        break;
      default:
        var value = goog.dom.forms.getValue(el);
        if (value != null) {
          fnAppend(result, name, value);
        }
    }
  }
  var inputs = form.getElementsByTagName(String(goog.dom.TagName.INPUT));
  for (var input, i = 0; input = inputs[i]; i++) {
    if (input.form == form && input.type.toLowerCase() == goog.dom.InputType.IMAGE) {
      name = input.name;
      fnAppend(result, name, input.value);
      fnAppend(result, name + ".x", "0");
      fnAppend(result, name + ".y", "0");
    }
  }
};
goog.dom.forms.addFormDataToMap_ = function(map, name, value) {
  var array = map.get(name);
  if (!array) {
    array = [];
    map.set(name, array);
  }
  array.push(value);
};
goog.dom.forms.addFormDataToStringBuffer_ = function(sb, name, value) {
  sb.push(encodeURIComponent(name) + "\x3d" + encodeURIComponent(value));
};
goog.dom.forms.hasFileInput = function(form) {
  var els = form.elements;
  for (var el, i = 0; el = els[i]; i++) {
    if (!el.disabled && el.type && el.type.toLowerCase() == goog.dom.InputType.FILE) {
      return true;
    }
  }
  return false;
};
goog.dom.forms.setDisabled = function(el, disabled) {
  if (el.tagName == goog.dom.TagName.FORM) {
    var els = el.elements;
    for (var i = 0; el = els.item(i); i++) {
      goog.dom.forms.setDisabled(el, disabled);
    }
  } else {
    if (disabled == true) {
      el.blur();
    }
    el.disabled = disabled;
  }
};
goog.dom.forms.focusAndSelect = function(el) {
  el.focus();
  if (el.select) {
    el.select();
  }
};
goog.dom.forms.hasValue = function(el) {
  var value = goog.dom.forms.getValue(el);
  return !!value;
};
goog.dom.forms.hasValueByName = function(form, name) {
  var value = goog.dom.forms.getValueByName(form, name);
  return !!value;
};
goog.dom.forms.getValue = function(input) {
  var type = input.type;
  if (typeof type === "string") {
    var el = input;
    switch(type.toLowerCase()) {
      case goog.dom.InputType.CHECKBOX:
      case goog.dom.InputType.RADIO:
        return goog.dom.forms.getInputChecked_(el);
      case goog.dom.InputType.SELECT_ONE:
        return goog.dom.forms.getSelectSingle_(el);
      case goog.dom.InputType.SELECT_MULTIPLE:
        return goog.dom.forms.getSelectMultiple_(el);
      default:
    }
  }
  return input.value != null ? input.value : null;
};
goog.dom.forms.getValueByName = function(form, name) {
  var els = form.elements[name];
  if (!els) {
    return null;
  } else if (els.type) {
    return goog.dom.forms.getValue(els);
  } else {
    for (var i = 0; i < els.length; i++) {
      var val = goog.dom.forms.getValue(els[i]);
      if (val) {
        return val;
      }
    }
    return null;
  }
};
goog.dom.forms.getInputChecked_ = function(el) {
  return el.checked ? el.value : null;
};
goog.dom.forms.getSelectSingle_ = function(el) {
  var selectedIndex = el.selectedIndex;
  return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
};
goog.dom.forms.getSelectMultiple_ = function(el) {
  var values = [];
  for (var option, i = 0; option = el.options[i]; i++) {
    if (option.selected) {
      values.push(option.value);
    }
  }
  return values.length ? values : null;
};
goog.dom.forms.setValue = function(el, opt_value) {
  var type = el.type;
  switch(typeof type === "string" && type.toLowerCase()) {
    case goog.dom.InputType.CHECKBOX:
    case goog.dom.InputType.RADIO:
      goog.dom.forms.setInputChecked_(el, opt_value);
      return;
    case goog.dom.InputType.SELECT_ONE:
      goog.dom.forms.setSelectSingle_(el, opt_value);
      return;
    case goog.dom.InputType.SELECT_MULTIPLE:
      goog.dom.forms.setSelectMultiple_(el, opt_value);
      return;
    default:
      el.value = opt_value != null ? opt_value : "";
  }
};
goog.dom.forms.setInputChecked_ = function(el, opt_value) {
  el.checked = opt_value;
};
goog.dom.forms.setSelectSingle_ = function(el, opt_value) {
  el.selectedIndex = -1;
  if (typeof opt_value === "string") {
    for (var option, i = 0; option = el.options[i]; i++) {
      if (option.value == opt_value) {
        option.selected = true;
        break;
      }
    }
  }
};
goog.dom.forms.setSelectMultiple_ = function(el, opt_value) {
  if (typeof opt_value === "string") {
    opt_value = [opt_value];
  }
  for (var option, i = 0; option = el.options[i]; i++) {
    option.selected = false;
    if (opt_value) {
      for (var value, j = 0; value = opt_value[j]; j++) {
        if (option.value == value) {
          option.selected = true;
        }
      }
    }
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.forms.js");

goog.provide("goog.dom.classlist");
goog.require("goog.array");
goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = goog.define("goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST", false);
goog.dom.classlist.getClassName_ = function(element) {
  return typeof element.className == "string" ? element.className : element.getAttribute && element.getAttribute("class") || "";
};
goog.dom.classlist.get = function(element) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    return element.classList;
  }
  return goog.dom.classlist.getClassName_(element).match(/\S+/g) || [];
};
goog.dom.classlist.set = function(element, className) {
  if (typeof element.className == "string") {
    element.className = className;
    return;
  } else if (element.setAttribute) {
    element.setAttribute("class", className);
  }
};
goog.dom.classlist.contains = function(element, className) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    return element.classList.contains(className);
  }
  return goog.array.contains(goog.dom.classlist.get(element), className);
};
goog.dom.classlist.add = function(element, className) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    element.classList.add(className);
    return;
  }
  if (!goog.dom.classlist.contains(element, className)) {
    var oldClassName = goog.dom.classlist.getClassName_(element);
    goog.dom.classlist.set(element, oldClassName + (oldClassName.length > 0 ? " " + className : className));
  }
};
goog.dom.classlist.addAll = function(element, classesToAdd) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    Array.prototype.forEach.call(classesToAdd, function(className) {
      goog.dom.classlist.add(element, className);
    });
    return;
  }
  var classMap = {};
  Array.prototype.forEach.call(goog.dom.classlist.get(element), function(className) {
    classMap[className] = true;
  });
  Array.prototype.forEach.call(classesToAdd, function(className) {
    classMap[className] = true;
  });
  var newClassName = "";
  for (var className in classMap) {
    newClassName += newClassName.length > 0 ? " " + className : className;
  }
  goog.dom.classlist.set(element, newClassName);
};
goog.dom.classlist.remove = function(element, className) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    element.classList.remove(className);
    return;
  }
  if (goog.dom.classlist.contains(element, className)) {
    goog.dom.classlist.set(element, Array.prototype.filter.call(goog.dom.classlist.get(element), function(c) {
      return c != className;
    }).join(" "));
  }
};
goog.dom.classlist.removeAll = function(element, classesToRemove) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {
    Array.prototype.forEach.call(classesToRemove, function(className) {
      goog.dom.classlist.remove(element, className);
    });
    return;
  }
  goog.dom.classlist.set(element, Array.prototype.filter.call(goog.dom.classlist.get(element), function(className) {
    return !goog.array.contains(classesToRemove, className);
  }).join(" "));
};
goog.dom.classlist.enable = function(element, className, enabled) {
  if (enabled) {
    goog.dom.classlist.add(element, className);
  } else {
    goog.dom.classlist.remove(element, className);
  }
};
goog.dom.classlist.enableAll = function(element, classesToEnable, enabled) {
  var f = enabled ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll;
  f(element, classesToEnable);
};
goog.dom.classlist.swap = function(element, fromClass, toClass) {
  if (goog.dom.classlist.contains(element, fromClass)) {
    goog.dom.classlist.remove(element, fromClass);
    goog.dom.classlist.add(element, toClass);
    return true;
  }
  return false;
};
goog.dom.classlist.toggle = function(element, className) {
  var add = !goog.dom.classlist.contains(element, className);
  goog.dom.classlist.enable(element, className, add);
  return add;
};
goog.dom.classlist.addRemove = function(element, classToRemove, classToAdd) {
  goog.dom.classlist.remove(element, classToRemove);
  goog.dom.classlist.add(element, classToAdd);
};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.classlist.js");

goog.provide("goog.dom.vendor");
goog.require("goog.string");
goog.require("goog.userAgent");
goog.dom.vendor.getVendorJsPrefix = function() {
  if (goog.userAgent.WEBKIT) {
    return "Webkit";
  } else if (goog.userAgent.GECKO) {
    return "Moz";
  } else if (goog.userAgent.IE) {
    return "ms";
  }
  return null;
};
goog.dom.vendor.getVendorPrefix = function() {
  if (goog.userAgent.WEBKIT) {
    return "-webkit";
  } else if (goog.userAgent.GECKO) {
    return "-moz";
  } else if (goog.userAgent.IE) {
    return "-ms";
  }
  return null;
};
goog.dom.vendor.getPrefixedPropertyName = function(propertyName, opt_object) {
  if (opt_object && propertyName in opt_object) {
    return propertyName;
  }
  var prefix = goog.dom.vendor.getVendorJsPrefix();
  if (prefix) {
    prefix = prefix.toLowerCase();
    var prefixedPropertyName = prefix + goog.string.toTitleCase(propertyName);
    return opt_object === undefined || prefixedPropertyName in opt_object ? prefixedPropertyName : null;
  }
  return null;
};
goog.dom.vendor.getPrefixedEventType = function(eventType) {
  var prefix = goog.dom.vendor.getVendorJsPrefix() || "";
  return (prefix + eventType).toLowerCase();
};

$CLJS.SHADOW_ENV.setLoaded("goog.dom.vendor.js");

goog.provide("goog.math.Box");
goog.require("goog.asserts");
goog.require("goog.math.Coordinate");
goog.math.Box = function(top, right, bottom, left) {
  this.top = top;
  this.right = right;
  this.bottom = bottom;
  this.left = left;
};
goog.math.Box.boundingBox = function(var_args) {
  var box = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x);
  for (var i = 1; i < arguments.length; i++) {
    box.expandToIncludeCoordinate(arguments[i]);
  }
  return box;
};
goog.math.Box.prototype.getWidth = function() {
  return this.right - this.left;
};
goog.math.Box.prototype.getHeight = function() {
  return this.bottom - this.top;
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left);
};
if (goog.DEBUG) {
  goog.math.Box.prototype.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
  };
}
goog.math.Box.prototype.contains = function(other) {
  return goog.math.Box.contains(this, other);
};
goog.math.Box.prototype.expand = function(top, opt_right, opt_bottom, opt_left) {
  if (goog.isObject(top)) {
    this.top -= top.top;
    this.right += top.right;
    this.bottom += top.bottom;
    this.left -= top.left;
  } else {
    this.top -= top;
    this.right += Number(opt_right);
    this.bottom += Number(opt_bottom);
    this.left -= Number(opt_left);
  }
  return this;
};
goog.math.Box.prototype.expandToInclude = function(box) {
  this.left = Math.min(this.left, box.left);
  this.top = Math.min(this.top, box.top);
  this.right = Math.max(this.right, box.right);
  this.bottom = Math.max(this.bottom, box.bottom);
};
goog.math.Box.prototype.expandToIncludeCoordinate = function(coord) {
  this.top = Math.min(this.top, coord.y);
  this.right = Math.max(this.right, coord.x);
  this.bottom = Math.max(this.bottom, coord.y);
  this.left = Math.min(this.left, coord.x);
};
goog.math.Box.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left;
};
goog.math.Box.contains = function(box, other) {
  if (!box || !other) {
    return false;
  }
  if (other instanceof goog.math.Box) {
    return other.left >= box.left && other.right <= box.right && other.top >= box.top && other.bottom <= box.bottom;
  }
  return other.x >= box.left && other.x <= box.right && other.y >= box.top && other.y <= box.bottom;
};
goog.math.Box.relativePositionX = function(box, coord) {
  if (coord.x < box.left) {
    return coord.x - box.left;
  } else if (coord.x > box.right) {
    return coord.x - box.right;
  }
  return 0;
};
goog.math.Box.relativePositionY = function(box, coord) {
  if (coord.y < box.top) {
    return coord.y - box.top;
  } else if (coord.y > box.bottom) {
    return coord.y - box.bottom;
  }
  return 0;
};
goog.math.Box.distance = function(box, coord) {
  var x = goog.math.Box.relativePositionX(box, coord);
  var y = goog.math.Box.relativePositionY(box, coord);
  return Math.sqrt(x * x + y * y);
};
goog.math.Box.intersects = function(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;
};
goog.math.Box.intersectsWithPadding = function(a, b, padding) {
  return a.left <= b.right + padding && b.left <= a.right + padding && a.top <= b.bottom + padding && b.top <= a.bottom + padding;
};
goog.math.Box.prototype.ceil = function() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};
goog.math.Box.prototype.floor = function() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};
goog.math.Box.prototype.round = function() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};
goog.math.Box.prototype.translate = function(tx, opt_ty) {
  if (tx instanceof goog.math.Coordinate) {
    this.left += tx.x;
    this.right += tx.x;
    this.top += tx.y;
    this.bottom += tx.y;
  } else {
    goog.asserts.assertNumber(tx);
    this.left += tx;
    this.right += tx;
    if (typeof opt_ty === "number") {
      this.top += opt_ty;
      this.bottom += opt_ty;
    }
  }
  return this;
};
goog.math.Box.prototype.scale = function(sx, opt_sy) {
  var sy = typeof opt_sy === "number" ? opt_sy : sx;
  this.left *= sx;
  this.right *= sx;
  this.top *= sy;
  this.bottom *= sy;
  return this;
};

$CLJS.SHADOW_ENV.setLoaded("goog.math.box.js");

goog.provide("goog.math.IRect");
goog.math.IRect = function() {
};
goog.math.IRect.prototype.left;
goog.math.IRect.prototype.top;
goog.math.IRect.prototype.width;
goog.math.IRect.prototype.height;

$CLJS.SHADOW_ENV.setLoaded("goog.math.irect.js");

goog.provide("goog.math.Rect");
goog.require("goog.asserts");
goog.require("goog.math.Box");
goog.require("goog.math.Coordinate");
goog.require("goog.math.IRect");
goog.require("goog.math.Size");
goog.math.Rect = function(x, y, w, h) {
  this.left = x;
  this.top = y;
  this.width = w;
  this.height = h;
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height);
};
goog.math.Rect.prototype.toBox = function() {
  var right = this.left + this.width;
  var bottom = this.top + this.height;
  return new goog.math.Box(this.top, right, bottom, this.left);
};
goog.math.Rect.createFromPositionAndSize = function(position, size) {
  return new goog.math.Rect(position.x, position.y, size.width, size.height);
};
goog.math.Rect.createFromBox = function(box) {
  return new goog.math.Rect(box.left, box.top, box.right - box.left, box.bottom - box.top);
};
if (goog.DEBUG) {
  goog.math.Rect.prototype.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
  };
}
goog.math.Rect.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height;
};
goog.math.Rect.prototype.intersection = function(rect) {
  var x0 = Math.max(this.left, rect.left);
  var x1 = Math.min(this.left + this.width, rect.left + rect.width);
  if (x0 <= x1) {
    var y0 = Math.max(this.top, rect.top);
    var y1 = Math.min(this.top + this.height, rect.top + rect.height);
    if (y0 <= y1) {
      this.left = x0;
      this.top = y0;
      this.width = x1 - x0;
      this.height = y1 - y0;
      return true;
    }
  }
  return false;
};
goog.math.Rect.intersection = function(a, b) {
  var x0 = Math.max(a.left, b.left);
  var x1 = Math.min(a.left + a.width, b.left + b.width);
  if (x0 <= x1) {
    var y0 = Math.max(a.top, b.top);
    var y1 = Math.min(a.top + a.height, b.top + b.height);
    if (y0 <= y1) {
      return new goog.math.Rect(x0, y0, x1 - x0, y1 - y0);
    }
  }
  return null;
};
goog.math.Rect.intersects = function(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
};
goog.math.Rect.prototype.intersects = function(rect) {
  return goog.math.Rect.intersects(this, rect);
};
goog.math.Rect.difference = function(a, b) {
  var intersection = goog.math.Rect.intersection(a, b);
  if (!intersection || !intersection.height || !intersection.width) {
    return [a.clone()];
  }
  var result = [];
  var top = a.top;
  var height = a.height;
  var ar = a.left + a.width;
  var ab = a.top + a.height;
  var br = b.left + b.width;
  var bb = b.top + b.height;
  if (b.top > a.top) {
    result.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top));
    top = b.top;
    height -= b.top - a.top;
  }
  if (bb < ab) {
    result.push(new goog.math.Rect(a.left, bb, a.width, ab - bb));
    height = bb - top;
  }
  if (b.left > a.left) {
    result.push(new goog.math.Rect(a.left, top, b.left - a.left, height));
  }
  if (br < ar) {
    result.push(new goog.math.Rect(br, top, ar - br, height));
  }
  return result;
};
goog.math.Rect.prototype.difference = function(rect) {
  return goog.math.Rect.difference(this, rect);
};
goog.math.Rect.prototype.boundingRect = function(rect) {
  var right = Math.max(this.left + this.width, rect.left + rect.width);
  var bottom = Math.max(this.top + this.height, rect.top + rect.height);
  this.left = Math.min(this.left, rect.left);
  this.top = Math.min(this.top, rect.top);
  this.width = right - this.left;
  this.height = bottom - this.top;
};
goog.math.Rect.boundingRect = function(a, b) {
  if (!a || !b) {
    return null;
  }
  var newRect = new goog.math.Rect(a.left, a.top, a.width, a.height);
  newRect.boundingRect(b);
  return newRect;
};
goog.math.Rect.prototype.contains = function(another) {
  if (another instanceof goog.math.Coordinate) {
    return another.x >= this.left && another.x <= this.left + this.width && another.y >= this.top && another.y <= this.top + this.height;
  } else {
    return this.left <= another.left && this.left + this.width >= another.left + another.width && this.top <= another.top && this.top + this.height >= another.top + another.height;
  }
};
goog.math.Rect.prototype.squaredDistance = function(point) {
  var dx = point.x < this.left ? this.left - point.x : Math.max(point.x - (this.left + this.width), 0);
  var dy = point.y < this.top ? this.top - point.y : Math.max(point.y - (this.top + this.height), 0);
  return dx * dx + dy * dy;
};
goog.math.Rect.prototype.distance = function(point) {
  return Math.sqrt(this.squaredDistance(point));
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.math.Rect.prototype.getTopLeft = function() {
  return new goog.math.Coordinate(this.left, this.top);
};
goog.math.Rect.prototype.getCenter = function() {
  return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2);
};
goog.math.Rect.prototype.getBottomRight = function() {
  return new goog.math.Coordinate(this.left + this.width, this.top + this.height);
};
goog.math.Rect.prototype.ceil = function() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Rect.prototype.floor = function() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Rect.prototype.round = function() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Rect.prototype.translate = function(tx, opt_ty) {
  if (tx instanceof goog.math.Coordinate) {
    this.left += tx.x;
    this.top += tx.y;
  } else {
    this.left += goog.asserts.assertNumber(tx);
    if (typeof opt_ty === "number") {
      this.top += opt_ty;
    }
  }
  return this;
};
goog.math.Rect.prototype.scale = function(sx, opt_sy) {
  var sy = typeof opt_sy === "number" ? opt_sy : sx;
  this.left *= sx;
  this.width *= sx;
  this.top *= sy;
  this.height *= sy;
  return this;
};

$CLJS.SHADOW_ENV.setLoaded("goog.math.rect.js");

goog.provide("goog.style");
goog.require("goog.asserts");
goog.require("goog.dom");
goog.require("goog.dom.NodeType");
goog.require("goog.dom.TagName");
goog.require("goog.dom.safe");
goog.require("goog.dom.vendor");
goog.require("goog.html.SafeStyleSheet");
goog.require("goog.math.Box");
goog.require("goog.math.Coordinate");
goog.require("goog.math.Rect");
goog.require("goog.math.Size");
goog.require("goog.object");
goog.require("goog.reflect");
goog.require("goog.string");
goog.require("goog.userAgent");
goog.requireType("goog.events.Event");
goog.style.setStyle = function(element, style, opt_value) {
  if (typeof style === "string") {
    goog.style.setStyle_(element, opt_value, style);
  } else {
    for (var key in style) {
      goog.style.setStyle_(element, style[key], key);
    }
  }
};
goog.style.setStyle_ = function(element, value, style) {
  var propertyName = goog.style.getVendorJsStyleName_(element, style);
  if (propertyName) {
    element.style[propertyName] = value;
  }
};
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(element, style) {
  var propertyName = goog.style.styleNameCache_[style];
  if (!propertyName) {
    var camelStyle = goog.string.toCamelCase(style);
    propertyName = camelStyle;
    if (element.style[camelStyle] === undefined) {
      var prefixedStyle = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(camelStyle);
      if (element.style[prefixedStyle] !== undefined) {
        propertyName = prefixedStyle;
      }
    }
    goog.style.styleNameCache_[style] = propertyName;
  }
  return propertyName;
};
goog.style.getVendorStyleName_ = function(element, style) {
  var camelStyle = goog.string.toCamelCase(style);
  if (element.style[camelStyle] === undefined) {
    var prefixedStyle = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(camelStyle);
    if (element.style[prefixedStyle] !== undefined) {
      return goog.dom.vendor.getVendorPrefix() + "-" + style;
    }
  }
  return style;
};
goog.style.getStyle = function(element, property) {
  var styleValue = element.style[goog.string.toCamelCase(property)];
  if (typeof styleValue !== "undefined") {
    return styleValue;
  }
  return element.style[goog.style.getVendorJsStyleName_(element, property)] || "";
};
goog.style.getComputedStyle = function(element, property) {
  var doc = goog.dom.getOwnerDocument(element);
  if (doc.defaultView && doc.defaultView.getComputedStyle) {
    var styles = doc.defaultView.getComputedStyle(element, null);
    if (styles) {
      return styles[property] || styles.getPropertyValue(property) || "";
    }
  }
  return "";
};
goog.style.getCascadedStyle = function(element, style) {
  return element.currentStyle ? element.currentStyle[style] : null;
};
goog.style.getStyle_ = function(element, style) {
  return goog.style.getComputedStyle(element, style) || goog.style.getCascadedStyle(element, style) || element.style && element.style[style];
};
goog.style.getComputedBoxSizing = function(element) {
  return goog.style.getStyle_(element, "boxSizing") || goog.style.getStyle_(element, "MozBoxSizing") || goog.style.getStyle_(element, "WebkitBoxSizing") || null;
};
goog.style.getComputedPosition = function(element) {
  return goog.style.getStyle_(element, "position");
};
goog.style.getBackgroundColor = function(element) {
  return goog.style.getStyle_(element, "backgroundColor");
};
goog.style.getComputedOverflowX = function(element) {
  return goog.style.getStyle_(element, "overflowX");
};
goog.style.getComputedOverflowY = function(element) {
  return goog.style.getStyle_(element, "overflowY");
};
goog.style.getComputedZIndex = function(element) {
  return goog.style.getStyle_(element, "zIndex");
};
goog.style.getComputedTextAlign = function(element) {
  return goog.style.getStyle_(element, "textAlign");
};
goog.style.getComputedCursor = function(element) {
  return goog.style.getStyle_(element, "cursor");
};
goog.style.getComputedTransform = function(element) {
  var property = goog.style.getVendorStyleName_(element, "transform");
  return goog.style.getStyle_(element, property) || goog.style.getStyle_(element, "transform");
};
goog.style.setPosition = function(el, arg1, opt_arg2) {
  var x, y;
  if (arg1 instanceof goog.math.Coordinate) {
    x = arg1.x;
    y = arg1.y;
  } else {
    x = arg1;
    y = opt_arg2;
  }
  el.style.left = goog.style.getPixelStyleValue_(x, false);
  el.style.top = goog.style.getPixelStyleValue_(y, false);
};
goog.style.getPosition = function(element) {
  return new goog.math.Coordinate(element.offsetLeft, element.offsetTop);
};
goog.style.getClientViewportElement = function(opt_node) {
  var doc;
  if (opt_node) {
    doc = goog.dom.getOwnerDocument(opt_node);
  } else {
    doc = goog.dom.getDocument();
  }
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9) && !goog.dom.getDomHelper(doc).isCss1CompatMode()) {
    return doc.body;
  }
  return doc.documentElement;
};
goog.style.getViewportPageOffset = function(doc) {
  var body = doc.body;
  var documentElement = doc.documentElement;
  var scrollLeft = body.scrollLeft || documentElement.scrollLeft;
  var scrollTop = body.scrollTop || documentElement.scrollTop;
  return new goog.math.Coordinate(scrollLeft, scrollTop);
};
goog.style.getBoundingClientRect_ = function(el) {
  try {
    return el.getBoundingClientRect();
  } catch (e) {
    return {"left":0, "top":0, "right":0, "bottom":0};
  }
};
goog.style.getOffsetParent = function(element) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) {
    goog.asserts.assert(element && "offsetParent" in element);
    return element.offsetParent;
  }
  var doc = goog.dom.getOwnerDocument(element);
  var positionStyle = goog.style.getStyle_(element, "position");
  var skipStatic = positionStyle == "fixed" || positionStyle == "absolute";
  for (var parent = element.parentNode; parent && parent != doc; parent = parent.parentNode) {
    if (parent.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && parent.host) {
      parent = parent.host;
    }
    positionStyle = goog.style.getStyle_(parent, "position");
    skipStatic = skipStatic && positionStyle == "static" && parent != doc.documentElement && parent != doc.body;
    if (!skipStatic && (parent.scrollWidth > parent.clientWidth || parent.scrollHeight > parent.clientHeight || positionStyle == "fixed" || positionStyle == "absolute" || positionStyle == "relative")) {
      return parent;
    }
  }
  return null;
};
goog.style.getVisibleRectForElement = function(element) {
  var visibleRect = new goog.math.Box(0, Infinity, Infinity, 0);
  var dom = goog.dom.getDomHelper(element);
  var body = dom.getDocument().body;
  var documentElement = dom.getDocument().documentElement;
  var scrollEl = dom.getDocumentScrollElement();
  for (var el = element; el = goog.style.getOffsetParent(el);) {
    if ((!goog.userAgent.IE || el.clientWidth != 0) && (!goog.userAgent.WEBKIT || el.clientHeight != 0 || el != body) && (el != body && el != documentElement && goog.style.getStyle_(el, "overflow") != "visible")) {
      var pos = goog.style.getPageOffset(el);
      var client = goog.style.getClientLeftTop(el);
      pos.x += client.x;
      pos.y += client.y;
      visibleRect.top = Math.max(visibleRect.top, pos.y);
      visibleRect.right = Math.min(visibleRect.right, pos.x + el.clientWidth);
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.y + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.x);
    }
  }
  var scrollX = scrollEl.scrollLeft, scrollY = scrollEl.scrollTop;
  visibleRect.left = Math.max(visibleRect.left, scrollX);
  visibleRect.top = Math.max(visibleRect.top, scrollY);
  var winSize = dom.getViewportSize();
  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
};
goog.style.getContainerOffsetToScrollInto = function(element, opt_container, opt_center) {
  var container = opt_container || goog.dom.getDocumentScrollElement();
  var elementPos = goog.style.getPageOffset(element);
  var containerPos = goog.style.getPageOffset(container);
  var containerBorder = goog.style.getBorderBox(container);
  if (container == goog.dom.getDocumentScrollElement()) {
    var relX = elementPos.x - container.scrollLeft;
    var relY = elementPos.y - container.scrollTop;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10)) {
      relX += containerBorder.left;
      relY += containerBorder.top;
    }
  } else {
    var relX = elementPos.x - containerPos.x - containerBorder.left;
    var relY = elementPos.y - containerPos.y - containerBorder.top;
  }
  var elementSize = goog.style.getSizeWithDisplay_(element);
  var spaceX = container.clientWidth - elementSize.width;
  var spaceY = container.clientHeight - elementSize.height;
  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;
  if (opt_center) {
    scrollLeft += relX - spaceX / 2;
    scrollTop += relY - spaceY / 2;
  } else {
    scrollLeft += Math.min(relX, Math.max(relX - spaceX, 0));
    scrollTop += Math.min(relY, Math.max(relY - spaceY, 0));
  }
  return new goog.math.Coordinate(scrollLeft, scrollTop);
};
goog.style.scrollIntoContainerView = function(element, opt_container, opt_center) {
  var container = opt_container || goog.dom.getDocumentScrollElement();
  var offset = goog.style.getContainerOffsetToScrollInto(element, container, opt_center);
  container.scrollLeft = offset.x;
  container.scrollTop = offset.y;
};
goog.style.getClientLeftTop = function(el) {
  return new goog.math.Coordinate(el.clientLeft, el.clientTop);
};
goog.style.getPageOffset = function(el) {
  var doc = goog.dom.getOwnerDocument(el);
  goog.asserts.assertObject(el, "Parameter is required");
  var pos = new goog.math.Coordinate(0, 0);
  var viewportElement = goog.style.getClientViewportElement(doc);
  if (el == viewportElement) {
    return pos;
  }
  var box = goog.style.getBoundingClientRect_(el);
  var scrollCoord = goog.dom.getDomHelper(doc).getDocumentScroll();
  pos.x = box.left + scrollCoord.x;
  pos.y = box.top + scrollCoord.y;
  return pos;
};
goog.style.getPageOffsetLeft = function(el) {
  return goog.style.getPageOffset(el).x;
};
goog.style.getPageOffsetTop = function(el) {
  return goog.style.getPageOffset(el).y;
};
goog.style.getFramedPageOffset = function(el, relativeWin) {
  var position = new goog.math.Coordinate(0, 0);
  var currentWin = goog.dom.getWindow(goog.dom.getOwnerDocument(el));
  if (!goog.reflect.canAccessProperty(currentWin, "parent")) {
    return position;
  }
  var currentEl = el;
  do {
    var offset = currentWin == relativeWin ? goog.style.getPageOffset(currentEl) : goog.style.getClientPositionForElement_(goog.asserts.assert(currentEl));
    position.x += offset.x;
    position.y += offset.y;
  } while (currentWin && currentWin != relativeWin && currentWin != currentWin.parent && (currentEl = currentWin.frameElement) && (currentWin = currentWin.parent));
  return position;
};
goog.style.translateRectForAnotherFrame = function(rect, origBase, newBase) {
  if (origBase.getDocument() != newBase.getDocument()) {
    var body = origBase.getDocument().body;
    var pos = goog.style.getFramedPageOffset(body, newBase.getWindow());
    pos = goog.math.Coordinate.difference(pos, goog.style.getPageOffset(body));
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9) && !origBase.isCss1CompatMode()) {
      pos = goog.math.Coordinate.difference(pos, origBase.getDocumentScroll());
    }
    rect.left += pos.x;
    rect.top += pos.y;
  }
};
goog.style.getRelativePosition = function(a, b) {
  var ap = goog.style.getClientPosition(a);
  var bp = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(ap.x - bp.x, ap.y - bp.y);
};
goog.style.getClientPositionForElement_ = function(el) {
  var box = goog.style.getBoundingClientRect_(el);
  return new goog.math.Coordinate(box.left, box.top);
};
goog.style.getClientPosition = function(el) {
  goog.asserts.assert(el);
  if (el.nodeType == goog.dom.NodeType.ELEMENT) {
    return goog.style.getClientPositionForElement_(el);
  } else {
    var targetEvent = el.changedTouches ? el.changedTouches[0] : el;
    return new goog.math.Coordinate(targetEvent.clientX, targetEvent.clientY);
  }
};
goog.style.setPageOffset = function(el, x, opt_y) {
  var cur = goog.style.getPageOffset(el);
  if (x instanceof goog.math.Coordinate) {
    opt_y = x.y;
    x = x.x;
  }
  var dx = goog.asserts.assertNumber(x) - cur.x;
  var dy = Number(opt_y) - cur.y;
  goog.style.setPosition(el, el.offsetLeft + dx, el.offsetTop + dy);
};
goog.style.setSize = function(element, w, opt_h) {
  var h;
  if (w instanceof goog.math.Size) {
    h = w.height;
    w = w.width;
  } else {
    if (opt_h == undefined) {
      throw new Error("missing height argument");
    }
    h = opt_h;
  }
  goog.style.setWidth(element, w);
  goog.style.setHeight(element, h);
};
goog.style.getPixelStyleValue_ = function(value, round) {
  if (typeof value == "number") {
    value = (round ? Math.round(value) : value) + "px";
  }
  return value;
};
goog.style.setHeight = function(element, height) {
  element.style.height = goog.style.getPixelStyleValue_(height, true);
};
goog.style.setWidth = function(element, width) {
  element.style.width = goog.style.getPixelStyleValue_(width, true);
};
goog.style.getSize = function(element) {
  return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, element);
};
goog.style.evaluateWithTemporaryDisplay_ = function(fn, element) {
  if (goog.style.getStyle_(element, "display") != "none") {
    return fn(element);
  }
  var style = element.style;
  var originalDisplay = style.display;
  var originalVisibility = style.visibility;
  var originalPosition = style.position;
  style.visibility = "hidden";
  style.position = "absolute";
  style.display = "inline";
  var retVal = fn(element);
  style.display = originalDisplay;
  style.position = originalPosition;
  style.visibility = originalVisibility;
  return retVal;
};
goog.style.getSizeWithDisplay_ = function(element) {
  var offsetWidth = element.offsetWidth;
  var offsetHeight = element.offsetHeight;
  var webkitOffsetsZero = goog.userAgent.WEBKIT && !offsetWidth && !offsetHeight;
  if ((offsetWidth === undefined || webkitOffsetsZero) && element.getBoundingClientRect) {
    var clientRect = goog.style.getBoundingClientRect_(element);
    return new goog.math.Size(clientRect.right - clientRect.left, clientRect.bottom - clientRect.top);
  }
  return new goog.math.Size(offsetWidth, offsetHeight);
};
goog.style.getTransformedSize = function(element) {
  if (!element.getBoundingClientRect) {
    return null;
  }
  var clientRect = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, element);
  return new goog.math.Size(clientRect.right - clientRect.left, clientRect.bottom - clientRect.top);
};
goog.style.getBounds = function(element) {
  var o = goog.style.getPageOffset(element);
  var s = goog.style.getSize(element);
  return new goog.math.Rect(o.x, o.y, s.width, s.height);
};
goog.style.toCamelCase = function(selector) {
  return goog.string.toCamelCase(String(selector));
};
goog.style.toSelectorCase = function(selector) {
  return goog.string.toSelectorCase(selector);
};
goog.style.getOpacity = function(el) {
  goog.asserts.assert(el);
  var style = el.style;
  var result = "";
  if ("opacity" in style) {
    result = style.opacity;
  } else if ("MozOpacity" in style) {
    result = style.MozOpacity;
  } else if ("filter" in style) {
    var match = style.filter.match(/alpha\(opacity=([\d.]+)\)/);
    if (match) {
      result = String(match[1] / 100);
    }
  }
  return result == "" ? result : Number(result);
};
goog.style.setOpacity = function(el, alpha) {
  goog.asserts.assert(el);
  var style = el.style;
  if ("opacity" in style) {
    style.opacity = alpha;
  } else if ("MozOpacity" in style) {
    style.MozOpacity = alpha;
  } else if ("filter" in style) {
    if (alpha === "") {
      style.filter = "";
    } else {
      style.filter = "alpha(opacity\x3d" + Number(alpha) * 100 + ")";
    }
  }
};
goog.style.setTransparentBackgroundImage = function(el, src) {
  var style = el.style;
  style.backgroundImage = "url(" + src + ")";
  style.backgroundPosition = "top left";
  style.backgroundRepeat = "no-repeat";
};
goog.style.clearTransparentBackgroundImage = function(el) {
  var style = el.style;
  if ("filter" in style) {
    style.filter = "";
  } else {
    style.backgroundImage = "none";
  }
};
goog.style.showElement = function(el, display) {
  goog.style.setElementShown(el, display);
};
goog.style.setElementShown = function(el, isShown) {
  el.style.display = isShown ? "" : "none";
};
goog.style.isElementShown = function(el) {
  return el.style.display != "none";
};
goog.style.installSafeStyleSheet = function(safeStyleSheet, opt_node) {
  var dh = goog.dom.getDomHelper(opt_node);
  var doc = dh.getDocument();
  if (goog.userAgent.IE && doc.createStyleSheet) {
    var styleSheet = doc.createStyleSheet();
    goog.style.setSafeStyleSheet(styleSheet, safeStyleSheet);
    return styleSheet;
  } else {
    var head = dh.getElementsByTagNameAndClass(goog.dom.TagName.HEAD)[0];
    if (!head) {
      var body = dh.getElementsByTagNameAndClass(goog.dom.TagName.BODY)[0];
      head = dh.createDom(goog.dom.TagName.HEAD);
      body.parentNode.insertBefore(head, body);
    }
    var el = dh.createDom(goog.dom.TagName.STYLE);
    const nonce = goog.dom.safe.getStyleNonce();
    if (nonce) {
      el.setAttribute("nonce", nonce);
    }
    goog.style.setSafeStyleSheet(el, safeStyleSheet);
    dh.appendChild(head, el);
    return el;
  }
};
goog.style.uninstallStyles = function(styleSheet) {
  var node = styleSheet.ownerNode || styleSheet.owningElement || styleSheet;
  goog.dom.removeNode(node);
};
goog.style.setSafeStyleSheet = function(element, safeStyleSheet) {
  var stylesString = goog.html.SafeStyleSheet.unwrap(safeStyleSheet);
  if (goog.userAgent.IE && element.cssText !== undefined) {
    element.cssText = stylesString;
  } else if (goog.global.trustedTypes) {
    goog.dom.setTextContent(element, stylesString);
  } else {
    element.innerHTML = stylesString;
  }
};
goog.style.setPreWrap = function(el) {
  var style = el.style;
  if (goog.userAgent.GECKO) {
    style.whiteSpace = "-moz-pre-wrap";
  } else {
    style.whiteSpace = "pre-wrap";
  }
};
goog.style.setInlineBlock = function(el) {
  var style = el.style;
  style.position = "relative";
  style.display = "inline-block";
};
goog.style.isRightToLeft = function(el) {
  return "rtl" == goog.style.getStyle_(el, "direction");
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(el) {
  if (goog.style.unselectableStyle_) {
    return el.style[goog.style.unselectableStyle_].toLowerCase() == "none";
  } else if (goog.userAgent.IE) {
    return el.getAttribute("unselectable") == "on";
  }
  return false;
};
goog.style.setUnselectable = function(el, unselectable, opt_noRecurse) {
  var descendants = !opt_noRecurse ? el.getElementsByTagName("*") : null;
  var name = goog.style.unselectableStyle_;
  if (name) {
    var value = unselectable ? "none" : "";
    if (el.style) {
      el.style[name] = value;
    }
    if (descendants) {
      for (var i = 0, descendant; descendant = descendants[i]; i++) {
        if (descendant.style) {
          descendant.style[name] = value;
        }
      }
    }
  } else if (goog.userAgent.IE) {
    var value = unselectable ? "on" : "";
    el.setAttribute("unselectable", value);
    if (descendants) {
      for (var i = 0, descendant; descendant = descendants[i]; i++) {
        descendant.setAttribute("unselectable", value);
      }
    }
  }
};
goog.style.getBorderBoxSize = function(element) {
  return new goog.math.Size(element.offsetWidth, element.offsetHeight);
};
goog.style.setBorderBoxSize = function(element, size) {
  goog.style.setBoxSizingSize_(element, size, "border-box");
};
goog.style.getContentBoxSize = function(element) {
  var doc = goog.dom.getOwnerDocument(element);
  var ieCurrentStyle = goog.userAgent.IE && element.currentStyle;
  if (ieCurrentStyle && goog.dom.getDomHelper(doc).isCss1CompatMode() && ieCurrentStyle.width != "auto" && ieCurrentStyle.height != "auto" && !ieCurrentStyle.boxSizing) {
    var width = goog.style.getIePixelValue_(element, ieCurrentStyle.width, "width", "pixelWidth");
    var height = goog.style.getIePixelValue_(element, ieCurrentStyle.height, "height", "pixelHeight");
    return new goog.math.Size(width, height);
  } else {
    var borderBoxSize = goog.style.getBorderBoxSize(element);
    var paddingBox = goog.style.getPaddingBox(element);
    var borderBox = goog.style.getBorderBox(element);
    return new goog.math.Size(borderBoxSize.width - borderBox.left - paddingBox.left - paddingBox.right - borderBox.right, borderBoxSize.height - borderBox.top - paddingBox.top - paddingBox.bottom - borderBox.bottom);
  }
};
goog.style.setContentBoxSize = function(element, size) {
  goog.style.setBoxSizingSize_(element, size, "content-box");
};
goog.style.setBoxSizingSize_ = function(element, size, boxSizing) {
  var style = element.style;
  if (goog.userAgent.GECKO) {
    style.MozBoxSizing = boxSizing;
  } else if (goog.userAgent.WEBKIT) {
    style.WebkitBoxSizing = boxSizing;
  } else {
    style.boxSizing = boxSizing;
  }
  style.width = Math.max(size.width, 0) + "px";
  style.height = Math.max(size.height, 0) + "px";
};
goog.style.getIePixelValue_ = function(element, value, name, pixelName) {
  if (/^\d+px?$/.test(value)) {
    return parseInt(value, 10);
  } else {
    var oldStyleValue = element.style[name];
    var oldRuntimeValue = element.runtimeStyle[name];
    element.runtimeStyle[name] = element.currentStyle[name];
    element.style[name] = value;
    var pixelValue = element.style[pixelName];
    element.style[name] = oldStyleValue;
    element.runtimeStyle[name] = oldRuntimeValue;
    return +pixelValue;
  }
};
goog.style.getIePixelDistance_ = function(element, propName) {
  var value = goog.style.getCascadedStyle(element, propName);
  return value ? goog.style.getIePixelValue_(element, value, "left", "pixelLeft") : 0;
};
goog.style.getBox_ = function(element, stylePrefix) {
  if (goog.userAgent.IE) {
    var left = goog.style.getIePixelDistance_(element, stylePrefix + "Left");
    var right = goog.style.getIePixelDistance_(element, stylePrefix + "Right");
    var top = goog.style.getIePixelDistance_(element, stylePrefix + "Top");
    var bottom = goog.style.getIePixelDistance_(element, stylePrefix + "Bottom");
    return new goog.math.Box(top, right, bottom, left);
  } else {
    var left = goog.style.getComputedStyle(element, stylePrefix + "Left");
    var right = goog.style.getComputedStyle(element, stylePrefix + "Right");
    var top = goog.style.getComputedStyle(element, stylePrefix + "Top");
    var bottom = goog.style.getComputedStyle(element, stylePrefix + "Bottom");
    return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left));
  }
};
goog.style.getPaddingBox = function(element) {
  return goog.style.getBox_(element, "padding");
};
goog.style.getMarginBox = function(element) {
  return goog.style.getBox_(element, "margin");
};
goog.style.ieBorderWidthKeywords_ = {"thin":2, "medium":4, "thick":6};
goog.style.getIePixelBorder_ = function(element, prop) {
  if (goog.style.getCascadedStyle(element, prop + "Style") == "none") {
    return 0;
  }
  var width = goog.style.getCascadedStyle(element, prop + "Width");
  if (width in goog.style.ieBorderWidthKeywords_) {
    return goog.style.ieBorderWidthKeywords_[width];
  }
  return goog.style.getIePixelValue_(element, width, "left", "pixelLeft");
};
goog.style.getBorderBox = function(element) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    var left = goog.style.getIePixelBorder_(element, "borderLeft");
    var right = goog.style.getIePixelBorder_(element, "borderRight");
    var top = goog.style.getIePixelBorder_(element, "borderTop");
    var bottom = goog.style.getIePixelBorder_(element, "borderBottom");
    return new goog.math.Box(top, right, bottom, left);
  } else {
    var left = goog.style.getComputedStyle(element, "borderLeftWidth");
    var right = goog.style.getComputedStyle(element, "borderRightWidth");
    var top = goog.style.getComputedStyle(element, "borderTopWidth");
    var bottom = goog.style.getComputedStyle(element, "borderBottomWidth");
    return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left));
  }
};
goog.style.getFontFamily = function(el) {
  var doc = goog.dom.getOwnerDocument(el);
  var font = "";
  if (doc.body.createTextRange && goog.dom.contains(doc, el)) {
    var range = doc.body.createTextRange();
    range.moveToElementText(el);
    try {
      font = range.queryCommandValue("FontName");
    } catch (e) {
      font = "";
    }
  }
  if (!font) {
    font = goog.style.getStyle_(el, "fontFamily");
  }
  var fontsArray = font.split(",");
  if (fontsArray.length > 1) {
    font = fontsArray[0];
  }
  return goog.string.stripQuotes(font, "\"'");
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(value) {
  var units = value.match(goog.style.lengthUnitRegex_);
  return units && units[0] || null;
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {"cm":1, "in":1, "mm":1, "pc":1, "pt":1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {"em":1, "ex":1};
goog.style.getFontSize = function(el) {
  var fontSize = goog.style.getStyle_(el, "fontSize");
  var sizeUnits = goog.style.getLengthUnits(fontSize);
  if (fontSize && "px" == sizeUnits) {
    return parseInt(fontSize, 10);
  }
  if (goog.userAgent.IE) {
    if (String(sizeUnits) in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(el, fontSize, "left", "pixelLeft");
    } else if (el.parentNode && el.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(sizeUnits) in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      var parentElement = el.parentNode;
      var parentSize = goog.style.getStyle_(parentElement, "fontSize");
      return goog.style.getIePixelValue_(parentElement, fontSize == parentSize ? "1em" : fontSize, "left", "pixelLeft");
    }
  }
  var sizeElement = goog.dom.createDom(goog.dom.TagName.SPAN, {"style":"visibility:hidden;position:absolute;" + "line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(el, sizeElement);
  fontSize = sizeElement.offsetHeight;
  goog.dom.removeNode(sizeElement);
  return fontSize;
};
goog.style.parseStyleAttribute = function(value) {
  var result = {};
  value.split(/\s*;\s*/).forEach(function(pair) {
    var keyValue = pair.match(/\s*([\w-]+)\s*:(.+)/);
    if (keyValue) {
      var styleName = keyValue[1];
      var styleValue = goog.string.trim(keyValue[2]);
      result[goog.string.toCamelCase(styleName.toLowerCase())] = styleValue;
    }
  });
  return result;
};
goog.style.toStyleAttribute = function(obj) {
  var buffer = [];
  goog.object.forEach(obj, function(value, key) {
    buffer.push(goog.string.toSelectorCase(key), ":", value, ";");
  });
  return buffer.join("");
};
goog.style.setFloat = function(el, value) {
  el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = value;
};
goog.style.getFloat = function(el) {
  return el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || "";
};
goog.style.getScrollbarWidth = function(opt_className) {
  var outerDiv = goog.dom.createElement(goog.dom.TagName.DIV);
  if (opt_className) {
    outerDiv.className = opt_className;
  }
  outerDiv.style.cssText = "overflow:auto;" + "position:absolute;top:0;width:100px;height:100px";
  var innerDiv = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.style.setSize(innerDiv, "200px", "200px");
  outerDiv.appendChild(innerDiv);
  goog.dom.appendChild(goog.dom.getDocument().body, outerDiv);
  var width = outerDiv.offsetWidth - outerDiv.clientWidth;
  goog.dom.removeNode(outerDiv);
  return width;
};
goog.style.MATRIX_TRANSLATION_REGEX_ = new RegExp("matrix\\([0-9\\.\\-]+, [0-9\\.\\-]+, " + "[0-9\\.\\-]+, [0-9\\.\\-]+, " + "([0-9\\.\\-]+)p?x?, ([0-9\\.\\-]+)p?x?\\)");
goog.style.getCssTranslation = function(element) {
  var transform = goog.style.getComputedTransform(element);
  if (!transform) {
    return new goog.math.Coordinate(0, 0);
  }
  var matches = transform.match(goog.style.MATRIX_TRANSLATION_REGEX_);
  if (!matches) {
    return new goog.math.Coordinate(0, 0);
  }
  return new goog.math.Coordinate(parseFloat(matches[1]), parseFloat(matches[2]));
};

$CLJS.SHADOW_ENV.setLoaded("goog.style.style.js");

goog.provide("goog.style.transition");
goog.provide("goog.style.transition.Css3Property");
goog.require("goog.asserts");
goog.require("goog.dom");
goog.require("goog.dom.TagName");
goog.require("goog.dom.safe");
goog.require("goog.dom.vendor");
goog.require("goog.functions");
goog.require("goog.html.SafeHtml");
goog.require("goog.style");
goog.require("goog.userAgent");
goog.style.transition.Css3Property;
goog.style.transition.set = function(element, properties) {
  if (!Array.isArray(properties)) {
    properties = [properties];
  }
  goog.asserts.assert(properties.length > 0, "At least one Css3Property should be specified.");
  var values = properties.map(function(p) {
    if (typeof p === "string") {
      return p;
    } else {
      goog.asserts.assertObject(p, "Expected css3 property to be an object.");
      var propString = p.property + " " + p.duration + "s " + p.timing + " " + p.delay + "s";
      goog.asserts.assert(p.property && typeof p.duration === "number" && p.timing && typeof p.delay === "number", "Unexpected css3 property value: %s", propString);
      return propString;
    }
  });
  goog.style.transition.setPropertyValue_(element, values.join(","));
};
goog.style.transition.removeAll = function(element) {
  goog.style.transition.setPropertyValue_(element, "");
};
goog.style.transition.isSupported = goog.functions.cacheReturnValue(function() {
  if (goog.userAgent.IE) {
    return true;
  }
  var el = goog.dom.createElement(goog.dom.TagName.DIV);
  var transition = "opacity 1s linear";
  var vendorPrefix = goog.dom.vendor.getVendorPrefix();
  var style = {"transition":transition};
  if (vendorPrefix) {
    style[vendorPrefix + "-transition"] = transition;
  }
  goog.dom.safe.setInnerHtml(el, goog.html.SafeHtml.create("div", {"style":style}));
  var testElement = el.firstChild;
  goog.asserts.assert(testElement.nodeType == Node.ELEMENT_NODE);
  return goog.style.getStyle(testElement, "transition") != "";
});
goog.style.transition.setPropertyValue_ = function(element, transitionValue) {
  goog.style.setStyle(element, "transition", transitionValue);
};

$CLJS.SHADOW_ENV.setLoaded("goog.style.transition.js");

goog.provide("goog.debug.EntryPointMonitor");
goog.provide("goog.debug.entryPointRegistry");
goog.require("goog.asserts");
goog.debug.entryPointRegistry.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.EntryPointMonitor.prototype.wrap;
goog.debug.entryPointRegistry.EntryPointMonitor.prototype.unwrap;
goog.debug.EntryPointMonitor = goog.debug.entryPointRegistry.EntryPointMonitor;
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = false;
goog.debug.entryPointRegistry.register = function(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    var monitors = goog.debug.entryPointRegistry.monitors_;
    for (var i = 0; i < monitors.length; i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = true;
  var transformer = goog.bind(monitor.wrap, monitor);
  for (var i = 0; i < goog.debug.entryPointRegistry.refList_.length; i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  var transformer = goog.bind(monitor.unwrap, monitor);
  for (var i = 0; i < goog.debug.entryPointRegistry.refList_.length; i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  monitors.length--;
};

$CLJS.SHADOW_ENV.setLoaded("goog.debug.entrypointregistry.js");

goog.provide("goog.async.nextTick");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.dom");
goog.require("goog.dom.TagName");
goog.require("goog.functions");
goog.require("goog.labs.userAgent.browser");
goog.require("goog.labs.userAgent.engine");
goog.async.nextTick = function(callback, opt_context, opt_useSetImmediate) {
  var cb = callback;
  if (opt_context) {
    cb = goog.bind(callback, opt_context);
  }
  cb = goog.async.nextTick.wrapCallback_(cb);
  if (typeof goog.global.setImmediate === "function" && (opt_useSetImmediate || goog.async.nextTick.useSetImmediate_())) {
    goog.global.setImmediate(cb);
    return;
  }
  if (!goog.async.nextTick.nextTickImpl) {
    goog.async.nextTick.nextTickImpl = goog.async.nextTick.getNextTickImpl_();
  }
  goog.async.nextTick.nextTickImpl(cb);
};
goog.async.nextTick.useSetImmediate_ = function() {
  if (!goog.global.Window || !goog.global.Window.prototype) {
    return true;
  }
  if (goog.labs.userAgent.browser.isEdge() || goog.global.Window.prototype.setImmediate != goog.global.setImmediate) {
    return true;
  }
  return false;
};
goog.async.nextTick.nextTickImpl;
goog.async.nextTick.getNextTickImpl_ = function() {
  var Channel = goog.global["MessageChannel"];
  if (typeof Channel === "undefined" && typeof window !== "undefined" && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto()) {
    Channel = function() {
      var iframe = goog.dom.createElement(goog.dom.TagName.IFRAME);
      iframe.style.display = "none";
      document.documentElement.appendChild(iframe);
      var win = iframe.contentWindow;
      var doc = win.document;
      doc.open();
      doc.close();
      var message = "callImmediate" + Math.random();
      var origin = win.location.protocol == "file:" ? "*" : win.location.protocol + "//" + win.location.host;
      var onmessage = goog.bind(function(e) {
        if (origin != "*" && e.origin != origin || e.data != message) {
          return;
        }
        this["port1"].onmessage();
      }, this);
      win.addEventListener("message", onmessage, false);
      this["port1"] = {};
      this["port2"] = {postMessage:function() {
        win.postMessage(message, origin);
      }};
    };
  }
  if (typeof Channel !== "undefined" && !goog.labs.userAgent.browser.isIE()) {
    var channel = new Channel();
    var head = {};
    var tail = head;
    channel["port1"].onmessage = function() {
      if (head.next !== undefined) {
        head = head.next;
        var cb = head.cb;
        head.cb = null;
        cb();
      }
    };
    return function(cb) {
      tail.next = {cb:cb};
      tail = tail.next;
      channel["port2"].postMessage(0);
    };
  }
  return function(cb) {
    goog.global.setTimeout(cb, 0);
  };
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.async.nextTick.wrapCallback_ = transformer;
});

$CLJS.SHADOW_ENV.setLoaded("goog.async.nexttick.js");

goog.provide("goog.string.format");
goog.require("goog.string");
goog.string.format = function(formatString, var_args) {
  const args = Array.prototype.slice.call(arguments);
  const template = args.shift();
  if (typeof template == "undefined") {
    throw new Error("[goog.string.format] Template required");
  }
  const formatRe = /%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g;
  function replacerDemuxer(match, flags, width, dotp, precision, type, offset, wholeString) {
    if (type == "%") {
      return "%";
    }
    const value = args.shift();
    if (typeof value == "undefined") {
      throw new Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = value;
    return goog.string.format.demuxes_[type].apply(null, arguments);
  }
  return template.replace(formatRe, replacerDemuxer);
};
goog.string.format.demuxes_ = {};
goog.string.format.demuxes_["s"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  let replacement = value;
  if (isNaN(width) || width == "" || replacement.length >= Number(width)) {
    return replacement;
  }
  if (flags.indexOf("-", 0) > -1) {
    replacement = replacement + goog.string.repeat(" ", Number(width) - replacement.length);
  } else {
    replacement = goog.string.repeat(" ", Number(width) - replacement.length) + replacement;
  }
  return replacement;
};
goog.string.format.demuxes_["f"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  let replacement = value.toString();
  if (!(isNaN(precision) || precision == "")) {
    replacement = parseFloat(value).toFixed(precision);
  }
  let sign;
  if (Number(value) < 0) {
    sign = "-";
  } else if (flags.indexOf("+") >= 0) {
    sign = "+";
  } else if (flags.indexOf(" ") >= 0) {
    sign = " ";
  } else {
    sign = "";
  }
  if (Number(value) >= 0) {
    replacement = sign + replacement;
  }
  if (isNaN(width) || replacement.length >= Number(width)) {
    return replacement;
  }
  replacement = isNaN(precision) ? Math.abs(Number(value)).toString() : Math.abs(Number(value)).toFixed(precision);
  const padCount = Number(width) - replacement.length - sign.length;
  if (flags.indexOf("-", 0) >= 0) {
    replacement = sign + replacement + goog.string.repeat(" ", padCount);
  } else {
    const paddingChar = flags.indexOf("0", 0) >= 0 ? "0" : " ";
    replacement = sign + goog.string.repeat(paddingChar, padCount) + replacement;
  }
  return replacement;
};
goog.string.format.demuxes_["d"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  return goog.string.format.demuxes_["f"](parseInt(value, 10), flags, width, dotp, 0, type, offset, wholeString);
};
goog.string.format.demuxes_["i"] = goog.string.format.demuxes_["d"];
goog.string.format.demuxes_["u"] = goog.string.format.demuxes_["d"];

$CLJS.SHADOW_ENV.setLoaded("goog.string.stringformat.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.Thenable");
  goog.module.declareLegacyNamespace();
  const GoogPromise = goog.requireType("goog.Promise");
  function Thenable() {
  }
  Thenable.prototype.then = function(opt_onFulfilled, opt_onRejected, opt_context) {
  };
  Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
  Thenable.addImplementation = function(ctor) {
    if (COMPILED) {
      ctor.prototype[Thenable.IMPLEMENTED_BY_PROP] = true;
    } else {
      ctor.prototype.$goog_Thenable = true;
    }
  };
  Thenable.isImplementedBy = function(object) {
    if (!object) {
      return false;
    }
    try {
      if (COMPILED) {
        return !!object[Thenable.IMPLEMENTED_BY_PROP];
      }
      return !!object.$goog_Thenable;
    } catch (e) {
      return false;
    }
  };
  exports = Thenable;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.promise.thenable.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.async.FreeList");
  goog.module.declareLegacyNamespace();
  class FreeList {
    constructor(create, reset, limit) {
      this.limit_ = limit;
      this.create_ = create;
      this.reset_ = reset;
      this.occupants_ = 0;
      this.head_ = null;
    }
    get() {
      let item;
      if (this.occupants_ > 0) {
        this.occupants_--;
        item = this.head_;
        this.head_ = item.next;
        item.next = null;
      } else {
        item = this.create_();
      }
      return item;
    }
    put(item) {
      this.reset_(item);
      if (this.occupants_ < this.limit_) {
        this.occupants_++;
        item.next = this.head_;
        this.head_ = item;
      }
    }
    occupants() {
      return this.occupants_;
    }
  }
  exports = FreeList;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.async.freelist.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.async.WorkQueue");
  goog.module.declareLegacyNamespace();
  const FreeList = goog.require("goog.async.FreeList");
  const {assert} = goog.require("goog.asserts");
  class WorkQueue {
    constructor() {
      this.workHead_ = null;
      this.workTail_ = null;
    }
    add(fn, scope) {
      const item = this.getUnusedItem_();
      item.set(fn, scope);
      if (this.workTail_) {
        this.workTail_.next = item;
        this.workTail_ = item;
      } else {
        assert(!this.workHead_);
        this.workHead_ = item;
        this.workTail_ = item;
      }
    }
    remove() {
      let item = null;
      if (this.workHead_) {
        item = this.workHead_;
        this.workHead_ = this.workHead_.next;
        if (!this.workHead_) {
          this.workTail_ = null;
        }
        item.next = null;
      }
      return item;
    }
    returnUnused(item) {
      WorkQueue.freelist_.put(item);
    }
    getUnusedItem_() {
      return WorkQueue.freelist_.get();
    }
  }
  WorkQueue.DEFAULT_MAX_UNUSED = goog.define("goog.async.WorkQueue.DEFAULT_MAX_UNUSED", 100);
  WorkQueue.freelist_ = new FreeList(() => new WorkItem(), item => item.reset(), WorkQueue.DEFAULT_MAX_UNUSED);
  class WorkItem {
    constructor() {
      this.fn = null;
      this.scope = null;
      this.next = null;
    }
    set(fn, scope) {
      this.fn = fn;
      this.scope = scope;
      this.next = null;
    }
    reset() {
      this.fn = null;
      this.scope = null;
      this.next = null;
    }
  }
  exports = WorkQueue;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.async.workqueue.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.debug.asyncStackTag");
  goog.module.declareLegacyNamespace();
  const {assertExists} = goog.require("goog.asserts");
  const createTask = goog.DEBUG && goog.global.console && goog.global.console.createTask ? goog.global.console.createTask.bind(goog.global.console) : undefined;
  const CONSOLE_TASK_SYMBOL = createTask ? Symbol("consoleTask") : undefined;
  function wrap(fn, name = "anonymous") {
    if (!goog.DEBUG || !createTask) {
      return fn;
    }
    if (fn[assertExists(CONSOLE_TASK_SYMBOL)]) {
      return fn;
    }
    const consoleTask = createTask(fn.name || name);
    function wrappedFn(...args) {
      return consoleTask["run"](() => fn.call(this, ...args));
    }
    wrappedFn[assertExists(CONSOLE_TASK_SYMBOL)] = consoleTask;
    return wrappedFn;
  }
  exports = {wrap,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.debug.asyncstacktag.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.async.throwException");
  goog.module.declareLegacyNamespace();
  function throwException(exception) {
    goog.global.setTimeout(() => {
      throw exception;
    }, 0);
  }
  exports = throwException;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.async.throwexception.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.async.run");
  goog.module.declareLegacyNamespace();
  const WorkQueue = goog.require("goog.async.WorkQueue");
  const asyncStackTag = goog.require("goog.debug.asyncStackTag");
  const nextTick = goog.require("goog.async.nextTick");
  const throwException = goog.require("goog.async.throwException");
  goog.ASSUME_NATIVE_PROMISE = goog.define("goog.ASSUME_NATIVE_PROMISE", false);
  let schedule;
  let workQueueScheduled = false;
  let workQueue = new WorkQueue();
  let run = (callback, context = undefined) => {
    if (!schedule) {
      initializeRunner();
    }
    if (!workQueueScheduled) {
      schedule();
      workQueueScheduled = true;
    }
    callback = asyncStackTag.wrap(callback, "goog.async.run");
    workQueue.add(callback, context);
  };
  let initializeRunner = () => {
    if (goog.ASSUME_NATIVE_PROMISE || goog.global.Promise && goog.global.Promise.resolve) {
      const promise = goog.global.Promise.resolve(undefined);
      schedule = () => {
        promise.then(run.processWorkQueue);
      };
    } else {
      schedule = () => {
        nextTick(run.processWorkQueue);
      };
    }
  };
  run.forceNextTick = (realSetTimeout = undefined) => {
    schedule = () => {
      nextTick(run.processWorkQueue);
      if (realSetTimeout) {
        realSetTimeout(run.processWorkQueue);
      }
    };
  };
  if (goog.DEBUG) {
    run.resetQueue = () => {
      workQueueScheduled = false;
      workQueue = new WorkQueue();
    };
    run.resetSchedulerForTest = () => {
      initializeRunner();
    };
  }
  run.processWorkQueue = () => {
    let item = null;
    while (item = workQueue.remove()) {
      try {
        item.fn.call(item.scope);
      } catch (e) {
        throwException(e);
      }
      workQueue.returnUnused(item);
    }
    workQueueScheduled = false;
  };
  exports = run;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.async.run.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.promise.Resolver");
  goog.module.declareLegacyNamespace();
  const GoogPromise = goog.requireType("goog.Promise");
  const Thenable = goog.requireType("goog.Thenable");
  class Resolver {
    constructor() {
      this.promise;
      this.resolve;
      this.reject;
    }
  }
  exports = Resolver;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.promise.resolver.js");

goog.provide("goog.Promise");
goog.require("goog.Thenable");
goog.require("goog.asserts");
goog.require("goog.async.FreeList");
goog.require("goog.async.run");
goog.require("goog.async.throwException");
goog.require("goog.debug.Error");
goog.require("goog.debug.asyncStackTag");
goog.require("goog.functions");
goog.require("goog.promise.Resolver");
goog.Promise = function(resolver, opt_context) {
  this.state_ = goog.Promise.State_.PENDING;
  this.result_ = undefined;
  this.parent_ = null;
  this.callbackEntries_ = null;
  this.callbackEntriesTail_ = null;
  this.executing_ = false;
  if (goog.Promise.UNHANDLED_REJECTION_DELAY > 0) {
    this.unhandledRejectionId_ = 0;
  } else if (goog.Promise.UNHANDLED_REJECTION_DELAY == 0) {
    this.hadUnhandledRejection_ = false;
  }
  if (goog.Promise.LONG_STACK_TRACES) {
    this.stack_ = [];
    this.addStackTrace_(new Error("created"));
    this.currentStep_ = 0;
  }
  if (resolver != goog.functions.UNDEFINED) {
    try {
      var self = this;
      resolver.call(opt_context, function(value) {
        self.resolve_(goog.Promise.State_.FULFILLED, value);
      }, function(reason) {
        if (goog.DEBUG && !(reason instanceof goog.Promise.CancellationError)) {
          try {
            if (reason instanceof Error) {
              throw reason;
            } else {
              throw new Error("Promise rejected.");
            }
          } catch (e) {
          }
        }
        self.resolve_(goog.Promise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(goog.Promise.State_.REJECTED, e);
    }
  }
};
goog.Promise.LONG_STACK_TRACES = goog.define("goog.Promise.LONG_STACK_TRACES", false);
goog.Promise.UNHANDLED_REJECTION_DELAY = goog.define("goog.Promise.UNHANDLED_REJECTION_DELAY", 0);
goog.Promise.State_ = {PENDING:0, BLOCKED:1, FULFILLED:2, REJECTED:3};
goog.Promise.CallbackEntry_ = function() {
  this.child = null;
  this.onFulfilled = null;
  this.onRejected = null;
  this.context = null;
  this.next = null;
  this.always = false;
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
  this.child = null;
  this.onFulfilled = null;
  this.onRejected = null;
  this.context = null;
  this.always = false;
};
goog.Promise.DEFAULT_MAX_UNUSED = goog.define("goog.Promise.DEFAULT_MAX_UNUSED", 100);
goog.Promise.freelist_ = new goog.async.FreeList(function() {
  return new goog.Promise.CallbackEntry_();
}, function(item) {
  item.reset();
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(onFulfilled, onRejected, context) {
  var entry = goog.Promise.freelist_.get();
  entry.onFulfilled = onFulfilled;
  entry.onRejected = onRejected;
  entry.context = context;
  return entry;
};
goog.Promise.returnEntry_ = function(entry) {
  goog.Promise.freelist_.put(entry);
};
goog.Promise.resolve = function(opt_value) {
  if (opt_value instanceof goog.Promise) {
    return opt_value;
  }
  var promise = new goog.Promise(goog.functions.UNDEFINED);
  promise.resolve_(goog.Promise.State_.FULFILLED, opt_value);
  return promise;
};
goog.Promise.reject = function(opt_reason) {
  return new goog.Promise(function(resolve, reject) {
    reject(opt_reason);
  });
};
goog.Promise.resolveThen_ = function(value, onFulfilled, onRejected) {
  var isThenable = goog.Promise.maybeThen_(value, onFulfilled, onRejected, null);
  if (!isThenable) {
    goog.async.run(goog.partial(onFulfilled, value));
  }
};
goog.Promise.race = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    if (!promises.length) {
      resolve(undefined);
    }
    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      goog.Promise.resolveThen_(promise, resolve, reject);
    }
  });
};
goog.Promise.all = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toFulfill = promises.length;
    var values = [];
    if (!toFulfill) {
      resolve(values);
      return;
    }
    var onFulfill = function(index, value) {
      toFulfill--;
      values[index] = value;
      if (toFulfill == 0) {
        resolve(values);
      }
    };
    var onReject = function(reason) {
      reject(reason);
    };
    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      goog.Promise.resolveThen_(promise, goog.partial(onFulfill, i), onReject);
    }
  });
};
goog.Promise.allSettled = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toSettle = promises.length;
    var results = [];
    if (!toSettle) {
      resolve(results);
      return;
    }
    var onSettled = function(index, fulfilled, result) {
      toSettle--;
      results[index] = fulfilled ? {fulfilled:true, value:result} : {fulfilled:false, reason:result};
      if (toSettle == 0) {
        resolve(results);
      }
    };
    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      goog.Promise.resolveThen_(promise, goog.partial(onSettled, i, true), goog.partial(onSettled, i, false));
    }
  });
};
goog.Promise.firstFulfilled = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toReject = promises.length;
    var reasons = [];
    if (!toReject) {
      resolve(undefined);
      return;
    }
    var onFulfill = function(value) {
      resolve(value);
    };
    var onReject = function(index, reason) {
      toReject--;
      reasons[index] = reason;
      if (toReject == 0) {
        reject(reasons);
      }
    };
    for (var i = 0, promise; i < promises.length; i++) {
      promise = promises[i];
      goog.Promise.resolveThen_(promise, onFulfill, goog.partial(onReject, i));
    }
  });
};
goog.Promise.withResolver = function() {
  var resolve, reject;
  var promise = new goog.Promise(function(rs, rj) {
    resolve = rs;
    reject = rj;
  });
  return new goog.Promise.Resolver_(promise, resolve, reject);
};
goog.Promise.prototype.then = function(opt_onFulfilled, opt_onRejected, opt_context) {
  if (opt_onFulfilled != null) {
    goog.asserts.assertFunction(opt_onFulfilled, "opt_onFulfilled should be a function.");
  }
  if (opt_onRejected != null) {
    goog.asserts.assertFunction(opt_onRejected, "opt_onRejected should be a function. Did you pass opt_context " + "as the second argument instead of the third?");
  }
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("then"));
  }
  return this.addChildPromise_(typeof opt_onFulfilled === "function" ? opt_onFulfilled : null, typeof opt_onRejected === "function" ? opt_onRejected : null, opt_context);
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(opt_onFulfilled, opt_onRejected, opt_context) {
  if (opt_onFulfilled != null) {
    goog.asserts.assertFunction(opt_onFulfilled, "opt_onFulfilled should be a function.");
  }
  if (opt_onRejected != null) {
    goog.asserts.assertFunction(opt_onRejected, "opt_onRejected should be a function. Did you pass opt_context " + "as the second argument instead of the third?");
  }
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("then"));
  }
  this.addCallbackEntry_(goog.Promise.getCallbackEntry_(opt_onFulfilled || goog.functions.UNDEFINED, opt_onRejected || null, opt_context));
};
goog.Promise.prototype.thenAlways = function(onSettled, opt_context) {
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("thenAlways"));
  }
  var entry = goog.Promise.getCallbackEntry_(onSettled, onSettled, opt_context);
  entry.always = true;
  this.addCallbackEntry_(entry);
  return this;
};
goog.Promise.prototype.thenCatch = function(onRejected, opt_context) {
  if (goog.Promise.LONG_STACK_TRACES) {
    this.addStackTrace_(new Error("thenCatch"));
  }
  return this.addChildPromise_(null, onRejected, opt_context);
};
goog.Promise.prototype.catch = goog.Promise.prototype.thenCatch;
goog.Promise.prototype.cancel = function(opt_message) {
  if (this.state_ == goog.Promise.State_.PENDING) {
    var err = new goog.Promise.CancellationError(opt_message);
    goog.async.run(function() {
      this.cancelInternal_(err);
    }, this);
  }
};
goog.Promise.prototype.cancelInternal_ = function(err) {
  if (this.state_ == goog.Promise.State_.PENDING) {
    if (this.parent_) {
      this.parent_.cancelChild_(this, err);
      this.parent_ = null;
    } else {
      this.resolve_(goog.Promise.State_.REJECTED, err);
    }
  }
};
goog.Promise.prototype.cancelChild_ = function(childPromise, err) {
  if (!this.callbackEntries_) {
    return;
  }
  var childCount = 0;
  var childEntry = null;
  var beforeChildEntry = null;
  for (var entry = this.callbackEntries_; entry; entry = entry.next) {
    if (!entry.always) {
      childCount++;
      if (entry.child == childPromise) {
        childEntry = entry;
      }
      if (childEntry && childCount > 1) {
        break;
      }
    }
    if (!childEntry) {
      beforeChildEntry = entry;
    }
  }
  if (childEntry) {
    if (this.state_ == goog.Promise.State_.PENDING && childCount == 1) {
      this.cancelInternal_(err);
    } else {
      if (beforeChildEntry) {
        this.removeEntryAfter_(beforeChildEntry);
      } else {
        this.popEntry_();
      }
      this.executeCallback_(childEntry, goog.Promise.State_.REJECTED, err);
    }
  }
};
goog.Promise.prototype.addCallbackEntry_ = function(callbackEntry) {
  if (!this.hasEntry_() && (this.state_ == goog.Promise.State_.FULFILLED || this.state_ == goog.Promise.State_.REJECTED)) {
    this.scheduleCallbacks_();
  }
  this.queueEntry_(callbackEntry);
};
goog.Promise.prototype.addChildPromise_ = function(onFulfilled, onRejected, opt_context) {
  if (onFulfilled) {
    onFulfilled = goog.debug.asyncStackTag.wrap(onFulfilled, "goog.Promise.then");
  }
  if (onRejected) {
    onRejected = goog.debug.asyncStackTag.wrap(onRejected, "goog.Promise.then");
  }
  var callbackEntry = goog.Promise.getCallbackEntry_(null, null, null);
  callbackEntry.child = new goog.Promise(function(resolve, reject) {
    callbackEntry.onFulfilled = onFulfilled ? function(value) {
      try {
        var result = onFulfilled.call(opt_context, value);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } : resolve;
    callbackEntry.onRejected = onRejected ? function(reason) {
      try {
        var result = onRejected.call(opt_context, reason);
        if (result === undefined && reason instanceof goog.Promise.CancellationError) {
          reject(reason);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    } : reject;
  });
  callbackEntry.child.parent_ = this;
  this.addCallbackEntry_(callbackEntry);
  return callbackEntry.child;
};
goog.Promise.prototype.unblockAndFulfill_ = function(value) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.FULFILLED, value);
};
goog.Promise.prototype.unblockAndReject_ = function(reason) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.REJECTED, reason);
};
goog.Promise.prototype.resolve_ = function(state, x) {
  if (this.state_ != goog.Promise.State_.PENDING) {
    return;
  }
  if (this === x) {
    state = goog.Promise.State_.REJECTED;
    x = new TypeError("Promise cannot resolve to itself");
  }
  this.state_ = goog.Promise.State_.BLOCKED;
  var isThenable = goog.Promise.maybeThen_(x, this.unblockAndFulfill_, this.unblockAndReject_, this);
  if (isThenable) {
    return;
  }
  this.result_ = x;
  this.state_ = state;
  this.parent_ = null;
  this.scheduleCallbacks_();
  if (state == goog.Promise.State_.REJECTED && !(x instanceof goog.Promise.CancellationError)) {
    goog.Promise.addUnhandledRejection_(this, x);
  }
};
goog.Promise.maybeThen_ = function(value, onFulfilled, onRejected, context) {
  if (value instanceof goog.Promise) {
    value.thenVoid(onFulfilled, onRejected, context);
    return true;
  } else if (goog.Thenable.isImplementedBy(value)) {
    value = value;
    value.then(onFulfilled, onRejected, context);
    return true;
  } else if (goog.isObject(value)) {
    const thenable = value;
    try {
      var then = thenable.then;
      if (typeof then === "function") {
        goog.Promise.tryThen_(thenable, then, onFulfilled, onRejected, context);
        return true;
      }
    } catch (e) {
      onRejected.call(context, e);
      return true;
    }
  }
  return false;
};
goog.Promise.tryThen_ = function(thenable, then, onFulfilled, onRejected, context) {
  var called = false;
  var resolve = function(value) {
    if (!called) {
      called = true;
      onFulfilled.call(context, value);
    }
  };
  var reject = function(reason) {
    if (!called) {
      called = true;
      onRejected.call(context, reason);
    }
  };
  try {
    then.call(thenable, resolve, reject);
  } catch (e) {
    reject(e);
  }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
  if (!this.executing_) {
    this.executing_ = true;
    goog.async.run(this.executeCallbacks_, this);
  }
};
goog.Promise.prototype.hasEntry_ = function() {
  return !!this.callbackEntries_;
};
goog.Promise.prototype.queueEntry_ = function(entry) {
  goog.asserts.assert(entry.onFulfilled != null);
  if (this.callbackEntriesTail_) {
    this.callbackEntriesTail_.next = entry;
    this.callbackEntriesTail_ = entry;
  } else {
    this.callbackEntries_ = entry;
    this.callbackEntriesTail_ = entry;
  }
};
goog.Promise.prototype.popEntry_ = function() {
  var entry = null;
  if (this.callbackEntries_) {
    entry = this.callbackEntries_;
    this.callbackEntries_ = entry.next;
    entry.next = null;
  }
  if (!this.callbackEntries_) {
    this.callbackEntriesTail_ = null;
  }
  if (entry != null) {
    goog.asserts.assert(entry.onFulfilled != null);
  }
  return entry;
};
goog.Promise.prototype.removeEntryAfter_ = function(previous) {
  goog.asserts.assert(this.callbackEntries_);
  goog.asserts.assert(previous != null);
  if (previous.next == this.callbackEntriesTail_) {
    this.callbackEntriesTail_ = previous;
  }
  previous.next = previous.next.next;
};
goog.Promise.prototype.executeCallbacks_ = function() {
  var entry = null;
  while (entry = this.popEntry_()) {
    if (goog.Promise.LONG_STACK_TRACES) {
      this.currentStep_++;
    }
    this.executeCallback_(entry, this.state_, this.result_);
  }
  this.executing_ = false;
};
goog.Promise.prototype.executeCallback_ = function(callbackEntry, state, result) {
  if (state == goog.Promise.State_.REJECTED && callbackEntry.onRejected && !callbackEntry.always) {
    this.removeUnhandledRejection_();
  }
  if (callbackEntry.child) {
    callbackEntry.child.parent_ = null;
    goog.Promise.invokeCallback_(callbackEntry, state, result);
  } else {
    try {
      callbackEntry.always ? callbackEntry.onFulfilled.call(callbackEntry.context) : goog.Promise.invokeCallback_(callbackEntry, state, result);
    } catch (err) {
      goog.Promise.handleRejection_.call(null, err);
    }
  }
  goog.Promise.returnEntry_(callbackEntry);
};
goog.Promise.invokeCallback_ = function(callbackEntry, state, result) {
  if (state == goog.Promise.State_.FULFILLED) {
    callbackEntry.onFulfilled.call(callbackEntry.context, result);
  } else if (callbackEntry.onRejected) {
    callbackEntry.onRejected.call(callbackEntry.context, result);
  }
};
goog.Promise.prototype.addStackTrace_ = function(err) {
  if (goog.Promise.LONG_STACK_TRACES && typeof err.stack === "string") {
    var trace = err.stack.split("\n", 4)[3];
    var message = err.message;
    message += Array(11 - message.length).join(" ");
    this.stack_.push(message + trace);
  }
};
goog.Promise.prototype.appendLongStack_ = function(err) {
  if (goog.Promise.LONG_STACK_TRACES && err && typeof err.stack === "string" && this.stack_.length) {
    var longTrace = ["Promise trace:"];
    for (var promise = this; promise; promise = promise.parent_) {
      for (var i = this.currentStep_; i >= 0; i--) {
        longTrace.push(promise.stack_[i]);
      }
      longTrace.push("Value: " + "[" + (promise.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] " + "\x3c" + String(promise.result_) + "\x3e");
    }
    err.stack += "\n\n" + longTrace.join("\n");
  }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
  if (goog.Promise.UNHANDLED_REJECTION_DELAY > 0) {
    for (var p = this; p && p.unhandledRejectionId_; p = p.parent_) {
      goog.global.clearTimeout(p.unhandledRejectionId_);
      p.unhandledRejectionId_ = 0;
    }
  } else if (goog.Promise.UNHANDLED_REJECTION_DELAY == 0) {
    for (var p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
      p.hadUnhandledRejection_ = false;
    }
  }
};
goog.Promise.addUnhandledRejection_ = function(promise, reason) {
  if (goog.Promise.UNHANDLED_REJECTION_DELAY > 0) {
    promise.unhandledRejectionId_ = goog.global.setTimeout(function() {
      promise.appendLongStack_(reason);
      goog.Promise.handleRejection_.call(null, reason);
    }, goog.Promise.UNHANDLED_REJECTION_DELAY);
  } else if (goog.Promise.UNHANDLED_REJECTION_DELAY == 0) {
    promise.hadUnhandledRejection_ = true;
    goog.async.run(function() {
      if (promise.hadUnhandledRejection_) {
        promise.appendLongStack_(reason);
        goog.Promise.handleRejection_.call(null, reason);
      }
    });
  }
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(handler) {
  goog.Promise.handleRejection_ = handler;
};
goog.Promise.CancellationError = function(opt_message) {
  goog.Promise.CancellationError.base(this, "constructor", opt_message);
  this.reportErrorToServer = false;
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(promise, resolve, reject) {
  this.promise = promise;
  this.resolve = resolve;
  this.reject = reject;
};

$CLJS.SHADOW_ENV.setLoaded("goog.promise.promise.js");

goog.provide("goog.disposable.IDisposable");
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod;
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod;

$CLJS.SHADOW_ENV.setLoaded("goog.disposable.idisposable.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.dispose");
  goog.module.declareLegacyNamespace();
  function dispose(obj) {
    if (obj && typeof obj.dispose == "function") {
      obj.dispose();
    }
  }
  exports = dispose;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.disposable.dispose.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.disposeAll");
  goog.module.declareLegacyNamespace();
  const dispose = goog.require("goog.dispose");
  function disposeAll(var_args) {
    for (let i = 0, len = arguments.length; i < len; ++i) {
      const disposable = arguments[i];
      if (goog.isArrayLike(disposable)) {
        disposeAll.apply(null, disposable);
      } else {
        dispose(disposable);
      }
    }
  }
  exports = disposeAll;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.disposable.disposeall.js");

goog.provide("goog.Disposable");
goog.require("goog.disposable.IDisposable");
goog.require("goog.dispose");
goog.require("goog.disposeAll");
goog.Disposable = function() {
  this.creationStack;
  if (goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF) {
    if (goog.Disposable.INCLUDE_STACK_ON_CREATION) {
      this.creationStack = (new Error()).stack;
    }
    goog.Disposable.instances_[goog.getUid(this)] = this;
  }
  this.disposed_ = this.disposed_;
  this.onDisposeCallbacks_ = this.onDisposeCallbacks_;
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = goog.define("goog.Disposable.MONITORING_MODE", 0);
goog.Disposable.INCLUDE_STACK_ON_CREATION = goog.define("goog.Disposable.INCLUDE_STACK_ON_CREATION", true);
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var ret = [];
  for (var id in goog.Disposable.instances_) {
    if (goog.Disposable.instances_.hasOwnProperty(id)) {
      ret.push(goog.Disposable.instances_[Number(id)]);
    }
  }
  return ret;
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {};
};
goog.Disposable.prototype.disposed_ = false;
goog.Disposable.prototype.onDisposeCallbacks_;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_;
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if (!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal();
    if (goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF) {
      var uid = goog.getUid(this);
      if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(uid)) {
        throw new Error(this + " did not call the goog.Disposable base " + "constructor or was disposed of after a clearUndisposedObjects " + "call");
      }
      if (goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && this.onDisposeCallbacks_ && this.onDisposeCallbacks_.length > 0) {
        throw new Error(this + " did not empty its onDisposeCallbacks queue. This " + "probably means it overrode dispose() or disposeInternal() " + "without calling the superclass' method.");
      }
      delete goog.Disposable.instances_[uid];
    }
  }
};
goog.Disposable.prototype.registerDisposable = function(disposable) {
  this.addOnDisposeCallback(goog.partial(goog.dispose, disposable));
};
goog.Disposable.prototype.addOnDisposeCallback = function(callback, opt_scope) {
  if (this.disposed_) {
    opt_scope !== undefined ? callback.call(opt_scope) : callback();
    return;
  }
  if (!this.onDisposeCallbacks_) {
    this.onDisposeCallbacks_ = [];
  }
  this.onDisposeCallbacks_.push(opt_scope !== undefined ? goog.bind(callback, opt_scope) : callback);
};
goog.Disposable.prototype.disposeInternal = function() {
  if (this.onDisposeCallbacks_) {
    while (this.onDisposeCallbacks_.length) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};
goog.Disposable.isDisposed = function(obj) {
  if (obj && typeof obj.isDisposed == "function") {
    return obj.isDisposed();
  }
  return false;
};

$CLJS.SHADOW_ENV.setLoaded("goog.disposable.disposable.js");

goog.provide("goog.events.EventId");
goog.events.EventId = function(eventId) {
  this.id = eventId;
};
goog.events.EventId.prototype.toString = function() {
  return this.id;
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.eventid.js");

goog.provide("goog.events.Event");
goog.require("goog.Disposable");
goog.require("goog.events.EventId");
goog.events.Event = function(type, opt_target) {
  this.type = type instanceof goog.events.EventId ? String(type) : type;
  this.target = opt_target;
  this.currentTarget = this.target;
  this.propagationStopped_ = false;
  this.defaultPrevented = false;
};
goog.events.Event.prototype.hasPropagationStopped = function() {
  return this.propagationStopped_;
};
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = true;
};
goog.events.Event.prototype.preventDefault = function() {
  this.defaultPrevented = true;
};
goog.events.Event.stopPropagation = function(e) {
  e.stopPropagation();
};
goog.events.Event.preventDefault = function(e) {
  e.preventDefault();
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.event.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.events.BrowserFeature");
  goog.module.declareLegacyNamespace();
  const purify = fn => {
    return {valueOf:fn}.valueOf();
  };
  exports = {TOUCH_ENABLED:"ontouchstart" in goog.global || !!(goog.global["document"] && document.documentElement && "ontouchstart" in document.documentElement) || !!(goog.global["navigator"] && (goog.global["navigator"]["maxTouchPoints"] || goog.global["navigator"]["msMaxTouchPoints"])), POINTER_EVENTS:"PointerEvent" in goog.global, MSPOINTER_EVENTS:false, PASSIVE_EVENTS:purify(function() {
    if (!goog.global.addEventListener || !Object.defineProperty) {
      return false;
    }
    var passive = false;
    var options = Object.defineProperty({}, "passive", {get:function() {
      passive = true;
    }});
    try {
      goog.global.addEventListener("test", () => {
      }, options);
      goog.global.removeEventListener("test", () => {
      }, options);
    } catch (e) {
    }
    return passive;
  })};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.events.browserfeature.js");

goog.provide("goog.events.eventTypeHelpers");
goog.require("goog.events.BrowserFeature");
goog.require("goog.userAgent");
goog.events.eventTypeHelpers.getVendorPrefixedName = function(eventName) {
  return goog.userAgent.WEBKIT ? "webkit" + eventName : eventName.toLowerCase();
};
goog.events.eventTypeHelpers.getPointerFallbackEventName = function(pointerEventName, msPointerEventName, fallbackEventName) {
  if (goog.events.BrowserFeature.POINTER_EVENTS) {
    return pointerEventName;
  }
  if (goog.events.BrowserFeature.MSPOINTER_EVENTS) {
    return msPointerEventName;
  }
  return fallbackEventName;
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.eventtypehelpers.js");

goog.provide("goog.events.EventType");
goog.require("goog.events.eventTypeHelpers");
goog.require("goog.userAgent");
goog.events.EventType = {CLICK:"click", RIGHTCLICK:"rightclick", DBLCLICK:"dblclick", AUXCLICK:"auxclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", MOUSECANCEL:"mousecancel", SELECTIONCHANGE:"selectionchange", SELECTSTART:"selectstart", WHEEL:"wheel", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:"focusin", FOCUSOUT:"focusout", 
CHANGE:"change", RESET:"reset", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DEVICECHANGE:"devicechange", DEVICEMOTION:"devicemotion", DEVICEORIENTATION:"deviceorientation", 
DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", ORIENTATIONCHANGE:"orientationchange", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", CANPLAY:"canplay", CANPLAYTHROUGH:"canplaythrough", DURATIONCHANGE:"durationchange", EMPTIED:"emptied", ENDED:"ended", LOADEDDATA:"loadeddata", LOADEDMETADATA:"loadedmetadata", PAUSE:"pause", PLAY:"play", PLAYING:"playing", PROGRESS:"progress", RATECHANGE:"ratechange", 
SEEKED:"seeked", SEEKING:"seeking", STALLED:"stalled", SUSPEND:"suspend", TIMEUPDATE:"timeupdate", VOLUMECHANGE:"volumechange", WAITING:"waiting", SOURCEOPEN:"sourceopen", SOURCEENDED:"sourceended", SOURCECLOSED:"sourceclosed", ABORT:"abort", UPDATE:"update", UPDATESTART:"updatestart", UPDATEEND:"updateend", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", 
ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", INSTALL:"install", ACTIVATE:"activate", FETCH:"fetch", FOREIGNFETCH:"foreignfetch", MESSAGEERROR:"messageerror", STATECHANGE:"statechange", UPDATEFOUND:"updatefound", CONTROLLERCHANGE:"controllerchange", ANIMATIONSTART:goog.events.eventTypeHelpers.getVendorPrefixedName("AnimationStart"), ANIMATIONEND:goog.events.eventTypeHelpers.getVendorPrefixedName("AnimationEnd"), ANIMATIONITERATION:goog.events.eventTypeHelpers.getVendorPrefixedName("AnimationIteration"), 
TRANSITIONEND:goog.events.eventTypeHelpers.getVendorPrefixedName("TransitionEnd"), POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", 
MSGESTURETAP:"MSGestureTap", MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXT:"text", TEXTINPUT:goog.userAgent.IE ? "textinput" : "textInput", 
COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", COMPOSITIONEND:"compositionend", BEFOREINPUT:"beforeinput", FULLSCREENCHANGE:"fullscreenchange", WEBKITBEGINFULLSCREEN:"webkitbeginfullscreen", WEBKITENDFULLSCREEN:"webkitendfullscreen", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", 
STORAGE:"storage", DOMSUBTREEMODIFIED:"DOMSubtreeModified", DOMNODEINSERTED:"DOMNodeInserted", DOMNODEREMOVED:"DOMNodeRemoved", DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument", DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument", DOMATTRMODIFIED:"DOMAttrModified", DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified", BEFOREPRINT:"beforeprint", AFTERPRINT:"afterprint", BEFOREINSTALLPROMPT:"beforeinstallprompt", APPINSTALLED:"appinstalled", CANCEL:"cancel", FINISH:"finish", REMOVE:"remove"};

$CLJS.SHADOW_ENV.setLoaded("goog.events.eventtype.js");

goog.provide("goog.events.BrowserEvent");
goog.provide("goog.events.BrowserEvent.MouseButton");
goog.provide("goog.events.BrowserEvent.PointerType");
goog.require("goog.debug");
goog.require("goog.events.Event");
goog.require("goog.events.EventType");
goog.require("goog.reflect");
goog.require("goog.userAgent");
goog.events.BrowserEvent = function(opt_e, opt_currentTarget) {
  goog.events.BrowserEvent.base(this, "constructor", opt_e ? opt_e.type : "");
  this.target = null;
  this.currentTarget = null;
  this.relatedTarget = null;
  this.offsetX = 0;
  this.offsetY = 0;
  this.clientX = 0;
  this.clientY = 0;
  this.screenX = 0;
  this.screenY = 0;
  this.button = 0;
  this.key = "";
  this.keyCode = 0;
  this.charCode = 0;
  this.ctrlKey = false;
  this.altKey = false;
  this.shiftKey = false;
  this.metaKey = false;
  this.state = null;
  this.platformModifierKey = false;
  this.pointerId = 0;
  this.pointerType = "";
  this.event_ = null;
  if (opt_e) {
    this.init(opt_e, opt_currentTarget);
  }
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY = goog.define("goog.events.BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY", false);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2, BACK:3, FORWARD:4,};
goog.events.BrowserEvent.PointerType = {MOUSE:"mouse", PEN:"pen", TOUCH:"touch"};
goog.events.BrowserEvent.IEButtonMap = goog.debug.freeze([1, 4, 2]);
goog.events.BrowserEvent.IE_BUTTON_MAP = goog.events.BrowserEvent.IEButtonMap;
goog.events.BrowserEvent.IE_POINTER_TYPE_MAP = goog.debug.freeze({2:goog.events.BrowserEvent.PointerType.TOUCH, 3:goog.events.BrowserEvent.PointerType.PEN, 4:goog.events.BrowserEvent.PointerType.MOUSE});
goog.events.BrowserEvent.prototype.init = function(e, opt_currentTarget) {
  var type = this.type = e.type;
  var relevantTouch = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  if (relatedTarget) {
    if (goog.userAgent.GECKO) {
      if (!goog.reflect.canAccessProperty(relatedTarget, "nodeName")) {
        relatedTarget = null;
      }
    }
  } else if (type == goog.events.EventType.MOUSEOVER) {
    relatedTarget = e.fromElement;
  } else if (type == goog.events.EventType.MOUSEOUT) {
    relatedTarget = e.toElement;
  }
  this.relatedTarget = relatedTarget;
  if (relevantTouch) {
    this.clientX = relevantTouch.clientX !== undefined ? relevantTouch.clientX : relevantTouch.pageX;
    this.clientY = relevantTouch.clientY !== undefined ? relevantTouch.clientY : relevantTouch.pageY;
    this.screenX = relevantTouch.screenX || 0;
    this.screenY = relevantTouch.screenY || 0;
  } else {
    if (goog.events.BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY) {
      this.offsetX = e.layerX !== undefined ? e.layerX : e.offsetX;
      this.offsetY = e.layerY !== undefined ? e.layerY : e.offsetY;
    } else {
      this.offsetX = goog.userAgent.WEBKIT || e.offsetX !== undefined ? e.offsetX : e.layerX;
      this.offsetY = goog.userAgent.WEBKIT || e.offsetY !== undefined ? e.offsetY : e.layerY;
    }
    this.clientX = e.clientX !== undefined ? e.clientX : e.pageX;
    this.clientY = e.clientY !== undefined ? e.clientY : e.pageY;
    this.screenX = e.screenX || 0;
    this.screenY = e.screenY || 0;
  }
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.key = e.key || "";
  this.charCode = e.charCode || (type == "keypress" ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? e.metaKey : e.ctrlKey;
  this.pointerId = e.pointerId || 0;
  this.pointerType = goog.events.BrowserEvent.getPointerType_(e);
  this.state = e.state;
  this.event_ = e;
  if (e.defaultPrevented) {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  }
};
goog.events.BrowserEvent.prototype.isButton = function(button) {
  return this.event_.button == button;
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.MAC && this.ctrlKey);
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  if (this.event_.stopPropagation) {
    this.event_.stopPropagation();
  } else {
    this.event_.cancelBubble = true;
  }
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var be = this.event_;
  if (!be.preventDefault) {
    be.returnValue = false;
  } else {
    be.preventDefault();
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_;
};
goog.events.BrowserEvent.getPointerType_ = function(e) {
  if (typeof e.pointerType === "string") {
    return e.pointerType;
  }
  return goog.events.BrowserEvent.IE_POINTER_TYPE_MAP[e.pointerType] || "";
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.browserevent.js");

goog.provide("goog.events.Listenable");
goog.requireType("goog.events.EventId");
goog.requireType("goog.events.EventLike");
goog.requireType("goog.events.ListenableKey");
goog.events.Listenable = function() {
};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (Math.random() * 1e6 | 0);
goog.events.Listenable.addImplementation = function(cls) {
  cls.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = true;
};
goog.events.Listenable.isImplementedBy = function(obj) {
  return !!(obj && obj[goog.events.Listenable.IMPLEMENTED_BY_PROP]);
};
goog.events.Listenable.prototype.listen = function(type, listener, opt_useCapture, opt_listenerScope) {
};
goog.events.Listenable.prototype.listenOnce = function(type, listener, opt_useCapture, opt_listenerScope) {
};
goog.events.Listenable.prototype.unlisten = function(type, listener, opt_useCapture, opt_listenerScope) {
};
goog.events.Listenable.prototype.unlistenByKey = function(key) {
};
goog.events.Listenable.prototype.dispatchEvent = function(e) {
};
goog.events.Listenable.prototype.removeAllListeners = function(opt_type) {
};
goog.events.Listenable.prototype.getParentEventTarget = function() {
};
goog.events.Listenable.prototype.fireListeners = function(type, capture, eventObject) {
};
goog.events.Listenable.prototype.getListeners = function(type, capture) {
};
goog.events.Listenable.prototype.getListener = function(type, listener, capture, opt_listenerScope) {
};
goog.events.Listenable.prototype.hasListener = function(opt_type, opt_capture) {
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.listenable.js");

goog.provide("goog.events.ListenableKey");
goog.requireType("goog.events.Listenable");
goog.events.ListenableKey = function() {
};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
  return ++goog.events.ListenableKey.counter_;
};
goog.events.ListenableKey.prototype.src;
goog.events.ListenableKey.prototype.type;
goog.events.ListenableKey.prototype.listener;
goog.events.ListenableKey.prototype.capture;
goog.events.ListenableKey.prototype.handler;
goog.events.ListenableKey.prototype.key;

$CLJS.SHADOW_ENV.setLoaded("goog.events.listenablekey.js");

goog.provide("goog.events.Listener");
goog.require("goog.events.ListenableKey");
goog.requireType("goog.events.Listenable");
goog.events.Listener = function(listener, proxy, src, type, capture, opt_handler) {
  if (goog.events.Listener.ENABLE_MONITORING) {
    this.creationStack = (new Error()).stack;
  }
  this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.key = goog.events.ListenableKey.reserveKey();
  this.callOnce = false;
  this.removed = false;
};
goog.events.Listener.ENABLE_MONITORING = goog.define("goog.events.Listener.ENABLE_MONITORING", false);
goog.events.Listener.prototype.creationStack;
goog.events.Listener.prototype.markAsRemoved = function() {
  this.removed = true;
  this.listener = null;
  this.proxy = null;
  this.src = null;
  this.handler = null;
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.listener.js");

goog.provide("goog.events.ListenerMap");
goog.require("goog.array");
goog.require("goog.events.Listener");
goog.require("goog.object");
goog.requireType("goog.events.EventId");
goog.requireType("goog.events.Listenable");
goog.requireType("goog.events.ListenableKey");
goog.events.ListenerMap = function(src) {
  this.src = src;
  this.listeners = {};
  this.typeCount_ = 0;
};
goog.events.ListenerMap.prototype.getTypeCount = function() {
  return this.typeCount_;
};
goog.events.ListenerMap.prototype.getListenerCount = function() {
  var count = 0;
  for (var type in this.listeners) {
    count += this.listeners[type].length;
  }
  return count;
};
goog.events.ListenerMap.prototype.add = function(type, listener, callOnce, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString();
  var listenerArray = this.listeners[typeStr];
  if (!listenerArray) {
    listenerArray = this.listeners[typeStr] = [];
    this.typeCount_++;
  }
  var listenerObj;
  var index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (index > -1) {
    listenerObj = listenerArray[index];
    if (!callOnce) {
      listenerObj.callOnce = false;
    }
  } else {
    listenerObj = new goog.events.Listener(listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope);
    listenerObj.callOnce = callOnce;
    listenerArray.push(listenerObj);
  }
  return listenerObj;
};
goog.events.ListenerMap.prototype.remove = function(type, listener, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString();
  if (!(typeStr in this.listeners)) {
    return false;
  }
  var listenerArray = this.listeners[typeStr];
  var index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (index > -1) {
    var listenerObj = listenerArray[index];
    listenerObj.markAsRemoved();
    goog.array.removeAt(listenerArray, index);
    if (listenerArray.length == 0) {
      delete this.listeners[typeStr];
      this.typeCount_--;
    }
    return true;
  }
  return false;
};
goog.events.ListenerMap.prototype.removeByKey = function(listener) {
  var type = listener.type;
  if (!(type in this.listeners)) {
    return false;
  }
  var removed = goog.array.remove(this.listeners[type], listener);
  if (removed) {
    listener.markAsRemoved();
    if (this.listeners[type].length == 0) {
      delete this.listeners[type];
      this.typeCount_--;
    }
  }
  return removed;
};
goog.events.ListenerMap.prototype.removeAll = function(opt_type) {
  var typeStr = opt_type && opt_type.toString();
  var count = 0;
  for (var type in this.listeners) {
    if (!typeStr || type == typeStr) {
      var listenerArray = this.listeners[type];
      for (var i = 0; i < listenerArray.length; i++) {
        ++count;
        listenerArray[i].markAsRemoved();
      }
      delete this.listeners[type];
      this.typeCount_--;
    }
  }
  return count;
};
goog.events.ListenerMap.prototype.getListeners = function(type, capture) {
  var listenerArray = this.listeners[type.toString()];
  var rv = [];
  if (listenerArray) {
    for (var i = 0; i < listenerArray.length; ++i) {
      var listenerObj = listenerArray[i];
      if (listenerObj.capture == capture) {
        rv.push(listenerObj);
      }
    }
  }
  return rv;
};
goog.events.ListenerMap.prototype.getListener = function(type, listener, capture, opt_listenerScope) {
  var listenerArray = this.listeners[type.toString()];
  var i = -1;
  if (listenerArray) {
    i = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, capture, opt_listenerScope);
  }
  return i > -1 ? listenerArray[i] : null;
};
goog.events.ListenerMap.prototype.hasListener = function(opt_type, opt_capture) {
  var hasType = opt_type !== undefined;
  var typeStr = hasType ? opt_type.toString() : "";
  var hasCapture = opt_capture !== undefined;
  return goog.object.some(this.listeners, function(listenerArray, type) {
    for (var i = 0; i < listenerArray.length; ++i) {
      if ((!hasType || listenerArray[i].type == typeStr) && (!hasCapture || listenerArray[i].capture == opt_capture)) {
        return true;
      }
    }
    return false;
  });
};
goog.events.ListenerMap.findListenerIndex_ = function(listenerArray, listener, opt_useCapture, opt_listenerScope) {
  for (var i = 0; i < listenerArray.length; ++i) {
    var listenerObj = listenerArray[i];
    if (!listenerObj.removed && listenerObj.listener == listener && listenerObj.capture == !!opt_useCapture && listenerObj.handler == opt_listenerScope) {
      return i;
    }
  }
  return -1;
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.listenermap.js");

goog.provide("goog.events");
goog.provide("goog.events.CaptureSimulationMode");
goog.provide("goog.events.Key");
goog.provide("goog.events.ListenableType");
goog.require("goog.asserts");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.BrowserFeature");
goog.require("goog.events.Listenable");
goog.require("goog.events.ListenerMap");
goog.requireType("goog.debug.ErrorHandler");
goog.requireType("goog.events.EventId");
goog.requireType("goog.events.EventLike");
goog.requireType("goog.events.EventWrapper");
goog.requireType("goog.events.ListenableKey");
goog.requireType("goog.events.Listener");
goog.events.Key;
goog.events.ListenableType;
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (Math.random() * 1e6 | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {OFF_AND_FAIL:0, OFF_AND_SILENT:1, ON:2};
goog.events.CAPTURE_SIMULATION_MODE = goog.define("goog.events.CAPTURE_SIMULATION_MODE", 2);
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(src, type, listener, opt_options, opt_handler) {
  if (opt_options && opt_options.once) {
    return goog.events.listenOnce(src, type, listener, opt_options, opt_handler);
  }
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      goog.events.listen(src, type[i], listener, opt_options, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
    return src.listen(type, listener, capture, opt_handler);
  } else {
    return goog.events.listen_(src, type, listener, false, opt_options, opt_handler);
  }
};
goog.events.listen_ = function(src, type, listener, callOnce, opt_options, opt_handler) {
  if (!type) {
    throw new Error("Invalid event type");
  }
  var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
  var listenerMap = goog.events.getListenerMap_(src);
  if (!listenerMap) {
    src[goog.events.LISTENER_MAP_PROP_] = listenerMap = new goog.events.ListenerMap(src);
  }
  var listenerObj = listenerMap.add(type, listener, callOnce, capture, opt_handler);
  if (listenerObj.proxy) {
    return listenerObj;
  }
  var proxy = goog.events.getProxy();
  listenerObj.proxy = proxy;
  proxy.src = src;
  proxy.listener = listenerObj;
  if (src.addEventListener) {
    if (!goog.events.BrowserFeature.PASSIVE_EVENTS) {
      opt_options = capture;
    }
    if (opt_options === undefined) {
      opt_options = false;
    }
    src.addEventListener(type.toString(), proxy, opt_options);
  } else if (src.attachEvent) {
    src.attachEvent(goog.events.getOnString_(type.toString()), proxy);
  } else if (src.addListener && src.removeListener) {
    goog.asserts.assert(type === "change", "MediaQueryList only has a change event");
    src.addListener(proxy);
  } else {
    throw new Error("addEventListener and attachEvent are unavailable.");
  }
  goog.events.listenerCountEstimate_++;
  return listenerObj;
};
goog.events.getProxy = function() {
  const proxyCallbackFunction = goog.events.handleBrowserEvent_;
  const f = function(eventObject) {
    return proxyCallbackFunction.call(f.src, f.listener, eventObject);
  };
  return f;
};
goog.events.listenOnce = function(src, type, listener, opt_options, opt_handler) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      goog.events.listenOnce(src, type[i], listener, opt_options, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
    return src.listenOnce(type, listener, capture, opt_handler);
  } else {
    return goog.events.listen_(src, type, listener, true, opt_options, opt_handler);
  }
};
goog.events.listenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler);
};
goog.events.unlisten = function(src, type, listener, opt_options, opt_handler) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      goog.events.unlisten(src, type[i], listener, opt_options, opt_handler);
    }
    return null;
  }
  var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlisten(type, listener, capture, opt_handler);
  }
  if (!src) {
    return false;
  }
  var listenerMap = goog.events.getListenerMap_(src);
  if (listenerMap) {
    var listenerObj = listenerMap.getListener(type, listener, capture, opt_handler);
    if (listenerObj) {
      return goog.events.unlistenByKey(listenerObj);
    }
  }
  return false;
};
goog.events.unlistenByKey = function(key) {
  if (typeof key === "number") {
    return false;
  }
  var listener = key;
  if (!listener || listener.removed) {
    return false;
  }
  var src = listener.src;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlistenByKey(listener);
  }
  var type = listener.type;
  var proxy = listener.proxy;
  if (src.removeEventListener) {
    src.removeEventListener(type, proxy, listener.capture);
  } else if (src.detachEvent) {
    src.detachEvent(goog.events.getOnString_(type), proxy);
  } else if (src.addListener && src.removeListener) {
    src.removeListener(proxy);
  }
  goog.events.listenerCountEstimate_--;
  var listenerMap = goog.events.getListenerMap_(src);
  if (listenerMap) {
    listenerMap.removeByKey(listener);
    if (listenerMap.getTypeCount() == 0) {
      listenerMap.src = null;
      src[goog.events.LISTENER_MAP_PROP_] = null;
    }
  } else {
    listener.markAsRemoved();
  }
  return true;
};
goog.events.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler);
};
goog.events.removeAll = function(obj, opt_type) {
  if (!obj) {
    return 0;
  }
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.removeAllListeners(opt_type);
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  if (!listenerMap) {
    return 0;
  }
  var count = 0;
  var typeStr = opt_type && opt_type.toString();
  for (var type in listenerMap.listeners) {
    if (!typeStr || type == typeStr) {
      var listeners = listenerMap.listeners[type].concat();
      for (var i = 0; i < listeners.length; ++i) {
        if (goog.events.unlistenByKey(listeners[i])) {
          ++count;
        }
      }
    }
  }
  return count;
};
goog.events.getListeners = function(obj, type, capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.getListeners(type, capture);
  } else {
    if (!obj) {
      return [];
    }
    var listenerMap = goog.events.getListenerMap_(obj);
    return listenerMap ? listenerMap.getListeners(type, capture) : [];
  }
};
goog.events.getListener = function(src, type, listener, opt_capt, opt_handler) {
  type = type;
  listener = goog.events.wrapListener(listener);
  var capture = !!opt_capt;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.getListener(type, listener, capture, opt_handler);
  }
  if (!src) {
    return null;
  }
  var listenerMap = goog.events.getListenerMap_(src);
  if (listenerMap) {
    return listenerMap.getListener(type, listener, capture, opt_handler);
  }
  return null;
};
goog.events.hasListener = function(obj, opt_type, opt_capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.hasListener(opt_type, opt_capture);
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  return !!listenerMap && listenerMap.hasListener(opt_type, opt_capture);
};
goog.events.expose = function(e) {
  var str = [];
  for (var key in e) {
    if (e[key] && e[key].id) {
      str.push(key + " \x3d " + e[key] + " (" + e[key].id + ")");
    } else {
      str.push(key + " \x3d " + e[key]);
    }
  }
  return str.join("\n");
};
goog.events.getOnString_ = function(type) {
  if (type in goog.events.onStringMap_) {
    return goog.events.onStringMap_[type];
  }
  return goog.events.onStringMap_[type] = goog.events.onString_ + type;
};
goog.events.fireListeners = function(obj, type, capture, eventObject) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.fireListeners(type, capture, eventObject);
  }
  return goog.events.fireListeners_(obj, type, capture, eventObject);
};
goog.events.fireListeners_ = function(obj, type, capture, eventObject) {
  var retval = true;
  var listenerMap = goog.events.getListenerMap_(obj);
  if (listenerMap) {
    var listenerArray = listenerMap.listeners[type.toString()];
    if (listenerArray) {
      listenerArray = listenerArray.concat();
      for (var i = 0; i < listenerArray.length; i++) {
        var listener = listenerArray[i];
        if (listener && listener.capture == capture && !listener.removed) {
          var result = goog.events.fireListener(listener, eventObject);
          retval = retval && result !== false;
        }
      }
    }
  }
  return retval;
};
goog.events.fireListener = function(listener, eventObject) {
  var listenerFn = listener.listener;
  var listenerHandler = listener.handler || listener.src;
  if (listener.callOnce) {
    goog.events.unlistenByKey(listener);
  }
  return listenerFn.call(listenerHandler, eventObject);
};
goog.events.getTotalListenerCount = function() {
  return goog.events.listenerCountEstimate_;
};
goog.events.dispatchEvent = function(src, e) {
  goog.asserts.assert(goog.events.Listenable.isImplementedBy(src), "Can not use goog.events.dispatchEvent with " + "non-goog.events.Listenable instance.");
  return src.dispatchEvent(e);
};
goog.events.protectBrowserEventEntryPoint = function(errorHandler) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_);
};
goog.events.handleBrowserEvent_ = function(listener, opt_evt) {
  if (listener.removed) {
    return true;
  }
  return goog.events.fireListener(listener, new goog.events.BrowserEvent(opt_evt, this));
};
goog.events.markIeEvent_ = function(e) {
  var useReturnValue = false;
  if (e.keyCode == 0) {
    try {
      e.keyCode = -1;
      return;
    } catch (ex) {
      useReturnValue = true;
    }
  }
  if (useReturnValue || e.returnValue == undefined) {
    e.returnValue = true;
  }
};
goog.events.isMarkedIeEvent_ = function(e) {
  return e.keyCode < 0 || e.returnValue != undefined;
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++;
};
goog.events.getListenerMap_ = function(src) {
  var listenerMap = src[goog.events.LISTENER_MAP_PROP_];
  return listenerMap instanceof goog.events.ListenerMap ? listenerMap : null;
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (Math.random() * 1e9 >>> 0);
goog.events.wrapListener = function(listener) {
  goog.asserts.assert(listener, "Listener can not be null.");
  if (typeof listener === "function") {
    return listener;
  }
  goog.asserts.assert(listener.handleEvent, "An object listener must have handleEvent method.");
  if (!listener[goog.events.LISTENER_WRAPPER_PROP_]) {
    listener[goog.events.LISTENER_WRAPPER_PROP_] = function(e) {
      return listener.handleEvent(e);
    };
  }
  return listener[goog.events.LISTENER_WRAPPER_PROP_];
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.events.handleBrowserEvent_ = transformer(goog.events.handleBrowserEvent_);
});

$CLJS.SHADOW_ENV.setLoaded("goog.events.events.js");

goog.provide("goog.events.EventTarget");
goog.require("goog.Disposable");
goog.require("goog.asserts");
goog.require("goog.events");
goog.require("goog.events.Event");
goog.require("goog.events.Listenable");
goog.require("goog.events.ListenerMap");
goog.require("goog.object");
goog.requireType("goog.events.EventId");
goog.requireType("goog.events.EventLike");
goog.requireType("goog.events.ListenableKey");
goog.events.EventTarget = function() {
  goog.Disposable.call(this);
  this.eventTargetListeners_ = new goog.events.ListenerMap(this);
  this.actualEventTarget_ = this;
  this.parentEventTarget_ = null;
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1000;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_;
};
goog.events.EventTarget.prototype.setParentEventTarget = function(parent) {
  this.parentEventTarget_ = parent;
};
goog.events.EventTarget.prototype.addEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.removeEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.dispatchEvent = function(e) {
  this.assertInitialized_();
  var ancestorsTree, ancestor = this.getParentEventTarget();
  if (ancestor) {
    ancestorsTree = [];
    var ancestorCount = 1;
    for (; ancestor; ancestor = ancestor.getParentEventTarget()) {
      ancestorsTree.push(ancestor);
      goog.asserts.assert(++ancestorCount < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop");
    }
  }
  return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, e, ancestorsTree);
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  this.removeAllListeners();
  this.parentEventTarget_ = null;
};
goog.events.EventTarget.prototype.listen = function(type, listener, opt_useCapture, opt_listenerScope) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(String(type), listener, false, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.listenOnce = function(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.add(String(type), listener, true, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlisten = function(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.remove(String(type), listener, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlistenByKey = function(key) {
  return this.eventTargetListeners_.removeByKey(key);
};
goog.events.EventTarget.prototype.removeAllListeners = function(opt_type) {
  if (!this.eventTargetListeners_) {
    return 0;
  }
  return this.eventTargetListeners_.removeAll(opt_type);
};
goog.events.EventTarget.prototype.fireListeners = function(type, capture, eventObject) {
  var listenerArray = this.eventTargetListeners_.listeners[String(type)];
  if (!listenerArray) {
    return true;
  }
  listenerArray = listenerArray.concat();
  var rv = true;
  for (var i = 0; i < listenerArray.length; ++i) {
    var listener = listenerArray[i];
    if (listener && !listener.removed && listener.capture == capture) {
      var listenerFn = listener.listener;
      var listenerHandler = listener.handler || listener.src;
      if (listener.callOnce) {
        this.unlistenByKey(listener);
      }
      rv = listenerFn.call(listenerHandler, eventObject) !== false && rv;
    }
  }
  return rv && !eventObject.defaultPrevented;
};
goog.events.EventTarget.prototype.getListeners = function(type, capture) {
  return this.eventTargetListeners_.getListeners(String(type), capture);
};
goog.events.EventTarget.prototype.getListener = function(type, listener, capture, opt_listenerScope) {
  return this.eventTargetListeners_.getListener(String(type), listener, capture, opt_listenerScope);
};
goog.events.EventTarget.prototype.hasListener = function(opt_type, opt_capture) {
  var id = opt_type !== undefined ? String(opt_type) : undefined;
  return this.eventTargetListeners_.hasListener(id, opt_capture);
};
goog.events.EventTarget.prototype.setTargetForTesting = function(target) {
  this.actualEventTarget_ = target;
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
  goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass " + "(goog.events.EventTarget) constructor?");
};
goog.events.EventTarget.dispatchEventInternal_ = function(target, e, opt_ancestorsTree) {
  var type = e.type || e;
  if (typeof e === "string") {
    e = new goog.events.Event(e, target);
  } else if (!(e instanceof goog.events.Event)) {
    var oldEvent = e;
    e = new goog.events.Event(type, target);
    goog.object.extend(e, oldEvent);
  } else {
    e.target = e.target || target;
  }
  var rv = true, currentTarget;
  if (opt_ancestorsTree) {
    for (var i = opt_ancestorsTree.length - 1; !e.hasPropagationStopped() && i >= 0; i--) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i];
      rv = currentTarget.fireListeners(type, true, e) && rv;
    }
  }
  if (!e.hasPropagationStopped()) {
    currentTarget = e.currentTarget = target;
    rv = currentTarget.fireListeners(type, true, e) && rv;
    if (!e.hasPropagationStopped()) {
      rv = currentTarget.fireListeners(type, false, e) && rv;
    }
  }
  if (opt_ancestorsTree) {
    for (i = 0; !e.hasPropagationStopped() && i < opt_ancestorsTree.length; i++) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i];
      rv = currentTarget.fireListeners(type, false, e) && rv;
    }
  }
  return rv;
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.eventtarget.js");

goog.provide("goog.Timer");
goog.require("goog.Promise");
goog.require("goog.events.EventTarget");
goog.requireType("goog.Thenable");
goog.Timer = function(opt_interval, opt_timerObject) {
  goog.events.EventTarget.call(this);
  this.interval_ = opt_interval || 1;
  this.timerObject_ = opt_timerObject || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now();
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.INVALID_TIMEOUT_ID_ = -1;
goog.Timer.prototype.enabled = false;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_;
};
goog.Timer.prototype.setInterval = function(interval) {
  this.interval_ = interval;
  if (this.timer_ && this.enabled) {
    this.stop();
    this.start();
  } else if (this.timer_) {
    this.stop();
  }
};
goog.Timer.prototype.tick_ = function() {
  if (this.enabled) {
    var elapsed = goog.now() - this.last_;
    if (elapsed > 0 && elapsed < this.interval_ * goog.Timer.intervalScale) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - elapsed);
      return;
    }
    if (this.timer_) {
      this.timerObject_.clearTimeout(this.timer_);
      this.timer_ = null;
    }
    this.dispatchTick();
    if (this.enabled) {
      this.stop();
      this.start();
    }
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK);
};
goog.Timer.prototype.start = function() {
  this.enabled = true;
  if (!this.timer_) {
    this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
    this.last_ = goog.now();
  }
};
goog.Timer.prototype.stop = function() {
  this.enabled = false;
  if (this.timer_) {
    this.timerObject_.clearTimeout(this.timer_);
    this.timer_ = null;
  }
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_;
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(listener, opt_delay, opt_handler) {
  if (typeof listener === "function") {
    if (opt_handler) {
      listener = goog.bind(listener, opt_handler);
    }
  } else if (listener && typeof listener.handleEvent == "function") {
    listener = goog.bind(listener.handleEvent, listener);
  } else {
    throw new Error("Invalid listener argument");
  }
  if (Number(opt_delay) > goog.Timer.MAX_TIMEOUT_) {
    return goog.Timer.INVALID_TIMEOUT_ID_;
  } else {
    return goog.Timer.defaultTimerObject.setTimeout(listener, opt_delay || 0);
  }
};
goog.Timer.clear = function(timerId) {
  goog.Timer.defaultTimerObject.clearTimeout(timerId);
};
goog.Timer.promise = function(delay, opt_result) {
  var timerKey = null;
  return (new goog.Promise(function(resolve, reject) {
    timerKey = goog.Timer.callOnce(function() {
      resolve(opt_result);
    }, delay);
    if (timerKey == goog.Timer.INVALID_TIMEOUT_ID_) {
      reject(new Error("Failed to schedule timer."));
    }
  })).thenCatch(function(error) {
    goog.Timer.clear(timerKey);
    throw error;
  });
};

$CLJS.SHADOW_ENV.setLoaded("goog.timer.timer.js");

goog.provide("goog.json");
goog.provide("goog.json.Replacer");
goog.provide("goog.json.Reviver");
goog.provide("goog.json.Serializer");
goog.json.USE_NATIVE_JSON = goog.define("goog.json.USE_NATIVE_JSON", false);
goog.json.isValid = function(s) {
  if (/^\s*$/.test(s)) {
    return false;
  }
  const backslashesRe = /\\["\\\/bfnrtu]/g;
  const simpleValuesRe = /(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g;
  const openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g;
  const remainderRe = /^[\],:{}\s\u2028\u2029]*$/;
  return remainderRe.test(s.replace(backslashesRe, "@").replace(simpleValuesRe, "]").replace(openBracketsRe, ""));
};
goog.json.errorLogger_ = () => {
};
goog.json.setErrorLogger = function(errorLogger) {
  goog.json.errorLogger_ = errorLogger;
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global["JSON"]["parse"] : function(s) {
  let error;
  try {
    return goog.global["JSON"]["parse"](s);
  } catch (ex) {
    error = ex;
  }
  const o = String(s);
  if (goog.json.isValid(o)) {
    try {
      const result = eval("(" + o + ")");
      if (error) {
        goog.json.errorLogger_("Invalid JSON: " + o, error);
      }
      return result;
    } catch (ex) {
    }
  }
  throw new Error("Invalid JSON string: " + o);
};
goog.json.Replacer;
goog.json.Reviver;
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global["JSON"]["stringify"] : function(object, opt_replacer) {
  return (new goog.json.Serializer(opt_replacer)).serialize(object);
};
goog.json.Serializer = function(opt_replacer) {
  this.replacer_ = opt_replacer;
};
goog.json.Serializer.prototype.serialize = function(object) {
  const sb = [];
  this.serializeInternal(object, sb);
  return sb.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(object, sb) {
  if (object == null) {
    sb.push("null");
    return;
  }
  if (typeof object == "object") {
    if (Array.isArray(object)) {
      this.serializeArray(object, sb);
      return;
    } else if (object instanceof String || object instanceof Number || object instanceof Boolean) {
      object = object.valueOf();
    } else {
      this.serializeObject_(object, sb);
      return;
    }
  }
  switch(typeof object) {
    case "string":
      this.serializeString_(object, sb);
      break;
    case "number":
      this.serializeNumber_(object, sb);
      break;
    case "boolean":
      sb.push(String(object));
      break;
    case "function":
      sb.push("null");
      break;
    default:
      throw new Error("Unknown type: " + typeof object);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\v":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("￿") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    let rv = goog.json.Serializer.charToJsonCharCache_[c];
    if (!rv) {
      rv = "\\u" + (c.charCodeAt(0) | 65536).toString(16).slice(1);
      goog.json.Serializer.charToJsonCharCache_[c] = rv;
    }
    return rv;
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? String(n) : "null");
};
goog.json.Serializer.prototype.serializeArray = function(arr, sb) {
  const l = arr.length;
  sb.push("[");
  let sep = "";
  for (let i = 0; i < l; i++) {
    sb.push(sep);
    const value = arr[i];
    this.serializeInternal(this.replacer_ ? this.replacer_.call(arr, String(i), value) : value, sb);
    sep = ",";
  }
  sb.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(obj, sb) {
  sb.push("{");
  let sep = "";
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value != "function") {
        sb.push(sep);
        this.serializeString_(key, sb);
        sb.push(":");
        this.serializeInternal(this.replacer_ ? this.replacer_.call(obj, key, value) : value, sb);
        sep = ",";
      }
    }
  }
  sb.push("}");
};

$CLJS.SHADOW_ENV.setLoaded("goog.json.json.js");

goog.provide("goog.json.hybrid");
goog.require("goog.asserts");
goog.require("goog.json");
goog.json.hybrid.stringify = goog.json.USE_NATIVE_JSON ? goog.global["JSON"]["stringify"] : function(obj) {
  if (goog.global.JSON) {
    try {
      return goog.global.JSON.stringify(obj);
    } catch (e) {
    }
  }
  return goog.json.serialize(obj);
};
goog.json.hybrid.parse_ = function(jsonString, fallbackParser) {
  if (goog.global.JSON) {
    try {
      var obj = goog.global.JSON.parse(jsonString);
      goog.asserts.assert(typeof obj == "object");
      return obj;
    } catch (e) {
    }
  }
  return fallbackParser(jsonString);
};
goog.json.hybrid.parse = goog.json.USE_NATIVE_JSON ? goog.global["JSON"]["parse"] : function(jsonString) {
  return goog.json.hybrid.parse_(jsonString, goog.json.parse);
};

$CLJS.SHADOW_ENV.setLoaded("goog.json.hybrid.js");

goog.provide("goog.log");
goog.provide("goog.log.Level");
goog.provide("goog.log.LogBuffer");
goog.provide("goog.log.LogRecord");
goog.provide("goog.log.Logger");
goog.require("goog.asserts");
goog.require("goog.debug");
goog.log.Loggable;
goog.log.ENABLED = goog.define("goog.log.ENABLED", goog.debug.LOGGING_ENABLED);
goog.log.ROOT_LOGGER_NAME = "";
goog.log.Level = class Level {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  toString() {
    return this.name;
  }
};
goog.log.Level.OFF = new goog.log.Level("OFF", Infinity);
goog.log.Level.SHOUT = new goog.log.Level("SHOUT", 1200);
goog.log.Level.SEVERE = new goog.log.Level("SEVERE", 1000);
goog.log.Level.WARNING = new goog.log.Level("WARNING", 900);
goog.log.Level.INFO = new goog.log.Level("INFO", 800);
goog.log.Level.CONFIG = new goog.log.Level("CONFIG", 700);
goog.log.Level.FINE = new goog.log.Level("FINE", 500);
goog.log.Level.FINER = new goog.log.Level("FINER", 400);
goog.log.Level.FINEST = new goog.log.Level("FINEST", 300);
goog.log.Level.ALL = new goog.log.Level("ALL", 0);
goog.log.Level.PREDEFINED_LEVELS = [goog.log.Level.OFF, goog.log.Level.SHOUT, goog.log.Level.SEVERE, goog.log.Level.WARNING, goog.log.Level.INFO, goog.log.Level.CONFIG, goog.log.Level.FINE, goog.log.Level.FINER, goog.log.Level.FINEST, goog.log.Level.ALL];
goog.log.Level.predefinedLevelsCache_ = null;
goog.log.Level.createPredefinedLevelsCache_ = function() {
  goog.log.Level.predefinedLevelsCache_ = {};
  for (let i = 0, level; level = goog.log.Level.PREDEFINED_LEVELS[i]; i++) {
    goog.log.Level.predefinedLevelsCache_[level.value] = level;
    goog.log.Level.predefinedLevelsCache_[level.name] = level;
  }
};
goog.log.Level.getPredefinedLevel = function(name) {
  if (!goog.log.Level.predefinedLevelsCache_) {
    goog.log.Level.createPredefinedLevelsCache_();
  }
  return goog.log.Level.predefinedLevelsCache_[name] || null;
};
goog.log.Level.getPredefinedLevelByValue = function(value) {
  if (!goog.log.Level.predefinedLevelsCache_) {
    goog.log.Level.createPredefinedLevelsCache_();
  }
  if (value in goog.log.Level.predefinedLevelsCache_) {
    return goog.log.Level.predefinedLevelsCache_[value];
  }
  for (let i = 0; i < goog.log.Level.PREDEFINED_LEVELS.length; ++i) {
    let level = goog.log.Level.PREDEFINED_LEVELS[i];
    if (level.value <= value) {
      return level;
    }
  }
  return null;
};
goog.log.Logger = class Logger {
  getName() {
  }
};
goog.log.Logger.Level = goog.log.Level;
goog.log.LogBuffer = class LogBuffer {
  constructor(capacity) {
    this.capacity_ = typeof capacity === "number" ? capacity : goog.log.LogBuffer.CAPACITY;
    this.buffer_;
    this.curIndex_;
    this.isFull_;
    this.clear();
  }
  addRecord(level, msg, loggerName) {
    if (!this.isBufferingEnabled()) {
      return new goog.log.LogRecord(level, msg, loggerName);
    }
    const curIndex = (this.curIndex_ + 1) % this.capacity_;
    this.curIndex_ = curIndex;
    if (this.isFull_) {
      const ret = this.buffer_[curIndex];
      ret.reset(level, msg, loggerName);
      return ret;
    }
    this.isFull_ = curIndex == this.capacity_ - 1;
    return this.buffer_[curIndex] = new goog.log.LogRecord(level, msg, loggerName);
  }
  forEachRecord(func) {
    const buffer = this.buffer_;
    if (!buffer[0]) {
      return;
    }
    const curIndex = this.curIndex_;
    let i = this.isFull_ ? curIndex : -1;
    do {
      i = (i + 1) % this.capacity_;
      func(buffer[i]);
    } while (i !== curIndex);
  }
  isBufferingEnabled() {
    return this.capacity_ > 0;
  }
  isFull() {
    return this.isFull_;
  }
  clear() {
    this.buffer_ = new Array(this.capacity_);
    this.curIndex_ = -1;
    this.isFull_ = false;
  }
};
goog.log.LogBuffer.instance_;
goog.log.LogBuffer.CAPACITY = goog.define("goog.debug.LogBuffer.CAPACITY", 0);
goog.log.LogBuffer.getInstance = function() {
  if (!goog.log.LogBuffer.instance_) {
    goog.log.LogBuffer.instance_ = new goog.log.LogBuffer(goog.log.LogBuffer.CAPACITY);
  }
  return goog.log.LogBuffer.instance_;
};
goog.log.LogBuffer.isBufferingEnabled = function() {
  return goog.log.LogBuffer.getInstance().isBufferingEnabled();
};
goog.log.LogRecord = class LogRecord {
  constructor(level, msg, loggerName, time, sequenceNumber) {
    this.level_;
    this.loggerName_;
    this.msg_;
    this.time_;
    this.sequenceNumber_;
    this.exception_ = undefined;
    this.reset(level || goog.log.Level.OFF, msg, loggerName, time, sequenceNumber);
  }
  reset(level, msg, loggerName, time, sequenceNumber) {
    this.time_ = time || goog.now();
    this.level_ = level;
    this.msg_ = msg;
    this.loggerName_ = loggerName;
    this.exception_ = undefined;
    this.sequenceNumber_ = typeof sequenceNumber === "number" ? sequenceNumber : goog.log.LogRecord.nextSequenceNumber_;
  }
  getLoggerName() {
    return this.loggerName_;
  }
  setLoggerName(name) {
    this.loggerName_ = name;
  }
  getException() {
    return this.exception_;
  }
  setException(exception) {
    this.exception_ = exception;
  }
  getLevel() {
    return this.level_;
  }
  setLevel(level) {
    this.level_ = level;
  }
  getMessage() {
    return this.msg_;
  }
  setMessage(msg) {
    this.msg_ = msg;
  }
  getMillis() {
    return this.time_;
  }
  setMillis(time) {
    this.time_ = time;
  }
  getSequenceNumber() {
    return this.sequenceNumber_;
  }
};
goog.log.LogRecord.nextSequenceNumber_ = 0;
goog.log.LogRecordHandler;
goog.log.LogRegistryEntry_ = class LogRegistryEntry_ {
  constructor(name, parent = null) {
    this.level = null;
    this.handlers = [];
    this.parent = parent || null;
    this.children = [];
    this.logger = {getName:() => name};
  }
  getEffectiveLevel() {
    if (this.level) {
      return this.level;
    } else if (this.parent) {
      return this.parent.getEffectiveLevel();
    }
    goog.asserts.fail("Root logger has no level set.");
    return goog.log.Level.OFF;
  }
  publish(logRecord) {
    let target = this;
    while (target) {
      target.handlers.forEach(handler => {
        handler(logRecord);
      });
      target = target.parent;
    }
  }
};
goog.log.LogRegistry_ = class LogRegistry_ {
  constructor() {
    this.entries = {};
    const rootLogRegistryEntry = new goog.log.LogRegistryEntry_(goog.log.ROOT_LOGGER_NAME);
    rootLogRegistryEntry.level = goog.log.Level.CONFIG;
    this.entries[goog.log.ROOT_LOGGER_NAME] = rootLogRegistryEntry;
  }
  getLogRegistryEntry(name, level) {
    const entry = this.entries[name];
    if (entry) {
      if (level !== undefined) {
        entry.level = level;
      }
      return entry;
    } else {
      const lastDotIndex = name.lastIndexOf(".");
      const parentName = name.slice(0, Math.max(lastDotIndex, 0));
      const parentLogRegistryEntry = this.getLogRegistryEntry(parentName);
      const logRegistryEntry = new goog.log.LogRegistryEntry_(name, parentLogRegistryEntry);
      this.entries[name] = logRegistryEntry;
      parentLogRegistryEntry.children.push(logRegistryEntry);
      if (level !== undefined) {
        logRegistryEntry.level = level;
      }
      return logRegistryEntry;
    }
  }
  getAllLoggers() {
    return Object.keys(this.entries).map(loggerName => this.entries[loggerName].logger);
  }
};
goog.log.LogRegistry_.getInstance = function() {
  if (!goog.log.LogRegistry_.instance_) {
    goog.log.LogRegistry_.instance_ = new goog.log.LogRegistry_();
  }
  return goog.log.LogRegistry_.instance_;
};
goog.log.LogRegistry_.instance_;
goog.log.getLogger = function(name, level) {
  if (goog.log.ENABLED) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(name, level);
    return loggerEntry.logger;
  } else {
    return null;
  }
};
goog.log.getRootLogger = function() {
  if (goog.log.ENABLED) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(goog.log.ROOT_LOGGER_NAME);
    return loggerEntry.logger;
  } else {
    return null;
  }
};
goog.log.addHandler = function(logger, handler) {
  if (goog.log.ENABLED && logger) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    loggerEntry.handlers.push(handler);
  }
};
goog.log.removeHandler = function(logger, handler) {
  if (goog.log.ENABLED && logger) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    const indexOfHandler = loggerEntry.handlers.indexOf(handler);
    if (indexOfHandler !== -1) {
      loggerEntry.handlers.splice(indexOfHandler, 1);
      return true;
    }
  }
  return false;
};
goog.log.setLevel = function(logger, level) {
  if (goog.log.ENABLED && logger) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    loggerEntry.level = level;
  }
};
goog.log.getLevel = function(logger) {
  if (goog.log.ENABLED && logger) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    return loggerEntry.level;
  }
  return null;
};
goog.log.getEffectiveLevel = function(logger) {
  if (goog.log.ENABLED && logger) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    return loggerEntry.getEffectiveLevel();
  }
  return goog.log.Level.OFF;
};
goog.log.isLoggable = function(logger, level) {
  if (goog.log.ENABLED && logger && level) {
    return level.value >= goog.log.getEffectiveLevel(logger).value;
  }
  return false;
};
goog.log.getAllLoggers = function() {
  if (goog.log.ENABLED) {
    return goog.log.LogRegistry_.getInstance().getAllLoggers();
  }
  return [];
};
goog.log.getLogRecord = function(logger, level, msg, exception = undefined) {
  const logRecord = goog.log.LogBuffer.getInstance().addRecord(level || goog.log.Level.OFF, msg, logger.getName());
  logRecord.setException(exception);
  return logRecord;
};
goog.log.publishLogRecord = function(logger, logRecord) {
  if (goog.log.ENABLED && logger && goog.log.isLoggable(logger, logRecord.getLevel())) {
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    loggerEntry.publish(logRecord);
  }
};
goog.log.log = function(logger, level, msg, exception = undefined) {
  if (goog.log.ENABLED && logger && goog.log.isLoggable(logger, level)) {
    level = level || goog.log.Level.OFF;
    const loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    if (typeof msg === "function") {
      msg = msg();
    }
    const logRecord = goog.log.LogBuffer.getInstance().addRecord(level, msg, logger.getName());
    logRecord.setException(exception);
    loggerEntry.publish(logRecord);
  }
};
goog.log.error = function(logger, msg, exception = undefined) {
  if (goog.log.ENABLED && logger) {
    goog.log.log(logger, goog.log.Level.SEVERE, msg, exception);
  }
};
goog.log.warning = function(logger, msg, exception = undefined) {
  if (goog.log.ENABLED && logger) {
    goog.log.log(logger, goog.log.Level.WARNING, msg, exception);
  }
};
goog.log.info = function(logger, msg, exception = undefined) {
  if (goog.log.ENABLED && logger) {
    goog.log.log(logger, goog.log.Level.INFO, msg, exception);
  }
};
goog.log.fine = function(logger, msg, exception = undefined) {
  if (goog.log.ENABLED && logger) {
    goog.log.log(logger, goog.log.Level.FINE, msg, exception);
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.log.log.js");

goog.provide("goog.net.ErrorCode");
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9,};
goog.net.ErrorCode.getDebugMessage = function(errorCode) {
  switch(errorCode) {
    case goog.net.ErrorCode.NO_ERROR:
      return "No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return "Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return "File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return "Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return "Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return "An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return "Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return "Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return "Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return "The resource is not available offline";
    default:
      return "Unrecognized error code";
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.net.errorcode.js");

goog.provide("goog.net.EventType");
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress", DOWNLOAD_PROGRESS:"downloadprogress", UPLOAD_PROGRESS:"uploadprogress",};

$CLJS.SHADOW_ENV.setLoaded("goog.net.eventtype.js");

goog.provide("goog.net.HttpStatus");
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTI_STATUS:207, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, PERMANENT_REDIRECT:308, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, 
REQUEST_TIMEOUT:408, CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, UNPROCESSABLE_ENTITY:422, LOCKED:423, FAILED_DEPENDENCY:424, PRECONDITION_REQUIRED:428, TOO_MANY_REQUESTS:429, REQUEST_HEADER_FIELDS_TOO_LARGE:431, CLIENT_CLOSED_REQUEST:499, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, 
HTTP_VERSION_NOT_SUPPORTED:505, INSUFFICIENT_STORAGE:507, NETWORK_AUTHENTICATION_REQUIRED:511, QUIRK_IE_NO_CONTENT:1223,};
goog.net.HttpStatus.isSuccess = function(status) {
  switch(status) {
    case goog.net.HttpStatus.OK:
    case goog.net.HttpStatus.CREATED:
    case goog.net.HttpStatus.ACCEPTED:
    case goog.net.HttpStatus.NO_CONTENT:
    case goog.net.HttpStatus.PARTIAL_CONTENT:
    case goog.net.HttpStatus.NOT_MODIFIED:
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return true;
    default:
      return false;
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.net.httpstatus.js");

goog.provide("goog.net.XhrLike");
goog.net.XhrLike = function() {
};
goog.net.XhrLike.OrNative;
goog.net.XhrLike.prototype.onreadystatechange;
goog.net.XhrLike.prototype.response;
goog.net.XhrLike.prototype.responseText;
goog.net.XhrLike.prototype.responseType;
goog.net.XhrLike.prototype.responseXML;
goog.net.XhrLike.prototype.readyState;
goog.net.XhrLike.prototype.status;
goog.net.XhrLike.prototype.statusText;
goog.net.XhrLike.prototype.open = function(method, url, opt_async, opt_user, opt_password) {
};
goog.net.XhrLike.prototype.send = function(opt_data) {
};
goog.net.XhrLike.prototype.abort = function() {
};
goog.net.XhrLike.prototype.setRequestHeader = function(header, value) {
};
goog.net.XhrLike.prototype.getResponseHeader = function(header) {
};
goog.net.XhrLike.prototype.getAllResponseHeaders = function() {
};
goog.net.XhrLike.prototype.setTrustToken = function(trustTokenAttribute) {
};

$CLJS.SHADOW_ENV.setLoaded("goog.net.xhrlike.js");

goog.provide("goog.net.XmlHttpFactory");
goog.require("goog.net.XhrLike");
goog.net.XmlHttpFactory = function() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.createInstance = goog.abstractMethod;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions());
};
goog.net.XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod;

$CLJS.SHADOW_ENV.setLoaded("goog.net.xmlhttpfactory.js");

goog.provide("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XhrLike");
goog.require("goog.net.XmlHttpFactory");
goog.net.WrapperXmlHttpFactory = function(xhrFactory, optionsFactory) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = xhrFactory;
  this.optionsFactory_ = optionsFactory;
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
  return this.xhrFactory_();
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
  return this.optionsFactory_();
};

$CLJS.SHADOW_ENV.setLoaded("goog.net.wrapperxmlhttpfactory.js");

goog.provide("goog.net.DefaultXmlHttpFactory");
goog.provide("goog.net.XmlHttp");
goog.provide("goog.net.XmlHttp.OptionType");
goog.provide("goog.net.XmlHttp.ReadyState");
goog.provide("goog.net.XmlHttpDefines");
goog.require("goog.asserts");
goog.require("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XmlHttpFactory");
goog.requireType("goog.net.XhrLike");
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance();
};
goog.net.XmlHttp.ASSUME_NATIVE_XHR = goog.define("goog.net.XmlHttp.ASSUME_NATIVE_XHR", false);
goog.net.XmlHttpDefines = {};
goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR = goog.define("goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR", false);
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.factory_.getOptions();
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1,};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4,};
goog.net.XmlHttp.factory_;
goog.net.XmlHttp.setFactory = function(factory, optionsFactory) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(goog.asserts.assert(factory), goog.asserts.assert(optionsFactory)));
};
goog.net.XmlHttp.setGlobalFactory = function(factory) {
  goog.net.XmlHttp.factory_ = factory;
};
goog.net.DefaultXmlHttpFactory = function() {
  goog.net.XmlHttpFactory.call(this);
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  const progId = this.getProgId_();
  if (progId) {
    return new ActiveXObject(progId);
  } else {
    return new XMLHttpRequest();
  }
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
  const progId = this.getProgId_();
  const options = {};
  if (progId) {
    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;
    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true;
  }
  return options;
};
goog.net.DefaultXmlHttpFactory.prototype.ieProgId_;
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
  if (goog.net.XmlHttp.ASSUME_NATIVE_XHR || goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) {
    return "";
  }
  if (!this.ieProgId_ && typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined") {
    const ACTIVE_X_IDENTS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP",];
    for (let i = 0; i < ACTIVE_X_IDENTS.length; i++) {
      const candidate = ACTIVE_X_IDENTS[i];
      try {
        new ActiveXObject(candidate);
        this.ieProgId_ = candidate;
        return candidate;
      } catch (e) {
      }
    }
    throw new Error("Could not create ActiveXObject. ActiveX might be disabled," + " or MSXML might not be installed");
  }
  return this.ieProgId_;
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory());

$CLJS.SHADOW_ENV.setLoaded("goog.net.xmlhttp.js");

goog.provide("goog.net.XhrIo");
goog.provide("goog.net.XhrIo.ResponseType");
goog.require("goog.Timer");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.collections.maps");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.events.EventTarget");
goog.require("goog.json.hybrid");
goog.require("goog.log");
goog.require("goog.net.ErrorCode");
goog.require("goog.net.EventType");
goog.require("goog.net.HttpStatus");
goog.require("goog.net.XmlHttp");
goog.require("goog.object");
goog.require("goog.string");
goog.require("goog.uri.utils");
goog.require("goog.userAgent");
goog.requireType("goog.Uri");
goog.requireType("goog.debug.ErrorHandler");
goog.requireType("goog.net.XhrLike");
goog.requireType("goog.net.XmlHttpFactory");
goog.scope(function() {
  goog.net.XhrIo = function(opt_xmlHttpFactory) {
    XhrIo.base(this, "constructor");
    this.headers = new Map();
    this.xmlHttpFactory_ = opt_xmlHttpFactory || null;
    this.active_ = false;
    this.xhr_ = null;
    this.xhrOptions_ = null;
    this.lastUri_ = "";
    this.lastMethod_ = "";
    this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
    this.lastError_ = "";
    this.errorDispatched_ = false;
    this.inSend_ = false;
    this.inOpen_ = false;
    this.inAbort_ = false;
    this.timeoutInterval_ = 0;
    this.timeoutId_ = null;
    this.responseType_ = ResponseType.DEFAULT;
    this.withCredentials_ = false;
    this.progressEventsEnabled_ = false;
    this.useXhr2Timeout_ = false;
    this.trustToken_ = null;
  };
  goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
  const XhrIo = goog.net.XhrIo;
  goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer",};
  const ResponseType = goog.net.XhrIo.ResponseType;
  goog.net.XhrIo.prototype.logger_ = goog.log.getLogger("goog.net.XhrIo");
  goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
  goog.net.XhrIo.CONTENT_TRANSFER_ENCODING = "Content-Transfer-Encoding";
  goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i;
  const HTTP_SCHEME_PATTERN = goog.net.XhrIo.HTTP_SCHEME_PATTERN;
  goog.net.XhrIo.METHODS_WITH_FORM_DATA = ["POST", "PUT"];
  goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset\x3dutf-8";
  goog.net.XhrIo.XHR2_TIMEOUT_ = "timeout";
  goog.net.XhrIo.XHR2_ON_TIMEOUT_ = "ontimeout";
  goog.net.XhrIo.sendInstances_ = [];
  goog.net.XhrIo.send = function(url, opt_callback, opt_method, opt_content, opt_headers, opt_timeoutInterval, opt_withCredentials) {
    const x = new goog.net.XhrIo();
    goog.net.XhrIo.sendInstances_.push(x);
    if (opt_callback) {
      x.listen(goog.net.EventType.COMPLETE, opt_callback);
    }
    x.listenOnce(goog.net.EventType.READY, x.cleanupSend_);
    if (opt_timeoutInterval) {
      x.setTimeoutInterval(opt_timeoutInterval);
    }
    if (opt_withCredentials) {
      x.setWithCredentials(opt_withCredentials);
    }
    x.send(url, opt_method, opt_content, opt_headers);
    return x;
  };
  goog.net.XhrIo.cleanup = function() {
    const instances = goog.net.XhrIo.sendInstances_;
    while (instances.length) {
      instances.pop().dispose();
    }
  };
  goog.net.XhrIo.protectEntryPoints = function(errorHandler) {
    goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = errorHandler.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
  };
  goog.net.XhrIo.prototype.cleanupSend_ = function() {
    this.dispose();
    goog.array.remove(goog.net.XhrIo.sendInstances_, this);
  };
  goog.net.XhrIo.prototype.getTimeoutInterval = function() {
    return this.timeoutInterval_;
  };
  goog.net.XhrIo.prototype.setTimeoutInterval = function(ms) {
    this.timeoutInterval_ = Math.max(0, ms);
  };
  goog.net.XhrIo.prototype.setResponseType = function(type) {
    this.responseType_ = type;
  };
  goog.net.XhrIo.prototype.getResponseType = function() {
    return this.responseType_;
  };
  goog.net.XhrIo.prototype.setWithCredentials = function(withCredentials) {
    this.withCredentials_ = withCredentials;
  };
  goog.net.XhrIo.prototype.getWithCredentials = function() {
    return this.withCredentials_;
  };
  goog.net.XhrIo.prototype.setProgressEventsEnabled = function(enabled) {
    this.progressEventsEnabled_ = enabled;
  };
  goog.net.XhrIo.prototype.getProgressEventsEnabled = function() {
    return this.progressEventsEnabled_;
  };
  goog.net.XhrIo.prototype.setTrustToken = function(trustToken) {
    this.trustToken_ = trustToken;
  };
  goog.net.XhrIo.prototype.send = function(url, opt_method, opt_content, opt_headers) {
    if (this.xhr_) {
      throw new Error("[goog.net.XhrIo] Object is active with another request\x3d" + this.lastUri_ + "; newUri\x3d" + url);
    }
    const method = opt_method ? opt_method.toUpperCase() : "GET";
    this.lastUri_ = url;
    this.lastError_ = "";
    this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
    this.lastMethod_ = method;
    this.errorDispatched_ = false;
    this.active_ = true;
    this.xhr_ = this.createXhr();
    this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
    this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
    if (this.getProgressEventsEnabled() && "onprogress" in this.xhr_) {
      this.xhr_.onprogress = goog.bind(function(e) {
        this.onProgressHandler_(e, true);
      }, this);
      if (this.xhr_.upload) {
        this.xhr_.upload.onprogress = goog.bind(this.onProgressHandler_, this);
      }
    }
    try {
      goog.log.fine(this.logger_, this.formatMsg_("Opening Xhr"));
      this.inOpen_ = true;
      this.xhr_.open(method, String(url), true);
      this.inOpen_ = false;
    } catch (err) {
      goog.log.fine(this.logger_, this.formatMsg_("Error opening Xhr: " + err.message));
      this.error_(goog.net.ErrorCode.EXCEPTION, err);
      return;
    }
    const content = opt_content || "";
    const headers = new Map(this.headers);
    if (opt_headers) {
      if (Object.getPrototypeOf(opt_headers) === Object.prototype) {
        for (let key in opt_headers) {
          headers.set(key, opt_headers[key]);
        }
      } else if (typeof opt_headers.keys === "function" && typeof opt_headers.get === "function") {
        for (const key of opt_headers.keys()) {
          headers.set(key, opt_headers.get(key));
        }
      } else {
        throw new Error("Unknown input type for opt_headers: " + String(opt_headers));
      }
    }
    const contentTypeKey = Array.from(headers.keys()).find(header => goog.string.caseInsensitiveEquals(goog.net.XhrIo.CONTENT_TYPE_HEADER, header));
    const contentIsFormData = goog.global["FormData"] && content instanceof goog.global["FormData"];
    if (goog.array.contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, method) && !contentTypeKey && !contentIsFormData) {
      headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
    }
    for (const [key, value] of headers) {
      this.xhr_.setRequestHeader(key, value);
    }
    if (this.responseType_) {
      this.xhr_.responseType = this.responseType_;
    }
    if ("withCredentials" in this.xhr_ && this.xhr_.withCredentials !== this.withCredentials_) {
      this.xhr_.withCredentials = this.withCredentials_;
    }
    if ("setTrustToken" in this.xhr_ && this.trustToken_) {
      try {
        this.xhr_.setTrustToken(this.trustToken_);
      } catch (err) {
        goog.log.fine(this.logger_, this.formatMsg_("Error SetTrustToken: " + err.message));
      }
    }
    try {
      this.cleanUpTimeoutTimer_();
      if (this.timeoutInterval_ > 0) {
        this.useXhr2Timeout_ = goog.net.XhrIo.shouldUseXhr2Timeout_(this.xhr_);
        goog.log.fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_));
        if (this.useXhr2Timeout_) {
          this.xhr_[goog.net.XhrIo.XHR2_TIMEOUT_] = this.timeoutInterval_;
          this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = goog.bind(this.timeout_, this);
        } else {
          this.timeoutId_ = goog.Timer.callOnce(this.timeout_, this.timeoutInterval_, this);
        }
      }
      goog.log.fine(this.logger_, this.formatMsg_("Sending request"));
      this.inSend_ = true;
      this.xhr_.send(content);
      this.inSend_ = false;
    } catch (err) {
      goog.log.fine(this.logger_, this.formatMsg_("Send error: " + err.message));
      this.error_(goog.net.ErrorCode.EXCEPTION, err);
    }
  };
  goog.net.XhrIo.shouldUseXhr2Timeout_ = function(xhr) {
    return goog.userAgent.IE && typeof xhr[goog.net.XhrIo.XHR2_TIMEOUT_] === "number" && xhr[goog.net.XhrIo.XHR2_ON_TIMEOUT_] !== undefined;
  };
  goog.net.XhrIo.prototype.createXhr = function() {
    return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp();
  };
  goog.net.XhrIo.prototype.timeout_ = function() {
    if (typeof goog == "undefined") {
    } else if (this.xhr_) {
      this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting";
      this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT;
      goog.log.fine(this.logger_, this.formatMsg_(this.lastError_));
      this.dispatchEvent(goog.net.EventType.TIMEOUT);
      this.abort(goog.net.ErrorCode.TIMEOUT);
    }
  };
  goog.net.XhrIo.prototype.error_ = function(errorCode, err) {
    this.active_ = false;
    if (this.xhr_) {
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false;
    }
    this.lastError_ = err;
    this.lastErrorCode_ = errorCode;
    this.dispatchErrors_();
    this.cleanUpXhr_();
  };
  goog.net.XhrIo.prototype.dispatchErrors_ = function() {
    if (!this.errorDispatched_) {
      this.errorDispatched_ = true;
      this.dispatchEvent(goog.net.EventType.COMPLETE);
      this.dispatchEvent(goog.net.EventType.ERROR);
    }
  };
  goog.net.XhrIo.prototype.abort = function(opt_failureCode) {
    if (this.xhr_ && this.active_) {
      goog.log.fine(this.logger_, this.formatMsg_("Aborting"));
      this.active_ = false;
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false;
      this.lastErrorCode_ = opt_failureCode || goog.net.ErrorCode.ABORT;
      this.dispatchEvent(goog.net.EventType.COMPLETE);
      this.dispatchEvent(goog.net.EventType.ABORT);
      this.cleanUpXhr_();
    }
  };
  goog.net.XhrIo.prototype.disposeInternal = function() {
    if (this.xhr_) {
      if (this.active_) {
        this.active_ = false;
        this.inAbort_ = true;
        this.xhr_.abort();
        this.inAbort_ = false;
      }
      this.cleanUpXhr_(true);
    }
    XhrIo.base(this, "disposeInternal");
  };
  goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
    if (this.isDisposed()) {
      return;
    }
    if (!this.inOpen_ && !this.inSend_ && !this.inAbort_) {
      this.onReadyStateChangeEntryPoint_();
    } else {
      this.onReadyStateChangeHelper_();
    }
  };
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
    this.onReadyStateChangeHelper_();
  };
  goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
    if (!this.active_) {
      return;
    }
    if (typeof goog == "undefined") {
    } else if (this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && this.getStatus() == 2) {
      goog.log.fine(this.logger_, this.formatMsg_("Local request error detected and ignored"));
    } else {
      if (this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.callOnce(this.onReadyStateChange_, 0, this);
        return;
      }
      this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE);
      if (this.isComplete()) {
        goog.log.fine(this.logger_, this.formatMsg_("Request complete"));
        this.active_ = false;
        try {
          if (this.isSuccess()) {
            this.dispatchEvent(goog.net.EventType.COMPLETE);
            this.dispatchEvent(goog.net.EventType.SUCCESS);
          } else {
            this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR;
            this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]";
            this.dispatchErrors_();
          }
        } finally {
          this.cleanUpXhr_();
        }
      }
    }
  };
  goog.net.XhrIo.prototype.onProgressHandler_ = function(e, opt_isDownload) {
    goog.asserts.assert(e.type === goog.net.EventType.PROGRESS, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
    this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(e, goog.net.EventType.PROGRESS));
    this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(e, opt_isDownload ? goog.net.EventType.DOWNLOAD_PROGRESS : goog.net.EventType.UPLOAD_PROGRESS));
  };
  goog.net.XhrIo.buildProgressEvent_ = function(e, eventType) {
    return {type:eventType, lengthComputable:e.lengthComputable, loaded:e.loaded, total:e.total,};
  };
  goog.net.XhrIo.prototype.cleanUpXhr_ = function(opt_fromDispose) {
    if (this.xhr_) {
      this.cleanUpTimeoutTimer_();
      const xhr = this.xhr_;
      const clearedOnReadyStateChange = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? () => {
      } : null;
      this.xhr_ = null;
      this.xhrOptions_ = null;
      if (!opt_fromDispose) {
        this.dispatchEvent(goog.net.EventType.READY);
      }
      try {
        xhr.onreadystatechange = clearedOnReadyStateChange;
      } catch (e) {
        goog.log.error(this.logger_, "Problem encountered resetting onreadystatechange: " + e.message);
      }
    }
  };
  goog.net.XhrIo.prototype.cleanUpTimeoutTimer_ = function() {
    if (this.xhr_ && this.useXhr2Timeout_) {
      this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = null;
    }
    if (this.timeoutId_) {
      goog.Timer.clear(this.timeoutId_);
      this.timeoutId_ = null;
    }
  };
  goog.net.XhrIo.prototype.isActive = function() {
    return !!this.xhr_;
  };
  goog.net.XhrIo.prototype.isComplete = function() {
    return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE;
  };
  goog.net.XhrIo.prototype.isSuccess = function() {
    const status = this.getStatus();
    return goog.net.HttpStatus.isSuccess(status) || status === 0 && !this.isLastUriEffectiveSchemeHttp_();
  };
  goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
    const scheme = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
    return HTTP_SCHEME_PATTERN.test(scheme);
  };
  goog.net.XhrIo.prototype.getReadyState = function() {
    return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED;
  };
  goog.net.XhrIo.prototype.getStatus = function() {
    try {
      return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1;
    } catch (e) {
      return -1;
    }
  };
  goog.net.XhrIo.prototype.getStatusText = function() {
    try {
      return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : "";
    } catch (e) {
      goog.log.fine(this.logger_, "Can not get status: " + e.message);
      return "";
    }
  };
  goog.net.XhrIo.prototype.getLastUri = function() {
    return String(this.lastUri_);
  };
  goog.net.XhrIo.prototype.getResponseText = function() {
    try {
      return this.xhr_ ? this.xhr_.responseText : "";
    } catch (e) {
      goog.log.fine(this.logger_, "Can not get responseText: " + e.message);
      return "";
    }
  };
  goog.net.XhrIo.prototype.getResponseBody = function() {
    try {
      if (this.xhr_ && "responseBody" in this.xhr_) {
        return this.xhr_["responseBody"];
      }
    } catch (e) {
      goog.log.fine(this.logger_, "Can not get responseBody: " + e.message);
    }
    return null;
  };
  goog.net.XhrIo.prototype.getResponseXml = function() {
    try {
      return this.xhr_ ? this.xhr_.responseXML : null;
    } catch (e) {
      goog.log.fine(this.logger_, "Can not get responseXML: " + e.message);
      return null;
    }
  };
  goog.net.XhrIo.prototype.getResponseJson = function(opt_xssiPrefix) {
    if (!this.xhr_) {
      return undefined;
    }
    let responseText = this.xhr_.responseText;
    if (opt_xssiPrefix && responseText.indexOf(opt_xssiPrefix) == 0) {
      responseText = responseText.substring(opt_xssiPrefix.length);
    }
    return goog.json.hybrid.parse(responseText);
  };
  goog.net.XhrIo.prototype.getResponse = function() {
    try {
      if (!this.xhr_) {
        return null;
      }
      if ("response" in this.xhr_) {
        return this.xhr_.response;
      }
      switch(this.responseType_) {
        case ResponseType.DEFAULT:
        case ResponseType.TEXT:
          return this.xhr_.responseText;
        case ResponseType.ARRAY_BUFFER:
          if ("mozResponseArrayBuffer" in this.xhr_) {
            return this.xhr_.mozResponseArrayBuffer;
          }
      }
      goog.log.error(this.logger_, "Response type " + this.responseType_ + " is not " + "supported on this browser");
      return null;
    } catch (e) {
      goog.log.fine(this.logger_, "Can not get response: " + e.message);
      return null;
    }
  };
  goog.net.XhrIo.prototype.getResponseHeader = function(key) {
    if (!this.xhr_ || !this.isComplete()) {
      return undefined;
    }
    const value = this.xhr_.getResponseHeader(key);
    return value === null ? undefined : value;
  };
  goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
    return this.xhr_ && this.getReadyState() >= goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.getAllResponseHeaders() || "" : "";
  };
  goog.net.XhrIo.prototype.getResponseHeaders = function() {
    const headersObject = {};
    const headersArray = this.getAllResponseHeaders().split("\r\n");
    for (let i = 0; i < headersArray.length; i++) {
      if (goog.string.isEmptyOrWhitespace(headersArray[i])) {
        continue;
      }
      const keyValue = goog.string.splitLimit(headersArray[i], ":", 1);
      const key = keyValue[0];
      let value = keyValue[1];
      if (typeof value !== "string") {
        continue;
      }
      value = value.trim();
      const values = headersObject[key] || [];
      headersObject[key] = values;
      values.push(value);
    }
    return goog.object.map(headersObject, function(values) {
      return values.join(", ");
    });
  };
  goog.net.XhrIo.prototype.getStreamingResponseHeader = function(key) {
    return this.xhr_ ? this.xhr_.getResponseHeader(key) : null;
  };
  goog.net.XhrIo.prototype.getAllStreamingResponseHeaders = function() {
    return this.xhr_ ? this.xhr_.getAllResponseHeaders() : "";
  };
  goog.net.XhrIo.prototype.getLastErrorCode = function() {
    return this.lastErrorCode_;
  };
  goog.net.XhrIo.prototype.getLastError = function() {
    return typeof this.lastError_ === "string" ? this.lastError_ : String(this.lastError_);
  };
  goog.net.XhrIo.prototype.formatMsg_ = function(msg) {
    return msg + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]";
  };
  goog.debug.entryPointRegistry.register(function(transformer) {
    goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = transformer(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
  });
});

$CLJS.SHADOW_ENV.setLoaded("goog.net.xhrio.js");

goog.provide("goog.events.EventHandler");
goog.require("goog.Disposable");
goog.require("goog.events");
goog.require("goog.object");
goog.requireType("goog.events.Event");
goog.requireType("goog.events.EventId");
goog.requireType("goog.events.EventTarget");
goog.requireType("goog.events.EventWrapper");
goog.events.EventHandler = function(opt_scope) {
  goog.Disposable.call(this);
  this.handler_ = opt_scope;
  this.keys_ = {};
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(src, type, opt_fn, opt_options) {
  var self = this;
  return self.listen_(src, type, opt_fn, opt_options);
};
goog.events.EventHandler.prototype.listenWithScope = function(src, type, fn, options, scope) {
  var self = this;
  return self.listen_(src, type, fn, options, scope);
};
goog.events.EventHandler.prototype.listen_ = function(src, type, opt_fn, opt_options, opt_scope) {
  var self = this;
  if (!Array.isArray(type)) {
    if (type) {
      goog.events.EventHandler.typeArray_[0] = type.toString();
    }
    type = goog.events.EventHandler.typeArray_;
  }
  for (var i = 0; i < type.length; i++) {
    var listenerObj = goog.events.listen(src, type[i], opt_fn || self.handleEvent, opt_options || false, opt_scope || self.handler_ || self);
    if (!listenerObj) {
      return self;
    }
    var key = listenerObj.key;
    self.keys_[key] = listenerObj;
  }
  return self;
};
goog.events.EventHandler.prototype.listenOnce = function(src, type, opt_fn, opt_options) {
  var self = this;
  return self.listenOnce_(src, type, opt_fn, opt_options);
};
goog.events.EventHandler.prototype.listenOnceWithScope = function(src, type, fn, capture, scope) {
  var self = this;
  return self.listenOnce_(src, type, fn, capture, scope);
};
goog.events.EventHandler.prototype.listenOnce_ = function(src, type, opt_fn, opt_options, opt_scope) {
  var self = this;
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      self.listenOnce_(src, type[i], opt_fn, opt_options, opt_scope);
    }
  } else {
    var listenerObj = goog.events.listenOnce(src, type, opt_fn || self.handleEvent, opt_options, opt_scope || self.handler_ || self);
    if (!listenerObj) {
      return self;
    }
    var key = listenerObj.key;
    self.keys_[key] = listenerObj;
  }
  return self;
};
goog.events.EventHandler.prototype.listenWithWrapper = function(src, wrapper, listener, opt_capt) {
  var self = this;
  return self.listenWithWrapper_(src, wrapper, listener, opt_capt);
};
goog.events.EventHandler.prototype.listenWithWrapperAndScope = function(src, wrapper, listener, capture, scope) {
  var self = this;
  return self.listenWithWrapper_(src, wrapper, listener, capture, scope);
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function(src, wrapper, listener, opt_capt, opt_scope) {
  var self = this;
  wrapper.listen(src, listener, opt_capt, opt_scope || self.handler_ || self, self);
  return self;
};
goog.events.EventHandler.prototype.getListenerCount = function() {
  var count = 0;
  for (var key in this.keys_) {
    if (Object.prototype.hasOwnProperty.call(this.keys_, key)) {
      count++;
    }
  }
  return count;
};
goog.events.EventHandler.prototype.unlisten = function(src, type, opt_fn, opt_options, opt_scope) {
  var self = this;
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      self.unlisten(src, type[i], opt_fn, opt_options, opt_scope);
    }
  } else {
    var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
    var listener = goog.events.getListener(src, type, opt_fn || self.handleEvent, capture, opt_scope || self.handler_ || self);
    if (listener) {
      goog.events.unlistenByKey(listener);
      delete self.keys_[listener.key];
    }
  }
  return self;
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_scope) {
  var self = this;
  wrapper.unlisten(src, listener, opt_capt, opt_scope || self.handler_ || self, self);
  return self;
};
goog.events.EventHandler.prototype.removeAll = function() {
  goog.object.forEach(this.keys_, function(listenerObj, key) {
    if (this.keys_.hasOwnProperty(key)) {
      goog.events.unlistenByKey(listenerObj);
    }
  }, this);
  this.keys_ = {};
};
goog.events.EventHandler.prototype.disposeInternal = function() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll();
};
goog.events.EventHandler.prototype.handleEvent = function(e) {
  throw new Error("EventHandler.handleEvent not implemented");
};

$CLJS.SHADOW_ENV.setLoaded("goog.events.eventhandler.js");

goog.provide("goog.structs.Queue");
goog.require("goog.array");
goog.structs.Queue = function() {
  this.front_ = [];
  this.back_ = [];
};
goog.structs.Queue.prototype.maybeFlip_ = function() {
  if (this.front_.length === 0) {
    this.front_ = this.back_;
    this.front_.reverse();
    this.back_ = [];
  }
};
goog.structs.Queue.prototype.enqueue = function(element) {
  this.back_.push(element);
};
goog.structs.Queue.prototype.dequeue = function() {
  this.maybeFlip_();
  return this.front_.pop();
};
goog.structs.Queue.prototype.peek = function() {
  this.maybeFlip_();
  return goog.array.peek(this.front_);
};
goog.structs.Queue.prototype.getCount = function() {
  return this.front_.length + this.back_.length;
};
goog.structs.Queue.prototype.isEmpty = function() {
  return this.front_.length === 0 && this.back_.length === 0;
};
goog.structs.Queue.prototype.clear = function() {
  this.front_ = [];
  this.back_ = [];
};
goog.structs.Queue.prototype.contains = function(obj) {
  return goog.array.contains(this.front_, obj) || goog.array.contains(this.back_, obj);
};
goog.structs.Queue.prototype.remove = function(obj) {
  return goog.array.removeLast(this.front_, obj) || goog.array.remove(this.back_, obj);
};
goog.structs.Queue.prototype.getValues = function() {
  var res = [];
  for (var i = this.front_.length - 1; i >= 0; --i) {
    res.push(this.front_[i]);
  }
  var len = this.back_.length;
  for (var i = 0; i < len; ++i) {
    res.push(this.back_[i]);
  }
  return res;
};

$CLJS.SHADOW_ENV.setLoaded("goog.structs.queue.js");

goog.provide("goog.structs.Collection");
goog.structs.Collection = function() {
};
goog.structs.Collection.prototype.add;
goog.structs.Collection.prototype.remove;
goog.structs.Collection.prototype.contains;
goog.structs.Collection.prototype.getCount;

$CLJS.SHADOW_ENV.setLoaded("goog.structs.collection.js");

goog.provide("goog.structs.Set");
goog.require("goog.structs");
goog.require("goog.structs.Collection");
goog.require("goog.structs.Map");
goog.requireType("goog.iter.Iterator");
goog.structs.Set = function(opt_values) {
  this.map_ = new goog.structs.Map();
  this.size = 0;
  if (opt_values) {
    this.addAll(opt_values);
  }
};
goog.structs.Set.getUid_ = goog.getUid;
goog.structs.Set.getKey_ = function(val) {
  var type = typeof val;
  if (type == "object" && val || type == "function") {
    return "o" + goog.structs.Set.getUid_(val);
  } else {
    return type.slice(0, 1) + val;
  }
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.size;
};
goog.structs.Set.prototype.add = function(element) {
  this.map_.set(goog.structs.Set.getKey_(element), element);
  this.setSizeInternal_(this.map_.size);
};
goog.structs.Set.prototype.addAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0; i < l; i++) {
    this.add(values[i]);
  }
  this.setSizeInternal_(this.map_.size);
};
goog.structs.Set.prototype.removeAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for (var i = 0; i < l; i++) {
    this.remove(values[i]);
  }
  this.setSizeInternal_(this.map_.size);
};
goog.structs.Set.prototype.delete = function(element) {
  const rv = this.map_.remove(goog.structs.Set.getKey_(element));
  this.setSizeInternal_(this.map_.size);
  return rv;
};
goog.structs.Set.prototype.remove = function(element) {
  return this.delete(element);
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear();
  this.setSizeInternal_(0);
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.size === 0;
};
goog.structs.Set.prototype.has = function(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.contains = function(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.containsAll = function(col) {
  return goog.structs.every(col, this.contains, this);
};
goog.structs.Set.prototype.intersection = function(col) {
  var result = new goog.structs.Set();
  var values = goog.structs.getValues(col);
  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    if (this.contains(value)) {
      result.add(value);
    }
  }
  return result;
};
goog.structs.Set.prototype.difference = function(col) {
  var result = this.clone();
  result.removeAll(col);
  return result;
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues();
};
goog.structs.Set.prototype.values = function() {
  return this.map_.values();
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this);
};
goog.structs.Set.prototype.equals = function(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col);
};
goog.structs.Set.prototype.isSubsetOf = function(col) {
  var colCount = goog.structs.getCount(col);
  if (this.getCount() > colCount) {
    return false;
  }
  if (!(col instanceof goog.structs.Set) && colCount > 5) {
    col = new goog.structs.Set(col);
  }
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value);
  });
};
goog.structs.Set.prototype.__iterator__ = function(opt_keys) {
  return this.map_.__iterator__(false);
};
goog.structs.Set.prototype[Symbol.iterator] = function() {
  return this.values();
};
goog.structs.Set.prototype.setSizeInternal_ = function(newSize) {
  this.size = newSize;
};

$CLJS.SHADOW_ENV.setLoaded("goog.structs.set.js");

goog.provide("goog.structs.Pool");
goog.require("goog.Disposable");
goog.require("goog.structs.Queue");
goog.require("goog.structs.Set");
goog.structs.Pool = function(opt_minCount, opt_maxCount) {
  goog.Disposable.call(this);
  this.minCount_ = opt_minCount || 0;
  this.maxCount_ = opt_maxCount || 10;
  if (this.minCount_ > this.maxCount_) {
    throw new Error(goog.structs.Pool.ERROR_MIN_MAX_);
  }
  this.freeQueue_ = new goog.structs.Queue();
  this.inUseSet_ = new goog.structs.Set();
  this.delay = 0;
  this.lastAccess = null;
  this.adjustForMinMax();
};
goog.inherits(goog.structs.Pool, goog.Disposable);
goog.structs.Pool.ERROR_MIN_MAX_ = "[goog.structs.Pool] Min can not be greater than max";
goog.structs.Pool.ERROR_DISPOSE_UNRELEASED_OBJS_ = "[goog.structs.Pool] Objects not released";
goog.structs.Pool.prototype.setMinimumCount = function(min) {
  if (min > this.maxCount_) {
    throw new Error(goog.structs.Pool.ERROR_MIN_MAX_);
  }
  this.minCount_ = min;
  this.adjustForMinMax();
};
goog.structs.Pool.prototype.setMaximumCount = function(max) {
  if (max < this.minCount_) {
    throw new Error(goog.structs.Pool.ERROR_MIN_MAX_);
  }
  this.maxCount_ = max;
  this.adjustForMinMax();
};
goog.structs.Pool.prototype.setDelay = function(delay) {
  this.delay = delay;
};
goog.structs.Pool.prototype.getObject = function() {
  var time = Date.now();
  if (this.lastAccess != null && time - this.lastAccess < this.delay) {
    return undefined;
  }
  var obj = this.removeFreeObject_();
  if (obj) {
    this.lastAccess = time;
    this.inUseSet_.add(obj);
  }
  return obj;
};
goog.structs.Pool.prototype.releaseObject = function(obj) {
  if (this.inUseSet_.remove(obj)) {
    this.addFreeObject(obj);
    return true;
  }
  return false;
};
goog.structs.Pool.prototype.removeFreeObject_ = function() {
  var obj;
  while (this.getFreeCount() > 0) {
    obj = this.freeQueue_.dequeue();
    if (!this.objectCanBeReused(obj)) {
      this.adjustForMinMax();
    } else {
      break;
    }
  }
  if (!obj && this.getCount() < this.maxCount_) {
    obj = this.createObject();
  }
  return obj;
};
goog.structs.Pool.prototype.addFreeObject = function(obj) {
  this.inUseSet_.remove(obj);
  if (this.objectCanBeReused(obj) && this.getCount() < this.maxCount_) {
    this.freeQueue_.enqueue(obj);
  } else {
    this.disposeObject(obj);
  }
};
goog.structs.Pool.prototype.adjustForMinMax = function() {
  var freeQueue = this.freeQueue_;
  while (this.getCount() < this.minCount_) {
    freeQueue.enqueue(this.createObject());
  }
  while (this.getCount() > this.maxCount_ && this.getFreeCount() > 0) {
    this.disposeObject(freeQueue.dequeue());
  }
};
goog.structs.Pool.prototype.createObject = function() {
  return {};
};
goog.structs.Pool.prototype.disposeObject = function(obj) {
  if (typeof obj.dispose == "function") {
    obj.dispose();
  } else {
    for (var i in obj) {
      obj[i] = null;
    }
  }
};
goog.structs.Pool.prototype.objectCanBeReused = function(obj) {
  if (typeof obj.canBeReused == "function") {
    return obj.canBeReused();
  }
  return true;
};
goog.structs.Pool.prototype.contains = function(obj) {
  return this.freeQueue_.contains(obj) || this.inUseSet_.contains(obj);
};
goog.structs.Pool.prototype.getCount = function() {
  return this.freeQueue_.getCount() + this.inUseSet_.getCount();
};
goog.structs.Pool.prototype.getInUseCount = function() {
  return this.inUseSet_.getCount();
};
goog.structs.Pool.prototype.getFreeCount = function() {
  return this.freeQueue_.getCount();
};
goog.structs.Pool.prototype.isEmpty = function() {
  return this.freeQueue_.isEmpty() && this.inUseSet_.isEmpty();
};
goog.structs.Pool.prototype.disposeInternal = function() {
  goog.structs.Pool.superClass_.disposeInternal.call(this);
  if (this.getInUseCount() > 0) {
    throw new Error(goog.structs.Pool.ERROR_DISPOSE_UNRELEASED_OBJS_);
  }
  delete this.inUseSet_;
  var freeQueue = this.freeQueue_;
  while (!freeQueue.isEmpty()) {
    this.disposeObject(freeQueue.dequeue());
  }
  delete this.freeQueue_;
};

$CLJS.SHADOW_ENV.setLoaded("goog.structs.pool.js");

goog.provide("goog.structs.Node");
goog.structs.Node = function(key, value) {
  this.key_ = key;
  this.value_ = value;
};
goog.structs.Node.prototype.getKey = function() {
  return this.key_;
};
goog.structs.Node.prototype.getValue = function() {
  return this.value_;
};
goog.structs.Node.prototype.clone = function() {
  return new goog.structs.Node(this.key_, this.value_);
};

$CLJS.SHADOW_ENV.setLoaded("goog.structs.node.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.structs.Heap");
  goog.module.declareLegacyNamespace();
  const Node = goog.require("goog.structs.Node");
  const object = goog.require("goog.object");
  class Heap {
    constructor(opt_heap) {
      this.nodes_ = [];
      if (opt_heap) {
        this.insertAll(opt_heap);
      }
    }
    insert(key, value) {
      const node = new Node(key, value);
      const nodes = this.nodes_;
      nodes.push(node);
      this.moveUp_(nodes.length - 1);
    }
    insertAll(heap) {
      let keys, values;
      if (heap instanceof Heap) {
        keys = heap.getKeys();
        values = heap.getValues();
        if (this.getCount() <= 0) {
          const nodes = this.nodes_;
          for (let i = 0; i < keys.length; i++) {
            nodes.push(new Node(keys[i], values[i]));
          }
          return;
        }
      } else {
        keys = object.getKeys(heap);
        values = object.getValues(heap);
      }
      for (let i = 0; i < keys.length; i++) {
        this.insert(keys[i], values[i]);
      }
    }
    remove() {
      const nodes = this.nodes_;
      const count = nodes.length;
      const rootNode = nodes[0];
      if (count <= 0) {
        return undefined;
      } else if (count == 1) {
        nodes.length = 0;
      } else {
        nodes[0] = nodes.pop();
        this.moveDown_(0);
      }
      return rootNode.getValue();
    }
    peek() {
      const nodes = this.nodes_;
      if (nodes.length == 0) {
        return undefined;
      }
      return nodes[0].getValue();
    }
    peekKey() {
      return this.nodes_[0] && this.nodes_[0].getKey();
    }
    moveDown_(index) {
      const nodes = this.nodes_;
      const count = nodes.length;
      const node = nodes[index];
      while (index < count >> 1) {
        const leftChildIndex = this.getLeftChildIndex_(index);
        const rightChildIndex = this.getRightChildIndex_(index);
        const smallerChildIndex = rightChildIndex < count && nodes[rightChildIndex].getKey() < nodes[leftChildIndex].getKey() ? rightChildIndex : leftChildIndex;
        if (nodes[smallerChildIndex].getKey() > node.getKey()) {
          break;
        }
        nodes[index] = nodes[smallerChildIndex];
        index = smallerChildIndex;
      }
      nodes[index] = node;
    }
    moveUp_(index) {
      const nodes = this.nodes_;
      const node = nodes[index];
      while (index > 0) {
        const parentIndex = this.getParentIndex_(index);
        if (nodes[parentIndex].getKey() > node.getKey()) {
          nodes[index] = nodes[parentIndex];
          index = parentIndex;
        } else {
          break;
        }
      }
      nodes[index] = node;
    }
    getLeftChildIndex_(index) {
      return index * 2 + 1;
    }
    getRightChildIndex_(index) {
      return index * 2 + 2;
    }
    getParentIndex_(index) {
      return index - 1 >> 1;
    }
    getValues() {
      const nodes = this.nodes_;
      const rv = [];
      const l = nodes.length;
      for (let i = 0; i < l; i++) {
        rv.push(nodes[i].getValue());
      }
      return rv;
    }
    getKeys() {
      const nodes = this.nodes_;
      const rv = [];
      const l = nodes.length;
      for (let i = 0; i < l; i++) {
        rv.push(nodes[i].getKey());
      }
      return rv;
    }
    containsValue(val) {
      return this.nodes_.some(node => node.getValue() == val);
    }
    containsKey(key) {
      return this.nodes_.some(node => node.getKey() == key);
    }
    clone() {
      return new Heap(this);
    }
    getCount() {
      return this.nodes_.length;
    }
    isEmpty() {
      return this.nodes_.length === 0;
    }
    clear() {
      this.nodes_.length = 0;
    }
  }
  exports = Heap;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.structs.heap.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.structs.PriorityQueue");
  goog.module.declareLegacyNamespace();
  const Heap = goog.require("goog.structs.Heap");
  class PriorityQueue extends Heap {
    enqueue(priority, value) {
      this.insert(priority, value);
    }
    dequeue() {
      return this.remove();
    }
  }
  exports = PriorityQueue;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.structs.priorityqueue.js");

goog.provide("goog.structs.PriorityPool");
goog.require("goog.structs.Pool");
goog.require("goog.structs.PriorityQueue");
goog.structs.PriorityPool = function(opt_minCount, opt_maxCount) {
  this.delayTimeout_ = undefined;
  this.requestQueue_ = new goog.structs.PriorityQueue();
  goog.structs.Pool.call(this, opt_minCount, opt_maxCount);
};
goog.inherits(goog.structs.PriorityPool, goog.structs.Pool);
goog.structs.PriorityPool.DEFAULT_PRIORITY_ = 100;
goog.structs.PriorityPool.prototype.setDelay = function(delay) {
  goog.structs.PriorityPool.base(this, "setDelay", delay);
  if (this.lastAccess == null) {
    return;
  }
  goog.global.clearTimeout(this.delayTimeout_);
  this.delayTimeout_ = goog.global.setTimeout(goog.bind(this.handleQueueRequests_, this), this.delay + this.lastAccess - Date.now());
  this.handleQueueRequests_();
};
goog.structs.PriorityPool.prototype.getObject = function(opt_callback, opt_priority) {
  if (!opt_callback) {
    var result = goog.structs.PriorityPool.base(this, "getObject");
    if (result && this.delay) {
      this.delayTimeout_ = goog.global.setTimeout(goog.bind(this.handleQueueRequests_, this), this.delay);
    }
    return result;
  }
  var priority = opt_priority !== undefined ? opt_priority : goog.structs.PriorityPool.DEFAULT_PRIORITY_;
  this.requestQueue_.enqueue(priority, opt_callback);
  this.handleQueueRequests_();
  return undefined;
};
goog.structs.PriorityPool.prototype.handleQueueRequests_ = function() {
  var requestQueue = this.requestQueue_;
  while (requestQueue.getCount() > 0) {
    var obj = this.getObject();
    if (!obj) {
      return;
    } else {
      var requestCallback = requestQueue.dequeue();
      requestCallback.apply(this, [obj]);
    }
  }
};
goog.structs.PriorityPool.prototype.addFreeObject = function(obj) {
  goog.structs.PriorityPool.superClass_.addFreeObject.call(this, obj);
  this.handleQueueRequests_();
};
goog.structs.PriorityPool.prototype.adjustForMinMax = function() {
  goog.structs.PriorityPool.superClass_.adjustForMinMax.call(this);
  this.handleQueueRequests_();
};
goog.structs.PriorityPool.prototype.disposeInternal = function() {
  goog.structs.PriorityPool.superClass_.disposeInternal.call(this);
  goog.global.clearTimeout(this.delayTimeout_);
  this.requestQueue_.clear();
  this.requestQueue_ = null;
};

$CLJS.SHADOW_ENV.setLoaded("goog.structs.prioritypool.js");

goog.provide("goog.net.XhrIoPool");
goog.require("goog.net.XhrIo");
goog.require("goog.structs.PriorityPool");
goog.requireType("goog.structs.Map");
goog.net.XhrIoPool = function(opt_headers, opt_minCount, opt_maxCount, opt_withCredentials) {
  this.headers_ = opt_headers;
  this.withCredentials_ = !!opt_withCredentials;
  goog.structs.PriorityPool.call(this, opt_minCount, opt_maxCount);
};
goog.inherits(goog.net.XhrIoPool, goog.structs.PriorityPool);
goog.net.XhrIoPool.prototype.createObject = function() {
  const xhrIo = new goog.net.XhrIo();
  const headers = this.headers_;
  if (headers) {
    headers.forEach(function(value, key) {
      xhrIo.headers.set(key, value);
    });
  }
  if (this.withCredentials_) {
    xhrIo.setWithCredentials(true);
  }
  return xhrIo;
};
goog.net.XhrIoPool.prototype.objectCanBeReused = function(obj) {
  const xhr = obj;
  return !xhr.isDisposed() && !xhr.isActive();
};

$CLJS.SHADOW_ENV.setLoaded("goog.net.xhriopool.js");

goog.provide("goog.net.XhrManager");
goog.provide("goog.net.XhrManager.Event");
goog.provide("goog.net.XhrManager.Request");
goog.require("goog.events");
goog.require("goog.events.Event");
goog.require("goog.events.EventHandler");
goog.require("goog.events.EventTarget");
goog.require("goog.net.ErrorCode");
goog.require("goog.net.EventType");
goog.require("goog.net.XhrIo");
goog.require("goog.net.XhrIoPool");
goog.require("goog.structs.Map");
goog.net.XhrManager = function(opt_maxRetries, opt_headers, opt_minCount, opt_maxCount, opt_timeoutInterval, opt_withCredentials) {
  goog.net.XhrManager.base(this, "constructor");
  this.maxRetries_ = opt_maxRetries !== undefined ? opt_maxRetries : 1;
  this.timeoutInterval_ = opt_timeoutInterval !== undefined ? Math.max(0, opt_timeoutInterval) : 0;
  this.withCredentials_ = !!opt_withCredentials;
  this.xhrPool_ = new goog.net.XhrIoPool(opt_headers, opt_minCount, opt_maxCount, opt_withCredentials);
  this.requests_ = new goog.structs.Map();
  this.eventHandler_ = new goog.events.EventHandler(this);
};
goog.inherits(goog.net.XhrManager, goog.events.EventTarget);
goog.net.XhrManager.ERROR_ID_IN_USE_ = "[goog.net.XhrManager] ID in use";
goog.net.XhrManager.XHR_EVENT_TYPES_ = [goog.net.EventType.READY, goog.net.EventType.COMPLETE, goog.net.EventType.SUCCESS, goog.net.EventType.ERROR, goog.net.EventType.ABORT, goog.net.EventType.TIMEOUT,];
goog.net.XhrManager.prototype.setTimeoutInterval = function(ms) {
  this.timeoutInterval_ = Math.max(0, ms);
};
goog.net.XhrManager.prototype.getOutstandingCount = function() {
  return this.requests_.getCount();
};
goog.net.XhrManager.prototype.getOutstandingRequestIds = function() {
  return this.requests_.getKeys();
};
goog.net.XhrManager.prototype.send = function(id, url, opt_method, opt_content, opt_headers, opt_priority, opt_callback, opt_maxRetries, opt_responseType, opt_withCredentials) {
  const requests = this.requests_;
  if (requests.get(id)) {
    throw new Error(goog.net.XhrManager.ERROR_ID_IN_USE_);
  }
  const request = new goog.net.XhrManager.Request(url, goog.bind(this.handleEvent_, this, id), opt_method, opt_content, opt_headers, opt_callback, opt_maxRetries !== undefined ? opt_maxRetries : this.maxRetries_, opt_responseType, opt_withCredentials !== undefined ? opt_withCredentials : this.withCredentials_);
  this.requests_.set(id, request);
  const callback = goog.bind(this.handleAvailableXhr_, this, id);
  this.xhrPool_.getObject(callback, opt_priority);
  return request;
};
goog.net.XhrManager.prototype.abort = function(id, opt_force) {
  const request = this.requests_.get(id);
  if (request) {
    const xhrIo = request.xhrIo;
    request.setAborted(true);
    if (opt_force) {
      if (xhrIo) {
        this.removeXhrListener_(xhrIo, request.getXhrEventCallback());
        goog.events.listenOnce(xhrIo, goog.net.EventType.READY, function() {
          this.xhrPool_.releaseObject(xhrIo);
        }, false, this);
      }
      this.requests_.remove(id);
    }
    if (xhrIo) {
      xhrIo.abort();
    }
  }
};
goog.net.XhrManager.prototype.setXhrPoolForTesting = function(testingPool) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw new Error("Importing test-only code into non-debug environment: setXhrPoolForTesting");
  }
  this.xhrPool_ = testingPool;
};
goog.net.XhrManager.prototype.handleAvailableXhr_ = function(id, xhrIo) {
  const request = this.requests_.get(id);
  if (request && !request.xhrIo) {
    this.addXhrListener_(xhrIo, request.getXhrEventCallback());
    xhrIo.setTimeoutInterval(this.timeoutInterval_);
    xhrIo.setResponseType(request.getResponseType());
    xhrIo.setWithCredentials(request.getWithCredentials());
    request.xhrIo = xhrIo;
    this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.READY, this, id, xhrIo));
    this.retry_(id, xhrIo);
    if (request.getAborted()) {
      xhrIo.abort();
    }
  } else {
    this.xhrPool_.releaseObject(xhrIo);
  }
};
goog.net.XhrManager.prototype.handleEvent_ = function(id, e) {
  const xhrIo = e.target;
  switch(e.type) {
    case goog.net.EventType.READY:
      this.retry_(id, xhrIo);
      break;
    case goog.net.EventType.COMPLETE:
      return this.handleComplete_(id, xhrIo, e);
    case goog.net.EventType.SUCCESS:
      this.handleSuccess_(id, xhrIo);
      break;
    case goog.net.EventType.TIMEOUT:
    case goog.net.EventType.ERROR:
      this.handleError_(id, xhrIo);
      break;
    case goog.net.EventType.ABORT:
      this.handleAbort_(id, xhrIo);
      break;
  }
  return null;
};
goog.net.XhrManager.prototype.retry_ = function(id, xhrIo) {
  const request = this.requests_.get(id);
  if (request && !request.getCompleted() && !request.hasReachedMaxRetries()) {
    request.increaseAttemptCount();
    xhrIo.send(request.getUrl(), request.getMethod(), request.getContent(), request.getHeaders());
  } else {
    if (request) {
      this.removeXhrListener_(xhrIo, request.getXhrEventCallback());
      this.requests_.remove(id);
    }
    this.xhrPool_.releaseObject(xhrIo);
  }
};
goog.net.XhrManager.prototype.handleComplete_ = function(id, xhrIo, e) {
  const request = this.requests_.get(id);
  if (xhrIo.getLastErrorCode() == goog.net.ErrorCode.ABORT || xhrIo.isSuccess() || request.hasReachedMaxRetries()) {
    this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.COMPLETE, this, id, xhrIo));
    if (request) {
      request.setCompleted(true);
      if (request.getCompleteCallback()) {
        return request.getCompleteCallback().call(xhrIo, e);
      }
    }
  }
  return null;
};
goog.net.XhrManager.prototype.handleAbort_ = function(id, xhrIo) {
  this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.ABORT, this, id, xhrIo));
};
goog.net.XhrManager.prototype.handleSuccess_ = function(id, xhrIo) {
  this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.SUCCESS, this, id, xhrIo));
};
goog.net.XhrManager.prototype.handleError_ = function(id, xhrIo) {
  const request = this.requests_.get(id);
  if (request.hasReachedMaxRetries()) {
    this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.ERROR, this, id, xhrIo));
  }
};
goog.net.XhrManager.prototype.removeXhrListener_ = function(xhrIo, func, opt_types) {
  const types = opt_types || goog.net.XhrManager.XHR_EVENT_TYPES_;
  this.eventHandler_.unlisten(xhrIo, types, func);
};
goog.net.XhrManager.prototype.addXhrListener_ = function(xhrIo, func, opt_types) {
  const types = opt_types || goog.net.XhrManager.XHR_EVENT_TYPES_;
  this.eventHandler_.listen(xhrIo, types, func);
};
goog.net.XhrManager.prototype.disposeInternal = function() {
  goog.net.XhrManager.superClass_.disposeInternal.call(this);
  this.xhrPool_.dispose();
  this.xhrPool_ = null;
  this.eventHandler_.dispose();
  this.eventHandler_ = null;
  this.requests_.clear();
  this.requests_ = null;
};
goog.net.XhrManager.Event = function(type, target, id, xhrIo) {
  goog.events.Event.call(this, type, target);
  this.id = id;
  this.xhrIo = xhrIo;
};
goog.inherits(goog.net.XhrManager.Event, goog.events.Event);
goog.net.XhrManager.Request = function(url, xhrEventCallback, opt_method, opt_content, opt_headers, opt_callback, opt_maxRetries, opt_responseType, opt_withCredentials) {
  this.url_ = url;
  this.method_ = opt_method || "GET";
  this.content_ = opt_content;
  this.headers_ = opt_headers || null;
  this.maxRetries_ = opt_maxRetries !== undefined ? opt_maxRetries : 1;
  this.attemptCount_ = 0;
  this.completed_ = false;
  this.aborted_ = false;
  this.xhrEventCallback_ = xhrEventCallback;
  this.completeCallback_ = opt_callback;
  this.responseType_ = opt_responseType || goog.net.XhrIo.ResponseType.DEFAULT;
  this.withCredentials_ = !!opt_withCredentials;
  this.xhrIo = null;
};
goog.net.XhrManager.Request.prototype.getUrl = function() {
  return this.url_;
};
goog.net.XhrManager.Request.prototype.getMethod = function() {
  return this.method_;
};
goog.net.XhrManager.Request.prototype.getContent = function() {
  return this.content_;
};
goog.net.XhrManager.Request.prototype.getHeaders = function() {
  return this.headers_;
};
goog.net.XhrManager.Request.prototype.getWithCredentials = function() {
  return this.withCredentials_;
};
goog.net.XhrManager.Request.prototype.getMaxRetries = function() {
  return this.maxRetries_;
};
goog.net.XhrManager.Request.prototype.getAttemptCount = function() {
  return this.attemptCount_;
};
goog.net.XhrManager.Request.prototype.increaseAttemptCount = function() {
  this.attemptCount_++;
};
goog.net.XhrManager.Request.prototype.hasReachedMaxRetries = function() {
  return this.attemptCount_ > this.maxRetries_;
};
goog.net.XhrManager.Request.prototype.setCompleted = function(complete) {
  this.completed_ = complete;
};
goog.net.XhrManager.Request.prototype.getCompleted = function() {
  return this.completed_;
};
goog.net.XhrManager.Request.prototype.setAborted = function(aborted) {
  this.aborted_ = aborted;
};
goog.net.XhrManager.Request.prototype.getAborted = function() {
  return this.aborted_;
};
goog.net.XhrManager.Request.prototype.getXhrEventCallback = function() {
  return this.xhrEventCallback_;
};
goog.net.XhrManager.Request.prototype.getCompleteCallback = function() {
  return this.completeCallback_;
};
goog.net.XhrManager.Request.prototype.getResponseType = function() {
  return this.responseType_;
};

$CLJS.SHADOW_ENV.setLoaded("goog.net.xhrmanager.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.i18n.cldrversion");
  goog.module.declareLegacyNamespace();
  exports.USE_CLDR_NEXT = goog.define("goog.i18n.USE_CLDR_NEXT_FOR_TESTING_USE_ONLY_PLEASE_DO_NOT_USE_IN_PRODUCTION", false);
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.i18n.cldrversion.js");

goog.provide("goog.i18n.DateTimeSymbols");
goog.provide("goog.i18n.DateTimeSymbolsType");
goog.provide("goog.i18n.DateTimeSymbols_af");
goog.provide("goog.i18n.DateTimeSymbols_am");
goog.provide("goog.i18n.DateTimeSymbols_ar");
goog.provide("goog.i18n.DateTimeSymbols_ar_DZ");
goog.provide("goog.i18n.DateTimeSymbols_ar_EG");
goog.provide("goog.i18n.DateTimeSymbols_az");
goog.provide("goog.i18n.DateTimeSymbols_be");
goog.provide("goog.i18n.DateTimeSymbols_bg");
goog.provide("goog.i18n.DateTimeSymbols_bn");
goog.provide("goog.i18n.DateTimeSymbols_br");
goog.provide("goog.i18n.DateTimeSymbols_bs");
goog.provide("goog.i18n.DateTimeSymbols_ca");
goog.provide("goog.i18n.DateTimeSymbols_chr");
goog.provide("goog.i18n.DateTimeSymbols_cs");
goog.provide("goog.i18n.DateTimeSymbols_cy");
goog.provide("goog.i18n.DateTimeSymbols_da");
goog.provide("goog.i18n.DateTimeSymbols_de");
goog.provide("goog.i18n.DateTimeSymbols_de_AT");
goog.provide("goog.i18n.DateTimeSymbols_de_CH");
goog.provide("goog.i18n.DateTimeSymbols_el");
goog.provide("goog.i18n.DateTimeSymbols_en");
goog.provide("goog.i18n.DateTimeSymbols_en_AU");
goog.provide("goog.i18n.DateTimeSymbols_en_CA");
goog.provide("goog.i18n.DateTimeSymbols_en_GB");
goog.provide("goog.i18n.DateTimeSymbols_en_IE");
goog.provide("goog.i18n.DateTimeSymbols_en_IN");
goog.provide("goog.i18n.DateTimeSymbols_en_ISO");
goog.provide("goog.i18n.DateTimeSymbols_en_SG");
goog.provide("goog.i18n.DateTimeSymbols_en_US");
goog.provide("goog.i18n.DateTimeSymbols_en_ZA");
goog.provide("goog.i18n.DateTimeSymbols_es");
goog.provide("goog.i18n.DateTimeSymbols_es_419");
goog.provide("goog.i18n.DateTimeSymbols_es_ES");
goog.provide("goog.i18n.DateTimeSymbols_es_MX");
goog.provide("goog.i18n.DateTimeSymbols_es_US");
goog.provide("goog.i18n.DateTimeSymbols_et");
goog.provide("goog.i18n.DateTimeSymbols_eu");
goog.provide("goog.i18n.DateTimeSymbols_fa");
goog.provide("goog.i18n.DateTimeSymbols_fi");
goog.provide("goog.i18n.DateTimeSymbols_fil");
goog.provide("goog.i18n.DateTimeSymbols_fr");
goog.provide("goog.i18n.DateTimeSymbols_fr_CA");
goog.provide("goog.i18n.DateTimeSymbols_ga");
goog.provide("goog.i18n.DateTimeSymbols_gl");
goog.provide("goog.i18n.DateTimeSymbols_gsw");
goog.provide("goog.i18n.DateTimeSymbols_gu");
goog.provide("goog.i18n.DateTimeSymbols_haw");
goog.provide("goog.i18n.DateTimeSymbols_he");
goog.provide("goog.i18n.DateTimeSymbols_hi");
goog.provide("goog.i18n.DateTimeSymbols_hr");
goog.provide("goog.i18n.DateTimeSymbols_hu");
goog.provide("goog.i18n.DateTimeSymbols_hy");
goog.provide("goog.i18n.DateTimeSymbols_id");
goog.provide("goog.i18n.DateTimeSymbols_in");
goog.provide("goog.i18n.DateTimeSymbols_is");
goog.provide("goog.i18n.DateTimeSymbols_it");
goog.provide("goog.i18n.DateTimeSymbols_iw");
goog.provide("goog.i18n.DateTimeSymbols_ja");
goog.provide("goog.i18n.DateTimeSymbols_ka");
goog.provide("goog.i18n.DateTimeSymbols_kk");
goog.provide("goog.i18n.DateTimeSymbols_km");
goog.provide("goog.i18n.DateTimeSymbols_kn");
goog.provide("goog.i18n.DateTimeSymbols_ko");
goog.provide("goog.i18n.DateTimeSymbols_ky");
goog.provide("goog.i18n.DateTimeSymbols_ln");
goog.provide("goog.i18n.DateTimeSymbols_lo");
goog.provide("goog.i18n.DateTimeSymbols_lt");
goog.provide("goog.i18n.DateTimeSymbols_lv");
goog.provide("goog.i18n.DateTimeSymbols_mk");
goog.provide("goog.i18n.DateTimeSymbols_ml");
goog.provide("goog.i18n.DateTimeSymbols_mn");
goog.provide("goog.i18n.DateTimeSymbols_mo");
goog.provide("goog.i18n.DateTimeSymbols_mr");
goog.provide("goog.i18n.DateTimeSymbols_ms");
goog.provide("goog.i18n.DateTimeSymbols_mt");
goog.provide("goog.i18n.DateTimeSymbols_my");
goog.provide("goog.i18n.DateTimeSymbols_nb");
goog.provide("goog.i18n.DateTimeSymbols_ne");
goog.provide("goog.i18n.DateTimeSymbols_nl");
goog.provide("goog.i18n.DateTimeSymbols_no");
goog.provide("goog.i18n.DateTimeSymbols_no_NO");
goog.provide("goog.i18n.DateTimeSymbols_or");
goog.provide("goog.i18n.DateTimeSymbols_pa");
goog.provide("goog.i18n.DateTimeSymbols_pl");
goog.provide("goog.i18n.DateTimeSymbols_pt");
goog.provide("goog.i18n.DateTimeSymbols_pt_BR");
goog.provide("goog.i18n.DateTimeSymbols_pt_PT");
goog.provide("goog.i18n.DateTimeSymbols_ro");
goog.provide("goog.i18n.DateTimeSymbols_ru");
goog.provide("goog.i18n.DateTimeSymbols_sh");
goog.provide("goog.i18n.DateTimeSymbols_si");
goog.provide("goog.i18n.DateTimeSymbols_sk");
goog.provide("goog.i18n.DateTimeSymbols_sl");
goog.provide("goog.i18n.DateTimeSymbols_sq");
goog.provide("goog.i18n.DateTimeSymbols_sr");
goog.provide("goog.i18n.DateTimeSymbols_sr_Latn");
goog.provide("goog.i18n.DateTimeSymbols_sv");
goog.provide("goog.i18n.DateTimeSymbols_sw");
goog.provide("goog.i18n.DateTimeSymbols_ta");
goog.provide("goog.i18n.DateTimeSymbols_te");
goog.provide("goog.i18n.DateTimeSymbols_th");
goog.provide("goog.i18n.DateTimeSymbols_tl");
goog.provide("goog.i18n.DateTimeSymbols_tr");
goog.provide("goog.i18n.DateTimeSymbols_uk");
goog.provide("goog.i18n.DateTimeSymbols_ur");
goog.provide("goog.i18n.DateTimeSymbols_uz");
goog.provide("goog.i18n.DateTimeSymbols_vi");
goog.provide("goog.i18n.DateTimeSymbols_zh");
goog.provide("goog.i18n.DateTimeSymbols_zh_CN");
goog.provide("goog.i18n.DateTimeSymbols_zh_HK");
goog.provide("goog.i18n.DateTimeSymbols_zh_TW");
goog.provide("goog.i18n.DateTimeSymbols_zu");
goog.require("goog.i18n.cldrversion");
goog.i18n.DateTimeSymbols_en_ISO = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, y MMMM dd", "y MMMM d", "y MMM d", "yyyy-MM-dd"], TIMEFORMATS:["HH:mm:ss v", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], AVAILABLEFORMATS:{"Md":"M/d", 
"MMMMd":"MMMM d", "MMMd":"MMM d"}, FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_af = {ERAS:["v.C.", "n.C."], ERANAMES:["voor Christus", "na Christus"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember"], STANDALONEMONTHS:["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", 
"Oktober", "November", "Desember"], SHORTMONTHS:["Jan.", "Feb.", "Mrt.", "Apr.", "Mei", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Des."], STANDALONESHORTMONTHS:["Jan.", "Feb.", "Mrt.", "Apr.", "Mei", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Des."], WEEKDAYS:["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"], STANDALONEWEEKDAYS:["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"], SHORTWEEKDAYS:["So.", "Ma.", "Di.", "Wo.", "Do.", 
"Vr.", "Sa."], STANDALONESHORTWEEKDAYS:["So.", "Ma.", "Di.", "Wo.", "Do.", "Vr.", "Sa."], NARROWWEEKDAYS:["S", "M", "D", "W", "D", "V", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "D", "W", "D", "V", "S"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["1ste kwartaal", "2de kwartaal", "3de kwartaal", "4de kwartaal"], AMPMS:["vm.", "nm."], DATEFORMATS:["EEEE dd MMMM y", "dd MMMM y", "dd MMM y", "y-MM-dd"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'om' {0}", 
"{1} 'om' {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_am = {ERAS:["ዓ/ዓ", "ዓ/ም"], ERANAMES:["ዓመተ ዓለም", "ዓመተ ምሕረት"], NARROWMONTHS:["ጃ", "ፌ", "ማ", "ኤ", "ሜ", "ጁ", "ጁ", "ኦ", "ሴ", "ኦ", "ኖ", "ዲ"], STANDALONENARROWMONTHS:["ጃ", "ፌ", "ማ", "ኤ", "ሜ", "ጁ", "ጁ", "ኦ", "ሴ", "ኦ", "ኖ", "ዲ"], MONTHS:["ጃንዩወሪ", "ፌብሩወሪ", "ማርች", "ኤፕሪል", "ሜይ", "ጁን", "ጁላይ", "ኦገስት", "ሴፕቴምበር", "ኦክቶበር", "ኖቬምበር", "ዲሴምበር"], STANDALONEMONTHS:["ጃንዩወሪ", "ፌብሩወሪ", "ማርች", "ኤፕሪል", "ሜይ", "ጁን", "ጁላይ", "ኦገስት", "ሴፕቴምበር", "ኦክቶበር", "ኖቬምበር", "ዲሴምበር"], SHORTMONTHS:["ጃንዩ", "ፌብሩ", "ማርች", 
"ኤፕሪ", "ሜይ", "ጁን", "ጁላይ", "ኦገስ", "ሴፕቴ", "ኦክቶ", "ኖቬም", "ዲሴም"], STANDALONESHORTMONTHS:["ጃንዩ", "ፌብሩ", "ማርች", "ኤፕሪ", "ሜይ", "ጁን", "ጁላይ", "ኦገስ", "ሴፕቴ", "ኦክቶ", "ኖቬም", "ዲሴም"], WEEKDAYS:["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"], STANDALONEWEEKDAYS:["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"], SHORTWEEKDAYS:["እሑድ", "ሰኞ", "ማክሰ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"], STANDALONESHORTWEEKDAYS:["እሑድ", "ሰኞ", "ማክሰ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"], NARROWWEEKDAYS:["እ", "ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ"], STANDALONENARROWWEEKDAYS:["እ", 
"ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ"], SHORTQUARTERS:["ሩብ1", "ሩብ2", "ሩብ3", "ሩብ4"], QUARTERS:["1ኛው ሩብ", "2ኛው ሩብ", "3ኛው ሩብ", "4ኛው ሩብ"], AMPMS:["ጥዋት", "ከሰዓት"], DATEFORMATS:["y MMMM d, EEEE", "d MMMM y", "d MMM y", "dd/MM/y"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_ar = {ERAS:["ق.م", "م"], ERANAMES:["قبل الميلاد", "ميلادي"], NARROWMONTHS:["ي", "ف", "م", "أ", "و", "ن", "ل", "غ", "س", "ك", "ب", "د"], STANDALONENARROWMONTHS:["ي", "ف", "م", "أ", "و", "ن", "ل", "غ", "س", "ك", "ب", "د"], MONTHS:["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], STANDALONEMONTHS:["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], SHORTMONTHS:["يناير", 
"فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], STANDALONESHORTMONTHS:["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], WEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], STANDALONEWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], SHORTWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], 
STANDALONESHORTWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], NARROWWEEKDAYS:["ح", "ن", "ث", "ر", "خ", "ج", "س"], STANDALONENARROWWEEKDAYS:["ح", "ن", "ث", "ر", "خ", "ج", "س"], SHORTQUARTERS:["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"], QUARTERS:["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"], AMPMS:["ص", "م"], DATEFORMATS:["EEEE، d MMMM y", "d MMMM y", "dd‏/MM‏/y", "d‏/M‏/y"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", 
"h:mm a"], DATETIMEFORMATS:["{1} في {0}", "{1} في {0}", "{1}، {0}", "{1}، {0}"], FIRSTDAYOFWEEK:5, WEEKENDRANGE:[4, 5], FIRSTWEEKCUTOFFDAY:4};
goog.i18n.DateTimeSymbols_ar_DZ = {ERAS:["ق.م", "م"], ERANAMES:["قبل الميلاد", "ميلادي"], NARROWMONTHS:["ج", "ف", "م", "أ", "م", "ج", "ج", "أ", "س", "أ", "ن", "د"], STANDALONENARROWMONTHS:["ج", "ف", "م", "أ", "م", "ج", "ج", "أ", "س", "أ", "ن", "د"], MONTHS:["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], STANDALONEMONTHS:["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], SHORTMONTHS:["جانفي", 
"فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], STANDALONESHORTMONTHS:["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], WEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], STANDALONEWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], SHORTWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], STANDALONESHORTWEEKDAYS:["الأحد", 
"الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], NARROWWEEKDAYS:["ح", "ن", "ث", "ر", "خ", "ج", "س"], STANDALONENARROWWEEKDAYS:["ح", "ن", "ث", "ر", "خ", "ج", "س"], SHORTQUARTERS:["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"], QUARTERS:["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"], AMPMS:["ص", "م"], DATEFORMATS:["EEEE، d MMMM y", "d MMMM y", "dd‏/MM‏/y", "d‏/M‏/y"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} في {0}", 
"{1} في {0}", "{1}، {0}", "{1}، {0}"], FIRSTDAYOFWEEK:5, WEEKENDRANGE:[4, 5], FIRSTWEEKCUTOFFDAY:4};
goog.i18n.DateTimeSymbols_ar_EG = {ZERODIGIT:1632, ERAS:["ق.م", "م"], ERANAMES:["قبل الميلاد", "ميلادي"], NARROWMONTHS:["ي", "ف", "م", "أ", "و", "ن", "ل", "غ", "س", "ك", "ب", "د"], STANDALONENARROWMONTHS:["ي", "ف", "م", "أ", "و", "ن", "ل", "غ", "س", "ك", "ب", "د"], MONTHS:["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], STANDALONEMONTHS:["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", 
"ديسمبر"], SHORTMONTHS:["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], STANDALONESHORTMONTHS:["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], WEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], STANDALONEWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], SHORTWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", 
"الخميس", "الجمعة", "السبت"], STANDALONESHORTWEEKDAYS:["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], NARROWWEEKDAYS:["ح", "ن", "ث", "ر", "خ", "ج", "س"], STANDALONENARROWWEEKDAYS:["ح", "ن", "ث", "ر", "خ", "ج", "س"], SHORTQUARTERS:["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"], QUARTERS:["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"], AMPMS:["ص", "م"], DATEFORMATS:["EEEE، d MMMM y", "d MMMM y", "dd‏/MM‏/y", "d‏/M‏/y"], TIMEFORMATS:["h:mm:ss a zzzz", 
"h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} في {0}", "{1} في {0}", "{1}، {0}", "{1}، {0}"], FIRSTDAYOFWEEK:5, WEEKENDRANGE:[4, 5], FIRSTWEEKCUTOFFDAY:4};
goog.i18n.DateTimeSymbols_az = {ERAS:["e.ə.", "y.e."], ERANAMES:["eramızdan əvvəl", "yeni era"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"], STANDALONEMONTHS:["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", 
"dekabr"], SHORTMONTHS:["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avq", "sen", "okt", "noy", "dek"], STANDALONESHORTMONTHS:["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avq", "sen", "okt", "noy", "dek"], WEEKDAYS:["bazar", "bazar ertəsi", "çərşənbə axşamı", "çərşənbə", "cümə axşamı", "cümə", "şənbə"], STANDALONEWEEKDAYS:["bazar", "bazar ertəsi", "çərşənbə axşamı", "çərşənbə", "cümə axşamı", "cümə", "şənbə"], SHORTWEEKDAYS:["B.", "B.e.", "Ç.a.", "Ç.", "C.a.", "C.", "Ş."], STANDALONESHORTWEEKDAYS:["B.", 
"B.E.", "Ç.A.", "Ç.", "C.A.", "C.", "Ş."], NARROWWEEKDAYS:["7", "1", "2", "3", "4", "5", "6"], STANDALONENARROWWEEKDAYS:["7", "1", "2", "3", "4", "5", "6"], SHORTQUARTERS:["1-ci kv.", "2-ci kv.", "3-cü kv.", "4-cü kv."], QUARTERS:["1-ci kvartal", "2-ci kvartal", "3-cü kvartal", "4-cü kvartal"], AMPMS:["AM", "PM"], DATEFORMATS:["d MMMM y, EEEE", "d MMMM y", "d MMM y", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}/{0}", "{1} 'at' {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_be = {ERAS:["да н.э.", "н.э."], ERANAMES:["да нараджэння Хрыстова", "ад нараджэння Хрыстова"], NARROWMONTHS:["с", "л", "с", "к", "м", "ч", "л", "ж", "в", "к", "л", "с"], STANDALONENARROWMONTHS:["с", "л", "с", "к", "м", "ч", "л", "ж", "в", "к", "л", "с"], MONTHS:["студзеня", "лютага", "сакавіка", "красавіка", "мая", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня"], STANDALONEMONTHS:["студзень", "люты", "сакавік", "красавік", "май", "чэрвень", 
"ліпень", "жнівень", "верасень", "кастрычнік", "лістапад", "снежань"], SHORTMONTHS:["сту", "лют", "сак", "кра", "мая", "чэр", "ліп", "жні", "вер", "кас", "ліс", "сне"], STANDALONESHORTMONTHS:["сту", "лют", "сак", "кра", "май", "чэр", "ліп", "жні", "вер", "кас", "ліс", "сне"], WEEKDAYS:["нядзеля", "панядзелак", "аўторак", "серада", "чацвер", "пятніца", "субота"], STANDALONEWEEKDAYS:["нядзеля", "панядзелак", "аўторак", "серада", "чацвер", "пятніца", "субота"], SHORTWEEKDAYS:["нд", "пн", "аў", "ср", 
"чц", "пт", "сб"], STANDALONESHORTWEEKDAYS:["нд", "пн", "аў", "ср", "чц", "пт", "сб"], NARROWWEEKDAYS:["н", "п", "а", "с", "ч", "п", "с"], STANDALONENARROWWEEKDAYS:["н", "п", "а", "с", "ч", "п", "с"], SHORTQUARTERS:["1-шы кв.", "2-гі кв.", "3-ці кв.", "4-ты кв."], QUARTERS:["1-шы квартал", "2-гі квартал", "3-ці квартал", "4-ты квартал"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM y 'г'.", "d MMMM y 'г'.", "d MMM y 'г'.", "d.MM.yy"], TIMEFORMATS:["HH:mm:ss, zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], 
DATETIMEFORMATS:["{1} 'у' {0}", "{1} 'у' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_bg = {ERAS:["пр.Хр.", "сл.Хр."], ERANAMES:["преди Христа", "след Христа"], NARROWMONTHS:["я", "ф", "м", "а", "м", "ю", "ю", "а", "с", "о", "н", "д"], STANDALONENARROWMONTHS:["я", "ф", "м", "а", "м", "ю", "ю", "а", "с", "о", "н", "д"], MONTHS:["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"], STANDALONEMONTHS:["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", 
"ноември", "декември"], SHORTMONTHS:["яну", "фев", "март", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"], STANDALONESHORTMONTHS:["яну", "фев", "март", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"], WEEKDAYS:["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"], STANDALONEWEEKDAYS:["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"], SHORTWEEKDAYS:["нд", "пн", "вт", "ср", "чт", "пт", "сб"], STANDALONESHORTWEEKDAYS:["нд", 
"пн", "вт", "ср", "чт", "пт", "сб"], NARROWWEEKDAYS:["н", "п", "в", "с", "ч", "п", "с"], STANDALONENARROWWEEKDAYS:["н", "п", "в", "с", "ч", "п", "с"], SHORTQUARTERS:["1. трим.", "2. трим.", "3. трим.", "4. трим."], QUARTERS:["1. тримесечие", "2. тримесечие", "3. тримесечие", "4. тримесечие"], AMPMS:["пр.об.", "сл.об."], DATEFORMATS:["EEEE, d MMMM y 'г'.", "d MMMM y 'г'.", "d.MM.y 'г'.", "d.MM.yy 'г'."], TIMEFORMATS:["H:mm:ss 'ч'. zzzz", "H:mm:ss 'ч'. z", "H:mm:ss 'ч'.", "H:mm 'ч'."], DATETIMEFORMATS:["{1} 'в' {0}", 
"{1} 'в' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_bn = {ZERODIGIT:2534, ERAS:["খ্রিস্টপূর্ব", "খৃষ্টাব্দ"], ERANAMES:["খ্রিস্টপূর্ব", "খ্রীষ্টাব্দ"], NARROWMONTHS:["জা", "ফে", "মা", "এ", "মে", "জুন", "জু", "আ", "সে", "অ", "ন", "ডি"], STANDALONENARROWMONTHS:["জা", "ফে", "মা", "এ", "মে", "জুন", "জু", "আ", "সে", "অ", "ন", "ডি"], MONTHS:["জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"], STANDALONEMONTHS:["জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", 
"মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"], SHORTMONTHS:["জানু", "ফেব", "মার্চ", "এপ্রি", "মে", "জুন", "জুল", "আগ", "সেপ", "অক্টো", "নভে", "ডিসে"], STANDALONESHORTMONTHS:["জানু", "ফেব", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"], WEEKDAYS:["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"], STANDALONEWEEKDAYS:["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"], 
SHORTWEEKDAYS:["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"], STANDALONESHORTWEEKDAYS:["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"], NARROWWEEKDAYS:["র", "সো", "ম", "বু", "বৃ", "শু", "শ"], STANDALONENARROWWEEKDAYS:["র", "সো", "ম", "বু", "বৃ", "শু", "শ"], SHORTQUARTERS:["ত্রৈমাসিক", "দ্বিতীয় ত্রৈমাসিক", "তৃতীয় ত্রৈমাসিক", "চতুর্থ ত্রৈমাসিক"], QUARTERS:["ত্রৈমাসিক", "দ্বিতীয় ত্রৈমাসিক", "তৃতীয় ত্রৈমাসিক", "চতুর্থ ত্রৈমাসিক"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM, y", 
"d MMMM, y", "d MMM, y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} এ {0}", "{1} এ {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_br = {ERAS:["a-raok J.K.", "goude J.K."], ERANAMES:["a-raok Jezuz-Krist", "goude Jezuz-Krist"], NARROWMONTHS:["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], STANDALONENARROWMONTHS:["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], MONTHS:["Genver", "Cʼhwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu"], STANDALONEMONTHS:["Genver", "Cʼhwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", 
"Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu"], SHORTMONTHS:["Gen.", "Cʼhwe.", "Meur.", "Ebr.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Kzu."], STANDALONESHORTMONTHS:["Gen.", "Cʼhwe.", "Meur.", "Ebr.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Kzu."], WEEKDAYS:["Sul", "Lun", "Meurzh", "Mercʼher", "Yaou", "Gwener", "Sadorn"], STANDALONEWEEKDAYS:["Sul", "Lun", "Meurzh", "Mercʼher", "Yaou", "Gwener", "Sadorn"], SHORTWEEKDAYS:["Sul", "Lun", "Meu.", "Mer.", "Yaou", 
"Gwe.", "Sad."], STANDALONESHORTWEEKDAYS:["Sul", "Lun", "Meu.", "Mer.", "Yaou", "Gwe.", "Sad."], NARROWWEEKDAYS:["Su", "L", "Mz", "Mc", "Y", "G", "Sa"], STANDALONENARROWWEEKDAYS:["Su", "L", "Mz", "Mc", "Y", "G", "Sa"], SHORTQUARTERS:["1añ trim.", "2l trim.", "3e trim.", "4e trim."], QUARTERS:["1añ trimiziad", "2l trimiziad", "3e trimiziad", "4e trimiziad"], AMPMS:["A.M.", "G.M."], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", 
"HH:mm"], DATETIMEFORMATS:["{1} 'da' {0}", "{1} 'da' {0}", "{1}, {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_bs = {ERAS:["p. n. e.", "n. e."], ERANAMES:["prije nove ere", "nove ere"], NARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], STANDALONENARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], MONTHS:["januar", "februar", "mart", "april", "maj", "juni", "juli", "august", "septembar", "oktobar", "novembar", "decembar"], STANDALONEMONTHS:["januar", "februar", "mart", "april", "maj", "juni", "juli", "august", "septembar", "oktobar", 
"novembar", "decembar"], SHORTMONTHS:["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"], STANDALONESHORTMONTHS:["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"], WEEKDAYS:["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"], STANDALONEWEEKDAYS:["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"], SHORTWEEKDAYS:["ned", "pon", "uto", "sri", "čet", "pet", "sub"], STANDALONESHORTWEEKDAYS:["ned", 
"pon", "uto", "sri", "čet", "pet", "sub"], NARROWWEEKDAYS:["N", "P", "U", "S", "Č", "P", "S"], STANDALONENARROWWEEKDAYS:["n", "p", "u", "s", "č", "p", "s"], SHORTQUARTERS:["KV1", "KV2", "KV3", "KV4"], QUARTERS:["Prvi kvartal", "Drugi kvartal", "Treći kvartal", "Četvrti kvartal"], AMPMS:["prijepodne", "popodne"], DATEFORMATS:["EEEE, d. MMMM y.", "d. MMMM y.", "d. MMM y.", "d. M. y."], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'u' {0}", "{1} 'u' {0}", "{1} {0}", 
"{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_ca = {ERAS:["aC", "dC"], ERANAMES:["abans de Crist", "després de Crist"], NARROWMONTHS:["GN", "FB", "MÇ", "AB", "MG", "JN", "JL", "AG", "ST", "OC", "NV", "DS"], STANDALONENARROWMONTHS:["GN", "FB", "MÇ", "AB", "MG", "JN", "JL", "AG", "ST", "OC", "NV", "DS"], MONTHS:["de gener", "de febrer", "de març", "d’abril", "de maig", "de juny", "de juliol", "d’agost", "de setembre", "d’octubre", "de novembre", "de desembre"], STANDALONEMONTHS:["gener", "febrer", "març", "abril", "maig", 
"juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"], SHORTMONTHS:["de gen.", "de febr.", "de març", "d’abr.", "de maig", "de juny", "de jul.", "d’ag.", "de set.", "d’oct.", "de nov.", "de des."], STANDALONESHORTMONTHS:["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."], WEEKDAYS:["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"], STANDALONEWEEKDAYS:["diumenge", "dilluns", "dimarts", "dimecres", "dijous", 
"divendres", "dissabte"], SHORTWEEKDAYS:["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."], STANDALONESHORTWEEKDAYS:["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."], NARROWWEEKDAYS:["dg", "dl", "dt", "dc", "dj", "dv", "ds"], STANDALONENARROWWEEKDAYS:["dg", "dl", "dt", "dc", "dj", "dv", "ds"], SHORTQUARTERS:["1T", "2T", "3T", "4T"], QUARTERS:["1r trimestre", "2n trimestre", "3r trimestre", "4t trimestre"], AMPMS:["a. m.", "p. m."], DATEFORMATS:["EEEE, d MMMM 'de' y", "d MMMM 'de' y", "d MMM y", "d/M/yy"], 
TIMEFORMATS:["H:mm:ss (zzzz)", "H:mm:ss z", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1}, 'a' 'les' {0}", "{1}, 'a' 'les' {0}", "{1}, {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_chr = {ERAS:["BC", "AD"], ERANAMES:["ᏧᏓᎷᎸ ᎤᎷᎯᏍᏗ ᎦᎶᏁᏛ", "ᎠᏃ ᏙᎻᏂ"], NARROWMONTHS:["Ꭴ", "Ꭷ", "Ꭰ", "Ꭷ", "Ꭰ", "Ꮥ", "Ꭻ", "Ꭶ", "Ꮪ", "Ꮪ", "Ꮕ", "Ꭵ"], STANDALONENARROWMONTHS:["Ꭴ", "Ꭷ", "Ꭰ", "Ꭷ", "Ꭰ", "Ꮥ", "Ꭻ", "Ꭶ", "Ꮪ", "Ꮪ", "Ꮕ", "Ꭵ"], MONTHS:["ᎤᏃᎸᏔᏅ", "ᎧᎦᎵ", "ᎠᏅᏱ", "ᎧᏬᏂ", "ᎠᏂᏍᎬᏘ", "ᏕᎭᎷᏱ", "ᎫᏰᏉᏂ", "ᎦᎶᏂ", "ᏚᎵᏍᏗ", "ᏚᏂᏅᏗ", "ᏅᏓᏕᏆ", "ᎥᏍᎩᏱ"], STANDALONEMONTHS:["ᎤᏃᎸᏔᏅ", "ᎧᎦᎵ", "ᎠᏅᏱ", "ᎧᏬᏂ", "ᎠᏂᏍᎬᏘ", "ᏕᎭᎷᏱ", "ᎫᏰᏉᏂ", "ᎦᎶᏂ", "ᏚᎵᏍᏗ", "ᏚᏂᏅᏗ", "ᏅᏓᏕᏆ", "ᎥᏍᎩᏱ"], SHORTMONTHS:["ᎤᏃ", "ᎧᎦ", "ᎠᏅ", "ᎧᏬ", 
"ᎠᏂ", "ᏕᎭ", "ᎫᏰ", "ᎦᎶ", "ᏚᎵ", "ᏚᏂ", "ᏅᏓ", "ᎥᏍ"], STANDALONESHORTMONTHS:["ᎤᏃ", "ᎧᎦ", "ᎠᏅ", "ᎧᏬ", "ᎠᏂ", "ᏕᎭ", "ᎫᏰ", "ᎦᎶ", "ᏚᎵ", "ᏚᏂ", "ᏅᏓ", "ᎥᏍ"], WEEKDAYS:["ᎤᎾᏙᏓᏆᏍᎬ", "ᎤᎾᏙᏓᏉᏅᎯ", "ᏔᎵᏁᎢᎦ", "ᏦᎢᏁᎢᎦ", "ᏅᎩᏁᎢᎦ", "ᏧᎾᎩᎶᏍᏗ", "ᎤᎾᏙᏓᏈᏕᎾ"], STANDALONEWEEKDAYS:["ᎤᎾᏙᏓᏆᏍᎬ", "ᎤᎾᏙᏓᏉᏅᎯ", "ᏔᎵᏁᎢᎦ", "ᏦᎢᏁᎢᎦ", "ᏅᎩᏁᎢᎦ", "ᏧᎾᎩᎶᏍᏗ", "ᎤᎾᏙᏓᏈᏕᎾ"], SHORTWEEKDAYS:["ᏆᏍᎬ", "ᏉᏅᎯ", "ᏔᎵᏁ", "ᏦᎢᏁ", "ᏅᎩᏁ", "ᏧᎾᎩ", "ᏈᏕᎾ"], STANDALONESHORTWEEKDAYS:["ᏆᏍᎬ", "ᏉᏅᎯ", "ᏔᎵᏁ", "ᏦᎢᏁ", "ᏅᎩᏁ", "ᏧᎾᎩ", "ᏈᏕᎾ"], NARROWWEEKDAYS:["Ꮖ", "Ꮙ", "Ꮤ", "Ꮶ", "Ꮕ", "Ꮷ", 
"Ꭴ"], STANDALONENARROWWEEKDAYS:["Ꮖ", "Ꮙ", "Ꮤ", "Ꮶ", "Ꮕ", "Ꮷ", "Ꭴ"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st ᎩᏄᏙᏗ", "2nd ᎩᏄᏙᏗ", "3rd ᎩᏄᏙᏗ", "4th ᎩᏄᏙᏗ"], AMPMS:["ᏌᎾᎴ", "ᏒᎯᏱᎢᏗᏢ"], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} ᎤᎾᎢ {0}", "{1} ᎤᎾᎢ {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_cs = {ERAS:["př. n. l.", "n. l."], ERANAMES:["před naším letopočtem", "našeho letopočtu"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"], STANDALONEMONTHS:["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", 
"září", "říjen", "listopad", "prosinec"], SHORTMONTHS:["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"], STANDALONESHORTMONTHS:["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"], WEEKDAYS:["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"], STANDALONEWEEKDAYS:["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"], SHORTWEEKDAYS:["ne", "po", "út", "st", "čt", "pá", "so"], STANDALONESHORTWEEKDAYS:["ne", 
"po", "út", "st", "čt", "pá", "so"], NARROWWEEKDAYS:["N", "P", "Ú", "S", "Č", "P", "S"], STANDALONENARROWWEEKDAYS:["N", "P", "Ú", "S", "Č", "P", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1. čtvrtletí", "2. čtvrtletí", "3. čtvrtletí", "4. čtvrtletí"], AMPMS:["dop.", "odp."], DATEFORMATS:["EEEE d. MMMM y", "d. MMMM y", "d. M. y", "dd.MM.yy"], TIMEFORMATS:["H:mm:ss, zzzz", "H:mm:ss z", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1} 'v' {0}", "{1} 'v' {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_cy = {ERAS:["CC", "OC"], ERANAMES:["Cyn Crist", "Oed Crist"], NARROWMONTHS:["I", "Ch", "M", "E", "M", "M", "G", "A", "M", "H", "T", "Rh"], STANDALONENARROWMONTHS:["I", "Ch", "M", "E", "M", "M", "G", "A", "M", "H", "T", "Rh"], MONTHS:["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr"], STANDALONEMONTHS:["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", 
"Tachwedd", "Rhagfyr"], SHORTMONTHS:["Ion", "Chwef", "Maw", "Ebr", "Mai", "Meh", "Gorff", "Awst", "Medi", "Hyd", "Tach", "Rhag"], STANDALONESHORTMONTHS:["Ion", "Chw", "Maw", "Ebr", "Mai", "Meh", "Gor", "Awst", "Medi", "Hyd", "Tach", "Rhag"], WEEKDAYS:["Dydd Sul", "Dydd Llun", "Dydd Mawrth", "Dydd Mercher", "Dydd Iau", "Dydd Gwener", "Dydd Sadwrn"], STANDALONEWEEKDAYS:["Dydd Sul", "Dydd Llun", "Dydd Mawrth", "Dydd Mercher", "Dydd Iau", "Dydd Gwener", "Dydd Sadwrn"], SHORTWEEKDAYS:["Sul", "Llun", "Maw", 
"Mer", "Iau", "Gwen", "Sad"], STANDALONESHORTWEEKDAYS:["Sul", "Llun", "Maw", "Mer", "Iau", "Gwe", "Sad"], NARROWWEEKDAYS:["S", "Ll", "M", "M", "I", "G", "S"], STANDALONENARROWWEEKDAYS:["S", "Ll", "M", "M", "I", "G", "S"], SHORTQUARTERS:["Ch1", "Ch2", "Ch3", "Ch4"], QUARTERS:["chwarter 1af", "2il chwarter", "3ydd chwarter", "4ydd chwarter"], AMPMS:["yb", "yh"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "dd/MM/yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'am' {0}", 
"{1} 'am' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_da = {ERAS:["f.Kr.", "e.Kr."], ERANAMES:["før Kristus", "efter Kristus"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"], STANDALONEMONTHS:["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", 
"november", "december"], SHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."], STANDALONESHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."], WEEKDAYS:["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"], STANDALONEWEEKDAYS:["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"], SHORTWEEKDAYS:["søn.", "man.", "tirs.", "ons.", "tors.", "fre.", "lør."], 
STANDALONESHORTWEEKDAYS:["søn.", "man.", "tirs.", "ons.", "tors.", "fre.", "lør."], NARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], SHORTQUARTERS:["1. kvt.", "2. kvt.", "3. kvt.", "4. kvt."], QUARTERS:["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE 'den' d. MMMM y", "d. MMMM y", "d. MMM y", "dd.MM.y"], TIMEFORMATS:["HH.mm.ss zzzz", "HH.mm.ss z", "HH.mm.ss", "HH.mm"], DATETIMEFORMATS:["{1} 'kl'. {0}", 
"{1} 'kl'. {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_de = {ERAS:["v. Chr.", "n. Chr."], ERANAMES:["v. Chr.", "n. Chr."], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], STANDALONEMONTHS:["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", 
"Dezember"], SHORTMONTHS:["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."], STANDALONESHORTMONTHS:["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], WEEKDAYS:["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"], STANDALONEWEEKDAYS:["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"], SHORTWEEKDAYS:["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."], STANDALONESHORTWEEKDAYS:["So", 
"Mo", "Di", "Mi", "Do", "Fr", "Sa"], NARROWWEEKDAYS:["S", "M", "D", "M", "D", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "D", "M", "D", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d. MMMM y", "d. MMMM y", "dd.MM.y", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'um' {0}", "{1} 'um' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_de_AT = {ERAS:["v. Chr.", "n. Chr."], ERANAMES:["v. Chr.", "n. Chr."], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], STANDALONEMONTHS:["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", 
"Dezember"], SHORTMONTHS:["Jän.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."], STANDALONESHORTMONTHS:["Jän", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], WEEKDAYS:["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"], STANDALONEWEEKDAYS:["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"], SHORTWEEKDAYS:["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."], STANDALONESHORTWEEKDAYS:["So", 
"Mo", "Di", "Mi", "Do", "Fr", "Sa"], NARROWWEEKDAYS:["S", "M", "D", "M", "D", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "D", "M", "D", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d. MMMM y", "d. MMMM y", "dd.MM.y", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'um' {0}", "{1} 'um' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_de_CH = goog.i18n.DateTimeSymbols_de;
goog.i18n.DateTimeSymbols_el = {ERAS:["π.Χ.", "μ.Χ."], ERANAMES:["προ Χριστού", "μετά Χριστόν"], NARROWMONTHS:["Ι", "Φ", "Μ", "Α", "Μ", "Ι", "Ι", "Α", "Σ", "Ο", "Ν", "Δ"], STANDALONENARROWMONTHS:["Ι", "Φ", "Μ", "Α", "Μ", "Ι", "Ι", "Α", "Σ", "Ο", "Ν", "Δ"], MONTHS:["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"], STANDALONEMONTHS:["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", 
"Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], SHORTMONTHS:["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαΐ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"], STANDALONESHORTMONTHS:["Ιαν", "Φεβ", "Μάρ", "Απρ", "Μάι", "Ιούν", "Ιούλ", "Αύγ", "Σεπ", "Οκτ", "Νοέ", "Δεκ"], WEEKDAYS:["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"], STANDALONEWEEKDAYS:["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"], SHORTWEEKDAYS:["Κυρ", "Δευ", 
"Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"], STANDALONESHORTWEEKDAYS:["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"], NARROWWEEKDAYS:["Κ", "Δ", "Τ", "Τ", "Π", "Π", "Σ"], STANDALONENARROWWEEKDAYS:["Κ", "Δ", "Τ", "Τ", "Π", "Π", "Σ"], SHORTQUARTERS:["Τ1", "Τ2", "Τ3", "Τ4"], QUARTERS:["1ο τρίμηνο", "2ο τρίμηνο", "3ο τρίμηνο", "4ο τρίμηνο"], AMPMS:["π.μ.", "μ.μ."], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} στις {0}", 
"{1} στις {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_en = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_en_AU = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["Su.", "M.", "Tu.", "W.", "Th.", "F.", "Sa."], STANDALONENARROWWEEKDAYS:["Su.", "M.", "Tu.", "W.", "Th.", "F.", "Sa."], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["am", "pm"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_en_CA = {ERAS:["BC", "AD"], ERANAMES:["before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], 
FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_en_GB = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["am", "pm"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_en_IE = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_en_IN = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["am", "pm"], DATEFORMATS:["EEEE, d MMMM, y", "d MMMM y", "dd-MMM-y", "dd/MM/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], 
FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_en_SG = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["am", "pm"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_en_US = goog.i18n.DateTimeSymbols_en;
goog.i18n.DateTimeSymbols_en_ZA = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], STANDALONEMONTHS:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], WEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], STANDALONEWEEKDAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], SHORTWEEKDAYS:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], STANDALONESHORTWEEKDAYS:["Sun", 
"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], AMPMS:["am", "pm"], DATEFORMATS:["EEEE, dd MMMM y", "dd MMMM y", "dd MMM y", "y/MM/dd"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_es = {ERAS:["a. C.", "d. C."], ERANAMES:["antes de Cristo", "después de Cristo"], NARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"], STANDALONEMONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", 
"octubre", "noviembre", "diciembre"], SHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], STANDALONESHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], WEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], STANDALONEWEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], SHORTWEEKDAYS:["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], STANDALONESHORTWEEKDAYS:["dom", 
"lun", "mar", "mié", "jue", "vie", "sáb"], NARROWWEEKDAYS:["D", "L", "M", "X", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "X", "J", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1.er trimestre", "2.º trimestre", "3.er trimestre", "4.º trimestre"], AMPMS:["a. m.", "p. m."], DATEFORMATS:["EEEE, d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", "d MMM y", "d/M/yy"], TIMEFORMATS:["H:mm:ss (zzzz)", "H:mm:ss z", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_es_419 = {ERAS:["a.C.", "d.C."], ERANAMES:["antes de Cristo", "después de Cristo"], NARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"], STANDALONEMONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", 
"octubre", "noviembre", "diciembre"], SHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], STANDALONESHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], WEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], STANDALONEWEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], SHORTWEEKDAYS:["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], STANDALONESHORTWEEKDAYS:["dom", 
"lun", "mar", "mié", "jue", "vie", "sáb"], NARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1.º trimestre", "2.º trimestre", "3.º trimestre", "4.º trimestre"], AMPMS:["a. m.", "p. m."], DATEFORMATS:["EEEE, d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", "d MMM y", "d/M/yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_es_ES = goog.i18n.DateTimeSymbols_es;
goog.i18n.DateTimeSymbols_es_MX = {ERAS:["a.C.", "d.C."], ERANAMES:["antes de Cristo", "después de Cristo"], NARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"], STANDALONEMONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", 
"octubre", "noviembre", "diciembre"], SHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], STANDALONESHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], WEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], STANDALONEWEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], SHORTWEEKDAYS:["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], STANDALONESHORTWEEKDAYS:["dom", 
"lun", "mar", "mié", "jue", "vie", "sáb"], NARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1.er trimestre", "2.º trimestre", "3.er trimestre", "4.º trimestre"], AMPMS:["a. m.", "p. m."], DATEFORMATS:["EEEE, d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", "d MMM y", "dd/MM/yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_es_US = {ERAS:["a.C.", "d.C."], ERANAMES:["antes de Cristo", "después de Cristo"], NARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"], STANDALONEMONTHS:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", 
"octubre", "noviembre", "diciembre"], SHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], STANDALONESHORTMONTHS:["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], WEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], STANDALONEWEEKDAYS:["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], SHORTWEEKDAYS:["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], STANDALONESHORTWEEKDAYS:["dom", 
"lun", "mar", "mié", "jue", "vie", "sáb"], NARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1er trimestre", "2.º trimestre", "3.º trimestre", "4.º trimestre"], AMPMS:["a. m.", "p. m."], DATEFORMATS:["EEEE, d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", "d MMM y", "d/M/y"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_et = {ERAS:["eKr", "pKr"], ERANAMES:["enne Kristust", "pärast Kristust"], NARROWMONTHS:["J", "V", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "V", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"], STANDALONEMONTHS:["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", 
"oktoober", "november", "detsember"], SHORTMONTHS:["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets"], STANDALONESHORTMONTHS:["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets"], WEEKDAYS:["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"], STANDALONEWEEKDAYS:["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"], SHORTWEEKDAYS:["P", "E", "T", "K", 
"N", "R", "L"], STANDALONESHORTWEEKDAYS:["P", "E", "T", "K", "N", "R", "L"], NARROWWEEKDAYS:["P", "E", "T", "K", "N", "R", "L"], STANDALONENARROWWEEKDAYS:["P", "E", "T", "K", "N", "R", "L"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d. MMMM y", "d. MMMM y", "d. MMM y", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, 'kell' {0}", "{1}, 'kell' {0}", 
"{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_eu = {ERAS:["K.a.", "K.o."], ERANAMES:["K.a.", "Kristo ondoren"], NARROWMONTHS:["U", "O", "M", "A", "M", "E", "U", "A", "I", "U", "A", "A"], STANDALONENARROWMONTHS:["U", "O", "M", "A", "M", "E", "U", "A", "I", "U", "A", "A"], MONTHS:["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua"], STANDALONEMONTHS:["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", 
"urria", "azaroa", "abendua"], SHORTMONTHS:["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe."], STANDALONESHORTMONTHS:["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe."], WEEKDAYS:["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"], STANDALONEWEEKDAYS:["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"], SHORTWEEKDAYS:["ig.", "al.", "ar.", 
"az.", "og.", "or.", "lr."], STANDALONESHORTWEEKDAYS:["ig.", "al.", "ar.", "az.", "og.", "or.", "lr."], NARROWWEEKDAYS:["I", "A", "A", "A", "O", "O", "L"], STANDALONENARROWWEEKDAYS:["I", "A", "A", "A", "O", "O", "L"], SHORTQUARTERS:["1Hh", "2Hh", "3Hh", "4Hh"], QUARTERS:["1. hiruhilekoa", "2. hiruhilekoa", "3. hiruhilekoa", "4. hiruhilekoa"], AMPMS:["AM", "PM"], DATEFORMATS:["y('e')'ko' MMMM'ren' d('a'), EEEE", "y('e')'ko' MMMM'ren' d('a')", "y('e')'ko' MMM d('a')", "yy/M/d"], TIMEFORMATS:["HH:mm:ss (zzzz)", 
"HH:mm:ss (z)", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} ({0})", "{1} ({0})", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_fa = {ZERODIGIT:1776, ERAS:["ق.م.", "م."], ERANAMES:["قبل از میلاد", "میلادی"], NARROWMONTHS:["ژ", "ف", "م", "آ", "م", "ژ", "ژ", "ا", "س", "ا", "ن", "د"], STANDALONENARROWMONTHS:["ژ", "ف", "م", "آ", "م", "ژ", "ژ", "ا", "س", "ا", "ن", "د"], MONTHS:["ژانویهٔ", "فوریهٔ", "مارس", "آوریل", "مهٔ", "ژوئن", "ژوئیهٔ", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"], STANDALONEMONTHS:["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"], 
SHORTMONTHS:["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"], STANDALONESHORTMONTHS:["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"], WEEKDAYS:["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"], STANDALONEWEEKDAYS:["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"], SHORTWEEKDAYS:["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"], 
STANDALONESHORTWEEKDAYS:["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"], NARROWWEEKDAYS:["ی", "د", "س", "چ", "پ", "ج", "ش"], STANDALONENARROWWEEKDAYS:["ی", "د", "س", "چ", "پ", "ج", "ش"], SHORTQUARTERS:["س‌م۱", "س‌م۲", "س‌م۳", "س‌م۴"], QUARTERS:["سه‌ماههٔ اول", "سه‌ماههٔ دوم", "سه‌ماههٔ سوم", "سه‌ماههٔ چهارم"], AMPMS:["قبل‌ازظهر", "بعدازظهر"], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "y/M/d"], TIMEFORMATS:["H:mm:ss (zzzz)", "H:mm:ss (z)", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1} ساعت {0}", 
"{1} ساعت {0}", "{1}، {0}", "{1}, {0}"], FIRSTDAYOFWEEK:5, WEEKENDRANGE:[4, 4], FIRSTWEEKCUTOFFDAY:4};
goog.i18n.DateTimeSymbols_fi = {ERAS:["eKr.", "jKr."], ERANAMES:["ennen Kristuksen syntymää", "jälkeen Kristuksen syntymän"], NARROWMONTHS:["T", "H", "M", "H", "T", "K", "H", "E", "S", "L", "M", "J"], STANDALONENARROWMONTHS:["T", "H", "M", "H", "T", "K", "H", "E", "S", "L", "M", "J"], MONTHS:["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"], STANDALONEMONTHS:["tammikuu", "helmikuu", 
"maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"], SHORTMONTHS:["tammik.", "helmik.", "maalisk.", "huhtik.", "toukok.", "kesäk.", "heinäk.", "elok.", "syysk.", "lokak.", "marrask.", "jouluk."], STANDALONESHORTMONTHS:["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu"], WEEKDAYS:["sunnuntaina", "maanantaina", "tiistaina", "keskiviikkona", "torstaina", "perjantaina", "lauantaina"], 
STANDALONEWEEKDAYS:["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"], SHORTWEEKDAYS:["su", "ma", "ti", "ke", "to", "pe", "la"], STANDALONESHORTWEEKDAYS:["su", "ma", "ti", "ke", "to", "pe", "la"], NARROWWEEKDAYS:["S", "M", "T", "K", "T", "P", "L"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "K", "T", "P", "L"], SHORTQUARTERS:["1. nelj.", "2. nelj.", "3. nelj.", "4. nelj."], QUARTERS:["1. neljännes", "2. neljännes", "3. neljännes", "4. neljännes"], AMPMS:["ap.", 
"ip."], DATEFORMATS:["cccc d. MMMM y", "d. MMMM y", "d.M.y", "d.M.y"], TIMEFORMATS:["H.mm.ss zzzz", "H.mm.ss z", "H.mm.ss", "H.mm"], DATETIMEFORMATS:["{1} 'klo' {0}", "{1} 'klo' {0}", "{1} 'klo' {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_fil = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["Ene", "Peb", "Mar", "Abr", "May", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], STANDALONENARROWMONTHS:["E", "P", "M", "A", "M", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], MONTHS:["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"], STANDALONEMONTHS:["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", 
"Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"], SHORTMONTHS:["Ene", "Peb", "Mar", "Abr", "May", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], STANDALONESHORTMONTHS:["Ene", "Peb", "Mar", "Abr", "May", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], WEEKDAYS:["Linggo", "Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado"], STANDALONEWEEKDAYS:["Linggo", "Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado"], SHORTWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", 
"Biy", "Sab"], STANDALONESHORTWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"], NARROWWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"], STANDALONENARROWWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["ika-1 quarter", "ika-2 quarter", "ika-3 quarter", "ika-4 na quarter"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", 
"h:mm a"], DATETIMEFORMATS:["{1} 'nang' {0}", "{1} 'nang' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_fr = {ERAS:["av. J.-C.", "ap. J.-C."], ERANAMES:["avant Jésus-Christ", "après Jésus-Christ"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"], STANDALONEMONTHS:["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", 
"septembre", "octobre", "novembre", "décembre"], SHORTMONTHS:["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."], STANDALONESHORTMONTHS:["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."], WEEKDAYS:["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], STANDALONEWEEKDAYS:["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], SHORTWEEKDAYS:["dim.", "lun.", "mar.", 
"mer.", "jeu.", "ven.", "sam."], STANDALONESHORTWEEKDAYS:["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], NARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1er trimestre", "2e trimestre", "3e trimestre", "4e trimestre"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'à' {0}", 
"{1} 'à' {0}", "{1}, {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_fr_CA = {ERAS:["av. J.-C.", "ap. J.-C."], ERANAMES:["avant Jésus-Christ", "après Jésus-Christ"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"], STANDALONEMONTHS:["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", 
"septembre", "octobre", "novembre", "décembre"], SHORTMONTHS:["janv.", "févr.", "mars", "avr.", "mai", "juin", "juill.", "août", "sept.", "oct.", "nov.", "déc."], STANDALONESHORTMONTHS:["janv.", "févr.", "mars", "avr.", "mai", "juin", "juill.", "août", "sept.", "oct.", "nov.", "déc."], WEEKDAYS:["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], STANDALONEWEEKDAYS:["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], SHORTWEEKDAYS:["dim.", "lun.", "mar.", 
"mer.", "jeu.", "ven.", "sam."], STANDALONESHORTWEEKDAYS:["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], NARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1er trimestre", "2e trimestre", "3e trimestre", "4e trimestre"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "y-MM-dd"], TIMEFORMATS:["HH 'h' mm 'min' ss 's' zzzz", "HH 'h' mm 'min' ss 's' z", 
"HH 'h' mm 'min' ss 's'", "HH 'h' mm"], DATETIMEFORMATS:["{1} 'à' {0}", "{1} 'à' {0}", "{1}, {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_ga = {ERAS:["RC", "AD"], ERANAMES:["Roimh Chríost", "Anno Domini"], NARROWMONTHS:["E", "F", "M", "A", "B", "M", "I", "L", "M", "D", "S", "N"], STANDALONENARROWMONTHS:["E", "F", "M", "A", "B", "M", "I", "L", "M", "D", "S", "N"], MONTHS:["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"], STANDALONEMONTHS:["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", 
"Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"], SHORTMONTHS:["Ean", "Feabh", "Márta", "Aib", "Beal", "Meith", "Iúil", "Lún", "MFómh", "DFómh", "Samh", "Noll"], STANDALONESHORTMONTHS:["Ean", "Feabh", "Márta", "Aib", "Beal", "Meith", "Iúil", "Lún", "MFómh", "DFómh", "Samh", "Noll"], WEEKDAYS:["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"], STANDALONEWEEKDAYS:["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", 
"Dé Sathairn"], SHORTWEEKDAYS:["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"], STANDALONESHORTWEEKDAYS:["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"], NARROWWEEKDAYS:["D", "L", "M", "C", "D", "A", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "C", "D", "A", "S"], SHORTQUARTERS:["R1", "R2", "R3", "R4"], QUARTERS:["1ú ráithe", "2ú ráithe", "3ú ráithe", "4ú ráithe"], AMPMS:["r.n.", "i.n."], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", 
"HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'ag' {0}", "{1} 'ag' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_gl = {ERAS:["a.C.", "d.C."], ERANAMES:["antes de Cristo", "despois de Cristo"], NARROWMONTHS:["x.", "f.", "m.", "a.", "m.", "x.", "x.", "a.", "s.", "o.", "n.", "d."], STANDALONENARROWMONTHS:["X", "F", "M", "A", "M", "X", "X", "A", "S", "O", "N", "D"], MONTHS:["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro"], STANDALONEMONTHS:["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", 
"Setembro", "Outubro", "Novembro", "Decembro"], SHORTMONTHS:["xan.", "feb.", "mar.", "abr.", "maio", "xuño", "xul.", "ago.", "set.", "out.", "nov.", "dec."], STANDALONESHORTMONTHS:["Xan.", "Feb.", "Mar.", "Abr.", "Maio", "Xuño", "Xul.", "Ago.", "Set.", "Out.", "Nov.", "Dec."], WEEKDAYS:["domingo", "luns", "martes", "mércores", "xoves", "venres", "sábado"], STANDALONEWEEKDAYS:["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"], SHORTWEEKDAYS:["dom.", "luns", "mar.", "mér.", "xov.", 
"ven.", "sáb."], STANDALONESHORTWEEKDAYS:["Dom.", "Luns", "Mar.", "Mér.", "Xov.", "Ven.", "Sáb."], NARROWWEEKDAYS:["d.", "l.", "m.", "m.", "x.", "v.", "s."], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "X", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1.º trimestre", "2.º trimestre", "3.º trimestre", "4.º trimestre"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE, d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", "d 'de' MMM 'de' y", "dd/MM/yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", 
"HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_gsw = {ERAS:["v. Chr.", "n. Chr."], ERANAMES:["v. Chr.", "n. Chr."], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "Auguscht", "Septämber", "Oktoober", "Novämber", "Dezämber"], STANDALONEMONTHS:["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "Auguscht", "Septämber", "Oktoober", 
"Novämber", "Dezämber"], SHORTMONTHS:["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], WEEKDAYS:["Sunntig", "Määntig", "Ziischtig", "Mittwuch", "Dunschtig", "Friitig", "Samschtig"], STANDALONEWEEKDAYS:["Sunntig", "Määntig", "Ziischtig", "Mittwuch", "Dunschtig", "Friitig", "Samschtig"], SHORTWEEKDAYS:["Su.", "Mä.", "Zi.", "Mi.", "Du.", "Fr.", "Sa."], STANDALONESHORTWEEKDAYS:["Su.", 
"Mä.", "Zi.", "Mi.", "Du.", "Fr.", "Sa."], NARROWWEEKDAYS:["S", "M", "D", "M", "D", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "D", "M", "D", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"], AMPMS:["am Vormittag", "am Namittag"], DATEFORMATS:["EEEE, d. MMMM y", "d. MMMM y", "dd.MM.y", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_gu = {ERAS:["ઈ.સ.પૂર્વે", "ઈ.સ."], ERANAMES:["ઈસવીસન પૂર્વે", "ઇસવીસન"], NARROWMONTHS:["જા", "ફે", "મા", "એ", "મે", "જૂ", "જુ", "ઑ", "સ", "ઑ", "ન", "ડિ"], STANDALONENARROWMONTHS:["જા", "ફે", "મા", "એ", "મે", "જૂ", "જુ", "ઑ", "સ", "ઑ", "ન", "ડિ"], MONTHS:["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટેમ્બર", "ઑક્ટોબર", "નવેમ્બર", "ડિસેમ્બર"], STANDALONEMONTHS:["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટેમ્બર", 
"ઑક્ટોબર", "નવેમ્બર", "ડિસેમ્બર"], SHORTMONTHS:["જાન્યુ", "ફેબ્રુ", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટે", "ઑક્ટો", "નવે", "ડિસે"], STANDALONESHORTMONTHS:["જાન્યુ", "ફેબ્રુ", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટે", "ઑક્ટો", "નવે", "ડિસે"], WEEKDAYS:["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"], STANDALONEWEEKDAYS:["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"], SHORTWEEKDAYS:["રવિ", "સોમ", "મંગળ", "બુધ", 
"ગુરુ", "શુક્ર", "શનિ"], STANDALONESHORTWEEKDAYS:["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"], NARROWWEEKDAYS:["ર", "સો", "મં", "બુ", "ગુ", "શુ", "શ"], STANDALONENARROWWEEKDAYS:["ર", "સો", "મં", "બુ", "ગુ", "શુ", "શ"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1લો ત્રિમાસ", "2જો ત્રિમાસ", "3જો ત્રિમાસ", "4થો ત્રિમાસ"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM, y", "d MMMM, y", "d MMM, y", "d/M/yy"], TIMEFORMATS:["hh:mm:ss a zzzz", "hh:mm:ss a z", "hh:mm:ss a", "hh:mm a"], 
DATETIMEFORMATS:["{1} એ {0} વાગ્યે", "{1} એ {0} વાગ્યે", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_haw = {ERAS:["BCE", "CE"], ERANAMES:["BCE", "CE"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["Ianuali", "Pepeluali", "Malaki", "ʻApelila", "Mei", "Iune", "Iulai", "ʻAukake", "Kepakemapa", "ʻOkakopa", "Nowemapa", "Kekemapa"], STANDALONEMONTHS:["Ianuali", "Pepeluali", "Malaki", "ʻApelila", "Mei", "Iune", "Iulai", "ʻAukake", "Kepakemapa", "ʻOkakopa", 
"Nowemapa", "Kekemapa"], SHORTMONTHS:["Ian.", "Pep.", "Mal.", "ʻAp.", "Mei", "Iun.", "Iul.", "ʻAu.", "Kep.", "ʻOk.", "Now.", "Kek."], STANDALONESHORTMONTHS:["Ian.", "Pep.", "Mal.", "ʻAp.", "Mei", "Iun.", "Iul.", "ʻAu.", "Kep.", "ʻOk.", "Now.", "Kek."], WEEKDAYS:["Lāpule", "Poʻakahi", "Poʻalua", "Poʻakolu", "Poʻahā", "Poʻalima", "Poʻaono"], STANDALONEWEEKDAYS:["Lāpule", "Poʻakahi", "Poʻalua", "Poʻakolu", "Poʻahā", "Poʻalima", "Poʻaono"], SHORTWEEKDAYS:["LP", "P1", "P2", "P3", "P4", "P5", "P6"], STANDALONESHORTWEEKDAYS:["LP", 
"P1", "P2", "P3", "P4", "P5", "P6"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["Q1", "Q2", "Q3", "Q4"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_he = {ERAS:["לפנה״ס", "לספירה"], ERANAMES:["לפני הספירה", "לספירה"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], STANDALONEMONTHS:["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], 
SHORTMONTHS:["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"], STANDALONESHORTMONTHS:["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"], WEEKDAYS:["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"], STANDALONEWEEKDAYS:["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"], SHORTWEEKDAYS:["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", 
"שבת"], STANDALONESHORTWEEKDAYS:["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", "שבת"], NARROWWEEKDAYS:["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"], STANDALONENARROWWEEKDAYS:["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["רבעון 1", "רבעון 2", "רבעון 3", "רבעון 4"], AMPMS:["לפנה״צ", "אחה״צ"], DATEFORMATS:["EEEE, d בMMMM y", "d בMMMM y", "d בMMM y", "d.M.y"], TIMEFORMATS:["H:mm:ss zzzz", "H:mm:ss z", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1} בשעה {0}", 
"{1} בשעה {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[4, 5], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_hi = {ERAS:["ईसा-पूर्व", "ईस्वी"], ERANAMES:["ईसा-पूर्व", "ईसवी सन"], NARROWMONTHS:["ज", "फ़", "मा", "अ", "म", "जू", "जु", "अ", "सि", "अ", "न", "दि"], STANDALONENARROWMONTHS:["ज", "फ़", "मा", "अ", "म", "जू", "जु", "अ", "सि", "अ", "न", "दि"], MONTHS:["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्तूबर", "नवंबर", "दिसंबर"], STANDALONEMONTHS:["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्तूबर", "नवंबर", 
"दिसंबर"], SHORTMONTHS:["जन॰", "फ़र॰", "मार्च", "अप्रैल", "मई", "जून", "जुल॰", "अग॰", "सित॰", "अक्तू॰", "नव॰", "दिस॰"], STANDALONESHORTMONTHS:["जन॰", "फ़र॰", "मार्च", "अप्रैल", "मई", "जून", "जुल॰", "अग॰", "सित॰", "अक्तू॰", "नव॰", "दिस॰"], WEEKDAYS:["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"], STANDALONEWEEKDAYS:["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"], SHORTWEEKDAYS:["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"], STANDALONESHORTWEEKDAYS:["रवि", 
"सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"], NARROWWEEKDAYS:["र", "सो", "मं", "बु", "गु", "शु", "श"], STANDALONENARROWWEEKDAYS:["र", "सो", "मं", "बु", "गु", "शु", "श"], SHORTQUARTERS:["ति1", "ति2", "ति3", "ति4"], QUARTERS:["पहली तिमाही", "दूसरी तिमाही", "तीसरी तिमाही", "चौथी तिमाही"], AMPMS:["am", "pm"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} को {0} बजे", "{1} को {0} बजे", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_hr = {ERAS:["pr. Kr.", "po. Kr."], ERANAMES:["prije Krista", "poslije Krista"], NARROWMONTHS:["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."], STANDALONENARROWMONTHS:["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."], MONTHS:["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenoga", "prosinca"], STANDALONEMONTHS:["siječanj", "veljača", "ožujak", "travanj", 
"svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"], SHORTMONTHS:["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"], STANDALONESHORTMONTHS:["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"], WEEKDAYS:["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"], STANDALONEWEEKDAYS:["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"], SHORTWEEKDAYS:["ned", 
"pon", "uto", "sri", "čet", "pet", "sub"], STANDALONESHORTWEEKDAYS:["ned", "pon", "uto", "sri", "čet", "pet", "sub"], NARROWWEEKDAYS:["N", "P", "U", "S", "Č", "P", "S"], STANDALONENARROWWEEKDAYS:["n", "p", "u", "s", "č", "p", "s"], SHORTQUARTERS:["1kv", "2kv", "3kv", "4kv"], QUARTERS:["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d. MMMM y.", "d. MMMM y.", "d. MMM y.", "dd. MM. y."], TIMEFORMATS:["HH:mm:ss (zzzz)", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], 
DATETIMEFORMATS:["{1} 'u' {0}", "{1} 'u' {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_hu = {ERAS:["i. e.", "i. sz."], ERANAMES:["Krisztus előtt", "időszámításunk szerint"], NARROWMONTHS:["J", "F", "M", "Á", "M", "J", "J", "A", "Sz", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "Á", "M", "J", "J", "A", "Sz", "O", "N", "D"], MONTHS:["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"], STANDALONEMONTHS:["január", "február", "március", "április", "május", "június", "július", 
"augusztus", "szeptember", "október", "november", "december"], SHORTMONTHS:["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."], STANDALONESHORTMONTHS:["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."], WEEKDAYS:["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"], STANDALONEWEEKDAYS:["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"], SHORTWEEKDAYS:["V", "H", 
"K", "Sze", "Cs", "P", "Szo"], STANDALONESHORTWEEKDAYS:["V", "H", "K", "Sze", "Cs", "P", "Szo"], NARROWWEEKDAYS:["V", "H", "K", "Sz", "Cs", "P", "Sz"], STANDALONENARROWWEEKDAYS:["V", "H", "K", "Sz", "Cs", "P", "Sz"], SHORTQUARTERS:["I. n.év", "II. n.év", "III. n.év", "IV. n.év"], QUARTERS:["I. negyedév", "II. negyedév", "III. negyedév", "IV. negyedév"], AMPMS:["de.", "du."], DATEFORMATS:["y. MMMM d., EEEE", "y. MMMM d.", "y. MMM d.", "y. MM. dd."], TIMEFORMATS:["H:mm:ss zzzz", "H:mm:ss z", "H:mm:ss", 
"H:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_hy = {ERAS:["մ.թ.ա.", "մ.թ."], ERANAMES:["Քրիստոսից առաջ", "Քրիստոսից հետո"], NARROWMONTHS:["Հ", "Փ", "Մ", "Ա", "Մ", "Հ", "Հ", "Օ", "Ս", "Հ", "Ն", "Դ"], STANDALONENARROWMONTHS:["Հ", "Փ", "Մ", "Ա", "Մ", "Հ", "Հ", "Օ", "Ս", "Հ", "Ն", "Դ"], MONTHS:["հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի", "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի"], STANDALONEMONTHS:["հունվար", "փետրվար", "մարտ", "ապրիլ", "մայիս", "հունիս", "հուլիս", 
"օգոստոս", "սեպտեմբեր", "հոկտեմբեր", "նոյեմբեր", "դեկտեմբեր"], SHORTMONTHS:["հնվ", "փտվ", "մրտ", "ապր", "մյս", "հնս", "հլս", "օգս", "սեպ", "հոկ", "նոյ", "դեկ"], STANDALONESHORTMONTHS:["հնվ", "փտվ", "մրտ", "ապր", "մյս", "հնս", "հլս", "օգս", "սեպ", "հոկ", "նոյ", "դեկ"], WEEKDAYS:["կիրակի", "երկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ"], STANDALONEWEEKDAYS:["կիրակի", "երկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ"], SHORTWEEKDAYS:["կիր", "երկ", "երք", 
"չրք", "հնգ", "ուր", "շբթ"], STANDALONESHORTWEEKDAYS:["կիր", "երկ", "երք", "չրք", "հնգ", "ուր", "շբթ"], NARROWWEEKDAYS:["Կ", "Ե", "Ե", "Չ", "Հ", "Ո", "Շ"], STANDALONENARROWWEEKDAYS:["Կ", "Ե", "Ե", "Չ", "Հ", "Ո", "Շ"], SHORTQUARTERS:["1-ին եռմս.", "2-րդ եռմս.", "3-րդ եռմս.", "4-րդ եռմս."], QUARTERS:["1-ին եռամսյակ", "2-րդ եռամսյակ", "3-րդ եռամսյակ", "4-րդ եռամսյակ"], AMPMS:["AM", "PM"], DATEFORMATS:["y թ. MMMM d, EEEE", "dd MMMM, y թ.", "dd MMM, y թ.", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", 
"HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_id = {ERAS:["SM", "M"], ERANAMES:["Sebelum Masehi", "Masehi"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], STANDALONEMONTHS:["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", 
"Desember"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"], WEEKDAYS:["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], STANDALONEWEEKDAYS:["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], SHORTWEEKDAYS:["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"], STANDALONESHORTWEEKDAYS:["Min", "Sen", "Sel", "Rab", "Kam", 
"Jum", "Sab"], NARROWWEEKDAYS:["M", "S", "S", "R", "K", "J", "S"], STANDALONENARROWWEEKDAYS:["M", "S", "S", "R", "K", "J", "S"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["Kuartal ke-1", "Kuartal ke-2", "Kuartal ke-3", "Kuartal ke-4"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, dd MMMM y", "d MMMM y", "d MMM y", "dd/MM/yy"], TIMEFORMATS:["HH.mm.ss zzzz", "HH.mm.ss z", "HH.mm.ss", "HH.mm"], DATETIMEFORMATS:["{1} 'pukul' {0}", "{1} 'pukul' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 
6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_in = {ERAS:["SM", "M"], ERANAMES:["Sebelum Masehi", "Masehi"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], STANDALONEMONTHS:["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", 
"Desember"], SHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"], WEEKDAYS:["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], STANDALONEWEEKDAYS:["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], SHORTWEEKDAYS:["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"], STANDALONESHORTWEEKDAYS:["Min", "Sen", "Sel", "Rab", "Kam", 
"Jum", "Sab"], NARROWWEEKDAYS:["M", "S", "S", "R", "K", "J", "S"], STANDALONENARROWWEEKDAYS:["M", "S", "S", "R", "K", "J", "S"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["Kuartal ke-1", "Kuartal ke-2", "Kuartal ke-3", "Kuartal ke-4"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, dd MMMM y", "d MMMM y", "d MMM y", "dd/MM/yy"], TIMEFORMATS:["HH.mm.ss zzzz", "HH.mm.ss z", "HH.mm.ss", "HH.mm"], DATETIMEFORMATS:["{1} 'pukul' {0}", "{1} 'pukul' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 
6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_is = {ERAS:["f.Kr.", "e.Kr."], ERANAMES:["fyrir Krist", "eftir Krist"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "Á", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "Á", "S", "O", "N", "D"], MONTHS:["janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", "desember"], STANDALONEMONTHS:["janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", 
"desember"], SHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "maí", "jún.", "júl.", "ágú.", "sep.", "okt.", "nóv.", "des."], STANDALONESHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "maí", "jún.", "júl.", "ágú.", "sep.", "okt.", "nóv.", "des."], WEEKDAYS:["sunnudagur", "mánudagur", "þriðjudagur", "miðvikudagur", "fimmtudagur", "föstudagur", "laugardagur"], STANDALONEWEEKDAYS:["sunnudagur", "mánudagur", "þriðjudagur", "miðvikudagur", "fimmtudagur", "föstudagur", "laugardagur"], SHORTWEEKDAYS:["sun.", "mán.", 
"þri.", "mið.", "fim.", "fös.", "lau."], STANDALONESHORTWEEKDAYS:["sun.", "mán.", "þri.", "mið.", "fim.", "fös.", "lau."], NARROWWEEKDAYS:["S", "M", "Þ", "M", "F", "F", "L"], STANDALONENARROWWEEKDAYS:["S", "M", "Þ", "M", "F", "F", "L"], SHORTQUARTERS:["F1", "F2", "F3", "F4"], QUARTERS:["1. fjórðungur", "2. fjórðungur", "3. fjórðungur", "4. fjórðungur"], AMPMS:["f.h.", "e.h."], DATEFORMATS:["EEEE, d. MMMM y", "d. MMMM y", "d. MMM y", "d.M.y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", 
"HH:mm"], DATETIMEFORMATS:["{1} 'kl'. {0}", "{1} 'kl'. {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_it = {ERAS:["a.C.", "d.C."], ERANAMES:["avanti Cristo", "dopo Cristo"], NARROWMONTHS:["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"], MONTHS:["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"], STANDALONEMONTHS:["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", 
"ottobre", "novembre", "dicembre"], SHORTMONTHS:["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"], STANDALONESHORTMONTHS:["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"], WEEKDAYS:["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"], STANDALONEWEEKDAYS:["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"], SHORTWEEKDAYS:["dom", "lun", "mar", "mer", "gio", "ven", "sab"], STANDALONESHORTWEEKDAYS:["dom", 
"lun", "mar", "mer", "gio", "ven", "sab"], NARROWWEEKDAYS:["D", "L", "M", "M", "G", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "G", "V", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "dd/MM/yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'alle' 'ore' {0}", "{1} 'alle' 'ore' {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_iw = {ERAS:["לפנה״ס", "לספירה"], ERANAMES:["לפני הספירה", "לספירה"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], STANDALONEMONTHS:["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], 
SHORTMONTHS:["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"], STANDALONESHORTMONTHS:["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"], WEEKDAYS:["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"], STANDALONEWEEKDAYS:["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"], SHORTWEEKDAYS:["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", 
"שבת"], STANDALONESHORTWEEKDAYS:["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", "שבת"], NARROWWEEKDAYS:["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"], STANDALONENARROWWEEKDAYS:["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["רבעון 1", "רבעון 2", "רבעון 3", "רבעון 4"], AMPMS:["לפנה״צ", "אחה״צ"], DATEFORMATS:["EEEE, d בMMMM y", "d בMMMM y", "d בMMM y", "d.M.y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1} בשעה {0}", 
"{1} בשעה {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[4, 5], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_ja = {ERAS:["紀元前", "西暦"], ERANAMES:["紀元前", "西暦"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], STANDALONEMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], SHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", 
"12月"], STANDALONESHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], WEEKDAYS:["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], STANDALONEWEEKDAYS:["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], SHORTWEEKDAYS:["日", "月", "火", "水", "木", "金", "土"], STANDALONESHORTWEEKDAYS:["日", "月", "火", "水", "木", "金", "土"], NARROWWEEKDAYS:["日", "月", "火", "水", "木", "金", "土"], STANDALONENARROWWEEKDAYS:["日", "月", "火", "水", "木", "金", "土"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], 
QUARTERS:["第1四半期", "第2四半期", "第3四半期", "第4四半期"], AMPMS:["午前", "午後"], DATEFORMATS:["y年M月d日EEEE", "y年M月d日", "y/MM/dd", "y/MM/dd"], TIMEFORMATS:["H時mm分ss秒 zzzz", "H:mm:ss z", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_ka = {ERAS:["ძვ. წ.", "ახ. წ."], ERANAMES:["ძველი წელთაღრიცხვით", "ახალი წელთაღრიცხვით"], NARROWMONTHS:["ი", "თ", "მ", "ა", "მ", "ი", "ი", "ა", "ს", "ო", "ნ", "დ"], STANDALONENARROWMONTHS:["ი", "თ", "მ", "ა", "მ", "ი", "ი", "ა", "ს", "ო", "ნ", "დ"], MONTHS:["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"], STANDALONEMONTHS:["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", 
"აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"], SHORTMONTHS:["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"], STANDALONESHORTMONTHS:["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"], WEEKDAYS:["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"], STANDALONEWEEKDAYS:["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"], SHORTWEEKDAYS:["კვი", "ორშ", "სამ", 
"ოთხ", "ხუთ", "პარ", "შაბ"], STANDALONESHORTWEEKDAYS:["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"], NARROWWEEKDAYS:["კ", "ო", "ს", "ო", "ხ", "პ", "შ"], STANDALONENARROWWEEKDAYS:["კ", "ო", "ს", "ო", "ხ", "პ", "შ"], SHORTQUARTERS:["I კვ.", "II კვ.", "III კვ.", "IV კვ."], QUARTERS:["I კვარტალი", "II კვარტალი", "III კვარტალი", "IV კვარტალი"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, dd MMMM, y", "d MMMM, y", "d MMM. y", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], 
DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_kk = {ERAS:["б.з.д.", "б.з."], ERANAMES:["Біздің заманымызға дейін", "біздің заманымыз"], NARROWMONTHS:["Қ", "А", "Н", "С", "М", "М", "Ш", "Т", "Қ", "Қ", "Қ", "Ж"], STANDALONENARROWMONTHS:["Қ", "А", "Н", "С", "М", "М", "Ш", "Т", "Қ", "Қ", "Қ", "Ж"], MONTHS:["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"], STANDALONEMONTHS:["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", 
"Қазан", "Қараша", "Желтоқсан"], SHORTMONTHS:["қаң.", "ақп.", "нау.", "сәу.", "мам.", "мау.", "шіл.", "там.", "қыр.", "қаз.", "қар.", "жел."], STANDALONESHORTMONTHS:["қаң.", "ақп.", "нау.", "сәу.", "мам.", "мау.", "шіл.", "там.", "қыр.", "қаз.", "қар.", "жел."], WEEKDAYS:["жексенбі", "дүйсенбі", "сейсенбі", "сәрсенбі", "бейсенбі", "жұма", "сенбі"], STANDALONEWEEKDAYS:["жексенбі", "дүйсенбі", "сейсенбі", "сәрсенбі", "бейсенбі", "жұма", "сенбі"], SHORTWEEKDAYS:["жс", "дс", "сс", "ср", "бс", "жм", "сб"], 
STANDALONESHORTWEEKDAYS:["жс", "дс", "сс", "ср", "бс", "жм", "сб"], NARROWWEEKDAYS:["Ж", "Д", "С", "С", "Б", "Ж", "С"], STANDALONENARROWWEEKDAYS:["Ж", "Д", "С", "С", "Б", "Ж", "С"], SHORTQUARTERS:["І тқс.", "ІІ тқс.", "ІІІ тқс.", "IV тқс."], QUARTERS:["І тоқсан", "ІІ тоқсан", "ІІІ тоқсан", "IV тоқсан"], AMPMS:["AM", "PM"], DATEFORMATS:["y 'ж'. d MMMM, EEEE", "y 'ж'. d MMMM", "y 'ж'. dd MMM", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, {0}", 
"{1}, {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_km = {ERAS:["មុន គ.ស.", "គ.ស."], ERANAMES:["មុន​គ្រិស្តសករាជ", "គ្រិស្តសករាជ"], NARROWMONTHS:["ម", "ក", "ម", "ម", "ឧ", "ម", "ក", "ស", "ក", "ត", "វ", "ធ"], STANDALONENARROWMONTHS:["ម", "ក", "ម", "ម", "ឧ", "ម", "ក", "ស", "ក", "ត", "វ", "ធ"], MONTHS:["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"], STANDALONEMONTHS:["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"], 
SHORTMONTHS:["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"], STANDALONESHORTMONTHS:["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"], WEEKDAYS:["អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"], STANDALONEWEEKDAYS:["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"], SHORTWEEKDAYS:["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហ", "សុក្រ", "សៅរ៍"], STANDALONESHORTWEEKDAYS:["អាទិត្យ", 
"ចន្ទ", "អង្គារ", "ពុធ", "ព្រហ", "សុក្រ", "សៅរ៍"], NARROWWEEKDAYS:["អ", "ច", "អ", "ព", "ព", "ស", "ស"], STANDALONENARROWWEEKDAYS:["អ", "ច", "អ", "ព", "ព", "ស", "ស"], SHORTQUARTERS:["ត្រីមាសទី 1", "ត្រីមាសទី 2", "ត្រីមាសទី 3", "ត្រីមាសទី 4"], QUARTERS:["ត្រីមាសទី 1", "ត្រីមាសទី 2", "ត្រីមាសទី 3", "ត្រីមាសទី 4"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} នៅ​ម៉ោង {0}", 
"{1} នៅ​ម៉ោង {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_kn = {ERAS:["ಕ್ರಿ.ಪೂ", "ಕ್ರಿ.ಶ"], ERANAMES:["ಕ್ರಿಸ್ತ ಪೂರ್ವ", "ಕ್ರಿಸ್ತ ಶಕ"], NARROWMONTHS:["ಜ", "ಫೆ", "ಮಾ", "ಏ", "ಮೇ", "ಜೂ", "ಜು", "ಆ", "ಸೆ", "ಅ", "ನ", "ಡಿ"], STANDALONENARROWMONTHS:["ಜ", "ಫೆ", "ಮಾ", "ಏ", "ಮೇ", "ಜೂ", "ಜು", "ಆ", "ಸೆ", "ಅ", "ನ", "ಡಿ"], MONTHS:["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"], STANDALONEMONTHS:["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", 
"ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"], SHORTMONTHS:["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿ", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂ", "ಅಕ್ಟೋ", "ನವೆಂ", "ಡಿಸೆಂ"], STANDALONESHORTMONTHS:["ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿ", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗ", "ಸೆಪ್ಟೆಂ", "ಅಕ್ಟೋ", "ನವೆಂ", "ಡಿಸೆಂ"], WEEKDAYS:["ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ"], STANDALONEWEEKDAYS:["ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ"], SHORTWEEKDAYS:["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", 
"ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"], STANDALONESHORTWEEKDAYS:["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"], NARROWWEEKDAYS:["ಭಾ", "ಸೋ", "ಮಂ", "ಬು", "ಗು", "ಶು", "ಶ"], STANDALONENARROWWEEKDAYS:["ಭಾ", "ಸೋ", "ಮಂ", "ಬು", "ಗು", "ಶು", "ಶ"], SHORTQUARTERS:["ತ್ರೈ 1", "ತ್ರೈ 2", "ತ್ರೈ 3", "ತ್ರೈ 4"], QUARTERS:["1ನೇ ತ್ರೈಮಾಸಿಕ", "2ನೇ ತ್ರೈಮಾಸಿಕ", "3ನೇ ತ್ರೈಮಾಸಿಕ", "4ನೇ ತ್ರೈಮಾಸಿಕ"], AMPMS:["ಪೂರ್ವಾಹ್ನ", "ಅಪರಾಹ್ನ"], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "d/M/yy"], TIMEFORMATS:["hh:mm:ss a zzzz", 
"hh:mm:ss a z", "hh:mm:ss a", "hh:mm a"], DATETIMEFORMATS:["{1} ರಂದು {0} ಸಮಯಕ್ಕೆ", "{1} ರಂದು {0} ಸಮಯಕ್ಕೆ", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_ko = {ERAS:["BC", "AD"], ERANAMES:["기원전", "서기"], NARROWMONTHS:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], STANDALONENARROWMONTHS:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], MONTHS:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], STANDALONEMONTHS:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], SHORTMONTHS:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", 
"9월", "10월", "11월", "12월"], STANDALONESHORTMONTHS:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], WEEKDAYS:["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"], STANDALONEWEEKDAYS:["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"], SHORTWEEKDAYS:["일", "월", "화", "수", "목", "금", "토"], STANDALONESHORTWEEKDAYS:["일", "월", "화", "수", "목", "금", "토"], NARROWWEEKDAYS:["일", "월", "화", "수", "목", "금", "토"], STANDALONENARROWWEEKDAYS:["일", "월", "화", "수", "목", "금", "토"], SHORTQUARTERS:["1분기", 
"2분기", "3분기", "4분기"], QUARTERS:["제 1/4분기", "제 2/4분기", "제 3/4분기", "제 4/4분기"], AMPMS:["오전", "오후"], DATEFORMATS:["y년 M월 d일 EEEE", "y년 M월 d일", "y. M. d.", "yy. M. d."], TIMEFORMATS:["a h시 m분 s초 zzzz", "a h시 m분 s초 z", "a h:mm:ss", "a h:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_ky = {ERAS:["б.з.ч.", "б.з."], ERANAMES:["биздин заманга чейин", "биздин заман"], NARROWMONTHS:["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"], STANDALONENARROWMONTHS:["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"], MONTHS:["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"], STANDALONEMONTHS:["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", 
"Ноябрь", "Декабрь"], SHORTMONTHS:["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."], STANDALONESHORTMONTHS:["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"], WEEKDAYS:["жекшемби", "дүйшөмбү", "шейшемби", "шаршемби", "бейшемби", "жума", "ишемби"], STANDALONEWEEKDAYS:["жекшемби", "дүйшөмбү", "шейшемби", "шаршемби", "бейшемби", "жума", "ишемби"], SHORTWEEKDAYS:["жек.", "дүй.", "шейш.", "шарш.", "бейш.", "жума", "ишм."], 
STANDALONESHORTWEEKDAYS:["жек.", "дүй.", "шейш.", "шарш.", "бейш.", "жума", "ишм."], NARROWWEEKDAYS:["Ж", "Д", "Ш", "Ш", "Б", "Ж", "И"], STANDALONENARROWWEEKDAYS:["Ж", "Д", "Ш", "Ш", "Б", "Ж", "И"], SHORTQUARTERS:["1-чей.", "2-чей.", "3-чей.", "4-чей."], QUARTERS:["1-чейрек", "2-чейрек", "3-чейрек", "4-чейрек"], AMPMS:["таңкы", "түштөн кийинки"], DATEFORMATS:["y-'ж'., d-MMMM, EEEE", "y-'ж'., d-MMMM", "y-'ж'., d-MMM", "d/M/yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", 
"{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_ln = {ERAS:["libóso ya", "nsima ya Y"], ERANAMES:["Yambo ya Yézu Krís", "Nsima ya Yézu Krís"], NARROWMONTHS:["y", "f", "m", "a", "m", "y", "y", "a", "s", "ɔ", "n", "d"], STANDALONENARROWMONTHS:["y", "f", "m", "a", "m", "y", "y", "a", "s", "ɔ", "n", "d"], MONTHS:["sánzá ya yambo", "sánzá ya míbalé", "sánzá ya mísáto", "sánzá ya mínei", "sánzá ya mítáno", "sánzá ya motóbá", "sánzá ya nsambo", "sánzá ya mwambe", "sánzá ya libwa", "sánzá ya zómi", "sánzá ya zómi na mɔ̌kɔ́", 
"sánzá ya zómi na míbalé"], STANDALONEMONTHS:["sánzá ya yambo", "sánzá ya míbalé", "sánzá ya mísáto", "sánzá ya mínei", "sánzá ya mítáno", "sánzá ya motóbá", "sánzá ya nsambo", "sánzá ya mwambe", "sánzá ya libwa", "sánzá ya zómi", "sánzá ya zómi na mɔ̌kɔ́", "sánzá ya zómi na míbalé"], SHORTMONTHS:["yan", "fbl", "msi", "apl", "mai", "yun", "yul", "agt", "stb", "ɔtb", "nvb", "dsb"], STANDALONESHORTMONTHS:["yan", "fbl", "msi", "apl", "mai", "yun", "yul", "agt", "stb", "ɔtb", "nvb", "dsb"], WEEKDAYS:["eyenga", 
"mokɔlɔ mwa yambo", "mokɔlɔ mwa míbalé", "mokɔlɔ mwa mísáto", "mokɔlɔ ya mínéi", "mokɔlɔ ya mítáno", "mpɔ́sɔ"], STANDALONEWEEKDAYS:["eyenga", "mokɔlɔ mwa yambo", "mokɔlɔ mwa míbalé", "mokɔlɔ mwa mísáto", "mokɔlɔ ya mínéi", "mokɔlɔ ya mítáno", "mpɔ́sɔ"], SHORTWEEKDAYS:["eye", "ybo", "mbl", "mst", "min", "mtn", "mps"], STANDALONESHORTWEEKDAYS:["eye", "ybo", "mbl", "mst", "min", "mtn", "mps"], NARROWWEEKDAYS:["e", "y", "m", "m", "m", "m", "p"], STANDALONENARROWWEEKDAYS:["e", "y", "m", "m", "m", "m", 
"p"], SHORTQUARTERS:["SM1", "SM2", "SM3", "SM4"], QUARTERS:["sánzá mísáto ya yambo", "sánzá mísáto ya míbalé", "sánzá mísáto ya mísáto", "sánzá mísáto ya mínei"], AMPMS:["ntɔ́ngɔ́", "mpókwa"], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "d/M/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_lo = {ERAS:["ກ່ອນ ຄ.ສ.", "ຄ.ສ."], ERANAMES:["ກ່ອນຄຣິດສັກກະລາດ", "ຄຣິດສັກກະລາດ"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ", "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ"], STANDALONEMONTHS:["ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ", "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", 
"ພະຈິກ", "ທັນວາ"], SHORTMONTHS:["ມ.ກ.", "ກ.ພ.", "ມ.ນ.", "ມ.ສ.", "ພ.ພ.", "ມິ.ຖ.", "ກ.ລ.", "ສ.ຫ.", "ກ.ຍ.", "ຕ.ລ.", "ພ.ຈ.", "ທ.ວ."], STANDALONESHORTMONTHS:["ມ.ກ.", "ກ.ພ.", "ມ.ນ.", "ມ.ສ.", "ພ.ພ.", "ມິ.ຖ.", "ກ.ລ.", "ສ.ຫ.", "ກ.ຍ.", "ຕ.ລ.", "ພ.ຈ.", "ທ.ວ."], WEEKDAYS:["ວັນອາທິດ", "ວັນຈັນ", "ວັນອັງຄານ", "ວັນພຸດ", "ວັນພະຫັດ", "ວັນສຸກ", "ວັນເສົາ"], STANDALONEWEEKDAYS:["ວັນອາທິດ", "ວັນຈັນ", "ວັນອັງຄານ", "ວັນພຸດ", "ວັນພະຫັດ", "ວັນສຸກ", "ວັນເສົາ"], SHORTWEEKDAYS:["ອາທິດ", "ຈັນ", "ອັງຄານ", "ພຸດ", "ພະຫັດ", "ສຸກ", 
"ເສົາ"], STANDALONESHORTWEEKDAYS:["ອາທິດ", "ຈັນ", "ອັງຄານ", "ພຸດ", "ພະຫັດ", "ສຸກ", "ເສົາ"], NARROWWEEKDAYS:["ອາ", "ຈ", "ອ", "ພ", "ພຫ", "ສຸ", "ສ"], STANDALONENARROWWEEKDAYS:["ອາ", "ຈ", "ອ", "ພ", "ພຫ", "ສຸ", "ສ"], SHORTQUARTERS:["ຕມ1", "ຕມ2", "ຕມ3", "ຕມ4"], QUARTERS:["ໄຕຣມາດ 1", "ໄຕຣມາດ 2", "ໄຕຣມາດ 3", "ໄຕຣມາດ 4"], AMPMS:["ກ່ອນທ່ຽງ", "ຫຼັງທ່ຽງ"], DATEFORMATS:["EEEE ທີ d MMMM G y", "d MMMM y", "d MMM y", "d/M/y"], TIMEFORMATS:["H ໂມງ m ນາທີ ss ວິນາທີ zzzz", "H ໂມງ m ນາທີ ss ວິນາທີ z", "H:mm:ss", "H:mm"], 
DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_lt = {ERAS:["pr. Kr.", "po Kr."], ERANAMES:["prieš Kristų", "po Kristaus"], NARROWMONTHS:["S", "V", "K", "B", "G", "B", "L", "R", "R", "S", "L", "G"], STANDALONENARROWMONTHS:["S", "V", "K", "B", "G", "B", "L", "R", "R", "S", "L", "G"], MONTHS:["sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"], STANDALONEMONTHS:["sausis", "vasaris", "kovas", "balandis", "gegužė", "birželis", "liepa", "rugpjūtis", 
"rugsėjis", "spalis", "lapkritis", "gruodis"], SHORTMONTHS:["saus.", "vas.", "kov.", "bal.", "geg.", "birž.", "liep.", "rugp.", "rugs.", "spal.", "lapkr.", "gruod."], STANDALONESHORTMONTHS:["saus.", "vas.", "kov.", "bal.", "geg.", "birž.", "liep.", "rugp.", "rugs.", "spal.", "lapkr.", "gruod."], WEEKDAYS:["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis"], STANDALONEWEEKDAYS:["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", 
"penktadienis", "šeštadienis"], SHORTWEEKDAYS:["sk", "pr", "an", "tr", "kt", "pn", "št"], STANDALONESHORTWEEKDAYS:["sk", "pr", "an", "tr", "kt", "pn", "št"], NARROWWEEKDAYS:["S", "P", "A", "T", "K", "P", "Š"], STANDALONENARROWWEEKDAYS:["S", "P", "A", "T", "K", "P", "Š"], SHORTQUARTERS:["I k.", "II k.", "III k.", "IV k."], QUARTERS:["I ketvirtis", "II ketvirtis", "III ketvirtis", "IV ketvirtis"], AMPMS:["priešpiet", "popiet"], DATEFORMATS:["y 'm'. MMMM d 'd'., EEEE", "y 'm'. MMMM d 'd'.", "y-MM-dd", 
"y-MM-dd"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_lv = {ERAS:["p.m.ē.", "m.ē."], ERANAMES:["pirms mūsu ēras", "mūsu ērā"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris"], STANDALONEMONTHS:["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", 
"septembris", "oktobris", "novembris", "decembris"], SHORTMONTHS:["janv.", "febr.", "marts", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec."], STANDALONESHORTMONTHS:["janv.", "febr.", "marts", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec."], WEEKDAYS:["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"], STANDALONEWEEKDAYS:["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"], 
SHORTWEEKDAYS:["svētd.", "pirmd.", "otrd.", "trešd.", "ceturtd.", "piektd.", "sestd."], STANDALONESHORTWEEKDAYS:["Svētd.", "Pirmd.", "Otrd.", "Trešd.", "Ceturtd.", "Piektd.", "Sestd."], NARROWWEEKDAYS:["S", "P", "O", "T", "C", "P", "S"], STANDALONENARROWWEEKDAYS:["S", "P", "O", "T", "C", "P", "S"], SHORTQUARTERS:["1. cet.", "2. cet.", "3. cet.", "4. cet."], QUARTERS:["1. ceturksnis", "2. ceturksnis", "3. ceturksnis", "4. ceturksnis"], AMPMS:["priekšpusdienā", "pēcpusdienā"], DATEFORMATS:["EEEE, y. 'gada' d. MMMM", 
"y. 'gada' d. MMMM", "y. 'gada' d. MMM", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_mk = {ERAS:["п.н.е.", "н.е."], ERANAMES:["пред нашата ера", "од нашата ера"], NARROWMONTHS:["ј", "ф", "м", "а", "м", "ј", "ј", "а", "с", "о", "н", "д"], STANDALONENARROWMONTHS:["ј", "ф", "м", "а", "м", "ј", "ј", "а", "с", "о", "н", "д"], MONTHS:["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"], STANDALONEMONTHS:["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", 
"ноември", "декември"], SHORTMONTHS:["јан.", "фев.", "мар.", "апр.", "мај", "јун.", "јул.", "авг.", "септ.", "окт.", "ноем.", "дек."], STANDALONESHORTMONTHS:["јан.", "фев.", "мар.", "апр.", "мај", "јун.", "јул.", "авг.", "септ.", "окт.", "ноем.", "дек."], WEEKDAYS:["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"], STANDALONEWEEKDAYS:["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"], SHORTWEEKDAYS:["нед.", "пон.", "вто.", "сре.", "чет.", "пет.", 
"саб."], STANDALONESHORTWEEKDAYS:["нед.", "пон.", "вто.", "сре.", "чет.", "пет.", "саб."], NARROWWEEKDAYS:["н", "п", "в", "с", "ч", "п", "с"], STANDALONENARROWWEEKDAYS:["н", "п", "в", "с", "ч", "п", "с"], SHORTQUARTERS:["јан – мар", "апр – јун", "јул – септ", "окт – дек"], QUARTERS:["прво тримесечје", "второ тримесечје", "трето тримесечје", "четврто тримесечје"], AMPMS:["претпл.", "попл."], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d.M.y", "d.M.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", 
"HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, 'во' {0}", "{1}, 'во' {0}", "{1}, 'во' {0}", "{1}, 'во' {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_ml = {ERAS:["ക്രി.മു.", "എഡി"], ERANAMES:["ക്രിസ്‌തുവിന് മുമ്പ്", "ആന്നോ ഡൊമിനി"], NARROWMONTHS:["ജ", "ഫെ", "മാ", "ഏ", "മെ", "ജൂൺ", "ജൂ", "ഓ", "സെ", "ഒ", "ന", "ഡി"], STANDALONENARROWMONTHS:["ജ", "ഫെ", "മാ", "ഏ", "മെ", "ജൂൺ", "ജൂ", "ഓ", "സെ", "ഒ", "ന", "ഡി"], MONTHS:["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്‌ടോബർ", "നവംബർ", "ഡിസംബർ"], STANDALONEMONTHS:["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", 
"ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്‌ടോബർ", "നവംബർ", "ഡിസംബർ"], SHORTMONTHS:["ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം"], STANDALONESHORTMONTHS:["ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം"], WEEKDAYS:["ഞായറാഴ്‌ച", "തിങ്കളാഴ്‌ച", "ചൊവ്വാഴ്ച", "ബുധനാഴ്‌ച", "വ്യാഴാഴ്‌ച", "വെള്ളിയാഴ്‌ച", "ശനിയാഴ്‌ച"], STANDALONEWEEKDAYS:["ഞായറാഴ്‌ച", "തിങ്കളാഴ്‌ച", "ചൊവ്വാഴ്‌ച", "ബുധനാഴ്‌ച", "വ്യാഴാഴ്‌ച", "വെള്ളിയാഴ്‌ച", 
"ശനിയാഴ്‌ച"], SHORTWEEKDAYS:["ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"], STANDALONESHORTWEEKDAYS:["ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"], NARROWWEEKDAYS:["ഞ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ"], STANDALONENARROWWEEKDAYS:["ഞാ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ"], SHORTQUARTERS:["ഒന്നാം പാദം", "രണ്ടാം പാദം", "മൂന്നാം പാദം", "നാലാം പാദം"], QUARTERS:["ഒന്നാം പാദം", "രണ്ടാം പാദം", "മൂന്നാം പാദം", "നാലാം പാദം"], AMPMS:["AM", "PM"], DATEFORMATS:["y, MMMM d, EEEE", 
"y, MMMM d", "y, MMM d", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_mn = {ERAS:["МЭӨ", "МЭ"], ERANAMES:["манай эриний өмнөх", "манай эриний"], NARROWMONTHS:["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"], STANDALONENARROWMONTHS:["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"], MONTHS:["нэгдүгээр сар", "хоёрдугаар сар", "гуравдугаар сар", "дөрөвдүгээр сар", "тавдугаар сар", "зургаадугаар сар", "долоодугаар сар", "наймдугаар сар", "есдүгээр сар", "аравдугаар сар", "арван нэгдүгээр сар", 
"арван хоёрдугаар сар"], STANDALONEMONTHS:["Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар", "Тавдугаар сар", "Зургаадугаар сар", "Долоодугаар сар", "Наймдугаар сар", "Есдүгээр сар", "Аравдугаар сар", "Арван нэгдүгээр сар", "Арван хоёрдугаар сар"], SHORTMONTHS:["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"], STANDALONESHORTMONTHS:["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", 
"7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"], WEEKDAYS:["ням", "даваа", "мягмар", "лхагва", "пүрэв", "баасан", "бямба"], STANDALONEWEEKDAYS:["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"], SHORTWEEKDAYS:["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"], STANDALONESHORTWEEKDAYS:["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"], NARROWWEEKDAYS:["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"], STANDALONENARROWWEEKDAYS:["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"], SHORTQUARTERS:["I улирал", 
"II улирал", "III улирал", "IV улирал"], QUARTERS:["1-р улирал", "2-р улирал", "3-р улирал", "4-р улирал"], AMPMS:["ү.ө.", "ү.х."], DATEFORMATS:["y 'оны' MMMM'ын' d, EEEE 'гараг'", "y 'оны' MMMM'ын' d", "y 'оны' MMM'ын' d", "y.MM.dd"], TIMEFORMATS:["HH:mm:ss (zzzz)", "HH:mm:ss (z)", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_mo = {ERAS:["î.Hr.", "d.Hr."], ERANAMES:["înainte de Hristos", "după Hristos"], NARROWMONTHS:["I", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["I", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"], MONTHS:["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"], STANDALONEMONTHS:["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", 
"septembrie", "octombrie", "noiembrie", "decembrie"], SHORTMONTHS:["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."], STANDALONESHORTMONTHS:["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."], WEEKDAYS:["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"], STANDALONEWEEKDAYS:["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"], SHORTWEEKDAYS:["dum.", "lun.", "mar.", "mie.", 
"joi", "vin.", "sâm."], STANDALONESHORTWEEKDAYS:["dum.", "lun.", "mar.", "mie.", "joi", "vin.", "sâm."], NARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], SHORTQUARTERS:["trim. I", "trim. II", "trim. III", "trim. IV"], QUARTERS:["trimestrul I", "trimestrul al II-lea", "trimestrul al III-lea", "trimestrul al IV-lea"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "dd.MM.y"], TIMEFORMATS:["HH:mm:ss zzzz", 
"HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'la' {0}", "{1} 'la' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_mr = {ZERODIGIT:2406, ERAS:["ई. स. पू.", "इ. स."], ERANAMES:["ईसवीसनपूर्व", "ईसवीसन"], NARROWMONTHS:["जा", "फे", "मा", "ए", "मे", "जू", "जु", "ऑ", "स", "ऑ", "नो", "डि"], STANDALONENARROWMONTHS:["जा", "फे", "मा", "ए", "मे", "जू", "जु", "ऑ", "स", "ऑ", "नो", "डि"], MONTHS:["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"], STANDALONEMONTHS:["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", 
"ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"], SHORTMONTHS:["जाने", "फेब्रु", "मार्च", "एप्रि", "मे", "जून", "जुलै", "ऑग", "सप्टें", "ऑक्टो", "नोव्हें", "डिसें"], STANDALONESHORTMONTHS:["जाने", "फेब्रु", "मार्च", "एप्रि", "मे", "जून", "जुलै", "ऑग", "सप्टें", "ऑक्टो", "नोव्हें", "डिसें"], WEEKDAYS:["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"], STANDALONEWEEKDAYS:["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"], SHORTWEEKDAYS:["रवि", 
"सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"], STANDALONESHORTWEEKDAYS:["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"], NARROWWEEKDAYS:["र", "सो", "मं", "बु", "गु", "शु", "श"], STANDALONENARROWWEEKDAYS:["र", "सो", "मं", "बु", "गु", "शु", "श"], SHORTQUARTERS:["ति१", "ति२", "ति३", "ति४"], QUARTERS:["प्रथम तिमाही", "द्वितीय तिमाही", "तृतीय तिमाही", "चतुर्थ तिमाही"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM, y", "d MMMM, y", "d MMM, y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", 
"h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} रोजी {0}", "{1} रोजी {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_ms = {ERAS:["S.M.", "TM"], ERANAMES:["S.M.", "TM"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "O", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "O", "S", "O", "N", "D"], MONTHS:["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"], STANDALONEMONTHS:["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"], 
SHORTMONTHS:["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"], WEEKDAYS:["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"], STANDALONEWEEKDAYS:["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"], SHORTWEEKDAYS:["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"], STANDALONESHORTWEEKDAYS:["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"], 
NARROWWEEKDAYS:["A", "I", "S", "R", "K", "J", "S"], STANDALONENARROWWEEKDAYS:["A", "I", "S", "R", "K", "J", "S"], SHORTQUARTERS:["S1", "S2", "S3", "S4"], QUARTERS:["Suku pertama", "Suku Ke-2", "Suku Ke-3", "Suku Ke-4"], AMPMS:["PG", "PTG"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d/MM/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} 'pada' {0}", "{1} 'pada' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_mt = {ERAS:["QK", "WK"], ERANAMES:["Qabel Kristu", "Wara Kristu"], NARROWMONTHS:["J", "F", "M", "A", "M", "Ġ", "L", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["Jn", "Fr", "Mz", "Ap", "Mj", "Ġn", "Lj", "Aw", "St", "Ob", "Nv", "Dċ"], MONTHS:["Jannar", "Frar", "Marzu", "April", "Mejju", "Ġunju", "Lulju", "Awwissu", "Settembru", "Ottubru", "Novembru", "Diċembru"], STANDALONEMONTHS:["Jannar", "Frar", "Marzu", "April", "Mejju", "Ġunju", "Lulju", "Awwissu", "Settembru", 
"Ottubru", "Novembru", "Diċembru"], SHORTMONTHS:["Jan", "Fra", "Mar", "Apr", "Mej", "Ġun", "Lul", "Aww", "Set", "Ott", "Nov", "Diċ"], STANDALONESHORTMONTHS:["Jan", "Fra", "Mar", "Apr", "Mej", "Ġun", "Lul", "Aww", "Set", "Ott", "Nov", "Diċ"], WEEKDAYS:["Il-Ħadd", "It-Tnejn", "It-Tlieta", "L-Erbgħa", "Il-Ħamis", "Il-Ġimgħa", "Is-Sibt"], STANDALONEWEEKDAYS:["Il-Ħadd", "It-Tnejn", "It-Tlieta", "L-Erbgħa", "Il-Ħamis", "Il-Ġimgħa", "Is-Sibt"], SHORTWEEKDAYS:["Ħad", "Tne", "Tli", "Erb", "Ħam", "Ġim", "Sib"], 
STANDALONESHORTWEEKDAYS:["Ħad", "Tne", "Tli", "Erb", "Ħam", "Ġim", "Sib"], NARROWWEEKDAYS:["Ħd", "T", "Tl", "Er", "Ħm", "Ġm", "Sb"], STANDALONENARROWWEEKDAYS:["Ħd", "Tn", "Tl", "Er", "Ħm", "Ġm", "Sb"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["1el kwart", "2ni kwart", "3et kwart", "4ba’ kwart"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d 'ta'’ MMMM y", "d 'ta'’ MMMM y", "dd MMM y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", 
"{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_my = {ZERODIGIT:4160, ERAS:["ဘီစီ", "အဒေီ"], ERANAMES:["ခရစ်တော် မပေါ်မီနှစ်", "ခရစ်နှစ်"], NARROWMONTHS:["ဇ", "ဖ", "မ", "ဧ", "မ", "ဇ", "ဇ", "ဩ", "စ", "အ", "န", "ဒ"], STANDALONENARROWMONTHS:["ဇ", "ဖ", "မ", "ဧ", "မ", "ဇ", "ဇ", "ဩ", "စ", "အ", "န", "ဒ"], MONTHS:["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "ဩဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"], STANDALONEMONTHS:["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "ဩဂုတ်", 
"စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"], SHORTMONTHS:["ဇန်", "ဖေ", "မတ်", "ဧ", "မေ", "ဇွန်", "ဇူ", "ဩ", "စက်", "အောက်", "နို", "ဒီ"], STANDALONESHORTMONTHS:["ဇန်", "ဖေ", "မတ်", "ဧ", "မေ", "ဇွန်", "ဇူ", "ဩ", "စက်", "အောက်", "နို", "ဒီ"], WEEKDAYS:["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"], STANDALONEWEEKDAYS:["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"], SHORTWEEKDAYS:["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", 
"သောကြာ", "စနေ"], STANDALONESHORTWEEKDAYS:["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"], NARROWWEEKDAYS:["တ", "တ", "အ", "ဗ", "က", "သ", "စ"], STANDALONENARROWWEEKDAYS:["တ", "တ", "အ", "ဗ", "က", "သ", "စ"], SHORTQUARTERS:["ပထမ သုံးလပတ်", "ဒုတိယ သုံးလပတ်", "တတိယ သုံးလပတ်", "စတုတ္ထ သုံးလပတ်"], QUARTERS:["ပထမ သုံးလပတ်", "ဒုတိယ သုံးလပတ်", "တတိယ သုံးလပတ်", "စတုတ္ထ သုံးလပတ်"], AMPMS:["နံနက်", "ညနေ"], DATEFORMATS:["y၊ MMMM d၊ EEEE", "y၊ MMMM d", "y၊ MMM d", "d/M/yy"], TIMEFORMATS:["zzzz HH:mm:ss", 
"z HH:mm:ss", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_nb = {ERAS:["f.Kr.", "e.Kr."], ERANAMES:["før Kristus", "etter Kristus"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"], STANDALONEMONTHS:["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", 
"november", "desember"], SHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "mai", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "des."], STANDALONESHORTMONTHS:["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"], WEEKDAYS:["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"], STANDALONEWEEKDAYS:["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"], SHORTWEEKDAYS:["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."], STANDALONESHORTWEEKDAYS:["søn.", 
"man.", "tir.", "ons.", "tor.", "fre.", "lør."], NARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE d. MMMM y", "d. MMMM y", "d. MMM y", "dd.MM.y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'kl'. {0}", "{1} 'kl'. {0}", "{1}, {0}", "{1}, {0}"], 
FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_ne = {ZERODIGIT:2406, ERAS:["ईसा पूर्व", "सन्"], ERANAMES:["ईसा पूर्व", "सन्"], NARROWMONTHS:["जन", "फेब", "मार्च", "अप्र", "मे", "जुन", "जुल", "अग", "सेप", "अक्टो", "नोभे", "डिसे"], STANDALONENARROWMONTHS:["जन", "फेेब", "मार्च", "अप्र", "मे", "जुन", "जुल", "अग", "सेप", "अक्टो", "नोभे", "डिसे"], MONTHS:["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"], STANDALONEMONTHS:["जनवरी", "फेब्रुअरी", "मार्च", 
"अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"], SHORTMONTHS:["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"], STANDALONESHORTMONTHS:["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"], WEEKDAYS:["आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"], STANDALONEWEEKDAYS:["आइतबार", "सोमबार", "मङ्गलबार", 
"बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"], SHORTWEEKDAYS:["आइत", "सोम", "मङ्गल", "बुध", "बिहि", "शुक्र", "शनि"], STANDALONESHORTWEEKDAYS:["आइत", "सोम", "मङ्गल", "बुध", "बिहि", "शुक्र", "शनि"], NARROWWEEKDAYS:["आ", "सो", "म", "बु", "बि", "शु", "श"], STANDALONENARROWWEEKDAYS:["आ", "सो", "म", "बु", "बि", "शु", "श"], SHORTQUARTERS:["पहिलो सत्र", "दोस्रो सत्र", "तेस्रो सत्र", "चौथो सत्र"], QUARTERS:["पहिलो सत्र", "दोस्रो सत्र", "तेस्रो सत्र", "चौथो सत्र"], AMPMS:["पूर्वाह्न", "अपराह्न"], DATEFORMATS:["y MMMM d, EEEE", 
"y MMMM d", "y MMM d", "yy/M/d"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}: {0}", "{1}: {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_nl = {ERAS:["v.Chr.", "n.Chr."], ERANAMES:["voor Christus", "na Christus"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"], STANDALONEMONTHS:["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", 
"oktober", "november", "december"], SHORTMONTHS:["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"], STANDALONESHORTMONTHS:["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"], WEEKDAYS:["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"], STANDALONEWEEKDAYS:["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"], SHORTWEEKDAYS:["zo", "ma", "di", "wo", "do", "vr", "za"], STANDALONESHORTWEEKDAYS:["zo", 
"ma", "di", "wo", "do", "vr", "za"], NARROWWEEKDAYS:["Z", "M", "D", "W", "D", "V", "Z"], STANDALONENARROWWEEKDAYS:["Z", "M", "D", "W", "D", "V", "Z"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["1e kwartaal", "2e kwartaal", "3e kwartaal", "4e kwartaal"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "dd-MM-y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'om' {0}", "{1} 'om' {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_no = {ERAS:["f.Kr.", "e.Kr."], ERANAMES:["før Kristus", "etter Kristus"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"], STANDALONEMONTHS:["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", 
"november", "desember"], SHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "mai", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "des."], STANDALONESHORTMONTHS:["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"], WEEKDAYS:["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"], STANDALONEWEEKDAYS:["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"], SHORTWEEKDAYS:["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."], STANDALONESHORTWEEKDAYS:["søn.", 
"man.", "tir.", "ons.", "tor.", "fre.", "lør."], NARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE d. MMMM y", "d. MMMM y", "d. MMM y", "dd.MM.y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'kl'. {0}", "{1} 'kl'. {0}", "{1}, {0}", "{1}, {0}"], 
FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_no_NO = goog.i18n.DateTimeSymbols_no;
goog.i18n.DateTimeSymbols_or = {ERAS:["BC", "AD"], ERANAMES:["ଖ୍ରୀଷ୍ଟପୂର୍ବ", "ଖ୍ରୀଷ୍ଟାବ୍ଦ"], NARROWMONTHS:["ଜା", "ଫେ", "ମା", "ଅ", "ମଇ", "ଜୁ", "ଜୁ", "ଅ", "ସେ", "ଅ", "ନ", "ଡି"], STANDALONENARROWMONTHS:["ଜା", "ଫେ", "ମା", "ଅ", "ମଇ", "ଜୁ", "ଜୁ", "ଅ", "ସେ", "ଅ", "ନ", "ଡି"], MONTHS:["ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଅପ୍ରେଲ", "ମଇ", "ଜୁନ", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର"], STANDALONEMONTHS:["ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଅପ୍ରେଲ", "ମଇ", "ଜୁନ", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", 
"ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର"], SHORTMONTHS:["ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଅପ୍ରେଲ", "ମଇ", "ଜୁନ", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର"], STANDALONESHORTMONTHS:["ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଅପ୍ରେଲ", "ମଇ", "ଜୁନ", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର"], WEEKDAYS:["ରବିବାର", "ସୋମବାର", "ମଙ୍ଗଳବାର", "ବୁଧବାର", "ଗୁରୁବାର", "ଶୁକ୍ରବାର", "ଶନିବାର"], STANDALONEWEEKDAYS:["ରବିବାର", "ସୋମବାର", "ମଙ୍ଗଳବାର", "ବୁଧବାର", "ଗୁରୁବାର", "ଶୁକ୍ରବାର", "ଶନିବାର"], SHORTWEEKDAYS:["ରବି", 
"ସୋମ", "ମଙ୍ଗଳ", "ବୁଧ", "ଗୁରୁ", "ଶୁକ୍ର", "ଶନି"], STANDALONESHORTWEEKDAYS:["ରବି", "ସୋମ", "ମଙ୍ଗଳ", "ବୁଧ", "ଗୁରୁ", "ଶୁକ୍ର", "ଶନି"], NARROWWEEKDAYS:["ର", "ସୋ", "ମ", "ବୁ", "ଗୁ", "ଶୁ", "ଶ"], STANDALONENARROWWEEKDAYS:["ର", "ସୋ", "ମ", "ବୁ", "ଗୁ", "ଶୁ", "ଶ"], SHORTQUARTERS:["1ମ ତ୍ରୟମାସ", "2ୟ ତ୍ରୟମାସ", "3ୟ ତ୍ରୟମାସ", "4ର୍ଥ ତ୍ରୟମାସ"], QUARTERS:["1ମ ତ୍ରୟମାସ", "2ୟ ତ୍ରୟମାସ", "3ୟ ତ୍ରୟମାସ", "4ର୍ଥ ତ୍ରୟମାସ"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], TIMEFORMATS:["h:mm:ss a zzzz", 
"h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{0} ଠାରେ {1}", "{0} ଠାରେ {1}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_pa = {ERAS:["ਈ. ਪੂ.", "ਸੰਨ"], ERANAMES:["ਈਸਵੀ ਪੂਰਵ", "ਈਸਵੀ ਸੰਨ"], NARROWMONTHS:["ਜ", "ਫ਼", "ਮਾ", "ਅ", "ਮ", "ਜੂ", "ਜੁ", "ਅ", "ਸ", "ਅ", "ਨ", "ਦ"], STANDALONENARROWMONTHS:["ਜ", "ਫ਼", "ਮਾ", "ਅ", "ਮ", "ਜੂ", "ਜੁ", "ਅ", "ਸ", "ਅ", "ਨ", "ਦ"], MONTHS:["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ"], STANDALONEMONTHS:["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ"], SHORTMONTHS:["ਜਨ", 
"ਫ਼ਰ", "ਮਾਰਚ", "ਅਪ੍ਰੈ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾ", "ਅਗ", "ਸਤੰ", "ਅਕਤੂ", "ਨਵੰ", "ਦਸੰ"], STANDALONESHORTMONTHS:["ਜਨ", "ਫ਼ਰ", "ਮਾਰਚ", "ਅਪ੍ਰੈ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾ", "ਅਗ", "ਸਤੰ", "ਅਕਤੂ", "ਨਵੰ", "ਦਸੰ"], WEEKDAYS:["ਐਤਵਾਰ", "ਸੋਮਵਾਰ", "ਮੰਗਲਵਾਰ", "ਬੁੱਧਵਾਰ", "ਵੀਰਵਾਰ", "ਸ਼ੁੱਕਰਵਾਰ", "ਸ਼ਨਿੱਚਰਵਾਰ"], STANDALONEWEEKDAYS:["ਐਤਵਾਰ", "ਸੋਮਵਾਰ", "ਮੰਗਲਵਾਰ", "ਬੁੱਧਵਾਰ", "ਵੀਰਵਾਰ", "ਸ਼ੁੱਕਰਵਾਰ", "ਸ਼ਨਿੱਚਰਵਾਰ"], SHORTWEEKDAYS:["ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", "ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨਿੱਚਰ"], STANDALONESHORTWEEKDAYS:["ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", 
"ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨਿੱਚਰ"], NARROWWEEKDAYS:["ਐ", "ਸੋ", "ਮੰ", "ਬੁੱ", "ਵੀ", "ਸ਼ੁੱ", "ਸ਼"], STANDALONENARROWWEEKDAYS:["ਐ", "ਸੋ", "ਮੰ", "ਬੁੱ", "ਵੀ", "ਸ਼ੁੱ", "ਸ਼"], SHORTQUARTERS:["ਤਿਮਾਹੀ1", "ਤਿਮਾਹੀ2", "ਤਿਮਾਹੀ3", "ਤਿਮਾਹੀ4"], QUARTERS:["ਪਹਿਲੀ ਤਿਮਾਹੀ", "ਦੂਜੀ ਤਿਮਾਹੀ", "ਤੀਜੀ ਤਿਮਾਹੀ", "ਚੌਥੀ ਤਿਮਾਹੀ"], AMPMS:["ਪੂ.ਦੁ.", "ਬਾ.ਦੁ."], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1}, {0}", 
"{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_pl = {ERAS:["p.n.e.", "n.e."], ERANAMES:["przed naszą erą", "naszej ery"], NARROWMONTHS:["s", "l", "m", "k", "m", "c", "l", "s", "w", "p", "l", "g"], STANDALONENARROWMONTHS:["S", "L", "M", "K", "M", "C", "L", "S", "W", "P", "L", "G"], MONTHS:["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"], STANDALONEMONTHS:["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", 
"wrzesień", "październik", "listopad", "grudzień"], SHORTMONTHS:["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"], STANDALONESHORTMONTHS:["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"], WEEKDAYS:["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"], STANDALONEWEEKDAYS:["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"], SHORTWEEKDAYS:["niedz.", "pon.", "wt.", "śr.", "czw.", 
"pt.", "sob."], STANDALONESHORTWEEKDAYS:["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."], NARROWWEEKDAYS:["n", "p", "w", "ś", "c", "p", "s"], STANDALONENARROWWEEKDAYS:["N", "P", "W", "Ś", "C", "P", "S"], SHORTQUARTERS:["I kw.", "II kw.", "III kw.", "IV kw."], QUARTERS:["I kwartał", "II kwartał", "III kwartał", "IV kwartał"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d.MM.y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", 
"{1} {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_pt = {ERAS:["a.C.", "d.C."], ERANAMES:["antes de Cristo", "depois de Cristo"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"], STANDALONEMONTHS:["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", 
"outubro", "novembro", "dezembro"], SHORTMONTHS:["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."], STANDALONESHORTMONTHS:["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."], WEEKDAYS:["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"], STANDALONEWEEKDAYS:["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"], SHORTWEEKDAYS:["dom.", 
"seg.", "ter.", "qua.", "qui.", "sex.", "sáb."], STANDALONESHORTWEEKDAYS:["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."], NARROWWEEKDAYS:["D", "S", "T", "Q", "Q", "S", "S"], STANDALONENARROWWEEKDAYS:["D", "S", "T", "Q", "Q", "S", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", "d 'de' MMM 'de' y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", 
"HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'às' {0}", "{1} 'às' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_pt_BR = goog.i18n.DateTimeSymbols_pt;
goog.i18n.DateTimeSymbols_pt_PT = {ERAS:["a.C.", "d.C."], ERANAMES:["antes de Cristo", "depois de Cristo"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"], STANDALONEMONTHS:["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", 
"outubro", "novembro", "dezembro"], SHORTMONTHS:["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."], STANDALONESHORTMONTHS:["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."], WEEKDAYS:["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"], STANDALONEWEEKDAYS:["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"], SHORTWEEKDAYS:["domingo", 
"segunda", "terça", "quarta", "quinta", "sexta", "sábado"], STANDALONESHORTWEEKDAYS:["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"], NARROWWEEKDAYS:["D", "S", "T", "Q", "Q", "S", "S"], STANDALONENARROWWEEKDAYS:["D", "S", "T", "Q", "Q", "S", "S"], SHORTQUARTERS:["T1", "T2", "T3", "T4"], QUARTERS:["1.º trimestre", "2.º trimestre", "3.º trimestre", "4.º trimestre"], AMPMS:["da manhã", "da tarde"], DATEFORMATS:["EEEE, d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", "dd/MM/y", "dd/MM/yy"], 
TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'às' {0}", "{1} 'às' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:2};
goog.i18n.DateTimeSymbols_ro = {ERAS:["î.Hr.", "d.Hr."], ERANAMES:["înainte de Hristos", "după Hristos"], NARROWMONTHS:["I", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["I", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"], MONTHS:["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"], STANDALONEMONTHS:["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", 
"septembrie", "octombrie", "noiembrie", "decembrie"], SHORTMONTHS:["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."], STANDALONESHORTMONTHS:["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."], WEEKDAYS:["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"], STANDALONEWEEKDAYS:["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"], SHORTWEEKDAYS:["dum.", "lun.", "mar.", "mie.", 
"joi", "vin.", "sâm."], STANDALONESHORTWEEKDAYS:["dum.", "lun.", "mar.", "mie.", "joi", "vin.", "sâm."], NARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], STANDALONENARROWWEEKDAYS:["D", "L", "M", "M", "J", "V", "S"], SHORTQUARTERS:["trim. I", "trim. II", "trim. III", "trim. IV"], QUARTERS:["trimestrul I", "trimestrul al II-lea", "trimestrul al III-lea", "trimestrul al IV-lea"], AMPMS:["a.m.", "p.m."], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "dd.MM.y"], TIMEFORMATS:["HH:mm:ss zzzz", 
"HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'la' {0}", "{1} 'la' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_ru = {ERAS:["до н. э.", "н. э."], ERANAMES:["до Рождества Христова", "от Рождества Христова"], NARROWMONTHS:["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"], STANDALONENARROWMONTHS:["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"], MONTHS:["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"], STANDALONEMONTHS:["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", 
"октябрь", "ноябрь", "декабрь"], SHORTMONTHS:["янв.", "февр.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."], STANDALONESHORTMONTHS:["янв.", "февр.", "март", "апр.", "май", "июнь", "июль", "авг.", "сент.", "окт.", "нояб.", "дек."], WEEKDAYS:["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"], STANDALONEWEEKDAYS:["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"], SHORTWEEKDAYS:["вс", "пн", "вт", "ср", 
"чт", "пт", "сб"], STANDALONESHORTWEEKDAYS:["вс", "пн", "вт", "ср", "чт", "пт", "сб"], NARROWWEEKDAYS:["В", "П", "В", "С", "Ч", "П", "С"], STANDALONENARROWWEEKDAYS:["В", "П", "В", "С", "Ч", "П", "С"], SHORTQUARTERS:["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."], QUARTERS:["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM y 'г'.", "d MMMM y 'г'.", "d MMM y 'г'.", "dd.MM.y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'в' {0}", 
"{1} 'в' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_sh = {ERAS:["p. n. e.", "n. e."], ERANAMES:["pre nove ere", "nove ere"], NARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], STANDALONENARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], MONTHS:["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"], STANDALONEMONTHS:["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", 
"decembar"], SHORTMONTHS:["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"], STANDALONESHORTMONTHS:["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"], WEEKDAYS:["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"], STANDALONEWEEKDAYS:["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"], SHORTWEEKDAYS:["ned", "pon", "uto", "sre", "čet", "pet", "sub"], STANDALONESHORTWEEKDAYS:["ned", "pon", 
"uto", "sre", "čet", "pet", "sub"], NARROWWEEKDAYS:["n", "p", "u", "s", "č", "p", "s"], STANDALONENARROWWEEKDAYS:["n", "p", "u", "s", "č", "p", "s"], SHORTQUARTERS:["1. kv.", "2. kv.", "3. kv.", "4. kv."], QUARTERS:["prvi kvartal", "drugi kvartal", "treći kvartal", "četvrti kvartal"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d. MMMM y.", "d. MMMM y.", "d. M. y.", "d.M.yy."], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], 
FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_si = {ERAS:["ක්‍රි.පූ.", "ක්‍රි.ව."], ERANAMES:["ක්‍රිස්තු පූර්ව", "ක්‍රිස්තු වර්ෂ"], NARROWMONTHS:["ජ", "පෙ", "මා", "අ", "මැ", "ජූ", "ජූ", "අ", "සැ", "ඔ", "නෙ", "දෙ"], STANDALONENARROWMONTHS:["ජ", "පෙ", "මා", "අ", "මැ", "ජූ", "ජූ", "අ", "සැ", "ඔ", "නෙ", "දෙ"], MONTHS:["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"], STANDALONEMONTHS:["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", 
"ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"], SHORTMONTHS:["ජන", "පෙබ", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝ", "සැප්", "ඔක්", "නොවැ", "දෙසැ"], STANDALONESHORTMONTHS:["ජන", "පෙබ", "මාර්", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝ", "සැප්", "ඔක්", "නොවැ", "දෙසැ"], WEEKDAYS:["ඉරිදා", "සඳුදා", "අඟහරුවාදා", "බදාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා"], STANDALONEWEEKDAYS:["ඉරිදා", "සඳුදා", "අඟහරුවාදා", "බදාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා"], 
SHORTWEEKDAYS:["ඉරිදා", "සඳුදා", "අඟහ", "බදාදා", "බ්‍රහස්", "සිකු", "සෙන"], STANDALONESHORTWEEKDAYS:["ඉරිදා", "සඳුදා", "අඟහ", "බදාදා", "බ්‍රහස්", "සිකු", "සෙන"], NARROWWEEKDAYS:["ඉ", "ස", "අ", "බ", "බ්‍ර", "සි", "සෙ"], STANDALONENARROWWEEKDAYS:["ඉ", "ස", "අ", "බ", "බ්‍ර", "සි", "සෙ"], SHORTQUARTERS:["කාර්:1", "කාර්:2", "කාර්:3", "කාර්:4"], QUARTERS:["1 වන කාර්තුව", "2 වන කාර්තුව", "3 වන කාර්තුව", "4 වන කාර්තුව"], AMPMS:["පෙ.ව.", "ප.ව."], DATEFORMATS:["y MMMM d, EEEE", "y MMMM d", "y MMM d", "y-MM-dd"], 
TIMEFORMATS:["HH.mm.ss zzzz", "HH.mm.ss z", "HH.mm.ss", "HH.mm"], DATETIMEFORMATS:["{1} දින {0}", "{1} දින {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_sk = {ERAS:["pred Kr.", "po Kr."], ERANAMES:["pred Kristom", "po Kristovi"], NARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], STANDALONENARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], MONTHS:["januára", "februára", "marca", "apríla", "mája", "júna", "júla", "augusta", "septembra", "októbra", "novembra", "decembra"], STANDALONEMONTHS:["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", 
"november", "december"], SHORTMONTHS:["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec"], STANDALONESHORTMONTHS:["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec"], WEEKDAYS:["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"], STANDALONEWEEKDAYS:["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"], SHORTWEEKDAYS:["ne", "po", "ut", "st", "št", "pi", "so"], STANDALONESHORTWEEKDAYS:["ne", "po", 
"ut", "st", "št", "pi", "so"], NARROWWEEKDAYS:["n", "p", "u", "s", "š", "p", "s"], STANDALONENARROWWEEKDAYS:["n", "p", "u", "s", "š", "p", "s"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["1. štvrťrok", "2. štvrťrok", "3. štvrťrok", "4. štvrťrok"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE d. MMMM y", "d. MMMM y", "d. M. y", "d. M. y"], TIMEFORMATS:["H:mm:ss zzzz", "H:mm:ss z", "H:mm:ss", "H:mm"], DATETIMEFORMATS:["{1} 'o' {0}", "{1} 'o' {0}", "{1}, {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 
6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_sl = {ERAS:["pr. Kr.", "po Kr."], ERANAMES:["pred Kristusom", "po Kristusu"], NARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], STANDALONENARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], MONTHS:["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"], STANDALONEMONTHS:["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", 
"november", "december"], SHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec."], STANDALONESHORTMONTHS:["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec."], WEEKDAYS:["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"], STANDALONEWEEKDAYS:["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"], SHORTWEEKDAYS:["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."], 
STANDALONESHORTWEEKDAYS:["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."], NARROWWEEKDAYS:["n", "p", "t", "s", "č", "p", "s"], STANDALONENARROWWEEKDAYS:["n", "p", "t", "s", "č", "p", "s"], SHORTQUARTERS:["1. čet.", "2. čet.", "3. čet.", "4. čet."], QUARTERS:["1. četrtletje", "2. četrtletje", "3. četrtletje", "4. četrtletje"], AMPMS:["dop.", "pop."], DATEFORMATS:["EEEE, d. MMMM y", "d. MMMM y", "d. MMM y", "d. MM. yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'ob' {0}", 
"{1} 'ob' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_sq = {ERAS:["p.K.", "mb.K."], ERANAMES:["para Krishtit", "mbas Krishtit"], NARROWMONTHS:["j", "sh", "m", "p", "m", "q", "k", "g", "sh", "t", "n", "dh"], STANDALONENARROWMONTHS:["j", "sh", "m", "p", "m", "q", "k", "g", "sh", "t", "n", "dh"], MONTHS:["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"], STANDALONEMONTHS:["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", 
"nëntor", "dhjetor"], SHORTMONTHS:["jan", "shk", "mar", "pri", "maj", "qer", "korr", "gush", "sht", "tet", "nën", "dhj"], STANDALONESHORTMONTHS:["jan", "shk", "mar", "pri", "maj", "qer", "korr", "gush", "sht", "tet", "nën", "dhj"], WEEKDAYS:["e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë"], STANDALONEWEEKDAYS:["e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë"], SHORTWEEKDAYS:["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"], STANDALONESHORTWEEKDAYS:["die", 
"hën", "mar", "mër", "enj", "pre", "sht"], NARROWWEEKDAYS:["d", "h", "m", "m", "e", "p", "sh"], STANDALONENARROWWEEKDAYS:["d", "h", "m", "m", "e", "p", "sh"], SHORTQUARTERS:["tremujori I", "tremujori II", "tremujori III", "tremujori IV"], QUARTERS:["tremujori i parë", "tremujori i dytë", "tremujori i tretë", "tremujori i katërt"], AMPMS:["e paradites", "e pasdites"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "d.M.yy"], TIMEFORMATS:["h:mm:ss a, zzzz", "h:mm:ss a, z", "h:mm:ss a", "h:mm a"], 
DATETIMEFORMATS:["{1} 'në' {0}", "{1} 'në' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_sr = {ERAS:["п. н. е.", "н. е."], ERANAMES:["пре нове ере", "нове ере"], NARROWMONTHS:["ј", "ф", "м", "а", "м", "ј", "ј", "а", "с", "о", "н", "д"], STANDALONENARROWMONTHS:["ј", "ф", "м", "а", "м", "ј", "ј", "а", "с", "о", "н", "д"], MONTHS:["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"], STANDALONEMONTHS:["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", 
"децембар"], SHORTMONTHS:["јан", "феб", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "нов", "дец"], STANDALONESHORTMONTHS:["јан", "феб", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "нов", "дец"], WEEKDAYS:["недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота"], STANDALONEWEEKDAYS:["недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота"], SHORTWEEKDAYS:["нед", "пон", "уто", "сре", "чет", "пет", "суб"], STANDALONESHORTWEEKDAYS:["нед", "пон", 
"уто", "сре", "чет", "пет", "суб"], NARROWWEEKDAYS:["н", "п", "у", "с", "ч", "п", "с"], STANDALONENARROWWEEKDAYS:["н", "п", "у", "с", "ч", "п", "с"], SHORTQUARTERS:["1. кв.", "2. кв.", "3. кв.", "4. кв."], QUARTERS:["први квартал", "други квартал", "трећи квартал", "четврти квартал"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d. MMMM y.", "d. MMMM y.", "d. M. y.", "d.M.yy."], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], 
FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_sr_Latn = {ERAS:["p. n. e.", "n. e."], ERANAMES:["pre nove ere", "nove ere"], NARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], STANDALONENARROWMONTHS:["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"], MONTHS:["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"], STANDALONEMONTHS:["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", 
"novembar", "decembar"], SHORTMONTHS:["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"], STANDALONESHORTMONTHS:["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"], WEEKDAYS:["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"], STANDALONEWEEKDAYS:["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"], SHORTWEEKDAYS:["ned", "pon", "uto", "sre", "čet", "pet", "sub"], STANDALONESHORTWEEKDAYS:["ned", 
"pon", "uto", "sre", "čet", "pet", "sub"], NARROWWEEKDAYS:["n", "p", "u", "s", "č", "p", "s"], STANDALONENARROWWEEKDAYS:["n", "p", "u", "s", "č", "p", "s"], SHORTQUARTERS:["1. kv.", "2. kv.", "3. kv.", "4. kv."], QUARTERS:["prvi kvartal", "drugi kvartal", "treći kvartal", "četvrti kvartal"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d. MMMM y.", "d. MMMM y.", "d. M. y.", "d.M.yy."], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], 
FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_sv = {ERAS:["f.Kr.", "e.Kr."], ERANAMES:["före Kristus", "efter Kristus"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"], STANDALONEMONTHS:["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", 
"november", "december"], SHORTMONTHS:["jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec."], STANDALONESHORTMONTHS:["jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec."], WEEKDAYS:["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"], STANDALONEWEEKDAYS:["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"], SHORTWEEKDAYS:["sön", "mån", "tis", "ons", "tors", "fre", "lör"], STANDALONESHORTWEEKDAYS:["sön", 
"mån", "tis", "ons", "tors", "fre", "lör"], NARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "O", "T", "F", "L"], SHORTQUARTERS:["K1", "K2", "K3", "K4"], QUARTERS:["1:a kvartalet", "2:a kvartalet", "3:e kvartalet", "4:e kvartalet"], AMPMS:["fm", "em"], DATEFORMATS:["EEEE d MMMM y", "d MMMM y", "d MMM y", "y-MM-dd"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'kl'. {0}", "{1} 'kl'. {0}", "{1} {0}", "{1} {0}"], 
FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:3};
goog.i18n.DateTimeSymbols_sw = {ERAS:["KK", "BK"], ERANAMES:["Kabla ya Kristo", "Baada ya Kristo"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba"], STANDALONEMONTHS:["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", 
"Novemba", "Desemba"], SHORTMONTHS:["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des"], WEEKDAYS:["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"], STANDALONEWEEKDAYS:["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"], SHORTWEEKDAYS:["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", 
"Jumamosi"], STANDALONESHORTWEEKDAYS:["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["Robo ya 1", "Robo ya 2", "Robo ya 3", "Robo ya 4"], QUARTERS:["Robo ya 1", "Robo ya 2", "Robo ya 3", "Robo ya 4"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, d MMMM y", "d MMMM y", "d MMM y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", 
"HH:mm"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_ta = {ERAS:["கி.மு.", "கி.பி."], ERANAMES:["கிறிஸ்துவுக்கு முன்", "அன்னோ டோமினி"], NARROWMONTHS:["ஜ", "பி", "மா", "ஏ", "மே", "ஜூ", "ஜூ", "ஆ", "செ", "அ", "ந", "டி"], STANDALONENARROWMONTHS:["ஜ", "பி", "மா", "ஏ", "மே", "ஜூ", "ஜூ", "ஆ", "செ", "அ", "ந", "டி"], MONTHS:["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"], STANDALONEMONTHS:["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", 
"செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"], SHORTMONTHS:["ஜன.", "பிப்.", "மார்.", "ஏப்.", "மே", "ஜூன்", "ஜூலை", "ஆக.", "செப்.", "அக்.", "நவ.", "டிச."], STANDALONESHORTMONTHS:["ஜன.", "பிப்.", "மார்.", "ஏப்.", "மே", "ஜூன்", "ஜூலை", "ஆக.", "செப்.", "அக்.", "நவ.", "டிச."], WEEKDAYS:["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"], STANDALONEWEEKDAYS:["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"], SHORTWEEKDAYS:["ஞாயி.", "திங்.", "செவ்.", "புத.", "வியா.", 
"வெள்.", "சனி"], STANDALONESHORTWEEKDAYS:["ஞாயி.", "திங்.", "செவ்.", "புத.", "வியா.", "வெள்.", "சனி"], NARROWWEEKDAYS:["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"], STANDALONENARROWWEEKDAYS:["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"], SHORTQUARTERS:["காலா.1", "காலா.2", "காலா.3", "காலா.4"], QUARTERS:["ஒன்றாம் காலாண்டு", "இரண்டாம் காலாண்டு", "மூன்றாம் காலாண்டு", "நான்காம் காலாண்டு"], AMPMS:["முற்பகல்", "பிற்பகல்"], DATEFORMATS:["EEEE, d MMMM, y", "d MMMM, y", "d MMM, y", "d/M/yy"], TIMEFORMATS:["a h:mm:ss zzzz", 
"a h:mm:ss z", "a h:mm:ss", "a h:mm"], DATETIMEFORMATS:["{1} அன்று {0}", "{1} அன்று {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_te = {ERAS:["క్రీపూ", "క్రీశ"], ERANAMES:["క్రీస్తు పూర్వం", "క్రీస్తు శకం"], NARROWMONTHS:["జ", "ఫి", "మా", "ఏ", "మే", "జూ", "జు", "ఆ", "సె", "అ", "న", "డి"], STANDALONENARROWMONTHS:["జ", "ఫి", "మా", "ఏ", "మే", "జూ", "జు", "ఆ", "సె", "అ", "న", "డి"], MONTHS:["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జులై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"], STANDALONEMONTHS:["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జులై", "ఆగస్టు", 
"సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"], SHORTMONTHS:["జన", "ఫిబ్ర", "మార్చి", "ఏప్రి", "మే", "జూన్", "జులై", "ఆగ", "సెప్టెం", "అక్టో", "నవం", "డిసెం"], STANDALONESHORTMONTHS:["జన", "ఫిబ్ర", "మార్చి", "ఏప్రి", "మే", "జూన్", "జులై", "ఆగ", "సెప్టెం", "అక్టో", "నవం", "డిసెం"], WEEKDAYS:["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"], STANDALONEWEEKDAYS:["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"], SHORTWEEKDAYS:["ఆది", "సోమ", 
"మంగళ", "బుధ", "గురు", "శుక్ర", "శని"], STANDALONESHORTWEEKDAYS:["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"], NARROWWEEKDAYS:["ఆ", "సో", "మ", "బు", "గు", "శు", "శ"], STANDALONENARROWWEEKDAYS:["ఆ", "సో", "మ", "బు", "గు", "శు", "శ"], SHORTQUARTERS:["త్రై1", "త్రై2", "త్రై3", "త్రై4"], QUARTERS:["1వ త్రైమాసికం", "2వ త్రైమాసికం", "3వ త్రైమాసికం", "4వ త్రైమాసికం"], AMPMS:["AM", "PM"], DATEFORMATS:["d, MMMM y, EEEE", "d MMMM, y", "d MMM, y", "dd-MM-yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", 
"h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} {0}కి", "{1} {0}కి", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[6, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_th = {ERAS:["ก่อน ค.ศ.", "ค.ศ."], ERANAMES:["ปีก่อนคริสตกาล", "คริสต์ศักราช"], NARROWMONTHS:["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."], STANDALONENARROWMONTHS:["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."], MONTHS:["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"], STANDALONEMONTHS:["มกราคม", 
"กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"], SHORTMONTHS:["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."], STANDALONESHORTMONTHS:["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."], WEEKDAYS:["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"], STANDALONEWEEKDAYS:["วันอาทิตย์", "วันจันทร์", 
"วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"], SHORTWEEKDAYS:["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."], STANDALONESHORTWEEKDAYS:["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."], NARROWWEEKDAYS:["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"], STANDALONENARROWWEEKDAYS:["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"], SHORTQUARTERS:["ไตรมาส 1", "ไตรมาส 2", "ไตรมาส 3", "ไตรมาส 4"], QUARTERS:["ไตรมาส 1", "ไตรมาส 2", "ไตรมาส 3", "ไตรมาส 4"], AMPMS:["ก่อนเที่ยง", "หลังเที่ยง"], DATEFORMATS:["EEEEที่ d MMMM G y", 
"d MMMM G y", "d MMM y", "d/M/yy"], TIMEFORMATS:["H นาฬิกา mm นาที ss วินาที zzzz", "H นาฬิกา mm นาที ss วินาที z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} เวลา {0}", "{1} เวลา {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_tl = {ERAS:["BC", "AD"], ERANAMES:["Before Christ", "Anno Domini"], NARROWMONTHS:["Ene", "Peb", "Mar", "Abr", "May", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], STANDALONENARROWMONTHS:["E", "P", "M", "A", "M", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], MONTHS:["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"], STANDALONEMONTHS:["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", 
"Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"], SHORTMONTHS:["Ene", "Peb", "Mar", "Abr", "May", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], STANDALONESHORTMONTHS:["Ene", "Peb", "Mar", "Abr", "May", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"], WEEKDAYS:["Linggo", "Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado"], STANDALONEWEEKDAYS:["Linggo", "Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado"], SHORTWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", 
"Biy", "Sab"], STANDALONESHORTWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"], NARROWWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"], STANDALONENARROWWEEKDAYS:["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["ika-1 quarter", "ika-2 quarter", "ika-3 quarter", "ika-4 na quarter"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", 
"h:mm a"], DATETIMEFORMATS:["{1} 'nang' {0}", "{1} 'nang' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_tr = {ERAS:["MÖ", "MS"], ERANAMES:["Milattan Önce", "Milattan Sonra"], NARROWMONTHS:["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"], STANDALONENARROWMONTHS:["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"], MONTHS:["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], STANDALONEMONTHS:["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], 
SHORTMONTHS:["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"], STANDALONESHORTMONTHS:["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"], WEEKDAYS:["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"], STANDALONEWEEKDAYS:["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"], SHORTWEEKDAYS:["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"], STANDALONESHORTWEEKDAYS:["Paz", "Pzt", "Sal", "Çar", 
"Per", "Cum", "Cmt"], NARROWWEEKDAYS:["P", "P", "S", "Ç", "P", "C", "C"], STANDALONENARROWWEEKDAYS:["P", "P", "S", "Ç", "P", "C", "C"], SHORTQUARTERS:["Ç1", "Ç2", "Ç3", "Ç4"], QUARTERS:["1. çeyrek", "2. çeyrek", "3. çeyrek", "4. çeyrek"], AMPMS:["ÖÖ", "ÖS"], DATEFORMATS:["d MMMM y EEEE", "d MMMM y", "d MMM y", "d.MM.y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_uk = {ERAS:["до н. е.", "н. е."], ERANAMES:["до нашої ери", "нашої ери"], NARROWMONTHS:["с", "л", "б", "к", "т", "ч", "л", "с", "в", "ж", "л", "г"], STANDALONENARROWMONTHS:["С", "Л", "Б", "К", "Т", "Ч", "Л", "С", "В", "Ж", "Л", "Г"], MONTHS:["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"], STANDALONEMONTHS:["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", 
"жовтень", "листопад", "грудень"], SHORTMONTHS:["січ.", "лют.", "бер.", "квіт.", "трав.", "черв.", "лип.", "серп.", "вер.", "жовт.", "лист.", "груд."], STANDALONESHORTMONTHS:["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "гру"], WEEKDAYS:["неділя", "понеділок", "вівторок", "середа", "четвер", "пʼятниця", "субота"], STANDALONEWEEKDAYS:["неділя", "понеділок", "вівторок", "середа", "четвер", "пʼятниця", "субота"], SHORTWEEKDAYS:["нд", "пн", "вт", "ср", "чт", "пт", "сб"], 
STANDALONESHORTWEEKDAYS:["нд", "пн", "вт", "ср", "чт", "пт", "сб"], NARROWWEEKDAYS:["Н", "П", "В", "С", "Ч", "П", "С"], STANDALONENARROWWEEKDAYS:["Н", "П", "В", "С", "Ч", "П", "С"], SHORTQUARTERS:["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."], QUARTERS:["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"], AMPMS:["дп", "пп"], DATEFORMATS:["EEEE, d MMMM y 'р'.", "d MMMM y 'р'.", "d MMM y 'р'.", "dd.MM.yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} 'о' {0}", 
"{1} 'о' {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_ur = {ERAS:["قبل مسیح", "عیسوی"], ERANAMES:["قبل مسیح", "عیسوی"], NARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"], STANDALONEMONTHS:["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"], SHORTMONTHS:["جنوری", 
"فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"], STANDALONESHORTMONTHS:["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"], WEEKDAYS:["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"], STANDALONEWEEKDAYS:["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"], SHORTWEEKDAYS:["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"], STANDALONESHORTWEEKDAYS:["اتوار", "پیر", "منگل", "بدھ", "جمعرات", 
"جمعہ", "ہفتہ"], NARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], STANDALONENARROWWEEKDAYS:["S", "M", "T", "W", "T", "F", "S"], SHORTQUARTERS:["پہلی سہ ماہی", "دوسری سہ ماہی", "تیسری سہ ماہی", "چوتهی سہ ماہی"], QUARTERS:["پہلی سہ ماہی", "دوسری سہ ماہی", "تیسری سہ ماہی", "چوتهی سہ ماہی"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE، d MMMM، y", "d MMMM، y", "d MMM، y", "d/M/yy"], TIMEFORMATS:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], DATETIMEFORMATS:["{1} کو {0}", "{1} کو {0}", "{1}، {0}", 
"{1}، {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_uz = {ERAS:["m.a.", "milodiy"], ERANAMES:["miloddan avvalgi", "milodiy"], NARROWMONTHS:["Y", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["Y", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"], MONTHS:["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"], STANDALONEMONTHS:["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"], 
SHORTMONTHS:["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"], STANDALONESHORTMONTHS:["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"], WEEKDAYS:["yakshanba", "dushanba", "seshanba", "chorshanba", "payshanba", "juma", "shanba"], STANDALONEWEEKDAYS:["yakshanba", "dushanba", "seshanba", "chorshanba", "payshanba", "juma", "shanba"], SHORTWEEKDAYS:["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"], STANDALONESHORTWEEKDAYS:["Yak", 
"Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"], NARROWWEEKDAYS:["Y", "D", "S", "C", "P", "J", "S"], STANDALONENARROWWEEKDAYS:["Y", "D", "S", "C", "P", "J", "S"], SHORTQUARTERS:["1-ch", "2-ch", "3-ch", "4-ch"], QUARTERS:["1-chorak", "2-chorak", "3-chorak", "4-chorak"], AMPMS:["TO", "TK"], DATEFORMATS:["EEEE, d-MMMM, y", "d-MMMM, y", "d-MMM, y", "dd/MM/yy"], TIMEFORMATS:["H:mm:ss (zzzz)", "H:mm:ss (z)", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1}, {0}", "{1}, {0}", "{1}, {0}", "{1}, {0}"], FIRSTDAYOFWEEK:0, 
WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_vi = {ERAS:["TCN", "CN"], ERANAMES:["Trước Thiên Chúa", "Sau Công Nguyên"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"], STANDALONEMONTHS:["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", 
"Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"], SHORTMONTHS:["thg 1", "thg 2", "thg 3", "thg 4", "thg 5", "thg 6", "thg 7", "thg 8", "thg 9", "thg 10", "thg 11", "thg 12"], STANDALONESHORTMONTHS:["Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6", "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"], WEEKDAYS:["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"], STANDALONEWEEKDAYS:["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"], 
SHORTWEEKDAYS:["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"], STANDALONESHORTWEEKDAYS:["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"], NARROWWEEKDAYS:["CN", "T2", "T3", "T4", "T5", "T6", "T7"], STANDALONENARROWWEEKDAYS:["CN", "T2", "T3", "T4", "T5", "T6", "T7"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["Quý 1", "Quý 2", "Quý 3", "Quý 4"], AMPMS:["SA", "CH"], DATEFORMATS:["EEEE, d MMMM, y", "d MMMM, y", "d MMM, y", "dd/MM/y"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", 
"HH:mm"], DATETIMEFORMATS:["'lúc' {0} {1}", "'lúc' {0} {1}", "{0} {1}", "{0} {1}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_zh = {ERAS:["公元前", "公元"], ERANAMES:["公元前", "公元"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], STANDALONEMONTHS:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], SHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], 
STANDALONESHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], WEEKDAYS:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], STANDALONEWEEKDAYS:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], SHORTWEEKDAYS:["周日", "周一", "周二", "周三", "周四", "周五", "周六"], STANDALONESHORTWEEKDAYS:["周日", "周一", "周二", "周三", "周四", "周五", "周六"], NARROWWEEKDAYS:["日", "一", "二", "三", "四", "五", "六"], STANDALONENARROWWEEKDAYS:["日", "一", "二", "三", "四", "五", "六"], SHORTQUARTERS:["1季度", "2季度", "3季度", 
"4季度"], QUARTERS:["第一季度", "第二季度", "第三季度", "第四季度"], AMPMS:["上午", "下午"], DATEFORMATS:["y年M月d日EEEE", "y年M月d日", "y年M月d日", "y/M/d"], TIMEFORMATS:["zzzz HH:mm:ss", "z HH:mm:ss", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:0, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:6};
goog.i18n.DateTimeSymbols_zh_CN = goog.i18n.DateTimeSymbols_zh;
goog.i18n.DateTimeSymbols_zh_HK = {ERAS:["公元前", "公元"], ERANAMES:["公元前", "公元"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], STANDALONEMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], SHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", 
"12月"], STANDALONESHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], WEEKDAYS:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], STANDALONEWEEKDAYS:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], SHORTWEEKDAYS:["週日", "週一", "週二", "週三", "週四", "週五", "週六"], STANDALONESHORTWEEKDAYS:["週日", "週一", "週二", "週三", "週四", "週五", "週六"], NARROWWEEKDAYS:["日", "一", "二", "三", "四", "五", "六"], STANDALONENARROWWEEKDAYS:["日", "一", "二", "三", "四", "五", "六"], SHORTQUARTERS:["Q1", "Q2", 
"Q3", "Q4"], QUARTERS:["第1季", "第2季", "第3季", "第4季"], AMPMS:["上午", "下午"], DATEFORMATS:["y年M月d日EEEE", "y年M月d日", "y年M月d日", "d/M/y"], TIMEFORMATS:["ah:mm:ss [zzzz]", "ah:mm:ss [z]", "ah:mm:ss", "ah:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_zh_TW = {ERAS:["西元前", "西元"], ERANAMES:["西元前", "西元"], NARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], STANDALONENARROWMONTHS:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], MONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], STANDALONEMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], SHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", 
"12月"], STANDALONESHORTMONTHS:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], WEEKDAYS:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], STANDALONEWEEKDAYS:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], SHORTWEEKDAYS:["週日", "週一", "週二", "週三", "週四", "週五", "週六"], STANDALONESHORTWEEKDAYS:["週日", "週一", "週二", "週三", "週四", "週五", "週六"], NARROWWEEKDAYS:["日", "一", "二", "三", "四", "五", "六"], STANDALONENARROWWEEKDAYS:["日", "一", "二", "三", "四", "五", "六"], SHORTQUARTERS:["第1季", "第2季", 
"第3季", "第4季"], QUARTERS:["第1季", "第2季", "第3季", "第4季"], AMPMS:["上午", "下午"], DATEFORMATS:["y年M月d日 EEEE", "y年M月d日", "y年M月d日", "y/M/d"], TIMEFORMATS:["Bh:mm:ss [zzzz]", "Bh:mm:ss [z]", "Bh:mm:ss", "Bh:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", "{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbols_zu = {ERAS:["BC", "AD"], ERANAMES:["BC", "AD"], NARROWMONTHS:["J", "F", "M", "E", "M", "J", "J", "A", "S", "O", "N", "D"], STANDALONENARROWMONTHS:["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], MONTHS:["Januwari", "Februwari", "Mashi", "Ephreli", "Meyi", "Juni", "Julayi", "Agasti", "Septhemba", "Okthoba", "Novemba", "Disemba"], STANDALONEMONTHS:["Januwari", "Februwari", "Mashi", "Ephreli", "Meyi", "Juni", "Julayi", "Agasti", "Septhemba", "Okthoba", "Novemba", 
"Disemba"], SHORTMONTHS:["Jan", "Feb", "Mas", "Eph", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis"], STANDALONESHORTMONTHS:["Jan", "Feb", "Mas", "Eph", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis"], WEEKDAYS:["ISonto", "UMsombuluko", "ULwesibili", "ULwesithathu", "ULwesine", "ULwesihlanu", "UMgqibelo"], STANDALONEWEEKDAYS:["ISonto", "UMsombuluko", "ULwesibili", "ULwesithathu", "ULwesine", "ULwesihlanu", "UMgqibelo"], SHORTWEEKDAYS:["Son", "Mso", "Bil", "Tha", "Sin", "Hla", "Mgq"], 
STANDALONESHORTWEEKDAYS:["Son", "Mso", "Bil", "Tha", "Sin", "Hla", "Mgq"], NARROWWEEKDAYS:["S", "M", "B", "T", "S", "H", "M"], STANDALONENARROWWEEKDAYS:["S", "M", "B", "T", "S", "H", "M"], SHORTQUARTERS:["Q1", "Q2", "Q3", "Q4"], QUARTERS:["ikota yesi-1", "ikota yesi-2", "ikota yesi-3", "ikota yesi-4"], AMPMS:["AM", "PM"], DATEFORMATS:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], TIMEFORMATS:["HH:mm:ss zzzz", "HH:mm:ss z", "HH:mm:ss", "HH:mm"], DATETIMEFORMATS:["{1} {0}", "{1} {0}", "{1} {0}", 
"{1} {0}"], FIRSTDAYOFWEEK:6, WEEKENDRANGE:[5, 6], FIRSTWEEKCUTOFFDAY:5};
goog.i18n.DateTimeSymbolsType = function() {
};
goog.i18n.DateTimeSymbolsType.prototype.ERAS;
goog.i18n.DateTimeSymbolsType.prototype.ERANAMES;
goog.i18n.DateTimeSymbolsType.prototype.NARROWMONTHS;
goog.i18n.DateTimeSymbolsType.prototype.STANDALONENARROWMONTHS;
goog.i18n.DateTimeSymbolsType.prototype.MONTHS;
goog.i18n.DateTimeSymbolsType.prototype.STANDALONEMONTHS;
goog.i18n.DateTimeSymbolsType.prototype.SHORTMONTHS;
goog.i18n.DateTimeSymbolsType.prototype.STANDALONESHORTMONTHS;
goog.i18n.DateTimeSymbolsType.prototype.WEEKDAYS;
goog.i18n.DateTimeSymbolsType.prototype.SHORTWEEKDAYS;
goog.i18n.DateTimeSymbolsType.prototype.STANDALONESHORTWEEKDAYS;
goog.i18n.DateTimeSymbolsType.prototype.STANDALONEWEEKDAYS;
goog.i18n.DateTimeSymbolsType.prototype.NARROWWEEKDAYS;
goog.i18n.DateTimeSymbolsType.prototype.STANDALONENARROWWEEKDAYS;
goog.i18n.DateTimeSymbolsType.prototype.SHORTQUARTERS;
goog.i18n.DateTimeSymbolsType.prototype.QUARTERS;
goog.i18n.DateTimeSymbolsType.prototype.AMPMS;
goog.i18n.DateTimeSymbolsType.prototype.DATEFORMATS;
goog.i18n.DateTimeSymbolsType.prototype.TIMEFORMATS;
goog.i18n.DateTimeSymbolsType.prototype.DATETIMEFORMATS;
goog.i18n.DateTimeSymbolsType.prototype.ZERODIGIT;
goog.i18n.DateTimeSymbolsType.prototype.FIRSTDAYOFWEEK;
goog.i18n.DateTimeSymbolsType.prototype.WEEKENDRANGE;
goog.i18n.DateTimeSymbolsType.prototype.FIRSTWEEKCUTOFFDAY;
goog.i18n.DateTimeSymbols;
goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en;
switch(goog.LOCALE) {
  case "en_ISO":
  case "en-ISO":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_ISO;
    break;
  case "af":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_af;
    break;
  case "am":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_am;
    break;
  case "ar":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar;
    break;
  case "ar_DZ":
  case "ar-DZ":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar_DZ;
    break;
  case "ar_EG":
  case "ar-EG":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ar_EG;
    break;
  case "az":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_az;
    break;
  case "be":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_be;
    break;
  case "bg":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_bg;
    break;
  case "bn":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_bn;
    break;
  case "br":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_br;
    break;
  case "bs":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_bs;
    break;
  case "ca":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ca;
    break;
  case "chr":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_chr;
    break;
  case "cs":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_cs;
    break;
  case "cy":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_cy;
    break;
  case "da":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_da;
    break;
  case "de":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de;
    break;
  case "de_AT":
  case "de-AT":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de_AT;
    break;
  case "de_CH":
  case "de-CH":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_de_CH;
    break;
  case "el":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_el;
    break;
  case "en":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en;
    break;
  case "en_AU":
  case "en-AU":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_AU;
    break;
  case "en_CA":
  case "en-CA":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_CA;
    break;
  case "en_GB":
  case "en-GB":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_GB;
    break;
  case "en_IE":
  case "en-IE":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_IE;
    break;
  case "en_IN":
  case "en-IN":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_IN;
    break;
  case "en_SG":
  case "en-SG":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_SG;
    break;
  case "en_US":
  case "en-US":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_US;
    break;
  case "en_ZA":
  case "en-ZA":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_en_ZA;
    break;
  case "es":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es;
    break;
  case "es_419":
  case "es-419":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_419;
    break;
  case "es_ES":
  case "es-ES":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_ES;
    break;
  case "es_MX":
  case "es-MX":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_MX;
    break;
  case "es_US":
  case "es-US":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_es_US;
    break;
  case "et":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_et;
    break;
  case "eu":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_eu;
    break;
  case "fa":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fa;
    break;
  case "fi":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fi;
    break;
  case "fil":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fil;
    break;
  case "fr":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr;
    break;
  case "fr_CA":
  case "fr-CA":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_fr_CA;
    break;
  case "ga":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ga;
    break;
  case "gl":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_gl;
    break;
  case "gsw":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_gsw;
    break;
  case "gu":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_gu;
    break;
  case "haw":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_haw;
    break;
  case "he":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_he;
    break;
  case "hi":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hi;
    break;
  case "hr":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hr;
    break;
  case "hu":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hu;
    break;
  case "hy":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_hy;
    break;
  case "id":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_id;
    break;
  case "in":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_in;
    break;
  case "is":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_is;
    break;
  case "it":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_it;
    break;
  case "iw":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_iw;
    break;
  case "ja":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ja;
    break;
  case "ka":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ka;
    break;
  case "kk":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_kk;
    break;
  case "km":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_km;
    break;
  case "kn":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_kn;
    break;
  case "ko":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ko;
    break;
  case "ky":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ky;
    break;
  case "ln":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ln;
    break;
  case "lo":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_lo;
    break;
  case "lt":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_lt;
    break;
  case "lv":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_lv;
    break;
  case "mk":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mk;
    break;
  case "ml":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ml;
    break;
  case "mn":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mn;
    break;
  case "mo":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mo;
    break;
  case "mr":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mr;
    break;
  case "ms":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ms;
    break;
  case "mt":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_mt;
    break;
  case "my":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_my;
    break;
  case "nb":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_nb;
    break;
  case "ne":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ne;
    break;
  case "nl":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_nl;
    break;
  case "no":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_no;
    break;
  case "no_NO":
  case "no-NO":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_no_NO;
    break;
  case "or":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_or;
    break;
  case "pa":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pa;
    break;
  case "pl":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pl;
    break;
  case "pt":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pt;
    break;
  case "pt_BR":
  case "pt-BR":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pt_BR;
    break;
  case "pt_PT":
  case "pt-PT":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_pt_PT;
    break;
  case "ro":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ro;
    break;
  case "ru":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ru;
    break;
  case "sh":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sh;
    break;
  case "si":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_si;
    break;
  case "sk":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sk;
    break;
  case "sl":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sl;
    break;
  case "sq":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sq;
    break;
  case "sr":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sr;
    break;
  case "sr_Latn":
  case "sr-Latn":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sr_Latn;
    break;
  case "sv":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sv;
    break;
  case "sw":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_sw;
    break;
  case "ta":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ta;
    break;
  case "te":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_te;
    break;
  case "th":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_th;
    break;
  case "tl":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_tl;
    break;
  case "tr":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_tr;
    break;
  case "uk":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_uk;
    break;
  case "ur":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_ur;
    break;
  case "uz":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_uz;
    break;
  case "vi":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_vi;
    break;
  case "zh":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh;
    break;
  case "zh_CN":
  case "zh-CN":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh_CN;
    break;
  case "zh_HK":
  case "zh-HK":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh_HK;
    break;
  case "zh_TW":
  case "zh-TW":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zh_TW;
    break;
  case "zu":
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_zu;
    break;
}

$CLJS.SHADOW_ENV.setLoaded("goog.i18n.datetimesymbols.js");

goog.provide("goog.date");
goog.provide("goog.date.Date");
goog.provide("goog.date.DateLike");
goog.provide("goog.date.DateTime");
goog.provide("goog.date.Interval");
goog.provide("goog.date.month");
goog.provide("goog.date.weekDay");
goog.require("goog.asserts");
goog.require("goog.i18n.DateTimeSymbols");
goog.require("goog.string");
goog.date.weekDay = {MON:0, TUE:1, WED:2, THU:3, FRI:4, SAT:5, SUN:6};
goog.date.month = {JAN:0, FEB:1, MAR:2, APR:3, MAY:4, JUN:5, JUL:6, AUG:7, SEP:8, OCT:9, NOV:10, DEC:11};
goog.date.splitDateStringRegex_ = new RegExp("^((?:[-+]\\d*)?\\d{4})(?:(?:-?(\\d{2})(?:-?(\\d{2}))?)|" + "(?:-?(\\d{3}))|(?:-?W(\\d{2})(?:-?([1-7]))?))?$");
goog.date.splitTimeStringRegex_ = /^(\d{2})(?::?(\d{2})(?::?(\d{2})(\.\d+)?)?)?$/;
goog.date.splitTimezoneStringRegex_ = /Z|(?:([-+])(\d{2})(?::?(\d{2}))?)$/;
goog.date.splitDurationRegex_ = new RegExp("^(-)?P(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)D)?" + "(T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$");
goog.date.MS_PER_DAY = 24 * 60 * 60 * 1000;
goog.date.MS_PER_GREGORIAN_CYCLE_ = 146097 * 24 * 60 * 60 * 1000;
goog.date.isLeapYear = function(year) {
  return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
};
goog.date.isLongIsoYear = function(year) {
  var n = 5 * year + 12 - 4 * (Math.floor(year / 100) - Math.floor(year / 400));
  n += Math.floor((year - 100) / 400) - Math.floor((year - 102) / 400);
  n += Math.floor((year - 200) / 400) - Math.floor((year - 199) / 400);
  return n % 28 < 5;
};
goog.date.getNumberOfDaysInMonth = function(year, month) {
  switch(month) {
    case goog.date.month.FEB:
      return goog.date.isLeapYear(year) ? 29 : 28;
    case goog.date.month.JUN:
    case goog.date.month.SEP:
    case goog.date.month.NOV:
    case goog.date.month.APR:
      return 30;
  }
  return 31;
};
goog.date.isSameDay = function(date, opt_now) {
  var now = opt_now || new Date(goog.now());
  return date.getDate() == now.getDate() && goog.date.isSameMonth(date, now);
};
goog.date.isSameMonth = function(date, opt_now) {
  var now = opt_now || new Date(goog.now());
  return date.getMonth() == now.getMonth() && goog.date.isSameYear(date, now);
};
goog.date.isSameYear = function(date, opt_now) {
  var now = opt_now || new Date(goog.now());
  return date.getFullYear() == now.getFullYear();
};
goog.date.getCutOffSameWeek_ = function(year, month, date, opt_weekDay, opt_firstDayOfWeek) {
  var d = new Date(year, month, date);
  var cutoff = opt_weekDay !== undefined ? opt_weekDay : goog.date.weekDay.THU;
  var firstday = opt_firstDayOfWeek || goog.date.weekDay.MON;
  var isoday = (d.getDay() + 6) % 7;
  var daypos = (isoday - firstday + 7) % 7;
  var cutoffpos = (cutoff - firstday + 7) % 7;
  return d.valueOf() + (cutoffpos - daypos) * goog.date.MS_PER_DAY;
};
goog.date.getWeekNumber = function(year, month, date, opt_weekDay, opt_firstDayOfWeek) {
  var cutoffSameWeek = goog.date.getCutOffSameWeek_(year, month, date, opt_weekDay, opt_firstDayOfWeek);
  var jan1 = (new Date((new Date(cutoffSameWeek)).getFullYear(), 0, 1)).valueOf();
  return Math.floor(Math.round((cutoffSameWeek - jan1) / goog.date.MS_PER_DAY) / 7) + 1;
};
goog.date.getYearOfWeek = function(year, month, date, opt_weekDay, opt_firstDayOfWeek) {
  var cutoffSameWeek = goog.date.getCutOffSameWeek_(year, month, date, opt_weekDay, opt_firstDayOfWeek);
  return (new Date(cutoffSameWeek)).getFullYear();
};
goog.date.min = function(date1, date2) {
  return date1 < date2 ? date1 : date2;
};
goog.date.max = function(date1, date2) {
  return date1 > date2 ? date1 : date2;
};
goog.date.setIso8601DateTime = function(dateTime, formatted) {
  formatted = goog.string.trim(formatted);
  var delim = formatted.indexOf("T") == -1 ? " " : "T";
  var parts = formatted.split(delim);
  return goog.date.setIso8601DateOnly_(dateTime, parts[0]) && (parts.length < 2 || goog.date.setIso8601TimeOnly_(dateTime, parts[1]));
};
goog.date.setIso8601DateOnly_ = function(d, formatted) {
  var parts = formatted.match(goog.date.splitDateStringRegex_);
  if (!parts) {
    return false;
  }
  var year = Number(parts[1]);
  var month = Number(parts[2]);
  var date = Number(parts[3]);
  var dayOfYear = Number(parts[4]);
  var week = Number(parts[5]);
  var dayOfWeek = Number(parts[6]) || 1;
  d.setFullYear(year);
  if (dayOfYear) {
    d.setDate(1);
    d.setMonth(0);
    var offset = dayOfYear - 1;
    d.add(new goog.date.Interval(goog.date.Interval.DAYS, offset));
  } else if (week) {
    goog.date.setDateFromIso8601Week_(d, week, dayOfWeek);
  } else {
    if (month) {
      d.setDate(1);
      d.setMonth(month - 1);
    }
    if (date) {
      d.setDate(date);
    }
  }
  return true;
};
goog.date.setDateFromIso8601Week_ = function(d, week, dayOfWeek) {
  d.setMonth(0);
  d.setDate(1);
  var jsDay = d.getDay();
  var jan1WeekDay = jsDay || 7;
  var THURSDAY = 4;
  if (jan1WeekDay <= THURSDAY) {
    var startDelta = 1 - jan1WeekDay;
  } else {
    startDelta = 8 - jan1WeekDay;
  }
  var absoluteDays = Number(dayOfWeek) + 7 * (Number(week) - 1);
  var delta = startDelta + absoluteDays - 1;
  var interval = new goog.date.Interval(goog.date.Interval.DAYS, delta);
  d.add(interval);
};
goog.date.setIso8601TimeOnly_ = function(d, formatted) {
  var timezoneParts = formatted.match(goog.date.splitTimezoneStringRegex_);
  var offsetMinutes;
  var formattedTime;
  if (timezoneParts) {
    formattedTime = formatted.substring(0, formatted.length - timezoneParts[0].length);
    if (timezoneParts[0] === "Z") {
      offsetMinutes = 0;
    } else {
      offsetMinutes = Number(timezoneParts[2]) * 60 + Number(timezoneParts[3]);
      offsetMinutes *= timezoneParts[1] == "-" ? 1 : -1;
    }
  } else {
    formattedTime = formatted;
  }
  var timeParts = formattedTime.match(goog.date.splitTimeStringRegex_);
  if (!timeParts) {
    return false;
  }
  if (timezoneParts) {
    goog.asserts.assertNumber(offsetMinutes);
    var year = d.getYear();
    var month = d.getMonth();
    var day = d.getDate();
    var hour = Number(timeParts[1]);
    var minute = Number(timeParts[2]) || 0;
    var second = Number(timeParts[3]) || 0;
    var millisecond = timeParts[4] ? Number(timeParts[4]) * 1000 : 0;
    const twoDigitYear = year >= 0 && year < 100;
    if (twoDigitYear) {
      year += 400;
    }
    let utc = Date.UTC(year, month, day, hour, minute, second, millisecond);
    if (twoDigitYear) {
      utc -= goog.date.MS_PER_GREGORIAN_CYCLE_;
    }
    d.setTime(utc + offsetMinutes * 60000);
  } else {
    d.setHours(Number(timeParts[1]));
    d.setMinutes(Number(timeParts[2]) || 0);
    d.setSeconds(Number(timeParts[3]) || 0);
    d.setMilliseconds(timeParts[4] ? Number(timeParts[4]) * 1000 : 0);
  }
  return true;
};
goog.date.padYear_ = function(year) {
  const sign = year < 0 ? "-" : year >= 10000 ? "+" : "";
  return sign + goog.string.padNumber(Math.abs(year), sign ? 6 : 4);
};
goog.date.Interval = function(opt_years, opt_months, opt_days, opt_hours, opt_minutes, opt_seconds) {
  if (typeof opt_years === "string") {
    var type = opt_years;
    var interval = opt_months;
    this.years = type == goog.date.Interval.YEARS ? interval : 0;
    this.months = type == goog.date.Interval.MONTHS ? interval : 0;
    this.days = type == goog.date.Interval.DAYS ? interval : 0;
    this.hours = type == goog.date.Interval.HOURS ? interval : 0;
    this.minutes = type == goog.date.Interval.MINUTES ? interval : 0;
    this.seconds = type == goog.date.Interval.SECONDS ? interval : 0;
  } else {
    this.years = opt_years || 0;
    this.months = opt_months || 0;
    this.days = opt_days || 0;
    this.hours = opt_hours || 0;
    this.minutes = opt_minutes || 0;
    this.seconds = opt_seconds || 0;
  }
};
goog.date.Interval.fromIsoString = function(duration) {
  var parts = duration.match(goog.date.splitDurationRegex_);
  if (!parts) {
    return null;
  }
  var timeEmpty = !(parts[6] || parts[7] || parts[8]);
  var dateTimeEmpty = timeEmpty && !(parts[2] || parts[3] || parts[4]);
  if (dateTimeEmpty || timeEmpty && parts[5]) {
    return null;
  }
  var negative = parts[1];
  var years = parseInt(parts[2], 10) || 0;
  var months = parseInt(parts[3], 10) || 0;
  var days = parseInt(parts[4], 10) || 0;
  var hours = parseInt(parts[6], 10) || 0;
  var minutes = parseInt(parts[7], 10) || 0;
  var seconds = parseFloat(parts[8]) || 0;
  return negative ? new goog.date.Interval(-years, -months, -days, -hours, -minutes, -seconds) : new goog.date.Interval(years, months, days, hours, minutes, seconds);
};
goog.date.Interval.prototype.toIsoString = function(opt_verbose) {
  var minField = Math.min(this.years, this.months, this.days, this.hours, this.minutes, this.seconds);
  var maxField = Math.max(this.years, this.months, this.days, this.hours, this.minutes, this.seconds);
  if (minField < 0 && maxField > 0) {
    return null;
  }
  if (!opt_verbose && minField == 0 && maxField == 0) {
    return "PT0S";
  }
  var res = [];
  if (minField < 0) {
    res.push("-");
  }
  res.push("P");
  if (this.years || opt_verbose) {
    res.push(Math.abs(this.years) + "Y");
  }
  if (this.months || opt_verbose) {
    res.push(Math.abs(this.months) + "M");
  }
  if (this.days || opt_verbose) {
    res.push(Math.abs(this.days) + "D");
  }
  if (this.hours || this.minutes || this.seconds || opt_verbose) {
    res.push("T");
    if (this.hours || opt_verbose) {
      res.push(Math.abs(this.hours) + "H");
    }
    if (this.minutes || opt_verbose) {
      res.push(Math.abs(this.minutes) + "M");
    }
    if (this.seconds || opt_verbose) {
      res.push(Math.abs(this.seconds) + "S");
    }
  }
  return res.join("");
};
goog.date.Interval.prototype.equals = function(other) {
  return other.years == this.years && other.months == this.months && other.days == this.days && other.hours == this.hours && other.minutes == this.minutes && other.seconds == this.seconds;
};
goog.date.Interval.prototype.clone = function() {
  return new goog.date.Interval(this.years, this.months, this.days, this.hours, this.minutes, this.seconds);
};
goog.date.Interval.YEARS = "y";
goog.date.Interval.MONTHS = "m";
goog.date.Interval.DAYS = "d";
goog.date.Interval.HOURS = "h";
goog.date.Interval.MINUTES = "n";
goog.date.Interval.SECONDS = "s";
goog.date.Interval.prototype.isZero = function() {
  return this.years == 0 && this.months == 0 && this.days == 0 && this.hours == 0 && this.minutes == 0 && this.seconds == 0;
};
goog.date.Interval.prototype.getInverse = function() {
  return this.times(-1);
};
goog.date.Interval.prototype.times = function(n) {
  return new goog.date.Interval(this.years * n, this.months * n, this.days * n, this.hours * n, this.minutes * n, this.seconds * n);
};
goog.date.Interval.prototype.getTotalSeconds = function() {
  goog.asserts.assert(this.years == 0 && this.months == 0);
  return ((this.days * 24 + this.hours) * 60 + this.minutes) * 60 + this.seconds;
};
goog.date.Interval.prototype.add = function(interval) {
  this.years += interval.years;
  this.months += interval.months;
  this.days += interval.days;
  this.hours += interval.hours;
  this.minutes += interval.minutes;
  this.seconds += interval.seconds;
};
goog.date.DateLike;
goog.date.Date = function(opt_year, opt_month, opt_date) {
  this.date;
  if (typeof opt_year === "number") {
    this.date = this.buildDate_(opt_year, opt_month || 0, opt_date || 1);
    this.maybeFixDst_(opt_date || 1);
  } else if (goog.isObject(opt_year)) {
    this.date = this.buildDate_(opt_year.getFullYear(), opt_year.getMonth(), opt_year.getDate());
    this.maybeFixDst_(opt_year.getDate());
  } else {
    this.date = new Date(goog.now());
    var expectedDate = this.date.getDate();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    this.maybeFixDst_(expectedDate);
  }
};
goog.date.Date.prototype.buildDate_ = function(fullYear, month, date) {
  var d = new Date(fullYear, month, date);
  if (fullYear >= 0 && fullYear < 100) {
    d.setFullYear(d.getFullYear() - 1900);
  }
  return d;
};
goog.date.Date.prototype.firstDayOfWeek_ = goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK;
goog.date.Date.prototype.firstWeekCutOffDay_ = goog.i18n.DateTimeSymbols.FIRSTWEEKCUTOFFDAY;
goog.date.Date.prototype.clone = function() {
  var date = new goog.date.Date(this.date);
  date.firstDayOfWeek_ = this.firstDayOfWeek_;
  date.firstWeekCutOffDay_ = this.firstWeekCutOffDay_;
  return date;
};
goog.date.Date.prototype.getFullYear = function() {
  return this.date.getFullYear();
};
goog.date.Date.prototype.getYear = function() {
  return this.getFullYear();
};
goog.date.Date.prototype.getMonth = function() {
  return this.date.getMonth();
};
goog.date.Date.prototype.getDate = function() {
  return this.date.getDate();
};
goog.date.Date.prototype.getTime = function() {
  return this.date.getTime();
};
goog.date.Date.prototype.getDay = function() {
  return this.date.getDay();
};
goog.date.Date.prototype.getIsoWeekday = function() {
  return (this.getDay() + 6) % 7;
};
goog.date.Date.prototype.getWeekday = function() {
  return (this.getIsoWeekday() - this.firstDayOfWeek_ + 7) % 7;
};
goog.date.Date.prototype.getUTCFullYear = function() {
  return this.date.getUTCFullYear();
};
goog.date.Date.prototype.getUTCMonth = function() {
  return this.date.getUTCMonth();
};
goog.date.Date.prototype.getUTCDate = function() {
  return this.date.getUTCDate();
};
goog.date.Date.prototype.getUTCDay = function() {
  return this.date.getDay();
};
goog.date.Date.prototype.getUTCHours = function() {
  return this.date.getUTCHours();
};
goog.date.Date.prototype.getUTCMinutes = function() {
  return this.date.getUTCMinutes();
};
goog.date.Date.prototype.getUTCIsoWeekday = function() {
  return (this.date.getUTCDay() + 6) % 7;
};
goog.date.Date.prototype.getUTCWeekday = function() {
  return (this.getUTCIsoWeekday() - this.firstDayOfWeek_ + 7) % 7;
};
goog.date.Date.prototype.getFirstDayOfWeek = function() {
  return this.firstDayOfWeek_;
};
goog.date.Date.prototype.getFirstWeekCutOffDay = function() {
  return this.firstWeekCutOffDay_;
};
goog.date.Date.prototype.getNumberOfDaysInMonth = function() {
  return goog.date.getNumberOfDaysInMonth(this.getFullYear(), this.getMonth());
};
goog.date.Date.prototype.getWeekNumber = function() {
  return goog.date.getWeekNumber(this.getFullYear(), this.getMonth(), this.getDate(), this.firstWeekCutOffDay_, this.firstDayOfWeek_);
};
goog.date.Date.prototype.getYearOfWeek = function() {
  return goog.date.getYearOfWeek(this.getFullYear(), this.getMonth(), this.getDate(), this.firstWeekCutOffDay_, this.firstDayOfWeek_);
};
goog.date.Date.prototype.getDayOfYear = function() {
  var dayOfYear = this.getDate();
  var year = this.getFullYear();
  for (var m = this.getMonth() - 1; m >= 0; m--) {
    dayOfYear += goog.date.getNumberOfDaysInMonth(year, m);
  }
  return dayOfYear;
};
goog.date.Date.prototype.getTimezoneOffset = function() {
  return this.date.getTimezoneOffset();
};
goog.date.Date.prototype.getTimezoneOffsetString = function() {
  var tz;
  var offset = this.getTimezoneOffset();
  if (offset == 0) {
    tz = "Z";
  } else {
    var n = Math.abs(offset) / 60;
    var h = Math.floor(n);
    var m = (n - h) * 60;
    tz = (offset > 0 ? "-" : "+") + goog.string.padNumber(h, 2) + ":" + goog.string.padNumber(m, 2);
  }
  return tz;
};
goog.date.Date.prototype.set = function(date) {
  this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
goog.date.Date.prototype.setFullYear = function(year) {
  this.date.setFullYear(year);
};
goog.date.Date.prototype.setYear = function(year) {
  this.setFullYear(year);
};
goog.date.Date.prototype.setMonth = function(month) {
  this.date.setMonth(month);
};
goog.date.Date.prototype.setDate = function(date) {
  this.date.setDate(date);
};
goog.date.Date.prototype.setTime = function(ms) {
  this.date.setTime(ms);
};
goog.date.Date.prototype.setUTCFullYear = function(year) {
  this.date.setUTCFullYear(year);
};
goog.date.Date.prototype.setUTCMonth = function(month) {
  this.date.setUTCMonth(month);
};
goog.date.Date.prototype.setUTCDate = function(date) {
  this.date.setUTCDate(date);
};
goog.date.Date.prototype.setFirstDayOfWeek = function(day) {
  this.firstDayOfWeek_ = day;
};
goog.date.Date.prototype.setFirstWeekCutOffDay = function(day) {
  this.firstWeekCutOffDay_ = day;
};
goog.date.Date.prototype.add = function(interval) {
  if (interval.years || interval.months) {
    var month = this.getMonth() + interval.months + interval.years * 12;
    var year = this.getYear() + Math.floor(month / 12);
    month %= 12;
    if (month < 0) {
      month += 12;
    }
    var daysInTargetMonth = goog.date.getNumberOfDaysInMonth(year, month);
    var date = Math.min(daysInTargetMonth, this.getDate());
    this.setDate(1);
    this.setFullYear(year);
    this.setMonth(month);
    this.setDate(date);
  }
  if (interval.days) {
    const initialYear = this.getYear();
    const yearAdjustment = initialYear >= 0 && initialYear <= 99 ? -1900 : 0;
    const noon = new Date(initialYear, this.getMonth(), this.getDate(), 12);
    const result = new Date(noon.getTime() + interval.days * 86400000);
    this.setDate(1);
    this.setFullYear(result.getFullYear() + yearAdjustment);
    this.setMonth(result.getMonth());
    this.setDate(result.getDate());
    this.maybeFixDst_(result.getDate());
  }
};
goog.date.Date.prototype.toIsoString = function(opt_verbose, opt_tz) {
  var str = [goog.date.padYear_(this.getFullYear()), goog.string.padNumber(this.getMonth() + 1, 2), goog.string.padNumber(this.getDate(), 2)];
  return str.join(opt_verbose ? "-" : "") + (opt_tz ? this.getTimezoneOffsetString() : "");
};
goog.date.Date.prototype.toUTCIsoString = function(opt_verbose, opt_tz) {
  var str = [goog.date.padYear_(this.getUTCFullYear()), goog.string.padNumber(this.getUTCMonth() + 1, 2), goog.string.padNumber(this.getUTCDate(), 2)];
  return str.join(opt_verbose ? "-" : "") + (opt_tz ? "Z" : "");
};
goog.date.Date.prototype.equals = function(other) {
  return !!(other && this.getYear() == other.getYear() && this.getMonth() == other.getMonth() && this.getDate() == other.getDate());
};
goog.date.Date.prototype.toString = function() {
  return this.toIsoString();
};
goog.date.Date.prototype.maybeFixDst_ = function(expected) {
  if (this.getDate() != expected) {
    var dir = this.getDate() < expected ? 1 : -1;
    this.date.setUTCHours(this.date.getUTCHours() + dir);
  }
};
goog.date.Date.prototype.valueOf = function() {
  return this.date.valueOf();
};
goog.date.Date.compare = function(date1, date2) {
  return date1.getTime() - date2.getTime();
};
goog.date.Date.fromIsoString = function(formatted) {
  var ret = new goog.date.Date(2000);
  return goog.date.setIso8601DateOnly_(ret, formatted) ? ret : null;
};
goog.date.DateTime = function(opt_year, opt_month, opt_date, opt_hours, opt_minutes, opt_seconds, opt_milliseconds) {
  if (typeof opt_year === "number") {
    this.date = new Date(opt_year, opt_month || 0, opt_date || 1, opt_hours || 0, opt_minutes || 0, opt_seconds || 0, opt_milliseconds || 0);
  } else {
    this.date = new Date(opt_year && opt_year.getTime ? opt_year.getTime() : goog.now());
  }
};
goog.inherits(goog.date.DateTime, goog.date.Date);
goog.date.DateTime.fromTimestamp = function(timestamp) {
  var date = new goog.date.DateTime();
  date.setTime(timestamp);
  return date;
};
goog.date.DateTime.fromRfc822String = function(formatted) {
  var date = new Date(formatted);
  return !isNaN(date.getTime()) ? new goog.date.DateTime(date) : null;
};
goog.date.DateTime.prototype.getHours = function() {
  return this.date.getHours();
};
goog.date.DateTime.prototype.getMinutes = function() {
  return this.date.getMinutes();
};
goog.date.DateTime.prototype.getSeconds = function() {
  return this.date.getSeconds();
};
goog.date.DateTime.prototype.getMilliseconds = function() {
  return this.date.getMilliseconds();
};
goog.date.DateTime.prototype.getUTCDay = function() {
  return this.date.getUTCDay();
};
goog.date.DateTime.prototype.getUTCHours = function() {
  return this.date.getUTCHours();
};
goog.date.DateTime.prototype.getUTCMinutes = function() {
  return this.date.getUTCMinutes();
};
goog.date.DateTime.prototype.getUTCSeconds = function() {
  return this.date.getUTCSeconds();
};
goog.date.DateTime.prototype.getUTCMilliseconds = function() {
  return this.date.getUTCMilliseconds();
};
goog.date.DateTime.prototype.setHours = function(hours) {
  this.date.setHours(hours);
};
goog.date.DateTime.prototype.setMinutes = function(minutes) {
  this.date.setMinutes(minutes);
};
goog.date.DateTime.prototype.setSeconds = function(seconds) {
  this.date.setSeconds(seconds);
};
goog.date.DateTime.prototype.setMilliseconds = function(ms) {
  this.date.setMilliseconds(ms);
};
goog.date.DateTime.prototype.setUTCHours = function(hours) {
  this.date.setUTCHours(hours);
};
goog.date.DateTime.prototype.setUTCMinutes = function(minutes) {
  this.date.setUTCMinutes(minutes);
};
goog.date.DateTime.prototype.setUTCSeconds = function(seconds) {
  this.date.setUTCSeconds(seconds);
};
goog.date.DateTime.prototype.setUTCMilliseconds = function(ms) {
  this.date.setUTCMilliseconds(ms);
};
goog.date.DateTime.prototype.isMidnight = function() {
  return this.getHours() == 0 && this.getMinutes() == 0 && this.getSeconds() == 0 && this.getMilliseconds() == 0;
};
goog.date.DateTime.prototype.add = function(interval) {
  goog.date.Date.prototype.add.call(this, interval);
  if (interval.hours) {
    this.setUTCHours(this.date.getUTCHours() + interval.hours);
  }
  if (interval.minutes) {
    this.setUTCMinutes(this.date.getUTCMinutes() + interval.minutes);
  }
  if (interval.seconds) {
    this.setUTCSeconds(this.date.getUTCSeconds() + interval.seconds);
  }
};
goog.date.DateTime.prototype.toIsoString = function(opt_verbose, opt_tz) {
  var dateString = goog.date.Date.prototype.toIsoString.call(this, opt_verbose);
  if (opt_verbose) {
    return dateString + "T" + goog.string.padNumber(this.getHours(), 2) + ":" + goog.string.padNumber(this.getMinutes(), 2) + ":" + goog.string.padNumber(this.getSeconds(), 2) + (opt_tz ? this.getTimezoneOffsetString() : "");
  }
  return dateString + "T" + goog.string.padNumber(this.getHours(), 2) + goog.string.padNumber(this.getMinutes(), 2) + goog.string.padNumber(this.getSeconds(), 2) + (opt_tz ? this.getTimezoneOffsetString() : "");
};
goog.date.DateTime.prototype.toXmlDateTime = function(opt_timezone) {
  return goog.date.Date.prototype.toIsoString.call(this, true) + "T" + goog.string.padNumber(this.getHours(), 2) + ":" + goog.string.padNumber(this.getMinutes(), 2) + ":" + goog.string.padNumber(this.getSeconds(), 2) + (opt_timezone ? this.getTimezoneOffsetString() : "");
};
goog.date.DateTime.prototype.toUTCIsoString = function(opt_verbose, opt_tz) {
  var dateStr = goog.date.Date.prototype.toUTCIsoString.call(this, opt_verbose);
  if (opt_verbose) {
    return dateStr + "T" + goog.string.padNumber(this.getUTCHours(), 2) + ":" + goog.string.padNumber(this.getUTCMinutes(), 2) + ":" + goog.string.padNumber(this.getUTCSeconds(), 2) + (opt_tz ? "Z" : "");
  }
  return dateStr + "T" + goog.string.padNumber(this.getUTCHours(), 2) + goog.string.padNumber(this.getUTCMinutes(), 2) + goog.string.padNumber(this.getUTCSeconds(), 2) + (opt_tz ? "Z" : "");
};
goog.date.DateTime.prototype.toUTCRfc3339String = function() {
  var date = this.toUTCIsoString(true);
  var millis = this.getUTCMilliseconds();
  return (millis ? date + "." + goog.string.padNumber(millis, 3) : date) + "Z";
};
goog.date.DateTime.prototype.equals = function(other) {
  return this.getTime() == other.getTime();
};
goog.date.DateTime.prototype.toString = function() {
  return this.toIsoString();
};
goog.date.DateTime.prototype.toUsTimeString = function(opt_padHours, opt_showAmPm, opt_omitZeroMinutes) {
  var hours = this.getHours();
  if (opt_showAmPm === undefined) {
    opt_showAmPm = true;
  }
  var isPM = hours == 12;
  if (hours > 12) {
    hours -= 12;
    isPM = true;
  }
  if (hours == 0 && opt_showAmPm) {
    hours = 12;
  }
  var label = opt_padHours ? goog.string.padNumber(hours, 2) : String(hours);
  var minutes = this.getMinutes();
  if (!opt_omitZeroMinutes || minutes > 0) {
    label += ":" + goog.string.padNumber(minutes, 2);
  }
  if (opt_showAmPm) {
    label += isPM ? " PM" : " AM";
  }
  return label;
};
goog.date.DateTime.prototype.toIsoTimeString = function(opt_showSeconds) {
  var hours = this.getHours();
  var label = goog.string.padNumber(hours, 2) + ":" + goog.string.padNumber(this.getMinutes(), 2);
  if (opt_showSeconds === undefined || opt_showSeconds) {
    label += ":" + goog.string.padNumber(this.getSeconds(), 2);
  }
  return label;
};
goog.date.DateTime.prototype.clone = function() {
  var date = new goog.date.DateTime(this.date);
  date.setFirstDayOfWeek(this.getFirstDayOfWeek());
  date.setFirstWeekCutOffDay(this.getFirstWeekCutOffDay());
  return date;
};
goog.date.DateTime.fromIsoString = function(formatted) {
  var ret = new goog.date.DateTime(2000);
  return goog.date.setIso8601DateTime(ret, formatted) ? ret : null;
};

$CLJS.SHADOW_ENV.setLoaded("goog.date.date.js");

goog.provide("goog.date.UtcDateTime");
goog.require("goog.date");
goog.require("goog.date.Date");
goog.require("goog.date.DateTime");
goog.require("goog.date.Interval");
goog.date.UtcDateTime = function(opt_year, opt_month, opt_date, opt_hours, opt_minutes, opt_seconds, opt_milliseconds) {
  var timestamp;
  if (typeof opt_year === "number") {
    timestamp = Date.UTC(opt_year, opt_month || 0, opt_date || 1, opt_hours || 0, opt_minutes || 0, opt_seconds || 0, opt_milliseconds || 0);
  } else {
    timestamp = opt_year ? opt_year.getTime() : goog.now();
  }
  this.date = new Date(timestamp);
};
goog.inherits(goog.date.UtcDateTime, goog.date.DateTime);
goog.date.UtcDateTime.fromTimestamp = function(timestamp) {
  var date = new goog.date.UtcDateTime();
  date.setTime(timestamp);
  return date;
};
goog.date.UtcDateTime.fromIsoString = function(formatted) {
  var ret = new goog.date.UtcDateTime(2000);
  return goog.date.setIso8601DateTime(ret, formatted) ? ret : null;
};
goog.date.UtcDateTime.prototype.clone = function() {
  var date = new goog.date.UtcDateTime(this.date);
  date.setFirstDayOfWeek(this.getFirstDayOfWeek());
  date.setFirstWeekCutOffDay(this.getFirstWeekCutOffDay());
  return date;
};
goog.date.UtcDateTime.prototype.add = function(interval) {
  if (interval.years || interval.months) {
    var yearsMonths = new goog.date.Interval(interval.years, interval.months);
    goog.date.Date.prototype.add.call(this, yearsMonths);
  }
  var daysAndTimeMillis = 1000 * (interval.seconds + 60 * (interval.minutes + 60 * (interval.hours + 24 * interval.days)));
  this.date = new Date(this.date.getTime() + daysAndTimeMillis);
};
goog.date.UtcDateTime.prototype.getTimezoneOffset = function() {
  return 0;
};
goog.date.UtcDateTime.prototype.getFullYear = goog.date.DateTime.prototype.getUTCFullYear;
goog.date.UtcDateTime.prototype.getMonth = goog.date.DateTime.prototype.getUTCMonth;
goog.date.UtcDateTime.prototype.getDate = goog.date.DateTime.prototype.getUTCDate;
goog.date.UtcDateTime.prototype.getHours = goog.date.DateTime.prototype.getUTCHours;
goog.date.UtcDateTime.prototype.getMinutes = goog.date.DateTime.prototype.getUTCMinutes;
goog.date.UtcDateTime.prototype.getSeconds = goog.date.DateTime.prototype.getUTCSeconds;
goog.date.UtcDateTime.prototype.getMilliseconds = goog.date.DateTime.prototype.getUTCMilliseconds;
goog.date.UtcDateTime.prototype.getDay = goog.date.DateTime.prototype.getUTCDay;
goog.date.UtcDateTime.prototype.setFullYear = goog.date.DateTime.prototype.setUTCFullYear;
goog.date.UtcDateTime.prototype.setMonth = goog.date.DateTime.prototype.setUTCMonth;
goog.date.UtcDateTime.prototype.setDate = goog.date.DateTime.prototype.setUTCDate;
goog.date.UtcDateTime.prototype.setHours = goog.date.DateTime.prototype.setUTCHours;
goog.date.UtcDateTime.prototype.setMinutes = goog.date.DateTime.prototype.setUTCMinutes;
goog.date.UtcDateTime.prototype.setSeconds = goog.date.DateTime.prototype.setUTCSeconds;
goog.date.UtcDateTime.prototype.setMilliseconds = goog.date.DateTime.prototype.setUTCMilliseconds;

$CLJS.SHADOW_ENV.setLoaded("goog.date.utcdatetime.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.i18n.DayPeriods");
  goog.module.declareLegacyNamespace();
  let DayPeriodInfo;
  exports.DayPeriodInfo;
  let DayPeriods;
  exports.DayPeriods = DayPeriods;
  exports.DayPeriods_zh_Hant = {midnight:{at:"00:00", formatNames:["午夜"], periodName:"midnight"}, night1:{from:"00:00", before:"05:00", formatNames:["凌晨"], periodName:"night1"}, morning1:{from:"05:00", before:"08:00", formatNames:["清晨"], periodName:"morning1"}, morning2:{from:"08:00", before:"12:00", formatNames:["上午"], periodName:"morning2"}, afternoon1:{from:"12:00", before:"13:00", formatNames:["中午"], periodName:"afternoon1"}, afternoon2:{from:"13:00", before:"19:00", formatNames:["下午"], periodName:"afternoon2"}, 
  evening1:{from:"19:00", before:"24:00", formatNames:["晚上"], periodName:"evening1"},};
  let defaultDayPeriods;
  exports.getDayPeriods = function() {
    return defaultDayPeriods;
  };
  exports.setDayPeriods = function(newDayPeriods) {
    defaultDayPeriods = newDayPeriods;
  };
  switch(goog.LOCALE) {
    case "zh-Hant":
    case "zh_Hant":
    case "zh-Hant-TW":
    case "zh_Hant_TW":
    case "zh-TW":
    case "zh_TW":
      defaultDayPeriods = exports.DayPeriods_zh_Hant;
      break;
    default:
      defaultDayPeriods = null;
      break;
  }
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.i18n.dayperiodsymbols.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.i18n.LocaleFeature");
  goog.module.declareLegacyNamespace();
  exports.ECMASCRIPT_INTL_OPT_OUT = goog.define("goog.i18n.ECMASCRIPT_INTL_OPT_OUT", false);
  exports.ECMASCRIPT_COMMON_LOCALES_2019 = goog.LOCALE == "am" || goog.LOCALE == "ar" || goog.LOCALE == "bg" || goog.LOCALE == "bn" || goog.LOCALE == "ca" || goog.LOCALE == "cs" || goog.LOCALE == "da" || goog.LOCALE == "de" || goog.LOCALE == "el" || goog.LOCALE == "en" || goog.LOCALE == "es" || goog.LOCALE == "et" || goog.LOCALE == "fa" || goog.LOCALE == "fi" || goog.LOCALE == "fil" || goog.LOCALE == "fr" || goog.LOCALE == "gu" || goog.LOCALE == "he" || goog.LOCALE == "hi" || goog.LOCALE == "hr" || 
  goog.LOCALE == "hu" || goog.LOCALE == "id" || goog.LOCALE == "it" || goog.LOCALE == "ja" || goog.LOCALE == "kn" || goog.LOCALE == "ko" || goog.LOCALE == "lt" || goog.LOCALE == "lv" || goog.LOCALE == "ml" || goog.LOCALE == "mr" || goog.LOCALE == "ms" || goog.LOCALE == "nl" || goog.LOCALE == "pl" || goog.LOCALE == "ro" || goog.LOCALE == "ru" || goog.LOCALE == "sk" || goog.LOCALE == "sl" || goog.LOCALE == "sr" || goog.LOCALE == "sv" || goog.LOCALE == "sw" || goog.LOCALE == "ta" || goog.LOCALE == "te" || 
  goog.LOCALE == "th" || goog.LOCALE == "tr" || goog.LOCALE == "uk" || goog.LOCALE == "vi" || goog.LOCALE == "en_GB" || goog.LOCALE == "en-GB" || goog.LOCALE == "es_419" || goog.LOCALE == "es-419" || goog.LOCALE == "pt_BR" || goog.LOCALE == "pt-BR" || goog.LOCALE == "pt_PT" || goog.LOCALE == "pt-PT" || goog.LOCALE == "zh_CN" || goog.LOCALE == "zh-CN" || goog.LOCALE == "zh_TW" || goog.LOCALE == "zh-TW";
  exports.USE_ECMASCRIPT_I18N_2020 = goog.FEATURESET_YEAR >= 2020 && exports.ECMASCRIPT_COMMON_LOCALES_2019 && !exports.ECMASCRIPT_INTL_OPT_OUT;
  exports.USE_ECMASCRIPT_I18N_2021 = goog.FEATURESET_YEAR >= 2021 && exports.ECMASCRIPT_COMMON_LOCALES_2019 && !exports.ECMASCRIPT_INTL_OPT_OUT;
  exports.USE_ECMASCRIPT_I18N_2022 = goog.FEATURESET_YEAR >= 2022 && exports.ECMASCRIPT_COMMON_LOCALES_2019 && !exports.ECMASCRIPT_INTL_OPT_OUT;
  exports.USE_ECMASCRIPT_I18N_RDTF = exports.USE_ECMASCRIPT_I18N_2021;
  exports.USE_ECMASCRIPT_I18N_NUMFORMAT = exports.USE_ECMASCRIPT_I18N_2021;
  exports.USE_ECMASCRIPT_I18N_PLURALRULES = exports.USE_ECMASCRIPT_I18N_2020;
  exports.USE_ECMASCRIPT_I18N_DATETIMEF = exports.USE_ECMASCRIPT_I18N_2021;
  exports.ECMASCRIPT_LISTFORMAT_LOCALES = ["am", "ar", "ar-001", "ar-AE", "ar-BH", "ar-DJ", "ar-DZ", "ar-EG", "ar-EH", "ar-ER", "ar-IL", "ar-IQ", "ar-JO", "ar-KM", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "ar-MR", "ar-OM", "ar-PS", "ar-QA", "ar-SA", "ar-SD", "ar-SO", "ar-SS", "ar-SY", "ar-TD", "ar-TN", "ar-YE", "bg", "bg-BG", "bn", "bn-BD", "bn-IN", "bs-Cyrl", "bs-Cyrl-BA", "ca", "ca-AD", "ca-ES", "ca-FR", "ca-IT", "cs", "cs-CZ", "da", "da-DK", "da-GL", "de", "de-AT", "de-BE", "de-CH", "de-DE", "de-IT", 
  "de-LI", "de-LU", "el", "el-CY", "el-GR", "en", "en-001", "en-150", "en-AE", "en-AG", "en-AI", "en-AS", "en-AT", "en-AU", "en-BB", "en-BE", "en-BI", "en-BM", "en-BS", "en-BW", "en-BZ", "en-CA", "en-CC", "en-CH", "en-CK", "en-CM", "en-CX", "en-CY", "en-DE", "en-DG", "en-DK", "en-DM", "en-ER", "en-FI", "en-FJ", "en-FK", "en-FM", "en-GB", "en-GD", "en-GG", "en-GH", "en-GI", "en-GM", "en-GU", "en-GY", "en-HK", "en-IE", "en-IL", "en-IM", "en-IN", "en-IO", "en-JE", "en-JM", "en-KE", "en-KI", "en-KN", 
  "en-KY", "en-LC", "en-LR", "en-LS", "en-MG", "en-MH", "en-MO", "en-MP", "en-MS", "en-MT", "en-MU", "en-MW", "en-MY", "en-NA", "en-NF", "en-NG", "en-NL", "en-NR", "en-NU", "en-NZ", "en-PG", "en-PH", "en-PK", "en-PN", "en-PR", "en-PW", "en-RW", "en-SB", "en-SC", "en-SD", "en-SE", "en-SG", "en-SH", "en-SI", "en-SL", "en-SS", "en-SX", "en-SZ", "en-TC", "en-TK", "en-TO", "en-TT", "en-TV", "en-TZ", "en-UG", "en-UM", "en-US", "en-VC", "en-VG", "en-VI", "en-VU", "en-WS", "en-ZA", "en-ZM", "en-ZW", "es", 
  "es-419", "es-AR", "es-BO", "es-BR", "es-BZ", "es-CL", "es-CO", "es-CR", "es-CU", "es-DO", "es-EA", "es-EC", "es-ES", "es-GQ", "es-GT", "es-HN", "es-IC", "es-MX", "es-NI", "es-PA", "es-PE", "es-PH", "es-PR", "es-PY", "es-SV", "es-US", "es-UY", "es-VE", "et", "et-EE", "fa", "fa-AF", "fa-IR", "fi", "fi-FI", "fil", "fil-PH", "fr", "fr-BE", "fr-BF", "fr-BI", "fr-BJ", "fr-BL", "fr-CA", "fr-CD", "fr-CF", "fr-CG", "fr-CH", "fr-CI", "fr-CM", "fr-DJ", "fr-DZ", "fr-FR", "fr-GA", "fr-GF", "fr-GN", "fr-GP", 
  "fr-GQ", "fr-HT", "fr-KM", "fr-LU", "fr-MA", "fr-MC", "fr-MF", "fr-MG", "fr-ML", "fr-MQ", "fr-MR", "fr-MU", "fr-NC", "fr-NE", "fr-PF", "fr-PM", "fr-RE", "fr-RW", "fr-SC", "fr-SN", "fr-SY", "fr-TD", "fr-TG", "fr-TN", "fr-VU", "fr-WF", "fr-YT", "gu", "gu-IN", "he", "he-IL", "hi", "hi-IN", "hr", "hr-BA", "hr-HR", "hu", "hu-HU", "id", "id-ID", "it", "it-CH", "it-IT", "it-SM", "it-VA", "ja", "ja-JP", "kn", "kn-IN", "ko", "ko-KP", "ko-KR", "lt", "lt-LT", "lv", "lv-LV", "ml", "ml-IN", "mr", "mr-IN", "ms", 
  "ms-BN", "ms-ID", "ms-MY", "ms-SG", "nb", "nl", "nl-AW", "nl-BE", "nl-BQ", "nl-CW", "nl-NL", "nl-SR", "nl-SX", "no", "pl", "pl-PL", "pt", "pt-AO", "pt-BR", "pt-CH", "pt-CV", "pt-GQ", "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL", "ro", "ro-MD", "ro-RO", "ru", "ru-BY", "ru-KG", "ru-KZ", "ru-MD", "ru-RU", "ru-UA", "sk", "sk-SK", "sl", "sl-SI", "sr", "sr-Cyrl", "sr-Cyrl-BA", "sr-Cyrl-ME", "sr-Cyrl-RS", "sr-Cyrl-XK", "sr-Latn", "sr-Latn-BA", "sr-Latn-ME", "sr-Latn-RS", "sr-Latn-XK", 
  "sv", "sv-AX", "sv-FI", "sv-SE", "sw", "sw-CD", "sw-KE", "sw-TZ", "sw-UG", "ta", "ta-IN", "ta-LK", "ta-MY", "ta-SG", "te", "te-IN", "th", "th-TH", "tr", "tr-CY", "tr-TR", "uk", "uk-UA", "vi", "vi-VN", "zh", "zh-Hans", "zh-Hans-CN", "zh-Hans-HK", "zh-Hans-MO", "zh-Hans-SG", "zh-Hant", "zh-Hant-HK", "zh-Hant-MO", "zh-Hant-TW"];
  exports.ECMASCRIPT_LISTFORMAT_COMMON_LOCALES_2022 = goog.LOCALE === "am" || goog.LOCALE === "ar" || goog.LOCALE === "ar-001" || goog.LOCALE === "ar-AE" || goog.LOCALE === "ar-BH" || goog.LOCALE === "ar-DJ" || goog.LOCALE === "ar-DZ" || goog.LOCALE === "ar-EG" || goog.LOCALE === "ar-EH" || goog.LOCALE === "ar-ER" || goog.LOCALE === "ar-IL" || goog.LOCALE === "ar-IQ" || goog.LOCALE === "ar-JO" || goog.LOCALE === "ar-KM" || goog.LOCALE === "ar-KW" || goog.LOCALE === "ar-LB" || goog.LOCALE === "ar-LY" || 
  goog.LOCALE === "ar-MA" || goog.LOCALE === "ar-MR" || goog.LOCALE === "ar-OM" || goog.LOCALE === "ar-PS" || goog.LOCALE === "ar-QA" || goog.LOCALE === "ar-SA" || goog.LOCALE === "ar-SD" || goog.LOCALE === "ar-SO" || goog.LOCALE === "ar-SS" || goog.LOCALE === "ar-SY" || goog.LOCALE === "ar-TD" || goog.LOCALE === "ar-TN" || goog.LOCALE === "ar-YE" || goog.LOCALE === "bg" || goog.LOCALE === "bg-BG" || goog.LOCALE === "bn" || goog.LOCALE === "bn-BD" || goog.LOCALE === "bn-IN" || goog.LOCALE === "bs-Cyrl" || 
  goog.LOCALE === "bs-Cyrl-BA" || goog.LOCALE === "ca" || goog.LOCALE === "ca-AD" || goog.LOCALE === "ca-ES" || goog.LOCALE === "ca-FR" || goog.LOCALE === "ca-IT" || goog.LOCALE === "cs" || goog.LOCALE === "cs-CZ" || goog.LOCALE === "da" || goog.LOCALE === "da-DK" || goog.LOCALE === "da-GL" || goog.LOCALE === "de" || goog.LOCALE === "de-AT" || goog.LOCALE === "de-BE" || goog.LOCALE === "de-CH" || goog.LOCALE === "de-DE" || goog.LOCALE === "de-IT" || goog.LOCALE === "de-LI" || goog.LOCALE === "de-LU" || 
  goog.LOCALE === "el" || goog.LOCALE === "el-CY" || goog.LOCALE === "el-GR" || goog.LOCALE === "en" || goog.LOCALE === "en-001" || goog.LOCALE === "en-150" || goog.LOCALE === "en-AE" || goog.LOCALE === "en-AG" || goog.LOCALE === "en-AI" || goog.LOCALE === "en-AS" || goog.LOCALE === "en-AT" || goog.LOCALE === "en-AU" || goog.LOCALE === "en-BB" || goog.LOCALE === "en-BE" || goog.LOCALE === "en-BI" || goog.LOCALE === "en-BM" || goog.LOCALE === "en-BS" || goog.LOCALE === "en-BW" || goog.LOCALE === "en-BZ" || 
  goog.LOCALE === "en-CA" || goog.LOCALE === "en-CC" || goog.LOCALE === "en-CH" || goog.LOCALE === "en-CK" || goog.LOCALE === "en-CM" || goog.LOCALE === "en-CX" || goog.LOCALE === "en-CY" || goog.LOCALE === "en-DE" || goog.LOCALE === "en-DG" || goog.LOCALE === "en-DK" || goog.LOCALE === "en-DM" || goog.LOCALE === "en-ER" || goog.LOCALE === "en-FI" || goog.LOCALE === "en-FJ" || goog.LOCALE === "en-FK" || goog.LOCALE === "en-FM" || goog.LOCALE === "en-GB" || goog.LOCALE === "en-GD" || goog.LOCALE === 
  "en-GG" || goog.LOCALE === "en-GH" || goog.LOCALE === "en-GI" || goog.LOCALE === "en-GM" || goog.LOCALE === "en-GU" || goog.LOCALE === "en-GY" || goog.LOCALE === "en-HK" || goog.LOCALE === "en-IE" || goog.LOCALE === "en-IL" || goog.LOCALE === "en-IM" || goog.LOCALE === "en-IN" || goog.LOCALE === "en-IO" || goog.LOCALE === "en-JE" || goog.LOCALE === "en-JM" || goog.LOCALE === "en-KE" || goog.LOCALE === "en-KI" || goog.LOCALE === "en-KN" || goog.LOCALE === "en-KY" || goog.LOCALE === "en-LC" || goog.LOCALE === 
  "en-LR" || goog.LOCALE === "en-LS" || goog.LOCALE === "en-MG" || goog.LOCALE === "en-MH" || goog.LOCALE === "en-MO" || goog.LOCALE === "en-MP" || goog.LOCALE === "en-MS" || goog.LOCALE === "en-MT" || goog.LOCALE === "en-MU" || goog.LOCALE === "en-MW" || goog.LOCALE === "en-MY" || goog.LOCALE === "en-NA" || goog.LOCALE === "en-NF" || goog.LOCALE === "en-NG" || goog.LOCALE === "en-NL" || goog.LOCALE === "en-NR" || goog.LOCALE === "en-NU" || goog.LOCALE === "en-NZ" || goog.LOCALE === "en-PG" || goog.LOCALE === 
  "en-PH" || goog.LOCALE === "en-PK" || goog.LOCALE === "en-PN" || goog.LOCALE === "en-PR" || goog.LOCALE === "en-PW" || goog.LOCALE === "en-RW" || goog.LOCALE === "en-SB" || goog.LOCALE === "en-SC" || goog.LOCALE === "en-SD" || goog.LOCALE === "en-SE" || goog.LOCALE === "en-SG" || goog.LOCALE === "en-SH" || goog.LOCALE === "en-SI" || goog.LOCALE === "en-SL" || goog.LOCALE === "en-SS" || goog.LOCALE === "en-SX" || goog.LOCALE === "en-SZ" || goog.LOCALE === "en-TC" || goog.LOCALE === "en-TK" || goog.LOCALE === 
  "en-TO" || goog.LOCALE === "en-TT" || goog.LOCALE === "en-TV" || goog.LOCALE === "en-TZ" || goog.LOCALE === "en-UG" || goog.LOCALE === "en-UM" || goog.LOCALE === "en-US" || goog.LOCALE === "en-VC" || goog.LOCALE === "en-VG" || goog.LOCALE === "en-VI" || goog.LOCALE === "en-VU" || goog.LOCALE === "en-WS" || goog.LOCALE === "en-ZA" || goog.LOCALE === "en-ZM" || goog.LOCALE === "en-ZW" || goog.LOCALE === "es" || goog.LOCALE === "es-419" || goog.LOCALE === "es-AR" || goog.LOCALE === "es-BO" || goog.LOCALE === 
  "es-BR" || goog.LOCALE === "es-BZ" || goog.LOCALE === "es-CL" || goog.LOCALE === "es-CO" || goog.LOCALE === "es-CR" || goog.LOCALE === "es-CU" || goog.LOCALE === "es-DO" || goog.LOCALE === "es-EA" || goog.LOCALE === "es-EC" || goog.LOCALE === "es-ES" || goog.LOCALE === "es-GQ" || goog.LOCALE === "es-GT" || goog.LOCALE === "es-HN" || goog.LOCALE === "es-IC" || goog.LOCALE === "es-MX" || goog.LOCALE === "es-NI" || goog.LOCALE === "es-PA" || goog.LOCALE === "es-PE" || goog.LOCALE === "es-PH" || goog.LOCALE === 
  "es-PR" || goog.LOCALE === "es-PY" || goog.LOCALE === "es-SV" || goog.LOCALE === "es-US" || goog.LOCALE === "es-UY" || goog.LOCALE === "es-VE" || goog.LOCALE === "et" || goog.LOCALE === "et-EE" || goog.LOCALE === "fa" || goog.LOCALE === "fa-AF" || goog.LOCALE === "fa-IR" || goog.LOCALE === "fi" || goog.LOCALE === "fi-FI" || goog.LOCALE === "fil" || goog.LOCALE === "fil-PH" || goog.LOCALE === "fr" || goog.LOCALE === "fr-BE" || goog.LOCALE === "fr-BF" || goog.LOCALE === "fr-BI" || goog.LOCALE === 
  "fr-BJ" || goog.LOCALE === "fr-BL" || goog.LOCALE === "fr-CA" || goog.LOCALE === "fr-CD" || goog.LOCALE === "fr-CF" || goog.LOCALE === "fr-CG" || goog.LOCALE === "fr-CH" || goog.LOCALE === "fr-CI" || goog.LOCALE === "fr-CM" || goog.LOCALE === "fr-DJ" || goog.LOCALE === "fr-DZ" || goog.LOCALE === "fr-FR" || goog.LOCALE === "fr-GA" || goog.LOCALE === "fr-GF" || goog.LOCALE === "fr-GN" || goog.LOCALE === "fr-GP" || goog.LOCALE === "fr-GQ" || goog.LOCALE === "fr-HT" || goog.LOCALE === "fr-KM" || goog.LOCALE === 
  "fr-LU" || goog.LOCALE === "fr-MA" || goog.LOCALE === "fr-MC" || goog.LOCALE === "fr-MF" || goog.LOCALE === "fr-MG" || goog.LOCALE === "fr-ML" || goog.LOCALE === "fr-MQ" || goog.LOCALE === "fr-MR" || goog.LOCALE === "fr-MU" || goog.LOCALE === "fr-NC" || goog.LOCALE === "fr-NE" || goog.LOCALE === "fr-PF" || goog.LOCALE === "fr-PM" || goog.LOCALE === "fr-RE" || goog.LOCALE === "fr-RW" || goog.LOCALE === "fr-SC" || goog.LOCALE === "fr-SN" || goog.LOCALE === "fr-SY" || goog.LOCALE === "fr-TD" || goog.LOCALE === 
  "fr-TG" || goog.LOCALE === "fr-TN" || goog.LOCALE === "fr-VU" || goog.LOCALE === "fr-WF" || goog.LOCALE === "fr-YT" || goog.LOCALE === "gu" || goog.LOCALE === "gu-IN" || goog.LOCALE === "he" || goog.LOCALE === "he-IL" || goog.LOCALE === "hi" || goog.LOCALE === "hi-IN" || goog.LOCALE === "hr" || goog.LOCALE === "hr-BA" || goog.LOCALE === "hr-HR" || goog.LOCALE === "hu" || goog.LOCALE === "hu-HU" || goog.LOCALE === "id" || goog.LOCALE === "id-ID" || goog.LOCALE === "it" || goog.LOCALE === "it-CH" || 
  goog.LOCALE === "it-IT" || goog.LOCALE === "it-SM" || goog.LOCALE === "it-VA" || goog.LOCALE === "ja" || goog.LOCALE === "ja-JP" || goog.LOCALE === "kn" || goog.LOCALE === "kn-IN" || goog.LOCALE === "ko" || goog.LOCALE === "ko-KP" || goog.LOCALE === "ko-KR" || goog.LOCALE === "lt" || goog.LOCALE === "lt-LT" || goog.LOCALE === "lv" || goog.LOCALE === "lv-LV" || goog.LOCALE === "ml" || goog.LOCALE === "ml-IN" || goog.LOCALE === "mr" || goog.LOCALE === "mr-IN" || goog.LOCALE === "ms" || goog.LOCALE === 
  "ms-BN" || goog.LOCALE === "ms-ID" || goog.LOCALE === "ms-MY" || goog.LOCALE === "ms-SG" || goog.LOCALE === "nb" || goog.LOCALE === "nl" || goog.LOCALE === "nl-AW" || goog.LOCALE === "nl-BE" || goog.LOCALE === "nl-BQ" || goog.LOCALE === "nl-CW" || goog.LOCALE === "nl-NL" || goog.LOCALE === "nl-SR" || goog.LOCALE === "nl-SX" || goog.LOCALE === "no" || goog.LOCALE === "pl" || goog.LOCALE === "pl-PL" || goog.LOCALE === "pt" || goog.LOCALE === "pt-AO" || goog.LOCALE === "pt-BR" || goog.LOCALE === "pt-CH" || 
  goog.LOCALE === "pt-CV" || goog.LOCALE === "pt-GQ" || goog.LOCALE === "pt-GW" || goog.LOCALE === "pt-LU" || goog.LOCALE === "pt-MO" || goog.LOCALE === "pt-MZ" || goog.LOCALE === "pt-PT" || goog.LOCALE === "pt-ST" || goog.LOCALE === "pt-TL" || goog.LOCALE === "ro" || goog.LOCALE === "ro-MD" || goog.LOCALE === "ro-RO" || goog.LOCALE === "ru" || goog.LOCALE === "ru-BY" || goog.LOCALE === "ru-KG" || goog.LOCALE === "ru-KZ" || goog.LOCALE === "ru-MD" || goog.LOCALE === "ru-RU" || goog.LOCALE === "ru-UA" || 
  goog.LOCALE === "sk" || goog.LOCALE === "sk-SK" || goog.LOCALE === "sl" || goog.LOCALE === "sl-SI" || goog.LOCALE === "sr" || goog.LOCALE === "sr-Cyrl" || goog.LOCALE === "sr-Cyrl-BA" || goog.LOCALE === "sr-Cyrl-ME" || goog.LOCALE === "sr-Cyrl-RS" || goog.LOCALE === "sr-Cyrl-XK" || goog.LOCALE === "sr-Latn" || goog.LOCALE === "sr-Latn-BA" || goog.LOCALE === "sr-Latn-ME" || goog.LOCALE === "sr-Latn-RS" || goog.LOCALE === "sr-Latn-XK" || goog.LOCALE === "sv" || goog.LOCALE === "sv-AX" || goog.LOCALE === 
  "sv-FI" || goog.LOCALE === "sv-SE" || goog.LOCALE === "sw" || goog.LOCALE === "sw-CD" || goog.LOCALE === "sw-KE" || goog.LOCALE === "sw-TZ" || goog.LOCALE === "sw-UG" || goog.LOCALE === "ta" || goog.LOCALE === "ta-IN" || goog.LOCALE === "ta-LK" || goog.LOCALE === "ta-MY" || goog.LOCALE === "ta-SG" || goog.LOCALE === "te" || goog.LOCALE === "te-IN" || goog.LOCALE === "th" || goog.LOCALE === "th-TH" || goog.LOCALE === "tr" || goog.LOCALE === "tr-CY" || goog.LOCALE === "tr-TR" || goog.LOCALE === "uk" || 
  goog.LOCALE === "uk-UA" || goog.LOCALE === "vi" || goog.LOCALE === "vi-VN" || goog.LOCALE === "zh" || goog.LOCALE === "zh-Hans" || goog.LOCALE === "zh-Hans-CN" || goog.LOCALE === "zh-Hans-HK" || goog.LOCALE === "zh-Hans-MO" || goog.LOCALE === "zh-Hans-SG" || goog.LOCALE === "zh-Hant" || goog.LOCALE === "zh-Hant-HK" || goog.LOCALE === "zh-Hant-MO" || goog.LOCALE === "zh-Hant-TW";
  exports.USE_ECMASCRIPT_I18N_LISTFORMAT = goog.FEATURESET_YEAR >= 2022 && exports.ECMASCRIPT_LISTFORMAT_COMMON_LOCALES_2022 && !exports.ECMASCRIPT_INTL_OPT_OUT;
  exports.USE_ECMASCRIPT_I18N_DATEINTERVALFORMAT = goog.FEATURESET_YEAR >= 2022 && exports.ECMASCRIPT_LISTFORMAT_COMMON_LOCALES_2022 && !exports.ECMASCRIPT_INTL_OPT_OUT;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.i18n.localefeature.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.i18n.NativeLocaleDigits");
  let LocaleScriptMap;
  exports.LocaleScriptMap;
  exports.FormatWithLocaleDigits = {"ar":"latn", "ar-EG":"arab", "bn":"beng", "fa":"arabext", "mr":"deva", "my":"mymr", "ne":"deva"};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.i18n.nativelocaledigits.js");

goog.provide("goog.i18n.TimeZone");
goog.require("goog.array");
goog.require("goog.object");
goog.require("goog.string");
goog.requireType("goog.date.DateLike");
goog.i18n.TimeZone = function() {
  this.timeZoneId_;
  this.standardOffset_;
  this.tzNames_;
  this.tzNamesExt_;
  this.transitions_;
};
goog.i18n.TimeZone.MILLISECONDS_PER_HOUR_ = 3600 * 1000;
goog.i18n.TimeZone.NameType = {STD_SHORT_NAME:0, STD_LONG_NAME:1, DLT_SHORT_NAME:2, DLT_LONG_NAME:3};
goog.i18n.TimeZone.createTimeZone = function(timeZoneData) {
  if (typeof timeZoneData == "number") {
    return goog.i18n.TimeZone.createSimpleTimeZone_(timeZoneData);
  }
  var tz = new goog.i18n.TimeZone();
  tz.timeZoneId_ = timeZoneData["id"];
  tz.standardOffset_ = -timeZoneData["std_offset"];
  tz.tzNames_ = timeZoneData["names"];
  tz.tzNamesExt_ = timeZoneData["names_ext"];
  tz.transitions_ = timeZoneData["transitions"];
  return tz;
};
goog.i18n.TimeZone.createSimpleTimeZone_ = function(timeZoneOffsetInMinutes) {
  var tz = new goog.i18n.TimeZone();
  tz.standardOffset_ = timeZoneOffsetInMinutes;
  tz.timeZoneId_ = goog.i18n.TimeZone.composePosixTimeZoneID_(timeZoneOffsetInMinutes);
  var str = goog.i18n.TimeZone.composeUTCString_(timeZoneOffsetInMinutes);
  var strGMT = goog.i18n.TimeZone.composeGMTString_(timeZoneOffsetInMinutes);
  tz.tzNames_ = [str, str];
  tz.tzNamesExt_ = {STD_LONG_NAME_GMT:strGMT, STD_GENERIC_LOCATION:strGMT};
  tz.transitions_ = [];
  return tz;
};
goog.i18n.TimeZone.composeGMTString_ = function(offset) {
  var parts = ["GMT"];
  parts.push(offset <= 0 ? "+" : "-");
  offset = Math.abs(offset);
  parts.push(goog.string.padNumber(Math.floor(offset / 60) % 100, 2), ":", goog.string.padNumber(offset % 60, 2));
  return parts.join("");
};
goog.i18n.TimeZone.composePosixTimeZoneID_ = function(offset) {
  if (offset == 0) {
    return "Etc/GMT";
  }
  var parts = ["Etc/GMT", offset < 0 ? "-" : "+"];
  offset = Math.abs(offset);
  parts.push(Math.floor(offset / 60) % 100);
  offset = offset % 60;
  if (offset != 0) {
    parts.push(":", goog.string.padNumber(offset, 2));
  }
  return parts.join("");
};
goog.i18n.TimeZone.composeUTCString_ = function(offset) {
  if (offset == 0) {
    return "UTC";
  }
  var parts = ["UTC", offset < 0 ? "+" : "-"];
  offset = Math.abs(offset);
  parts.push(Math.floor(offset / 60) % 100);
  offset = offset % 60;
  if (offset != 0) {
    parts.push(":", offset);
  }
  return parts.join("");
};
goog.i18n.TimeZone.prototype.getTimeZoneData = function() {
  return {"id":this.timeZoneId_, "std_offset":-this.standardOffset_, "names":goog.array.clone(this.tzNames_), "names_ext":goog.object.clone(this.tzNamesExt_), "transitions":goog.array.clone(this.transitions_)};
};
goog.i18n.TimeZone.prototype.getDaylightAdjustment = function(date) {
  var timeInMs = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
  var timeInHours = timeInMs / goog.i18n.TimeZone.MILLISECONDS_PER_HOUR_;
  var index = 0;
  while (index < this.transitions_.length && timeInHours >= this.transitions_[index]) {
    index += 2;
  }
  return index == 0 ? 0 : this.transitions_[index - 1];
};
goog.i18n.TimeZone.prototype.getGMTString = function(date) {
  return goog.i18n.TimeZone.composeGMTString_(this.getOffset(date));
};
goog.i18n.TimeZone.prototype.getUTCString = function(date) {
  return goog.i18n.TimeZone.composeUTCString_(this.getOffset(date));
};
goog.i18n.TimeZone.prototype.getLongName = function(date) {
  return this.tzNames_[this.isDaylightTime(date) ? goog.i18n.TimeZone.NameType.DLT_LONG_NAME : goog.i18n.TimeZone.NameType.STD_LONG_NAME];
};
goog.i18n.TimeZone.prototype.getOffset = function(date) {
  const offset = this.standardOffset_ - this.getDaylightAdjustment(date);
  if (offset === -1440) {
    return 0;
  }
  return offset;
};
goog.i18n.TimeZone.prototype.getRFCTimeZoneString = function(date) {
  var offset = -this.getOffset(date);
  var parts = [offset < 0 ? "-" : "+"];
  offset = Math.abs(offset);
  parts.push(goog.string.padNumber(Math.floor(offset / 60) % 100, 2), goog.string.padNumber(offset % 60, 2));
  return parts.join("");
};
goog.i18n.TimeZone.prototype.getShortName = function(date) {
  return this.tzNames_[this.isDaylightTime(date) ? goog.i18n.TimeZone.NameType.DLT_SHORT_NAME : goog.i18n.TimeZone.NameType.STD_SHORT_NAME];
};
goog.i18n.TimeZone.prototype.getTimeZoneId = function() {
  return this.timeZoneId_;
};
goog.i18n.TimeZone.prototype.isDaylightTime = function(date) {
  return this.getDaylightAdjustment(date) > 0;
};
goog.i18n.TimeZone.prototype.getLongNameGMT = function(date) {
  if (this.isDaylightTime(date)) {
    return this.tzNamesExt_.DST_LONG_NAME_GMT !== undefined ? this.tzNamesExt_.DST_LONG_NAME_GMT : this.tzNamesExt_["DST_LONG_NAME_GMT"];
  } else {
    return this.tzNamesExt_.STD_LONG_NAME_GMT !== undefined ? this.tzNamesExt_.STD_LONG_NAME_GMT : this.tzNamesExt_["STD_LONG_NAME_GMT"];
  }
};
goog.i18n.TimeZone.prototype.getGenericLocation = function(date) {
  if (this.isDaylightTime(date)) {
    return this.tzNamesExt_.DST_GENERIC_LOCATION !== undefined ? this.tzNamesExt_.DST_GENERIC_LOCATION : this.tzNamesExt_["DST_GENERIC_LOCATION"];
  } else {
    return this.tzNamesExt_.STD_GENERIC_LOCATION !== undefined ? this.tzNamesExt_.STD_GENERIC_LOCATION : this.tzNamesExt_["STD_GENERIC_LOCATION"];
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.i18n.timezone.js");

goog.provide("goog.i18n.DateTimeFormat");
goog.provide("goog.i18n.DateTimeFormat.Format");
goog.require("goog.asserts");
goog.require("goog.date");
goog.require("goog.date.UtcDateTime");
goog.require("goog.i18n.DateTimeSymbols");
goog.require("goog.i18n.DayPeriods");
goog.require("goog.i18n.LocaleFeature");
goog.require("goog.i18n.NativeLocaleDigits");
goog.require("goog.i18n.TimeZone");
goog.require("goog.string");
goog.requireType("goog.i18n.DateTimeSymbolsType");
goog.scope(function() {
  const DayPeriods = goog.module.get("goog.i18n.DayPeriods");
  const LocaleFeature = goog.module.get("goog.i18n.LocaleFeature");
  const NativeLocaleDigits = goog.module.get("goog.i18n.NativeLocaleDigits");
  goog.i18n.DateTimeFormat = function(pattern, opt_dateTimeSymbols) {
    goog.asserts.assert(pattern !== undefined, "Pattern must be defined");
    goog.asserts.assert(opt_dateTimeSymbols !== undefined || goog.i18n.DateTimeSymbols !== undefined, "goog.i18n.DateTimeSymbols or explicit symbols must be defined");
    this.intlFormatter_ = null;
    this.originalPattern_ = pattern;
    this.patternParts_ = [];
    if (LocaleFeature.USE_ECMASCRIPT_I18N_DATETIMEF && typeof pattern == "number") {
      this.applyStandardEnumNative_(pattern, false, null);
    } else {
      this.dateTimeSymbols_ = opt_dateTimeSymbols || goog.i18n.DateTimeSymbols;
      if (typeof pattern == "number") {
        this.applyStandardPattern_(pattern);
      } else {
        this.applyPattern_(pattern);
      }
    }
  };
  goog.i18n.DateTimeFormat.Format = {FULL_DATE:0, LONG_DATE:1, MEDIUM_DATE:2, SHORT_DATE:3, FULL_TIME:4, LONG_TIME:5, MEDIUM_TIME:6, SHORT_TIME:7, FULL_DATETIME:8, LONG_DATETIME:9, MEDIUM_DATETIME:10, SHORT_DATETIME:11, WEEKDAY_MONTH_DAY_FULL:12};
  goog.i18n.DateTimeFormat.TOKENS_ = [/^'(?:[^']|'')*('|$)/, /^(?:G+|y+|Y+|M+|k+|S+|E+|a+|b+|B+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|V+|w+|z+|Z+)/, /^[^'GyYMkSEabBhKHcLQdmsvVwzZ]+/];
  goog.i18n.DateTimeFormat.PartTypes_ = {QUOTED_STRING:0, FIELD:1, LITERAL:2};
  goog.i18n.DateTimeFormat.getHours_ = function(date) {
    return date.getHours ? date.getHours() : 0;
  };
  goog.i18n.DateTimeFormat.getMinutes_ = function(date) {
    return date.getMinutes ? date.getMinutes() : 0;
  };
  goog.i18n.DateTimeFormat.prototype.applyPattern_ = function(pattern) {
    if (goog.i18n.DateTimeFormat.removeRlmInPatterns_) {
      pattern = pattern.replace(/\u200f/g, "");
    }
    while (pattern) {
      const previousPattern = pattern;
      for (let i = 0; i < goog.i18n.DateTimeFormat.TOKENS_.length; ++i) {
        const m = pattern.match(goog.i18n.DateTimeFormat.TOKENS_[i]);
        if (m) {
          let part = m[0];
          pattern = pattern.substring(part.length);
          if (i == goog.i18n.DateTimeFormat.PartTypes_.QUOTED_STRING) {
            if (part == "''") {
              part = "'";
            } else {
              part = part.substring(1, m[1] == "'" ? part.length - 1 : part.length);
              part = part.replace(/''/g, "'");
            }
          }
          this.patternParts_.push({text:part, type:i});
          break;
        }
      }
      if (previousPattern === pattern) {
        throw new Error("Malformed pattern part: " + pattern);
      }
    }
  };
  goog.i18n.DateTimeFormat.prototype.format = function(date, opt_timeZone) {
    if (!date) {
      throw new Error("The date to format must be non-null.");
    }
    if (this.intlFormatter_ && LocaleFeature.USE_ECMASCRIPT_I18N_DATETIMEF) {
      let changedUtcSettings = false;
      const isDateUtc = date instanceof goog.date.UtcDateTime;
      const options = this.intlFormatter_.resolvedOptions();
      if (isDateUtc) {
        changedUtcSettings = options.timeZone !== "UTC";
      } else {
        changedUtcSettings = options.timeZone === "UTC";
      }
      if (goog.i18n.DateTimeFormat.resetEnforceAsciiDigits_ || changedUtcSettings || opt_timeZone) {
        this.applyStandardEnumNative_(this.originalPattern_, isDateUtc, opt_timeZone);
        goog.i18n.DateTimeFormat.resetEnforceAsciiDigits_ = false;
      }
      const realdate = date ? new Date(date.valueOf()) : undefined;
      return this.intlFormatter_.format(realdate);
    } else {
      let diff = opt_timeZone ? (date.getTimezoneOffset() - opt_timeZone.getOffset(date)) * 60000 : 0;
      let dateForDate = diff ? new Date(date.getTime() + diff) : date;
      let dateForTime = dateForDate;
      if (opt_timeZone && dateForDate.getTimezoneOffset() != date.getTimezoneOffset()) {
        const dstDiff = (dateForDate.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
        dateForDate = new Date(dateForDate.getTime() + dstDiff);
        diff += diff > 0 ? -goog.date.MS_PER_DAY : goog.date.MS_PER_DAY;
        dateForTime = new Date(date.getTime() + diff);
      }
      const out = [];
      for (let i = 0; i < this.patternParts_.length; ++i) {
        const text = this.patternParts_[i].text;
        if (goog.i18n.DateTimeFormat.PartTypes_.FIELD == this.patternParts_[i].type) {
          out.push(this.formatField_(text, date, dateForDate, dateForTime, opt_timeZone));
        } else {
          out.push(text);
        }
      }
      return out.join("");
    }
  };
  goog.i18n.DateTimeFormat.IntlOptions;
  goog.i18n.DateTimeFormat.prototype.applyStandardEnumNative_ = function(formatType, isUtc, opt_timeZone) {
    const options = {calendar:"gregory"};
    if (isUtc) {
      options.timeZone = "UTC";
    } else if (opt_timeZone) {
      options.timeZone = opt_timeZone.getTimeZoneId();
    }
    switch(formatType) {
      case goog.i18n.DateTimeFormat.Format.FULL_DATE:
        options.dateStyle = "full";
        break;
      case goog.i18n.DateTimeFormat.Format.LONG_DATE:
        options.dateStyle = "long";
        break;
      case goog.i18n.DateTimeFormat.Format.MEDIUM_DATE:
        options.dateStyle = "medium";
        break;
      case goog.i18n.DateTimeFormat.Format.SHORT_DATE:
      default:
        options.dateStyle = "short";
        break;
      case goog.i18n.DateTimeFormat.Format.FULL_TIME:
        options.timeStyle = "full";
        break;
      case goog.i18n.DateTimeFormat.Format.LONG_TIME:
        options.timeStyle = "long";
        break;
      case goog.i18n.DateTimeFormat.Format.MEDIUM_TIME:
        options.timeStyle = "medium";
        break;
      case goog.i18n.DateTimeFormat.Format.SHORT_TIME:
        options.timeStyle = "short";
        break;
      case goog.i18n.DateTimeFormat.Format.FULL_DATETIME:
        options.dateStyle = "full";
        options.timeStyle = "full";
        break;
      case goog.i18n.DateTimeFormat.Format.LONG_DATETIME:
        options.dateStyle = "long";
        options.timeStyle = "long";
        break;
      case goog.i18n.DateTimeFormat.Format.MEDIUM_DATETIME:
        options.dateStyle = "medium";
        options.timeStyle = "medium";
        break;
      case goog.i18n.DateTimeFormat.Format.SHORT_DATETIME:
        options.dateStyle = "short";
        options.timeStyle = "short";
        break;
      case goog.i18n.DateTimeFormat.Format.WEEKDAY_MONTH_DAY_FULL:
        options.weekday = "long";
        options.month = "long";
        options.day = "numeric";
        break;
    }
    let fixedLocale = goog.LOCALE.replace(/_/g, "-");
    if (!goog.LOCALE) {
      fixedLocale = "en";
    }
    if (goog.i18n.DateTimeFormat.enforceAsciiDigits_) {
      options.numberingSystem = "latn";
    } else {
      if (fixedLocale in NativeLocaleDigits.FormatWithLocaleDigits) {
        options.numberingSystem = NativeLocaleDigits.FormatWithLocaleDigits[fixedLocale];
      }
    }
    try {
      this.intlFormatter_ = new goog.global.Intl.DateTimeFormat(fixedLocale, options);
    } catch (e) {
      goog.asserts.assert(e != null);
    }
  };
  goog.i18n.DateTimeFormat.prototype.applyStandardPattern_ = function(formatType) {
    let pattern;
    if (formatType < 4) {
      pattern = this.dateTimeSymbols_.DATEFORMATS[formatType];
    } else if (formatType < 8) {
      pattern = this.dateTimeSymbols_.TIMEFORMATS[formatType - 4];
    } else if (formatType < 12) {
      pattern = this.dateTimeSymbols_.DATETIMEFORMATS[formatType - 8];
      pattern = pattern.replace("{1}", this.dateTimeSymbols_.DATEFORMATS[formatType - 8]);
      pattern = pattern.replace("{0}", this.dateTimeSymbols_.TIMEFORMATS[formatType - 8]);
    } else if (formatType === goog.i18n.DateTimeFormat.Format.WEEKDAY_MONTH_DAY_FULL) {
      pattern = this.removeYearFormatFromPattern_(this.dateTimeSymbols_.DATEFORMATS[0]);
    } else {
      this.applyStandardPattern_(goog.i18n.DateTimeFormat.Format.MEDIUM_DATETIME);
      return;
    }
    this.applyPattern_(pattern);
  };
  goog.i18n.DateTimeFormat.prototype.localizeNumbers_ = function(input) {
    return goog.i18n.DateTimeFormat.localizeNumbers(input, this.dateTimeSymbols_);
  };
  goog.i18n.DateTimeFormat.enforceAsciiDigits_ = false;
  goog.i18n.DateTimeFormat.resetEnforceAsciiDigits_ = false;
  goog.i18n.DateTimeFormat.removeRlmInPatterns_ = false;
  goog.i18n.DateTimeFormat.setEnforceAsciiDigits = function(enforceAsciiDigits) {
    if (goog.i18n.DateTimeFormat.enforceAsciiDigits_ !== enforceAsciiDigits) {
      goog.i18n.DateTimeFormat.enforceAsciiDigits_ = enforceAsciiDigits;
      goog.i18n.DateTimeFormat.resetEnforceAsciiDigits_ = true;
    }
    goog.i18n.DateTimeFormat.removeRlmInPatterns_ = enforceAsciiDigits;
  };
  goog.i18n.DateTimeFormat.isEnforceAsciiDigits = function() {
    return goog.i18n.DateTimeFormat.enforceAsciiDigits_;
  };
  goog.i18n.DateTimeFormat.localizeNumbers = function(input, opt_dateTimeSymbols) {
    input = String(input);
    const dateTimeSymbols = opt_dateTimeSymbols || goog.i18n.DateTimeSymbols;
    if (dateTimeSymbols.ZERODIGIT === undefined || goog.i18n.DateTimeFormat.enforceAsciiDigits_) {
      return input;
    }
    const parts = [];
    for (let i = 0; i < input.length; i++) {
      const c = input.charCodeAt(i);
      parts.push(48 <= c && c <= 57 ? String.fromCharCode(dateTimeSymbols.ZERODIGIT + c - 48) : input.charAt(i));
    }
    return parts.join("");
  };
  goog.i18n.DateTimeFormat.prototype.formatEra_ = function(count, date) {
    const value = date.getFullYear() > 0 ? 1 : 0;
    return count >= 4 ? this.dateTimeSymbols_.ERANAMES[value] : this.dateTimeSymbols_.ERAS[value];
  };
  goog.i18n.DateTimeFormat.prototype.formatYear_ = function(count, date) {
    let value = date.getFullYear();
    if (value < 0) {
      value = -value;
    }
    if (count == 2) {
      value = value % 100;
    }
    return this.localizeNumbers_(goog.string.padNumber(value, count));
  };
  goog.i18n.DateTimeFormat.prototype.formatYearOfWeek_ = function(count, date) {
    let value = goog.date.getYearOfWeek(date.getFullYear(), date.getMonth(), date.getDate(), this.dateTimeSymbols_.FIRSTWEEKCUTOFFDAY, this.dateTimeSymbols_.FIRSTDAYOFWEEK);
    if (value < 0) {
      value = -value;
    }
    if (count == 2) {
      value = value % 100;
    }
    return this.localizeNumbers_(goog.string.padNumber(value, count));
  };
  goog.i18n.DateTimeFormat.prototype.formatMonth_ = function(count, date) {
    const value = date.getMonth();
    switch(count) {
      case 5:
        return this.dateTimeSymbols_.NARROWMONTHS[value];
      case 4:
        return this.dateTimeSymbols_.MONTHS[value];
      case 3:
        return this.dateTimeSymbols_.SHORTMONTHS[value];
      default:
        return this.localizeNumbers_(goog.string.padNumber(value + 1, count));
    }
  };
  goog.i18n.DateTimeFormat.validateDateHasTime_ = function(date) {
    let maybeHasTime = date;
    if (maybeHasTime.getHours && maybeHasTime.getSeconds && maybeHasTime.getMinutes) {
      return;
    }
    throw new Error("The date to format has no time (probably a goog.date.Date). " + "Use Date or goog.date.DateTime, or use a pattern without time fields.");
  };
  goog.i18n.DateTimeFormat.prototype.format24Hours_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    const hours = goog.i18n.DateTimeFormat.getHours_(date) || 24;
    return this.localizeNumbers_(goog.string.padNumber(hours, count));
  };
  goog.i18n.DateTimeFormat.prototype.formatFractionalSeconds_ = function(count, date) {
    const value = date.getMilliseconds() / 1000;
    return this.localizeNumbers_(value.toFixed(Math.min(3, count)).slice(2) + (count > 3 ? goog.string.padNumber(0, count - 3) : ""));
  };
  goog.i18n.DateTimeFormat.prototype.formatDayOfWeek_ = function(count, date) {
    const value = date.getDay();
    return count >= 4 ? this.dateTimeSymbols_.WEEKDAYS[value] : this.dateTimeSymbols_.SHORTWEEKDAYS[value];
  };
  goog.i18n.DateTimeFormat.prototype.formatAmPm_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    const hours = goog.i18n.DateTimeFormat.getHours_(date);
    return this.dateTimeSymbols_.AMPMS[hours >= 12 && hours < 24 ? 1 : 0];
  };
  goog.i18n.DateTimeFormat.prototype.formatAmPmNoonMidnight_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    const hours = goog.i18n.DateTimeFormat.getHours_(date);
    const minutes = goog.i18n.DateTimeFormat.getMinutes_(date);
    const dayPeriods = goog.i18n.DayPeriods.getDayPeriods();
    if (dayPeriods && minutes === 0) {
      if (dayPeriods.midnight && hours == 0) {
        return dayPeriods.midnight.formatNames[0];
      } else if (dayPeriods.noon && hours === 12) {
        return dayPeriods.noon.formatNames[0];
      }
    }
    return this.dateTimeSymbols_.AMPMS[hours >= 12 && hours < 24 ? 1 : 0];
  };
  goog.i18n.DateTimeFormat.prototype.formatFlexibleDayPeriods_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    const hours = goog.i18n.DateTimeFormat.getHours_(date);
    const minutes = goog.i18n.DateTimeFormat.getMinutes_(date);
    const fmtTime = hours.toString(10).padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
    let period;
    const dayPeriods = goog.i18n.DayPeriods.getDayPeriods();
    if (dayPeriods) {
      const keys = Object.keys(dayPeriods);
      for (let index = 0; index < keys.length; index++) {
        let testPeriod = dayPeriods[keys[index]];
        if (fmtTime === testPeriod.at) {
          period = keys[index];
          break;
        }
        if (testPeriod.before > testPeriod.from) {
          if (fmtTime >= testPeriod.from && fmtTime < testPeriod.before) {
            period = keys[index];
          }
        } else {
          if (fmtTime >= testPeriod.from && fmtTime < "24:00" || fmtTime >= "00:00" && fmtTime < testPeriod.before) {
            period = keys[index];
            break;
          }
        }
      }
      if (period) {
        return dayPeriods[period].formatNames[0];
      }
    }
    return this.dateTimeSymbols_.AMPMS[hours >= 12 && hours < 24 ? 1 : 0];
  };
  goog.i18n.DateTimeFormat.prototype.format1To12Hours_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    const hours = goog.i18n.DateTimeFormat.getHours_(date) % 12 || 12;
    return this.localizeNumbers_(goog.string.padNumber(hours, count));
  };
  goog.i18n.DateTimeFormat.prototype.format0To11Hours_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    const hours = goog.i18n.DateTimeFormat.getHours_(date) % 12;
    return this.localizeNumbers_(goog.string.padNumber(hours, count));
  };
  goog.i18n.DateTimeFormat.prototype.format0To23Hours_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    const hours = goog.i18n.DateTimeFormat.getHours_(date);
    return this.localizeNumbers_(goog.string.padNumber(hours, count));
  };
  goog.i18n.DateTimeFormat.prototype.formatStandaloneDay_ = function(count, date) {
    const value = date.getDay();
    switch(count) {
      case 5:
        return this.dateTimeSymbols_.STANDALONENARROWWEEKDAYS[value];
      case 4:
        return this.dateTimeSymbols_.STANDALONEWEEKDAYS[value];
      case 3:
        return this.dateTimeSymbols_.STANDALONESHORTWEEKDAYS[value];
      default:
        return this.localizeNumbers_(goog.string.padNumber(value, 1));
    }
  };
  goog.i18n.DateTimeFormat.prototype.formatStandaloneMonth_ = function(count, date) {
    const value = date.getMonth();
    switch(count) {
      case 5:
        return this.dateTimeSymbols_.STANDALONENARROWMONTHS[value];
      case 4:
        return this.dateTimeSymbols_.STANDALONEMONTHS[value];
      case 3:
        return this.dateTimeSymbols_.STANDALONESHORTMONTHS[value];
      default:
        return this.localizeNumbers_(goog.string.padNumber(value + 1, count));
    }
  };
  goog.i18n.DateTimeFormat.prototype.formatQuarter_ = function(count, date) {
    const value = Math.floor(date.getMonth() / 3);
    return count < 4 ? this.dateTimeSymbols_.SHORTQUARTERS[value] : this.dateTimeSymbols_.QUARTERS[value];
  };
  goog.i18n.DateTimeFormat.prototype.formatDate_ = function(count, date) {
    return this.localizeNumbers_(goog.string.padNumber(date.getDate(), count));
  };
  goog.i18n.DateTimeFormat.prototype.formatMinutes_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    return this.localizeNumbers_(goog.string.padNumber(goog.i18n.DateTimeFormat.getMinutes_(date), count));
  };
  goog.i18n.DateTimeFormat.prototype.formatSeconds_ = function(count, date) {
    goog.i18n.DateTimeFormat.validateDateHasTime_(date);
    return this.localizeNumbers_(goog.string.padNumber(date.getSeconds(), count));
  };
  goog.i18n.DateTimeFormat.prototype.formatWeekOfYear_ = function(count, date) {
    const weekNum = goog.date.getWeekNumber(date.getFullYear(), date.getMonth(), date.getDate(), this.dateTimeSymbols_.FIRSTWEEKCUTOFFDAY, this.dateTimeSymbols_.FIRSTDAYOFWEEK);
    return this.localizeNumbers_(goog.string.padNumber(weekNum, count));
  };
  goog.i18n.DateTimeFormat.prototype.formatTimeZoneRFC_ = function(count, date, opt_timeZone) {
    opt_timeZone = opt_timeZone || goog.i18n.TimeZone.createTimeZone(date.getTimezoneOffset());
    return count < 4 ? opt_timeZone.getRFCTimeZoneString(date) : this.localizeNumbers_(opt_timeZone.getGMTString(date));
  };
  goog.i18n.DateTimeFormat.prototype.formatTimeZone_ = function(count, date, opt_timeZone) {
    opt_timeZone = opt_timeZone || goog.i18n.TimeZone.createTimeZone(date.getTimezoneOffset());
    return count < 4 ? opt_timeZone.getShortName(date) : opt_timeZone.getLongName(date);
  };
  goog.i18n.DateTimeFormat.prototype.formatTimeZoneId_ = function(date, opt_timeZone) {
    opt_timeZone = opt_timeZone || goog.i18n.TimeZone.createTimeZone(date.getTimezoneOffset());
    return opt_timeZone.getTimeZoneId();
  };
  goog.i18n.DateTimeFormat.prototype.formatTimeZoneLocationId_ = function(count, date, opt_timeZone) {
    opt_timeZone = opt_timeZone || goog.i18n.TimeZone.createTimeZone(date.getTimezoneOffset());
    return count <= 2 ? opt_timeZone.getTimeZoneId() : opt_timeZone.getGenericLocation(date);
  };
  goog.i18n.DateTimeFormat.prototype.formatField_ = function(patternStr, date, dateForDate, dateForTime, opt_timeZone) {
    const count = patternStr.length;
    const dayPeriods = goog.i18n.DayPeriods.getDayPeriods();
    switch(patternStr.charAt(0)) {
      case "G":
        return this.formatEra_(count, dateForDate);
      case "y":
        return this.formatYear_(count, dateForDate);
      case "Y":
        return this.formatYearOfWeek_(count, dateForDate);
      case "M":
        return this.formatMonth_(count, dateForDate);
      case "k":
        return this.format24Hours_(count, dateForTime);
      case "S":
        return this.formatFractionalSeconds_(count, dateForTime);
      case "E":
        return this.formatDayOfWeek_(count, dateForDate);
      case "a":
        return this.formatAmPm_(count, dateForTime);
      case "b":
        if (dayPeriods) {
          return this.formatAmPmNoonMidnight_(count, dateForTime);
        } else {
          return this.formatAmPm_(count, dateForTime);
        }
      case "B":
        if (dayPeriods) {
          return this.formatFlexibleDayPeriods_(count, dateForTime);
        } else {
          return this.formatAmPm_(count, dateForTime);
        }
      case "h":
        return this.format1To12Hours_(count, dateForTime);
      case "K":
        return this.format0To11Hours_(count, dateForTime);
      case "H":
        return this.format0To23Hours_(count, dateForTime);
      case "c":
        return this.formatStandaloneDay_(count, dateForDate);
      case "L":
        return this.formatStandaloneMonth_(count, dateForDate);
      case "Q":
        return this.formatQuarter_(count, dateForDate);
      case "d":
        return this.formatDate_(count, dateForDate);
      case "m":
        return this.formatMinutes_(count, dateForTime);
      case "s":
        return this.formatSeconds_(count, dateForTime);
      case "v":
        return this.formatTimeZoneId_(date, opt_timeZone);
      case "V":
        return this.formatTimeZoneLocationId_(count, date, opt_timeZone);
      case "w":
        return this.formatWeekOfYear_(count, dateForTime);
      case "z":
        return this.formatTimeZone_(count, date, opt_timeZone);
      case "Z":
        return this.formatTimeZoneRFC_(count, date, opt_timeZone);
      default:
        return "";
    }
  };
  goog.i18n.DateTimeFormat.prototype.removeYearFormatFromPattern_ = function(patternStr) {
    const yearPattern = /[^EMd]*yy*[^EMd]*/;
    return patternStr.replace(yearPattern, "");
  };
});

$CLJS.SHADOW_ENV.setLoaded("goog.i18n.datetimeformat.js");

goog.provide("goog.async.Deferred");
goog.provide("goog.async.Deferred.AlreadyCalledError");
goog.provide("goog.async.Deferred.CanceledError");
goog.require("goog.Promise");
goog.require("goog.Thenable");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.debug.Error");
goog.async.Deferred = function(opt_onCancelFunction, opt_defaultScope) {
  this.sequence_ = [];
  this.onCancelFunction_ = opt_onCancelFunction;
  this.defaultScope_ = opt_defaultScope || null;
  this.fired_ = false;
  this.hadError_ = false;
  this.result_ = undefined;
  this.blocked_ = false;
  this.blocking_ = false;
  this.silentlyCanceled_ = false;
  this.unhandledErrorId_ = 0;
  this.parent_ = null;
  this.branches_ = 0;
  if (goog.async.Deferred.LONG_STACK_TRACES) {
    this.constructorStack_ = null;
    if (Error.captureStackTrace) {
      const target = {stack:""};
      Error.captureStackTrace(target, goog.async.Deferred);
      if (typeof target.stack == "string") {
        this.constructorStack_ = target.stack.replace(/^[^\n]*\n/, "");
      }
    }
  }
};
goog.async.Deferred.STRICT_ERRORS = goog.define("goog.async.Deferred.STRICT_ERRORS", false);
goog.async.Deferred.LONG_STACK_TRACES = goog.define("goog.async.Deferred.LONG_STACK_TRACES", false);
goog.async.Deferred.prototype.cancel = function(opt_deepCancel) {
  if (!this.hasFired()) {
    if (this.parent_) {
      const parent = this.parent_;
      delete this.parent_;
      if (opt_deepCancel) {
        parent.cancel(opt_deepCancel);
      } else {
        parent.branchCancel_();
      }
    }
    if (this.onCancelFunction_) {
      this.onCancelFunction_.call(this.defaultScope_, this);
    } else {
      this.silentlyCanceled_ = true;
    }
    if (!this.hasFired()) {
      this.errback(new goog.async.Deferred.CanceledError(this));
    }
  } else if (this.result_ instanceof goog.async.Deferred) {
    this.result_.cancel();
  }
};
goog.async.Deferred.prototype.branchCancel_ = function() {
  this.branches_--;
  if (this.branches_ <= 0) {
    this.cancel();
  }
};
goog.async.Deferred.prototype.continue_ = function(isSuccess, res) {
  this.blocked_ = false;
  this.updateResult_(isSuccess, res);
};
goog.async.Deferred.prototype.updateResult_ = function(isSuccess, res) {
  this.fired_ = true;
  this.result_ = res;
  this.hadError_ = !isSuccess;
  this.fire_();
};
goog.async.Deferred.prototype.check_ = function() {
  if (this.hasFired()) {
    if (!this.silentlyCanceled_) {
      throw new goog.async.Deferred.AlreadyCalledError(this);
    }
    this.silentlyCanceled_ = false;
  }
};
goog.async.Deferred.prototype.callback = function(opt_result) {
  this.check_();
  this.assertNotDeferred_(opt_result);
  this.updateResult_(true, opt_result);
};
goog.async.Deferred.prototype.errback = function(opt_result) {
  this.check_();
  this.assertNotDeferred_(opt_result);
  this.makeStackTraceLong_(opt_result);
  this.updateResult_(false, opt_result);
};
goog.async.Deferred.unhandledErrorHandler_ = e => {
  throw e;
};
goog.async.Deferred.setUnhandledErrorHandler = function(handler) {
  goog.async.Deferred.unhandledErrorHandler_ = handler;
};
goog.async.Deferred.prototype.makeStackTraceLong_ = function(error) {
  if (!goog.async.Deferred.LONG_STACK_TRACES) {
    return;
  }
  if (this.constructorStack_ && goog.isObject(error) && error.stack && /^[^\n]+(\n   [^\n]+)+/.test(error.stack)) {
    error.stack = error.stack + "\nDEFERRED OPERATION:\n" + this.constructorStack_;
  }
};
goog.async.Deferred.prototype.assertNotDeferred_ = function(obj) {
  goog.asserts.assert(!(obj instanceof goog.async.Deferred), "An execution sequence may not be initiated with a blocking Deferred.");
};
goog.async.Deferred.prototype.addCallback = function(cb, opt_scope) {
  return this.addCallbacks(cb, null, opt_scope);
};
goog.async.Deferred.prototype.addErrback = function(eb, opt_scope) {
  return this.addCallbacks(null, eb, opt_scope);
};
goog.async.Deferred.prototype.addBoth = function(f, opt_scope) {
  return this.addCallbacks(f, f, opt_scope);
};
goog.async.Deferred.prototype.addFinally = function(f, opt_scope) {
  return this.addCallbacks(f, function(err) {
    const result = f.call(this, err);
    if (result === undefined) {
      throw err;
    }
    return result;
  }, opt_scope);
};
goog.async.Deferred.prototype.addCallbacks = function(cb, eb, opt_scope) {
  goog.asserts.assert(!this.blocking_, "Blocking Deferreds can not be re-used");
  this.sequence_.push([cb, eb, opt_scope]);
  if (this.hasFired()) {
    this.fire_();
  }
  return this;
};
goog.async.Deferred.prototype.then = function(opt_onFulfilled, opt_onRejected, opt_context) {
  let reject;
  let resolve;
  const promise = new goog.Promise(function(res, rej) {
    resolve = res;
    reject = rej;
  });
  this.addCallbacks(resolve, function(reason) {
    if (reason instanceof goog.async.Deferred.CanceledError) {
      promise.cancel();
    } else {
      reject(reason);
    }
    return goog.async.Deferred.CONVERTED_TO_PROMISE_;
  }, this);
  return promise.then(opt_onFulfilled, opt_onRejected, opt_context);
};
goog.Thenable.addImplementation(goog.async.Deferred);
goog.async.Deferred.prototype.chainDeferred = function(otherDeferred) {
  this.addCallbacks(otherDeferred.callback, otherDeferred.errback, otherDeferred);
  return this;
};
goog.async.Deferred.prototype.awaitDeferred = function(otherDeferred) {
  if (!(otherDeferred instanceof goog.async.Deferred)) {
    return this.addCallback(function() {
      return otherDeferred;
    });
  }
  return this.addCallback(goog.bind(otherDeferred.branch, otherDeferred));
};
goog.async.Deferred.prototype.branch = function(opt_propagateCancel) {
  const d = new goog.async.Deferred();
  this.chainDeferred(d);
  if (opt_propagateCancel) {
    d.parent_ = this;
    this.branches_++;
  }
  return d;
};
goog.async.Deferred.prototype.hasFired = function() {
  return this.fired_;
};
goog.async.Deferred.prototype.isError = function(res) {
  return res instanceof Error;
};
goog.async.Deferred.prototype.hasErrback_ = function() {
  return goog.array.some(this.sequence_, function(sequenceRow) {
    return typeof sequenceRow[1] === "function";
  });
};
goog.async.Deferred.prototype.getLastValueForMigration = function() {
  return this.hasFired() && !this.hadError_ ? this.result_ : undefined;
};
goog.async.Deferred.CONVERTED_TO_PROMISE_ = {};
goog.async.Deferred.prototype.fire_ = function() {
  if (this.unhandledErrorId_ && this.hasFired() && this.hasErrback_()) {
    goog.async.Deferred.unscheduleError_(this.unhandledErrorId_);
    this.unhandledErrorId_ = 0;
  }
  if (this.parent_) {
    this.parent_.branches_--;
    delete this.parent_;
  }
  let res = this.result_;
  let unhandledException = false;
  let isNewlyBlocked = false;
  let wasConvertedToPromise = false;
  while (this.sequence_.length && !this.blocked_) {
    wasConvertedToPromise = false;
    const sequenceEntry = this.sequence_.shift();
    const callback = sequenceEntry[0];
    const errback = sequenceEntry[1];
    const scope = sequenceEntry[2];
    const f = this.hadError_ ? errback : callback;
    if (f) {
      try {
        let ret = f.call(scope || this.defaultScope_, res);
        if (ret === goog.async.Deferred.CONVERTED_TO_PROMISE_) {
          wasConvertedToPromise = true;
          ret = undefined;
        }
        if (ret !== undefined) {
          this.hadError_ = this.hadError_ && (ret == res || this.isError(ret));
          this.result_ = res = ret;
        }
        if (goog.Thenable.isImplementedBy(res) || typeof goog.global["Promise"] === "function" && res instanceof goog.global["Promise"]) {
          isNewlyBlocked = true;
          this.blocked_ = true;
        }
      } catch (ex) {
        res = ex;
        this.hadError_ = true;
        this.makeStackTraceLong_(res);
        if (!this.hasErrback_()) {
          unhandledException = true;
        }
      }
    }
  }
  this.result_ = res;
  if (isNewlyBlocked) {
    const onCallback = goog.bind(this.continue_, this, true);
    const onErrback = goog.bind(this.continue_, this, false);
    if (res instanceof goog.async.Deferred) {
      res.addCallbacks(onCallback, onErrback);
      res.blocking_ = true;
    } else {
      res.then(onCallback, onErrback);
    }
  } else if (goog.async.Deferred.STRICT_ERRORS && !wasConvertedToPromise && this.isError(res) && !(res instanceof goog.async.Deferred.CanceledError)) {
    this.hadError_ = true;
    unhandledException = true;
  }
  if (unhandledException) {
    this.unhandledErrorId_ = goog.async.Deferred.scheduleError_(res);
  }
};
goog.async.Deferred.succeed = function(opt_result) {
  const d = new goog.async.Deferred();
  d.callback(opt_result);
  return d;
};
goog.async.Deferred.fromPromise = function(promise) {
  const d = new goog.async.Deferred();
  promise.then(function(value) {
    d.callback(value);
  }, function(error) {
    d.errback(error);
  });
  return d;
};
goog.async.Deferred.fail = function(res) {
  const d = new goog.async.Deferred();
  d.errback(res);
  return d;
};
goog.async.Deferred.canceled = function() {
  const d = new goog.async.Deferred();
  d.cancel();
  return d;
};
goog.async.Deferred.when = function(value, callback, opt_scope) {
  if (value instanceof goog.async.Deferred) {
    return value.branch(true).addCallback(callback, opt_scope);
  } else {
    return goog.async.Deferred.succeed(value).addCallback(callback, opt_scope);
  }
};
goog.async.Deferred.AlreadyCalledError = function(deferred) {
  goog.debug.Error.call(this);
  this.deferred = deferred;
};
goog.inherits(goog.async.Deferred.AlreadyCalledError, goog.debug.Error);
goog.async.Deferred.AlreadyCalledError.prototype.message = "Deferred has already fired";
goog.async.Deferred.AlreadyCalledError.prototype.name = "AlreadyCalledError";
goog.async.Deferred.CanceledError = function(deferred) {
  goog.debug.Error.call(this);
  this.deferred = deferred;
};
goog.inherits(goog.async.Deferred.CanceledError, goog.debug.Error);
goog.async.Deferred.CanceledError.prototype.message = "Deferred was canceled";
goog.async.Deferred.CanceledError.prototype.name = "CanceledError";
goog.async.Deferred.Error_ = function(error) {
  this.id_ = goog.global.setTimeout(goog.bind(this.throwError, this), 0);
  this.error_ = error;
};
goog.async.Deferred.Error_.prototype.throwError = function() {
  goog.asserts.assert(goog.async.Deferred.errorMap_[this.id_], "Cannot throw an error that is not scheduled.");
  delete goog.async.Deferred.errorMap_[this.id_];
  goog.async.Deferred.unhandledErrorHandler_(this.error_);
};
goog.async.Deferred.Error_.prototype.resetTimer = function() {
  goog.global.clearTimeout(this.id_);
};
goog.async.Deferred.errorMap_ = {};
goog.async.Deferred.scheduleError_ = function(error) {
  const deferredError = new goog.async.Deferred.Error_(error);
  goog.async.Deferred.errorMap_[deferredError.id_] = deferredError;
  return deferredError.id_;
};
goog.async.Deferred.unscheduleError_ = function(id) {
  const error = goog.async.Deferred.errorMap_[id];
  if (error) {
    error.resetTimer();
    delete goog.async.Deferred.errorMap_[id];
  }
};
goog.async.Deferred.assertNoErrors = function() {
  const map = goog.async.Deferred.errorMap_;
  for (let key in map) {
    const error = map[key];
    error.resetTimer();
    error.throwError();
  }
};

$CLJS.SHADOW_ENV.setLoaded("goog.mochikit.async.deferred.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.module.AbstractModuleLoader");
  goog.module.declareLegacyNamespace();
  const ModuleInfo = goog.requireType("goog.module.ModuleInfo");
  class AbstractModuleLoader {
    constructor() {
      this.supportsExtraEdges;
    }
    loadModules(ids, moduleInfoMap, loadOptions) {
    }
    prefetchModule(id, moduleInfo) {
    }
  }
  AbstractModuleLoader.ExtraEdgesMap;
  AbstractModuleLoader.LoadOptions = class {
    constructor() {
      this.extraEdges;
      this.forceReload;
      this.onError;
      this.onSuccess;
      this.onTimeout;
    }
  };
  exports = AbstractModuleLoader;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.module.abstractmoduleloader.js");

goog.provide("goog.module");
goog.module = goog.module || {};

$CLJS.SHADOW_ENV.setLoaded("goog.module.module.js");

goog.provide("goog.module.BaseModule");
goog.require("goog.Disposable");
goog.require("goog.module");
goog.module.BaseModule = function() {
  goog.Disposable.call(this);
};
goog.inherits(goog.module.BaseModule, goog.Disposable);
goog.module.BaseModule.prototype.initialize = function(context) {
};

$CLJS.SHADOW_ENV.setLoaded("goog.module.basemodule.js");

goog.provide("goog.module.ModuleLoadCallback");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.module");
goog.module.ModuleLoadCallback = function(fn, opt_handler) {
  this.fn_ = fn;
  this.handler_ = opt_handler;
};
goog.module.ModuleLoadCallback.prototype.execute = function(context) {
  if (this.fn_) {
    this.fn_.call(this.handler_ || null, context);
    this.handler_ = null;
    this.fn_ = null;
  }
};
goog.module.ModuleLoadCallback.prototype.abort = function() {
  this.fn_ = null;
  this.handler_ = null;
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.module.ModuleLoadCallback.prototype.execute = transformer(goog.module.ModuleLoadCallback.prototype.execute);
});

$CLJS.SHADOW_ENV.setLoaded("goog.module.moduleloadcallback.js");

goog.provide("goog.module.ModuleInfo");
goog.require("goog.Disposable");
goog.require("goog.async.throwException");
goog.require("goog.dispose");
goog.require("goog.functions");
goog.require("goog.html.TrustedResourceUrl");
goog.require("goog.module");
goog.require("goog.module.BaseModule");
goog.require("goog.module.ModuleLoadCallback");
goog.requireType("goog.module.ModuleLoadFailure");
goog.module.ModuleInfo = function(deps, id) {
  goog.Disposable.call(this);
  this.deps_ = deps;
  this.id_ = id;
  this.onloadCallbacks_ = [];
  this.onErrorCallbacks_ = [];
  this.earlyOnloadCallbacks_ = [];
};
goog.inherits(goog.module.ModuleInfo, goog.Disposable);
goog.module.ModuleInfo.prototype.uris_ = null;
goog.module.ModuleInfo.prototype.moduleConstructor_ = goog.module.BaseModule;
goog.module.ModuleInfo.prototype.module_ = null;
goog.module.ModuleInfo.prototype.getDependencies = function() {
  return this.deps_;
};
goog.module.ModuleInfo.prototype.getId = function() {
  return this.id_;
};
goog.module.ModuleInfo.prototype.setTrustedUris = function(uris) {
  this.uris_ = uris;
};
goog.module.ModuleInfo.prototype.getUris = function() {
  if (!this.uris_) {
    this.uris_ = [];
  }
  return this.uris_;
};
goog.module.ModuleInfo.prototype.setModuleConstructor = function(constructor) {
  if (this.moduleConstructor_ === goog.module.BaseModule) {
    this.moduleConstructor_ = constructor;
  } else {
    throw new Error("Cannot set module constructor more than once.");
  }
};
goog.module.ModuleInfo.prototype.registerEarlyCallback = function(fn, opt_handler) {
  return this.registerCallback_(this.earlyOnloadCallbacks_, fn, opt_handler);
};
goog.module.ModuleInfo.prototype.registerCallback = function(fn, opt_handler) {
  return this.registerCallback_(this.onloadCallbacks_, fn, opt_handler);
};
goog.module.ModuleInfo.prototype.registerErrback = function(fn, opt_handler) {
  return this.registerCallback_(this.onErrorCallbacks_, fn, opt_handler);
};
goog.module.ModuleInfo.prototype.registerCallback_ = function(callbacks, fn, opt_handler) {
  var callback = new goog.module.ModuleLoadCallback(fn, opt_handler);
  callbacks.push(callback);
  return callback;
};
goog.module.ModuleInfo.prototype.isLoaded = function() {
  return !!this.module_;
};
goog.module.ModuleInfo.prototype.setLoaded = function() {
  this.module_ = new goog.module.BaseModule();
};
goog.module.ModuleInfo.prototype.getModule = function() {
  return this.module_;
};
goog.module.ModuleInfo.prototype.onLoad = function(contextProvider) {
  var module = new this.moduleConstructor_();
  module.initialize(contextProvider());
  this.module_ = module;
  var errors = !!this.callCallbacks_(this.earlyOnloadCallbacks_, contextProvider());
  errors = errors || !!this.callCallbacks_(this.onloadCallbacks_, contextProvider());
  if (!errors) {
    this.onErrorCallbacks_.length = 0;
  }
  return errors;
};
goog.module.ModuleInfo.prototype.onError = function(cause) {
  var result = this.callCallbacks_(this.onErrorCallbacks_, cause);
  if (result) {
    goog.global.setTimeout(goog.functions.error("Module errback failures: " + result), 0);
  }
  this.earlyOnloadCallbacks_.length = 0;
  this.onloadCallbacks_.length = 0;
};
goog.module.ModuleInfo.prototype.callCallbacks_ = function(callbacks, context) {
  var errors = [];
  for (var i = 0; i < callbacks.length; i++) {
    try {
      callbacks[i].execute(context);
    } catch (e) {
      goog.async.throwException(e);
      errors.push(e);
    }
  }
  callbacks.length = 0;
  return errors.length ? errors : null;
};
goog.module.ModuleInfo.prototype.disposeInternal = function() {
  goog.module.ModuleInfo.superClass_.disposeInternal.call(this);
  goog.dispose(this.module_);
};

$CLJS.SHADOW_ENV.setLoaded("goog.module.moduleinfo.js");

goog.provide("goog.loader.AbstractModuleManager");
goog.provide("goog.loader.AbstractModuleManager.CallbackType");
goog.require("goog.module.AbstractModuleLoader");
goog.require("goog.module.ModuleInfo");
goog.require("goog.module.ModuleLoadCallback");
goog.requireType("goog.html.TrustedResourceUrl");
goog.requireType("goog.module.BaseModule");
goog.loader.AbstractModuleManager = function() {
  this.moduleContext_ = null;
  this.loader_ = null;
};
goog.loader.AbstractModuleManager.CallbackType = {ERROR:"error", IDLE:"idle", ACTIVE:"active", USER_IDLE:"userIdle", USER_ACTIVE:"userActive"};
goog.loader.AbstractModuleManager.CORRUPT_RESPONSE_STATUS_CODE = 8001;
goog.loader.AbstractModuleManager.prototype.setBatchModeEnabled = function(enabled) {
};
goog.loader.AbstractModuleManager.prototype.setConcurrentLoadingEnabled = function(enabled) {
};
goog.loader.AbstractModuleManager.prototype.setAllModuleInfo = function(infoMap) {
};
goog.loader.AbstractModuleManager.prototype.setAllModuleInfoString = function(opt_info, opt_loadingModuleIds) {
};
goog.loader.AbstractModuleManager.prototype.getModuleInfo = function(id) {
};
goog.loader.AbstractModuleManager.prototype.addExtraEdge = function(fromModule, toModule) {
  throw new Error("addExtraEdge is not implemented.");
};
goog.loader.AbstractModuleManager.prototype.removeExtraEdge = function(fromModule, toModule) {
  throw new Error("removeExtraEdge is not implemented.");
};
goog.loader.AbstractModuleManager.prototype.setModuleTrustedUris = function(moduleUriMap) {
};
goog.loader.AbstractModuleManager.prototype.getLoader = function() {
  return this.loader_;
};
goog.loader.AbstractModuleManager.prototype.setLoader = function(loader) {
  this.loader_ = loader;
};
goog.loader.AbstractModuleManager.prototype.getModuleContext = function() {
  return this.moduleContext_;
};
goog.loader.AbstractModuleManager.prototype.setModuleContext = function(context) {
  this.moduleContext_ = context;
};
goog.loader.AbstractModuleManager.prototype.isActive = function() {
  return false;
};
goog.loader.AbstractModuleManager.prototype.isUserActive = function() {
  return false;
};
goog.loader.AbstractModuleManager.prototype.preloadModule = function(id, opt_timeout) {
};
goog.loader.AbstractModuleManager.prototype.prefetchModule = function(id) {
  throw new Error("prefetchModule is not implemented.");
};
goog.loader.AbstractModuleManager.prototype.setLoaded = function() {
};
goog.loader.AbstractModuleManager.prototype.isModuleLoading = function(id) {
};
goog.loader.AbstractModuleManager.prototype.execOnLoad = function(moduleId, fn, opt_handler, opt_noLoad, opt_userInitiated, opt_preferSynchronous) {
};
goog.loader.AbstractModuleManager.prototype.load = function(moduleId, opt_userInitiated) {
};
goog.loader.AbstractModuleManager.prototype.loadMultiple = function(moduleIds, opt_userInitiated) {
};
goog.loader.AbstractModuleManager.prototype.beforeLoadModuleCode = function(id) {
};
goog.loader.AbstractModuleManager.prototype.registerInitializationCallback = function(fn, opt_handler) {
};
goog.loader.AbstractModuleManager.prototype.registerLateInitializationCallback = function(fn, opt_handler) {
};
goog.loader.AbstractModuleManager.prototype.setModuleConstructor = function(fn) {
};
goog.loader.AbstractModuleManager.prototype.registerCallback = function(types, fn) {
};

$CLJS.SHADOW_ENV.setLoaded("goog.loader.abstractmodulemanager.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.loader.activeModuleManager");
  goog.module.declareLegacyNamespace();
  const AbstractModuleManager = goog.require("goog.loader.AbstractModuleManager");
  const asserts = goog.require("goog.asserts");
  let moduleManager = null;
  let getDefault = null;
  let configureFunctions = [];
  function configure(configureFn) {
    if (moduleManager) {
      configureFn(moduleManager);
    } else {
      configureFunctions.push(configureFn);
    }
  }
  function get() {
    if (!moduleManager && getDefault) {
      set(getDefault());
    }
    asserts.assert(moduleManager != null, "The module manager has not yet been set.");
    return moduleManager;
  }
  function set(newModuleManager) {
    asserts.assert(moduleManager == null, "The module manager cannot be redefined.");
    moduleManager = newModuleManager;
    configureFunctions.forEach(configureFn => {
      configureFn(moduleManager);
    });
    configureFunctions = [];
  }
  function setDefault(fn) {
    getDefault = fn;
  }
  function beforeLoadModuleCode(id) {
    if (moduleManager) {
      moduleManager.beforeLoadModuleCode(id);
    }
  }
  function setLoaded() {
    if (moduleManager) {
      moduleManager.setLoaded();
    }
  }
  function maybeInitialize(info, loadingModuleIds) {
    if (!moduleManager) {
      if (!getDefault) {
        return;
      }
      set(getDefault());
    }
    moduleManager.setAllModuleInfoString(info, loadingModuleIds);
  }
  const reset = function() {
    moduleManager = null;
    configureFunctions = [];
  };
  exports = {get, set, setDefault, beforeLoadModuleCode, setLoaded, maybeInitialize, reset, configure,};
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.loader.activemodulemanager.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.module.ModuleLoadFailure");
  goog.module.declareLegacyNamespace();
  class ModuleLoadFailure {
    constructor(type, status = undefined) {
      this.type = type;
      this.status = status;
    }
    toString() {
      return `${this.getReadableError_()} (${this.status != undefined ? this.status : "?"})`;
    }
    getReadableError_() {
      switch(this.type) {
        case ModuleLoadFailure.Type.UNAUTHORIZED:
          return "Unauthorized";
        case ModuleLoadFailure.Type.CONSECUTIVE_FAILURES:
          return "Consecutive load failures";
        case ModuleLoadFailure.Type.TIMEOUT:
          return "Timed out";
        case ModuleLoadFailure.Type.OLD_CODE_GONE:
          return "Out of date module id";
        case ModuleLoadFailure.Type.INIT_ERROR:
          return "Init error";
        default:
          return `Unknown failure type ${this.type}`;
      }
    }
  }
  const Type = {UNAUTHORIZED:0, CONSECUTIVE_FAILURES:1, TIMEOUT:2, OLD_CODE_GONE:3, INIT_ERROR:4};
  exports = ModuleLoadFailure;
  exports.Type = Type;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.module.moduleloadfailure.js");

goog.provide("goog.module.ModuleManager");
goog.provide("goog.module.ModuleManager.CallbackType");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.async.Deferred");
goog.require("goog.debug.Error");
goog.require("goog.disposable.IDisposable");
goog.require("goog.disposeAll");
goog.require("goog.loader.AbstractModuleManager");
goog.require("goog.loader.activeModuleManager");
goog.require("goog.log");
goog.require("goog.module");
goog.require("goog.module.ModuleInfo");
goog.require("goog.module.ModuleLoadCallback");
goog.require("goog.module.ModuleLoadFailure");
goog.require("goog.object");
goog.requireType("goog.module.AbstractModuleLoader");
goog.scope(() => {
  const SYNTHETIC_MODULE_OVERHEAD_ID = "synthetic_module_overhead";
  goog.module.ModuleManager = function() {
    goog.module.ModuleManager.base(this, "constructor");
    this.moduleInfoMap = {};
    this.loadingModuleIds_ = [];
    this.requestedLoadingModuleIds_ = [];
    this.requestedModuleIds_ = [];
    this.requestedModuleIdsQueue_ = [];
    this.userInitiatedLoadingModuleIds_ = [];
    this.extraEdges_ = {};
    this.callbackMap_ = {};
    this.baseModuleInfo_ = new goog.module.ModuleInfo([], "");
    this.currentlyLoadingModule_ = this.baseModuleInfo_;
    this.lastInitialModuleId_ = null;
    this.initialModulesLoaded_ = new goog.async.Deferred();
    this.logger_ = goog.log.getLogger("goog.module.ModuleManager");
    this.batchModeEnabled_ = false;
    this.concurrentLoadingEnabled_ = false;
    this.consecutiveFailures_ = 0;
    this.lastActive_ = false;
    this.userLastActive_ = false;
    this.isDisposed_ = false;
  };
  goog.inherits(goog.module.ModuleManager, goog.loader.AbstractModuleManager);
  goog.module.ModuleManager.ModuleFailureError = function(moduleID, failureType) {
    const msg = `Error loading ${moduleID}: ${failureType}`;
    goog.module.ModuleManager.ModuleFailureError.base(this, "constructor", msg);
    this.failureType = failureType;
  };
  goog.inherits(goog.module.ModuleManager.ModuleFailureError, goog.debug.Error);
  goog.module.ModuleManager.CallbackType = goog.loader.AbstractModuleManager.CallbackType;
  goog.module.ModuleManager.CORRUPT_RESPONSE_STATUS_CODE = goog.loader.AbstractModuleManager.CORRUPT_RESPONSE_STATUS_CODE;
  goog.module.ModuleManager.getInstance = function() {
    return goog.loader.activeModuleManager.get();
  };
  goog.module.ModuleManager.prototype.setBatchModeEnabled = function(enabled) {
    this.batchModeEnabled_ = enabled;
  };
  goog.module.ModuleManager.prototype.setConcurrentLoadingEnabled = function(enabled) {
    this.concurrentLoadingEnabled_ = enabled;
  };
  goog.module.ModuleManager.prototype.setAllModuleInfo = function(infoMap) {
    for (var id in infoMap) {
      this.addOrUpdateModuleInfo_(id, infoMap[id]);
    }
    if (!this.initialModulesLoaded_.hasFired()) {
      this.initialModulesLoaded_.callback();
    }
    this.maybeFinishBaseLoad_();
  };
  goog.module.ModuleManager.prototype.setAllModuleInfoString = function(opt_info, opt_loadingModuleIds) {
    if (!(this instanceof goog.module.ModuleManager)) {
      this.setAllModuleInfoString(opt_info, opt_loadingModuleIds);
      return;
    }
    if (typeof opt_info !== "string") {
      return;
    }
    var modules = opt_info.split("/");
    var moduleIds = [];
    for (var i = 0; i < modules.length; i++) {
      var parts = modules[i].split(":");
      var id = parts[0];
      var deps;
      if (parts[1]) {
        deps = parts[1].split(",");
        for (var j = 0; j < deps.length; j++) {
          var index = parseInt(deps[j], 36);
          goog.asserts.assert(moduleIds[index], "No module @ %s, dep of %s @ %s", index, id, i);
          deps[j] = moduleIds[index];
        }
      } else {
        deps = [];
      }
      moduleIds.push(id);
      this.addOrUpdateModuleInfo_(id, deps);
    }
    if (opt_loadingModuleIds && opt_loadingModuleIds.length) {
      goog.array.extend(this.loadingModuleIds_, opt_loadingModuleIds);
      this.lastInitialModuleId_ = goog.array.peek(opt_loadingModuleIds);
    } else {
      if (!this.initialModulesLoaded_.hasFired()) {
        this.initialModulesLoaded_.callback();
      }
    }
    this.maybeFinishBaseLoad_();
  };
  goog.module.ModuleManager.SUBTRACTIVE_MODULE_LOADING = goog.define("goog.module.ModuleManager.SUBTRACTIVE_MODULE_LOADING", false);
  goog.module.ModuleManager.prototype.getModuleInfo = function(id) {
    if (goog.module.ModuleManager.SUBTRACTIVE_MODULE_LOADING && !(id in this.moduleInfoMap)) {
      this.moduleInfoMap[id] = new goog.module.ModuleInfo([], id);
    }
    return this.moduleInfoMap[id];
  };
  goog.module.ModuleManager.prototype.addExtraEdge = function(fromModule, toModule) {
    const moduleInfo = this.getModuleInfo(fromModule);
    if (moduleInfo && moduleInfo.isLoaded()) {
      this.load(toModule);
      return;
    }
    if (!this.extraEdges_[fromModule]) {
      this.extraEdges_[fromModule] = {};
    }
    this.extraEdges_[fromModule][toModule] = true;
  };
  goog.module.ModuleManager.prototype.removeExtraEdge = function(fromModule, toModule) {
    if (!this.extraEdges_[fromModule]) {
      return;
    }
    delete this.extraEdges_[fromModule][toModule];
    for (const nonEmptyEdge in this.extraEdges_[fromModule]) {
      return;
    }
    delete this.extraEdges_[fromModule];
  };
  goog.module.ModuleManager.prototype.setModuleTrustedUris = function(moduleUriMap) {
    for (var id in moduleUriMap) {
      this.moduleInfoMap[id].setTrustedUris(moduleUriMap[id]);
    }
  };
  goog.module.ModuleManager.prototype.setModuleContext = function(context) {
    goog.module.ModuleManager.base(this, "setModuleContext", context);
    this.maybeFinishBaseLoad_();
  };
  goog.module.ModuleManager.prototype.isActive = function() {
    return this.loadingModuleIds_.length > 0;
  };
  goog.module.ModuleManager.prototype.isUserActive = function() {
    return this.userInitiatedLoadingModuleIds_.length > 0;
  };
  goog.module.ModuleManager.prototype.dispatchActiveIdleChangeIfNeeded_ = function() {
    var lastActive = this.lastActive_;
    var active = this.isActive();
    if (active != lastActive) {
      this.executeCallbacks_(active ? goog.loader.AbstractModuleManager.CallbackType.ACTIVE : goog.loader.AbstractModuleManager.CallbackType.IDLE);
      this.lastActive_ = active;
    }
    var userLastActive = this.userLastActive_;
    var userActive = this.isUserActive();
    if (userActive != userLastActive) {
      this.executeCallbacks_(userActive ? goog.loader.AbstractModuleManager.CallbackType.USER_ACTIVE : goog.loader.AbstractModuleManager.CallbackType.USER_IDLE);
      this.userLastActive_ = userActive;
    }
  };
  goog.module.ModuleManager.prototype.preloadModule = function(id, opt_timeout) {
    var d = new goog.async.Deferred();
    goog.global.setTimeout(goog.bind(this.addLoadModule_, this, id, d), opt_timeout || 0);
    return d;
  };
  goog.module.ModuleManager.prototype.prefetchModule = function(id) {
    if (this.batchModeEnabled_) {
      throw new Error("Modules prefetching is not supported in batch mode");
    } else {
      var idWithDeps = this.getNotYetLoadedTransitiveDepIds_(id);
      for (var i = 0; i < idWithDeps.length; i++) {
        const moduleInfoOfDep = this.getModuleInfo(idWithDeps[i]);
        this.getLoader().prefetchModule(idWithDeps[i], moduleInfoOfDep);
      }
    }
  };
  goog.module.ModuleManager.prototype.addLoadModule_ = function(id, d) {
    var moduleInfo = this.getModuleInfo(id);
    if (moduleInfo.isLoaded()) {
      d.callback(this.getModuleContext());
      return;
    }
    this.registerModuleLoadCallbacks_(id, moduleInfo, false, d);
    if (!this.isModuleLoading(id)) {
      this.loadModulesOrEnqueue_([id]);
    }
  };
  goog.module.ModuleManager.prototype.addOrUpdateModuleInfo_ = function(id, deps) {
    if (this.moduleInfoMap[id]) {
      const moduleDeps = this.moduleInfoMap[id].getDependencies();
      if (moduleDeps != deps) {
        moduleDeps.splice(0, moduleDeps.length, ...deps);
      }
    } else {
      this.moduleInfoMap[id] = new goog.module.ModuleInfo(deps, id);
    }
  };
  goog.module.ModuleManager.prototype.loadModulesOrEnqueueIfNotLoadedOrLoading_ = function(ids, opt_userInitiated) {
    var uniqueIds = [];
    goog.array.removeDuplicates(ids, uniqueIds);
    var idsToLoad = [];
    var deferredMap = {};
    for (var i = 0; i < uniqueIds.length; i++) {
      var id = uniqueIds[i];
      var moduleInfo = this.getModuleInfo(id);
      if (!moduleInfo) {
        throw new Error("Unknown module: " + id);
      }
      var d = new goog.async.Deferred();
      deferredMap[id] = d;
      if (moduleInfo.isLoaded()) {
        d.callback(this.getModuleContext());
      } else {
        this.registerModuleLoadCallbacks_(id, moduleInfo, !!opt_userInitiated, d);
        if (!this.isModuleLoading(id)) {
          idsToLoad.push(id);
        }
      }
    }
    if (idsToLoad.length > 0) {
      this.loadModulesOrEnqueue_(idsToLoad);
    }
    return deferredMap;
  };
  goog.module.ModuleManager.prototype.registerModuleLoadCallbacks_ = function(id, moduleInfo, userInitiated, d) {
    moduleInfo.registerCallback(d.callback, d);
    moduleInfo.registerErrback(function(err) {
      d.errback(new goog.module.ModuleManager.ModuleFailureError(id, err));
    });
    if (this.isModuleLoading(id)) {
      if (userInitiated) {
        goog.log.fine(this.logger_, "User initiated module already loading: " + id);
        this.addUserInitiatedLoadingModule_(id);
        this.dispatchActiveIdleChangeIfNeeded_();
      }
    } else {
      if (userInitiated) {
        goog.log.fine(this.logger_, "User initiated module load: " + id);
        this.addUserInitiatedLoadingModule_(id);
      } else {
        goog.log.fine(this.logger_, "Initiating module load: " + id);
      }
    }
  };
  goog.module.ModuleManager.prototype.loadModulesOrEnqueue_ = function(ids) {
    if (this.concurrentLoadingEnabled_) {
      this.initialModulesLoaded_.addCallback(goog.bind(this.loadModules_, this, ids));
    } else {
      if (this.loadingModuleIds_.length === 0) {
        this.loadModules_(ids);
      } else {
        this.requestedModuleIdsQueue_.push(ids);
        this.dispatchActiveIdleChangeIfNeeded_();
      }
    }
  };
  goog.module.ModuleManager.prototype.getBackOff_ = function() {
    return Math.pow(this.consecutiveFailures_, 2) * 5000;
  };
  goog.module.ModuleManager.prototype.loadModules_ = function(ids, opt_isRetry, opt_forceReload) {
    if (!opt_isRetry) {
      this.consecutiveFailures_ = 0;
    }
    var idsToLoadImmediately = this.processModulesForLoad_(ids);
    goog.log.fine(this.logger_, "Loading module(s): " + idsToLoadImmediately);
    if (this.concurrentLoadingEnabled_) {
      goog.array.extend(this.loadingModuleIds_, idsToLoadImmediately);
    } else {
      this.loadingModuleIds_ = idsToLoadImmediately;
    }
    if (this.batchModeEnabled_) {
      this.requestedLoadingModuleIds_ = ids;
    } else {
      this.requestedLoadingModuleIds_ = goog.array.clone(idsToLoadImmediately);
    }
    this.dispatchActiveIdleChangeIfNeeded_();
    if (idsToLoadImmediately.length === 0) {
      return;
    }
    this.requestedModuleIds_.push.apply(this.requestedModuleIds_, idsToLoadImmediately);
    if (Object.keys(this.extraEdges_).length > 0 && !this.getLoader().supportsExtraEdges) {
      throw new Error("Extra edges are not supported by the module loader.");
    }
    var loadFn = goog.bind(this.getLoader().loadModules, goog.asserts.assert(this.getLoader()), goog.array.clone(idsToLoadImmediately), goog.asserts.assert(this.moduleInfoMap), {extraEdges:this.extraEdges_, forceReload:!!opt_forceReload, onError:status => this.handleLoadError_(this.requestedLoadingModuleIds_, idsToLoadImmediately, status != null ? status : undefined), onTimeout:goog.bind(this.handleLoadTimeout_, this),});
    var delay = this.getBackOff_();
    if (delay) {
      goog.global.setTimeout(loadFn, delay);
    } else {
      loadFn();
    }
  };
  goog.module.ModuleManager.prototype.processModulesForLoad_ = function(ids) {
    ids = ids.filter(id => {
      let moduleInfo = this.moduleInfoMap[id];
      if (moduleInfo.isLoaded()) {
        goog.global.setTimeout(() => new Error("Module already loaded: " + id), 0);
        return false;
      }
      return true;
    });
    var idsWithDeps = [];
    for (var i = 0; i < ids.length; i++) {
      idsWithDeps = idsWithDeps.concat(this.getNotYetLoadedTransitiveDepIds_(ids[i]));
    }
    goog.array.removeDuplicates(idsWithDeps);
    if (!this.batchModeEnabled_ && idsWithDeps.length > 1) {
      var idToLoad = idsWithDeps.shift();
      goog.log.fine(this.logger_, "Must load " + idToLoad + " module before " + ids);
      var queuedModules = idsWithDeps.map(function(id) {
        return [id];
      });
      this.requestedModuleIdsQueue_ = queuedModules.concat(this.requestedModuleIdsQueue_);
      return [idToLoad];
    } else {
      return idsWithDeps;
    }
  };
  goog.module.ModuleManager.prototype.getNotYetLoadedTransitiveDepIds_ = function(id) {
    var requestedModuleSet = goog.object.createSet(this.requestedModuleIds_);
    var ids = [];
    if (!requestedModuleSet[id]) {
      ids.push(id);
    }
    var depIdLookupList = [id];
    for (var i = 0; i < depIdLookupList.length; i++) {
      var depIds = this.getModuleInfo(depIdLookupList[i]).getDependencies();
      for (var j = depIds.length - 1; j >= 0; j--) {
        var depId = depIds[j];
        if (!this.getModuleInfo(depId).isLoaded() && !requestedModuleSet[depId]) {
          ids.push(depId);
          depIdLookupList.push(depId);
        }
      }
    }
    ids.reverse();
    goog.array.removeDuplicates(ids);
    return ids;
  };
  goog.module.ModuleManager.prototype.maybeFinishBaseLoad_ = function() {
    if (this.currentlyLoadingModule_ == this.baseModuleInfo_) {
      this.currentlyLoadingModule_ = null;
      const error = this.baseModuleInfo_.onLoad(goog.bind(this.getModuleContext, this));
      if (error) {
        this.dispatchModuleLoadFailed_(new goog.module.ModuleLoadFailure(goog.module.ModuleLoadFailure.Type.INIT_ERROR));
      }
      this.dispatchActiveIdleChangeIfNeeded_();
    }
  };
  goog.module.ModuleManager.prototype.setLoaded = function() {
    if (!this.currentlyLoadingModule_) {
      goog.log.error(this.logger_, "setLoaded called while no module is actively loading");
      return;
    }
    const id = this.currentlyLoadingModule_.getId();
    const modulesToLoad = [];
    if (this.extraEdges_[id]) {
      for (const dest of Object.keys(this.extraEdges_[id])) {
        const moduleInfo = this.getModuleInfo(dest);
        if (moduleInfo && !moduleInfo.isLoaded()) {
          this.removeExtraEdge(id, dest);
          modulesToLoad.push(dest);
        }
      }
      this.loadMultiple(modulesToLoad);
    }
    if (this.isDisposed()) {
      goog.log.warning(this.logger_, "Module loaded after module manager was disposed: " + id);
      return;
    }
    goog.log.fine(this.logger_, "Module loaded: " + id);
    const error = this.moduleInfoMap[id].onLoad(goog.bind(this.getModuleContext, this));
    if (error) {
      this.dispatchModuleLoadFailed_(new goog.module.ModuleLoadFailure(goog.module.ModuleLoadFailure.Type.INIT_ERROR));
    }
    goog.array.remove(this.userInitiatedLoadingModuleIds_, id);
    goog.array.remove(this.loadingModuleIds_, id);
    if (this.loadingModuleIds_.length === 0) {
      this.loadNextModules_();
    }
    if (this.lastInitialModuleId_ && id == this.lastInitialModuleId_) {
      if (!this.initialModulesLoaded_.hasFired()) {
        this.initialModulesLoaded_.callback();
      }
    }
    this.dispatchActiveIdleChangeIfNeeded_();
    this.currentlyLoadingModule_ = null;
  };
  goog.module.ModuleManager.prototype.isModuleLoading = function(id) {
    if (goog.array.contains(this.loadingModuleIds_, id)) {
      return true;
    }
    for (var i = 0; i < this.requestedModuleIdsQueue_.length; i++) {
      if (goog.array.contains(this.requestedModuleIdsQueue_[i], id)) {
        return true;
      }
    }
    return false;
  };
  goog.module.ModuleManager.prototype.execOnLoad = function(moduleId, fn, opt_handler, opt_noLoad, opt_userInitiated, opt_preferSynchronous) {
    var moduleInfo = this.moduleInfoMap[moduleId];
    var callbackWrapper;
    if (moduleInfo.isLoaded()) {
      goog.log.fine(this.logger_, moduleId + " module already loaded");
      callbackWrapper = new goog.module.ModuleLoadCallback(fn, opt_handler);
      if (opt_preferSynchronous) {
        callbackWrapper.execute(this.getModuleContext());
      } else {
        goog.global.setTimeout(goog.bind(callbackWrapper.execute, callbackWrapper), 0);
      }
    } else if (this.isModuleLoading(moduleId)) {
      goog.log.fine(this.logger_, moduleId + " module already loading");
      callbackWrapper = moduleInfo.registerCallback(fn, opt_handler);
      if (opt_userInitiated) {
        goog.log.fine(this.logger_, "User initiated module already loading: " + moduleId);
        this.addUserInitiatedLoadingModule_(moduleId);
        this.dispatchActiveIdleChangeIfNeeded_();
      }
    } else {
      goog.log.fine(this.logger_, "Registering callback for module: " + moduleId);
      callbackWrapper = moduleInfo.registerCallback(fn, opt_handler);
      if (!opt_noLoad) {
        if (opt_userInitiated) {
          goog.log.fine(this.logger_, "User initiated module load: " + moduleId);
          this.addUserInitiatedLoadingModule_(moduleId);
        }
        goog.log.fine(this.logger_, "Initiating module load: " + moduleId);
        this.loadModulesOrEnqueue_([moduleId]);
      }
    }
    return callbackWrapper;
  };
  goog.module.ModuleManager.prototype.load = function(moduleId, opt_userInitiated) {
    return this.loadModulesOrEnqueueIfNotLoadedOrLoading_([moduleId], opt_userInitiated)[moduleId];
  };
  goog.module.ModuleManager.prototype.loadMultiple = function(moduleIds, opt_userInitiated) {
    return this.loadModulesOrEnqueueIfNotLoadedOrLoading_(moduleIds, opt_userInitiated);
  };
  goog.module.ModuleManager.prototype.addUserInitiatedLoadingModule_ = function(id) {
    if (!goog.array.contains(this.userInitiatedLoadingModuleIds_, id)) {
      this.userInitiatedLoadingModuleIds_.push(id);
    }
  };
  goog.module.ModuleManager.prototype.beforeLoadModuleCode = function(id) {
    if (this.currentlyLoadingModule_ && this.currentlyLoadingModule_.getId() === SYNTHETIC_MODULE_OVERHEAD_ID) {
      this.setLoaded();
      delete this.moduleInfoMap[SYNTHETIC_MODULE_OVERHEAD_ID];
    } else if (this.currentlyLoadingModule_) {
      goog.log.error(this.logger_, 'beforeLoadModuleCode called with module "' + id + '" while module "' + this.currentlyLoadingModule_.getId() + '" is loading');
    }
    if (this.moduleInfoMap[id]) {
      this.visitDependencies_(this.moduleInfoMap[id].getDependencies() || [], moduleInfo => {
        moduleInfo.setLoaded();
        goog.array.remove(this.loadingModuleIds_, moduleInfo.getId());
      }, moduleInfo => !moduleInfo.isLoaded());
    }
    this.currentlyLoadingModule_ = this.getModuleInfo(id);
  };
  goog.module.ModuleManager.prototype.registerInitializationCallback = function(fn, opt_handler) {
    if (!this.currentlyLoadingModule_) {
      this.moduleInfoMap[SYNTHETIC_MODULE_OVERHEAD_ID] = new goog.module.ModuleInfo([], SYNTHETIC_MODULE_OVERHEAD_ID);
      this.currentlyLoadingModule_ = this.moduleInfoMap[SYNTHETIC_MODULE_OVERHEAD_ID];
      goog.log.fine(this.logger_, "registerInitializationCallback called in synthetic module");
    }
    this.currentlyLoadingModule_.registerEarlyCallback(fn, opt_handler);
  };
  goog.module.ModuleManager.prototype.registerLateInitializationCallback = function(fn, opt_handler) {
    if (!this.currentlyLoadingModule_) {
      this.moduleInfoMap[SYNTHETIC_MODULE_OVERHEAD_ID] = new goog.module.ModuleInfo([], SYNTHETIC_MODULE_OVERHEAD_ID);
      this.currentlyLoadingModule_ = this.moduleInfoMap[SYNTHETIC_MODULE_OVERHEAD_ID];
      goog.log.fine(this.logger_, "registerInitializationCallback called in synthetic module");
    }
    this.currentlyLoadingModule_.registerCallback(fn, opt_handler);
  };
  goog.module.ModuleManager.prototype.setModuleConstructor = function(fn) {
    if (!this.currentlyLoadingModule_) {
      goog.log.error(this.logger_, "No module is currently loading");
      return;
    } else if (this.currentlyLoadingModule_.getId() === SYNTHETIC_MODULE_OVERHEAD_ID) {
      goog.log.error(this.logger_, "Cannot set module constructor for synthetic module");
      return;
    }
    this.currentlyLoadingModule_.setModuleConstructor(fn);
  };
  goog.module.ModuleManager.prototype.handleLoadError_ = function(requestedLoadingModuleIds, requestedModuleIdsWithDeps, status = undefined) {
    this.consecutiveFailures_++;
    this.requestedLoadingModuleIds_ = requestedLoadingModuleIds;
    requestedModuleIdsWithDeps.forEach(goog.partial(goog.array.remove, this.requestedModuleIds_), this);
    if (status == 401) {
      goog.log.info(this.logger_, "Module loading unauthorized");
      this.dispatchModuleLoadFailed_(new goog.module.ModuleLoadFailure(goog.module.ModuleLoadFailure.Type.UNAUTHORIZED, status));
      this.requestedModuleIdsQueue_.length = 0;
    } else if (status == 410) {
      this.requeueBatchOrDispatchFailure_(new goog.module.ModuleLoadFailure(goog.module.ModuleLoadFailure.Type.OLD_CODE_GONE, status));
      this.loadNextModules_();
    } else if (this.consecutiveFailures_ >= 3) {
      goog.log.info(this.logger_, "Aborting after failure to load: " + this.loadingModuleIds_);
      this.requeueBatchOrDispatchFailure_(new goog.module.ModuleLoadFailure(goog.module.ModuleLoadFailure.Type.CONSECUTIVE_FAILURES, status));
      this.loadNextModules_();
    } else {
      goog.log.info(this.logger_, "Retrying after failure to load: " + this.loadingModuleIds_);
      var forceReload = status == goog.loader.AbstractModuleManager.CORRUPT_RESPONSE_STATUS_CODE;
      this.loadModules_(this.requestedLoadingModuleIds_, true, forceReload);
    }
  };
  goog.module.ModuleManager.prototype.handleLoadTimeout_ = function() {
    goog.log.info(this.logger_, "Aborting after timeout: " + this.loadingModuleIds_);
    this.requeueBatchOrDispatchFailure_(new goog.module.ModuleLoadFailure(goog.module.ModuleLoadFailure.Type.TIMEOUT));
    this.loadNextModules_();
  };
  goog.module.ModuleManager.prototype.requeueBatchOrDispatchFailure_ = function(cause) {
    if (this.requestedLoadingModuleIds_.length > 1) {
      var queuedModules = this.requestedLoadingModuleIds_.map(function(id) {
        return [id];
      });
      this.requestedModuleIdsQueue_ = queuedModules.concat(this.requestedModuleIdsQueue_);
    } else {
      this.dispatchModuleLoadFailed_(cause);
    }
  };
  goog.module.ModuleManager.prototype.dispatchModuleLoadFailed_ = function(cause) {
    var failedIds = this.requestedLoadingModuleIds_;
    this.loadingModuleIds_.length = 0;
    var idsToCancel = [];
    for (var i = 0; i < this.requestedModuleIdsQueue_.length; i++) {
      var dependentModules = this.requestedModuleIdsQueue_[i].filter(function(requestedId) {
        var requestedDeps = this.getNotYetLoadedTransitiveDepIds_(requestedId);
        return goog.array.some(failedIds, function(id) {
          return goog.array.contains(requestedDeps, id);
        });
      }, this);
      goog.array.extend(idsToCancel, dependentModules);
    }
    for (var i = 0; i < failedIds.length; i++) {
      goog.array.insert(idsToCancel, failedIds[i]);
    }
    for (var i = 0; i < idsToCancel.length; i++) {
      for (var j = 0; j < this.requestedModuleIdsQueue_.length; j++) {
        goog.array.remove(this.requestedModuleIdsQueue_[j], idsToCancel[i]);
      }
      goog.array.remove(this.userInitiatedLoadingModuleIds_, idsToCancel[i]);
    }
    var errorCallbacks = this.callbackMap_[goog.loader.AbstractModuleManager.CallbackType.ERROR];
    if (errorCallbacks) {
      for (var i = 0; i < errorCallbacks.length; i++) {
        var callback = errorCallbacks[i];
        for (var j = 0; j < idsToCancel.length; j++) {
          callback(goog.loader.AbstractModuleManager.CallbackType.ERROR, idsToCancel[j], cause);
        }
      }
    }
    for (var i = 0; i < failedIds.length; i++) {
      if (this.moduleInfoMap[failedIds[i]]) {
        this.moduleInfoMap[failedIds[i]].onError(cause);
      }
    }
    this.requestedLoadingModuleIds_.length = 0;
    this.dispatchActiveIdleChangeIfNeeded_();
  };
  goog.module.ModuleManager.prototype.loadNextModules_ = function() {
    while (this.requestedModuleIdsQueue_.length) {
      var nextIds = this.requestedModuleIdsQueue_.shift().filter(function(id) {
        return !this.getModuleInfo(id).isLoaded();
      }, this);
      if (nextIds.length > 0) {
        this.loadModules_(nextIds);
        return;
      }
    }
    this.dispatchActiveIdleChangeIfNeeded_();
  };
  goog.module.ModuleManager.prototype.registerCallback = function(types, fn) {
    if (!Array.isArray(types)) {
      types = [types];
    }
    for (var i = 0; i < types.length; i++) {
      this.registerCallback_(types[i], fn);
    }
  };
  goog.module.ModuleManager.prototype.registerCallback_ = function(type, fn) {
    var callbackMap = this.callbackMap_;
    if (!callbackMap[type]) {
      callbackMap[type] = [];
    }
    callbackMap[type].push(fn);
  };
  goog.module.ModuleManager.prototype.executeCallbacks_ = function(type) {
    var callbacks = this.callbackMap_[type];
    for (var i = 0; callbacks && i < callbacks.length; i++) {
      callbacks[i](type);
    }
  };
  goog.module.ModuleManager.prototype.visitDependencies_ = function(ids, visitorFn, visitConditionFn = () => true, visited = {}) {
    for (const id of ids) {
      const moduleInfo = this.getModuleInfo(id);
      if (visited[id] || !visitConditionFn(moduleInfo)) {
        continue;
      }
      visited[id] = true;
      this.visitDependencies_(moduleInfo.getDependencies() || [], visitorFn, visitConditionFn, visited);
      visitorFn(moduleInfo);
    }
  };
  goog.module.ModuleManager.prototype.dispose = function() {
    goog.disposeAll(goog.object.getValues(this.moduleInfoMap), this.baseModuleInfo_);
    this.moduleInfoMap = {};
    this.loadingModuleIds_ = [];
    this.requestedLoadingModuleIds_ = [];
    this.userInitiatedLoadingModuleIds_ = [];
    this.requestedModuleIdsQueue_ = [];
    this.callbackMap_ = {};
    this.isDisposed_ = true;
  };
  goog.module.ModuleManager.prototype.isDisposed = function() {
    return this.isDisposed_;
  };
  goog.loader.activeModuleManager.setDefault(function() {
    return new goog.module.ModuleManager();
  });
});

$CLJS.SHADOW_ENV.setLoaded("goog.module.modulemanager.js");

goog.provide("goog.net.BulkLoaderHelper");
goog.require("goog.Disposable");
goog.requireType("goog.Uri");
goog.net.BulkLoaderHelper = function(uris) {
  goog.Disposable.call(this);
  this.uris_ = uris;
  this.responseTexts_ = [];
};
goog.inherits(goog.net.BulkLoaderHelper, goog.Disposable);
goog.net.BulkLoaderHelper.prototype.getUri = function(id) {
  return this.uris_[id];
};
goog.net.BulkLoaderHelper.prototype.getUris = function() {
  return this.uris_;
};
goog.net.BulkLoaderHelper.prototype.getResponseTexts = function() {
  return this.responseTexts_;
};
goog.net.BulkLoaderHelper.prototype.setResponseText = function(id, responseText) {
  this.responseTexts_[id] = responseText;
};
goog.net.BulkLoaderHelper.prototype.isLoadComplete = function() {
  const responseTexts = this.responseTexts_;
  if (responseTexts.length == this.uris_.length) {
    for (let i = 0; i < responseTexts.length; i++) {
      if (responseTexts[i] == null) {
        return false;
      }
    }
    return true;
  }
  return false;
};
goog.net.BulkLoaderHelper.prototype.disposeInternal = function() {
  goog.net.BulkLoaderHelper.superClass_.disposeInternal.call(this);
  this.uris_ = null;
  this.responseTexts_ = null;
};

$CLJS.SHADOW_ENV.setLoaded("goog.net.bulkloaderhelper.js");

goog.provide("goog.net.BulkLoader");
goog.require("goog.events.Event");
goog.require("goog.events.EventHandler");
goog.require("goog.events.EventTarget");
goog.require("goog.log");
goog.require("goog.net.BulkLoaderHelper");
goog.require("goog.net.EventType");
goog.require("goog.net.XhrIo");
goog.requireType("goog.Uri");
goog.net.BulkLoader = function(uris) {
  goog.events.EventTarget.call(this);
  this.helper_ = new goog.net.BulkLoaderHelper(uris);
  this.eventHandler_ = new goog.events.EventHandler(this);
};
goog.inherits(goog.net.BulkLoader, goog.events.EventTarget);
goog.net.BulkLoader.prototype.logger_ = goog.log.getLogger("goog.net.BulkLoader");
goog.net.BulkLoader.prototype.getResponseTexts = function() {
  return this.helper_.getResponseTexts();
};
goog.net.BulkLoader.prototype.getRequestUris = function() {
  return this.helper_.getUris();
};
goog.net.BulkLoader.prototype.load = function() {
  const eventHandler = this.eventHandler_;
  const uris = this.helper_.getUris();
  goog.log.info(this.logger_, "Starting load of code with " + uris.length + " uris.");
  for (let i = 0; i < uris.length; i++) {
    const xhrIo = new goog.net.XhrIo();
    eventHandler.listen(xhrIo, goog.net.EventType.COMPLETE, goog.bind(this.handleEvent_, this, i));
    xhrIo.send(uris[i]);
  }
};
goog.net.BulkLoader.prototype.handleEvent_ = function(id, e) {
  goog.log.info(this.logger_, 'Received event "' + e.type + '" for id ' + id + " with uri " + this.helper_.getUri(id));
  const xhrIo = e.target;
  if (xhrIo.isSuccess()) {
    this.handleSuccess_(id, xhrIo);
  } else {
    this.handleError_(id, xhrIo);
  }
};
goog.net.BulkLoader.prototype.handleSuccess_ = function(id, xhrIo) {
  this.helper_.setResponseText(id, xhrIo.getResponseText());
  if (this.helper_.isLoadComplete()) {
    this.finishLoad_();
  }
  xhrIo.dispose();
};
goog.net.BulkLoader.prototype.handleError_ = function(id, xhrIo) {
  this.dispatchEvent(new goog.net.BulkLoader.LoadErrorEvent(xhrIo.getStatus()));
  xhrIo.dispose();
};
goog.net.BulkLoader.prototype.finishLoad_ = function() {
  goog.log.info(this.logger_, "All uris loaded.");
  this.dispatchEvent(goog.net.EventType.SUCCESS);
};
goog.net.BulkLoader.prototype.disposeInternal = function() {
  goog.net.BulkLoader.superClass_.disposeInternal.call(this);
  this.eventHandler_.dispose();
  this.eventHandler_ = null;
  this.helper_.dispose();
  this.helper_ = null;
};
goog.net.BulkLoader.LoadErrorEvent = function(status) {
  goog.net.BulkLoader.LoadErrorEvent.base(this, "constructor", goog.net.EventType.ERROR);
  this.status = status;
};
goog.inherits(goog.net.BulkLoader.LoadErrorEvent, goog.events.Event);

$CLJS.SHADOW_ENV.setLoaded("goog.net.bulkloader.js");

goog.provide("goog.net.jsloader");
goog.provide("goog.net.jsloader.Error");
goog.provide("goog.net.jsloader.ErrorCode");
goog.provide("goog.net.jsloader.Options");
goog.require("goog.array");
goog.require("goog.async.Deferred");
goog.require("goog.debug.Error");
goog.require("goog.dom");
goog.require("goog.dom.DomHelper");
goog.require("goog.dom.TagName");
goog.require("goog.dom.safe");
goog.require("goog.html.TrustedResourceUrl");
goog.require("goog.object");
goog.net.jsloader.GLOBAL_VERIFY_OBJS_ = "closure_verification";
goog.net.jsloader.DEFAULT_TIMEOUT = 5000;
goog.net.jsloader.Options;
goog.net.jsloader.scriptsToLoad_ = [];
goog.net.jsloader.scriptLoadingDeferred_;
goog.net.jsloader.safeLoadMany = function(trustedUris, opt_options) {
  if (!trustedUris.length) {
    return goog.async.Deferred.succeed(null);
  }
  const isAnotherModuleLoading = goog.net.jsloader.scriptsToLoad_.length;
  goog.array.extend(goog.net.jsloader.scriptsToLoad_, trustedUris);
  if (isAnotherModuleLoading) {
    return goog.net.jsloader.scriptLoadingDeferred_;
  }
  trustedUris = goog.net.jsloader.scriptsToLoad_;
  const popAndLoadNextScript = function() {
    const trustedUri = trustedUris.shift();
    const deferred = goog.net.jsloader.safeLoad(trustedUri, opt_options);
    if (trustedUris.length) {
      deferred.addBoth(popAndLoadNextScript);
    }
    return deferred;
  };
  goog.net.jsloader.scriptLoadingDeferred_ = popAndLoadNextScript();
  return goog.net.jsloader.scriptLoadingDeferred_;
};
goog.net.jsloader.safeLoad = function(trustedUri, opt_options) {
  const options = opt_options || {};
  const doc = options.document || document;
  const uri = goog.html.TrustedResourceUrl.unwrap(trustedUri);
  const script = (new goog.dom.DomHelper(doc)).createElement(goog.dom.TagName.SCRIPT);
  const request = {script_:script, timeout_:undefined};
  const deferred = new goog.async.Deferred(goog.net.jsloader.cancel_, request);
  let timeout = null;
  const timeoutDuration = options.timeout != null ? options.timeout : goog.net.jsloader.DEFAULT_TIMEOUT;
  if (timeoutDuration > 0) {
    timeout = window.setTimeout(function() {
      goog.net.jsloader.cleanup_(script, true);
      deferred.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.TIMEOUT, "Timeout reached for loading script " + uri));
    }, timeoutDuration);
    request.timeout_ = timeout;
  }
  script.onload = script.onreadystatechange = function() {
    if (!script.readyState || script.readyState == "loaded" || script.readyState == "complete") {
      const removeScriptNode = options.cleanupWhenDone || false;
      goog.net.jsloader.cleanup_(script, removeScriptNode, timeout);
      deferred.callback(null);
    }
  };
  script.onerror = function() {
    goog.net.jsloader.cleanup_(script, true, timeout);
    deferred.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.LOAD_ERROR, "Error while loading script " + uri));
  };
  const properties = options.attributes || {};
  goog.object.extend(properties, {"type":"text/javascript", "charset":"UTF-8"});
  goog.dom.setProperties(script, properties);
  goog.dom.safe.setScriptSrc(script, trustedUri);
  const scriptParent = goog.net.jsloader.getScriptParentElement_(doc);
  scriptParent.appendChild(script);
  return deferred;
};
goog.net.jsloader.safeLoadAndVerify = function(trustedUri, verificationObjName, options) {
  if (!goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_]) {
    goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] = {};
  }
  const verifyObjs = goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_];
  const uri = goog.html.TrustedResourceUrl.unwrap(trustedUri);
  if (verifyObjs[verificationObjName] !== undefined) {
    return goog.async.Deferred.fail(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_OBJECT_ALREADY_EXISTS, "Verification object " + verificationObjName + " already defined."));
  }
  const sendDeferred = goog.net.jsloader.safeLoad(trustedUri, options);
  const deferred = new goog.async.Deferred(goog.bind(sendDeferred.cancel, sendDeferred));
  sendDeferred.addCallback(function() {
    const result = verifyObjs[verificationObjName];
    if (result !== undefined) {
      deferred.callback(result);
      delete verifyObjs[verificationObjName];
    } else {
      deferred.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_ERROR, "Script " + uri + " loaded, but verification object " + verificationObjName + " was not defined."));
    }
  });
  sendDeferred.addErrback(function(error) {
    if (verifyObjs[verificationObjName] !== undefined) {
      delete verifyObjs[verificationObjName];
    }
    deferred.errback(error);
  });
  return deferred;
};
goog.net.jsloader.getScriptParentElement_ = function(doc) {
  const headElements = goog.dom.getElementsByTagName(goog.dom.TagName.HEAD, doc);
  if (!headElements || headElements.length === 0) {
    return doc.documentElement;
  } else {
    return headElements[0];
  }
};
goog.net.jsloader.cancel_ = function() {
  const request = this;
  if (request && request.script_) {
    const scriptNode = request.script_;
    if (scriptNode && scriptNode.tagName == goog.dom.TagName.SCRIPT) {
      goog.net.jsloader.cleanup_(scriptNode, true, request.timeout_);
    }
  }
};
goog.net.jsloader.cleanup_ = function(scriptNode, removeScriptNode, opt_timeout) {
  if (opt_timeout != null) {
    goog.global.clearTimeout(opt_timeout);
  }
  scriptNode.onload = () => {
  };
  scriptNode.onerror = () => {
  };
  scriptNode.onreadystatechange = () => {
  };
  if (removeScriptNode) {
    window.setTimeout(function() {
      goog.dom.removeNode(scriptNode);
    }, 0);
  }
};
goog.net.jsloader.ErrorCode = {LOAD_ERROR:0, TIMEOUT:1, VERIFY_ERROR:2, VERIFY_OBJECT_ALREADY_EXISTS:3,};
goog.net.jsloader.Error = function(code, opt_message) {
  let msg = "Jsloader error (code #" + code + ")";
  if (opt_message) {
    msg += ": " + opt_message;
  }
  goog.net.jsloader.Error.base(this, "constructor", msg);
  this.code = code;
};
goog.inherits(goog.net.jsloader.Error, goog.debug.Error);

$CLJS.SHADOW_ENV.setLoaded("goog.net.jsloader.js");

goog.provide("goog.html.legacyconversions");
goog.require("goog.html.SafeHtml");
goog.require("goog.html.SafeScript");
goog.require("goog.html.SafeStyle");
goog.require("goog.html.SafeStyleSheet");
goog.require("goog.html.SafeUrl");
goog.require("goog.html.TrustedResourceUrl");
goog.html.legacyconversions.safeHtmlFromString = function(html) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(html);
};
goog.html.legacyconversions.safeScriptFromString = function(script) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(script);
};
goog.html.legacyconversions.safeStyleFromString = function(style) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(style);
};
goog.html.legacyconversions.safeStyleSheetFromString = function(styleSheet) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheet);
};
goog.html.legacyconversions.safeUrlFromString = function(url) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.legacyconversions.trustedResourceUrlFromString = function(url) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(url);
};
goog.html.legacyconversions.reportCallback_ = function() {
};
goog.html.legacyconversions.setReportCallback = function(callback) {
  goog.html.legacyconversions.reportCallback_ = callback;
};

$CLJS.SHADOW_ENV.setLoaded("goog.html.legacyconversions.js");

goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.module.ModuleLoader");
  const AbstractModuleLoader = goog.require("goog.module.AbstractModuleLoader");
  const BulkLoader = goog.require("goog.net.BulkLoader");
  const EventHandler = goog.require("goog.events.EventHandler");
  const EventId = goog.require("goog.events.EventId");
  const EventTarget = goog.require("goog.events.EventTarget");
  const EventType = goog.require("goog.net.EventType");
  const GoogEvent = goog.require("goog.events.Event");
  const ModuleInfo = goog.requireType("goog.module.ModuleInfo");
  const SafeScript = goog.require("goog.html.SafeScript");
  const TagName = goog.require("goog.dom.TagName");
  const Timer = goog.require("goog.Timer");
  const TrustedResourceUrl = goog.require("goog.html.TrustedResourceUrl");
  const asserts = goog.require("goog.asserts");
  const browser = goog.require("goog.labs.userAgent.browser");
  const dom = goog.require("goog.dom");
  const events = goog.require("goog.events");
  const functions = goog.require("goog.functions");
  const googArray = goog.require("goog.array");
  const jsloader = goog.require("goog.net.jsloader");
  const legacyconversions = goog.require("goog.html.legacyconversions");
  const log = goog.require("goog.log");
  const product = goog.require("goog.userAgent.product");
  const safe = goog.require("goog.dom.safe");
  const userAgent = goog.require("goog.userAgent");
  function ModuleLoader() {
    ModuleLoader.base(this, "constructor");
    this.eventHandler_ = new EventHandler(this);
    this.registerDisposable(this.eventHandler_);
    this.loadingModulesStatus_ = {};
  }
  goog.inherits(ModuleLoader, EventTarget);
  ModuleLoader.prototype.logger = log.getLogger("goog.module.ModuleLoader");
  ModuleLoader.prototype.debugMode_ = false;
  ModuleLoader.prototype.sourceUrlInjection_ = false;
  ModuleLoader.prototype.useScriptTags_ = false;
  ModuleLoader.supportsSourceUrlStackTraces = function() {
    return product.CHROME || browser.isFirefox() && browser.isVersionOrHigher("36");
  };
  ModuleLoader.supportsSourceUrlDebugger = function() {
    return product.CHROME || userAgent.GECKO;
  };
  ModuleLoader.URL_MAX_LENGTH_ = 4043;
  ModuleLoader.SYNTAX_OR_NETWORK_ERROR_CODE_ = -1;
  ModuleLoader.createScriptElement_ = function(url) {
    const script = dom.createElement(TagName.SCRIPT);
    safe.setScriptSrc(script, url);
    script.async = false;
    return script;
  };
  ModuleLoader.createPreloadScriptElement_ = function(url) {
    const link = dom.createElement(TagName.LINK);
    safe.setLinkHrefAndRel(link, url, "preload");
    link.as = "script";
    const nonce = safe.getScriptNonce();
    if (nonce) {
      link.setAttribute("nonce", nonce);
    }
    return link;
  };
  ModuleLoader.prototype.getDebugMode = function() {
    return this.debugMode_;
  };
  ModuleLoader.prototype.setUseScriptTags = function(useScriptTags) {
    this.useScriptTags_ = useScriptTags;
  };
  ModuleLoader.prototype.getUseScriptTags = function() {
    return this.useScriptTags_;
  };
  ModuleLoader.prototype.setDebugMode = function(debugMode) {
    this.debugMode_ = debugMode;
  };
  ModuleLoader.prototype.setSourceUrlInjection = function(enabled) {
    this.sourceUrlInjection_ = enabled;
  };
  ModuleLoader.prototype.usingSourceUrlInjection_ = function() {
    return this.sourceUrlInjection_ || this.getDebugMode() && ModuleLoader.supportsSourceUrlStackTraces();
  };
  ModuleLoader.prototype.loadModules = function(ids, moduleInfoMap, {forceReload, onError, onSuccess, onTimeout} = {}) {
    const loadStatus = this.loadingModulesStatus_[ids] || ModuleLoader.LoadStatus.createForIds_(ids, moduleInfoMap);
    loadStatus.loadRequested = true;
    if (loadStatus.successFn && onSuccess) {
      loadStatus.successFn = functions.sequence(loadStatus.successFn, onSuccess);
    } else {
      loadStatus.successFn = onSuccess || loadStatus.successFn;
    }
    loadStatus.errorFn = onError || null;
    if (!this.loadingModulesStatus_[ids]) {
      this.loadingModulesStatus_[ids] = loadStatus;
      this.downloadModules_(ids);
    } else if (this.getUseScriptTags()) {
      this.downloadModules_(ids);
    } else if (loadStatus.responseTexts != null) {
      this.evaluateCode_(ids);
    }
  };
  ModuleLoader.prototype.evaluateCode_ = function(moduleIds) {
    this.dispatchEvent(new ModuleLoader.RequestSuccessEvent(moduleIds));
    log.info(this.logger, "evaluateCode ids:" + moduleIds);
    const loadStatus = this.loadingModulesStatus_[moduleIds];
    const uris = loadStatus.requestUris;
    const texts = loadStatus.responseTexts;
    let error = null;
    try {
      if (this.usingSourceUrlInjection_()) {
        for (let i = 0; i < uris.length; i++) {
          const script = legacyconversions.safeScriptFromString(texts[i] + " //# sourceURL\x3d" + uris[i]);
          goog.globalEval(SafeScript.unwrapTrustedScript(script));
        }
      } else {
        const script = legacyconversions.safeScriptFromString(texts.join("\n"));
        goog.globalEval(SafeScript.unwrapTrustedScript(script));
      }
    } catch (e) {
      error = e;
      log.warning(this.logger, "Loaded incomplete code for module(s): " + moduleIds, e);
    }
    this.dispatchEvent(new ModuleLoader.EvaluateCodeEvent(moduleIds));
    if (error) {
      this.handleErrorHelper_(moduleIds, loadStatus.errorFn, null, error);
    } else if (loadStatus.successFn) {
      loadStatus.successFn();
    }
    delete this.loadingModulesStatus_[moduleIds];
  };
  ModuleLoader.prototype.handleSuccess_ = function(bulkLoader, moduleIds) {
    log.info(this.logger, "Code loaded for module(s): " + moduleIds);
    const loadStatus = this.loadingModulesStatus_[moduleIds];
    loadStatus.responseTexts = bulkLoader.getResponseTexts();
    if (loadStatus.loadRequested) {
      this.evaluateCode_(moduleIds);
    }
    Timer.callOnce(bulkLoader.dispose, 5, bulkLoader);
  };
  ModuleLoader.prototype.prefetchModule = function(id, moduleInfo) {
    if (this.getDebugMode()) {
      return;
    }
    log.info(this.logger, `Prefetching module: ${id}`);
    let loadStatus = this.loadingModulesStatus_[[id]];
    if (loadStatus) {
      return;
    }
    const moduleInfoMap = {};
    moduleInfoMap[id] = moduleInfo;
    loadStatus = ModuleLoader.LoadStatus.createForIds_([id], moduleInfoMap);
    this.loadingModulesStatus_[[id]] = loadStatus;
    if (this.getUseScriptTags()) {
      const links = [];
      const insertPos = document.head || document.documentElement;
      for (let i = 0; i < loadStatus.trustedRequestUris.length; i++) {
        const link = ModuleLoader.createPreloadScriptElement_(loadStatus.trustedRequestUris[i]);
        links.push(link);
        insertPos.insertBefore(link, insertPos.firstChild);
      }
      loadStatus.successFn = () => {
        for (let i = 0; i < links.length; i++) {
          const link = links[i];
          dom.removeNode(link);
        }
      };
    } else {
      this.downloadModules_([id]);
    }
  };
  ModuleLoader.prototype.downloadModules_ = function(ids) {
    const debugMode = this.getDebugMode();
    const sourceUrlInjection = this.usingSourceUrlInjection_();
    const useScriptTags = this.getUseScriptTags();
    if (debugMode + sourceUrlInjection + useScriptTags > 1) {
      const effectiveFlag = useScriptTags ? "useScriptTags" : debugMode && !sourceUrlInjection ? "debug" : "sourceUrlInjection";
      log.warning(this.logger, `More than one of debugMode (set to ${debugMode}), ` + `useScriptTags (set to ${useScriptTags}), ` + `and sourceUrlInjection (set to ${sourceUrlInjection}) ` + `is enabled. Proceeding with download as if ` + `${effectiveFlag} is set to true and the rest to false.`);
    }
    const loadStatus = asserts.assert(this.loadingModulesStatus_[ids]);
    if (useScriptTags) {
      this.loadWithNonAsyncScriptTag_(loadStatus, ids);
    } else if (debugMode && !sourceUrlInjection) {
      jsloader.safeLoadMany(loadStatus.trustedRequestUris);
    } else {
      log.info(this.logger, "downloadModules ids:" + ids + " uris:" + loadStatus.requestUris);
      const bulkLoader = new BulkLoader(loadStatus.requestUris);
      const eventHandler = this.eventHandler_;
      eventHandler.listen(bulkLoader, EventType.SUCCESS, goog.bind(this.handleSuccess_, this, bulkLoader, ids));
      eventHandler.listen(bulkLoader, EventType.ERROR, goog.bind(this.handleError_, this, bulkLoader, ids));
      bulkLoader.load();
    }
  };
  ModuleLoader.prototype.loadWithNonAsyncScriptTag_ = function(loadStatus, ids) {
    log.info(this.logger, `Loading initiated for: ${ids}`);
    if (loadStatus.trustedRequestUris.length == 0) {
      if (loadStatus.successFn) {
        loadStatus.successFn();
        return;
      }
    }
    let lastScript = null;
    const insertPos = document.head || document.documentElement;
    for (let i = 0; i < loadStatus.trustedRequestUris.length; i++) {
      const url = loadStatus.trustedRequestUris[i];
      const urlLength = loadStatus.requestUris[i].length;
      asserts.assert(urlLength <= ModuleLoader.URL_MAX_LENGTH_, `Module url length is ${urlLength}, which is greater than limit of ` + `${ModuleLoader.URL_MAX_LENGTH_}. This should never ` + `happen.`);
      const scriptElement = ModuleLoader.createScriptElement_(url);
      scriptElement.onload = () => {
        scriptElement.onload = null;
        scriptElement.onerror = null;
        dom.removeNode(scriptElement);
        if (scriptElement == lastScript) {
          log.info(this.logger, `Loading complete for: ${ids}`);
          lastScript = null;
          if (loadStatus.successFn) {
            loadStatus.successFn();
          }
        }
      };
      scriptElement.onerror = () => {
        log.error(this.logger, `Network error when loading module(s): ${ids}`);
        scriptElement.onload = null;
        scriptElement.onerror = null;
        dom.removeNode(scriptElement);
        this.handleErrorHelper_(ids, loadStatus.errorFn, ModuleLoader.SYNTAX_OR_NETWORK_ERROR_CODE_);
        if (lastScript == scriptElement) {
          lastScript = null;
        } else {
          log.error(this.logger, `Dependent requests were made in parallel with failed request ` + `for module(s) "${ids}". Non-recoverable out-of-order ` + `execution may occur.`);
        }
      };
      lastScript = scriptElement;
      insertPos.insertBefore(scriptElement, insertPos.firstChild);
    }
  };
  ModuleLoader.prototype.handleError_ = function(bulkLoader, moduleIds, event) {
    const loadStatus = this.loadingModulesStatus_[moduleIds];
    if (loadStatus) {
      delete this.loadingModulesStatus_[moduleIds];
      this.handleErrorHelper_(moduleIds, loadStatus.errorFn, event.status);
    }
    Timer.callOnce(bulkLoader.dispose, 5, bulkLoader);
  };
  ModuleLoader.prototype.handleErrorHelper_ = function(moduleIds, errorFn, status, opt_error) {
    this.dispatchEvent(new ModuleLoader.RequestErrorEvent(moduleIds, status, opt_error));
    log.warning(this.logger, "Request failed for module(s): " + moduleIds);
    if (errorFn) {
      errorFn(status);
    }
  };
  ModuleLoader.EventType = {EVALUATE_CODE:new EventId(events.getUniqueId("evaluateCode")), REQUEST_SUCCESS:new EventId(events.getUniqueId("requestSuccess")), REQUEST_ERROR:new EventId(events.getUniqueId("requestError"))};
  ModuleLoader.EvaluateCodeEvent = function(moduleIds) {
    ModuleLoader.EvaluateCodeEvent.base(this, "constructor", ModuleLoader.EventType.EVALUATE_CODE);
    this.moduleIds = moduleIds;
  };
  goog.inherits(ModuleLoader.EvaluateCodeEvent, GoogEvent);
  ModuleLoader.RequestSuccessEvent = function(moduleIds) {
    ModuleLoader.RequestSuccessEvent.base(this, "constructor", ModuleLoader.EventType.REQUEST_SUCCESS);
    this.moduleIds = moduleIds;
  };
  goog.inherits(ModuleLoader.RequestSuccessEvent, GoogEvent);
  ModuleLoader.RequestErrorEvent = function(moduleIds, status, opt_error) {
    ModuleLoader.RequestErrorEvent.base(this, "constructor", ModuleLoader.EventType.REQUEST_ERROR);
    this.moduleIds = moduleIds;
    this.status = status;
    this.error = opt_error || null;
  };
  goog.inherits(ModuleLoader.RequestErrorEvent, GoogEvent);
  ModuleLoader.LoadStatus = function(trustedRequestUris) {
    this.requestUris = trustedRequestUris.map(TrustedResourceUrl.unwrap);
    this.trustedRequestUris = trustedRequestUris;
    this.responseTexts = null;
    this.loadRequested = false;
    this.successFn = null;
    this.errorFn = null;
  };
  ModuleLoader.LoadStatus.createForIds_ = function(ids, moduleInfoMap) {
    if (!ids) {
      return new ModuleLoader.LoadStatus([]);
    }
    const trustedRequestUris = [];
    for (let i = 0; i < ids.length; i++) {
      googArray.extend(trustedRequestUris, moduleInfoMap[ids[i]].getUris());
    }
    return new ModuleLoader.LoadStatus(trustedRequestUris);
  };
  exports = ModuleLoader;
  return exports;
});

$CLJS.SHADOW_ENV.setLoaded("goog.module.moduleloader.js");
