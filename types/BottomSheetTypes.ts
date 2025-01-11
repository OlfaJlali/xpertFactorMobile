import { icons } from 'lucide-react-native';
import { MotiProps } from 'moti';

export type IconNames = keyof typeof icons;

export type TabItem = {
    icon: IconNames;
    label: string;
    component: React.FC; 
};

export type TabsNavigatorProps = {
    data: TabItem[];
    selectedIndex: number;
    onChange: (index: number) => void;
    activeBackgroundColor?: string;
    inactiveBackgroundColor?: string;
    activeColor?: string 
    inactiveColor?: string
    additionalScreens: TabItem[];
    AdditionalSelectedIndex: number;
    onAdditionalChange: (index: number) => void;
};

export type IconProp = {
    name: IconNames;
    color: string;
    size?: number
    
} & MotiProps;
