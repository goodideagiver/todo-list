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
})({"src/script/listEntry.js":[function(require,module,exports) {
var getListEntryIndex = function getListEntryIndex(clickedElement) {
  var clickedEntry = clickedElement.closest('.list-entry');
  var allEntriesInCurrentList = clickedEntry.parentElement.children;
  var foundIndex;

  for (var i = 0; i < allEntriesInCurrentList.length; i++) {
    foundIndex = allEntriesInCurrentList[i] === clickedEntry ? i : 'match not found';

    if (i === foundIndex) {
      break;
    }
  }

  return foundIndex;
};

var createUpDownButtons = function createUpDownButtons() {
  var buttonsContainer = createCustomNode('div', {
    icon: null,
    customClassname: 'up-down-container',
    saveOnClick: true
  });
  var up = createCustomNode('button', {
    icon: '<i class="fas fa-angle-up"></i>',
    customClassname: 'up-list-btn',
    callbackFunc: moveListItem,
    saveOnClick: true
  });
  var down = createCustomNode('button', {
    icon: '<i class="fas fa-angle-down"></i>',
    customClassname: 'down-list-btn',
    callbackFunc: moveListItem
  });
  addElementsToContainer(buttonsContainer, [up, down]);
  return buttonsContainer;
};

var editModeRestore = function editModeRestore(element, oldText, save) {
  var listEntry = element.closest('.list-entry');
  var inputValue = listEntry.querySelector('input').value.trim();
  var userText;

  if (save && inputValue.trim().length > 0) {
    userText = inputValue;
  } else if (save) {
    userText = oldText;
    showModal('Warning!', {
      lowerText: 'You cant set entry to be empty!'
    });
  } else {
    userText = oldText;
  }

  var editedEntry = createListEntry(userText); // listEntry.parentElement.insertBefore(editedEntry, listEntry);

  listEntry.insertAdjacentElement('beforebegin', editedEntry);
  listEntry.remove();
};

var createEditModeButtons = function createEditModeButtons(oldText) {
  var confirm = createCustomNode('button', {
    icon: '<i class="fas fa-check"></i>',
    callbackFunc: function callbackFunc() {
      return editModeRestore(confirm, oldText, true);
    },
    saveOnClick: true
  });
  var decline = createCustomNode('button', {
    icon: '<i class="fas fa-times"></i>',
    callbackFunc: function callbackFunc() {
      return editModeRestore(decline, oldText, false);
    },
    saveOnClick: true
  });
  var wrapper = createCustomNode('section', {
    customClassname: 'edit-mode-buttons'
  });
  addElementsToContainer(wrapper, [confirm, createUpDownButtons(), decline]);
  return wrapper;
};

var createEditModeElements = function createEditModeElements(userText) {
  var editModeWrapper = createCustomNode('div', {
    customClassname: 'edit-mode'
  });
  var listInput = createCustomNode('input', {
    input: userText
  });
  var buttonsWrapper = createEditModeButtons(userText);
  addElementsToContainer(editModeWrapper, [listInput, buttonsWrapper]);
  return editModeWrapper;
};

var editModeLauncher = function editModeLauncher(e) {
  var editButton = e.target;
  var listEntry = editButton.closest('.list-entry');
  var listEntryUserText = listEntry.querySelector('.user-entry-text').innerText;
  listEntry.innerHTML = '';
  listEntry.appendChild(createEditModeElements(listEntryUserText));
  listEntry.querySelector('input').click();
  listEntry.querySelector('input').focus();
};

var createEditButton = function createEditButton() {
  return createCustomNode('button', {
    icon: '<i class="fas fa-wrench"></i>',
    customClassname: 'entry-edit-button',
    callbackFunc: editModeLauncher
  });
};

var moveListItem = function moveListItem(e) {
  var buttonClassTypes = {
    up: 'up-list-btn',
    down: 'down-list-btn'
  };
  var clickedButton = e.target;
  var listArray = clickedButton.closest('.list-entry-container').children;
  var listItemIndex = getListEntryIndex(clickedButton);
  var clickedButtonType = clickedButton.closest('button').className;
  var clickedEntry = clickedButton.closest('.list-entry');

  if (listArray.length === 1) {
    showModal('Warning!', {
      lowerText: "Cant move entry when there is only one."
    });
    return;
  } else if (listArray.length - 1 === listItemIndex && clickedButtonType === buttonClassTypes.down) {
    clickedEntry.parentElement.insertBefore(clickedEntry, clickedEntry.parentElement.firstElementChild);
    return;
  } else if (listItemIndex === 0 && clickedButtonType === buttonClassTypes.up) {
    clickedEntry.parentElement.appendChild(clickedEntry);
    return;
  }

  switch (clickedButtonType) {
    case buttonClassTypes.up:
      clickedEntry.parentElement.insertBefore(clickedEntry, listArray[listItemIndex - 1]);
      break;

    case buttonClassTypes.down:
      clickedEntry.parentElement.insertBefore(listArray[listItemIndex].nextSibling, clickedEntry);
      break;

    default:
      return;
  }
};

var removeEntry = function removeEntry(deleteButton) {
  deleteButton.closest('.list-entry').remove();
  saveChanges();
};

var createDeleteEntryButton = function createDeleteEntryButton() {
  var deleteButton = createCustomNode('button', {
    icon: '<i class="fas fa-trash-alt"></i>',
    customClassname: 'delete-entry-button'
  });
  deleteButton.addEventListener('click', function (e) {
    var thatButton = e.target;
    showModal('Confirmation needed', {
      lowerText: 'Are you sure you want to delete this entry?',
      yesNo: true,
      yesFunc: function yesFunc() {
        return removeEntry(thatButton);
      }
    });
  });
  return deleteButton;
};

var createEntryButtons = function createEntryButtons() {
  var entryButtonsContainer = createCustomNode('section', {
    customClassname: 'list-entry-buttons'
  });
  addElementsToContainer(entryButtonsContainer, [createEditButton(), createUpDownButtons(), createDeleteEntryButton()]);
  return entryButtonsContainer;
};

var createListEntry = function createListEntry(userInputText) {
  var entryLine = createCustomNode('div', {
    customClassname: 'list-entry',
    draggable: true
  });
  var entryText = createCustomNode('section', {
    customClassname: 'user-entry-text',
    text: userInputText
  });
  addElementsToContainer(entryLine, [entryText, createEntryButtons()]);
  addDraggingFunc(entryLine);
  return entryLine;
};

var sortEntryList = function sortEntryList(clickedElement) {
  disableEditMode();
  var list = clickedElement.closest('.list-container').querySelector('.list-entry-container');
  var entries = list.querySelectorAll('.user-entry-text');
  var entryArray = [];

  if (entries) {
    for (var i = 0; i < entries.length; i++) {
      entryArray.push(entries[i].innerText);
    }
  }

  entryArray.sort();
  list.innerHTML = '';

  for (var _i = 0; _i < entryArray.length; _i++) {
    list.appendChild(createListEntry(entryArray[_i]));
  }

  saveChanges();
};
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56171" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/script/listEntry.js"], null)
//# sourceMappingURL=/listEntry.d95e8efa.js.map