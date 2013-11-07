NCMB.initialize("7517e985ac2705dd41c37d8eab79c9915beb77a5182e1b4788676d0e6a8b13b0", "4ebce9c3b3ae2dd0902a17a83190cf6eb155dd4474ebb9562f4681451a477e0c");

var Status = NCMB.Object.extend({
  className: "Status"
});

var StatusView = Backbone.View.extend({
  initialize: function () {
    this.compiled = _.template($('#statusView'));
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

    user.signUp(null, {
      success: function (user) {
        // ステータスオブジェクトを作成
        var status = new Status();
        user.set('status', status);
        user.save(null, {
          success: function (user) {
          },
          error: function (user) {
          }
        });
      },
      error: function (user, error) {
      }
    });
  },

  render: function () {
    this.$el.html(this.compiled());
    return this;
  }
});

var MainView = Backbone.View.extend({
  initialize: function () {
    this.compiled = _.template($('#mainView'));
    this.status = new StatusView();
  },

  render: function () {
    this.$el.html(this.compiled());
    this.$('#status').append(this.status.render().$el);
  }
});

$(function() {
  var user = NCMB.User.current();
  if (user) {
    
  } else {
    var loginView = new LoginView();
    $('#contents').append(loginView.render().$el);
  }
});