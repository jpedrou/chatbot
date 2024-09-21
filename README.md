# ChatBot

The objective of this project is to build a chatbot that interacts with the user using HuggingFace models API and Next.js for interface design.

## Tecnologies

- Next.js
- shadcn/ui
- Python
- FastApi
- HuggingFace APIs

## Setup

With Node already installed, go to the folder `interface` in the terminal and run the following command:

```bash
npm install
```

This command will get all the next.js and shadcn.uidependecies automatically.

Then, you're ready to start the next.js app, just run:

```bash
npm run dev
```

To run the LLM (Large Language Model) it's needed to create a Python virtual environment to isolate all the dependencies in the project folder. To make it easer, just run in the `server` directory:


**Linux**

```bash
python3 -m venv venv
```

To activate the env, run:


```bash
source venv/bin/activate
```


**Windows**

```bash
python3 -m venv venv
```

To activate the env, run:

`cmd`

```bash
.\venv\Scripts\activate.bat
```

`PowerShell`

```bash
.\venv\Scripts\activate.ps1
```

To install all python dependencies of this project, in the `server` directory and with the virtual env already configured, run in the terminal:

```bash
pip install -r requirements.txt
```

To check if the libs were installed correctly, run in the terminal:

```bash
pip list
```

This command will list all libs installed in the current virtual env.

Finally, to run the server, just run:


```bash
fastapi dev api.py
```