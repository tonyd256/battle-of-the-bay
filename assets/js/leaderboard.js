---
---
$(function() {
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbx3LUU2ujby8cfkc45GyrxHwYJUX2-Ol14Kjtk9NaygVFM57RPO/exec',
    dataType: 'json',
    cache: false,
    success: function (res) {
      const results = res.data;

      const uniqueAttempts = _.countBy(_.uniqWith(results, function (lhv, rhv) {
        return lhv.id === rhv.id && lhv.route === rhv.route;
      }), 'route');

      $('#attempts tbody').html(Object.keys(uniqueAttempts).map( function (route) {
        return "<tr><td>"+route+"</td><td>"+uniqueAttempts[route]+"</td></tr>";
      }));

      const groupedRoutes = _.groupBy(results, 'route');
      const groupedRoutesGender = _.mapValues(groupedRoutes, function (v) {
        return _.groupBy(v, 'gender');
      });

      $('#leaderboard tbody').html(Object.keys(groupedRoutesGender).map( function (route) {
        return Object.keys(groupedRoutesGender[route]).map( function (gender) {
          const times = _.sortBy(groupedRoutesGender[route][gender], 'time');
          const person = times[0];

          const aOpen = '<a href="'+person.link+'" rel="noopener noreferrer" target="_blank" style="display: block;" class="text-reset">';
          const aClose = "</a>"

          return "<tr><td>"+aOpen+route+aClose+"</td><td>"+aOpen+_.upperFirst(gender)+aClose+"</td><td>"+aOpen+person.name+aClose+"</td><td>"+aOpen+person.team+aClose+"</td><td>"+aOpen+person.time+aClose+"</td></tr>";
        }).join();
      }));
    },
    error: function (req, status, e) {
      console.error(e);
    }
  });
});
