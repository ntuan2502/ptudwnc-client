import Head from "next/head";
import Image from "next/image";
import CourseCard from "../../components/Course/Card";

export default function CoursesIndex() {
  return (
    <div className="px-2 py-10 sm:px-20 flex justify-center relative">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}
