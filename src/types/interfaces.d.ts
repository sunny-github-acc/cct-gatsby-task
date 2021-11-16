export interface Theme {
  colors?: {
    primary: string;
    secondary: string;
    tertiary: string;
    white: string;
    grey: string;
    darkGrey: string;
    black: string;
  };
  fontSize?: {
    medium: string;
    big: string;
    large: string;
  };
  fontWeight?: {
    bold: string;
  };
  lineHeight?: {
    small: string;
    medium: string;
    big: string;
    large: string;
  };
}

export type TODO = TODOItem[];

interface TODOItem {
  number: number;
  task: string;
  subTasks: string[];
}
