import SockJsClient from 'react-stomp';
const SOCKET_URL = 'http://localhost:8080/ws-message';

const SocketConfig = ({onConnected, onMessageReceived}) => {
    return (
      <div>
        <SockJsClient
          url={SOCKET_URL}
          topics={['/topic/message']}
          onConnect={onConnected}
          
          onMessage={msg => onMessageReceived(msg)}
          debug={false}
        />
      </div>
    );
  }
  
  export default SocketConfig;

  /* onDisconnect={console.log("Disconnected!")} */