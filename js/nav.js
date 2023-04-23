const defaultOnClick = () => {
  setCategory("general");
};

class Navigation {
  navElem;
  ulElem;
  navItems;

  constructor() {
    this.navElem = document.createElement("nav");
    this.navElem.classList.add("navbar");

    const ulElem = document.createElement("ul");
    ulElem.classList.add("navbar-nav");
    this.ulElem = ulElem;
    this.navElem.appendChild(this.ulElem);
    this.navItems = []; 
  }

  createNavItem(label, icon, onClickFunction = defaultOnClick) {
    const newNavItemElem = document.createElement("li");
    newNavItemElem.classList.add("nav-item");

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "#");

    const navIconElem = document.createElement("i"); 
    navIconElem.classList.add(icon);

    const navLabelElem = document.createElement("label");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    navLinkElem.appendChild(navIconElem);
    navLinkElem.appendChild(navLabelElem);

    newNavItemElem.addEventListener("click", onClickFunction);
    newNavItemElem.appendChild(navLinkElem);

    this.navItems.push(newNavItemElem);
    return newNavItemElem;
  }

  createEmphasizedItem(label, icon, onClickFunction = defaultOnClick) {
    return this.createNavItem(label, icon, onClickFunction);
  }

  create() {
    this.navItems.forEach((item) => {
      this.ulElem.appendChild(item);
    });
    document.body.prepend(this.navElem);
  }
}
