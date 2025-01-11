Setting up a Python virtual environment (venv) that works well with a team involves creating a shared environment where everyone can install the same dependencies and work in a consistent setup. Here are the steps to create and configure a venv for team collaboration:

### 1. **Activate the Virtual Environment**
Each team member will need to activate the virtual environment on their local machine:

- On **Windows**:
  ```bash
  .\env_name\Scripts\activate
  ```
- On **Mac/Linux**:
  ```bash
  source env_name/bin/activate
  ```

Once activated, your prompt should change to indicate the venv is active (e.g., `(env_name)` before your prompt).

### 2. **Install Project Dependencies**
Install the Python packages needed for your project. If your project has a `requirements.txt` file that lists the dependencies, run:

```bash
pip install -r requirements.txt
```

If you don’t have a `requirements.txt` yet, you can create one by installing the necessary packages and then generating it:

```bash
pip install <package_name>
pip freeze > requirements.txt
```

### 3. **Run the Flask Application**

```bash
python app.py
```

