import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TabParams = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

type RootStackParams = {
  TabsScreen: undefined;
  LoginScreen: undefined;
};

export type RootStackParamList = TabParams & RootStackParams;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileScreen'
>;

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SettingsScreen'
>;
