import { getSession } from "next-auth/react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import { getApiUrl } from "../../../lib/Utils";

export default function Profile({ _session, _data }) {
  const [studentId, setStudentId] = useState(_data?.user?.student);
  const [email, setEmail] = useState(_data?.user?.email);
  const [name, setName] = useState(_data?.user?.name);
  const [alert, setAlert] = useState("");

  const handleSubmit = async () => {
    setAlert("");
    fetch(getApiUrl("/users/" + _data?.user?._id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_session?.jwt}`,
      },
      body: JSON.stringify({ name, student: studentId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlert("Updated profile");
        console.log(_session, _data, "Updated profile");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/5">
        {_data && (
          <>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Profile
                    </h3>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div>
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="studentId"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Student Id
                            </label>
                            <input
                              type="text"
                              name="studentId"
                              id="studentId"
                              value={studentId}
                              onChange={(e) => setStudentId(e.target.value)}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="col-span-6 text-red-500">{alert}</div>
                        </div>
                      </div>

                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          onClick={() => handleSubmit()}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const _session = await getSession(ctx);

  const res = await fetch(getApiUrl("/users/" + _session?.user?._id), {
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
