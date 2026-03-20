import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../core/theme/ThemeContext';

interface Props {
  isVisible: boolean;
}

const LoadingOverlay = ({ isVisible }: Props) => {
  const { colors } = useAppTheme();
  return (
    <Modal transparent animationType="none" visible={isVisible}>
      <View
        style={[styles.overlay, { backgroundColor: colors.backgroundOpeque }]}
      >
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingOverlay;
