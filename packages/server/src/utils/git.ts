import axios from 'axios';
import * as path from "path";

export default class Git {
    private readonly repo: string;
    private readonly token: string;

    constructor(repo: string, token: string) {
        this.repo = repo;
        this.token = token;
    }

    async set(filename: string, content: string, {sha}: { sha?: string } = {}) {
        return axios.put('https://api.github.com/repos/' + path.join(this.repo, 'contents', filename), JSON.stringify({
            sha,
            message: 'feat(waline): update comment data',
            content: Buffer.from(content, 'utf-8').toString('base64'),
        }), {
            headers: {
                "Accept": 'application/vnd.github.v3+json',
                "Authorization": 'token ' + this.token,
                'User-Agent': 'Waline',
            }
        });
    }
}