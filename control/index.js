module.exports = function(app) {

    var indexControl = {
        index: function(req, res) {
            res.render('index', { title: 'IARL' });
        } 
    }

    return indexControl;
}