//localStorage.removeItem("courses");
const Name = document.querySelector("#courseName");
const Category = document.querySelector("#courseCategory");
const Price = document.querySelector("#coursePrice");
const Description = document.querySelector("#courseDescription");
const Capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#click");//add 
const deleteBtn = document.querySelector("#deleteBtn");//delete all
const search = document.querySelector("#search");

//validation .. 
const invalidName = document.querySelector(".invalid-name");
const invalidCategory = document.querySelector(".invalid-category");
const invalidPrice = document.querySelector(".invalid-price");
const invalidDescription = document.querySelector(".invalid-description");
const invalidCapacity = document.querySelector(".invalid-capacity");


let courses = [];
// to display previos courses
if (localStorage.getItem("courses") != null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}



// click on add course 
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = true;

    //name 
    const namePattern = /^[A-Z][a-z]{3,10}$/; //شرط اسم الكورس
    if (!namePattern.test(Name.value)) {//اذا اسم الكورس غلط فوت عالإف (بنفيها مشان يفوت)
        invalidName.innerHTML = "invalid, course name must start with capital letter, 3-10 small letters. ";
        Name.classList.add("is-invalid");
        isValid = false;
    }
    else if (namePattern.test(Name.value)) {
        invalidName.innerHTML = "";
        Name.classList.remove("is-invalid");
        Name.classList.add("is-valid");

    }

    //category 
    const categoryPattern = /^[A-Z][a-z]{2,7}$/; //شرط اسم الكاتيجوري
    if (!categoryPattern.test(Category.value)) {//اذا اسم الكورس غلط فوت عالإف (بنفيها مشان يفوت)
        invalidCategory.innerHTML = "invalid, Category must start with capital letter, 2-7 small letters. ";
        Category.classList.add("is-invalid");
        isValid = false;
    }
    else if (categoryPattern.test(Category.value)) {
        invalidCategory.innerHTML = "";
        Category.classList.remove("is-invalid");
        Category.classList.add("is-valid");
    }



    //price
    const pricePattern = /^(100|[1-9][0-9]{2})$/; //شرط السعر المقبول
    if (!pricePattern.test(Price.value)) {//اذا اسم الكورس غلط فوت عالإف (بنفيها مشان يفوت)
        invalidPrice.innerHTML = "invalid, Price must be between 100-999$ ";
        Price.classList.add("is-invalid");
        isValid = false;
    }
    else if (pricePattern.test(Price.value)) {
        invalidPrice.innerHTML = "";
        Price.classList.remove("is-invalid");
        Price.classList.add("is-valid");
    }


    //description
    const descriptionPattern = /^[A-Z][a-z]/; //شرط اسم الكاتيجوري
    if (!descriptionPattern.test(Description.value)) {//اذا اسم الكورس غلط فوت عالإف (بنفيها مشان يفوت)
        invalidDescription.innerHTML = "invalid, Description must start with capital letter, 9 or more small letters. ";
        Description.classList.add("is-invalid");
        isValid = false;
    }
    else if (descriptionPattern.test(Description.value)) {
        invalidDescription.innerHTML = "";
        Description.classList.remove("is-invalid");
        Description.classList.add("is-valid");
    }

    //Capacity
    const CapacityPattern = /^(100|[2-9][0-9])$/; //شرط السعر المقبول
    if (!CapacityPattern.test(Capacity.value)) {//اذا اسم الكورس غلط فوت عالإف (بنفيها مشان يفوت)
        invalidCapacity.innerHTML = "invalid, Capacity must be between 20-100 person. ";
        Capacity.classList.add("is-invalid");
        isValid = false;
    }
    else if (CapacityPattern.test(Capacity.value)) {
        invalidCapacity.innerHTML = "";
        Capacity.classList.remove("is-invalid");
        Capacity.classList.add("is-valid");
    }



    //اذا كل اللي ادخلته مقبول
    if (isValid) {
        const course = {

            name: Name.value,
            category: Category.value,
            price: Price.value,
            description: Description.value,
            capacity: Capacity.value,
        }

        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "New cousre added successfully"
        });
        displayCourses();
    }//else
});
// on click function end 




//عرض الكورسز 
function displayCourses() {

    const result = courses.map((course, index) => {
        return `
    <tr>
    <td>${index}</td>
    <td>${course.name}</td>
    <td>${course.category}</td>
    <td>${course.price}</td>
    <td>${course.description}</td>
    <td>${course.capacity}</td>
    <td>
    <button class="btn btn-danger"  onclick='deleteCourse(${index})'>delete</button>
    </td>
    </tr>
    `

    }).join(``);

    document.querySelector("#data").innerHTML = result;

}



// to  delete any course 
function deleteCourse(i) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}



deleteBtn.addEventListener("click",()=>{

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

});


search.addEventListener("input",(e)=>{

    const keyword=search.value;

    const coursesResult=courses.filter((course)=>{
        return course.name.toLowerCase().includes(keyword.toLowerCase());
    });

    const result = coursesResult.map((course, index) => {
        return `
    <tr>
    <td>${index}</td>
    <td>${course.name}</td>
    <td>${course.category}</td>
    <td>${course.price}</td>
    <td>${course.description}</td>
    <td>${course.capacity}</td>
    <td>
    <button class="btn btn-danger"  onclick='deleteCourse(${index})'>delete</button>
    </td>
    </tr>
    `

    }).join(``);

    document.querySelector("#data").innerHTML = result;


});