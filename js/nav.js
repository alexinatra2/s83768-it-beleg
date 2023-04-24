class Navigation {
  navElem;
  ulElem;
  navItems;
  static topicDataLoaded = false;
  static topicData;

  static async loadTopicData() {
    if (this.topicDataLoaded) {
      return this.topicData;
    }
    const env = await loadEnv();
    this.topicData = env.TOPIC_DATA;
    this.topicDataLoaded = true;
    return this.topicData;
  }

  constructor() {
    this.navElem = document.createElement("nav");
    this.navElem.classList.add("navbar");

    const ulElem = document.createElement("ul");
    ulElem.classList.add("navbar-nav");
    this.ulElem = ulElem;
    this.navElem.appendChild(this.ulElem);
    this.navItems = [];
  }

  async addNavItem(topic, onClickFunction) {
    await this.loadTopicData();
    const topic = topicData[topic];
    const label = topic.label;
    const icon = topic.icon;

    const newNavItemElem = document.createElement("li");
    newNavItemElem.classList.add("nav-item");

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "#");

    const navIconElem = document.createElement("i");
    navIconElem.classList.add(icon);

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    navLinkElem.appendChild(navIconElem);
    navLinkElem.appendChild(navLabelElem);

    newNavItemElem.addEventListener("click", onClickFunction);
    newNavItemElem.appendChild(navLinkElem);

    this.navItems.push(newNavItemElem);
    return this.navItems;
  }

  async addHomeLogo() {
    await this.loadTopicData();
    const newHomeLogoElem = document.createElement("li");
    newHomeLogoElem.classList.add("home-logo");

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "#");

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    const navIconElem = document.createElement("i");
    navIconElem.classList.add(icon);

    navLinkElem.appendChild(navLabelElem);
    navLinkElem.appendChild(navIconElem);
    newHomeLogoElem.appendChild(navLinkElem);

    this.navItems.push(newHomeLogoElem);
    return this.navItems;
  }

  async addThemeButton() {
    await this.loadTopicData();
    const newNavItemElem = document.createElement("li");
    newNavItemElem.classList.add("nav-item");
    newNavItemElem.setAttribute("id", "themeButton");

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "#");

    const darkIconElem = document.createElement("i");
    darkIconElem.classList.add(darkIcon);
    darkIconElem.setAttribute("id", "darkIcon");

    const lightIconElem = document.createElement("i");
    lightIconElem.classList.add(lightIcon);
    darkIconElem.setAttribute("id", "lightIcon");

    const solarIconElem = document.createElement("i");
    solarIconElem.classList.add(solarIcon);
    darkIconElem.setAttribute("id", "solarIcon");

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    navLinkElem.appendChild(darkIconElem);
    navLinkElem.appendChild(lightIconElem);
    navLinkElem.appendChild(solarIconElem);
    navLinkElem.appendChild(navLabelElem);

    newNavItemElem.appendChild(navLinkElem);

    this.navItems.push(newNavItemElem);
    return this.navItems;
  }

  create() {
    this.navItems.forEach((item) => {
      this.ulElem.appendChild(item);
    });
    document.body.prepend(this.navElem);
  }
}
