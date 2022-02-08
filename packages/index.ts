import { App } from 'vue';


import nfeButton from "./components/Button/index";

import nfeForm from "./components/Form/index";



import useForm from "./components/Form/src/useForm";


function install(app: App) {
    const packages = [nfeButton,nfeForm];
    packages.forEach((item: any) => {
        if (item.install) {
            app.use(item);
        } else if (item.name) {
            app.component(item.name, item);
        }
    });
}
export { install, nfeButton,nfeForm, useForm };

export default { install, version: '0.0.1' };
