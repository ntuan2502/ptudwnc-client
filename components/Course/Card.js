import Link from "next/link";
export default function CourseCard({ course }) {
  return (
    <div className="w-96 card bordered">
      <figure>
        <img src="https://www.gstatic.com/classroom/themes/img_backtoschool.jpg" />
      </figure>
      <div className="absolute right-5 top-16 avatar">
        <div className="mb-8 rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://lh3.googleusercontent.com/a/default-user=s75-c" />
        </div>
      </div>
      <div className="card-body">
        <Link href={`/courses/${course.slug}`}>
          <div className="cursor-pointer hover:text-red-500">
            <h2 className="card-title">
              {course.name}
              <div className="badge mx-2 badge-secondary">NEW</div>
            </h2>
            <p>{course.description}</p>
          </div>
        </Link>

        <Link href={`/courses/${course.slug}`}>
          <p className="cursor-pointer hover:text-red-500">
            <a>{course.owner.name}</a>
          </p>
        </Link>
        <div className="justify-end card-actions">
          <button className="btn btn-secondary">More info</button>
        </div>
      </div>
    </div>
  );
}
