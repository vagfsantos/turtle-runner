import CANVAS from './canvas.enum';

const PRIVATE = {
  STATE: {
    IS_CANVAS_CREATED: false,
    CURRENT_CANVAS_CONFIGURATION: {
      width: CANVAS.DEFAULT_CONFIGURATION.WIDTH,
      height: CANVAS.DEFAULT_CONFIGURATION.HEIGHT,
    },
  },

  STORE: {
    CANVAS_DOM_ELEMENT: null,
    CANVAS_CONTEXT_2D: null,
  },
};

const { STATE, STORE } = PRIVATE;

const canvasUtils = {
  createCanvasDOMElement() {
    return document.createElement('canvas');
  },
};

export default {
  create(configuration = {}) {
    if (STATE.IS_CANVAS_CREATED) {
      return this;
    }

    const { width, height } = configuration;
    const defaultConfig = this.getCanvasConfiguration();
    const canvasDOMElement = canvasUtils.createCanvasDOMElement();
    const canvasContext2D = canvasDOMElement.getContext('2d');

    canvasDOMElement.width = width || defaultConfig.width;
    canvasDOMElement.height = height || defaultConfig.height;

    STORE.CANVAS_DOM_ELEMENT = canvasDOMElement;
    STORE.CANVAS_CONTEXT_2D = canvasContext2D;
    STATE.CURRENT_CANVAS_CONFIGURATION = configuration;

    STATE.IS_CANVAS_CREATED = true;

    return this;
  },

  update() {
    STORE.CANVAS_DOM_ELEMENT.width = STATE.CURRENT_CANVAS_CONFIGURATION.width;
    STORE.CANVAS_DOM_ELEMENT.height = STATE.CURRENT_CANVAS_CONFIGURATION.height;
  },

  getCanvasElement() {
    if (STORE.CANVAS_DOM_ELEMENT) {
      return STORE.CANVAS_DOM_ELEMENT;
    }

    throw new Error('you must create() a canvas before you try getting its element.');
  },

  getCanvasConfiguration() {
    return STATE.CURRENT_CANVAS_CONFIGURATION;
  },

  getCanvasContext2D() {
    if (STORE.CANVAS_CONTEXT_2D) {
      return STORE.CANVAS_CONTEXT_2D;
    }

    throw new Error('you must create() a canvas before you try getting its context');
  },

  updateConfiguration({ width, height }) {
    if (+width) {
      STATE.CURRENT_CANVAS_CONFIGURATION.width = width;
    }

    if (+height) {
      STATE.CURRENT_CANVAS_CONFIGURATION.height = height;
    }

    this.update();
  },

  appendToElement(DOMSelector) {
    const element = document.querySelector(DOMSelector);

    if (element) {
      const canvas = STORE.CANVAS_DOM_ELEMENT;
      element.appendChild(canvas);
      return true;
    }

    throw new Error('NOT FOUND. You should pass a valid query selector as first argument');
  },
};
