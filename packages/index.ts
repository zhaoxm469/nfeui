import { App } from 'vue-demi';

import nfeButton from "./components/Button/index";
import { version } from '../package.json'

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

export default { install, version };
