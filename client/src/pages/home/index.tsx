import React from 'react';

import {
  Row,
  Col,
  Card,
  List,
  notification,
  Button,
  Space,
} from 'antd';
import apiGit from '../../service/api/apiGit';

import UserCard from './components/userCard';

import { IUser } from '../../types/github';

interface IHomeState {
  users: IUser[] | undefined;
  loading: boolean
  since: number;
}

class Home extends React.Component {
  state: IHomeState = {
    users: undefined,
    loading: false,
    since: 0,
  }

  componentDidMount() {
    const { users } = this.state;

    if (!users) {
      this.handleUsers(0, 4);
    }
  }

  handleUsers = async (since: number, perPage: number) => {
    this.setState({ loading: true });

    const response = await apiGit.listUsers(since, perPage);
    if (response?.data.length > 0) {
      this.setState({ users: response.data });
    } else {
      notification.error({
        message: 'Request failed!',
        description: response?.data?.message,
      });
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, users, since } = this.state;

    return (
      <>
        <Row
          justify="center"
          align="middle"
          style={{
            textAlign: 'center',
            height: '100vh',
            width: '100vw',
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
              title="Github Users"
              style={{
                margin: 24,
                borderRadius: 8,
                height: '80vh',
                overflow: 'auto',
                minWidth: 230,
              }}
              bordered={false}
            >
              <List
                grid={{
                  gutter: 22,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 2,
                  xxl: 2,
                }}
                size="small"
                dataSource={users}
                style={{
                  textAlign: 'center',
                }}
                renderItem={(item: IUser) => (
                  <List.Item>
                    <UserCard
                      id={item.id}
                      userName={item.login}
                      avatarUrl={item.avatar_url}
                      url={item.url}
                      isAdmin={item.site_admin}
                    />
                  </List.Item>
                )}
              />
              <Space>
                <Button
                  disabled={since < 1}
                  onClick={() => {
                    if (since >= 1) {
                      const newSince = since - 1;
                      this.setState({ since: newSince });
                      this.handleUsers(newSince, 4);
                    }
                  }}
                >
                  Previus
                </Button>
                <Button
                  onClick={() => {
                    const newSince = since + 1;
                    this.setState({ since: newSince });
                    this.handleUsers(newSince, 4);
                  }}
                >
                  Next
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Home;
