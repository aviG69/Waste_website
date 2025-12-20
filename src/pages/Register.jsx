export default function Register() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input className="border p-2 w-full mb-3" placeholder="Name" />
      <input className="border p-2 w-full mb-3" placeholder="Email" />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Password"
        type="password"
      />

      <button className="bg-blue-600 text-white w-full p-2 rounded">
        Submit
      </button>
    </div>
  );
}
