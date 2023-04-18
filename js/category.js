const categoryList = ["general", "maths", "it", "music"];

function setCategory() {
  const mainElem = document.querySelector("main");
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

setCategory();
