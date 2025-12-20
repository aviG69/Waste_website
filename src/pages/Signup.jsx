export default function Signup() {
  return (
    <div className="form-container">
      <h2>Signup</h2>

      <form className="form-box">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="btn-primary">Signup</button>
      </form>
    </div>
  );
}
