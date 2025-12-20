export default function Login() {
  return (
    <div className="form-container">
      <h2>Login</h2>

      <form className="form-box">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="btn-primary">Login</button>
      </form>
    </div>
  );
}
