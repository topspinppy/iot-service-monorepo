import { Space, Table } from 'antd';
import { useState } from 'react';
import useDeleteDevice from '../hooks/useDeleteDevice';
import useEditDevice from '../hooks/useEditDevice';
import { DeviceResponse } from '../hooks/useFetchDevice';
import DeleteDeviceModal from './DeleteDeviceModal';
import DeviceModal from './DeviceModal';


interface ITableDashboardProps {
  dataSource: DeviceResponse
}

function TableDashboard(props: ITableDashboardProps) {
  const { dataSource } = props
  const { mutation } = useDeleteDevice()
  const { mutation: mutationEdit } = useEditDevice()
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [tempId, setTempId] = useState<string>('');

  return (
    <>
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: 'Location',
            key: 'location',
            dataIndex: 'location',
            render: (data) => {
              return (
                <>
                  {data}
                </>
              )
            }
          },
          {
            title: 'Action',
            key: 'action',
            render: (data) => (
              <Space size="middle">
                <a
                  onClick={() => {
                    setIsModalEditOpen(true)
                    setTempId(data['_id']);
                  }}
                >Edit</a>
                <a
                  onClick={() => {
                    setIsModalDeleteOpen(true)
                    setTempId(data['_id']);
                  }}
                >
                  Delete
                </a>
              </Space >
            ),
          },
        ]}
        dataSource={dataSource}
      />

      <DeleteDeviceModal
        open={isModalDeleteOpen}
        handleOk={async () => {
          mutation.mutate(tempId as any)
          setIsModalDeleteOpen(false);
          setTempId('')
        }}
        handleCancel={() => {
          setIsModalDeleteOpen(false);
          setTempId('')
        }}
      />

      <DeviceModal
        open={isModalEditOpen}
        defaultId={tempId}
        handleOk={async (value) => {
          mutationEdit.mutate({ tempId, allValue: value } as any)
          setIsModalEditOpen(false)
          setTempId('')
        }}
        handleCancel={() => {
          setIsModalEditOpen(false)
          setTempId('')
        }}
      />
    </>
  )
}

export default TableDashboard