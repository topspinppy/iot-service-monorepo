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

const fetchData = async (): Promise<DeviceResponse> => {
  const { data: loggedInUser } = await axios.get<DeviceResponse>(`/api/devices`);
  return loggedInUser;
};

function useFetchDevice() {
  const { data } = useQuery({ queryKey: ['device'], queryFn: () => fetchData() })
  return {
    data: data ?? []
  }
}

export default useFetchDevice