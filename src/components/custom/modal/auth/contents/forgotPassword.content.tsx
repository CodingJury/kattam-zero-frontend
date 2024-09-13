import { z } from "zod"
import InputField from "../../../../primitives/InputField"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../../primitives/Button";
import { useSetRecoilState } from "recoil";
import { authModalAtom } from "../../../../../atoms/authModalAtom";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, {message: "Please enter the email"}).email("Please enter a valid email")
})
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordContent = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const { register, handleSubmit, formState: {errors} } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    },
    mode: "onChange"
  })

  const submitHandler: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    console.log(data)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitHandler)}>
      <InputField
        label="Email"
        type="email"
        {...register('email')}
        placeholder="johndoe@gmail.com"
        error={errors.email?.message}
        required
      />
      <Button type="submit" disabled={!!errors.email}>Send Email</Button>
      <div className="flex gap-1">
        <Button type="button" onClick={() => setAuthModalState((prev) => ({...prev, type:"login"}))}>Login</Button>
        <Button type="button" onClick={() => setAuthModalState((prev) => ({...prev, type:"register"}))}>Register</Button>
      </div>
    </form>
  )
}

export default ForgotPasswordContent