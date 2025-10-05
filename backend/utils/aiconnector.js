 
import { spawn } from "child_process";

export const runPythonModel = (scriptPath, inputData) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      scriptPath,
      JSON.stringify(inputData),
    ]);

    let result = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(errorOutput || `Python process exited with code ${code}`));
      } else {
        resolve(result.trim());
      }
    });
  });
};

