import {
  Button as ButtonBase,
  Container,
  Popover,
  ScrollView,
  Text,
  View,
} from '@react-universal/components';
import { ThemeProvider, isWeb, styled } from '@react-universal/core';
import { Defs, G, Path, Svg, TSpan, Text as TextSvg, Use } from '@react-universal/svg';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (!isWeb) {
  ScreenOrientation.unlockAsync().catch(console.log);
}

const Grid = styled(Container)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.space[4],
  paddingBottom: theme.space[7],
  paddingTop: theme.space[4],
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
  backgroundColor: theme.colors.background.default,
  borderRadius: theme.radii[3],
  boxShadow: '0 0 16px rgba(0, 0, 0, 0.08)',
  flexGrow: 1,
  padding: theme.space[5],
  width: '40%',
}));

export default function App() {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<React.ElementRef<typeof ButtonBase>>(null);

  return (
    <SafeAreaProvider>
      <StatusBar
        // eslint-disable-next-line react/style-prop-object
        style="auto"
      />
      <ThemeProvider>
        <ScrollView>
          <Svg
            sx={{
              aspectRatio: 620 / 472,
              maxW: '100%',
              w: { xs: 100, md: 200 },
              // h: 'auto',
              mt: 10,
            }}
            viewBox="0 0 620 472"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Defs id="defs4">
              <Path id="box1" d="m0 0h77v210h-77z" stroke="#000" strokeWidth={2} />
              <Path id="box2" d="m0 0h77v60h-77z" stroke="#000" strokeWidth={2} />
            </Defs>
            <Path id="bg" d="m0 0h620v472h-620z" fill="#fff" />
            <G id="g9" transform="translate(2 1)">
              <Use id="use11" fill="#fff" href="#box1" />
              <Use id="use13" x={77} fill="#ff0" href="#box1" />
              <Use id="use15" x={154} fill="#0ff" href="#box1" />
              <Use id="use17" x={231} fill="#0f0" href="#box1" />
              <Use id="use19" x={308} fill="#f0f" href="#box1" />
              <Use id="use21" x={385} fill="red" href="#box1" />
              <Use id="use23" x={462} fill="#00f" href="#box1" />
              <Use id="use25" x={539} href="#box1" />
            </G>
            <G id="g45" transform="translate(2 220)">
              <Use id="use47" fill="#0f0" href="#box2" />
              <Use id="use49" x={77} fill="#0f0" href="#box2" />
              <Use id="use51" x={154} fill="#0f0" href="#box2" />
              <Use id="use53" x={231} fill="#0f0" href="#box2" />
              <Use id="use55" x={308} fill="#fff" href="#box2" />
              <Use id="use57" x={385} fill="#fff" href="#box2" />
              <Use id="use59" x={462} fill="#fff" href="#box2" />
              <Use id="use61" x={539} fill="#fff" href="#box2" />
              <TextSvg
                id="green100"
                x={30}
                y={35}
                fill="#fff"
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                0.59
              </TextSvg>
            </G>
            <G id="g27" transform="translate(2 280)">
              <Use id="use29" fill="red" href="#box2" />
              <Use id="use31" x={77} fill="red" href="#box2" />
              <Use id="use33" x={154} fill="#fff" href="#box2" />
              <Use id="use35" x={231} fill="#fff" href="#box2" />
              <Use id="use37" x={308} fill="red" href="#box2" />
              <Use id="use39" x={385} fill="red" href="#box2" />
              <Use id="use41" x={462} fill="#fff" href="#box2" />
              <Use id="use43" x={539} fill="#fff" href="#box2" />
              <TextSvg
                id="red100"
                x={20}
                y={35}
                fill="#fff"
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                +0.30
              </TextSvg>
            </G>
            <G id="g63" transform="translate(2 340)">
              <Use id="use65" fill="#00f" href="#box2" />
              <Use id="use67" x={77} fill="#fff" href="#box2" />
              <Use id="use69" x={154} fill="#00f" href="#box2" />
              <Use id="use71" x={231} fill="#fff" href="#box2" />
              <Use id="use73" x={308} fill="#00f" href="#box2" />
              <Use id="use75" x={385} fill="#fff" href="#box2" />
              <Use id="use77" x={462} fill="#00f" href="#box2" />
              <Use id="use79" x={539} fill="#fff" href="#box2" />
              <TextSvg
                id="blue100"
                x={20}
                y={35}
                fill="#fff"
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                +0.11
              </TextSvg>
            </G>
            <G id="g63" transform="translate(2 410)">
              <Use id="grey100" fill="#fff" href="#box2" />
              <Use id="grey89" x={77} fill="#e3e3e3" href="#box2" />
              <Use id="grey70" x={154} fill="#b2b2b2" href="#box2" />
              <Use id="grey59" x={231} fill="#969696" href="#box2" />
              <Use id="grey41" x={308} fill="#696969" href="#box2" />
              <Use id="grey30" x={385} fill="#4d4d4d" href="#box2" />
              <Use id="grey11" x={462} fill="#1c1c1c" href="#box2" />
              <Use id="grey0" x={539} fill="#000" href="#box2" />
              <TextSvg
                id="txgrey100"
                x={20}
                y={35}
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                100%
              </TextSvg>
              <TextSvg
                id="txgrey89"
                x={102}
                y={35}
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                89%
              </TextSvg>
              <TextSvg
                id="txgrey70"
                x={179}
                y={35}
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                70%
              </TextSvg>
              <TextSvg
                id="txgrey59"
                x={256}
                y={35}
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                59%
              </TextSvg>
              <TextSvg
                id="txgrey41"
                x={333}
                y={35}
                fill="#fff"
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                41%
              </TextSvg>
              <TextSvg
                id="txgrey30"
                x={408}
                y={35}
                fill="#fff"
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                30%
              </TextSvg>
              <TextSvg
                id="txgrey11"
                x={487}
                y={35}
                fill="#fff"
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                11%
              </TextSvg>
              <TextSvg
                id="txgrey0"
                x={569}
                y={35}
                fill="#fff"
                fontFamily="DejaVu Sans, Arial, Helvetica"
                strokeWidth={1}
                style={{ whiteSpace: 'preserve' }}
              >
                0%
              </TextSvg>
            </G>
            <TextSvg
              id="text3446"
              x={90}
              y={184}
              fill="#fff"
              fontSize={180}
              fontFamily="DejaVu Sans, Arial, Helvetica"
              strokeWidth={4}
              style={{ whiteSpace: 'preserve' }}
            >
              TEST
            </TextSvg>
            <TextSvg
              id="text3447"
              x={80}
              y={174}
              fontFamily="DejaVu Sans, Arial, Helvetica"
              strokeWidth={4}
              style={{ whiteSpace: 'preserve' }}
            >
              <TSpan id="tspan3448" x={80} y={174} fontSize={180}>
                TEST
              </TSpan>
            </TextSvg>
          </Svg>
          <Grid>
            <Popover
              anchor={anchorRef}
              id="default-popover"
              open={open}
              sx={{ bgColor: 'red', p: 4 }}
            >
              <Text>The content of the Popover.</Text>
            </Popover>
            <Button
              ref={anchorRef}
              aria-describedby="default-popover"
              type="button"
              onPress={() => setOpen((prevOpen) => !prevOpen)}
            >
              <ButtonLabel>Toggle Popup</ButtonLabel>
            </Button>
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
