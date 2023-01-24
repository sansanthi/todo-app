const Login = () => {
  return (
    <main className="login-page">
      <div className="login">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <div className="submit-btn">
          <button className="btn-login">Sign in</button>
        </div>
      </div>
    </main>
  );
};
export default Login;
