import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../../screens/home/HomeScreen';
import ProfileScreen from '../../../screens/profile/ProfileScreen';
import HomeIcon from '../../../../assets/icons/House.svg';
import HomeOutlineIcon from '../../../../assets/icons/HouseOutline.svg';
import UserIcon from '../../../../assets/icons/User.svg';
import UserCircleIcon from '../../../../assets/icons/UserCircle.svg';
import SettingsIcon from '../../../../assets/icons/Settings.svg';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../NavigationPropTypes';
import { useTypedTranslation } from '../../localization/useTypedTranslation';
import { StringUtils } from '../../../utils/StringUtils';
import useGlobalStyles from '../../theme/useGlobalStyles';
import { useAppTheme } from '../../theme/ThemeContext';
import { ThemeConfiguration } from '../../theme/ThemeConfiguration';
import SettingsScreen from '../../../screens/settings/SettingsScreen';
import { ThemeColors } from '../../theme/ThemeContext';

// ─── Tab label ──────────────────────────────────────────────────────────────

interface TabLabelProps {
  label: string;
  focused: boolean;
  colors: ThemeColors;
  globalText12: object;
}

const TabLabel = ({ label, focused, colors, globalText12 }: TabLabelProps) => (
  <Text style={[globalText12, !focused && { color: colors.gray }]}>
    {StringUtils.capitalizeFirstLetters(label)}
  </Text>
);

// ─── Tab icons ───────────────────────────────────────────────────────────────

interface HomeTabIconProps {
  color: string;
  focused: boolean;
}

const HomeTabIcon = ({ color, focused }: HomeTabIconProps) =>
  focused ? <HomeIcon color={color} /> : <HomeOutlineIcon color={color} />;

interface ProfileTabIconProps {
  color: string;
  focused: boolean;
}

const ProfileTabIcon = ({ color, focused }: ProfileTabIconProps) =>
  focused ? <UserCircleIcon color={color} /> : <UserIcon color={color} />;

interface SettingsTabIconProps {
  color: string;
}

const SettingsTabIcon = ({ color }: SettingsTabIconProps) => (
  <SettingsIcon color={color} />
);

// ─── Navigator ───────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabs = () => {
  const globalStyles = useGlobalStyles();
  const { colors } = useAppTheme();
  const { t } = useTypedTranslation();

  const homeLabel = t('common.home');
  const profileLabel = t('common.profile');
  const settingsLabel = t('common.settings');

  return (
    <>
      <StatusBar
        barStyle={ThemeConfiguration.decideStatusBarStyle(colors.headerBg)}
        backgroundColor={colors.headerBg}
      />
      <View style={styles.flex}>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            tabBarActiveTintColor: colors.primaryColor,
            tabBarLabelStyle: [
              globalStyles.globalText12,
              { fontWeight: '500' },
            ],
            headerTintColor: colors.headerText,
            headerStyle: { backgroundColor: colors.headerBg },
            tabBarStyle: globalStyles.anyContainer,
          }}
        >
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  label={homeLabel}
                  focused={focused}
                  colors={colors}
                  globalText12={globalStyles.globalText12}
                />
              ),
              tabBarIcon: ({ color, focused }) => (
                <HomeTabIcon color={color} focused={focused} />
              ),
              headerShadowVisible: false,
              headerShown: false,
              headerStatusBarHeight: 0,
              title: '',
            }}
          />
          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  label={profileLabel}
                  focused={focused}
                  colors={colors}
                  globalText12={globalStyles.globalText12}
                />
              ),
              tabBarIcon: ({ color, focused }) => (
                <ProfileTabIcon color={color} focused={focused} />
              ),
              headerShown: false,
              title: profileLabel,
            }}
          />
          <Tab.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  label={settingsLabel}
                  focused={focused}
                  colors={colors}
                  globalText12={globalStyles.globalText12}
                />
              ),
              tabBarIcon: ({ color }) => <SettingsTabIcon color={color} />,
              headerShown: false,
              title: settingsLabel,
            }}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default BottomTabs;
