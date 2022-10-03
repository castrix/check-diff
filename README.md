# check git diff into tree view

## Usage

1. get the branch diff and output it as a file `data`, for the example:

```
git diff --name-status ${branches} --output=data
```

2. copy the output file into this project root folder

3. install the project

```
npm install
```

4. run the script

```
npm run start
```

5. check the output in `output` folder