// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/script.js":[function(require,module,exports) {
//############## DRAG ##############
var isLeftDragging = false;
var isBottomDragging = false;
var dragbarWidth = 6;
var page = document.getElementById("page");

window.ResetColumnSizes = function ResetColumnSizes() {
  page.style.gridTemplateColumns = "15em 6px auto auto";
  page.style.gridTemplateRows = "auto auto auto auto 6px auto";
};

function SetCursor(cursor) {
  page.style.cursor = cursor;
}

window.StartLeftDrag = function StartLeftDrag() {
  isLeftDragging = true;
  SetCursor("ew-resize");
};

window.StartBottomDrag = function StartBottomDrag() {
  isBottomDragging = true;
  SetCursor("ns-resize");
};

window.EndDrag = function EndDrag() {
  isLeftDragging = false;
  isBottomDragging = false;
  SetCursor("auto");
};

window.OnDrag = function OnDrag(event) {
  if (isLeftDragging) {
    var cols = [event.clientX, dragbarWidth, page.clientWidth - 2 * dragbarWidth - event.clientX, "auto"];
    page.style.gridTemplateColumns = cols.map(function (c) {
      return c.toString() === "auto" ? c.toString() : c.toString() + "px";
    }).join(" ");
    event.preventDefault();
  }

  if (isBottomDragging) {
    var rows = ["auto", "auto", "auto", "auto", dragbarWidth, page.clientHeight - 2 * dragbarWidth - event.clientY];
    page.style.gridTemplateRows = rows.map(function (c) {
      return c.toString() === "auto" ? c.toString() : c.toString() + "px";
    }).join(" ");
    event.preventDefault();
  }
}; //############## TREE ##############


var toggler = document.getElementsByClassName("arrow");

for (var i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("arrow-down");
  });
} //############## CLICK LIEN ##############


var link = document.getElementsByClassName("link");
var content_part = document.getElementsByClassName("content-part");

for (var _i = 0; _i < link.length; _i++) {
  link[_i].addEventListener("click", function () {
    for (var j = 0; j < content_part.length; j++) {
      if (content_part[j].getAttribute("id").toString() !== this.getAttribute("id").toString().slice(0, -4)) {
        content_part[j].classList.remove("active");
        content_part[j].classList.add("nested");
      } else {
        content_part[j].classList.remove("nested");
        content_part[j].classList.add("active");
      }
    }

    for (var _j = 0; _j < top_content_item.length; _j++) {
      if (top_content_item[_j].innerHTML.toString() === this.innerHTML.toString()) {
        top_content_item[_j].classList.add("selected-top-content-item");
      } else {
        top_content_item[_j].classList.remove("selected-top-content-item");
      }
    }

    for (var _j2 = 0; _j2 < link.length; _j2++) {
      if (link[_j2].innerHTML.toString() === this.innerHTML.toString()) {
        link[_j2].classList.add("selected-link");
      } else {
        link[_j2].classList.remove("selected-link");
      }
    }
  });
} //############## CLICK ONGLET CONTENT##############


var top_content_item = document.getElementsByClassName("top-content-item");

for (var _i2 = 0; _i2 < top_content_item.length; _i2++) {
  top_content_item[_i2].addEventListener("click", function () {
    for (var j = 0; j < content_part.length; j++) {
      if (content_part[j].getAttribute("id").toString() !== this.innerHTML.toString().slice(0, -5)) {
        content_part[j].classList.remove("active");
        content_part[j].classList.add("nested");
        this.classList.remove("selected");
      } else {
        content_part[j].classList.remove("nested");
        content_part[j].classList.add("active");
        this.classList.add("selected");
      }
    }

    for (var _j3 = 0; _j3 < top_content_item.length; _j3++) {
      if (top_content_item[_j3].innerHTML.toString() === this.innerHTML.toString()) {
        top_content_item[_j3].classList.add("selected-top-content-item");
      } else {
        top_content_item[_j3].classList.remove("selected-top-content-item");
      }
    }

    for (var _j4 = 0; _j4 < link.length; _j4++) {
      if (link[_j4].innerHTML.toString() === this.innerHTML.toString()) {
        link[_j4].classList.add("selected-link");
      } else {
        link[_j4].classList.remove("selected-link");
      }
    }
  });
} //############## CLICK ONGLET CONSOLE##############


var top_console_item = document.getElementsByClassName("top-console-item");
var console_part = document.getElementsByClassName("console-part");

for (var _i3 = 0; _i3 < top_console_item.length; _i3++) {
  top_console_item[_i3].addEventListener("click", function () {
    for (var j = 0; j < console_part.length; j++) {
      if (console_part[j].getAttribute("id").toString() !== this.innerHTML.toString()) {
        console_part[j].classList.remove("active");
        console_part[j].classList.add("nested");
      } else {
        console_part[j].classList.remove("nested");
        console_part[j].classList.add("active");
      }
    }

    for (var _j5 = 0; _j5 < top_console_item.length; _j5++) {
      if (top_console_item[_j5].innerHTML.toString() === this.innerHTML.toString()) {
        top_console_item[_j5].classList.add("selected-top-console-item");
      } else {
        top_console_item[_j5].classList.remove("selected-top-console-item");
      }
    }
  });
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "32819" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/script.js"], null)
//# sourceMappingURL=/script.baf0e655.js.map