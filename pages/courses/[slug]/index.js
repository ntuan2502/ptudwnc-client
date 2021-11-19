import Link from "next/link";
import { getSession } from "next-auth/react";
import { getApiUrl } from "../../../lib/Utils";
export default function CoursePage({ _session, _data }) {
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="relative">
          <img
            className="rounded-xl"
            src="https://www.gstatic.com/classroom/themes/img_backtoschool.jpg"
          />
          <div className="absolute bottom-1 left-1 md:bottom-5 md:left-5 text-white">
            <div className="text-md md:text-4xl font-bold">
              {_data.course.name}
            </div>
            <div className="text-md md:text-xl">{_data.course.description}</div>
          </div>
          <div className="absolute bottom-1 right-1 md:bottom-5 md:right-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-10 md:w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-1/2">
          <div className="card shadow-lg w-64 bg-gray-300">
            <div className="card-body">
              <h2 className="card-title">Mã lớp</h2>
              <p>{_data.course.joinId}</p>
            </div>
          </div>
          <div className="card shadow-lg w-64 bg-gray-300 my-3">
            <div className="card-body">
              <div className="flex justify-center font-bold">
                <Link href={`/courses/${_data.course.slug}/users`}>
                  Mọi người
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const _session = await getSession(ctx);

  const res = await fetch(getApiUrl("/courses/" + ctx.query.slug), {
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
