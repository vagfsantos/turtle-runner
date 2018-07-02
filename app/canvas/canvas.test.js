import test from 'ava';
import Canvas from '../../_test/canvas';

test.skip('creates a default canvas element', (t) => {
  const canvasReturn = Canvas.create();
  t.deepEqual(canvasReturn, Canvas, 'ola');
});

test.skip('creates a custom canvas element', (t) => {
  const canvasElement = Canvas.create().getCanvasElement();
  t.true(canvasElement);
});

test.skip('creates just one canvas element', (t) => {
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

test.skip('returns canvas element reference', (t) => {
  const canvasElement = Canvas.getCanvasElement();
  t.true(canvasElement);
});

test.skip('returns canvas 2D context reference', (t) => {
  const context2D = Canvas.getCanvasContext2D();
  t.true(context2D);
});

test.skip('changes the configuration after creation', (t) => {
  const canvas = Canvas.create({ width: 400 });
  canvas.updateConfiguration({ width: 600 });

  const { width } = canvas.getConfiguration();
  t.is(width, 600);
});

test.skip('validates the entries of custom configuration', (t) => {
  t.plan(2);

  const widthError = t.throws(() => {
    Canvas.create({
      width: 'abc',
    });
  });

  const heightError = t.throws(() => {
    Canvas.create({
      height: 'abc',
    });
  });

  const thrownWithError = widthError.message.includes('width');
  const thrownHeightError = heightError.message.includes('height');

  t.true(thrownWithError, 'has width error');
  t.true(thrownHeightError, 'has height error');
});

test.skip('appends the canvas to another element', (t) => {
  Canvas.create();
  const appended = Canvas.appendToElement('body');

  t.true(appended);
});

test.skip('preserves the integrity of canvas element', (t) => {
  Canvas.create();
  const error = t.throws(() => {
    Canvas.canvasElement = null;
  });

  t.is(error.message, '');
});

test.skip('preserves the integrity of 2D context', (t) => {
  Canvas.create();
  const error = t.throws(() => {
    Canvas.canvasContext2D = null;
  });

  t.is(error.message, '');
});
