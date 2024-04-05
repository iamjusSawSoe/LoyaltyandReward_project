import { Col, Row } from "antd";

const RoleAndPermission = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={10}>
        <div className="card">Role</div>
      </Col>
      <Col span={14}>
        <div className="card">Permission</div>
      </Col>
    </Row>
  );
};

export default RoleAndPermission;
