### Installation:
1. Clone this repository 
2. Navigate to the /tutor/server directory
```bash
cd tutor/server
```
3. Create a virtual environment
(If python3 or pip3 commands do not work, switch to using python and pip)
```bash 
python3 -m venv venv
```
4. Activate the virtual environment
Linux/MacOS:
```bash 
source venv/bin/activate
```
Windows:
```bash 
. venv\Scripts\activate
```
5. Install the requirements:
```bash 
pip3 install -r requirements.txt
``` 
6. Run the flask web app:
```bash 
flask run
```
7. Once it is running in that terminal, in a new terminal window, navigate to the /tutor/website directory 
8. In the /tutor/website directory, install npm with
```bash
npm install
```
9. Once npm is installed, run:
```bash 
npm run dev
```
10. Navigate to [localhost:3000](http://localhost:3000) in your browser to view and use the website features.

