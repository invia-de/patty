```jsx
import mock from '../ServiceBanner/mock.json';
import styles from '../ServiceBanner/ServiceBanner.module.scss';
<ServiceAgentElement
  agent={mock.hotels[0]}
  styles={styles}
  serviceContext={{
    hotelName: 'Iberostar Tunesia',
    promotionalCode: '812934',
    regionName: 'Tunesien',
    tooltipMessage:
      'Ortstarif, Mobilfunk abweichend#LINE_BREAK#(Montag - Sonntag von 8 - 23 Uhr)',
    deviceType: 'phone'
  }}
  step="hotels"
/>;
```
