
$(document).ready(function () {
    $('body').bootstrapMaterialDesign();

    var id = 0;
    var update = false;
    var currentRow = null;
    var temp_id = null;

    // funtion to show the form

    function showForm(fn, ln, course, yr, email, address) {
        $("#fname").val(fn);
        $("#lname").val(ln);
        $("#course").val(course);
        $("#yrLvl").val(yr);
        $("#address").val(address);
        $("#email").val(email);
        $(".class-list").hide(500);
        $(".createForm").show(500);
    }

    //function to hide the form
    function closeForm() {
        update = false;
        $("input").val(null);
        $(".createForm").hide(500);
        $(".class-list").show(500);
    }

    // hide the form in default
    $(".createForm").hide();

    // show the form if add student button is click
    $(".add-student").click(function () {
        showForm();
    });

    // close the form if close button is click
    $(".close").click(function () {
        closeForm();
    })

    // save options
    $(".save-btn").click(function () {
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var course = $("#course").val();
        var address = $("#address").val();
        var year = $("#yrLvl").val();
        var email = $("#email").val();
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
        var texts = ["id", "name", "course_year"]

        // validate the values 
        if (fname == '' || lname == '' || course == '' || address == '' || year == '' || email == '') {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'All inputs should be filled!'
            })
        } else if (!pattern.test(email)) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Please enter a valid email address...'
            });
        } else {
            var rows = $('<tr>', {
                id: ++id,
                fname: fname,
                lname: lname,
                name: fname + " " + lname,
                course: course,
                yr: year,
                course_year: course + " " + year,
                email: email,
                address: address
            });

            var button = $('<button>', {
                class: "update-btn btn btn-sm btn-info",
            });

            var button2 = $('<button>', {
                class: "delete-btn btn btn-sm btn-danger"
            }).css("margin-left", "10px");

            for (let i = 0; i < texts.length; i++) {
                $('<td>', {
                    class: "col_" + i
                }).text($(rows).attr(texts[i])).appendTo($(rows))
            }

            var btns = $("<div>", {
                class: "btns"
            }).css({ width: "220px" }).append($(button).text("update"));

            $(btns).append($(button2).text("delete"));
            $(btns).wrap("<center></center>");

            $('<td>', { class: "btn-grp" }).append(btns).appendTo($(rows));

            if (!update) {
                $("tbody").append($(rows))
            } else {
                $(rows).attr("id", temp_id)
                $(currentRow).html($(rows).html());
                $("#" + temp_id + " " + ".col_0").text($(currentRow).attr("id"));
                --id;
                update = false;
            }

            closeForm();
            $(".btns").hide();
        }
    });

    $(document).on("mouseenter", "tbody tr", function () {
        $(this).closest($(".btns").show())
    });

    $(document).on("mouseleave", "tbody tr", function () {
        $(this).closest($(".btns").hide())
    });

    $(document).on('click', '.update-btn', function () {
        update = true;
        currentRow = $(this).closest("tr");
        temp_id = $(currentRow).attr("id")
        var fname = $(currentRow).attr("fname")
        var lname = $(currentRow).attr("lname")
        var course = $(currentRow).attr("course")
        var year = $(currentRow).attr("yr")
        var mail = $(currentRow).attr("email")
        var address = $(currentRow).attr("address")
        showForm(fname, lname, course, year, mail, address)
    });

    $(document).on('click', '.delete-btn', function () {
        Swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'Student information has been deleted successfully!'
        })
        $(this).closest("tr").remove();
    });
});
