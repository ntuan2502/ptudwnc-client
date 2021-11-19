import { getSession } from "next-auth/react";
import { getApiUrl } from "../../../lib/Utils";

export default function Users({ _session, _data }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full md:w-3/5">
          <div>
            <div className="border-solid border-b-2 border-blue-500 p-2 flex justify-between items-center">
              <div className="text-3xl">Giáo Viên</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            {_data.course.teachers.map((teacher, key) => (
              <div className="p-2 flex items-center" key={key}>
                <img
                  className="rounded-full h-12"
                  src="https://lh3.googleusercontent.com/a/default-user=s75-c"
                />
                <div className="p-2">{teacher.name}</div>
              </div>
            ))}
          </div>
          <div className="py-2">
            <div className="border-solid border-b-2 border-blue-500 p-2 flex justify-between items-center">
              <div className="text-3xl">Học Sinh</div>
              <div className="flex justify-center items-center">
                <div className="text-3xl px-2">{_data.course.students.length} sinh viên</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
            </div>
            {_data.course.students.map((student, key) => (
              <div className="p-2 flex items-center" key={key}>
                <img
                  className="rounded-full h-12"
                  src="https://lh3.googleusercontent.com/a/default-user=s75-c"
                />
                <div className="p-2">{student.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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
