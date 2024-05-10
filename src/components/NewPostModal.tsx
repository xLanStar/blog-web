import { Button, Modal, ModalProps } from "antd";

const NewPostModal: React.FunctionComponent<ModalProps> = (props) => {
  return (
    <Modal {...props}>
      <Button>新增文章</Button>
    </Modal>
  );
};

export default NewPostModal;
