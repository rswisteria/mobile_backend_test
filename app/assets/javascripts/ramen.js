NCMB.initialize("7517e985ac2705dd41c37d8eab79c9915beb77a5182e1b4788676d0e6a8b13b0", "4ebce9c3b3ae2dd0902a17a83190cf6eb155dd4474ebb9562f4681451a477e0c");

var Unit = NCMB.Object.extend({
  className: "Unit",
  default: function () {
    return {
      unit_id: 0,
      name: 'サンプル',
      initial_cost: 1000,
      initial_rps: 0.5,
      per_level_cost: 1000,
      per_level_rps: 0.1
    };
  }
});

var UnitCollection = NCMB.Object.extend({
  className: "UnitCollection",
  model: Unit
});

var Status = NCMB.Object.extend({
  className: "Status",
  defaults: function () {
    return {
      ramen: 100,
      rps: 0.1,
      land: 3,
      unit: new UnitCollection()
    };
  }
});

var StatusView = Backbone.View.extend({
  initialize: function () {
    this.compiled = _.template($('#statusView').html());
  }
});

var UserView = Backbone.View.extend({
  initialize: function () {
    this.compiled = _.template($('#userView').html());
    this.status = this.model.get('status');
    this.status.on('change', this.updateStatus, this);
    this.status.fetch({
      success: function (status) {
        status.trigger('change', status);
      }
    });
    var self = this;
    var timeout = function () {
      var time = +new Date();
      var ramen = self.status.get('ramen');
      var rps = self.status.get('rps');
      ramen += rps;
      self.status.set('ramen', ramen);
      var end_time = +new Date();
      var span = 1000 - (end_time - time);
      setTimeout(timeout, span);
    };
    setTimeout(timeout, 1000);
  },

  updateStatus: function (status) {
    this.$('#ramen_count').text(Math.floor(status.get('ramen')));
    this.$('#rps').text(status.get('rps'));
    this.$('#land_count').text(status.get('land'));
  },

  render: function () {
    this.$el.html(this.compiled({ user: this.model, status: this.model.get('status') }));
    return this;
  }
});

var LoginView = Backbone.View.extend({
  events: {
    'click input#login': 'onLogin',
    'click input#register': 'onRegister'
  },

  initialize: function () {
    this.compiled = _.template($('#loginView').html());
  },

  onLogin: function (event) {
    var userName = this.$('.login input[name="mail_address"]').val();
    var password = this.$('.login input[name="password"]').val();
    
    NCMB.User.logIn(userName, password, {
      success: function (user) {
        var mainView = new MainView({ user: user });
        $('#contents').empty();
        $('#contents').append(mainView.render().$el);
      },
      error: function (user, error) {
      }
    });
  },

  onRegister: function (event) {
    var mail_address = this.$('.register input[name="mail_address"]').val();
    var password =     this.$('.register input[name="password"]').val();
    var nickname =     this.$('.register input[name="nickname"]').val();
    
    var user = new NCMB.User();
    user.set("userName", mail_address);
    user.set("password", password);
    user.set("mailAddress", mail_address);
    user.set("nickname", nickname);
    var status = new Status();
    user.set('status', status);

    var self = this;

    user.signUp(null, {
      success: function (user) {
        var mainView = new MainView({ user: user });
        $('#contents').empty();
        $('#contents').append(mainView.render().$el);
      },
      error: function (user, error) {
        alert(error);
      }
    });
  },

  render: function () {
    this.$el.html(this.compiled());
    return this;
  }
});

var MainView = Backbone.View.extend({
  events: {
    'click #logout': 'onLogout'
  },

  initialize: function (option) {
    this.compiled = _.template($('#mainView').html());
    this.userView = new UserView( { model: option.user } );
  },

  onLogout: function (event) {
    NCMB.User.logOut();
    var loginView = new LoginView();
    $('#contents').empty();
    $('#contents').append(loginView.render().$el);
    return false;
  },

  render: function () {
    this.$el.html(this.compiled());
    this.$('#user').append(this.userView.render().$el);
    return this;
  }
});

$(function() {
  var user = NCMB.User.current();
  if (user) {
    try {
      var mainView = new MainView({ user: user });
      $('#contents').empty();
      $('#contents').append(mainView.render().$el);
    } catch (x) {
      alert(x.stack);
    }
  } else {
    var loginView = new LoginView();
    $('#contents').append(loginView.render().$el);
  }
});