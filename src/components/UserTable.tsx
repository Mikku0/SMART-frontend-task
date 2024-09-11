import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, setFilter } from '../store/userSlice';
import { AppDispatch, RootState } from '../store/store';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filter } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof filter) => {
    dispatch(setFilter({ [field]: e.target.value }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.name.toLowerCase()) &&
    user.username.toLowerCase().includes(filter.username.toLowerCase()) &&
    user.email.toLowerCase().includes(filter.email.toLowerCase()) &&
    user.phone.toLowerCase().includes(filter.phone.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={filter.name}
        onChange={(e) => handleFilterChange(e, 'name')}
      />
      <input
        type="text"
        placeholder="Search by username"
        value={filter.username}
        onChange={(e) => handleFilterChange(e, 'username')}
      />
      <input
        type="text"
        placeholder="Search by email"
        value={filter.email}
        onChange={(e) => handleFilterChange(e, 'email')}
      />
      <input
        type="text"
        placeholder="Search by phone"
        value={filter.phone}
        onChange={(e) => handleFilterChange(e, 'phone')}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
