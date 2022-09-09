import "vditor/dist/index.css";
import React from "react";
import Vditor from "vditor";
import {PageContainer} from "@ant-design/pro-components";
import { Button, notification } from 'antd';
import {saveArticle} from "@/services/ant-design-pro/article";

const ArticleCreate: React.FC = () => {
  const [,setVd] = React.useState<Vditor>();
  const [article, setArticle] = React.useState({
    content: '',
  })
  React.useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue("");
        setVd(vditor);
        vditor.focus()
      },
      input(value: string) {
        setArticle({
          content: value
        })
      },
      upload: {
        url: "/v1/file/upload"
      }
    });
  }, []);


  function handleSubmit(type: number = 0) {
    try {
      saveArticle({
        content: article.content
      }).then(res=>{
        if (res.status === 'ok') {
          notification.success({
            message: res.message,
          });
        } else {
          notification.error({
            message: res.message,
          });
        }
      })
    } catch (e) {

    }
    console.log(article)
  }

  return (
    <PageContainer extra={
      [
        <Button key="1" onClick={() => handleSubmit(1)}>保存草稿</Button>,
        <Button key="2" onClick={() => handleSubmit(0)}>发布文章</Button>,
      ]
    }>
      <div id="vditor" className="vditor"/>
    </PageContainer>
  );
}
export default ArticleCreate
