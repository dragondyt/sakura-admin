// @ts-ignore
import Mongo from 'think-mongo';
import Model from "think-model";
export = [
    Model(think.app),
    Mongo(think.app),
];
