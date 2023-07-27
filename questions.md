# Questions

### 1. What is the difference between Component and PureComponent? Give an example where it might break my app

`PureComponent` is a version of `Component` that implements `shouldComponentUpdate` comparing state and props so the component will not re-render if none of those have changed.

It can be problematic when the props or state of the component are not primitive values. The `PureComponent` will not trigger a re-render for referenced values if a nested property changes, but the reference is the same.

```tsx
class BadComponent extends PureComponent {
  state = {
    person: { name: 'Alyson' },
  };

  handleInputChange = (e) => {
    const { person } = this.state;
    person.name = e.target.value;
    // person object reference does not change
    this.setState({ person });
  };

  render() {
    const { name } = this.state.person;
    return (
      <div>
        <input value={name} onChange={this.handleInputChange} />
        <p>My name is {name}</p>
      </div>
    );
  }
}
```

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

It is not.

On the legacy Context API, there was a known problem where the implementation of `shouldComponentUpdate` in a component between the context provider and the context consumer could block the propagation of context value changes.

The new Context API has solved this problem for quite some time now.

### 3. Describe 3 ways to pass information from a component to its PARENT

- **Callback prop:** The parent component pass a function to the child component. Then, the child component can invoke the function passing a parameter to be retrieved in the parent.

```tsx
const Child = ({ sendToParent }) => {
  return <button onClick={() => sendToParent(true)}>Click Me</button>;
};

const Parent = () => {
  const receiveFromChild = (value) => {
    console.log(value); // Logs 'true'
  };
  return <Child sendToParent={receiveFromChild} />;
};
```

- **Callback context value:** Similar to the prop, but using the Context API.

```tsx
const MyContext = createContext(() => {});

const Child = () => {
  const sendToParent = useContext(MyContext);
  return <button onClick={() => sendToParent(true)}>Click Me</button>;
};

const Parent = () => {
  const receiveFromChild = (value) => {
    console.log(value); // Logs 'true'
  };
  return (
    <MyContext.Provider value={receiveFromChild}>
      <Child />
    </MyContext.Provider>
  );
};
```

- **React Ref:** The third way is to use in the parent a React Ref modified by a `useImperativeHandler` in the child component.

```tsx
const Child = forwardRef((_, ref) => {
  useImperativeHandle(ref, () => true, []);
  return null;
});

const Parent = () => {
  const childRef = useRef();
  const logChildValue = () => {
    console.log(childRef.current); // Logs 'true'
  };
  return (
    <>
      <button onClick={logChildValue}>Click Me</button>
      <Child ref={childRef} />
    </>
  );
};
```

### 4. Give 2 ways to prevent components from re-rendering

For class components, there's the `shouldComponentUpdate` method.

Re-rendering function components do not necessarily mean performance problems, but if necessary, we can use the `React.memo` to only re-render the component if their props have changed.

```tsx
const Person = ({ person }) => {
  return (
    <h1>
      {person.name} ({person.age})
    </h1>
  );
};

const MemoPerson = React.memo(Person, (prevProps, nextProps) => {
  return (
    prevProps.person.name === nextProps.person.name &&
    prevProps.person.age === nextProps.person.age
  );
});

const App = () => {
  const [, setValue] = useState(false);
  const rerender = () => setValue((v) => !v);
  return (
    <>
      <button onClick={rerender}>Re-render</button>
      <Person person={{ name: 'Alyson', age: 25 }} />
      <MemoPerson person={{ name: 'Jhon', age: 30 }} />
    </>
  );
};
```

In this example, `MemoPerson` is rendered only once, while `Person` is re-rendered on each button click.

### 5. What is a fragment and why do we need it? Give an example where it might break my app

A Fragment is a React component used to group other components without adding unnecessary nodes to the real DOM. It has two notations: the shorthand (`<>...</>`) and the default (`<Fragment>...</Fragment>`).

Although the shorthand syntax of Fragments suits most cases, it does not accept any properties. If Fragments are used as the root node of a rendered list of elements, it is necessary to use the default notation and the `key` prop to avoid potential problems that may occur if the order of the elements in the list changes.

```tsx
const BadComponent = () => {
  return (
    <>
      {[1, 2, 3].map((value) => (
        <>
          <b>Some text</b>
          <p>Item #{value}</p>
        </>
      ))}
    </>
  );
};

const GoodComponent = () => {
  return (
    <>
      {[1, 2, 3].map((value) => (
        <Fragment key={value}>
          <b>Some text</b>
          <p>Item #{value}</p>
        </Fragment>
      ))}
    </>
  );
};
```

### 6. Give 3 examples of the HOC pattern

HOC pattern is used to enhance other components with common logic without the need of duplicating code. Three examples of its usage would be:

- Adding a log of props between re-renders
- Adding auth requirement for a component to render
- Adding a common loading state while the component is mounted

### 7. What's the difference in handling exceptions in promises, callbacks and async…await?

```tsx
const brokenPromise = () => Promise.reject(new Error('something bad happened'));

// ES5 Promises
brokenPromise().catch((e) => {
  console.log('catch', e.message);
});

// async/await
(async () => {
  try {
    await brokenPromise();
  } catch (e) {
    console.log('async/await', e.message);
  }
})();

// Callback
((cb) => {
  try {
    throw new Error('something bad happened');
  } catch (e) {
    cb(e);
  }
})((e) => console.log('callback', e.message));
```

### 8. How many arguments does setState take and why is it async

`setState` accepts two arguments. The first is the new state or a function that returns it. The second argument is a callback executed when the state change action is dispatched.

The `setState` is asynchronous because React group its executions in a render and dispatches them together so it can perform the render cycles more efficiently.

### 9. List the steps needed to migrate a Class to Function Component

All functionalities and behaviors in class components have a counterpart in function components. A list of steps to migrate from class to function would be:

- Change class notation to a function notation
- Convert the JSX in the render method to the return of the function
- Migrate usage of `this.props` to variables destructured from the function's parameter
- Migrate each state's property to `useState` and each state update to its related set function
- Adapt `componentDidMount` and `componentDidUpdate` to `useEffect`'s body
- Adapt `componentWillUnmount` to `useEffect`'s return
- If needed, adapt `componentShouldUpdate` to `React.memo`

### 10. List a few ways styles can be used with components

Inline styles

```tsx
const MyComponent = () => {
  return <h1 style={{ color: 'red' }}>Hello World</h1>;
};
```

className property

```tsx
// style.css
.title {
  color: red;
}

// MyComponent.jsx
const MyComponent = () => {
  return <h1 className="title">Hello World</h1>;
};
```

CSS-in-JS

```tsx
const MyComponent = () => {
  const Title = styled.h1`
    color: red;
  `;
  return <Title>Hello World</Title>;
};
```

### 11. How to render an HTML string coming from the server

The **proper** way to render an HTML string from the server is to sanitize its content first, then use the `dangerouslySetInnerHTML` property from the built-in HTML components.

```tsx
const SANITIZED_HTML = `<h1>Hello World</h1>`;

const MyComponent = () => {
  return <div dangerouslySetInnerHTML={{ __html: SANITIZED_HTML }}></div>;
};
```
