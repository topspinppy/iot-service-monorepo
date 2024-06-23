import axiosInstance from "@/utils/axios";
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export type DeviceResponse = AddDevice[]

export interface AddDevice {
  _id: string
  name: string
  type: string
  status: string
  location: string
  createdAt: string
  updatedAt: string
}

export interface DtoDevice {
  name: string
  type: string
  status: string
  location: string
}


function useAddDevice() {
  const currentQuery = useQueryClient()
  const mutation = useMutation<DtoDevice>({
    mutationFn: (value) => {
      return axiosInstance.post('/api/devices', value)
    },
    onSettled: () => {
      return currentQuery.invalidateQueries({ queryKey: ['device'] })
    }
  })
  return {
    mutation
  }
}

export default useAddDevice;