(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the WOW.js
    new WOW().init();

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });

    
    // courses 
    $(document).ready(function () {
        $.getJSON('js/courses.json', (courses) => {
            displayCourses(courses);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('There was a problem with the fetch operation:', textStatus, errorThrown);
        });

        function displayCourses(courses) {
            const $container = $('#coursesContainer');
            if ($container.length === 0) {
                console.error('Element with ID "coursesContainer" not found');
                return;
            }

            let output = "";

            $.each(courses, (index, course) => {
                output += `
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="causes-item d-flex flex-column bg-white border-top border-5 border-primary rounded-top overflow-hidden h-100">
                            <div class="text-center p-4 pt-0">
                                <div class="d-inline-block bg-primary text-white rounded-bottom fs-5 pb-1 px-3 mb-4">
                                    <small>${course.label}</small>
                                </div>
                                <h5 class="mb-3">${course.title}</h5>
                                <p>${course.desc}</p>
                                <div class="causes-progress bg-light p-3 pt-2">
                                    <div class="d-flex justify-content-between">
                                        <p class="text-dark">${course.goal} <small class="text-body">Goal</small></p>
                                        <p class="text-dark">${course.raised} <small class="text-body">Raised</small></p>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="${course.progress.slice(0, -1)}" aria-valuemin="0" aria-valuemax="100">
                                            <span>${course.progress}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="position-relative mt-auto">
                                <img class="img-fluid" src="${course.image}" alt="">
                                <div class="causes-overlay">
                                    <a class="btn btn-outline-primary" href="#">
                                        ${course.cta}
                                        <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                                            <i class="fa fa-arrow-right"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            $container.html(output);

            // courses progress
            $('.causes-progress').waypoint(function () {
                $('.progress .progress-bar').each(function () {
                    $(this).css("width", $(this).attr("aria-valuenow") + '%');
                });
            }, { offset: '80%' });

        }
    });


    // services 
    $(document).ready(function () {
        $.getJSON('js/services.json', (services) => {
            displayServices(services);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('There was a problem with the fetch operation:', textStatus, errorThrown);
        });

        function displayServices(services) {
            const $container = $('#servicesContainer');
            if ($container.length === 0) {
                console.error('Element with ID "servicesContainer" not found');
                return;
            }

            let output = "";

            $.each(services, (index, service) => {
                output += `
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="service-item bg-white text-center h-100 p-4 p-xl-5">
                            <img class="img-fluid mb-4" src="${service.image}" alt="">
                            <h4 class="mb-3">${service.title}</h4>
                            <p class="mb-4">${service.desc}</p>
                            <a class="btn btn-outline-primary px-3" href="">
                                ${service.cta}
                                <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                                    <i class="fa fa-arrow-right"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            });

            $container.html(output);

        }
    });


})(jQuery);
