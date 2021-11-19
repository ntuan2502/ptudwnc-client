import Head from "next/head";
import Image from "next/image";
import AddModal from "../../components/Course/AddModal";
import CourseCard from "../../components/Course/Card";
import { getSession } from "next-auth/react";
import { getApiUrl } from "../../lib/Utils";

export default function CoursesPage({ _session, _data }) {
  return (
    <>
      <div className="flex justify-center items-center">
        <AddModal />
      </div>
      <div className="py-10 sm:px-20 flex justify-center relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {_data?.courses?.map((course, key) => (
            <CourseCard key={key} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const _session = await getSession(ctx);

  const res = await fetch(getApiUrl("/courses"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${_session?.jwt}`,
    },
  });
  const _data = await res.json();
  return {
    props: { _session, _data },
  };
}
