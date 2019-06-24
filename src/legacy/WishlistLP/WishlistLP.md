```jsx
<div style={{ width: '100%', backgroundColor: '#EEF5FF', padding: 10 }}>
  <WishlistLP
    updatePrice={item =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(item.price);
        }, Math.floor(Math.random() * 4000 + 1000));
      })
    }
    saveURL="https://mobileapi.test.invia.lan/FFP495/ms/v/5/service-wishlist-save"
  />
</div>
```

For the shared wishlist a `sharedId` has to be passed, which is used to get the
shared wishlist from the backend defined in `loadURL` param.

```jsx
<div style={{ width: '100%', backgroundColor: '#EEF5FF', padding: 10 }}>
  <WishlistLP
    sharedId="34d546ad679e96615ddaf7a9888efd37ca9645896f689b4624124a7b3367f690"
    loadURL="https://mobileapi.test.invia.lan/FFP495/ms/v/5/service-wishlist-load"
    saveURL="https://mobileapi.test.invia.lan/FFP495/ms/v/5/service-wishlist-save"
  />
</div>
```
