import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (type: NoticeType, content: string) => {
    messageApi.open({
      type,
      content,
    });
  };

  const success = (content: string = '저장되었습니다') => {
    showMessage('success', content);
  };

  const error = (content: string = '알 수 없는 오류') => {
    showMessage('error', content);
  };

  const info = (content: string = '알림') => {
    showMessage('info', content);
  };

  const warning = (content: string = '경고') => {
    showMessage('warning', content);
  };

  return {contextHolder, success, error, info, warning };
};

export default useMessage;
