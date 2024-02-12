import SignUp from "./Singup";
import SignIn from "./Singin";
export type AuthFormProps = {
  user: boolean;
};
export const AuthForm = (props: AuthFormProps) => {
  return !props.user ? <SignUp /> : <SignIn />;
};
