import { Col, Row, TabPane } from 'react-bootstrap';
import ChatItem from './ChatItem';
const MessagesPane = ({
  chats
}) => {
  return <TabPane eventKey="Messages" className="fade" role="tabpanel">
      <Row>
        <Col>
          {chats?.map(chat => <ChatItem key={chat.id} id={chat?.subadmin?.id} name={chat?.subadmin?.fname} image={chat?.subadmin?.image} />)}
        </Col>
      </Row>
    </TabPane>;
};
export default MessagesPane;