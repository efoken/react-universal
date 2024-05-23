import { Container, Text } from '@universal-ui/components';
import { ThemeProvider, styled } from '@universal-ui/core';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { Platform, View as RNView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (Platform.OS !== 'web') {
  ScreenOrientation.unlockAsync().catch(console.log);
}

const Grid = styled(Container)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 16,
  paddingBottom: 32,
  paddingTop: 56,
});

const Button = styled(RNView)(({ theme }) => ({
  backgroundColor: {
    xs: theme.colors.black,
    md: theme.colors.green,
  },
  borderRadius: 8,
  paddingHorizontal: theme.space[4],
  paddingVertical: theme.space[2],
  width: '100%',
}));

const ButtonLabel = styled(Text)(({ theme }) => ({
  color: theme.colors.white,
  textAlign: 'center',
}));

const Card = styled(RNView)({
  backgroundColor: '#fff',
  borderRadius: 16,
  flexGrow: 1,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: {
    height: 0,
    width: 0,
  },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  width: '40%',
});

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
              <ButtonLabel>
                Open up App.js to start working on your app!
              </ButtonLabel>
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
