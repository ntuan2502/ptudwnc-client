import React, { useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { getApiUrl } from '../../../lib/Utils';

const JoinCode = ({ _session }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 8) {
      setError('Invalid code');
      return;
    }
    const res = await axios.get(`${getApiUrl()}/courses/join/${code}`, {
      headers: {
        Authorization: `Bearer ${_session?.jwt}`,
      },
    });
    if (res.data.success) {
      window.location.href = `/courses/${res.data.course._id}`;
    } else {
      setError('Invalid code');
    }
  };

  return (
    <form className="flex justify-center items-center mt-10">
      <input
        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder="Invite code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-8 rounded-r-lg bg-blue-400  text-gray-800 font-bold p-4 uppercase border-blue-500 border-t border-b border-r"
      >
        Join
      </button>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </form>
  );
};

export async function getServerSideProps(ctx) {
  const _session = await getSession(ctx);
  const res = await fetch(getApiUrl('/users/' + _session?.user?._id), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${_session?.jwt}`,
    },
  });
  if (res.ok) {
    const _data = await res.json();
    if (_data.success) {
      return {
        props: { _session, _data },
      };
    } else {
      return {
        props: { _session, _data: null },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }
}

export default JoinCode;
