import Head from "next/head";
import Image from "next/image";
import AddModal from "../../components/Course/AddModal";
import CourseCard from "../../components/Course/Card";

export default function CoursesIndex() {
  return (
    <>
      <div className="flex justify-center items-center">
        <AddModal />
      </div>
      <div className="py-10 sm:px-20 flex justify-center relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </>
  );
}
