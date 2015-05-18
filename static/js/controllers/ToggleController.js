App.ToggleController = ToggleController;
function ToggleController(config) {
  var name = config.name;
  var toggle = this.toggle = document.getElementById('toggle-' + name);

  this.isActive = config.isActive != null ? config.isActive : false;
  this._toggleClassName = toggle.className;
  this._listeners = [];

  this.updateEl();
  toggle.addEventListener('click', this.toggleState.bind(this), false);
}

ToggleController.create = App.ctor(ToggleController);

ToggleController.prototype.addListener = function (context, fn) {
  this._listeners.push({
    context : context,
    fn : fn
  });
};

ToggleController.prototype.triggerListeners = function () {
  var listeners = this._listeners;
  var listener;

  for (var i = 0, il = listeners.length; i < il; i ++) {
    listener = listeners[i];
    listener.context[listener.fn].call(listener.context, this.isActive);
  }
};

ToggleController.prototype.toggleState = function (event) {
  this.isActive = !this.isActive;
  this.updateEl();
  this.triggerListeners();
};

ToggleController.prototype.updateEl = function () {
  if (this.isActive) {
    this.toggle.className += ' active';
  } else {
    this.toggle.className = this._toggleClassName;
  }
};
