import React from 'react';

import {
  Card,
  Divider,
  Avatar,
  notification,
  Row,
  Col,
} from 'antd';
import UserRepos from '../userRepos';

import apiGit from '../../../../service/api/apiGit';

import { IUserDetails } from '../../../../types/github';

interface IUserDetailProps {
  login: string;
  avatar: string;
  loading: boolean
}

interface IUserDetailState {
  user: IUserDetails | undefined;
  loading: boolean;
}

class UserDetail extends React.Component<IUserDetailProps> {
  state: IUserDetailState = {
    user: undefined,
    loading: this.props.loading || false,
  }

  componentDidMount() {
    const { login } = this.props;
    const { user } = this.state;

    if (!user) {
      if (login) {
        this.handleUser(login);
      }
    }
  }

  handleUser = async (login: string) => {
    this.setState({ loading: true });

    const response = await apiGit.getUser(login);
    if (response?.data.id) {
      this.setState({ user: response.data });
    } else {
      notification.error({
        message: 'Request failed!',
        description: response?.data?.message,
      });
    }
    this.setState({ loading: false });
  };

  render() {
    const { login, avatar } = this.props;
    const { loading, user } = this.state;

    return (
      <Card
        loading={loading}
        style={{
          margin: 24,
          borderRadius: 8,
          overflow: 'auto',
        }}
      >
        <Card.Meta
          avatar={<Avatar src={avatar || ''} />}
          title={login || ''}
          description={user?.bio || ''}
        />
        <Divider />
        <Row gutter={[12, 24]} justify="start">
          <Col span={12} style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Name: </span>
            <span>{user?.name || ''}</span>
          </Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Email: </span>
            <span>{user?.email || ''}</span>
          </Col>
        </Row>
        <Row gutter={[12, 24]} justify="start">
          <Col span={12} style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Location: </span>
            <span>{user?.location || ''}</span>
          </Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Company: </span>
            <span>{user?.company || ''}</span>
          </Col>
        </Row>
        <Row gutter={[12, 24]} justify="start">
          <Col span={24} style={{ textAlign: 'left' }}>
            <UserRepos
              login={login}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default UserDetail;
