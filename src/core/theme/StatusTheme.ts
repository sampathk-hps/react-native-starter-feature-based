import { ColorPalettes } from './ColorPalettes';

type StatusKey = 'all' | 'draft' | 'awaiting';

export interface StatusColorStyle {
  bg: string;
  text: string;
}

export type StatusThemeType = Record<StatusKey, StatusColorStyle>;

export const StatusTheme: StatusThemeType = {
  all: {
    bg: ColorPalettes.gray100,
    text: ColorPalettes.slate900,
  },
  draft: {
    bg: ColorPalettes.gray25,
    text: ColorPalettes.gray700,
  },
  awaiting: {
    bg: ColorPalettes.amber50,
    text: ColorPalettes.amber600,
  },
};
