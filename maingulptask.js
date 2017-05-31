export class MainGulptask {
  constructor(options) {
    if (new.target === MainGulptask) {
      throw new TypeError("Cannot construct MainGulptask instances directly");
    }
    this._name = "main";
    this._src = options? options.src: '';
    this._dest = options? options.dest: '';
    this._data = options? options.data: '';
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }
  get src() {
    return this._src;
  }
  set src(newSrc) {
    this._src = newSrc;
  }
  get dest() {
    return this._dest;
  }
  set dest(newDest) {
    this._dest = newDest;
  }
  get data() {
    return this._data;
  }
  set data(newData) {
    this._data = newData;
  }
  /**
   * Override in subclass
   */
  task(callback) {
    callback();
  }
};