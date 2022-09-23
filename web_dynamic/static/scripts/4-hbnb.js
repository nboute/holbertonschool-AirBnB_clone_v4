$(document).ready(function () {
  const amenities = [];
  const amenitiesNames = [];
  $('li :checkbox').change(function () {
    if (this.checked) {
      amenities.push($(this).attr('data-id'));
      amenitiesNames.push($(this).attr('data-name'));
    } else {
      amenities.splice($.inArray($(this).attr('data-id'), amenities), 1);
      amenitiesNames.splice($.inArray($(this).attr('data-name'), amenitiesNames), 1);
    }
    $('.amenities h4').html(amenitiesNames.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $('.filters button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({ amenities: amenities }),
      success: function (data) {
        $('section.places').empty();
        data.forEach(function (place) {
          let html = '';
          html += '    <article>';
          html += '      <div class="title_box">';
          html += '        <h2>' + place.name + '</h2>';
          html += '        <div class="price_by_night">$' + place.price_by_night + '</div>';
          html += '      </div>';
          html += '      <div class="information">';
          html += '        <div class="max_guest">' + place.max_guest + ' Guest';
          if (place.max_guest !== 1) {
            html += 's';
          }
          html += '</div>';
          html += '            <div class="number_rooms">' + place.number_rooms + ' Bedroom';
          if (place.number_rooms !== 1) {
            html += 's';
          }
          html += '</div>';
          html += '            <div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom';
          if (place.number_bathrooms !== 1) {
            html += 's';
          }
          html += '</div>';
          html += '      </div>';
          html += '      <div class="user">';
          html += '          </div>';
          html += '          <div class="description">';
          html += '        ' + place.description;
          html += '          </div>';
          html += '    </article>';
          $('section.places').append($(html));
        });
      }
    });
  });
});
