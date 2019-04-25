A simple modal that is opened, when someone clicks on the `trigger`.
The modal can be closed either by clicking out of the modal (overlay click)
or pressing the escape button.

```jsx
<Modal
  trigger={
    <button
      style={{ background: '#333', color: '#fff', border: 0, padding: '5px' }}
    >
      Open modal
    </button>
  }
>
  <div style={{ width: 480, height: 60, padding: 20, textAlign: 'center' }}>
    Hello world!
  </div>
</Modal>
```
