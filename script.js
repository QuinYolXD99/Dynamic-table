
 $(document).ready(function () {
            $('body').bootstrapMaterialDesign();

            var id = 0;
            var update = false;
            var currentRow = null;

            function showForm() {
                $(".class-list").hide(500);
                $(".createForm").show(500);
            }

            function closeForm() {
                update = false;
                $("input").val(null);
                $(".createForm").hide(500);
                $(".class-list").show(500);
            }

            $(".createForm").hide();

            $(".add-student").click(function () {
                showForm();
            });

            $(".close").click(function () {
                closeForm();
            })

            $(".save-btn").click(function () {
                var fname = $("#fname").val();
                var lname = $("#lname").val();
                var course = $("#course").val();
                var address = $("#address").val();
                var year = $("#yrLvl").val();
                var email = $("#email").val();
                var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

                var texts = ["id", "name", "course_year"]

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
                        name: fname + " " + lname,
                        course_year: course + " " + year,
                        email: email
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
                    }).append($(button).text("update"));

                    $(btns).append($(button2).text("delete"));
                    $(btns).wrap("<center></center>");

                    $('<td>').css({width:"220px"}).append(btns).appendTo($(rows));

                    if (!update) {
                        $("tbody").append($(rows))
                    } else {
                        $(rows).attr("id", $(currentRow).attr("id"))
                        $(currentRow).html($(rows).html());
                        $(".col_0").text($(currentRow).attr("id"));
                        --id;
                    }
                    closeForm();
                    $(".btns").hide()

                }
            });

            $(document).on("mouseenter", "tbody tr", function () {
                $(".btns").show()
            });

            $(document).on("mouseleave", "tbody tr", function () {
                $(".btns").hide()
            });


            $(document).on('click', '.update-btn', function () {
                update = true;
                currentRow = $(this).closest("tr");
                showForm();
            });

            $(document).on('click', '.delete-btn', function () {
                Swal.fire({
                    type: 'success',
                    title: 'Success!',
                    text: 'Student information has been deleted successfully!'
                })
                $(this).closest("tr").fadeOut("slow")
                $(this).closest("tr").remove();
            });
        });
