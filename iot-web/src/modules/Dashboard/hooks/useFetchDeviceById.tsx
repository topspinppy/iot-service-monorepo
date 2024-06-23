import axios from "@/utils/axios";
import {
  useQuery,
} from '@tanstack/react-query';

export type DeviceResponse = Device[]

export interface Device {
  _id: string
  name: string
  type: string
  status: string
  location: string
  createdAt: string
  updatedAt: string
}

const fetchData = async (deviceId: string): Promise<DeviceResponse> => {
  const { data: loggedInUser } = await axios.get<DeviceResponse>(`/api/devices/${deviceId}`);
  return loggedInUser;
};

function useFetchDeviceById(deviceId: string) {
  const { data } = useQuery({ queryKey: ['device', deviceId], queryFn: () => fetchData(deviceId) })
  return {
    data: data ?? {}
  }
}

export default useFetchDeviceById