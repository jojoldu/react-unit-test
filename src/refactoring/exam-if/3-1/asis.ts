// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const canCourseAddedToCart = async (courseIds: number[]) => {
  const response = await fetch('/api/cart');

  if (response.ok) {
    const { cartAndVouchers } = response;
    const mappedCourseIds = Array.isArray(courseIds)
      ? [...courseIds]
      : [courseIds];
    const courseIdsCanAddToCart = cartAndVouchers
      .filter(({ canAddToCart }) => canAddToCart)
      .map(({ courseId }) => courseId);

    if (!courseIds) {
      return {
        courseIdsCanAddToCart,
        canAddToCart: courseIdsCanAddToCart.length > 0,
      };
    }

    return {
      courseIdsCanAddToCart,
      canAddToCart: mappedCourseIds.every((courseId) =>
        courseIdsCanAddToCart.includes(Number(courseId)),
      ),
    };
  }

  return {
    courseIdsCanAddToCart: [],
    canAddToCart: false,
  };
};
