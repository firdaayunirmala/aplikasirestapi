'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/lihatsparepart')
        .get(jsonku.tampilsemuasparepart);

    app.route('/lihatmontir')
        .get(jsonku.tampilsemuamontir);

    app.route('/tampilsparepart/:id')
        .get(jsonku.tampilidsparepart);

    app.route('/tampilmontir/:id')
        .get(jsonku.tampilidmontir);

    app.route('/hitungtotal')
        .get(jsonku.hitungtotal);

} 