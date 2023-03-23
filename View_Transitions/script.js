const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const page3 = document.getElementById('page-3');
const page4 = document.getElementById('page-4');

function transitionToPage1() {
   page1.style.transform = 'translateX(0)';
   page2.style.transform = 'translateX(100%)';
   page3.style.transform = 'translateX(200%)';
   page4.style.transform = 'translateX(300%)';
}

function transitionToPage2() {
   page1.style.transform = 'translateX(-100%)';
   page2.style.transform = 'translateX(0)';
   page3.style.transform = 'translateX(100%)';
   page4.style.transform = 'translateX(200%)';
}

function transitionToPage3() {
   page1.style.transform = 'translateX(-200%)';
   page2.style.transform = 'translateX(-100%)';
   page3.style.transform = 'translateX(0)';
   page4.style.transform = 'translateX(100%)';
}

function transitionToPage4() {
   page1.style.transform = 'translateX(-300%)';
   page2.style.transform = 'translateX(-200%)';
   page3.style.transform = 'translateX(-100%)';
   page4.style.transform = 'translateX(0)';
}

function getTranslateX(page) {
   let style = window.getComputedStyle(page);
   let matrix = new WebKitCSSMatrix(style.transform);
   return matrix.m41;
}

document.addEventListener('keydown', function (event) {
   if (event.code === 'ArrowLeft') {
      if (getTranslateX(page1) == 0) {
         transitionToPage4();
      } else if (getTranslateX(page2) == 0) {
         transitionToPage1();
      } else if (getTranslateX(page3) == 0) {
         transitionToPage2();
      } else if (getTranslateX(page4) == 0) {
         transitionToPage3();
      }
   } else if (event.code === 'ArrowRight') {
      if (getTranslateX(page1) == 0) {
         transitionToPage2();
      } else if (getTranslateX(page2) == 0) {
         transitionToPage3();
      } else if (getTranslateX(page3) == 0) {
         transitionToPage4();
      } else if (getTranslateX(page4) == 0) {
         transitionToPage1();
      }
   }
});