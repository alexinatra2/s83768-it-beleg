const categoryList = ["general", "maths", "it", "music"];

function setCategory() {
  const mainElem = document.querySelector("main");
  let temp;
  const category = localStorage.getItem("category") ||
      (temp = categoryList[0],
          localStorage.setItem("category", categoryList[0]),
          temp);
  const categoryClassName = "category-" + category;
  mainElem.classList.add(categoryClassName);
}

function changeCategory(newCategory) {
  localStorage.setItem("category", newCategory);
}

document.addEventListener("DOMContentLoaded", function () {
  setCategory();
});
