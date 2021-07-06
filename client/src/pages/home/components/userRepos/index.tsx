import React from 'react';

import {
  Card,
  List,
  notification,
  Row,
  Col,
  Divider,
} from 'antd';

import apiGit from '../../../../service/api/apiGit';

import { IUserRepos } from '../../../../types/github';

interface IUserReposProps {
  login: string;
  loading: boolean
}

interface IUserDetailState {
  repos: IUserRepos[] | undefined;
  loading: boolean;
}

class UserDetail extends React.Component<IUserReposProps> {
  state: IUserDetailState = {
    repos: undefined,
    loading: this.props.loading || false,
  }

  componentDidMount() {
    const { login } = this.props;
    const { repos } = this.state;

    if (!repos || repos?.length === 0) {
      if (login) {
        this.handleRepos(login);
      }
    }
  }

  handleRepos = async (login: string) => {
    this.setState({ loading: true });

    const response = await apiGit.getRepos(login);
    if (response?.data.length > 0) {
      this.setState({ repos: response.data });
    } else {
      notification.error({
        message: 'Request failed!',
        description: response?.data?.message,
      });
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, repos } = this.state;

    return (
      <Row
        justify="center"
        align="middle"
        style={{
          textAlign: 'center',
        }}
      >
        <Col
          span={24}
          style={{
            alignItems: 'center',
          }}
        >
          <Card
            loading={loading}
            title="User Repos"
            style={{
              margin: 24,
              borderRadius: 8,
              overflow: 'auto',
              minWidth: 280,
            }}
            bordered={false}
          >
            <List
              grid={{
                gutter: 16,
                column: 1,
              }}
              size="small"
              dataSource={repos}
              style={{
                textAlign: 'center',
              }}
              pagination={{
                pageSize: 4,
              }}
              renderItem={(item: IUserRepos) => (
                <List.Item>
                  <Card
                    loading={loading}
                    style={{
                      margin: 24,
                      borderRadius: 8,
                    }}
                    hoverable
                    onClick={() => {
                      window.open(item.html_url, '_blank');
                    }}
                  >
                    <Card.Meta
                      title={item?.name || ''}
                      description={item?.description || ''}
                    />
                    <Divider />
                    <Row gutter={[12, 24]} justify="start">
                      <Col span={12} style={{ textAlign: 'left' }}>
                        <span style={{ fontWeight: 'bold' }}>Homepage: </span>
                        <span>{item?.homepage || ''}</span>
                      </Col>
                      <Col span={12} style={{ textAlign: 'left' }}>
                        <span style={{ fontWeight: 'bold' }}>Language: </span>
                        <span>{item?.language || ''}</span>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default UserDetail;
