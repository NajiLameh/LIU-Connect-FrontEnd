import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FloatingAction } from 'react-native-floating-action';

export default function FloatingButton({ actions, executeAction }) {
  return (
    <FloatingAction
      actions={actions}
      color="#020403"
      overlayColor="rgba(68, 68, 68, 0.6)"
      distanceToEdge={10}
      shadow={{
        shadowOpacity: 0.1,
        shadowColor: '#8B8B8B',
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 0,
      }}
      onPressItem={(name) => {
        executeAction(name);
      }}
    />
  );
}
