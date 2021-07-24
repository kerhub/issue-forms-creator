## Testing

> Tests should use the following syntax

#### Test name

```
  WHEN <action>
  SHOULD <expectation>
```

#### Callback block

```ts
() => {
  // Given

  // When

  // Then
}
```

#### Complete code sample

```ts
it(`
    WHEN <action>
    SHOULD <expectation>
  `, () => {
  // Given

  // When

  // Then
});
```
