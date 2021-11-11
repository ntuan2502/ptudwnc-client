import Link from "next/link";
export default function CourseCard() {
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
        <Link href="/courses" passHref>
          <div className="cursor-pointer hover:text-red-500">
            <h2 className="card-title">
              [CQ] PTUDWNC - 18_3
              <div className="badge mx-2 badge-secondary">NEW</div>
            </h2>
            <p>PTUDWNC</p>
          </div>
        </Link>

        <Link href="/courses" passHref>
          <p className="cursor-pointer hover:text-red-500">
            <a>Nguyễn Huy Khánh</a>
          </p>
        </Link>
        <div className="justify-end card-actions">
          <button className="btn btn-secondary">More info</button>
        </div>
      </div>
    </div>
  );
}
