import React, { useEffect, useState } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import './Users.scss';
import { fetchUsers } from '../../fetchers/users';
import { Info } from '../../component/info';
import { User } from '../../component/user';
import { ConfirmationModal } from '../../component/confirmationModal';
import Error from '../../assets/error.svg';

export function Users() {
  const [filters, setFilters] = useState('');
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState({});

  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ['users'],
    () => fetchUsers(filters, deletedUsers),
    {
      staleTime: 3000,
      select: (users) => {
        if (users && users.length)
          return users
            ?.filter((user) => !deletedUsers.includes(user.email)) // deleted users
            .filter((user) =>                                      // filter users
              `${user.firstName}${user.lastName}${user.email}`
                .toLowerCase()
                .includes(filters.toLowerCase())
            );
      },
    }
  );

  const onChange = (e) => {
    setFilters(e.target.value);
    console.log(e.target.value);
  };

  const onRemoveUser = (user) => {
    setUserToDelete(user);
    setIsOpen(true);
  };

  const onModalConfirm = () => {
    setDeletedUsers([...deletedUsers, userToDelete.email]);
    console.log(userToDelete)
    setIsOpen(false);
  };

  return (
    <div className={`users-container ${isLoading ? 'loading' : ''}`}>
      <Info />
      <div className='flex justify-between  my-3'>
        <input
          placeholder='Search members'
          className='border-2 border-grey-500 rounded-lp-2 w-1/2 p-3'
          onChange={onChange}
        />
        <button className='border-2 border-grey-500 rounded-lp-2 p-3'>
          <span className='text-xl decoration-solid'>+</span> Invite people
        </button>
      </div>
      <div className='w-full h-full flex gap-x-8 gap-y-10 ml-0 flex-wrap justify-center'>
        <table className='fixed_header'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              {[1, 2, 3].map((row, index) => (
                <tr className='loading-row'>
                  <td>
                    <span className='avatar' />
                    <span
                      style={{
                        width: `${Math.floor(Math.random() * 100) + 80}px`,
                      }}
                      className='loading-skeleton'
                    />
                  </td>
                  <td>
                    <span
                      style={{
                        width: `${Math.floor(Math.random() * 100) + 80}px`,
                      }}
                      className='loading-skeleton'
                    />
                  </td>
                  <td>
                    <span
                      style={{
                        width: `${Math.floor(Math.random() * 100) + 80}px`,
                      }}
                      className='loading-skeleton'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {data &&
                data.map((user, index) => (
                  <User
                    key={index}
                    user={user}
                    onRemoveUser={() => onRemoveUser(user)}
                  />
                ))}

              {data && data.length === 0 && filters && (
                <span className='block py-5 text-slate-500'>
                  No users found. Try a different search or Invite a Team Member
                </span>
              )}
              {isError && (
                <span className='flex justify-center gap-3 py-5'>
                  <img src={Error} alt='error' /> Something went wrong. Try
                  again
                </span>
              )}
            </tbody>
          )}
        </table>
      </div>
      <ConfirmationModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        onConfirm={onModalConfirm}
      />
    </div>
  );
}
