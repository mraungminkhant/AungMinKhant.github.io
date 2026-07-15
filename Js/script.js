window.addEventListener("scroll", function () {

    const nav = document.querySelector("nav");

    if (window.scrollY > 40) {

        nav.classList.add("nav-scrolled");

    } 
    
    else {

        nav.classList.remove("nav-scrolled");

    }

});



// Mobile Menu

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector("nav ul");


if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

    });

}



// Close menu after clicking link

document.querySelectorAll("nav ul li a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        navMenu.classList.remove("active");

    });

});



// Scroll reveal animation


const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("show");

}


});


});



document.querySelectorAll(
".skill-card,.highlight-card,.contact-card,.about-card"
)
.forEach(element=>{


element.classList.add("hidden");

observer.observe(element);


});

// Active navigation highlight


const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul li a");


window.addEventListener("scroll",()=>{


let current="";


sections.forEach(section=>{


const sectionTop = section.offsetTop - 150;


if(scrollY >= sectionTop){

current = section.getAttribute("id");

}


});


navLinks.forEach(link=>{


link.classList.remove("active");


if(link.getAttribute("href") === "#" + current){

link.classList.add("active");

}


});


});

// ================= PROJECT SLIDER =================


const projectContainer = document.querySelector(".project-grid");

const nextProject = document.querySelector(".next-btn");

const prevProject = document.querySelector(".prev-btn");


if(projectContainer && nextProject && prevProject){


    nextProject.addEventListener("click",()=>{


        projectContainer.scrollBy({

            left:420,

            behavior:"smooth"

        });


    });



    prevProject.addEventListener("click",()=>{


        projectContainer.scrollBy({

            left:-420,

            behavior:"smooth"

        });


    });


}


prevProject.addEventListener("click",()=>{


projectContainer.scrollBy({

    left:-420,

    behavior:"auto"

});


});




// ================= PROJECT FILTER =================


const filterButtons = document.querySelectorAll(".filter-btn");

const projects = document.querySelectorAll(".project-card");



filterButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        const filter = button.dataset.filter;



        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });


        button.classList.add("active");



        projects.forEach(project=>{


            const category = project.dataset.category;



            project.classList.add("hide-animation");



            setTimeout(()=>{


                if(filter==="all" || category.includes(filter)){


                    project.style.display="block";


                }

                else{


                    project.style.display="none";


                }



                setTimeout(()=>{

                    project.classList.remove("hide-animation");

                },50);



            },200);



        });



        if(projectContainer){

            projectContainer.scrollLeft=0;

        }



    });


});