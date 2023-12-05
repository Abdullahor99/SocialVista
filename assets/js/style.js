// add bounce on hover to buttons ellements.

const btns = document.querySelectorAll("button");
btns.forEach(btn => {
  btn.addEventListener("mouseover", function () {
    if (this.childNodes.length > 0)
      if (this.childNodes[0].nodeName === "I")
        this.childNodes[0].classList.add("fa-bounce");
  })
  btn.addEventListener("mouseout", function () {
    if (this.childNodes.length > 0)
      if (this.childNodes[0].nodeName === "I")
        this.childNodes[0].classList.remove("fa-bounce");
  })
});