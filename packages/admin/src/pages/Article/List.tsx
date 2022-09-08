import React from "react";
import {PageContainer, ProCard, ProTable} from "@ant-design/pro-components";
import {Avatar, Tag} from "antd";

const ArticleList: React.FC = () => {
  const columns: any[] = [
    {
      title: '标题',
      width: 120,
      dataIndex: 'title',
    }, {
      title: '作者',
      width: 80,
      dataIndex: 'author',
    },
    {
      title: '关键字',
      width: 80,
      dataIndex: 'keyword',
      render: (arr: string[]) => (
        <span>
              {arr.map(item => (
                <span color="magenta" key={item}>
                  {item}
                </span>
              ))}
            </span>
      )
    }, {
      title: '封面图',
      width: 50,
      dataIndex: 'img_url',
      render: (val: string) => <Avatar shape="square" src={val} size={40} icon="user"/>,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: 60,
      render: (arr: any[]) => (
        <span>
              {arr.map(item => (
                <Tag color="cyan" key={item.id}>
                  {item.name}
                </Tag>
              ))}
            </span>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 70,
      render: (arr: any[]) => (
        <span>
              {arr.map(item => (
                <Tag color="blue" key={item.id}>
                  {item.name}
                </Tag>
              ))}
            </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 70,
      render: (val: number): any => {
        // 文章发布状态 => 0 草稿，1 已发布
        if (val === 0) {
          return <Tag color="red">草稿</Tag>;
        }
        if (val === 1) {
          return <Tag color="green">已发布</Tag>;
        }
      },
    },
  ]
  return (
    <PageContainer>
      <ProCard>
        <ProTable columns={columns}>

        </ProTable>
      </ProCard>
    </PageContainer>);
}
export default React.memo(ArticleList);
