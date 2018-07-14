import CANVAS_SCOPE from './canvas.scope';
import CANVAS_UTILS from './canvas.utils';
import CANVAS_ENUM from './canvas.enum';
import { CanvasError } from '../errors';

const { STATE, STORE } = CANVAS_SCOPE;
const { ERRORS } = CANVAS_ENUM;

export default {
  create(configuration = {}) {
    if (STATE.IS_CANVAS_CREATED) {
      return this;
    }

    const defaultConfiguration = {
      width: STATE.CURRENT_CANVAS_CONFIGURATION.width,
      height: STATE.CURRENT_CANVAS_CONFIGURATION.height,
    };

    const isWidthValid = !!configuration.width;
    const isHeightValid = !!configuration.height;

    if (isWidthValid) {
      defaultConfiguration.width = configuration.width;
    }

    if (isHeightValid) {
      defaultConfiguration.height = configuration.height;
    }

    CANVAS_UTILS.createCanvasAndContext();
    CANVAS_UTILS.setCanvasConfiguration(defaultConfiguration);

    return this;
  },

  getCanvasElement() {
    if (STORE.CANVAS_DOM_ELEMENT) {
      return STORE.CANVAS_DOM_ELEMENT;
    }

    throw new CanvasError(ERRORS.GET_CANVAS_BEFORE_CREATE);
  },

  getCanvasConfiguration() {
    return STATE.CURRENT_CANVAS_CONFIGURATION;
  },

  getCanvasContext2D() {
    if (STORE.CANVAS_CONTEXT_2D) {
      return STORE.CANVAS_CONTEXT_2D;
    }

    throw new CanvasError(ERRORS.GET_CANVAS_BEFORE_CREATE);
  },

  updateConfiguration(configuration) {
    CANVAS_UTILS.setCanvasConfiguration(configuration);
  },

  appendToElement(DOMSelector) {
    const element = document.querySelector(DOMSelector);

    if (element) {
      const canvas = STORE.CANVAS_DOM_ELEMENT;
      element.appendChild(canvas);
      return true;
    }

    throw new CanvasError(ERRORS.INVALID_DOM_QUERY_TO_APPEND);
  },
};
