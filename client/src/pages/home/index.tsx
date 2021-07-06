import React from 'react';

import {
  Row,
  Col,
  Card,
} from 'antd';

interface IHomeState {
  loading: boolean
}

class Home extends React.Component {
  state: IHomeState = {
    loading: false,
  }

  render() {
    const { loading } = this.state;

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
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Home;
