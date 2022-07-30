import * as ThinkJS from '../node_modules/thinkjs';

// 项目 Extend 模块
import './extend/controller';
import './extend/logic';
import './extend/context';
import './extend/think';
import './extend/service';
import './extend/application';
import './extend/request';
import './extend/response';

// 外部 Extend 模块
import 'think-view';
import 'think-model';
import 'think-i18n';
// 更多 extend 模块 参考 [think-awesome](https://github.com/thinkjs/think-awesome)

export const think = ThinkJS.think;