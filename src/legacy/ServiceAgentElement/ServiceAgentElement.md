```jsx
import mock from '../ServiceBanner/mock.json';
import styles from '../ServiceBanner/ServiceBanner.module.scss';
const serviceContext = {
  hotelName: 'Fancy hotel',
  promotionalCode: 'CODE123',
  regionName: 'Somewhere in the world',
  tooltipMessage:
    'Ortstarif, Mobilfunk abweichend <br> (Montag - Sonntag von 8 - 23 Uhr)',
  deviceType: 'phone'
};
<ServiceAgentElement
  agent={mock.response.agents[0]}
  styles={styles}
  serviceContext={serviceContext}
  step="hotels"
/>;
```
