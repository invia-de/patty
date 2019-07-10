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
    sharedId="004079eafb9d10cbc3f99a381fe6e18edae8389e997b1c0b535de15ffce2eca5"
    loadURL="https://mobileapi.test.invia.lan/dev/ms/v/5/service-wishlist-load"
    saveURL="https://mobileapi.test.invia.lan/dev/ms/v/5/service-wishlist-save"
    agent="ab-in-den-urlaub.de"
    pageSize={5}
  />
</div>
```
