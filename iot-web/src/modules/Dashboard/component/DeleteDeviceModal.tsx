import { Modal } from 'antd';

interface IDeleteDeviceModalProps {
  handleOk(): void;
  handleCancel(): void;
  open: boolean;
}

function DeleteDeviceModal(props: IDeleteDeviceModalProps) {
  const { open, handleOk, handleCancel } = props
  return (
    <>
      <Modal title="Delete Device?" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>Once you delete the device, it cannot be restored.</p>
      </Modal>
    </>
  );
};

export default DeleteDeviceModal;