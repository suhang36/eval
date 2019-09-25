import React from 'react';
import Userlist from '../../component/list/userlist'
import UserAdd from '../../component/add/UserAdd'
import Role from '../../component/list/role'
import Fun from '../../component/list/fun'
import { Row,Col } from 'antd'

class Useradmini extends React.Component {
  render() {
    return (
      <Row>
        <Col style={{ padding: 24, background: '#fff',marginTop:32 }} span={24}>
        <UserAdd></UserAdd>
        <Userlist></Userlist>
        </Col >
        <Col style={{ padding: 24, background: '#fff',marginTop:32 }} span={24}>
        <Role></Role>
        </Col>
        <Col style={{ padding: 24, background: '#fff',marginTop:32 }}  span={24}>
        <Fun></Fun>
        </Col>
      </Row>
    );
  }
}
export default Useradmini  