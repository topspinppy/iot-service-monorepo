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


function useEditDevice() {
  const currentQuery = useQueryClient()
  const mutation = useMutation<DtoDevice>({
    mutationFn: (value: any) => {
      return axiosInstance.put(`/api/devices/${value.tempId}`, value.allValue)
    },
    onSettled: () => {
      return currentQuery.invalidateQueries({ queryKey: ['device'] })
    }
  })
  return {
    mutation
  }
}

export default useEditDevice;