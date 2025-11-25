/* eslint-env node */
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, "..", "data", "all-data.json");
let cachedDataset = null;

const loadDataset = async () => {
  if (cachedDataset) {
    return cachedDataset;
  }

  const rawContents = await fs.readFile(dataFilePath, "utf8");
  cachedDataset = JSON.parse(rawContents);
  return cachedDataset;
};

export const getAllData = async (req, res, next) => {
  try {
    const dataset = await loadDataset();
    res.json(dataset);
  } catch (error) {
    next(error);
  }
};
