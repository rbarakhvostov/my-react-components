# Package with web components

[@rbarakhvostov/my-react-components](https://www.npmjs.com/package/@rbarakhvostov/my-react-components)

## Local script usage

Build the package and serve the generated `dist` directory locally:

```bash
npm run build
npm run serve:dist
```

Then include the self-contained browser bundle from another application:

```html
<script src="http://localhost:4173/index.iife.js"></script>

<react-greeting name="Roman"></react-greeting>
<react-data-fetcher url="https://jsonplaceholder.typicode.com/todos/1"></react-data-fetcher>
```
