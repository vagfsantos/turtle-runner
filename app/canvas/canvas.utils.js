import CANVAS_SCOPE from './canvas.scope';
import CANVAS_ENUM from './canvas.enum';
import { CanvasError } from '../errors';

const { STATE, STORE } = CANVAS_SCOPE;
const { ERRORS } = CANVAS_ENUM;

export default {
  isParamValid: {
    isNumber: value => !!(+value),
    width(value) { return this.isNumber(value); },
    height(value) { return this.isNumber(value); },
  },

  createCanvasDOMElement() {
    return document.createElement('canvas');
  },

  get2DContextFromCanvas(canvas = {}) {
    if (canvas.getContext) {
      return canvas.getContext('2d');
    }

    throw new CanvasError('you should provide a valid canvas DOM element');
  },

  createCanvasAndContext() {
    const canvas = this.createCanvasDOMElement();
    const context2D = this.get2DContextFromCanvas(canvas);

    STORE.CANVAS_DOM_ELEMENT = canvas;
    STORE.CANVAS_CONTEXT_2D = context2D;

    STATE.IS_CANVAS_CREATED = true;
  },

  setCanvasConfiguration(configuration = {}) {
    const { width, height } = configuration;

    if (width) {
      this.validateParameter('width', width);
      STORE.CANVAS_DOM_ELEMENT.width = width;
      STATE.CURRENT_CANVAS_CONFIGURATION.width = width;
    }

    if (height) {
      this.validateParameter('height', height);
      STORE.CANVAS_DOM_ELEMENT.height = height;
      STATE.CURRENT_CANVAS_CONFIGURATION.height = height;
    }
  },

  validateParameter(key, value) {
    const isParamValid = (
      this.isParamValid[key]
        ? this.isParamValid[key](value) : false
    );

    if (!isParamValid) {
      throw new CanvasError(ERRORS.INVALID_CONFIGURATION_PARAMETER);
    }

    return true;
  },
};
