import test from 'ava';
import Canvas from '../../_test/canvas.module';
import CANVAS_ENUM from '../../_test/canvas.enum';
import CANVAS_UTILS from '../../_test/canvas.utils';
import CANVAS_SCOPE from '../../_test/canvas.scope';
// import { CanvasError } from '../../_test/errors';

const { DEFAULT_CONFIGURATION, ERRORS } = CANVAS_ENUM;

CANVAS_UTILS.createCanvasDOMElement = () => ({
  getContext() { return {}; },
});

function resetCanvasCreation() {
  CANVAS_SCOPE.STATE.IS_CANVAS_CREATED = false;
}

test('creates a canvas with default configuration', (t) => {
  const canvas = Canvas.create();
  const { width, height } = canvas.getCanvasConfiguration();

  t.plan(2);
  t.is(width, DEFAULT_CONFIGURATION.WIDTH);
  t.is(height, DEFAULT_CONFIGURATION.HEIGHT);
});

test('creates a canvas with custom configuration', (t) => {
  resetCanvasCreation();

  const config = Canvas.create({ height: 40 }).getCanvasConfiguration();

  t.is(config.height, 40);
});


test('creates just one canvas element', (t) => {
  resetCanvasCreation();

  Canvas.create({
    width: 400,
  });

  Canvas.create({
    width: 200,
  });

  const canvasElement = Canvas.getCanvasConfiguration();
  const { width } = canvasElement;

  t.is(width, 400);
});

test('returns canvas element reference', (t) => {
  const canvasElement = Canvas.getCanvasElement();
  t.truthy(canvasElement);
});

test('returns canvas 2D context reference', (t) => {
  const context2D = Canvas.getCanvasContext2D();
  t.truthy(context2D);
});

test('changes the configuration after creation', (t) => {
  resetCanvasCreation();

  const canvas = Canvas.create({ width: 400 });
  canvas.updateConfiguration({ width: 600 });

  const { width } = canvas.getCanvasConfiguration();
  t.is(width, 600);
});

test('validates the entries of custom configuration', (t) => {
  t.plan(2);

  const widthError = t.throws(() => {
    Canvas.create({
      width: 'abc',
    });
  }, Error);

  const heightError = t.throws(() => {
    Canvas.create({
      height: 'abc',
    });
  });

  t.is(heightError.message, ERRORS.INVALID_CONFIGURATION_PARAMETER);
  t.is(widthError.message, ERRORS.INVALID_CONFIGURATION_PARAMETER);
});

test.skip('appends the canvas to another element', (t) => {
  Canvas.create();
  const appended = Canvas.appendToElement('body');

  t.true(appended);
});
