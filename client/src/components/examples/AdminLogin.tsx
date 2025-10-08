import AdminLogin from '../AdminLogin';

export default function AdminLoginExample() {
  const handleLogin = (username: string, password: string) => {
    console.log('Login attempt:', { username, password });
    alert(`로그인 시도: ${username}`);
  };

  return <AdminLogin onLogin={handleLogin} />;
}
