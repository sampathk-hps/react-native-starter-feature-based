import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useGlobalStyles from '../../../core/theme/useGlobalStyles';
import { useAppTheme } from '../../../core/theme/ThemeContext';
import Spacer from '../../common/Spacer';
import { useTypedTranslation } from '../../../core/localization/useTypedTranslation';
import SuccessIcon from '../../../../assets/icons/Info.svg';
import CloseIcon from '../../../../assets/icons/CloseX.svg';

interface SuccessDialogUIProps {
  title?: string;
  message: string;
  onClose: () => void;
}

const SuccessDialogUI = ({ title, message, onClose }: SuccessDialogUIProps) => {
  const globalStyles = useGlobalStyles();
  const { t } = useTypedTranslation();
  const { colors } = useAppTheme();

  return (
    <View>
      <View style={[styles.titleRow]}>
        <View style={[globalStyles.fullFlex, styles.titleRow]}>
          <SuccessIcon height={16} width={16} color={colors.success} />
          <Spacer width={6} />
          <Text style={[globalStyles.globalText16Dark]}>
            {title ?? t('common.success')}
          </Text>
        </View>

        <TouchableOpacity onPress={onClose}>
          <CloseIcon height={20} width={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      <Spacer height={15} />
      <Text style={[globalStyles.globalText14Dark]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center' },
});

export default SuccessDialogUI;
