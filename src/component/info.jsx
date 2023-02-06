import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchUsers } from '../fetchers/users';

export function Info() {
  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ['users'],
    fetchUsers,
    { staleTime: 3000 }
  );
  const users = data;
  console.log('users: ', users);

  const numberOfusersActive = useMemo(
    () => users?.length && users.filter((p) => p.status === 'approved').length
  );
  const numberOfusersPending = useMemo(
    () => users?.length && users.filter((p) => p.status === 'pending').length
  );

  return (
    <div className='mt-6 flex flex-row gap-5 mb-5'>
      <div className='border-2 border-blue-500 rounded-xl px-8 py-4 w-40 flex flex-col'>
        <span className='info-number text-3xl font-bold'>
          {numberOfusersActive}
        </span>
        <span className='text-l font-bold'>Active</span>
      </div>
      <div className='border-2 border-blue-500 rounded-xl px-8 py-4 w-40 flex flex-col'>
        <span className='info-number text-3xl font-bold'>
          {numberOfusersPending}
        </span>
        <span className='text-l font-bold'>Pending</span>
      </div>
    </div>
  );
}
