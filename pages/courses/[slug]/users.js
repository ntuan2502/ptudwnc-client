import { getSession } from "next-auth/react";
import { getApiUrl } from "../../../lib/Utils";
import { useState } from "react";
import InviteModal from "../../../components/Course/InviteModal";

export default function Users({ _session, _data }) {
  const [showInviteTeacher, setShowInviteTeacher] = useState(false);
  const [showInviteStudent, setShowInviteStudent] = useState(false);
  const [email, setEmail] = useState("");
  function handleInviteTeacherSubmit() {
    
  }

  function handleInviteStudentSubmit() {

  }

  const inviteTeacherContent = <>
    <label className="label">
    <span className="label-text">Email</span>
    <div className="text-red-500"></div>
    </label>
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="input input-info input-bordered"
    />
  </>
  const inviteTeacherActions = <>
    <button
      onClick={handleInviteTeacherSubmit}
      className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
    >
      Invite
    </button>
    <button
      className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
      onClick={() => setShowInviteTeacher(false)}
    >
      Cancel
    </button>
  </>
  const inviteStudentActions = <>
    <button
      onClick={handleInviteStudentSubmit}
      className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
    >
      Invite
    </button>
    <button
      className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
      onClick={() => setShowInviteStudent(false)}
    >
      Cancel
    </button>
  </>
  return (
    <>
      {showInviteTeacher && <InviteModal header="Invite teacher"
        content={inviteTeacherContent} 
        actions={inviteTeacherActions}/>}
        {showInviteStudent && <InviteModal header="Invite student"
        content={inviteTeacherContent} 
        actions={inviteStudentActions}
        />}
      {_data && (
        <div className="flex justify-center">
          <div className="w-full md:w-3/5">
            <div>
              <div className="border-solid border-b-2 border-blue-500 p-2 flex justify-between items-center">
                <div className="text-3xl">Giáo Viên</div>
                <button onClick={() => setShowInviteTeacher(true)}>
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
                </button>
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
                  <div className="text-3xl px-2">
                    {_data.course.students.length} sinh viên
                  </div>
                  <button onClick={() => setShowInviteStudent(true)}>  
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
                  </button>
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
      )}
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
      props: { _session, _data: null },
    };
  }
}
