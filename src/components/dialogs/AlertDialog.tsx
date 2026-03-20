import { Component, PropsWithChildren } from 'react';
import {
  Dimensions,
  Modal,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../core/theme/ThemeContext';
import useGlobalStyles from '../../core/theme/useGlobalStyles';

const { width, height } = Dimensions.get('window');

interface AlertDialogProps extends PropsWithChildren {
  mainStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  backgroundTapClose?: boolean;
}

interface AlertDialogManagerProps {}

interface State {
  isVisible: boolean;
  config?: AlertDialogProps;
}

class AlertDialogManager extends Component<AlertDialogManagerProps, State> {
  private static instance: AlertDialogManager | null = null;

  state: State = {
    isVisible: false,
    config: undefined,
  };

  static setInstance(instance: AlertDialogManager) {
    AlertDialogManager.instance = instance;
  }

  static show(config: AlertDialogProps) {
    AlertDialogManager.instance?.setState({
      isVisible: true,
      config,
    });
  }

  static hide() {
    AlertDialogManager.instance?.setState({
      isVisible: false,
    });
  }

  componentDidMount() {
    AlertDialogManager.setInstance(this);
  }

  componentWillUnmount() {
    AlertDialogManager.instance = null;
  }

  handleCancel = () => {
    AlertDialogManager.hide();
  };

  render() {
    const { isVisible, config } = this.state;
    if (!config) {
      return null;
    }

    return (
      <DialogModal
        children={config.children}
        backgroundTapClose={config.backgroundTapClose}
        mainStyle={config.mainStyle}
        modalStyle={config.modalStyle}
        isVisible={isVisible}
        onClose={this.handleCancel}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: width * 0.8,
    maxHeight: height * 0.8,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  childrenContainer: {
    width: '100%',
  },
});

export default AlertDialogManager;

export const AlertDialog = {
  show: (config: AlertDialogProps) => AlertDialogManager.show(config),
  hide: () => AlertDialogManager.hide(),
};

interface DialogModalProps extends PropsWithChildren {
  mainStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  backgroundTapClose?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
}

const DialogModal = ({
  children,
  mainStyle,
  modalStyle,
  backgroundTapClose = false,
  isVisible = false,
  onClose,
}: DialogModalProps) => {
  const globalStyles = useGlobalStyles();
  const { colors } = useAppTheme();
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
        visible={isVisible}
        style={[modalStyle]}
      >
        <TouchableWithoutFeedback
          onPress={backgroundTapClose ? onClose : () => {}}
        >
          <View
            style={[
              styles.mainContainer,
              { backgroundColor: colors.backgroundOpeque },
            ]}
          >
            <TouchableWithoutFeedback>
              <View
                style={[
                  globalStyles.anyContainer,
                  styles.contentContainer,
                  mainStyle,
                ]}
              >
                <View style={[styles.childrenContainer]}>{children}</View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
