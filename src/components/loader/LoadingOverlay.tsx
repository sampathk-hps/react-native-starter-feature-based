import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

interface Props {
  isVisible: boolean;
}

const LoadingOverlay = ({ isVisible }: Props) => {
  return (
    <Modal transparent animationType="none" visible={isVisible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingOverlay;
