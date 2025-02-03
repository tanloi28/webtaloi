import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../interfaces/User";
import { loginSchema, registerSchema } from "../../schemas/authSchema";
import instance from "../../apis";

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const { login: contextLogin } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: User) => {
    try {
      if (isLogin) {
        const res = await instance.post(`/users/login`, data);
        contextLogin(res.data.accessToken, res.data.user);
      } else {
        const res = await instance.post(`/users/register`, { 
          email: data.email, 
          password: data.password,
          confirmPassword: data.confirmPassword 
        });
        alert(res.data.message);
      }
    } catch (error: any) {
      console.log(error.response?.data); // In ra chi tiết phản hồi từ server
      alert(error.response?.data?.message || "Đã xảy ra lỗi!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" {...register("email", { required: true })} />
        {errors.email && <span className="text-danger">{errors.email.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
        <input type="password" className="form-control" {...register("password", { required: true })} />
        {errors.password && <span className="text-danger">{errors.password.message}</span>}
      </div>

      {!isLogin && (
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Xác Nhận Mật Khẩu
          </label>
          <input type="password" className="form-control" {...register("confirmPassword", { required: true })} />
          {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
        </div>
      )}
      <button className="btn btn-success">{isLogin ? "Đăng Nhập" : "Đăng Ký"}</button>
      {isLogin ? <Link to="/register">Đăng Ký</Link> : <Link to="/login">Đăng Nhập</Link>}
    </form>
  );
};

export default AuthForm;
