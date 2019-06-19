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
  />
</div>
```
