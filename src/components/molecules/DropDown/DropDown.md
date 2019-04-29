A dropdown consists of a **handler** that opens/closes the dropdown on hover or click.

Simple dropdown that opens/closes on hover:

```jsx
const handler = <div style={{ padding: 6 }}>Hover over me to open/close!</div>;

<DropDown handler={handler} openBackgroundColor="#e2001a">
  <ul style={{ width: 250, color: 'white' }}>
    <li>First element</li>
    <li>Second element</li>
    <li>Third element</li>
    <li>Forth element</li>
  </ul>
</DropDown>;
```

It is possible to define a `openBackgroundColor` which will be applied to the
`handler` and dthe dropdown `content` containers, when the dropdown is open.

Alternatively, the dropdown passes a `isOpen` boolean property to the handler, when the
dropdown gets opened.

The style of handler and content are controlled from outside, as both are passed
as react elements to the `DropDown` container.

With `keepOnClick` it is possible to define that the dropdown should be kept open, even when moving out
with the mouse, if the handler is clicked. To close the dropdown the handler should be clicked again or
click anywhere outside of the dropdown.

It is also possible to align the dropdown to the right border of the handler.

Both examples:

```jsx
const handler = (
  <div style={{ padding: 6 }}>Toggle on hover, keep with a click!</div>
);

<DropDown handler={handler} keepOnClick align="left">
  <ul style={{ width: 250, color: 'blue', backgroundColor: 'grey' }}>
    <li>First element</li>
    <li>Second element</li>
    <li>Third element</li>
    <li>Forth element</li>
  </ul>
</DropDown>;
```

It is also possible to open/close the dropdown with clicks, disabling the hover
completely with `openOnHover={false}`:

```jsx
const handler = <div style={{ padding: 6 }}>Click me to open/close!</div>;

<DropDown
  handler={handler}
  keepOnClick
  openOnHover={false}
  openBackgroundColor="#15cfff"
>
  <ul style={{ width: 250, color: 'white' }}>
    <li>First element</li>
    <li>Second element</li>
    <li>Third element</li>
    <li>Forth element</li>
  </ul>
</DropDown>;
```
