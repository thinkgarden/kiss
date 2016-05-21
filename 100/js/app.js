function $(expr, con) {
  return (con || document).querySelector(expr);
}

function $$(expr, con) {
  return [].slice.call((con || document).querySelectorAll(expr));
}

$$('.toc>li>a').forEach(function (el, i) {
  el.setAttribute("href",i+1);
})
