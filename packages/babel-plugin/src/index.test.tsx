import { pluginTester } from 'babel-plugin-tester';
import plugin from './index';

pluginTester({
  plugin,
  pluginOptions: {
    debug: false,
    root: 'src',
    platform: 'native',
  },
  babelOptions: {
    plugins: ['@babel/plugin-syntax-jsx'],
  },
  tests: [
    {
      title: 'Should detect dependencies in variants',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme, runtime: rt }) => ({
          variants: {
            size: {
              small: {
                backgroundColor: theme.colors.blue,
                paddingTop: theme.space[12],
                marginBottom: rt.insets.bottom === 0
                  ? theme.space[24]
                  : theme.space[36],
              },
            },
          },
        }));
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => ({
            variants: {
              size: {
                small: {
                  backgroundColor: theme.colors.blue,
                  paddingTop: theme.space[12],
                  marginBottom: rt.insets.bottom === 0 ? theme.space[24] : theme.space[36],
                },
              },
            },
            uni__dependencies: [0, 9, 4],
          }),
          664955593,
        );
      `,
    },
    {
      title: 'Should detect dependencies in breakpoints',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme, runtime: rt }) => ({
          backgroundColor: {
            sm: theme.colors.blue,
          },
          padding: {
            xs: rt.insets.top,
          },
        }));
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => ({
            container: {
              backgroundColor: {
                sm: theme.colors.blue,
              },
              padding: {
                xs: rt.insets.top,
              },
              uni__dependencies: [0, 9],
            },
          }),
          664955593,
        );
      `,
    },
    {
      title: 'Should detect dependencies in calculations',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme, runtime: rt }) => ({
          container: {
            marginTop: theme.space[2] + rt.insets.bottom,
            marginBottom: theme.space[2] * rt.statusBar.height,
            paddingTop: theme.space[2] - rt.navigationBar.height,
          },
        }));
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => ({
            container: {
              marginTop: theme.space[2] + rt.insets.bottom,
              marginBottom: theme.space[2] * rt.statusBar.height,
              paddingTop: theme.space[2] - rt.navigationBar.height,
              uni__dependencies: [0, 9, 12, 13],
            },
          }),
          664955593,
        );
      `,
    },
    {
      title: 'Should allow user to use arrow functions with body for dynamic functions',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme, runtime: rt }) => () => {
          const b = 2 + 2;

          return {
            backgroundColor: {
              sm: theme.colors.blue,
            },
            padding: {
              xs: rt.insets.top + b,
            },
          };
        });
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => () => {
            const b = 2 + 2;

            return {
              backgroundColor: {
                sm: theme.colors.blue,
              },
              padding: {
                xs: rt.insets.top + b,
              },
              uni__dependencies: [0, 9],
            };
          },
          664955593,
        );
      `,
    },
    {
      title: 'Should correctly detect IME insets dependency',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme, runtime: rt }) => ({
          backgroundColor: theme.colors.background,
          paddingBottom: rt.insets.ime,
        }));
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => ({
            backgroundColor: theme.colors.background,
            paddingBottom: rt.insets.ime,
            uni__dependencies: [0, 14],
          }),
          664955593,
        );
      `,
    },
    {
      title: 'Should correctly detect dependency from Array accessor',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => (headerColors, colorMap) => ({
            backgroundColor: headerColors[rt.colorScheme],
            paddingBottom: colorMap[theme.colors.primary],
          }),
        );
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => (headerColors, colorMap) => ({
            backgroundColor: headerColors[rt.colorScheme],
            paddingBottom: colorMap[theme.colors.primary],
            uni__dependencies: [0, 5],
          }),
          664955593,
        );
      `,
    },
    {
      title: 'Should correctly detect dependency from unary operator',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme, runtime: rt }) => ({
          transform: [
            {
              translateY: -rt.insets.ime,
            },
          ],
        }));
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = StyleSheet.create(
          ({ theme, runtime: rt }) => ({
            transform: [
              {
                translateY: -rt.insets.ime,
              },
            ],
            uni__dependencies: [14],
          }),
          664955593,
        );
      `,
    },
    {
      title: 'Should correctly detect dependencies from if else statements',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <View style={styles.container(5)}>
            <Text>Hello world</Text>
          </View>
        );

        const styles = StyleSheet.create(({ theme, runtime: rt }) => ({
          container: someRandomInt => {
            if (someRandomInt === 5) {
              return {
                backgroundColor: theme.colors.background
              }
            }

            if (someRandomInt === 10) {
              return {
                backgroundColor: theme.colors.barbie,
                paddingBottom: rt.insets.bottom
              }
            }

            if (someRandomInt === 15) {
              return {
                fontSize: rt.fontScale * 10
              }
            } else {
              return {
                backgroundColor: theme.colors.blood
              }
            }
          }
        }))
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <View style={styles.container(5)}>
            <Text>Hello world</Text>
          </View>
        );

        const styles = StyleSheet.create(
          ({ theme, runtime: rt }) => ({
            container: someRandomInt => {
              if (someRandomInt === 5) {
                return {
                  backgroundColor: theme.colors.background,
                  uni__dependencies: [0, 9, 11]
                }
              }

              if (someRandomInt === 10) {
                return {
                  backgroundColor: theme.colors.barbie,
                  paddingBottom: rt.insets.bottom,
                  uni__dependencies: [0, 9, 11]
                }
              }

              if (someRandomInt === 15) {
                return {
                  fontSize: rt.fontScale * 10,
                  uni__dependencies: [0, 9, 11]
                }
              } else {
                return {
                  backgroundColor: theme.colors.blood,
                  uni__dependencies: [0, 9, 11]
                }
              }
            }
          }),
          664955593
        )
      `,
    },
    {
      title: 'Should correctly detect dependency in square brackets',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme, runtime: rt }) => ({
          backgroundColor: theme.colors.purple[500],
        }));

        const Container2 = styled(View)(({ theme, runtime: rt }) => ({
          paddingBottom: theme.spacing[rt.breakpoint],
        }));
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme, runtime: rt }) => ({
            backgroundColor: theme.colors.purple[500],
            uni__dependencies: [0],
          }),
          664955593,
        );

        const Container2 = styled(View)(
          ({ theme, runtime: rt }) => ({
            paddingBottom: theme.spacing[rt.breakpoint],
            uni__dependencies: [0, 3],
          }),
          664955593,
        );
      `,
    },
    {
      title: 'Should correctly detect inline spread',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const styles = StyleSheet.create(theme => ({
          container: {
            ...theme.components.container
          },
          container2: {
            ...theme.components.text
          }
        }))
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const styles = StyleSheet.create(
          theme => ({
            container: {
              ...theme.components.container,
              uni__dependencies: [0]
            },
            container2: {
              ...theme.components.text,
              uni__dependencies: [0]
            }
          }),
          664955593
        )
      `,
    },
    {
      title: 'Should correctly detect inline theme dependencies',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(({ theme }) => theme.components.container);

        const Container2 = styled(Text)(({ theme }) => theme.components.text.nested.deep);
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const Container = styled(View)(
          ({ theme }) => ({
            ...theme.components.container,
            uni__dependencies: [0],
          }),
          664955593,
        );

        const Container2 = styled(Text)(
          ({ theme }) => ({
            ...theme.components.text.nested.deep,
            uni__dependencies: [0],
          }),
          664955593,
        )
      `,
    },
    {
      title: 'Should correctly detect destructured dependencies',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const styles = StyleSheet.create(({ components: { test }}, { insets: { ime }, screen: { height }, statusBar  }) => ({
          container: {
            backgroundColor: test
          },
          container2: {
            paddingBottom: ime,
            height,
            width: statusBar.width
          }
        }))
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const styles = StyleSheet.create(
          ({ components: { test } }, { insets: { ime }, screen: { height }, statusBar }) => ({
            container: {
              backgroundColor: test,
              uni__dependencies: [0]
            },
            container2: {
              paddingBottom: ime,
              height,
              width: statusBar.width,
              uni__dependencies: [14, 6, 12]
            }
          }),
          664955593
        )
      `,
    },
    {
      title: 'Should correctly detect dependencies in weirdest syntax',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const styles = StyleSheet.create(({ components: { test, other: { nested }} }, { insets: { ime }, screen, statusBar: { width, height }  }) => {
          const otherVariable = 2

          return {
            container: () => {
              if (otherVariable === 2) {
                return {
                  backgroundColor: nested
                }
              }

              if (otherVariable === 3) {
                return {
                  marginTop: ime,
                  height: screen.height
                }
              }

              return nested
            },
            container2: () => ({
              paddingBottom: ime,
              height,
              width
            })
          }
        })
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <Container>
            <Text style={styles.container2}>Hello world</Text>
          </Container>
        );

        const styles = StyleSheet.create(
          (
            {
              components: {
                test,
                other: { nested }
              }
            },
            { insets: { ime }, screen, statusBar: { width, height } }
          ) => {
            const otherVariable = 2

            return {
              container: () => {
                if (otherVariable === 2) {
                  return {
                    backgroundColor: nested,
                    uni__dependencies: [0, 14, 6]
                  }
                }

                if (otherVariable === 3) {
                  return {
                    marginTop: ime,
                    height: screen.height,
                    uni__dependencies: [0, 14, 6]
                  }
                }

                return { ...nested, uni__dependencies: [0, 14, 6] }
              },
              container2: () => ({
                paddingBottom: ime,
                height,
                width,
                uni__dependencies: [14, 12]
              })
            }
          },
          664955593
        )
      `,
    },
    {
      title: 'Should correctly detect ime from destructured insets',
      code: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <View>
            <KeyboardAvoidingView>Hello world</KeyboardAvoidingView>
          </View>
        );

        const KeyboardAvoidingView = styled(Text)(({ theme, runtime: { insets } }) => ({
          flex: 1,
          paddingTop: insets.top + 16,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
          paddingBottom: insets.ime || insets.bottom + 50,
        }));
      `,
      output: /* javascript */ `
        import { View, Text } from '@react-universal/components';
        import { styled } from '@react-universal/core';

        export const Example = () => (
          <View>
            <KeyboardAvoidingView>Hello world</KeyboardAvoidingView>
          </View>
        );

        const KeyboardAvoidingView = styled(Text)(
          ({ theme, runtime: { insets } }) => ({
            flex: 1,
            paddingTop: insets.top + 16,
            paddingLeft: insets.left + 16,
            paddingRight: insets.right + 16,
            paddingBottom: insets.ime || insets.bottom + 50,
            uni__dependencies: [9, 14],
          }),
          664955593,
        );
      `,
    },
  ],
});
