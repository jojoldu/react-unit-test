import { Course } from './type/Course';
import { Modal } from './Modal';
import { requestPg } from './requestPg';

export async function payCourses(courses: Course[]) {
  const courseAmounts = getCourseAmounts(courses);

  for (const courseAmount of courseAmounts) {
    await requestPg(courseAmount.title, courseAmount.billingAmount);
  }

  Modal.open(`${courses.length} 개 강의가 결제되었습니다.`);
}
export function getCourseAmounts(courses: Course[]) {
  return courses
    .map((c) => getCourseAmount(c))
    .filter((c) => c.billingAmount >= 100);
}

function getCourseAmount(course: Course) {
  return {
    billingAmount: course.amount * course.discountPercent,
    title: course.title,
  };
}
