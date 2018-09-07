
[@bs.module "./validations"] external isValidYear : ('a) => bool = "default";


let isValidPartialDate = (day, month, year) => {
  !(year && !isValidYear(year))
}