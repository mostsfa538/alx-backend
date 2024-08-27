#!/usr/bin/env python3
""" Basic Flask """
from flask import Flask, render_template, request
from flask_babel import Babel

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
    """ determine the best match with our supported languages """
    if 'locale' in request.args.keys():
        return request.args['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def hello():
    """ index """
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run(debug=True)
