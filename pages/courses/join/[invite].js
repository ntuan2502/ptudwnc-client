import React from 'react';
import axios from 'axios';
import { getApiUrl } from '../../../lib/Utils';
import { getSession } from 'next-auth/react';

const JoinCourse = ({ success, error, course }) => {
  if (success) {
    return <div>Success!</div>;
  } else {
    return <div>Error: {error}</div>;
  }
};

export const getServerSideProps = async (ctx) => {
  const _session = await getSession(ctx);
  const inviteCode = ctx.query.invite;
  try {
    const joinCourse = await axios.get(
      `${getApiUrl()}/courses/join/${inviteCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${_session?.jwt}`,
        },
      }
    );
    if (joinCourse.data.success) {
      return {
        // props: {
        //   success: true,
        //   course: joinCourse.data.course,
        // },
        redirect: {
          destination: `/courses/${joinCourse.data.course.slug}`,
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          success: false,
          error: joinCourse.data.message,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return { props: { success: false, error: error } };
  }
};

export default JoinCourse;
