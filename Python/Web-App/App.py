#Flask, Django - Web application frameworks for python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET']) #Decorators
def renderLogin():
    return render_template('index.html')
#creating routes
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        #validate with hardcoded values
        if username =='admin' and password == 'pass123':
            return render_template ('login_response.html', message="Login Successful!")
        else:
            return render_template ('login_response.html', message="Login failed!")
if __name__ == '__main__':
    app.run()    

# on login success/failure page put a back button
# once you click on back button it takes you back to the login page