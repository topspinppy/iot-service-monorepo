'use client'

import { Button } from "antd"
import { useState } from "react"
import DeviceModal from "./component/DeviceModal"
import TableDashboard from "./component/TableDashboard"
import useAddDevice from "./hooks/useAddDevice"
import useFetchDevice from "./hooks/useFetchDevice"

export default function DashboardModule() {
  const { data } = useFetchDevice()
  const { mutation } = useAddDevice()
  const [openAddDeviceModal, setOpenAddDeviceModal] = useState(false)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', width: '100%' }}>
        <Button type="primary" onClick={() => { setOpenAddDeviceModal(true) }}>
          Create Device
        </Button>
      </div>

      <TableDashboard dataSource={data ?? []} />

      <DeviceModal
        open={openAddDeviceModal}
        handleOk={(value) => {
          mutation.mutate(value as any)
          setOpenAddDeviceModal(false)
        }}
        handleCancel={() => {
          setOpenAddDeviceModal(false)
        }}
      />
    </div>
  )
}