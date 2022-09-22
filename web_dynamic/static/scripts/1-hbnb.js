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
});
