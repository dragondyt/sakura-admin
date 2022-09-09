import BaseController from "../../rest";
import * as fs from "fs";
import Git from "../../../utils/git";

const rename = think.promisify(fs.rename, fs);
export default class Upload extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/github`, 'Users');
    }

    protected async postAction(): Promise<void> {
        think.logger.info("测试");
        const {GITHUB_TOKEN, GITHUB_REPO, GITHUB_PATH} = process.env;
        const git = new Git("dragondyt/file", GITHUB_TOKEN);
        let files: any[] = this.file("file[]");
        if (!Array.isArray(files)) {
            files = [files];
        }
        const succMap = {};
        const errFiles: string[] = [];
        await Promise.all(files.map((file) => new Promise<void>((resolve) => {
                // 如果上传的是 png 格式的图片文件，则移动到其他目录
                let type = "file";
                if (file && file.type.startsWith("image")) {
                    type = 'images';
                } else {
                    // todo 以后再细化
                    type = 'file';
                }
                const data: any = fs.readFileSync(file.path);
                try {
                    // todo 可以对文件名入库，判断是否重复
                    git.set(`${type}/${file.name}`, data, {message: '上传' + file.name}).then(() => {
                        succMap[file.name] = `https://cdn.jsdelivr.net/gh/dragondyt/file/${type}/${file.name}`;
                        resolve();
                    });
                } catch (e) {
                    errFiles.push(file.name);
                    think.logger.error("失败: " + e);
                    resolve();
                }
        })));
        return this.json({
                msg: "",
                code: 0,
                data: {
                    errFiles,
                    succMap
                }
            }
        );
    }
}