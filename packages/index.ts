import { App } from 'vue';
import nfButton from './components/button/index';

function install(app: App) {
    const packages = [nfButton];
    packages.forEach((item: any) => {
        if (item.install) {
            app.use(item);
        } else if (item.name) {
            app.component(item.name, item);
        }
    });
}
export default { install, version: '0.0.1' };
