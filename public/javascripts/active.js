document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll('table tbody tr .circle');
    circles.forEach(circle => {
        console.log(circle.getAttribute("data-active"))
        if (circle.getAttribute("data-active") == "false") {
            circle.style.backgroundColor = 'rgb(172, 31, 31)';   
        } else {
            circle.style.backgroundColor = "rgb(31, 172, 66)";
        }
    })    
})