$('.loader').hide();
$('.addBut').click(() => {
    $('.card-wrapper').hide();
    let $selected = $('.menu').val();
    $.ajax({
        url: 'https://frontend-test-api.alex93.now.sh/api/languages',
        type: 'GET',
        data: {
            group: $selected
        },
        beforeSend: () => {
            $('.loader').show();
        },
        success: (answer) => {
            $ans = JSON.parse(answer).data;
            $result = $ans
                .filter((item) => {
                    return item.logo;
                })
            $result.forEach(item => {
                $added = $('<div>').addClass('card-wrapper');
                $header = $('<div>').html(item.name).addClass('card__head');
                $desc = $('<div>').html(`Основан в ${item.year} году и насчитывается ${item.projectsCount} проектов на GitHub`).addClass('card__desc');
                $docs = $('<a>').attr('href', item.docs).text('Документация').addClass('card__link');
                $logo = $('<img>').attr('src', item.logo).addClass('card__logo');
                $added.append($logo).append($header).append($desc).append($docs);
                $('body').append($added);      
            }); 
        },
        error: () => {
            $('body').append('Something went wrong.')
        },
        complete: () => {
            $('.loader').hide();
        }
    });
});