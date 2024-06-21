import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export const actions = [
  {
    position: 1,
    name: 'PostNewItem',
    color: '#020403',
    icon: <FontAwesomeIcon icon="pencil" color="white" size={20} />,
    text: 'Post New Item',
    textColor: 'white',
    textBackground: 'rgba(68, 68, 68, 0)',
    textElevation: 0,
    textStyle: { fontSize: 16, fontWeight: '700' },
  },
  {
    position: 2,
    name: 'ViewPostedItems',
    color: '#020403',
    icon: <FontAwesomeIcon icon="eye" color="white" size={20} />,
    text: 'View Posted Items',
    textColor: 'white',
    textBackground: 'rgba(68, 68, 68, 0)',
    textElevation: 0,
    textStyle: { fontSize: 16, fontWeight: '700' },
  },
];
