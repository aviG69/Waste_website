export default function Community() {
  const users = [
    { name: "Arjun", role: "Member" },
    { name: "Riya", role: "Admin" },
    { name: "Karan", role: "Volunteer" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Community Members</h1>

      <div className="space-y-3">
        {users.map((u, i) => (
          <div key={i} className="p-4 border rounded bg-gray-50">
            <h2 className="font-semibold">{u.name}</h2>
            <p className="text-sm">{u.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
