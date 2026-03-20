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
import { PropsWithChildren } from 'react';
import useGlobalStyles from '../../core/theme/useGlobalStyles';

const { width, height } = Dimensions.get('window');

interface CustomDialogProps extends PropsWithChildren<{}> {
  isVisible?: boolean;
  onClose?: () => void;
  mainStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  backgroundTapClose?: boolean;
}

/**
 * React component to display a custom dailog.
 * @param children - **React.ReactNode** - The content to be displayed inside the dailog.
 * @param isVisible - **boolean** - Whether the dailog is visible or not. Default: **false**.
 * @param onClose - **() => void** - Function to be called when the dailog is closed.
 * @param mainStyle - **StyleProp<ViewStyle>** - Style for the main content container.
 * @param modalStyle - **StyleProp<ViewStyle>** - Style for the model container.
 * @param backgroundTapClose - **boolean** - Whether tapping on the background should close the dialog. Default: **false**.
 * @returns React.JSX.Element - Customised Dailog Element.
 */
const CustomDialog = ({
  children,
  isVisible = false,
  onClose,
  mainStyle,
  modalStyle,
  backgroundTapClose = false,
}: CustomDialogProps) => {
  const globalStyles = useGlobalStyles();
  const { colors } = useAppTheme();
  return (
    <View style={[]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
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
                {children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

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
    elevation: 5,
    alignItems: 'center',
  },
});

export default CustomDialog;
