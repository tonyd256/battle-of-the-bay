---
---
$(function() {
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbx3LUU2ujby8cfkc45GyrxHwYJUX2-Ol14Kjtk9NaygVFM57RPO/exec',
    dataType: 'json',
    cache: false,
    success: function (res) {
      const results = res.data;

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

      const uniqueAttempts = _.countBy(_.uniqWith(results, function (lhv, rhv) {
        return lhv.id === rhv.id && lhv.route === rhv.route;
      }), 'team');

      $('#attempts tbody').html(Object.keys(uniqueAttempts).map( function (team) {
        const records = Object.keys(groupedRoutesGender).reduce( function (accum, route) {
          return accum + Object.keys(groupedRoutesGender[route]).reduce( function (accum, gender) {
            return accum + (_.sortBy(groupedRoutesGender[route][gender], 'time')[0].team === team ? 1 : 0);
          }, 0);
        }, 0);
        return "<tr><td>"+team+"</td><td class=\"text-center\">"+uniqueAttempts[team]+"</td><td class=\"text-right\">"+records+"</td></tr>";
      }));

    },
    error: function (req, status, e) {
      console.error(e);
    }
  });
});
