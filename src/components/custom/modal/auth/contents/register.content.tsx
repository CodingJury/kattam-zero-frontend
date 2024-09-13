import { z } from "zod"
import InputField from "../../../../primitives/InputField"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../../primitives/Button";
import { useSetRecoilState } from "recoil";
import { authModalAtom } from "../../../../../atoms/authModalAtom";

const registerSchema = z.object({
  firstName: z.string().min(1, {message: "Please enter your first name"}),
  lastName: z.string().min(1, {message: "Please enter your last name"}),
  email: z.string().min(1, {message: "Please enter the email"}).email("Please enter a valid email"),
  password: z.string().min(1, {message: "Please enter the password"})
})
type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterContent = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const { register, handleSubmit, formState: {errors} } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    mode: "onChange"
  })

  const submitHandler: SubmitHandler<RegisterFormValues> = (data) => {
    console.log(data)
    console.log('Considering you login successfully')
    console.log('Now showing page')
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitHandler)}>
      <InputField
        label="First Name"
        type="text"
        {...register('firstName')}
        placeholder="John"
        error={errors.firstName?.message}
        autoComplete="off"
        required
      />
      <InputField
        label="Last Name"
        type="text"
        {...register('lastName')}
        placeholder="Doe"
        error={errors.lastName?.message}
        autoComplete="off"
        required
      />
      <InputField
        label="Email"
        type="email"
        {...register('email')}
        placeholder="johndoe@gmail.com"
        error={errors.email?.message}
        autoComplete="off"
        required
      />
      <InputField
        label="Password"
        type="password"
        {...register('password')}
        placeholder="********"
        error={errors.password?.message}
        autoComplete="off"
        required
      />
      <Button type="submit" disabled={!!errors.firstName || !!errors.lastName || !!errors.email || !!errors.password}>Register</Button>
      <div className="flex gap-1">
        <Button type="button" onClick={() => setAuthModalState((prev) => ({...prev, type:"login"}))}>Already have an account</Button>
      </div>
    </form>
  )
}

export default RegisterContent