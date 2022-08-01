import { log } from 'next-axiom';
import {Logger} from "thinkjs";
export default class Axiom implements Logger {
    config: object;
    constructor(config: object) {
        this.config = config;
    }
    info(msg: string) {
        log.info(msg);
    }
    error(msg: string) {
        log.error(msg);
    }
    debug(msg: string) {
        log.debug(msg);
    }
    warn(msg: string) {
        log.warn(msg);
    }
    trace(msg: string) {
        log.debug(msg);
    }
}