import { View } from 'react-native';

interface SpacerProps {
  width?: number;
  height?: number;
}

/**
 * React component to create empty space with customizable width and height.
 * @param width - **number** - Width of the spacer. Default: **0**.
 * @param height - **number** - Height of the spacer. Default: **0**.
 * @returns React.JSX.Element - Empty View Element.
 */

const Spacer = ({ width = 0, height = 0 }: SpacerProps) => {
  return <View style={{ height, width }} />;
};

export default Spacer;
