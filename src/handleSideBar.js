document.querySelector(".fa-bars").addEventListener("click", (e) => {
   let left = document.querySelector(".left")
   let hero = document.querySelector(".hero-section")
   let logo = document.querySelector(".logo")

   logo.style.justifyContent = "space-between"
   //  left.style.width = `25%`;
   left.style.display = "flex";
   left.style.visibility = "visible";

   hero.style.width = `100%`


   document.querySelector(".fa-arrow-left").addEventListener("click", (e) => {
      let left = document.querySelector(".left")
      let hero = document.querySelector(".hero-section")


     



      // left.style.width = `0%`;
      left.style.display = "none";
      left.style.visibility = "hidden";

      hero.style.width = `100%`
   })

})



