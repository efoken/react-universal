import { Button as ButtonBase, Container, Text, View } from '@universal-ui/components';
import { ThemeProvider, isWeb, styled } from '@universal-ui/core';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (!isWeb) {
  ScreenOrientation.unlockAsync().catch(console.log);
}

const Grid = styled(Container)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.space[4],
  paddingBottom: theme.space[7],
  paddingTop: theme.space[10],
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: {
    xs: theme.colors.black,
    md: theme.colors.white,
  },
  borderRadius: theme.radii[2],
  paddingBottom: theme.space[2],
  paddingLeft: theme.space[4],
  paddingRight: theme.space[4],
  paddingTop: theme.space[2],
  width: '100%',
}));

const ButtonLabel = styled(Text)(({ theme }) => ({
  color: theme.colors.white,
  textAlign: 'center',
}));

const Card = styled(View)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.radii[3],
  boxShadow: '0 0 16px rgba(0, 0, 0, 0.08)',
  flexGrow: 1,
  padding: theme.space[5],
  width: '40%',
}));

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        // eslint-disable-next-line react/style-prop-object
        style="auto"
      />
      <ThemeProvider>
        <ScrollView>
          <Grid>
            <Button>
              <ButtonLabel>Open up App.js to start working on your app!</ButtonLabel>
            </Button>
            {Array.from({ length: 40 }, (_, i) => i).map((i) => (
              <Card key={i}>
                <Text>Test</Text>
              </Card>
            ))}
          </Grid>
        </ScrollView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
