export default function dashboard() {
    return (ctx: ThinkContext) => {
        ctx.type = 'html';
        ctx.body = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>Sakura Management System</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="${process.env.SAKURA_ADMIN_STYLE_ASSET_URL || '//unpkg.com/@dragondyt/sakura-admin/dist/style.css'}">
  </head>
  <body>
  <div id="app" id="root"></div>
    <script type="module" src="${process.env.SAKURA_ADMIN_JS_ASSET_URL || '//unpkg.com/@dragondyt/sakura-admin'}"></script>
  </body>
</html>`;
    };
}