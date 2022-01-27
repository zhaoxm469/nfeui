declare module '*.vue' {
    // import { ComponentOptions } from 'vue';
    // const comp: ComponentOptions;
    // export default comp;
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
