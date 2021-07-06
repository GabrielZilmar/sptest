import React from 'react';

import {
  Row,
  Col,
  Card,
  Avatar,
  Divider,
  Tooltip,
} from 'antd';

interface IUserCardProps {
  id: number;
  userName: string;
  avatarUrl: string;
  url: string;
  isAdmin: boolean
  loading?: boolean
}

class UserCard extends React.Component<IUserCardProps> {
  state = {
    loading: false,
  }

  render() {
    const {
      id, userName, avatarUrl, url, isAdmin,
    } = this.props;
    const { loading } = this.state;

    return (
      <Card
        loading={loading}
        style={{
          margin: 24,
          borderRadius: 8,
        }}
      >
        <Card.Meta
          avatar={<Avatar src={avatarUrl || ''} />}
          title={userName || ''}
        />
        <Divider />
        <Row gutter={[12, 24]} justify="start">
          <Col span={12} style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>ID: </span>
            <span>{id || ''}</span>
          </Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Perfil Url: </span>
            <span>
              <a
                style={{ overflowWrap: 'break-word' }}
                href={url || '/'}
              >
                <Tooltip title={url}>
                  {`${url.substring(29)}`}
                </Tooltip>
              </a>
            </span>
          </Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Is Admin: </span>
            {isAdmin
              ? <span style={{ color: 'green' }}>YES</span>
              : <span style={{ color: 'red' }}>NO</span>}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default UserCard;
