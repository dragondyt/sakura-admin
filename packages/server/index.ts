import * as path from "path";
import * as os from "os";
// @ts-ignore
const Loader = require("thinkjs/lib/loader");
import {withAxiom} from "next-axiom";
import Application from "thinkjs3-ts";

export default function Route(configParams: any = {}) {
    const {env, ...config} = configParams;
    const app = new Application({
        ROOT_PATH: __dirname,
        APP_PATH: path.join(__dirname, 'src'),
        RUNTIME_PATH: path.join(os.tmpdir(), 'runtime'),
        proxy: true, // use proxy
        env: env || 'vercel',
    });
    // @ts-ignore
    const loader = new Loader(app.options);
    loader.loadAll('worker');
    return (req: any, res: any) => {
        // tslint:disable-next-line:forin
        for (const k in config) {
            think.config(k, config[k]);
        }
        // @ts-ignore
        return think.beforeStartServer()
            .catch((err: any) => {
                think.logger.error(err);
            })
            .then(() => {
                const callback = think.app.callback();
                return withAxiom(callback(req, res));
            })
            .then(() => {
                think.app.emit('appReady');
            });
    };
}