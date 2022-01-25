import { App } from 'vue';

import nfeButton from "./components/Button/index";

function install(app: App) {
    const packages = [nfeButton];
    packages.forEach((item: any) => {
        if (item.install) {
            app.use(item);
        } else if (item.name) {
            app.component(item.name, item);
        }
    });
}
export { install, nfeButton };

export default { install, version: '0.0.1' };
