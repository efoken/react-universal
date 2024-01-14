import { css } from './css';

describe('css', () => {
  it('should interpolate functions', () => {
    const style = css.call({}, () => ({ display: 'flex' }));
    expect(style).toStrictEqual({ display: 'flex' });
  });

  it('should handle more than 10 dynamic properties', () => {
    const style = css({
      textDecorationLine: 'underline',
      borderRightColor: 'blue',
      borderRightWidth: 54,
      backgroundColor: 'white',
      color: 'black',
      display: 'flex',
      borderRadius: 3,
      padding: 25,
      width: 500,
      zIndex: 100,
      fontSize: 18,
      textAlign: 'center',
    });
    expect(style).toStrictEqual({
      textDecorationLine: 'underline',
      borderRightColor: 'blue',
      borderRightWidth: 54,
      backgroundColor: 'white',
      color: 'black',
      display: 'flex',
      borderRadius: 3,
      padding: 25,
      width: 500,
      zIndex: 100,
      fontSize: 18,
      textAlign: 'center',
    });
  });

  it('should handle undefined value', () => {
    const style = css();
    expect(style).toStrictEqual({});
  });

  it('should handle null value', () => {
    const style = css(null);
    expect(style).toStrictEqual({});
  });

  it('should allow simple composition', () => {
    const style1 = css({ display: 'flex' });
    const style2 = css({
      ...style1,
      justifyContent: 'center',
    });
    expect(style2).toStrictEqual({
      display: 'flex',
      justifyContent: 'center',
    });
  });

  it('handles objects', () => {
    const style = css({
      display: 'flex',
      color: `${'blue'}`,
      fontSize: 20,
      height: 50,
      width: 20,
    });
    expect(style).toStrictEqual({
      display: 'flex',
      color: 'blue',
      fontSize: 20,
      height: 50,
      width: 20,
    });
  });

  it('handles array of objects', () => {
    const style = css([{ height: 50, width: 20 }, null]);
    expect(style).toStrictEqual({ height: 50, width: 20 });
  });

  it('shoud allow nested array', () => {
    const style = css([
      [{ display: 'inline' as any }],
      [{ display: 'inline-block' as any }],
      [
        { display: 'block' as any },
        [
          { display: 'flex' },
          [
            { display: 'table' as any },
            { color: 'darkorchid' },
            [{ fontSize: 16 }, [{ backgroundColor: 'aquamarine' }]],
          ],
        ],
      ],
    ]);
    expect(style).toStrictEqual({
      display: 'table',
      color: 'darkorchid',
      fontSize: 16,
      backgroundColor: 'aquamarine',
    });
  });

  it('should handle explicit false', () => {
    const style = css(false);
    expect(style).toStrictEqual({});
  });

  it('should interpolate array with explicit false', () => {
    const style = css([[{ display: 'flex' }], false]);
    expect(style).toStrictEqual({ display: 'flex' });
  });

  it('should interpolate array with explicit true', () => {
    const style = css([[{ display: 'flex' }], true]);
    expect(style).toStrictEqual({ display: 'flex' });
  });

  it('should do composition stuff', () => {
    const style1 = css({ justifyContent: 'center' });
    const style2 = css([style1]);
    expect(style1).toStrictEqual({ justifyContent: 'center' });
    expect(style2).toStrictEqual({ justifyContent: 'center' });
  });
});
