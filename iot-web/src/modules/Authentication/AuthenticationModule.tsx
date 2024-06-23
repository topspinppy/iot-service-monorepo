'use client'

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import AuthenticationForm from "./component/AuthenticationForm";

export default function AuthenticationModule() {
  const data = useAuth()
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const onFinishedForm = async (email: string, password: string) => {
    try {
      await data.login(email, password)
      router.push('/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      } else {
        enqueueSnackbar(error as string, { variant: 'error' })
      }
    }
  }
  return (
    <div>
      <AuthenticationForm
        onFinishedForm={(form) => {
          onFinishedForm(form.email, form.password)
        }}
      />
    </div>
  )
}