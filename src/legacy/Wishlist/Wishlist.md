```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push = item => console.log('dataLayer push:', item);
```

```jsx
<div style={{ backgroundColor: '#2a4d8f' }}>
  <Wishlist
    link="https://ab-in-den-urlaub.de/merkzettel"
    baseURL="https://ab-in-den-urlaub.de/merkzettel?id="
    saveURL="https://mobileapi.test.invia.lan/dev/ms/v/5/service-wishlist-save"
    agent="ab-in-den-urlaub.de"
    portalName="ab-in-de-urlaub.de"
  />
</div>
```
