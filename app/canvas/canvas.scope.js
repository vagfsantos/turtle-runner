import CANVAS_ENUM from './canvas.enum';

export default {
  STATE: {
    IS_CANVAS_CREATED: false,
    CURRENT_CANVAS_CONFIGURATION: {
      width: CANVAS_ENUM.DEFAULT_CONFIGURATION.WIDTH,
      height: CANVAS_ENUM.DEFAULT_CONFIGURATION.HEIGHT,
    },
  },

  STORE: {
    CANVAS_DOM_ELEMENT: null,
    CANVAS_CONTEXT_2D: null,
  },
};
