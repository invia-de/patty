```jsx
import mock from '../ServiceBanner/mock.json';
import styles from '../ServiceBanner/ServiceBanner.module.scss';
<ServiceAgentElement
  agent={mock.hotels[0]}
  styles={styles}
  serviceContext={{
    hotelName: 'Iberostar Tunesia',
    promotionCode: '812934',
    regionName: 'Tunesien',
    tooltipMessage: 'Ortstarif, Mobilfunk abweichend',
    deviceType: 'phone'
  }}
  step="hotels"
/>;
```
