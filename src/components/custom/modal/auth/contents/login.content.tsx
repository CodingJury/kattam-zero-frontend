import { z } from "zod"
import InputField from "../../../../primitives/InputField"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../../primitives/Button";
import { useSetRecoilState } from "recoil";
import { authModalAtom, defaultAuthModalState } from "../../../../../atoms/authModalAtom";
import { userAtom, defaultUserState } from "../../../../../atoms/userAtom";

const loginSchema = z.object({
  email: z.string().min(1, {message: "Please enter the email"}).email("Please enter a valid email"),
  password: z.string().min(1, {message: "Please enter the password"})
})
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginContent = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const setUserModalState = useSetRecoilState(userAtom)
  const { register, handleSubmit, formState: {errors} } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  })

  const submitHandler: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data)
    console.log('Simulating the login')
    setUserModalState((prev) => ({...prev, ...defaultUserState.USER}))
    setAuthModalState((prev) => ({...prev, ...defaultAuthModalState.CLOSE}))
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
      <InputField
        label="Password"
        type="password"
        {...register('password')}
        placeholder="********"
        error={errors.password?.message}
        required
      />
      <Button type="submit" disabled={!!errors.email || !!errors.password}>Login</Button>
      <div className="flex gap-1">
        <Button type="button" onClick={() => setAuthModalState((prev) => ({...prev, type:"register"}))}>Register</Button>
        <Button type="button" onClick={() => setAuthModalState((prev) => ({...prev, type:"forgotPassword"}))}>Forgot Password</Button>
      </div>
    </form>
  )
}

export default LoginContent