import axiosInstance from "@/utils/axios";
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';


export interface DeleteDevice {
  _id: string
  name: string
  type: string
  status: string
  location: string
  createdAt: string
  updatedAt: string
}

interface DtoDevice {
  name: string
  type: string
  status: string
  location: string
}


function useDeleteDevice() {
  const currentQuery = useQueryClient()
  const mutation = useMutation<DtoDevice>({
    mutationFn: (value) => {
      return axiosInstance.delete(`/api/devices/${value}`)
    },
    onSettled: () => {
      return currentQuery.invalidateQueries({ queryKey: ['device'] })
    }
  })
  return {
    mutation
  }
}

export default useDeleteDevice;