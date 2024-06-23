import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DtoDevice } from "../hooks/useAddDevice";
import useFetchDeviceById from "../hooks/useFetchDeviceById";



interface IAddDeviceModalProps {
  open: boolean;
  handleOk(values: DtoDevice): void;
  handleCancel(): void;
  defaultId?: string;
}

function DeviceModal(props: IAddDeviceModalProps) {
  const { open, handleOk, handleCancel: Cancel, defaultId = '' } = props
  const defaultValue = useFetchDeviceById(defaultId);
  const { watch, control, reset, trigger } = useForm<DtoDevice>({
    defaultValues: {
      name: '',
      type: '',
      status: '',
      location: ''
    }
  })

  useEffect(() => {
    if (defaultId !== '') {
      reset(defaultValue.data as DtoDevice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValue)])

  return (
    <>
      <Modal
        title={defaultId ? "Edit Device" : "Create Device"}
        okText="Create"
        cancelText="Cancel"
        destroyOnClose
        open={open}
        onCancel={() => {
          Cancel()
          reset()
        }}
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
          onClick: async () => {
            const triggered = await trigger()
            if (!triggered) return;

            const data = watch();
            handleOk(data)
            reset({})

          }
        }}
      >
        <Controller
          name="name"
          rules={{
            required: true
          }}
          control={control}
          render={({ field, fieldState }) => {
            const errorField = fieldState.error && {
              status: 'error'
            }
            return (
              <Form.Item label="Name" layout="vertical">
                <Input placeholder="Name" {...field} />
              </Form.Item>
            )
          }}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => {
            return (
              <Form.Item label="Type" layout="vertical">
                <Input placeholder="Type" {...field} />
              </Form.Item>
            )
          }}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            return (
              <Form.Item label="Status" layout="vertical">
                <Input placeholder="Status" {...field} />
              </Form.Item>
            )
          }}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => {
            return (
              <Form.Item label="Location" layout="vertical">
                <Input placeholder="Location" {...field} />
              </Form.Item>
            )
          }}
        />
      </Modal>
    </>
  );
}


export default DeviceModal