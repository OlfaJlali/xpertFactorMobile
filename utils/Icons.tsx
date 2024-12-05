import { IconProp } from '../types/BottomSheetTypes';
import { icons } from 'lucide-react-native';
export default function Icon({ color, size = 16, name, ...rest }: IconProp) {
    const IconComponent = icons[name];
    return <IconComponent color={color} size={size} {...rest} />;
}
  