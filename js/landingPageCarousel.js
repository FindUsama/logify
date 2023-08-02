$(document).ready(function() {

    // modal open body overflow
    $('.rc_modal_btn').on('click', function() {
        $('body').css('overflow', 'hidden');
    });
    $('.rc_modal_closer').on('click', function() {
        $('body').css('overflow', 'visible');
    });

    var owlpp = $('.quotes_wrapper.owl-carousel');
    owlpp.owlCarousel({
        // margin: 30,
        nav: false,
        loop: true,
        autoHeight: false,
        autoplay: true,
        autoplayTimeout: 5000,
        items: 1,
    });

    var owl_gulid = $('.guild_projects.owl-carousel');
    owl_gulid.owlCarousel({
        // margin: 30,
        nav: false,
        loop: true,
        autoHeight: false,
        autoplay: true,
        autoplayTimeout: 5000,
        items: 1,
    });

    var owlTeam = $('.team-members-row.owl-carousel');
    var nextIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g id="Group_164" data-name="Group 164" transform="translate(-186 -1892)"><circle id="Ellipse_121" data-name="Ellipse 121" cx="30" cy="30" r="30" transform="translate(186 1892)" fill="#f9f9f9"/><g id="arrow-right" transform="translate(201 1910)"><path id="Path_14" data-name="Path 14" d="M12,5l7,7-7,7" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></g></svg>';
    var prevIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g id="Group_165" data-name="Group 165" transform="translate(-116 -1892)"><circle id="Ellipse_120" data-name="Ellipse 120" cx="30" cy="30" r="30" transform="translate(116 1892)" fill="#f9f9f9"/><g id="arrow-left" transform="translate(134 1910)"><path id="Path_12" data-name="Path 12" d="M12,19,5,12l7-7" transform="translate(3.5 0.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></g></svg>';
    owlTeam.owlCarousel({
        margin: 20,
        nav: false,
        dots: true,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1,
            },
            375: {
                items: 2,
                slideBy: 2,
            },
            768: {
                items: 3,
            },
            1025: {
                autoplay: false,
                items: 5
            }
        }
    });
    $('.team-members-row .owl-nav .owl-next span').html(nextIcon);
    $('.team-members-row .owl-nav .owl-prev span').html(prevIcon);

});