#!/usr/bin/env python3
""" Basic Flask app """
from flask import Flask, render_template, request, g
from flask_babel import Babel
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

app = Flask(__name__)
babel = Babel(app)


class Config:
    """ the Config class for Babel """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """ get the locale """
    if 'locale' in request.args.keys():
        return request.args['locale']
    if g.user is not None and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.before_request
def before_request():
    """ executed before all other functions """
    g.user = get_user()


def get_user():
    """ get user data by user's id """
    if 'login_as' not in request.args.keys():
        return None
    id = request.args['login_as']
    if int(id) not in users.keys():
        return None
    return users[int(id)]


@app.route('/')
def hello():
    """ index """
    return render_template('6-index.html', user=g.user)


if __name__ == '__main__':
    app.run(debug=True)
