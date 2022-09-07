import "vditor/dist/index.css";
import React from "react";
import Vditor from "vditor";
import {PageContainer} from "@ant-design/pro-components";
import {Button} from "antd";

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
      }
    });
  }, []);


  function handleSubmit(type: number = 0) {
    try {

    } catch (e) {

    }
    console.log(article)
  }

  return (
    <PageContainer extra={
      [
        <Button key="1" onClick={() => handleSubmit()}>保存草稿</Button>,
        <Button key="2" onClick={() => handleSubmit(0)}>发布文章</Button>,
      ]
    }>
      <div id="vditor" className="vditor"/>
    </PageContainer>
  );
}
export default ArticleCreate
