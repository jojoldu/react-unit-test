export function main(e) {
  const ct = e.currentTarget;
  const type = ct.dataset.type;
  const parent = $.closest('.accordion-body', ct);
  const filtered = map(
    (el) => el.value,
    filter((el) => el.checked, $.findAll(`input[data-type="${type}"]`, parent)),
  ).join(',');
  re_render(getQ({ [type]: filtered, page: 1 }));
}
