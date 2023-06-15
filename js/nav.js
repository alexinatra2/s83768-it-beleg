const TOPIC_DATA = {
  "home": {
    "icon": "fa-solid fa-house",
    "label": "Lernapp",
  },
  "general": {
    "icon": "fa-solid fa-earth-europe",
    "label": "Allgemein",
  },
  "maths": {
    "icon": "fa-solid fa-square-root-variable",
    "label": "Mathematik",
  },
  "it": {
    "icon": "fa-brands fa-firefox-browser",
    "label": "Internettechnologien",
  },
  "music": {
    "icon": "fa-solid fa-music",
    "label": "Musik",
  },
  "quizeditor": {
    "icon": "fa-solid fa-pen-to-square",
    "label": "Quiz Editor",
  },
};

const THEME_BUTTON_ICONS = {
  "darkIcon": "fa-solid fa-moon",
  "lightIcon": "fa-solid fa-sun",
  "solarIcon": "fa-solid fa-solar-panel",
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

  addItems(topicList) {
    for (const topic of topicList) {
      switch(topic) {
        case "home":
          this.addHomeLogo();
          break;
        case "theme":
          this.addThemeButton();
          break;
        default:
          this.addNavItem(topic);
      }
    }
  }

  addNavItem(topicName) {
    const topic = TOPIC_DATA[topicName];
    const label = topic.label;
    const icon = topic.icon;

    const newNavItemElem = document.createElement("li");
    newNavItemElem.classList.add("nav-item");

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "#");
    navLinkElem.addEventListener("click", () => changeCategory(topicName));

    const navIconElem = document.createElement("i");
    navIconElem.setAttribute("class", icon);

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    navLinkElem.appendChild(navIconElem);
    navLinkElem.appendChild(navLabelElem);
    newNavItemElem.appendChild(navLinkElem);

    this.navItems.push(newNavItemElem);
    return this;
  }

  addHomeLogo() {
    const newHomeLogoElem = document.createElement("li");
    newHomeLogoElem.classList.add("home-logo");

    const homeData = TOPIC_DATA.home;
    const icon = homeData.icon;
    const label = homeData.label;

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "index.html");

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    const navIconElem = document.createElement("i");
    navIconElem.setAttribute("class", icon);

    navLinkElem.appendChild(navLabelElem);
    navLinkElem.appendChild(navIconElem);
    newHomeLogoElem.appendChild(navLinkElem);

    this.navItems.push(newHomeLogoElem);
    return this;
  }

  addThemeButton() {
    const newNavItemElem = document.createElement("li");
    newNavItemElem.classList.add("nav-item");
    newNavItemElem.setAttribute("id", "themeButton");

    const darkIcon = THEME_BUTTON_ICONS.darkIcon;
    const lightIcon = THEME_BUTTON_ICONS.lightIcon;
    const solarIcon = THEME_BUTTON_ICONS.solarIcon;

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "#");

    const darkIconElem = document.createElement("i");
    darkIconElem.setAttribute("class", darkIcon);
    darkIconElem.setAttribute("id", "darkIcon");
    navLinkElem.appendChild(darkIconElem);

    const lightIconElem = document.createElement("i");
    lightIconElem.setAttribute("class", lightIcon);
    lightIconElem.setAttribute("id", "lightIcon");
    navLinkElem.appendChild(lightIconElem);

    const solarIconElem = document.createElement("i");
    solarIconElem.setAttribute("class", solarIcon);
    solarIconElem.setAttribute("id", "solarIcon");
    navLinkElem.appendChild(solarIconElem);

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = "Farben";
    navLinkElem.appendChild(navLabelElem);

    newNavItemElem.appendChild(navLinkElem);

    this.navItems.push(newNavItemElem);
    return this;
  }

  create() {
    this.navItems.forEach((item) => {
      this.ulElem.appendChild(item);
    });
    document.body.appendChild(this.navElem);
  }
}

const categoryList = ["general", "maths", "it", "music"];

function setCategory() {
  const mainElem = document.querySelector("main");
  let temp;
  const category = localStorage.getItem("category") ||
      (temp = categoryList[0], localStorage.setItem("category", categoryList[0]), temp);
  const categoryClassName = "category-" + category;
  console.log("setting category to: " + categoryClassName);
  mainElem.className = categoryClassName;
}

function changeCategory(newCategory) {
  localStorage.setItem("category", newCategory);
  setCategory();
}

document.addEventListener("DOMContentLoaded", function () {
  setCategory();
});