import { Course } from './type/Course';
import { Modal } from './Modal';
import { requestPg } from './requestPg';

export async function payCourses(courses: Course[]) {
  await payAll(courses);

  Modal.open(`${courses.length} 개 강의가 결제되었습니다.`);
}

async function payAll(courses: Course[]) {
  for (const course of courses) {
    await pay(course);
  }
}

async function pay(course: Course) {
  const payAmount = course.amount * course.discountPercent;
  if (payAmount >= 100) {
    await requestPg(course.title, payAmount);
  }
}
