import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import { useBuildTimestamp } from 'hooks/use-build-timestamp';
import { useNetworkState } from 'hooks/use-network-state';
import { routes } from 'routes';


export const Settings = () => {
  const buildTime = useBuildTimestamp();
  const networkState = useNetworkState();

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <h1 className="mb-4">
          {routes.get('settings').label}
        </h1>
      </Col>
      <Col xs={12} sm={{ span: 8, offset: 2 }}>
        <Table
          bordered
          hover
          variant="dark"
        >
          <thead>
            <tr>
              <td className="bg-dark" colSpan={2}>
                <strong>Diagnostics</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '1px', whiteSpace: 'nowrap' }}>
                Network Status
              </td>
              <td className={networkState ? 'text-success' : 'text-danger'}>
                {networkState ? 'Online' : 'Offline'}
              </td>
            </tr>
            <tr>
              <td>Build</td>
              <td>
                {buildTime}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
