function docLoad() {
  return new Promise((resolve, reject) => {
    // Return the Promise
    document.addEventListener("DOMContentLoaded", () => {
      const themeBtn = document.getElementById("changeTheme");
      const fadeTrick = document.getElementById("fade");
      const navTag = document.getElementById("nav");
      const rulers = document.getElementsByClassName("ruler");
      const bodyTag = document.body;
      resolve({ rulers, navTag, fadeTrick, themeBtn, bodyTag });
    });
  });
}
const lightImages = [
  "./svg/homeLight.svg",
  "./svg/twitterLight.svg",
  "./svg/gitHubLight.svg",
  "./svg/linkedInLight.svg",
  "./svg/lightLight.svg",
];
const darkImages = [
  "./svg/homeDark.svg",
  "./svg/twitterDark.svg",
  "./svg/gitHubDark.svg",
  "./svg/linkedInDark.svg",
  "./svg/lightDark.svg",
];
const { navTag, rulers, fadeTrick, themeBtn, bodyTag } = await docLoad();
initTheme();

themeBtn.onclick = (e) => {
  e.preventDefault();
  const currentTheme = localStorage.getItem("theme");
  reverseTheme(currentTheme);
};

//chec if local storage have a theme set or not
// if have theme then apply theme
//if not create new theme and set it to white
function initTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    localStorage.setItem("theme", "light");
  }

  return storedTheme;
}

// takes the theme to be applied as input
// and applies it to the dom
function applyTheme(theme) {
  if (theme === "light") {
    bodyTag.classList.remove("dark");
    reverseTheme("dark");
  } else if (theme === "dark") {
    bodyTag.classList.add("dark");
    reverseTheme("light");
  }
}

function reverseTheme(theme) {
  if (theme === "dark") {
    // light mode
    localStorage.setItem("theme", "light");
    fadeTrick.classList.remove("fadeDark");
    fadeTrick.classList.add("fadeLight");
    bodyTag.classList.remove("dark");

    Array.from(rulers).forEach((ruler) => {
      ruler.style.setProperty("background-color", "#000000", "important");
    });

    Array.from(
      bodyTag.querySelectorAll(".languageBlack, .languageGrey")
    ).forEach((e) => {
      e.classList.remove("skillsDark");
    });
    // change icon
    navTag.classList.remove("dark");
    navTag.style.border = "1px solid black";
    {
      let i = 0;
      Array.from(navTag.children).forEach((e) => {
        // if the tag name is button then get the img inside it
        e.classList.remove("dark");
        if (e.tagName === "BUTTON") {
          const imgTag = e.children[0];
          imgTag.src = lightImages[i];
          i++;
        }
      });
    }
  } else {
    //dark mode
    localStorage.setItem("theme", "dark");
    bodyTag.classList.add("dark");
    fadeTrick.classList.remove("fadeLight");
    fadeTrick.classList.add("fadeDark");
    Array.from(rulers).forEach((ruler) => {
      ruler.style.setProperty("background-color", "#ffffff", "important");
    });
    Array.from(
      bodyTag.querySelectorAll(".languageBlack, .languageGrey")
    ).forEach((e) => {
      e.classList.add("skillsDark");
    });

    // change icons
    navTag.classList.add("dark");
    navTag.style.border = "1px solid white";
    {
      let i = 0;
      Array.from(navTag.children).forEach((e) => {
        e.classList.add("dark");
        if (e.tagName === "BUTTON") {
          const imgTag = e.children[0];
          imgTag.src = darkImages[i];
          i++;
        }
      });
    }
  }
}
