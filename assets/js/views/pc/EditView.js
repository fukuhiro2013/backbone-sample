define([
  'underscore',
  'backbone',
  'jst/pc'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    events: {
      'click .delete': 'onClickDelete'
    },
    initialize: function () {
      this.listenTo(this.model, 'invalid', this.renderValidationMessage);
    },
    className: 'edit-view',
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST.edit({source: this.presenter()}));
      // Since `submit` is undelegate-able in Internet Explorer, it is needed
      // to add event listener directrly to the form tag.
      this.$('form').on('submit', _.bind(this.onSubmit, this));
      return this;
    },
    renderValidationMessage: function (model, errors) {
      var lis = _.map(errors, function (value, name) {
        return '<li><strong>' + name + '</strong> ' + value + '</li>';
      });
      this.$('.alert')
        .show()
        .find('ul').html(lis.join(''));
      return this;
    },
    // Controller methods
    // ------------------
    onSubmit: function (e) {
      e.preventDefault();
      var self = this;
      this.$('.alert').hide();
      this.model.save(this.getValues(), {
        wait: true,
        success: function () {
          self.trigger('updated');
        }
      });
    },
    onClickDelete: function () {
      this.model.destroy();
      this.trigger('deleted');
    },
    // Helper methods
    // --------------
    presenter: function () {
      return _.defaults(this.model.toSafeJSON(), {id: this.model.id});
    },
    getValues: function () {
      var values = {};
      _.each(this.$('form').serializeArray(), function (obj) {
        values[obj.name] = obj.value;
      });
      return values;
    }
  });
});