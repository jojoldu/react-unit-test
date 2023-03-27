import { Course } from './type/Course';
import { Modal } from './Modal';
import { requestPg } from './requestPg';

export async function payCourses(courses: Course[]) {
  for (const course of courses) {
    const payAmount = course.amount * course.discountPercent;

    if (payAmount >= 100) {
      await requestPg(course.title, payAmount);
    }
  }

  Modal.open(`${courses.length} 개 강의가 결제되었습니다.`);
}
