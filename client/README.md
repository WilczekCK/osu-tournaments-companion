# otc-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### For MaterialVue TS support use this code!
```
declare module 'vue-material/dist/components' {

  import _Vue from "vue";

  // export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
  export function MdMenu(Vue: typeof _Vue, options?: any): void 
  export function MdContent(Vue: typeof _Vue, options?: any): void 
  export function MdTabs(Vue: typeof _Vue, options?: any): void 
}

```