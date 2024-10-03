import type { Meta, StoryObj } from '@storybook/react';
import {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
  Svg,
  Text,
  TSpan,
  Use,
} from './components';

const meta = {
  title: 'Svg',
  component: Svg,
} satisfies Meta<typeof Svg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Svg {...args} viewBox="0 0 620 472" xmlns="http://www.w3.org/2000/svg">
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
        <Text
          id="green100"
          x={30}
          y={35}
          fill="#fff"
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          0.59
        </Text>
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
        <Text
          id="red100"
          x={20}
          y={35}
          fill="#fff"
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          +0.30
        </Text>
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
        <Text
          id="blue100"
          x={20}
          y={35}
          fill="#fff"
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          +0.11
        </Text>
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
        <Text
          id="txgrey100"
          x={20}
          y={35}
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          100%
        </Text>
        <Text
          id="txgrey89"
          x={102}
          y={35}
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          89%
        </Text>
        <Text
          id="txgrey70"
          x={179}
          y={35}
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          70%
        </Text>
        <Text
          id="txgrey59"
          x={256}
          y={35}
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          59%
        </Text>
        <Text
          id="txgrey41"
          x={333}
          y={35}
          fill="#fff"
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          41%
        </Text>
        <Text
          id="txgrey30"
          x={408}
          y={35}
          fill="#fff"
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          30%
        </Text>
        <Text
          id="txgrey11"
          x={487}
          y={35}
          fill="#fff"
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          11%
        </Text>
        <Text
          id="txgrey0"
          x={569}
          y={35}
          fill="#fff"
          fontFamily="DejaVu Sans, Arial, Helvetica"
          strokeWidth={1}
          style={{ whiteSpace: 'preserve' }}
        >
          0%
        </Text>
      </G>
      <Text
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
      </Text>
      <Text
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
      </Text>
    </Svg>
  ),
  args: {
    height: 472,
    id: 'svg2',
    width: 620,
  },
};

export const circle: Story = {
  render: (args) => (
    <Svg {...args} xmlns="http://www.w3.org/2000/svg">
      <Circle cx={50} cy={50} r={40} stroke="green" strokeWidth={4} fill="#00f" />
    </Svg>
  ),
  args: {
    height: 100,
    width: 100,
  },
};

export const Rectangle: Story = {
  render: (args) => (
    <Svg {...args} xmlns="http://www.w3.org/2000/svg">
      <Rect x={10} y={10} width={200} height={100} stroke="#f00" strokeWidth={6} fill="#00f" />
    </Svg>
  ),
  args: {
    height: 120,
    width: 400,
  },
};

export const RectangleWithOpacityAndRoundedCorners: Story = {
  render: (args) => (
    <Svg {...args} xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={50}
        y={20}
        rx={20}
        ry={20}
        width={150}
        height={150}
        style={{ fill: '#f00', stroke: '#000', strokeWidth: 5, opacity: 0.5 }}
      />
    </Svg>
  ),
  args: {
    height: 180,
    width: 400,
  },
};

export const Star: Story = {
  render: (args) => (
    <Svg {...args} xmlns="http://www.w3.org/2000/svg">
      <Polygon
        points="100,10 40,198 190,78 10,78 160,198"
        style={{ fill: 'lime', stroke: 'purple', strokeWidth: 5, fillRule: 'evenodd' }}
      />
    </Svg>
  ),
  args: {
    height: 200,
    width: 300,
  },
};

export const GradientEllipseAndText: Story = {
  render: (args) => (
    <Svg {...args} xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <LinearGradient id="grad1">
          <Stop offset="0%" stopColor="#ff0" />
          <Stop offset="100%" stopColor="#f00" />
        </LinearGradient>
      </Defs>
      <Ellipse cx={100} cy={70} rx={85} ry={55} fill="url(#grad1)" />
      <Text fill="#fff" fontSize={45} fontFamily="Verdana" x={50} y={86}>
        SVG
      </Text>
    </Svg>
  ),
  args: {
    height: 130,
    width: 500,
  },
};
